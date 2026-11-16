import { useState } from 'react';
import { FCT_VAT, FCT_CIT, CIT_RATE, VAT, DEDUCTION, SI, pitTax, netToGross, fmt } from '../data/tax/tables-j26';

type Tab = 'pit' | 'fct' | 'vat' | 'cit';
const num = (s: string) => { const n = Number(String(s).replace(/[^\d.-]/g, '')); return Number.isFinite(n) ? n : 0; };
function Field({ label, value, set, unit }: { label: string; value: string; set: (v: string) => void; unit?: string }) {
  return <label className="tx-field"><span>{label}</span><input inputMode="decimal" value={value} onChange={e => set(e.target.value)} />{unit && <small>{unit}</small>}</label>;
}
function Row({ k, v, strong }: { k: string; v: string; strong?: boolean }) { return <tr><td>{k}</td><td style={{ textAlign: 'right', fontWeight: strong ? 800 : 500 }}>{v}</td></tr>; }

function Pit() {
  const [mode, setMode] = useState<'g2n' | 'n2g'>('g2n');
  const [gross, setGross] = useState('60000000');
  const [dep, setDep] = useState('1');
  const [expat, setExpat] = useState(false);
  const [net, setNet] = useState('30000000');
  const g = num(gross);
  const si = expat ? 0 : Math.min(g, SI.cap) * (SI.pension + SI.health + SI.unemployment);
  const ded = DEDUCTION.self + DEDUCTION.dependant * num(dep);
  const assess = Math.max(0, g - si - ded);
  const tax = pitTax(assess);
  return (
    <div>
      <div className="tx-bar"><select value={mode} onChange={e => setMode(e.target.value as any)}><option value="g2n">Gross → net (tháng, cư trú)</option><option value="n2g">Thu nhập tính thuế net → gross</option></select></div>
      {mode === 'g2n' ? <>
        <div className="tx-grid"><Field label="Lương gross/tháng" value={gross} set={setGross} unit="VND" /><Field label="Người phụ thuộc" value={dep} set={setDep} /><label className="tx-field"><span>Người nước ngoài (không đóng BH thất nghiệp)</span><input type="checkbox" checked={expat} onChange={e => setExpat(e.target.checked)} /></label></div>
        <table><tbody>
          <Row k={`Bảo hiểm bắt buộc (8% + 1,5% + 1%, trần ${fmt(SI.cap)})`} v={fmt(si)} />
          <Row k={`Giảm trừ gia cảnh (${fmt(DEDUCTION.self)} + ${dep || 0} × ${fmt(DEDUCTION.dependant)})`} v={fmt(ded)} />
          <Row k="Thu nhập tính thuế" v={fmt(assess)} />
          <Row k="PIT phải nộp (biểu 7 bậc)" v={fmt(tax)} strong />
          <Row k="Lương net" v={fmt(g - si - tax)} strong />
        </tbody></table>
        <p className="tx-note">Trong thi cần thêm: các khoản miễn thuế (ăn trưa trong trần, đồng phục, phụ cấp), thu nhập nhiều nơi, tiền nhà 15%, ngưỡng đóng góp từ thiện. Dùng thẻ Atlas B tương ứng.</p>
      </> : <>
        <div className="tx-grid"><Field label="Thu nhập tính thuế sau thuế (net)" value={net} set={setNet} unit="VND/tháng" /></div>
        <table><tbody><Row k="Thu nhập tính thuế (gross)" v={fmt(netToGross(num(net)))} strong /><Row k="PIT gánh thay" v={fmt(netToGross(num(net)) - num(net))} /></tbody></table>
        <p className="tx-note">Công thức: G = (N − hằng số) / hệ số theo khoảng của N (bảng thuế J26–J27). Gross-up PIT/FCT có được trừ khi tính CIT hay không: xem thẻ có cờ ⚠ xung đột.</p>
      </>}
    </div>
  );
}

