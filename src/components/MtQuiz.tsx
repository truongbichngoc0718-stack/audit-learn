import { useEffect, useMemo, useRef, useState } from 'react';
import { setScore } from '../lib/store';
import { loadMt, saveMt, statusOf, type MtProgress } from '../lib/mtStore';
import './mt.css';

/**
 * Nhánh E · Ôn test MT. Dữ liệu: /mt/questions.json (+ /mt/img/*.webp), sinh bởi quiz-bank/scripts.
 * Luyện tập: sai lần 1 được chọn/điền lại một lần, sai lần 2 mới hiện lời giải.
 * Điểm: đúng lần 1 = 1, đúng lần 2 = 0,5, sai cả hai = 0.
 * Dạng hiển thị: trắc nghiệm · điền số · đúng/sai nhanh · cả đoạn văn (T/F/CS) · chọn hình.
 * Thi thử: một đề gốc hoặc đề trộn theo bộ lọc, đồng hồ tổng, không làm lại, chấm khi nộp.
 */

export interface MtQ {
  id: string; test: string; num: number; family: 'NR' | 'VR' | 'IR' | 'EC' | 'CFA';
  stem: string; options: Record<string, string>; answer: string; explanation?: string;
  passage?: string; passage_id?: string; stimulus_img?: string; question_img?: string; inline_img?: string; explanation_img?: string;
  domain: string; difficulty: string; speed: string; qtype: string; topics: string[]; est_sec: number;
  source: { file: string; page: number }; answer_note?: string;
}
type Fmt = 'mcq' | 'numeric' | 'verify' | 'tfc' | 'image';
type FmtPref = 'auto' | 'mcq' | 'numeric' | 'verify';
interface Unit { kind: 'single' | 'passage'; qs: MtQ[]; fmt: Fmt[]; verifyKey?: string[] }
interface QState { tries: string[]; wrong: number; done: boolean; result?: number; vStage?: 'verify' | 'mcq'; hint?: string }

const BASE = '/mt/';
const FACETS: [keyof MtQ | 'topics', string][] = [['domain', 'Lĩnh vực'], ['difficulty', 'Độ khó'], ['speed', 'Kiểu làm'], ['qtype', 'Dạng câu hỏi'], ['topics', 'Chủ đề']];
const ORDER: Record<string, string[]> = { difficulty: ['Dễ', 'Trung bình', 'Khó'], speed: ['Nhanh', 'Chậm', 'Tư duy'] };
const STATUSES = ['Chưa làm', 'Đang sai', 'Đúng lần 2', 'Đã đúng', 'Đã đánh dấu'];
const FMT_LABEL: Record<Fmt, string> = { mcq: 'Trắc nghiệm', numeric: 'Điền số', verify: 'Đúng/Sai nhanh', tfc: 'True / False / Cannot say', image: 'Chọn hình' };

const shuffle = <T,>(a: T[]) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const fmtTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

/** Đọc số từ một lựa chọn: "£76,950" → 76950; "12.5%" → 12.5; "⅛" → 0.125. null nếu không phải số. */
export function parseNum(s: string): number | null {
  const t = s.replace(/[⅛]/g, '1/8').replace(/[¼]/g, '1/4').replace(/[½]/g, '1/2').replace(/[¾]/g, '3/4').replace(/[⅓]/g, '1/3');
  if (/cannot|none|not possible/i.test(t)) return null;
  const frac = t.match(/^\s*(-?\d+)\s*\/\s*(\d+)\s*$/);
  if (frac) return +frac[1] / +frac[2];
  const m = t.replace(/,/g, '').match(/-?\d+(\.\d+)?/g);
  if (!m || m.length !== 1) return null;
  return parseFloat(m[0]);
}
const unitOf = (s: string) => { const pre = s.match(/^\s*([£$€¥]|US\$)/)?.[1] ?? ''; const post = s.replace(/^[^\d-]*[\d,.\s/-]+/, '').trim(); return { pre, post }; };
function numericOk(q: MtQ) {
  if (q.family !== 'NR' || !/lời văn/.test(q.qtype)) return false;
  const a = parseNum(q.options[q.answer] ?? ''); if (a === null) return false;
  const others = Object.entries(q.options).filter(([k]) => k !== q.answer).map(([, v]) => parseNum(v)).filter((v): v is number => v !== null);
  return others.every(o => Math.abs(o - a) > Math.abs(a) * 0.004 + 1e-9);
}
function numTol(q: MtQ) {
  const a = parseNum(q.options[q.answer])!;
  const gaps = Object.entries(q.options).filter(([k]) => k !== q.answer).map(([, v]) => parseNum(v)).filter((v): v is number => v !== null).map(v => Math.abs(v - a));
  const half = gaps.length ? Math.min(...gaps) / 2 : Infinity;
  return Math.min(half, Math.max(Math.abs(a) * 0.005, 0.005));
}

