import { useEffect, useMemo, useRef, useState } from 'react';
import bank from '../data/tax/exam-bank.json';
import { cards, trees, partNames, srcLabel, treesByCard, type Part } from '../lib/tax';

const fold = (s: string) => (s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
const parts: Part[] = ['A', 'B', 'C', 'D', 'E'];
const short: Record<Part, string> = { A: 'Quản lý', B: 'PIT', C: 'CIT', D: 'FCT', E: 'VAT' };
type Tab = 'cards' | 'numbers' | 'formulas' | 'trees';

const examCount: Record<string, number> = {};
(bank as any).questions.forEach((q: any) => q.nodes.forEach((n: string) => { examCount[n] = (examCount[n] ?? 0) + 1; }));

/** Tra cứu nhanh: một ô tìm (bỏ dấu), lọc phần, bốn bảng: thẻ, con số, công thức, cây quyết định. */
export default function QuickLookup() {
  const [q, setQ] = useState('');
  const [part, setPart] = useState<Part | 'all'>('all');
  const [mvp, setMvp] = useState(false);
  const [tab, setTab] = useState<Tab>('cards');
  const inp = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inp.current && !(document.activeElement instanceof HTMLInputElement)) { e.preventDefault(); inp.current?.focus(); }
      if (e.key === 'Escape' && document.activeElement === inp.current) setQ('');
    };
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  }, []);

  // Gõ có dấu → so khớp có dấu; gõ không dấu → bỏ dấu. Ưu tiên khớp cả cụm từ đầu một từ; không có thì mọi từ phải khớp đầu từ.
  const raw = q.trim().toLowerCase();
  const accented = raw !== fold(raw);
  const norm = (t: string) => accented ? (t ?? '').toLowerCase() : fold(t);
  const words = raw.split(/\s+/).filter(Boolean);
  const esc = (w: string) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const B = '(^|[^\\p{L}\\p{N}])';
  const phraseRe = raw ? new RegExp(B + esc(accented ? raw : fold(raw)), 'u') : null;
  const wordRes = words.map(w => new RegExp(B + esc(accented ? w : fold(w)), 'u'));
  const phraseHit = (text: string) => !phraseRe || phraseRe.test(norm(text));
  const wordsHit = (text: string) => { const t = norm(text); return wordRes.every(r => r.test(t)); };
  const base = cards.filter(c => (part === 'all' || c.part === part) && (!mvp || c.mvp));
  const cardText = useMemo(() => Object.fromEntries(cards.map(c => [c.id, [c.id, c.title_en, c.title_vi, c.group, c.summary_vi, ...(c.rules_vi ?? []), ...(c.numbers ?? []).flatMap(n => [n.label, n.value]), c.formula ?? '', ...(c.traps ?? []).map(t => t.text_vi)].join(' ')])), []);

  /** Mỗi bảng: lọc theo cả cụm trước; không ra kết quả thì lọc theo từng từ. */
  const pick = <T,>(list: T[], text: (x: T) => string): T[] => { const a = list.filter(x => phraseHit(text(x))); return a.length || !raw ? a : list.filter(x => wordsHit(text(x))); };
  const cardRows = pick(base, c => cardText[c.id]);
  const numRows = pick(base.flatMap(c => (c.numbers ?? []).map(n => ({ c, n }))), ({ c, n }) => `${n.label} ${n.value} ${c.title_en} ${c.title_vi}`);
  const fRows = pick(base.filter(c => c.formula), c => `${c.formula} ${c.title_en} ${c.title_vi}`);
  const tRows = pick(trees.filter(t => part === 'all' || t.part === part), t => `${t.title_vi} ${t.title_en} ${t.intro_vi} ${Object.values<any>(t.nodes).map(n => `${n.q_vi ?? ''} ${n.verdict_vi ?? ''}`).join(' ')}`);
  const counts: Record<Tab, number> = { cards: cardRows.length, numbers: numRows.length, formulas: fRows.length, trees: tRows.length };
  const tabName: Record<Tab, string> = { cards: '📇 Thẻ', numbers: '🔢 Con số', formulas: '∑ Công thức', trees: '🌳 Cây quyết định' };
  const Badge = ({ p }: { p: Part }) => <span className={`ql-part p${p}`} title={partNames[p].vi}>{short[p]}</span>;

  return (
    <div className="tx ql not-content">
      <div className="ql-search">
        <input ref={inp} type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Gõ để tra: cư trú, 183, lãi vay, hoàn thuế, 20%… (phím / để nhảy vào ô)" aria-label="Tra cứu" autoFocus />
      </div>
      <div className="tx-bar">
        <div className="ql-chips">
          <button type="button" className={part === 'all' ? 'sel' : ''} onClick={() => setPart('all')}>Tất cả</button>
          {parts.map(p => <button type="button" key={p} className={part === p ? 'sel' : ''} onClick={() => setPart(p)} title={partNames[p].vi}>{short[p]}</button>)}
        </div>
        <label><input type="checkbox" checked={mvp} onChange={e => setMvp(e.target.checked)} /> Chỉ thẻ ★ trọng tâm</label>
      </div>
      <div className="ql-tabs" role="tablist">
        {(Object.keys(tabName) as Tab[]).map(t => <button type="button" role="tab" aria-selected={tab === t} key={t} className={tab === t ? 'sel' : ''} onClick={() => setTab(t)}>{tabName[t]} <small>{counts[t]}</small></button>)}
      </div>

      {tab === 'cards' && <div className="ql-list">
        {cardRows.map(c => (
          <details key={c.id} className="ql-row" open={words.length > 0 && cardRows.length <= 3}>
            <summary>
              <Badge p={c.part} />
              <span className="ql-t"><b>{c.mvp && '★ '}{c.title_vi}</b> <small>{c.title_en}</small></span>
              <span className="ql-s">{c.summary_vi}</span>
              {c.numbers?.length ? <span className="ql-nums">{c.numbers.slice(0, 3).map((n, i) => <code key={i} title={n.label}>{n.value}</code>)}</span> : null}
            </summary>
            <div className="ql-body">
              <ul>{c.rules_vi.map((r, i) => <li key={i}>{r}</li>)}</ul>
              {c.numbers?.length ? <table className="ql-tbl"><tbody>{c.numbers.map((n, i) => <tr key={i}><td>{n.label}</td><td><b>{n.value}</b></td></tr>)}</tbody></table> : null}
              {c.formula && <pre className="tx-formula">{c.formula}</pre>}
              {c.traps?.map((t, i) => <div key={i} className="tx-trap">⚠️ {t.text_vi}</div>)}
              {c.flags?.includes('conflict') && c.conflict_vi && <div className="tx-conflict">⚠ Xung đột nguồn: {c.conflict_vi}</div>}
              <div className="tx-chips">
                <a className="b-chip std" href={`/d/atlas/#n-${c.id}`}>Mở trên Atlas →</a>
                {(treesByCard[c.id] ?? []).map(t => <a key={t.id} className="b-chip std" href={`/d/decide/${t.id}/`}>🌳 {t.title_vi}</a>)}
                {examCount[c.id] ? <a className="b-chip std" href="/d/exam-bank/">📝 {examCount[c.id]} câu đề</a> : null}
                {c.sources.map(s => <span key={s} className="tx-src" title={srcLabel(s)}>{s}</span>)}
              </div>
            </div>
          </details>
        ))}
      </div>}

      {tab === 'numbers' && <table className="ql-tbl ql-big">
        <thead><tr><th>Phần</th><th>Con số</th><th>Giá trị</th><th>Thẻ</th></tr></thead>
        <tbody>{numRows.map(({ c, n }, i) => <tr key={i}><td><Badge p={c.part} /></td><td>{n.label}</td><td><b>{n.value}</b></td><td><a href={`/d/atlas/#n-${c.id}`}>{c.title_vi}</a>{n.src && <span className="tx-src" title={srcLabel(n.src)}>{n.src}</span>}</td></tr>)}</tbody>
      </table>}

      {tab === 'formulas' && <div className="ql-list">
        {fRows.map(c => <div key={c.id} className="ql-row ql-f"><div><Badge p={c.part} /> <a href={`/d/atlas/#n-${c.id}`}><b>{c.title_vi}</b></a> <small>{c.title_en}</small></div><pre className="tx-formula">{c.formula}</pre></div>)}
      </div>}

      {tab === 'trees' && <div className="dt-list">
        {tRows.map(t => <a key={t.id} href={`/d/decide/${t.id}/`}><Badge p={t.part} /> <b>{t.title_vi}</b><small>Câu đầu: {t.nodes[t.start].q_vi}</small></a>)}
      </div>}

      {counts[tab] === 0 && <p>Không tìm thấy “{q}”. Thử từ khác, bỏ lọc phần, hoặc tìm bằng tiếng Anh.</p>}
      <p className="tx-note">Gõ không dấu vẫn tìm được (“cu tru” ra “cư trú”); gõ có dấu để lọc chính xác hơn. Con số lấy từ thẻ Atlas theo luật hiện hành cho kỳ thi 12/2026; bảng đầy đủ ở D7 · Bảng thuế.</p>
    </div>
  );
}
