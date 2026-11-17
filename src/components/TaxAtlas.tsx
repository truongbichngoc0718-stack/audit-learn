import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { cards, edges, cardById, partNames, edgeLabels, srcLabel, treesByCard, type Part, type TaxCard } from '../lib/tax';
import { getTax, subscribe, setStatus, setCardNote, type CardStatus } from '../lib/taxStore';

const PARTS: Part[] = ['A', 'B', 'C', 'D', 'E'];
const statusLabel: Record<CardStatus, string> = { new: '❓ Chưa thuộc', learning: '📖 Đang học', known: '✅ Đã thuộc' };
const useTaxData = () => useSyncExternalStore(subscribe, getTax, getTax);
const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');

function SrcChips({ list }: { list: string[] }) {
  return <div className="tx-chips">{list.map(s => <span key={s} className="tx-src" title={srcLabel(s)}>{s}</span>)}</div>;
}

/** Tax Atlas: cây kiến thức A–E, thẻ ở giữa, dây nối quanh thẻ đang chọn. Deep link #n-<id>. */
export default function TaxAtlas() {
  const data = useTaxData();
  const [sel, setSel] = useState<string>('b-residence-test');
  const [q, setQ] = useState('');
  const [part, setPart] = useState<Part | 'all'>('all');
  const [st, setSt] = useState<'all' | CardStatus>('all');
  const [onlyTrap, setOnlyTrap] = useState(false);
  const [onlyMvp, setOnlyMvp] = useState(false);
  const [open, setOpen] = useState<Record<string, boolean>>({ B: true });
  const [full, setFull] = useState(false);
  const [showF, setShowF] = useState(false);
  const nF = (part !== 'all' ? 1 : 0) + (st !== 'all' ? 1 : 0) + (onlyTrap ? 1 : 0) + (onlyMvp ? 1 : 0);

  useEffect(() => {
    const read = () => { const m = location.hash.match(/^#n-([a-z0-9-]+)$/); if (m && cardById(m[1])) { setSel(m[1]); const c = cardById(m[1])!; setOpen(o => ({ ...o, [c.part]: true })); } };
    read(); window.addEventListener('hashchange', read); return () => window.removeEventListener('hashchange', read);
  }, []);
  useEffect(() => {
    if (!full) return;
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setFull(false); };
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  }, [full]);

  const go = (id: string) => { setSel(id); const c = cardById(id); if (c) setOpen(o => ({ ...o, [c.part]: true })); history.replaceState(null, '', `#n-${id}`); };
  const status = (id: string): CardStatus => data.cards[id]?.status ?? 'new';

  const shown = useMemo(() => {
    const nq = norm(q.trim());
    return cards.filter(c =>
      (part === 'all' || c.part === part) && (st === 'all' || status(c.id) === st) &&
      (!onlyTrap || (c.traps?.length ?? 0) > 0) && (!onlyMvp || c.mvp) &&
      (!nq || norm(`${c.title_en} ${c.title_vi} ${c.summary_vi} ${c.id}`).includes(nq)));
  }, [q, part, st, onlyTrap, onlyMvp, data]);

  const card = cardById(sel) ?? cards[0];
  const rel = edges.filter(e => e.from === card.id || e.to === card.id);
  const relByType = rel.reduce<Record<string, typeof rel>>((m, e) => { (m[e.type] ??= []).push(e); return m; }, {});
  const known = cards.filter(c => status(c.id) === 'known').length;

  const tree = (
    <div className="tx-tree" role="tree">
      {PARTS.map(p => {
        const inPart = shown.filter(c => c.part === p); if (!inPart.length) return null;
        const groups = [...new Set(inPart.map(c => c.group))];
        const isOpen = open[p] || q.trim() !== '';
        return (
          <div key={p}>
            <button type="button" className="tx-part" aria-expanded={isOpen} onClick={() => setOpen({ ...open, [p]: !open[p] })}>
              <span>{p} · {partNames[p].en}</span><span>{inPart.length} {isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && groups.map(g => (
              <div key={g}>
                <div className="tx-grp">{g}</div>
                {inPart.filter(c => c.group === g).map(c => (
                  <button key={c.id} type="button" role="treeitem" className={`tx-node ${c.id === card.id ? 'sel' : ''}`} onClick={() => go(c.id)}>
                    <span className={`tx-dot ${status(c.id)}`} aria-label={statusLabel[status(c.id)]} />
                    <span>{c.title_en}{c.mvp && <span className="tx-star"> ★</span>}{c.traps?.length ? ' ⚠️' : ''}{c.flags?.includes('new') ? ' 🆕' : ''}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        );
      })}
      {!shown.length && <p style={{ padding: '.6rem' }}>Không có thẻ khớp bộ lọc.</p>}
    </div>
  );

  const detail = <CardView card={card} data={data} go={go} />;

  const side = (
    <aside className="tx-side" aria-label="Thẻ liên quan">
      <h4>Liên quan · dây nối</h4>
      {rel.length === 0 && <p>Thẻ này chưa có dây nối.</p>}
      {Object.entries(relByType).map(([t, list]) => (
        <div key={t}>
          <div className="tx-grp">{edgeLabels[t as keyof typeof edgeLabels].icon} {edgeLabels[t as keyof typeof edgeLabels].vi}</div>
          {list.map((e, i) => { const oid = e.from === card.id ? e.to : e.from; const o = cardById(oid); if (!o) return null;
            return <button key={i} type="button" className="tx-rel" onClick={() => go(oid)}><span className="t">{o.title_en}</span><small>{e.why_vi}</small></button>; })}
        </div>
      ))}
      {(treesByCard[card.id]?.length ?? 0) > 0 && <>
        <h4 style={{ marginTop: '.8rem' }}>Cây quyết định dùng thẻ này</h4>
        {treesByCard[card.id].map(t => <a key={t.id} className="tx-rel" href={`/d/decide/${t.id}/`}><span className="t">🌳 {t.title_vi}</span></a>)}
      </>}
    </aside>
  );

  const view = (
    <div className={`tx ${full ? 'tx-full' : ''}`}>
      <div className="tx-bar">
        <input type="search" placeholder="Tìm thẻ (VD: lãi vay, 183, hybrid…)" value={q} onChange={e => setQ(e.target.value)} aria-label="Tìm thẻ" />
        <button type="button" className="b-btn ghost" aria-expanded={showF} onClick={() => setShowF(!showF)}>⚙ Bộ lọc{nF > 0 && <span className="n">{nF}</span>}</button>
        <span className="tx-count">✅ {known}/{cards.length} đã thuộc</span>
        <button type="button" className="b-btn ghost tx-fs" onClick={() => setFull(!full)} title={full ? 'Đóng (Esc)' : 'Mở toàn màn hình'}>{full ? 'Đóng (Esc)' : '⛶'}</button>
      </div>
      {showF && <div className="tx-filters">
        <select value={part} onChange={e => setPart(e.target.value as any)} aria-label="Phần"><option value="all">Mọi phần</option>{PARTS.map(p => <option key={p} value={p}>{p} · {partNames[p].en}</option>)}</select>
        <select value={st} onChange={e => setSt(e.target.value as any)} aria-label="Trạng thái"><option value="all">Mọi trạng thái</option>{(Object.keys(statusLabel) as CardStatus[]).map(s => <option key={s} value={s}>{statusLabel[s]}</option>)}</select>
        <label><input type="checkbox" checked={onlyTrap} onChange={e => setOnlyTrap(e.target.checked)} /> ⚠️ Có bẫy</label>
        <label><input type="checkbox" checked={onlyMvp} onChange={e => setOnlyMvp(e.target.checked)} /> ★ Trọng tâm</label>
        {nF > 0 && <button type="button" className="b-btn ghost" onClick={() => { setPart('all'); setSt('all'); setOnlyTrap(false); setOnlyMvp(false); }}>Xóa lọc</button>}
      </div>}
      <div className="tx-body">
        {tree}
        {full ? <>{detail}{side}</> : <div>{detail}<div style={{ marginTop: '.7rem' }}>{side}</div></div>}
      </div>
    </div>
  );
  if (full && typeof document !== 'undefined') return <>{createPortal(view, document.body)}<div className="b-card">Atlas đang mở toàn màn hình. Nhấn Esc để đóng.</div></>;
  return view;
}

export function CardView({ card, data, go }: { card: TaxCard; data: ReturnType<typeof getTax>; go: (id: string) => void }) {
  const st = data.cards[card.id]?.status ?? 'new';
  const [ex, setEx] = useState(false);
  useEffect(() => setEx(false), [card.id]);
  return (
    <article className="tx-card">
      <div className="tx-chips">
        <span className="tx-pill">{card.part} · {partNames[card.part].en}</span>
        <span className="tx-pill">{card.group}</span>
        {card.mvp && <span className="tx-pill">★ Trọng tâm</span>}
        {card.flags?.includes('new') && <span className="tx-pill cur">🆕 Luật mới 2025–2026</span>}
        {card.flags?.includes('off-focus') && <span className="tx-pill">Ngoài trọng tâm</span>}
        {card.flags?.includes('conflict') && <span className="tx-pill old">⚠️ Nguồn mâu thuẫn</span>}
      </div>
      <h3>{card.title_en}</h3>
      <div className="vi">{card.title_vi}</div>
      <p className="tx-sum">{card.summary_vi}</p>
      <ul className="rules">{card.rules_vi.map((r, i) => <li key={i}>{r}</li>)}</ul>
      {card.numbers?.length ? <table><tbody>{card.numbers.map((n, i) => <tr key={i}><td>{n.label}</td><td><b>{n.value}</b></td><td>{n.src && <span className="tx-src" title={srcLabel(n.src)}>{n.src}</span>}</td></tr>)}</tbody></table> : null}
      {card.formula && <div className="tx-formula">{card.formula}</div>}
      {card.example && <details className="b-reveal" open={ex} onToggle={e => setEx((e.target as HTMLDetailsElement).open)} style={{ marginTop: '.5rem' }}>
        <summary>Ví dụ: {card.example.q_en}</summary>
        <div className="ans">{card.example.a_vi}{card.example.src && <> <span className="tx-src">{card.example.src}</span></>}</div>
      </details>}
      {card.traps?.map((t, i) => <div key={i} className="tx-trap">⚠️ {t.text_vi}{t.src && <> <span className="tx-src">{t.src}</span></>}</div>)}
      {card.conflict_vi && <div className="tx-conflict">❓ <b>Nguồn mâu thuẫn:</b> {card.conflict_vi}</div>}
      {card.legal?.length ? <div className="tx-chips">{card.legal.map(l => <span key={l} className="b-chip std">{l}</span>)}</div> : null}
      <div style={{ fontSize: '.72rem', color: 'var(--bisc-muted)' }}>Nguồn</div>
      <SrcChips list={card.sources} />
      <div className="tx-status" role="group" aria-label="Trạng thái học">
        {(Object.keys(statusLabel) as CardStatus[]).map(s => <button key={s} type="button" className={`b-btn ghost st-${s} ${st === s ? 'on' : ''}`} onClick={() => setStatus(card.id, s)}>{statusLabel[s]}</button>)}
      </div>
      <textarea className="tx-note" placeholder="Ghi chú riêng của bạn cho thẻ này (lưu trong trình duyệt; sao lưu ở trang Tiến độ)…" value={data.cards[card.id]?.note ?? ''} onChange={e => setCardNote(card.id, e.target.value)} aria-label="Ghi chú" />
    </article>
  );
}