function pickFmt(q: MtQ, pref: FmtPref): Fmt {
  if (q.family === 'IR') return 'image';
  if (q.family === 'VR') return pref === 'verify' ? 'verify' : 'tfc';
  if (pref === 'mcq') return 'mcq';
  if (pref === 'numeric') return numericOk(q) ? 'numeric' : 'mcq';
  if (pref === 'verify') return Object.keys(q.options).length > 2 ? 'verify' : 'mcq';
  const r = Math.random();
  if (numericOk(q) && r < 0.5) return 'numeric';
  if (r > 0.75 && Object.keys(q.options).length > 2) return 'verify';
  return 'mcq';
}

function buildUnits(list: MtQ[], size: number, pref: FmtPref, groupPassage: boolean): Unit[] {
  let picked = shuffle(list);
  if (size) picked = picked.slice(0, size);
  const units: Unit[] = [];
  if (groupPassage) {
    const byP = new Map<string, MtQ[]>();
    for (const q of picked) { if (q.family === 'VR' && q.passage_id) { if (!byP.has(q.passage_id)) byP.set(q.passage_id, []); byP.get(q.passage_id)!.push(q); } }
    for (const [, qs] of byP) if (qs.length >= 2) units.push({ kind: 'passage', qs: qs.sort((a, b) => a.num - b.num), fmt: qs.map(() => 'tfc' as Fmt) });
    const grouped = new Set(units.flatMap(u => u.qs.map(q => q.id)));
    picked = picked.filter(q => !grouped.has(q.id));
  }
  for (const q of picked) {
    const f = pickFmt(q, pref);
    let vk: string | undefined;
    if (f === 'verify') { const keys = Object.keys(q.options); vk = Math.random() < 0.5 ? q.answer : shuffle(keys.filter(k => k !== q.answer))[0]; }
    units.push({ kind: 'single', qs: [q], fmt: [f], verifyKey: vk ? [vk] : undefined });
  }
  return shuffle(units);
}

function Fig({ src, alt }: { src?: string; alt: string }) {
  const [zoom, setZoom] = useState(false);
  if (!src) return null;
  return (
    <>
      <figure className="mt-fig"><img src={BASE + src} alt={alt} loading="lazy" onClick={() => setZoom(true)} />
        <button type="button" className="mt-zoombtn" onClick={() => setZoom(true)}>Phóng to</button></figure>
      {zoom && (
        <div className="mt-ov" role="dialog" aria-label="Phóng to hình" onClick={() => setZoom(false)}>
          <div className="mt-ovbar"><button type="button" className="b-btn" onClick={() => setZoom(false)}>Đóng</button></div>
          <div className="mt-ovpane" onClick={e => e.stopPropagation()}><img src={BASE + src} alt={alt} /></div>
        </div>
      )}
    </>
  );
}

