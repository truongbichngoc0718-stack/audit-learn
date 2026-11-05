import { useState } from 'react';
export interface JE { id: string; entered: string; user: string; pair: string; amount: string; desc: string; flags: string[] }
/** Bật/tắt tiêu chí lọc bút toán tay — T#p3l7 Bước 3. */
export default function JEFilter({ criteria, rows }: { criteria: string[]; rows: JE[] }) {
  const [on, setOn] = useState<string[]>(criteria);
  const hit = (r: JE) => r.flags.filter(f => on.includes(f));
  const short = rows.filter(r => hit(r).length > 0).length;
  return (
    <div className="calc">
      <div className="presets">{criteria.map(c => <button key={c} type="button" className={on.includes(c) ? 'on' : ''} onClick={() => setOn(on.includes(c) ? on.filter(x => x !== c) : [...on, c])}>{c}</button>)}</div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ fontSize: '.8rem' }}><thead><tr><th>Số CT</th><th>Ngày nhập</th><th>Người lập</th><th>Nợ / Có</th><th>Số tiền</th><th>Diễn giải</th><th>Tiêu chí khớp</th></tr></thead>
          <tbody>{rows.map(r => { const h = hit(r); return (
            <tr key={r.id} style={{ background: h.length ? 'var(--bisc-rose-soft)' : undefined }}><td>{r.id}</td><td>{r.entered}</td><td>{r.user}</td><td>{r.pair}</td><td style={{ textAlign: 'right' }}>{r.amount}</td><td>{r.desc}</td><td>{h.join(' · ')}</td></tr>); })}</tbody></table>
      </div>
      <div className="verdict mid">Danh sách ngắn: <b>{short}</b> / {rows.length} bút toán → chuyển sang bước vouch và phê duyệt</div>
    </div>
  );
}
