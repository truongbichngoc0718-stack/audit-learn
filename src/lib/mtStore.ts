/** Tiến độ nhánh E (Ôn test MT). localStorage khóa `mt-progress-v1`: { [questionId]: MtRec }. */
export interface MtRec { n: number; last?: number; best?: number; ts?: number; flag?: boolean }
export type MtProgress = Record<string, MtRec>;
const KEY = 'mt-progress-v1';

export function loadMt(): MtProgress {
  try { const r = typeof localStorage !== 'undefined' ? localStorage.getItem(KEY) : null; return r ? JSON.parse(r) : {}; } catch { return {}; }
}
export function saveMt(p: MtProgress) { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* storage bị chặn */ } }

/** Trạng thái theo lần làm gần nhất: 1 = đúng ngay, 0,5 = đúng lần chọn lại, 0 = sai cả hai lượt. */
export function statusOf(r?: MtRec): string {
  if (!r || !r.n) return 'Chưa làm';
  if (r.last === 1) return 'Đã đúng';
  if (r.last === 0.5) return 'Đúng lần 2';
  return 'Đang sai';
}

export const exportMt = () => JSON.stringify(loadMt());
/** Gộp: giữ bản ghi mới hơn của từng câu. */
export function importMt(text: string) {
  const inc = JSON.parse(text) as MtProgress; const cur = loadMt();
  for (const [k, v] of Object.entries(inc)) if (!cur[k] || (v.ts ?? 0) > (cur[k].ts ?? 0)) cur[k] = v;
  saveMt(cur);
}
