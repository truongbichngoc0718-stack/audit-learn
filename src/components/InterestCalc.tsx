import { useState } from 'react';
import { money } from '../lib/fmt';
import './calc.css';
/** Lãi vay năm 2025 đến 31/12, cơ sở 365 ngày — T#p3l5 Bước 3. */
export default function InterestCalc({ principal = 90, rate = 10, start = '2025-07-01', end = '2025-12-31', recorded }: { principal?: number; rate?: number; start?: string; end?: string; recorded?: number }) {
  const [P, setP] = useState(principal), [R, setR] = useState(rate), [S, setS] = useState(start), [E, setE] = useState(end), [Rec, setRec] = useState(recorded ?? 0);
  const days = Math.max(0, Math.round((Date.parse(E) - Date.parse(S)) / 864e5) + 1);
  const daily = (P * 1e9 * R) / 100 / 365, total = daily * days;
  return (
    <div className="calc">
      <div className="row">
        <label>Dư nợ gốc (tỷ đồng)<input type="number" step="0.1" value={P} onChange={e => setP(+e.target.value)} /></label>
        <label>Lãi suất (%/năm)<input type="number" step="0.01" value={R} onChange={e => setR(+e.target.value)} /></label>
        <label>Tính lãi từ ngày<input type="date" value={S} onChange={e => setS(e.target.value)} /></label>
        <label>Đến hết ngày<input type="date" value={E} onChange={e => setE(e.target.value)} /></label>
        <label>Đã ghi trên sổ (triệu đồng, 635 + 241)<input type="number" value={Rec} onChange={e => setRec(+e.target.value)} /></label>
      </div>
      <div className="out">
        <div><small>Số ngày tính lãi</small><b>{days}</b></div>
        <div><small>Lãi mỗi ngày</small><b>{money(daily)}</b></div>
        <div><small>Lãi phải ghi nhận</small><b>{money(total)}</b></div>
        <div><small>Chênh lệch so với sổ</small><b>{money(total - Rec * 1e6)}</b></div>
      </div>
      <div className={`verdict ${Math.abs(total - Rec * 1e6) < 1e6 ? 'ok' : 'bad'}`}>{total - Rec * 1e6 > 1e6 ? 'Sổ ghi ít hơn → lãi ghi thiếu, phần chưa trả phải nằm trên 335.' : total - Rec * 1e6 < -1e6 ? 'Sổ ghi nhiều hơn → kiểm tra trùng hoặc vốn hóa không đủ điều kiện.' : 'Khớp với sổ.'}</div>
    </div>
  );
}