export default function MtQuiz({ mode = 'practice' }: { mode?: 'practice' | 'exam' }) {
  const [Q, setQ] = useState<MtQ[] | null>(null);
  const [err, setErr] = useState('');
  const [P, setP] = useState<MtProgress>({});
  const [sel, setSel] = useState<Record<string, Set<string>>>(() => Object.fromEntries([...FACETS.map(([f]) => [f, new Set<string>()]), ['status', new Set<string>()]]));
  const [size, setSize] = useState(10);
  const [pref, setPref] = useState<FmtPref>('auto');
  const [groupP, setGroupP] = useState(true);
  const [units, setUnits] = useState<Unit[] | null>(null);
  const [ui, setUi] = useState(0);
  const [st, setSt] = useState<Record<string, QState>>({});
  const [startAt, setStartAt] = useState(0);
  const [now, setNow] = useState(Date.now());
  const [examAns, setExamAns] = useState<Record<string, string>>({});
  const [examTest, setExamTest] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [finished, setFinished] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const autoSubmitted = useRef(false);

  useEffect(() => {
    setP(loadMt());
    fetch(BASE + 'questions.json').then(r => r.json()).then(setQ).catch(() => setErr('Không tải được kho câu hỏi. Tải lại trang để thử lần nữa.'));
  }, []);
  useEffect(() => { if (!units || finished) return; const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, [units, finished]);

  const status = (q: MtQ) => statusOf(P[q.id]);
  const match = (q: MtQ, except?: string) => {
    for (const [f] of FACETS) {
      const s = sel[f as string]; if (f === except || !s.size) continue;
      if (f === 'topics') { if (!q.topics.some(t => s.has(t))) return false; } else if (!s.has(String(q[f as keyof MtQ]))) return false;
    }
    if (except !== 'status' && sel.status.size) { const ok = sel.status.has(status(q)) || (sel.status.has('Đã đánh dấu') && !!P[q.id]?.flag); if (!ok) return false; }
    return true;
  };
  const pool = useMemo(() => (Q ?? []).filter(q => match(q)), [Q, sel, P]); // eslint-disable-line react-hooks/exhaustive-deps

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const record = (q: MtQ, result: number) => {
    setP(prev => { const r = { ...(prev[q.id] ?? { n: 0, best: 0 }) }; r.n += 1; r.last = result; r.best = Math.max(r.best ?? 0, result); r.ts = Date.now(); const nx = { ...prev, [q.id]: r }; saveMt(nx); return nx; });
  };
  const toggleFlag = (q: MtQ) => setP(prev => { const r = { ...(prev[q.id] ?? { n: 0, best: 0 }) }; r.flag = !r.flag; r.ts = Date.now(); const nx = { ...prev, [q.id]: r }; saveMt(nx); return nx; });

  const start = (list: MtQ[], opts?: { size?: number; pref?: FmtPref; test?: string }) => {
    if (!list.length) return;
    const u = mode === 'exam'
      ? (opts?.test ? list.sort((a, b) => a.num - b.num) : shuffle(list).slice(0, opts?.size ?? size)).map(q => ({ kind: 'single' as const, qs: [q], fmt: [q.family === 'IR' ? 'image' : q.family === 'VR' ? 'tfc' : 'mcq'] as Fmt[] }))
      : buildUnits(list, opts?.size ?? size, opts?.pref ?? pref, groupP);
    setUnits(u); setUi(0); setSt({}); setStartAt(Date.now()); setNow(Date.now()); setExamAns({}); setSubmitted(false); setFinished(false); setExamTest(opts?.test ?? ''); autoSubmitted.current = false;
    setTimeout(scrollTop, 0);
  };
  const quit = () => { setUnits(null); setFinished(false); setTimeout(scrollTop, 0); };

  // ---------- trả lời (luyện tập) ----------
  const answer = (q: MtQ, value: string, fmt: Fmt, verifyKey?: string) => {
    const cur: QState = st[q.id] ?? { tries: [], wrong: 0, done: false, vStage: fmt === 'verify' ? 'verify' : undefined };
    if (cur.done) return;
    const put = (s2: QState) => setSt(s => ({ ...s, [q.id]: s2 }));
    if (fmt === 'verify' && cur.vStage === 'verify') {
      const shownRight = verifyKey === q.answer, saysRight = value === 'yes';
      if (shownRight && saysRight) { finish(q, cur, 1); return; }
      if (!shownRight && !saysRight) { put({ ...cur, vStage: 'mcq', tries: [verifyKey!], hint: 'Đúng, phương án đó sai. Giờ chọn đáp án đúng.' }); return; }
      put({ ...cur, vStage: 'mcq', wrong: 1, tries: shownRight ? [] : [verifyKey!],
        hint: shownRight ? 'Chưa đúng: phương án vừa rồi chính là đáp án. Còn một lượt, chọn lại.' : 'Chưa đúng: phương án vừa rồi sai. Còn một lượt, chọn đáp án đúng.' });
      return;
    }
    let correct: boolean; let hint = '';
    if (fmt === 'numeric') {
      const x = parseNum(value), a = parseNum(q.options[q.answer])!;
      if (x === null) return;
      correct = Math.abs(x - a) <= numTol(q);
      if (!correct) hint = x > a ? 'Chưa đúng, kết quả của bạn cao hơn đáp án. Còn một lượt điền lại.' : 'Chưa đúng, kết quả của bạn thấp hơn đáp án. Còn một lượt điền lại.';
    } else correct = value === q.answer;
    if (correct) { finish(q, cur, cur.wrong === 0 ? 1 : 0.5); return; }
    const nx = { ...cur, wrong: cur.wrong + 1, tries: [...cur.tries, value] };
    if (nx.wrong >= 2) { finish(q, nx, 0); return; }
    put({ ...nx, hint: hint || 'Chưa đúng. Bạn còn một lượt chọn lại trước khi xem lời giải.' });
  };
  const finish = (q: MtQ, cur: QState, result: number) => {
    setSt(s => ({ ...s, [q.id]: { ...cur, done: true, result, hint: '' } }));
    record(q, result);
  };

  const unit = units?.[ui];
  const unitDone = (u: Unit) => mode === 'exam' ? true : u.qs.every(q => st[q.id]?.done);
  const nextUnit = () => {
    if (!units) return;
    if (ui < units.length - 1) { setUi(ui + 1); setTimeout(scrollTop, 0); return; }
    if (mode === 'exam') submitExam(); else endPractice();
  };
  const endPractice = () => {
    if (!units) return;
    const all = units.flatMap(u => u.qs); const pts = all.reduce((s, q) => s + (st[q.id]?.result ?? 0), 0);
    setScore('e1-luyen-tap', 'last', Math.round(pts * 10) / 10, all.length, 'Phiên luyện gần nhất');
    setFinished(true); setTimeout(scrollTop, 0);
  };
  const submitExam = () => {
    if (!units) return;
    const all = units.flatMap(u => u.qs); let pts = 0;
    for (const q of all) { const ok = examAns[q.id] === q.answer; if (ok) pts++; if (examAns[q.id]) record(q, ok ? 1 : 0); }
    setScore('e2-thi-thu', examTest || 'mix', pts, all.length, examTest ? `Đề ${examTest}` : 'Đề trộn');
    setSubmitted(true); setFinished(true); setTimeout(scrollTop, 0);
  };

  if (err) return <div className="b-card">{err}</div>;
  if (!Q) return <div className="b-card">Đang tải kho câu hỏi…</div>;

  // ---------- màn kết quả ----------
  if (units && finished) {
    const all = units.flatMap(u => u.qs);
    const pts = mode === 'exam' ? all.filter(q => examAns[q.id] === q.answer).length : all.reduce((s, q) => s + (st[q.id]?.result ?? 0), 0);
    const first = all.filter(q => st[q.id]?.result === 1).length, second = all.filter(q => st[q.id]?.result === 0.5).length;
    const wrong = all.filter(q => mode === 'exam' ? examAns[q.id] !== q.answer : (st[q.id]?.result ?? 0) < 1);
    return (
      <div ref={topRef} className="mt">
        <div className="b-card mt-result">
          <div className="b-kicker">{mode === 'exam' ? (examTest ? `Kết quả đề ${examTest}` : 'Kết quả đề trộn') : 'Kết quả phiên luyện'}</div>
          <div className="mt-score">{Math.round(pts * 10) / 10}<small>/{all.length}</small></div>
          <p>{mode === 'exam' ? `${Math.round(100 * pts / all.length)}% · ${fmtTime(Math.round((now - startAt) / 1000))}` : `Đúng ngay lần đầu ${first} · đúng ở lần chọn lại ${second} · sai cả hai lượt ${all.length - first - second}`}</p>
        </div>
        {mode === 'exam' && <ExamReview all={all} ans={examAns} />}
        <div className="x-bar">
          <button type="button" className="b-btn ghost" onClick={quit}>Về bộ lọc</button>
          {wrong.length > 0 && mode === 'practice' && <button type="button" className="b-btn" onClick={() => start(wrong, { size: 0 })}>Làm lại {wrong.length} câu chưa đúng lần đầu</button>}
        </div>
      </div>
    );
  }

  // ---------- màn làm bài ----------
  if (units && unit) {
    const total = units.length; const elapsed = Math.round((now - startAt) / 1000);
    const examLimit = mode === 'exam' ? units.reduce((s, u) => s + u.qs[0].est_sec, 0) : 0;
    if (mode === 'exam' && examLimit && elapsed >= examLimit && !submitted && !autoSubmitted.current) { autoSubmitted.current = true; setTimeout(submitExam, 0); }
    const est = unit.qs.reduce((s, q) => s + q.est_sec, 0);
    return (
      <div ref={topRef} className="mt">
        <div className="mt-top">
          <button type="button" className="b-btn ghost" onClick={quit} aria-label="Thoát phiên">✕</button>
          <div className="mt-prog" aria-label={`Câu ${ui + 1} trên ${total}`}><i style={{ width: `${(100 * ui) / total}%` }} /></div>
          <span className="mt-count">{ui + 1}/{total}</span>
          <span className={`mt-clock ${mode === 'exam' ? (examLimit - elapsed < 60 ? 'low' : '') : ''}`}>{mode === 'exam' ? fmtTime(Math.max(0, examLimit - elapsed)) : `${fmtTime(elapsed)}`}</span>
        </div>
        {unit.kind === 'passage'
          ? <PassageUnit unit={unit} st={st} onAnswer={(q, v) => answer(q, v, 'tfc')} P={P} onFlag={toggleFlag} est={est} />
          : <SingleUnit q={unit.qs[0]} fmt={unit.fmt[0]} verifyKey={unit.verifyKey?.[0]} s={st[unit.qs[0].id]} mode={mode}
              examPick={examAns[unit.qs[0].id]} onExam={v => setExamAns(a => ({ ...a, [unit.qs[0].id]: v }))}
              onAnswer={(v) => answer(unit.qs[0], v, unit.fmt[0], unit.verifyKey?.[0])} flagged={!!P[unit.qs[0].id]?.flag} onFlag={() => toggleFlag(unit.qs[0])} />}
        <div className="mt-dock">
          {ui > 0 && <button type="button" className="b-btn ghost" onClick={() => { setUi(ui - 1); setTimeout(scrollTop, 0); }}>Câu trước</button>}
          {mode === 'exam' && <button type="button" className="b-btn ghost" onClick={submitExam}>Nộp bài ({Object.keys(examAns).length}/{total})</button>}
          <button type="button" className="b-btn" disabled={!unitDone(unit)} onClick={nextUnit}>{ui === total - 1 ? (mode === 'exam' ? 'Nộp bài' : 'Xem kết quả') : 'Câu tiếp'}</button>
        </div>
      </div>
    );
  }

  // ---------- màn bộ lọc ----------
  const counts = (f: string) => {
    const m = new Map<string, number>();
    for (const q of Q) { if (!match(q, f)) continue;
      const vals = f === 'topics' ? q.topics : f === 'status' ? [status(q), ...(P[q.id]?.flag ? ['Đã đánh dấu'] : [])] : [String(q[f as keyof MtQ])];
      for (const v of vals) m.set(v, (m.get(v) ?? 0) + 1); }
    return m;
  };
  const allVals = (f: string) => { const s = new Set<string>(); for (const q of Q) (f === 'topics' ? q.topics : [String(q[f as keyof MtQ])]).forEach(v => s.add(v));
    const a = [...s]; return ORDER[f] ? a.sort((x, y) => ORDER[f].indexOf(x) - ORDER[f].indexOf(y)) : a.sort((x, y) => x.localeCompare(y, 'vi')); };
  const toggle = (f: string, v: string) => setSel(s => { const n = new Set(s[f]); n.has(v) ? n.delete(v) : n.add(v); return { ...s, [f]: n }; });
  const clear = () => setSel(s => Object.fromEntries(Object.keys(s).map(k => [k, new Set<string>()])));
  const done = Object.keys(P).filter(k => Q.some(q => q.id === k) && P[k].n > 0);
  const firstOk = done.filter(k => P[k].last === 1).length;
  const wrongNow = Q.filter(q => ['Đang sai', 'Đúng lần 2'].includes(status(q)));
  const tests = [...new Set(Q.map(q => q.test))].sort();

  return (
    <div ref={topRef} className="mt">
      <div className="mt-tiles">
        <div><b>{Q.length}</b><span>câu trong kho</span></div>
        <div><b>{done.length}</b><span>câu đã làm</span></div>
        <div><b>{done.length ? Math.round(100 * firstOk / done.length) : 0}%</b><span>đúng ngay lần đầu (lần gần nhất)</span></div>
        <div><b>{wrongNow.length}</b><span>câu cần ôn lại</span></div>
      </div>

      {mode === 'exam' ? (
        <div className="b-card">
          <div className="b-kicker">Thi thử theo đề gốc</div>
          <p className="mt-sub">Làm trọn một đề như lúc thi thật: đồng hồ tổng, không làm lại, xem đáp án sau khi nộp.</p>
          <div className="mt-tests">
            {tests.map(t => { const qs = Q.filter(q => q.test === t); const sec = qs.reduce((s, q) => s + q.est_sec, 0);
              const sc = qs.filter(q => P[q.id]?.n).length;
              return <button key={t} type="button" className="mt-test" onClick={() => start(qs, { test: t })}>
                <b>{t}</b><span>{qs[0].domain}</span><small>{qs.length} câu · {Math.round(sec / 60)} phút{sc ? ` · đã làm ${sc}` : ''}</small></button>; })}
          </div>
        </div>
      ) : (
        <div className="mt-presets">
          <button type="button" className="mt-preset hot" onClick={() => start(Q.filter(q => q.speed === 'Nhanh'), { size: 5 })}>5 câu nhanh</button>
          <button type="button" className="mt-preset" disabled={!wrongNow.length} onClick={() => start(wrongNow, { size: 0 })}>Ôn câu sai ({wrongNow.length})</button>
          <button type="button" className="mt-preset" onClick={() => start(Q.filter(q => !P[q.id]?.n), { size: 10 })}>10 câu chưa làm</button>
          <button type="button" className="mt-preset" onClick={() => start(Q.filter(q => q.difficulty === 'Khó'), { size: 10 })}>10 câu khó</button>
          <button type="button" className="mt-preset" onClick={() => start(Q.filter(q => numericOk(q)), { size: 10, pref: 'numeric' })}>10 câu điền số</button>
          <button type="button" className="mt-preset" onClick={() => { const ps = shuffle([...new Set(Q.filter(q => q.passage_id).map(q => q.passage_id!))])[0]; start(Q.filter(q => q.passage_id === ps), { size: 0 }); }}>1 đoạn văn Verbal</button>
          <button type="button" className="mt-preset" onClick={() => start(Q.filter(q => q.family === 'IR'), { size: 10 })}>Tư duy hình</button>
        </div>
      )}

      <div className="b-kicker" style={{ marginTop: '1.2rem' }}>{mode === 'exam' ? 'Hoặc đề trộn theo bộ lọc' : 'Tự chọn bộ lọc'}</div>
      {FACETS.map(([f, label]) => { const c = counts(f as string); return (
        <section key={f as string} className="mt-facet"><h3>{label}</h3><div className="mt-chips">
          {allVals(f as string).map(v => { const n = c.get(v) ?? 0; const on = sel[f as string].has(v); if (f === 'topics' && !n && !on) return null;
            return <button key={v} type="button" className="mt-chip" aria-pressed={on} disabled={!n && !on} onClick={() => toggle(f as string, v)}>{v}<small>{n}</small></button>; })}
        </div>{f === 'speed' && <p className="mt-sub">Nhanh: ≤45 giây, nhìn là ra · Chậm: nhiều bước tính hoặc đọc kỹ · Tư duy: tìm quy luật, suy luận.</p>}</section>); })}
      <section className="mt-facet"><h3>Trạng thái</h3><div className="mt-chips">
        {STATUSES.map(v => <button key={v} type="button" className="mt-chip" aria-pressed={sel.status.has(v)} onClick={() => toggle('status', v)}>{v}<small>{counts('status').get(v) ?? 0}</small></button>)}
      </div></section>
      <section className="mt-facet"><h3>Phiên {mode === 'exam' ? 'thi' : 'luyện'}</h3>
        <div className="mt-row">
          <div className="x-tabs" role="group" aria-label="Số câu">{[5, 10, 20, 30, 0].map(n => <button key={n} type="button" className={size === n ? 'on' : ''} onClick={() => setSize(n)}>{n || 'Tất cả'}</button>)}</div>
        </div>
        {mode === 'practice' && <>
          <div className="mt-row"><span className="mt-lab">Dạng câu</span>
            <div className="x-tabs" role="group" aria-label="Dạng câu">{(['auto', 'mcq', 'numeric', 'verify'] as FmtPref[]).map(p => <button key={p} type="button" className={pref === p ? 'on' : ''} onClick={() => setPref(p)}>{{ auto: 'Tự động trộn', mcq: 'Trắc nghiệm', numeric: 'Điền số', verify: 'Đúng/Sai nhanh' }[p]}</button>)}</div></div>
          <label className="mt-check"><input type="checkbox" checked={groupP} onChange={e => setGroupP(e.target.checked)} /> Gom các câu Verbal cùng đoạn văn vào một màn</label>
          <p className="mt-sub">Sai lần đầu được chọn hoặc điền lại một lần; sai lần thứ hai mới hiện lời giải. Đúng lần đầu 1 điểm, đúng lần chọn lại 0,5 điểm.</p>
        </>}
      </section>
      <div className="mt-dock">
        <span className="mt-count">{pool.length} câu khớp</span>
        <button type="button" className="b-btn ghost" onClick={clear}>Bỏ lọc</button>
        <button type="button" className="b-btn" disabled={!pool.length} onClick={() => start(pool)}>Bắt đầu {size && pool.length > size ? size : pool.length} câu</button>
      </div>
    </div>
  );
}

function Tags({ q }: { q: MtQ }) {
  const d = { 'Dễ': 'd1', 'Trung bình': 'd2', 'Khó': 'd3' }[q.difficulty] ?? '';
  return <div className="mt-tags"><span className="b-chip">{q.domain}</span><span className={`b-chip mt-${d}`}>{q.difficulty}</span><span className="b-chip std">{q.speed}</span>{q.topics.map(t => <span key={t} className="b-chip std">{t}</span>)}</div>;
}

function Explain({ q, result, picked }: { q: MtQ; result?: number; picked?: string }) {
  const ans = q.family === 'IR' ? q.answer : `${q.answer} · ${q.options[q.answer]}`;
  return (
    <div className="mt-explain">
      <p className={`mt-verdict ${result === 1 ? 'ok' : result === 0.5 ? 'half' : 'no'}`}>
        {result === 1 ? 'Chính xác ngay lần đầu.' : result === 0.5 ? 'Đúng ở lần chọn lại (0,5 điểm).' : result === 0 ? 'Sai cả hai lượt.' : picked ? (picked === q.answer ? 'Đúng.' : 'Sai.') : 'Chưa trả lời.'} Đáp án: <b>{ans}</b>
      </p>
      {q.explanation && <div className="mt-exptext">{q.explanation}</div>}
      <Fig src={q.explanation_img} alt="Lời giải gốc" />
      {q.answer_note && <p className="mt-note">{q.answer_note}</p>}
      <p className="mt-note">Nguồn: {q.source.file.split('/').pop()}, trang {q.source.page} · {q.id}</p>
    </div>
  );
}

function Stimulus({ q, showPassage = true }: { q: MtQ; showPassage?: boolean }) {
  return <>
    {showPassage && q.passage && <details className="mt-passage" open><summary>Đoạn văn</summary><p>{q.passage.replace(/\s*\n\s*/g, ' ')}</p></details>}
    <Fig src={q.stimulus_img} alt="Dữ liệu của câu hỏi" />
    <Fig src={q.question_img} alt="Hình của câu hỏi" />
    <Fig src={q.inline_img} alt="Hình minh họa" />
  </>;
}

function SingleUnit({ q, fmt, verifyKey, s, mode, examPick, onExam, onAnswer, flagged, onFlag }:
  { q: MtQ; fmt: Fmt; verifyKey?: string; s?: QState; mode: 'practice' | 'exam'; examPick?: string; onExam: (v: string) => void; onAnswer: (v: string) => void; flagged: boolean; onFlag: () => void }) {
  const [num, setNum] = useState('');
  useEffect(() => setNum(''), [q.id]);
  const done = !!s?.done; const tries = s?.tries ?? [];
  const keys = Object.keys(q.options);
  const stage = fmt === 'verify' ? (s?.vStage ?? 'verify') : fmt;
  const optClass = (k: string) => {
    if (mode === 'exam') return examPick === k ? 'sel' : '';
    if (done) return k === q.answer ? 'ok' : tries.includes(k) ? 'bad' : '';
    return tries.includes(k) ? 'bad struck' : '';
  };
  const unit = fmt === 'numeric' ? unitOf(q.options[q.answer]) : { pre: '', post: '' };
  return (
    <div className="b-card mt-card">
      <div className="mt-head"><Tags q={q} /><button type="button" className={`mt-flag ${flagged ? 'on' : ''}`} aria-pressed={flagged} onClick={onFlag}>{flagged ? '★ Đã đánh dấu' : '☆ Đánh dấu'}</button></div>
      <div className="mt-fmt">{FMT_LABEL[mode === 'exam' ? (fmt === 'image' ? 'image' : fmt === 'tfc' ? 'tfc' : 'mcq') : fmt]} · mục tiêu {q.est_sec}s</div>
      <Stimulus q={q} />
      <p className="mt-stem">{q.stem}</p>

      {mode === 'exam' ? (
        <div className={`mt-opts ${fmt === 'image' ? 'grid5' : fmt === 'tfc' ? 'grid3' : ''}`}>
          {keys.map(k => <button key={k} type="button" className={`x-opt ${optClass(k)}`} onClick={() => onExam(k)}><b>{k}.</b> {fmt === 'image' ? '' : q.options[k]}</button>)}
        </div>
      ) : stage === 'numeric' ? (
        <form className="mt-num" onSubmit={e => { e.preventDefault(); if (!done && parseNum(num) !== null) { onAnswer(num); setNum(''); } }}>
          <label htmlFor={`n-${q.id}`}>Điền kết quả</label>
          <div className="mt-numrow">{unit.pre && <span>{unit.pre}</span>}
            <input id={`n-${q.id}`} inputMode="decimal" autoComplete="off" value={num} disabled={done} onChange={e => setNum(e.target.value)} placeholder="vd 76950 hoặc 12.5" />
            {unit.post && <span>{unit.post}</span>}
            <button type="submit" className="b-btn" disabled={done || parseNum(num) === null}>Kiểm tra</button></div>
          {tries.length > 0 && <p className="mt-tries">Đã điền: {tries.join(' · ')}</p>}
          {done && <div className="mt-opts">{keys.map(k => <div key={k} className={`x-opt ${k === q.answer ? 'ok' : ''}`}><b>{k}.</b> {q.options[k]}</div>)}</div>}
        </form>
      ) : stage === 'verify' && fmt === 'verify' ? (
        <div className="mt-verify">
          <p>Đáp án sau có đúng không?</p>
          <div className="mt-cand"><b>{verifyKey}.</b> {q.options[verifyKey!]}</div>
          <div className="mt-row"><button type="button" className="b-btn" onClick={() => onAnswer('yes')}>Đúng</button><button type="button" className="b-btn ghost" onClick={() => onAnswer('no')}>Sai</button></div>
        </div>
      ) : (
        <div className={`mt-opts ${fmt === 'image' ? 'grid5' : fmt === 'tfc' ? 'grid3' : ''}`}>
          {keys.map(k => <button key={k} type="button" className={`x-opt ${optClass(k)}`} disabled={done || tries.includes(k)} onClick={() => onAnswer(k)}><b>{k}.</b> {fmt === 'image' ? '' : q.options[k]}</button>)}
        </div>
      )}
      {mode === 'practice' && s?.hint && !done && <p className="mt-hint" role="status">{s.hint}</p>}
      {mode === 'practice' && done && <Explain q={q} result={s?.result} />}
    </div>
  );
}

function PassageUnit({ unit, st, onAnswer, P, onFlag, est }: { unit: Unit; st: Record<string, QState>; onAnswer: (q: MtQ, v: string) => void; P: MtProgress; onFlag: (q: MtQ) => void; est: number }) {
  const q0 = unit.qs[0];
  return (
    <div className="b-card mt-card">
      <div className="mt-head"><Tags q={q0} /></div>
      <div className="mt-fmt">Cả đoạn văn · {unit.qs.length} nhận định · mục tiêu {Math.round(est / 60)} phút</div>
      <details className="mt-passage" open><summary>Đoạn văn</summary><p>{(q0.passage ?? '').replace(/\s*\n\s*/g, ' ')}</p></details>
      <ol className="mt-statements">
        {unit.qs.map(q => { const s = st[q.id]; const tries = s?.tries ?? []; const done = !!s?.done;
          return <li key={q.id}>
            <div className="mt-sthead"><p className="mt-stem">{q.stem}</p><button type="button" className={`mt-flag ${P[q.id]?.flag ? 'on' : ''}`} aria-pressed={!!P[q.id]?.flag} onClick={() => onFlag(q)} aria-label="Đánh dấu câu">{P[q.id]?.flag ? '★' : '☆'}</button></div>
            <div className="mt-opts grid3">{Object.keys(q.options).map(k => <button key={k} type="button" disabled={done || tries.includes(k)}
              className={`x-opt ${done ? (k === q.answer ? 'ok' : tries.includes(k) ? 'bad' : '') : tries.includes(k) ? 'bad struck' : ''}`} onClick={() => onAnswer(q, k)}>{q.options[k]}</button>)}</div>
            {s?.hint && !done && <p className="mt-hint" role="status">{s.hint}</p>}
            {done && <Explain q={q} result={s?.result} />}
          </li>; })}
      </ol>
    </div>
  );
}

function ExamReview({ all, ans }: { all: MtQ[]; ans: Record<string, string> }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="mt-review">
      {all.map((q, i) => { const a = ans[q.id]; const c = !a ? 'skip' : a === q.answer ? 'ok' : 'no'; return (
        <div key={q.id} className="b-card mt-revitem">
          <button type="button" className="mt-revhead" onClick={() => setOpen(open === q.id ? null : q.id)} aria-expanded={open === q.id}>
            <i className={`mt-dot ${c}`} /><span>{i + 1}. {q.stem}</span><small>{a ? `Chọn ${a}` : 'Bỏ trống'}</small></button>
          {open === q.id && <><Stimulus q={q} /><Explain q={q} picked={a} /></>}
        </div>); })}
    </div>
  );
}
