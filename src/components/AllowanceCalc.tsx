import { useState } from 'react';
import { money } from '../lib/fmt';
import './calc.css';
/** Từ tuổi nợ đến dự phòng tối thiểu (khung TT48/2019) — T#p3l2 Bước 5. */
const band = (m: number) => m >= 36 ? ['Từ 3 năm', 1] : m >= 24 ? ['2 – dưới 3 năm', .7] : m >= 12 ? ['1 – dưới 2 năm', .5] : m >= 6 ? ['6 tháng – dưới 1 năm', .3] : ['Dưới 6 tháng', 0];
export default function AllowanceCalc({ bal = 2, months = 18 }: { bal?: number; months?: number }) {
  const [B, setB] = useState(bal), [M, setM] = useState(months);
  const [name, rate] = band(M) as [string, number];
  return (
    <div className="calc">
      <div className="row">
        <label>Số dư phải thu (tỷ đồng)<input type="number" step="0.1" value={B} onChange={e => setB(+e.target.value)} /></label>
        <label>Số tháng quá hạn<input type="number" min={0} value={M} onChange={e => setM(+e.target.value)} /></label>
      </div>
      <div className="out">
        <div><small>Nhóm tuổi nợ</small><b>{name}</b></div>
        <div><small>Tỷ lệ tối thiểu</small><b>{rate * 100}%</b></div>
        <div><small>Dự phòng tối thiểu</small><b>{money(B * 1e9 * rate)}</b></div>
      </div>
      <div className="verdict mid">So với số đã trích trên 2293. Trích thiếu → lợi nhuận ghi thừa.</div>
    </div>
  );
}
