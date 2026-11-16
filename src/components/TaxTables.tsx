import { FCT_VAT, FCT_CIT, PIT_BANDS, NET_TO_GROSS, PIT_OTHER, PIT_BUSINESS, PIT_BUSINESS_THRESHOLD, DEDUCTION, SI, VAT, CIT_RATE, FX_USD, NON_RESIDENT_EMPLOYMENT, fmt } from '../data/tax/tables-j26';

const pct = (r: number) => `${+(r * 100).toFixed(2)}%`;
const up = (n: number) => (n === Infinity ? 'Trên' : fmt(n));

/** Bảng thuế đề thi J26–J27 (nguồn: source/library/acca-tx-vnm/tax-tables-j26-j27.md), render từ tables-j26.ts. */
export default function TaxTables() {
  return (
    <div className="tx tx-tables">
      <h3 id="chung">Mức chung</h3>
      <table><tbody>
        <tr><td>VAT</td><td>Thuế suất chuẩn {pct(VAT.standard)}, thuế suất giảm {pct(VAT.reduced)}</td></tr>
        <tr><td>CIT</td><td>{pct(CIT_RATE)}</td></tr>
        <tr><td>Tỷ giá</td><td>USD 1 = VND {fmt(FX_USD)}</td></tr>
        <tr><td>Giảm trừ gia cảnh</td><td>Bản thân {fmt(DEDUCTION.self)}/tháng; người phụ thuộc {fmt(DEDUCTION.dependant)}/tháng</td></tr>
        <tr><td>Bảo hiểm bắt buộc</td><td>Hưu trí {pct(SI.pension)} + y tế {pct(SI.health)} + thất nghiệp {pct(SI.unemployment)}; trần lương đóng {fmt(SI.cap)}/tháng; người nước ngoài không đóng bảo hiểm thất nghiệp</td></tr>
        <tr><td>Cá nhân không cư trú, thu nhập từ tiền lương</td><td>{pct(NON_RESIDENT_EMPLOYMENT)}</td></tr>
      </tbody></table>
      <h3 id="pit">PIT: biểu lũy tiến (thu nhập tính thuế/tháng)</h3>
      <table><thead><tr><th>Đến (VND)</th><th>Thuế suất</th><th>Công thức rút gọn</th></tr></thead><tbody>
        {PIT_BANDS.map((b, i) => <tr key={i}><td>{up(b.upTo)}</td><td>{pct(b.rate)}</td><td>{pct(b.rate)} × G − {fmt(b.sub)}</td></tr>)}
      </tbody></table>
      <h3 id="net-gross">PIT: quy đổi net → gross</h3>
      <table><thead><tr><th>Thu nhập net đến (VND)</th><th>G = (N − hằng số) / hệ số</th></tr></thead><tbody>
        {NET_TO_GROSS.map((b, i) => <tr key={i}><td>{up(b.upTo)}</td><td>(N − {fmt(b.sub)}) / {b.div}</td></tr>)}
      </tbody></table>
      <h3 id="pit-khac">PIT: thu nhập khác</h3>
      <table><thead><tr><th>Loại thu nhập</th><th>Cư trú</th><th>Không cư trú</th></tr></thead><tbody>
        {PIT_OTHER.map(r => <tr key={r.label}><td>{r.label}</td><td>{r.resident}</td><td>{r.non}</td></tr>)}
      </tbody></table>
      <h3 id="pit-kd">PIT: hộ, cá nhân kinh doanh (doanh thu trên {fmt(PIT_BUSINESS_THRESHOLD)}/năm)</h3>
      <table><tbody>{PIT_BUSINESS.map(r => <tr key={r.label}><td>{r.label}</td><td>{pct(r.rate)}</td></tr>)}</tbody></table>
      <h3 id="fct-vat">FCT: tỷ lệ VAT trên doanh thu</h3>
      <table><tbody>{FCT_VAT.map(r => <tr key={r.id}><td>{r.label}</td><td>{pct(r.rate)}</td></tr>)}</tbody></table>
      <h3 id="fct-cit">FCT: tỷ lệ CIT trên doanh thu</h3>
      <table><tbody>{FCT_CIT.map(r => <tr key={r.id}><td>{r.label}</td><td>{pct(r.rate)}</td></tr>)}</tbody></table>
      <p className="tx-note">Số liệu lấy từ bảng thuế J26–J27 được cấp cho đề tháng 12/2026. Đối chiếu với file gốc trong thư viện nguồn khi có nghi ngờ.</p>
    </div>
  );
}
