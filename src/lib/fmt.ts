export const vnd = (n: number, digits = 0) => n.toLocaleString('vi-VN', { maximumFractionDigits: digits });
/** Hiển thị số tiền theo đơn vị phù hợp: "12,5 triệu", "3,6 tỷ" */
export const money = (n: number) => {
  const a = Math.abs(n);
  if (a >= 1e9) return `${vnd(n / 1e9, 2)} tỷ`;
  if (a >= 1e6) return `${vnd(n / 1e6, 1)} triệu`;
  return `${vnd(n)} đ`;
};
