import { useState } from 'react';
import './exam.css';

export interface MmLeaf { t: string; note?: string; href?: string }
export interface MmBranch { t: string; sub?: string; items: MmLeaf[] }

/** Mindmap ôn tập: nút gốc + các nhánh bấm để mở/đóng. Dùng cho Knowledge revision của checkpoint và tổng quan nhánh C. */
export default function Mindmap({ root, sub, branches, openAll = false }: { root: string; sub?: string; branches: MmBranch[]; openAll?: boolean }) {
  const [open, setOpen] = useState<Record<number, boolean>>(() => Object.fromEntries(branches.map((_, i) => [i, openAll])));
  const all = branches.every((_, i) => open[i]);
  return (
    <div className="x-mm">
      <div className="root">{root}{sub && <small>{sub}</small>}</div>
      <div><button type="button" className="b-btn ghost" style={{ fontSize: '.8rem', padding: '.25rem .7rem' }}
        onClick={() => setOpen(Object.fromEntries(branches.map((_, i) => [i, !all])))}>{all ? 'Collapse all' : 'Expand all'}</button></div>
      <div className="branches">
        {branches.map((b, i) => (
          <div key={i} className="br">
            <button type="button" aria-expanded={!!open[i]} onClick={() => setOpen({ ...open, [i]: !open[i] })}>
              <span><b>{b.t}</b>{b.sub && <><br /><small style={{ color: 'var(--bisc-muted)' }}>{b.sub}</small></>}</span><span aria-hidden>{open[i] ? '−' : '+'}</span>
            </button>
            {open[i] && (
              <ul>{b.items.map((x, k) => (
                <li key={k}>{x.href ? <a href={x.href}>{x.t}</a> : x.t}{x.note && <><br /><small>{x.note}</small></>}</li>
              ))}</ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
