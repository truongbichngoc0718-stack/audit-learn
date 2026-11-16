import { useMemo, useState, useSyncExternalStore } from 'react';
import { cards, trees, partNames, type Part } from '../lib/tax';
import { getTax, subscribe, setTrap } from '../lib/taxStore';

/** Gom mọi ⚠️ bẫy từ thẻ và cây quyết định; lọc theo phần; đánh dấu "đã nắm". */
export default function TrapList() {
  const data = useSyncExternalStore(subscribe, getTax, getTax);
  const [part, setPart] = useState<Part | 'all'>('all');
  const [hideDone, setHideDone] = useState(false);
  const items = useMemo(() => {
    const out: { key: string; part: Part; text: string; src?: string; href: string; label: string }[] = [];
    for (const c of cards) c.traps?.forEach((t, i) => out.push({ key: `${c.id}#${i}`, part: c.part, text: t.text_vi, src: t.src, href: `/d/atlas/#n-${c.id}`, label: c.title_en }));
    for (const t of trees) for (const [nid, n] of Object.entries<any>(t.nodes)) if (n.result && n.trap_vi) out.push({ key: `${t.id}:${nid}`, part: t.part, text: n.trap_vi, src: n.sources?.[0], href: `/d/decide/${t.id}/`, label: `🌳 ${t.title_vi}` });
    return out;
  }, []);
  const list = items.filter(i => (part === 'all' || i.part === part) && !(hideDone && data.traps[i.key]));
  return (
    <div className="tx">
      <div className="tx-bar">
        <select value={part} onChange={e => setPart(e.target.value as any)}><option value="all">Mọi phần</option>{(Object.keys(partNames) as Part[]).map(p => <option key={p} value={p}>{p} · {partNames[p].en}</option>)}</select>
        <label><input type="checkbox" checked={hideDone} onChange={e => setHideDone(e.target.checked)} /> Ẩn bẫy đã nắm</label>
        <span>{items.filter(i => data.traps[i.key]).length}/{items.length} đã nắm</span>
      </div>
      {list.map(i => (
        <div key={i.key} className="tx-trap" style={{ display: 'flex', gap: '.6rem', alignItems: 'flex-start' }}>
          <input type="checkbox" checked={!!data.traps[i.key]} onChange={e => setTrap(i.key, e.target.checked)} aria-label="Đã nắm" style={{ marginTop: '.3rem' }} />
          <div style={{ opacity: data.traps[i.key] ? .55 : 1 }}>{i.text} {i.src && <span className="tx-src">{i.src}</span>}<br /><a href={i.href}><small>{i.part} · {i.label}</small></a></div>
        </div>
      ))}
      {!list.length && <p>Không có bẫy khớp bộ lọc.</p>}
    </div>
  );
}
