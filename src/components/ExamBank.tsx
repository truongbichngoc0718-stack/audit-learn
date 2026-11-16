import { useMemo, useState, useSyncExternalStore } from 'react';
import bank from '../data/tax/exam-bank.json';
import { cardById, cards } from '../lib/tax';
import { getTax, subscribe, setExamResult, setStatus } from '../lib/taxStore';

type Q = { id: string; sitting: string; q_no: string; marks: number | null; part: string; topic_vi: string; nodes: string[]; law_status: 'current' | 'old-law' | 'check'; question_ref: string; answer_ref: string };
const badge: Record<string, string> = { current: '✅ luật hiện hành', 'old-law': '⚠️ luật cũ: chỉ lấy dạng bài và bẫy', check: '❓ cần đối chiếu số liệu' };
const partLabel: Record<string, string> = { CIT: 'CIT', PIT: 'PIT', FCT: 'FCT', VAT: 'VAT', INV: 'Hóa đơn', ADM: 'Quản lý thuế', all: 'Tổng hợp' };

/** Kho đề theo câu hỏi. Không chép nguyên văn đề: mỗi câu có tóm tắt tiếng Việt, thẻ liên quan, file nguồn để làm. Sai → thẻ liên quan chuyển sang "đang học". */
export default function ExamBank() {
  const data = useSyncExternalStore(subscribe, getTax, getTax);
  const [part, setPart] = useState('all');
  const [sit, setSit] = useState('all');
  const [res, setRes] = useState<'all' | 'todo' | 'wrong'>('all');
  const b = bank as unknown as { intro_vi: string; sittings: { id: string; label: string }[]; questions: Q[] };
  const label = (id: string) => b.sittings.find(s => s.id === id)?.label ?? id;
  const list = b.questions.filter(q => (part === 'all' || q.part === part) && (sit === 'all' || q.sitting === sit) &&
    (res === 'all' || (res === 'todo' ? !data.exam?.[q.id] : data.exam?.[q.id]?.ok === false)));
  const freq = useMemo(() => {
    const m: Record<string, number> = {};
    b.questions.forEach(q => q.nodes.forEach(n => { m[n] = (m[n] ?? 0) + 1; }));
    return Object.entries(m).sort((a, c) => c[1] - a[1]).slice(0, 12).filter(([id]) => cardById(id));
  }, []);
  const done = b.questions.filter(q => data.exam?.[q.id]).length;
  const mark = (q: Q, ok: boolean) => { setExamResult(q.id, ok); if (!ok) q.nodes.forEach(n => { if (cards.some(c => c.id === n) && data.cards[n]?.status !== 'known') setStatus(n, 'learning'); }); };
  return (
    <div className="tx">
      <p className="tx-note">{b.intro_vi}</p>
      <div className="b-card"><b>Chủ đề ra nhiều nhất</b>
        <div className="tx-chips">{freq.map(([id, n]) => <a key={id} className="tx-src" href={`/d/atlas/#n-${id}`}>{cardById(id)!.title_en} · {n} lần</a>)}</div></div>
      <div className="tx-bar">
        <select value={sit} onChange={e => setSit(e.target.value)}><option value="all">Mọi kỳ</option>{b.sittings.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}</select>
        <select value={part} onChange={e => setPart(e.target.value)}><option value="all">Mọi phần</option>{['CIT', 'PIT', 'FCT', 'VAT', 'INV'].map(p => <option key={p} value={p}>{partLabel[p]}</option>)}</select>
        <select value={res} onChange={e => setRes(e.target.value as any)}><option value="all">Mọi trạng thái</option><option value="todo">Chưa làm</option><option value="wrong">Làm sai</option></select>
        <span>Đã làm {done}/{b.questions.length} · hiện {list.length} câu</span>
      </div>
      <div className="dt-list">
        {list.map(q => {
          const r = data.exam?.[q.id];
          return (
            <div key={q.id} className="b-card" style={{ borderLeft: `4px solid ${r ? (r.ok ? 'var(--bisc-emerald)' : 'var(--bisc-rose)') : 'var(--bisc-line)'}` }}>
              <div><b>{label(q.sitting)} · {q.q_no}</b> <span className="tx-src">{partLabel[q.part]}{q.marks ? ` · ${q.marks} điểm` : ''}</span> <span className="tx-src">{badge[q.law_status]}</span></div>
              <p style={{ margin: '.35rem 0' }}>{q.topic_vi}</p>
              <div className="tx-chips">{q.nodes.map(n => { const c = cardById(n); return c ? <a key={n} className="tx-src" href={`/d/atlas/#n-${n}`}>{c.title_en}</a> : null; })}</div>
              <div className="x-bar">
                <button type="button" className="b-btn ghost" onClick={() => mark(q, true)}>✅ Đúng</button>
                <button type="button" className="b-btn ghost" onClick={() => mark(q, false)}>❌ Sai</button>
                <small>Đề và đáp án: <code>{q.question_ref.replace('source/library/acca-tx-vnm/', '')}</code></small>
              </div>
            </div>
          );
        })}
        {!list.length && <p>Không có câu khớp bộ lọc.</p>}
      </div>
    </div>
  );
}