function Fct() {
  const [basis, setBasis] = useState<'net2' | 'netcit' | 'gross'>('net2');
  const [val, setVal] = useState('100000');
  const [v, setV] = useState(FCT_VAT[0].id);
  const [c, setC] = useState(FCT_CIT[1].id);
  const [sub, setSub] = useState('0');
  const vr = FCT_VAT.find(x => x.id === v)!.rate, cr = FCT_CIT.find(x => x.id === c)!.rate;
  const x = num(val);
  let citT = 0, vatT = 0, vat = 0, cit = 0;
  if (basis === 'net2') { citT = x / (1 - cr); vatT = Math.max(0, citT - num(sub)) / (1 - vr); vat = vatT * vr; cit = citT * cr; }
  else if (basis === 'netcit') { citT = x / (1 - cr); vatT = Math.max(0, citT - num(sub)); vat = vatT * vr; cit = citT * cr; }
  else { vatT = Math.max(0, x - num(sub)); vat = vatT * vr; citT = x - vat; cit = citT * cr; }
  return (
    <div>
      <div className="tx-bar">
        <select value={basis} onChange={e => setBasis(e.target.value as any)}>
          <option value="net2">Giá net cả CIT và VAT (gross-up CIT rồi VAT)</option>
          <option value="netcit">Giá net CIT, chưa gồm VAT (VAT tính riêng)</option>
          <option value="gross">Giá gross (đã gồm VAT và CIT)</option>
        </select>
      </div>
      <div className="tx-grid">
        <Field label="Giá trị hợp đồng" value={val} set={setVal} />
        <Field label="Phần giao thầu phụ được loại trừ (VAT)" value={sub} set={setSub} />
        <label className="tx-field"><span>Tỷ lệ VAT</span><select value={v} onChange={e => setV(e.target.value)}>{FCT_VAT.map(o => <option key={o.id} value={o.id}>{o.label.slice(0, 60)}… {o.rate * 100}%</option>)}</select></label>
        <label className="tx-field"><span>Tỷ lệ CIT</span><select value={c} onChange={e => setC(e.target.value)}>{FCT_CIT.map(o => <option key={o.id} value={o.id}>{o.label.slice(0, 60)}… {o.rate * 100}%</option>)}</select></label>
      </div>
      <table><tbody>
        <Row k="Doanh thu tính CIT" v={fmt(citT)} /><Row k={`CIT-FCT (${cr * 100}%)`} v={fmt(cit)} strong />
        <Row k="Doanh thu tính VAT" v={fmt(vatT)} /><Row k={`VAT-FCT (${vr * 100}%)`} v={fmt(vat)} strong />
        <Row k="Tổng thuế nhà thầu" v={fmt(cit + vat)} strong />
      </tbody></table>
      <p className="tx-note">Hỗ trợ kiểm tra phép tính, không thay phân tích hợp đồng: tách hay không tách hàng và dịch vụ, nhà thầu phụ, cho thuê, logistics. Xem cây quyết định FCT và thẻ d-nonvas-*.</p>
    </div>
  );
}

