/** Sao lưu / khôi phục toàn bộ dữ liệu học trên trình duyệt: tiến độ bài (audit-hub:v1), Tax Atlas (tax-progress-v1), ghi chú bản đồ GLV (wpmap-notes), Ôn test MT (mt-progress-v1). */
import { exportJSON, importJSON } from './store';
import { exportTax, importTax } from './taxStore';
import { exportMt, importMt } from './mtStore';

export function backupText(): string {
  let glv: Record<string, string> = {};
  try { glv = JSON.parse(localStorage.getItem('wpmap-notes') || '{}'); } catch { /* bỏ qua */ }
  return JSON.stringify({ app: 'audit-learning-hub', version: 2, savedAt: new Date().toISOString(), hub: JSON.parse(exportJSON()), tax: JSON.parse(exportTax()), glvNotes: glv, mt: JSON.parse(exportMt()) }, null, 2);
}

/** Nhận file sao lưu mới (version 2) hoặc file cũ của trang Tiến độ / Tax Atlas. Gộp, không xóa dữ liệu đang có. */
export function restoreText(text: string): string {
  const d = JSON.parse(text);
  const parts: string[] = [];
  if (d?.app === 'audit-learning-hub') {
    if (d.hub) { importJSON(JSON.stringify(d.hub)); parts.push('tiến độ bài'); }
    if (d.tax) { importTax(JSON.stringify(d.tax)); parts.push('Tax Atlas'); }
    if (d.mt && typeof d.mt === 'object') { importMt(JSON.stringify(d.mt)); parts.push('Ôn test MT'); }
    if (d.glvNotes && typeof d.glvNotes === 'object') {
      try { const cur = JSON.parse(localStorage.getItem('wpmap-notes') || '{}'); localStorage.setItem('wpmap-notes', JSON.stringify({ ...cur, ...d.glvNotes })); parts.push('ghi chú giấy làm việc'); } catch { /* bỏ qua */ }
    }
  } else if (d?.lessons) { importJSON(text); parts.push('tiến độ bài'); }
  else if (d?.cards) { importTax(text); parts.push('Tax Atlas'); }
  else throw new Error('File không phải bản sao lưu của Audit Learning Hub');
  return `Đã khôi phục: ${parts.join(', ')}.`;
}
