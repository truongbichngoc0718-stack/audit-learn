import { useState } from 'react';
import { money } from '../lib/fmt';
import './calc.css';

/** Gói dịch vụ trả trước: doanh thu năm nay vs số dư 3387 (T#p3l1 Bước 5). */
export default function DeferredRevenueCalc({ value = 120e6, start = 10, months = 12, label = 'Giá trị gói (đồng, thu đủ khi ký)' }: { value?: number; start?: number; months?: number; label?: string }) {
  const [V, setV] = useState(value), [st, setSt] = useState(start), [n, setN] = useState(months);
  const inYear = Math.max(0, Math.min(n, 12 - st + 1)), rev = (V * inYear) / n, def = V - rev;
  return (
    <div className="calc">
      <div className="row">
        <label>{label}<input type="number" value={V} onChange={e => setV(+e.target.value)} /></label>
        <label>Tháng bắt đầu dùng dịch vụ (năm 2025)<select value={st} onChange={e => setSt(+e.target.value)}>{Array.from({ length: 12 }, (_, i) => <option key={i} value={i + 1}>Tháng {i + 1}/2025</option>)}</select></label>
        <label>Thời hạn (tháng)<input type="number" min={1} value={n} onChange={e => setN(Math.max(1, +e.target.value))} /></label>
      </div>
      <div className="out">
        <div><small>Doanh thu 2025</small><b>{money(rev)}</b></div>
        <div><small>Còn trên 3387 tại 31/12/2025</small><b>{money(def)}</b></div>
      </div>
      <div className={`verdict ${def > 0 ? 'bad' : 'ok'}`}>{inYear}/{n} tháng thuộc năm 2025. {def > 0 ? `Ghi hết vào doanh thu khi xuất hóa đơn → doanh thu 2025 ghi thừa ${money(def)}.` : 'Toàn bộ gói thuộc năm 2025.'}</div>
    </div>
  );
}
