import { useState } from 'react';
import { money } from '../lib/fmt';
import './calc.css';

/** Máy tính suy rộng theo tỷ lệ (T#p2l2). Mặc định = ví dụ MUS doanh thu, Công ty A. */
export default function ProjectionCalc({ pop = 9e9, sample = 600e6, err = 6e6, ctt = 12.5e6, pm = 175e6, om = 250e6 }: { pop?: number; sample?: number; err?: number; ctt?: number; pm?: number; om?: number }) {
  const [P, setP] = useState(pop / 1e9), [S, setS] = useState(sample / 1e9), [E, setE] = useState(err / 1e6);
  const rate = S > 0 ? (E * 1e6) / (S * 1e9) : 0, proj = rate * P * 1e9;
  const v = proj < ctt ? ['ok', `Dưới CTT ${money(ctt)}: không tổng hợp.`] : proj <= pm ? ['mid', `Từ CTT ${money(ctt)}: đưa vào bảng tổng hợp. Chưa vượt PM.`] : proj <= om ? ['mid', `Vượt PM ${money(pm)}: mở rộng thủ tục ở khoản mục này.`] : ['bad', `Vượt OM ${money(om)}: ảnh hưởng ý kiến nếu không điều chỉnh.`];
  return (
    <div className="calc">
      <div className="row">
        <label>Population (tỷ đồng, không gồm key items)<input type="number" step="0.1" value={P} onChange={e => setP(+e.target.value)} /></label>
        <label>Giá trị mẫu (tỷ đồng)<input type="number" step="0.01" value={S} onChange={e => setS(+e.target.value)} /></label>
        <label>Sai sót trong mẫu (triệu đồng)<input type="number" step="0.1" value={E} onChange={e => setE(+e.target.value)} /></label>
      </div>
      <div className="out">
        <div><small>Tỷ lệ sai</small><b>{(rate * 100).toLocaleString('vi-VN', { maximumFractionDigits: 2 })}%</b></div>
        <div><small>Sai sót suy rộng</small><b>{money(proj)}</b></div>
        <div><small>So với PM {money(pm)}</small><b>{Math.round((100 * proj) / pm)}%</b></div>
      </div>
      <div className={`verdict ${v[0]}`}>{v[1]}</div>
    </div>
  );
}
