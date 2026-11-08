import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { cycles, nodes, edges, scenarios, lenses, nodeById, cycleById, type CycleId, type MapEdge } from '../lib/auditMap';
import './map.css';

type Mode = 'explore' | 'ripple' | 'lens';
const W = 160, H = 58;

function wrap(t: string, max = 18): string[] {
  const words = t.split(' '); const lines: string[] = []; let cur = '';
  for (const w of words) { if ((cur + ' ' + w).trim().length > max && cur) { lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); }
  if (cur) lines.push(cur);
  return lines.slice(0, 2);
}

/**
 * Audit Master Map [SITE MỚI · nhánh C]: mọi khoản mục nối bằng bút toán kép, nhóm theo chu trình.
 * Explore: bấm khoản mục / đường nối. Ripple: chọn sai sót → thấy lan sang đâu. Lens: lớp xuyên suốt (cut-off, ước tính, gian lận…).
 * Dữ liệu: src/lib/auditMap.ts.
 */
export default function AuditMasterMap({ focus, initialMode = 'explore' }: { focus?: CycleId; initialMode?: Mode }) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [sel, setSel] = useState<string | null>(focus ? nodes.find(n => n.cycle === focus)?.id ?? null : 'cash');
  const [edgeSel, setEdgeSel] = useState<MapEdge | null>(null);
  const [cyc, setCyc] = useState<CycleId | null>(focus ?? null);
  const [scn, setScn] = useState(scenarios[0].id);
  const [lens, setLens] = useState(lenses[0].id);
  const [full, setFull] = useState(false);

  useEffect(() => {
    const m = location.hash.match(/^#node-([a-z]+)$/);
    if (m && nodes.some(n => n.id === m[1])) { setSel(m[1]); setMode('explore'); }
  }, []);
  useEffect(() => {
    if (!full) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setFull(false); };
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
  }, [full]);

  const scenario = scenarios.find(s => s.id === scn)!;
  const lensObj = lenses.find(l => l.id === lens)!;
  const neighbours = useMemo(() => {
    if (!sel) return new Set<string>();
    return new Set(edges.filter(e => e.a === sel || e.b === sel).flatMap(e => [e.a, e.b]));
  }, [sel]);

  const nodeState = (id: string): { cls: string; badge?: string } => {
    const n = nodeById(id);
    if (mode === 'ripple') {
      const ef = scenario.effects.find(e => e.node === id);
      return ef ? { cls: ef.dir === 'over' ? 'hit over' : 'hit under', badge: ef.dir === 'over' ? '▲ over' : '▼ under' } : { cls: 'dim' };
    }
    if (mode === 'lens') return lensObj.nodes.includes(id) ? { cls: 'hit lens' } : { cls: 'dim' };
    if (cyc && n.cycle !== cyc && !(sel && neighbours.has(id))) return { cls: 'dim' };
    if (sel) return id === sel ? { cls: 'sel' } : neighbours.has(id) ? { cls: 'near' } : { cls: cyc ? '' : 'soft' };
    return { cls: '' };
  };
  const edgeOn = (e: MapEdge) => {
    if (edgeSel === e) return 'on';
    if (mode === 'ripple') { const ids = scenario.effects.map(x => x.node); return ids.includes(e.a) && ids.includes(e.b) ? 'on' : ''; }
    if (mode === 'lens') return lensObj.nodes.includes(e.a) && lensObj.nodes.includes(e.b) ? 'on lensline' : '';
    if (sel) return e.a === sel || e.b === sel ? 'on' : '';
    if (cyc) { const ca = nodeById(e.a).cycle, cb = nodeById(e.b).cycle; return ca === cyc || cb === cyc ? 'on' : ''; }
    return '';
  };

  const node = sel ? nodeById(sel) : null;
  const pick = (id: string) => { setSel(id); setEdgeSel(null); if (mode !== 'explore') setMode('explore'); };

  const view = (
    <div className={`amm ${full ? 'full' : ''}`}>
      <div className="amm-bar">
        <div className="amm-tabs" role="tablist">
          {([['explore', 'Explore accounts'], ['ripple', 'Ripple: follow a misstatement'], ['lens', 'Lenses across cycles']] as [Mode, string][]).map(([m, l]) => (
            <button key={m} role="tab" aria-selected={mode === m} className={mode === m ? 'on' : ''} onClick={() => { setMode(m); setEdgeSel(null); }}>{l}</button>
          ))}
        </div>
        <button type="button" className="b-btn ghost amm-full" onClick={() => setFull(!full)}>{full ? 'Close full screen (Esc)' : 'Full screen'}</button>
      </div>

      <div className="amm-legend">
        {cycles.map(c => (
          <button key={c.id} type="button" className={`amm-cyc ${cyc === c.id ? 'on' : ''}`} style={{ ['--c' as any]: c.color }}
            onClick={() => { setCyc(cyc === c.id ? null : c.id); setMode('explore'); setEdgeSel(null); }}>
            <i />{c.name}
          </button>
        ))}
      </div>

      <div className="amm-body">
        <div className="amm-scroll"><svg viewBox="0 0 1000 630" className="amm-svg" role="img" aria-label="Audit master map: accounts linked by double entry">
          <defs>
            <pattern id="amm-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="var(--bisc-line)" strokeWidth=".5" opacity=".5" /></pattern>
          </defs>
          <rect x="0" y="0" width="1000" height="630" fill="url(#amm-grid)" rx="14" />
          <text x="18" y="24" className="amm-zone">SOFP + SPL · every line has a twin</text>
          {edges.map((e, i) => {
            const A = nodeById(e.a), B = nodeById(e.b);
            const st = edgeOn(e);
            return (
              <g key={i} className={`amm-edge ${st}`} onClick={() => { setEdgeSel(e); setMode('explore'); }}>
                <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} className="vis" />
                <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} className="hitline"><title>{e.tx}: {e.entry}</title></line>
              </g>
            );
          })}
          {nodes.map(n => {
            const c = cycleById(n.cycle); const s = nodeState(n.id); const lines = wrap(n.short ?? n.name);
            return (
              <g key={n.id} className={`amm-node ${s.cls}`} transform={`translate(${n.x - W / 2},${n.y - H / 2})`} role="button" tabIndex={0}
                aria-label={`${n.name} (${n.vn})`} onClick={() => pick(n.id)} onKeyDown={ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); pick(n.id); } }}>
                <rect width={W} height={H} rx={n.id === 'cash' ? 24 : 10} style={{ stroke: c.color }} />
                <rect width={6} height={H} rx={3} style={{ fill: c.color }} />
                {lines.map((l, k) => <text key={k} x={W / 2 + 3} y={lines.length === 1 ? 26 : 20 + k * 17} className="nm">{l}</text>)}
                <text x={W / 2 + 3} y={H - 7} className="fs">{n.fs} · {n.tk.split(' (')[0]}</text>
                {s.badge && <g transform={`translate(${W - 70},-13)`}><rect width="76" height="22" rx="11" className={`badge ${s.cls.includes('over') ? 'over' : 'under'}`} /><text x="38" y="15.5" className="bt">{s.badge}</text></g>}
              </g>
            );
          })}
        </svg></div>

        <div className="amm-panel" aria-live="polite">
          {mode === 'explore' && edgeSel && (() => {
            const A = nodeById(edgeSel.a), B = nodeById(edgeSel.b);
            return (
              <div>
                <div className="b-kicker">Link · {edgeSel.tx}</div>
                <h4>{A.name} ⇄ {B.name}</h4>
                <p className="entry">{edgeSel.entry}</p>
                <p><b>One test, two answers.</b> {edgeSel.shared}</p>
                <p className="src">Source: {edgeSel.src}</p>
                <div className="amm-links"><button onClick={() => pick(A.id)}>Open {A.name}</button><button onClick={() => pick(B.id)}>Open {B.name}</button></div>
              </div>
            );
          })()}
          {mode === 'explore' && !edgeSel && node && (
            <div>
              <div className="b-kicker" style={{ color: cycleById(node.cycle).color }}>{cycleById(node.cycle).name} · {node.fs}</div>
              <h4>{node.name} <small>· {node.vn} · TK {node.tk}</small></h4>
              <p><b>Main risk:</b> {node.risk}</p>
              <div className="chips">{node.assertions.map(a => <span key={a} className="b-chip as">{a}</span>)}</div>
              <p className="lbl">Key procedures</p>
              <ol>{node.procedures.map((p, i) => <li key={i}>{p}</li>)}</ol>
              <p><b>Analytics:</b> {node.analytics}</p>
              <p className="trap">⚠️ {node.trap}</p>
              <p className="lbl">Linked accounts · click to open the link</p>
              <ul className="amm-edgelist">
                {edges.filter(e => e.a === node.id || e.b === node.id).map((e, i) => {
                  const other = nodeById(e.a === node.id ? e.b : e.a);
                  return <li key={i}><button onClick={() => setEdgeSel(e)}><i style={{ background: cycleById(other.cycle).color }} />{other.name}<span> · {e.tx}</span></button></li>;
                })}
              </ul>
              <p className="src">Source: {node.src} · <a href={cycleById(node.cycle).href}>Cycle playbook →</a>{node.a && <> · Branch A: <a href={node.a.href}>{node.a.label}</a></>}</p>
            </div>
          )}
          {mode === 'explore' && !edgeSel && !node && <p>Click any account or line.</p>}

          {mode === 'ripple' && (
            <div>
              <div className="amm-scn">
                {scenarios.map(s => <button key={s.id} className={s.id === scn ? 'on' : ''} onClick={() => setScn(s.id)}>{s.title}</button>)}
              </div>
              <h4>{scenario.title}</h4>
              <p>{scenario.story}</p>
              <ul className="amm-effects">
                {scenario.effects.map(ef => <li key={ef.node} className={ef.dir}><b>{ef.dir === 'over' ? '▲ Overstated' : '▼ Understated'}</b> {nodeById(ef.node).name}</li>)}
                <li className={scenario.profit === 'none' ? '' : scenario.profit}><b>Profit:</b> {scenario.profit === 'over' ? 'overstated' : scenario.profit === 'under' ? 'understated' : 'no effect'}</li>
              </ul>
              <p><b>Assertion:</b> {scenario.assertion}</p>
              <p><b>How the auditor finds it</b> <span className="b-chip">{scenario.direction}</span><br />{scenario.detect}</p>
              <p><b>Outcome:</b> {scenario.report}</p>
              <p className="src">Source: {scenario.src}</p>
            </div>
          )}

          {mode === 'lens' && (
            <div>
              <div className="amm-scn">
                {lenses.map(l => <button key={l.id} className={l.id === lens ? 'on' : ''} onClick={() => setLens(l.id)}>{l.name}</button>)}
              </div>
              <h4>{lensObj.name}</h4>
              <p>{lensObj.note}</p>
              <div className="chips">{lensObj.nodes.map(id => <button key={id} className="b-chip" onClick={() => pick(id)}>{nodeById(id).name}</button>)}</div>
              <p className="src">Source: {lensObj.src}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  if (full && typeof document !== 'undefined') return <>{createPortal(view, document.body)}<div className="b-card">Map open in full screen. Press Esc to close.</div></>;
  return view;
}
