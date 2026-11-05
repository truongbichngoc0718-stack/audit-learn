import { useEffect, useState } from 'react';
import './calc.css';
const FIELDS = ['1 · Area / Finding ID', '2 · Item tested', '3 · Objective', '4 · Evidence obtained', '5 · Work performed', '6 · Finding & FS impact', '7 · Proposed adjustment', '8 · Conclusion'];
const KEY = 'audit-hub:miniwp';
type WP = Record<string, string>;
/** Soạn mini working paper 8 trường, lưu trên trình duyệt, xuất Markdown [SITE MỚI]. */
export default function MiniWPForm() {
  const [list, setList] = useState<WP[]>([{}]); const [i, setI] = useState(0);
  useEffect(() => { try { const r = localStorage.getItem(KEY); if (r) setList(JSON.parse(r)); } catch {} }, []);
  const save = (l: WP[]) => { setList(l); try { localStorage.setItem(KEY, JSON.stringify(l)); } catch {} };
  const wp = list[i] ?? {};
  const set = (f: string, v: string) => save(list.map((w, k) => (k === i ? { ...w, [f]: v } : w)));
  const md = () => list.map((w, k) => `## Mini working paper #${k + 1}\n` + FIELDS.map(f => `**${f}**\n${w[f] ?? ''}\n`).join('\n')).join('\n---\n');
  const dl = () => { const b = new Blob([md()], { type: 'text/markdown' }); const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'mini-working-paper.md'; a.click(); };
  return (
    <div className="calc">
      <div className="presets">
        {list.map((w, k) => <button key={k} type="button" className={k === i ? 'on' : ''} onClick={() => setI(k)}>{(w[FIELDS[0]] || `#${k + 1}`).slice(0, 18)}</button>)}
        <button type="button" onClick={() => { save([...list, {}]); setI(list.length); }}>+ Finding mới</button>
      </div>
      {FIELDS.map(f => (
        <label key={f} style={{ marginTop: '.5rem' }}>{f}
          <textarea rows={f.startsWith('5') || f.startsWith('6') ? 3 : 1} value={wp[f] ?? ''} onChange={e => set(f, e.target.value)}
            style={{ font: 'inherit', borderRadius: 8, border: '1px solid var(--bisc-line)', padding: '.4rem', background: 'transparent', color: 'inherit' }} />
        </label>
      ))}
      <div style={{ display: 'flex', gap: '.5rem', marginTop: '.8rem' }}>
        <button type="button" className="b-btn" onClick={dl}>Xuất Markdown</button>
        {list.length > 1 && <button type="button" className="b-btn ghost" onClick={() => { const l = list.filter((_, k) => k !== i); save(l); setI(0); }}>Xóa finding này</button>}
      </div>
    </div>
  );
}
