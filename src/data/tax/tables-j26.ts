/** Hằng số bảng thuế ACCA TX-VNM J26–J27 (source/library/acca-tx-vnm/tax-tables-j26-j27.md). Mọi máy tính và trang bảng thuế lấy từ file này. */
export const VAT = { standard: 0.10, reduced: 0.05 };
export const CIT_RATE = 0.20;
export const FX_USD = 26_500;

export const FCT_VAT: { id: string; label: string; rate: number }[] = [
  { id: 'v1', label: '1. Dịch vụ, cho thuê máy móc thiết bị, nhà xưởng, thuê khác không kèm dịch vụ, bảo hiểm', rate: 0.05 },
  { id: 'v2a', label: '2a. Sản xuất, vận tải, dịch vụ kèm cung cấp hàng hóa; xây lắp có cung cấp vật tư/máy móc; sửa chữa, bảo trì; dịch vụ gắn với hàng hóa (đào tạo, chuyển giao công nghệ); ăn uống; hợp đồng trọn gói', rate: 0.03 },
  { id: 'v2b', label: '2b. Xây dựng, lắp đặt không bao gồm vật tư, máy móc', rate: 0.05 },
  { id: 'v3a', label: '3a. Sản xuất, kinh doanh khác chịu VAT 10%', rate: 0.03 },
  { id: 'v3b', label: '3b. Sản xuất, kinh doanh khác chịu VAT 5% và các hàng hóa, dịch vụ không liệt kê', rate: 0.02 },
  { id: 'v4', label: '4. Nhà cung cấp nước ngoài không có PE bán qua thương mại điện tử, nền tảng số', rate: 0.10 },
];
export const FCT_CIT: { id: string; label: string; rate: number }[] = [
  { id: 'c1', label: '1. Thương mại: phân phối, cung cấp hàng hóa, nguyên liệu, máy móc kèm dịch vụ tại VN (kể cả xuất khẩu tại chỗ, Incoterms)', rate: 0.01 },
  { id: 'c2', label: '2. Dịch vụ, cho thuê máy móc thiết bị, bảo hiểm, cho thuê giàn khoan', rate: 0.05 },
  { id: 'c3', label: '3. Quản lý nhà hàng, khách sạn, casino', rate: 0.10 },
  { id: 'c4', label: '4. Cho thuê máy bay, động cơ, phụ tùng máy bay, tàu biển', rate: 0.02 },
  { id: 'c5', label: '5. Xây dựng, lắp đặt (có hoặc không kèm vật tư, máy móc); hợp đồng trọn gói', rate: 0.02 },
  { id: 'c6', label: '6. Sản xuất, kinh doanh khác và vận tải (kể cả vận tải biển, hàng không)', rate: 0.02 },
  { id: 'c7', label: '7. Chuyển nhượng chứng khoán, tái bảo hiểm, hoa hồng tái bảo hiểm', rate: 0.001 },
  { id: 'c8', label: '8. Phái sinh', rate: 0.02 },
  { id: 'c9', label: '9. Lãi tiền vay', rate: 0.10 },
  { id: 'c10', label: '10. Tiền bản quyền', rate: 0.10 },
  { id: 'c11', label: '11. Chuyển nhượng phần vốn góp, cổ phần (trừ tái cơ cấu nội bộ không đổi công ty mẹ tối cao)', rate: 0.02 },
];

/** Biểu lũy tiến PIT (thu nhập tính thuế/tháng) và công thức rút gọn T = rate·G − sub. */
export const PIT_BANDS: { upTo: number; rate: number; sub: number }[] = [
  { upTo: 5_000_000, rate: 0.05, sub: 0 },
  { upTo: 10_000_000, rate: 0.10, sub: 250_000 },
  { upTo: 18_000_000, rate: 0.15, sub: 750_000 },
  { upTo: 32_000_000, rate: 0.20, sub: 1_650_000 },
  { upTo: 52_000_000, rate: 0.25, sub: 3_250_000 },
  { upTo: 80_000_000, rate: 0.30, sub: 5_850_000 },
  { upTo: Infinity, rate: 0.35, sub: 9_850_000 },
];
/** Net → gross: G = (N − sub) / div, theo khoảng của N. */
export const NET_TO_GROSS: { upTo: number; sub: number; div: number }[] = [
  { upTo: 4_750_000, sub: 0, div: 0.95 },
  { upTo: 9_250_000, sub: 250_000, div: 0.9 },
  { upTo: 16_050_000, sub: 750_000, div: 0.85 },
  { upTo: 27_250_000, sub: 1_650_000, div: 0.8 },
  { upTo: 42_250_000, sub: 3_250_000, div: 0.75 },
  { upTo: 61_850_000, sub: 5_850_000, div: 0.7 },
  { upTo: Infinity, sub: 9_850_000, div: 0.65 },
];
export const NON_RESIDENT_EMPLOYMENT = 0.20;
export const PIT_OTHER = [
  { label: 'Investment income', resident: '5%', non: '5%' },
  { label: 'Capital (non-securities) transfers', resident: '20% on gain', non: '0.1% of selling price' },
  { label: 'Securities transfers', resident: '0.1% of selling price', non: '0.1% of selling price' },
  { label: 'Transfers of property', resident: '2% of selling price', non: '2% of selling price' },
  { label: 'Royalties/franchises', resident: '5% of income in excess of VND10m', non: '5% of income in excess of VND10m' },
  { label: 'Prizes/inheritances', resident: '10% of income in excess of VND10m', non: '10% of income in excess of VND10m' },
];
export const PIT_BUSINESS = [
  { label: 'Sales of goods', rate: 0.005 },
  { label: 'Services and construction', rate: 0.02 },
  { label: 'Lease of property and agency', rate: 0.05 },
  { label: 'Manufacturing, construction and services attached with good supply', rate: 0.015 },
  { label: 'Others', rate: 0.01 },
];
export const PIT_BUSINESS_THRESHOLD = 100_000_000;
export const DEDUCTION = { self: 11_000_000, dependant: 4_400_000 };
export const SI = { pension: 0.08, health: 0.015, unemployment: 0.01, cap: 46_800_000 };
export const fmt = (n: number) => Math.round(n).toLocaleString('vi-VN');

export function pitTax(assessable: number): number {
  if (assessable <= 0) return 0;
  const b = PIT_BANDS.find(x => assessable <= x.upTo)!;
  return b.rate * assessable - b.sub;
}
export function netToGross(net: number): number {
  const b = NET_TO_GROSS.find(x => net <= x.upTo)!;
  return (net - b.sub) / b.div;
}