function Vat() {
  const [turn, setTurn] = useState('1000000000');
  const [rate, setRate] = useState('0.1');
  const [inp, setInp] = useState('60000000');
  const [shared, setShared] = useState('20000000');
  const [ratio, setRatio] = useState('0.8');
  const [exp, setExp] = useState('500000000');
  const [dom, setDom] = useState('500000000');
  const [inExp, setInExp] = useState('80000000');
  const out = num(turn) * Number(rate);
  const deduct = num(inp) + num(shared) * Number(ratio);
  const domVat = num(dom) * 0.1;
  const expCap = num(exp) * 0.1;
  const eligible = num(inExp) - domVat;
  const refund = eligible >= 300_000_000 ? Math.min(eligible, expCap) : 0;
  return (
    <div>
      <h4>1. VAT phải nộp (khấu trừ) và phân bổ đầu vào dùng chung</h4>
      <div className="tx-grid"><Field label="Doanh thu chịu thuế" value={turn} set={setTurn} /><label className="tx-field"><span>Thuế suất</span><select value={rate} onChange={e => setRate(e.target.value)}><option value="0.1">{VAT.standard * 100}%</option><option value="0.05">{VAT.reduced * 100}%</option><option value="0">0%</option></select></label>
        <Field label="VAT đầu vào được khấu trừ trực tiếp" value={inp} set={setInp} /><Field label="VAT đầu vào dùng chung" value={shared} set={setShared} /><Field label="Tỷ lệ doanh thu chịu thuế / tổng (0–1)" value={ratio} set={setRatio} /></div>
      <table><tbody><Row k="VAT đầu ra" v={fmt(out)} /><Row k="VAT đầu vào được khấu trừ" v={fmt(deduct)} /><Row k={out - deduct >= 0 ? 'VAT phải nộp' : 'VAT còn được khấu trừ chuyển kỳ sau'} v={fmt(Math.abs(out - deduct))} strong /></tbody></table>
      <h4>2. Hoàn thuế hàng xuất khẩu (vừa xuất khẩu vừa bán nội địa)</h4>
      <div className="tx-grid"><Field label="Doanh thu xuất khẩu" value={exp} set={setExp} /><Field label="Doanh thu nội địa (10%)" value={dom} set={setDom} /><Field label="VAT đầu vào của hàng xuất khẩu" value={inExp} set={setInExp} /></div>
      <table><tbody><Row k="VAT đầu vào XK − VAT phải nộp nội địa" v={fmt(eligible)} /><Row k="Trần 10% doanh thu xuất khẩu" v={fmt(expCap)} /><Row k="VAT được hoàn (cần ≥ 300 triệu)" v={fmt(refund)} strong /></tbody></table>
    </div>
  );
}

function Cit() {
  const [profit, setProfit] = useState('2000000000');
  const [add, setAdd] = useState('150000000');
  const [less, setLess] = useState('50000000');
  const [loss, setLoss] = useState('0');
  const [st, setSt] = useState('0');
  const t0 = num(profit) + num(add) - num(less);
  const t1 = Math.max(0, t0 - num(loss));
  const t2 = Math.max(0, t1 - num(st));
  return (
    <div>
      <div className="tx-grid"><Field label="Lợi nhuận kế toán trước thuế" value={profit} set={setProfit} /><Field label="Cộng: chi phí không được trừ, thu nhập khác" value={add} set={setAdd} /><Field label="Trừ: thu nhập miễn thuế, chi phí được trừ thêm" value={less} set={setLess} /><Field label="Lỗ chuyển (≤ 5 năm)" value={loss} set={setLoss} /><Field label="Trích quỹ KH&CN" value={st} set={setSt} /></div>
      <table><tbody><Row k="Thu nhập chịu thuế trước lỗ" v={fmt(t0)} /><Row k="Thu nhập tính thuế" v={fmt(t2)} /><Row k={`CIT (${CIT_RATE * 100}%)`} v={fmt(t2 * CIT_RATE)} strong /></tbody></table>
      <p className="tx-note">Thứ tự: bù lỗ trước, trích quỹ KH&CN sau. Ưu đãi thuế suất, miễn giảm và các trần chi phí tra ở thẻ C tương ứng.</p>
    </div>
  );
}

export default function TaxCalc() {
  const [tab, setTab] = useState<Tab>('pit');
  const tabs: [Tab, string][] = [['pit', 'PIT'], ['fct', 'FCT'], ['vat', 'VAT'], ['cit', 'CIT']];
  return (
    <div className="tx">
      <div className="tx-bar">{tabs.map(([k, l]) => <button key={k} type="button" className={`b-btn ${tab === k ? '' : 'ghost'}`} onClick={() => setTab(k)}>{l}</button>)}</div>
      {tab === 'pit' && <Pit />}{tab === 'fct' && <Fct />}{tab === 'vat' && <Vat />}{tab === 'cit' && <Cit />}
    </div>
  );
}
