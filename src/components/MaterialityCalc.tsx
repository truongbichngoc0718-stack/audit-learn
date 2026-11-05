import { useState } from 'react';
import { money } from '../lib/fmt';
import './calc.css';

type Preset = { name: string; base: number; bench: string; omPct: number; pmPct: number; cttPct: number; fixed?: { om: number; pm: number; ctt: number } };
const PRESETS: Record<string, Preset> = {
  A: { name: 'Công ty A (minh họa)', base: 5e9, bench: 'LNTT', omPct: 5, pmPct: 70, cttPct: 5 },
  BIS: { name: 'Biscore (đề Simulation)', base: 721_226_300_000, bench: 'Doanh thu thuần', omPct: 0.5, pmPct: 60, cttPct: 5, fixed: { om: 3.6e9, pm: 2.2e9, ctt: 180e6 } },
};
const BENCH: Record<string, string> = { LNTT: '5%', 'Doanh thu thuần': '0,5–1%', 'Tổng tài sản': '1–2%' };

/** Benchmark → OM → PM → CTT, kèm thước đặt sai sót (T#p2l1 "Đặt sai sót lên thước đo"). */
export default function MaterialityCalc({ preset = 'A' }: { preset?: 'A' | 'BIS' }) {
  const [p, setP] = useState<Preset>(PRESETS[preset]);
  const raw = (p.base * p.omPct) / 100;
  const om = p.fixed?.om ?? raw, pm = p.fixed?.pm ?? (om * p.pmPct) / 100, ctt = p.fixed?.ctt ?? (om * p.cttPct) / 100;
  const max = om * 1.2;
  const [mis, setMis] = useState(om * 0.24);
  const m = Math.min(mis, max);
  const verdict = m < ctt ? ['ok', `Dưới CTT ${money(ctt)}: không tổng hợp, trừ dấu hiệu gian lận.`]
    : m <= pm ? ['mid', `Từ CTT ${money(ctt)}: đưa vào bảng tổng hợp sai sót. Chưa vượt PM.`]
    : m <= om ? ['mid', `Vượt PM ${money(pm)} ở một khoản mục: mở rộng thủ tục ở khoản mục đó.`]
    : ['bad', `Vượt OM ${money(om)}: ảnh hưởng ý kiến kiểm toán nếu không điều chỉnh.`];
  const set = (k: keyof Preset, v: string) => setP({ ...p, name: 'Tùy chỉnh', fixed: undefined, [k]: k === 'bench' ? v : Number(v) });
  const pick = (k: 'A' | 'BIS') => { setP(PRESETS[k]); setMis((PRESETS[k].fixed?.om ?? (PRESETS[k].base * PRESETS[k].omPct) / 100) * 0.24); };
  return (
    <div className="calc">
      <div className="presets">
        {(['A', 'BIS'] as const).map(k => <button key={k} type="button" className={p.name === PRESETS[k].name ? 'on' : ''} onClick={() => pick(k)}>{PRESETS[k].name}</button>)}
      </div>
      <div className="row">
        <label>Benchmark<select value={p.bench} onChange={e => set('bench', e.target.value)}>{Object.keys(BENCH).map(b => <option key={b}>{b}</option>)}</select></label>
        <label>Giá trị benchmark (đồng)<input type="number" value={p.base} onChange={e => set('base', e.target.value)} /></label>
        <label>% OM (tham khảo {BENCH[p.bench]})<input type="number" step="0.1" value={p.omPct} onChange={e => set('omPct', e.target.value)} /></label>
        <label>% PM trên OM (50–75%)<input type="number" value={p.pmPct} onChange={e => set('pmPct', e.target.value)} /></label>
        <label>% CTT trên OM (3–5%)<input type="number" value={p.cttPct} onChange={e => set('cttPct', e.target.value)} /></label>
      </div>
      <div className="out">
        <div><small>OM · toàn bộ BCTC</small><b>{money(om)}</b></div>
        <div><small>PM · từng khoản mục</small><b>{money(pm)}</b></div>
        <div><small>CTT · từng sai sót</small><b>{money(ctt)}</b></div>
        <div><small>Vùng đệm OM − PM</small><b>{money(om - pm)}</b></div>
      </div>
      {p.fixed && <div style={{ fontSize: '.75rem', color: 'var(--bisc-muted)', marginTop: '.4rem' }}>Đề làm tròn: OM {money(raw)} → {money(p.fixed.om)}; PM {money((p.fixed.om * p.pmPct) / 100)} → {money(p.fixed.pm)}.</div>}
      <div style={{ marginTop: '1rem', fontSize: '.85rem' }}><b>Kéo để đổi sai sót đã suy rộng: {money(m)}</b></div>
      <input type="range" min={0} max={max} step={max / 400} value={m} onChange={e => setMis(Number(e.target.value))} aria-label="Sai sót đã suy rộng" />
      <div className="ruler">
        <div className="bar" />
        {[['CTT', ctt], ['PM', pm], ['OM', om]].map(([l, v]) => <div key={l as string} className="tick" style={{ left: `${(100 * (v as number)) / max}%` }}><span>{l}</span></div>)}
      </div>
      <div className={`verdict ${verdict[0]}`}>{verdict[1]}</div>
    </div>
  );
}
