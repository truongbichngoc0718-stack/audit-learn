/** Tiến độ học nhánh D (Tax Atlas). localStorage khóa `tax-progress-v1`, xuất/nhập JSON. */
export type CardStatus = 'new' | 'learning' | 'known';
export interface TaxData {
  version: 1;
  cards: Record<string, { status?: CardStatus; note?: string }>;
  exam: Record<string, { ok: boolean; at: string }>;
  fc: Record<string, { box: number; due: string }>;
  traps: Record<string, boolean>;
}
const KEY = 'tax-progress-v1';
const empty = (): TaxData => ({ version: 1, cards: {}, exam: {}, fc: {}, traps: {} });
const listeners = new Set<() => void>();
let cache: TaxData | null = null;

function load(): TaxData {
  if (cache) return cache;
  try { const r = typeof localStorage !== 'undefined' ? localStorage.getItem(KEY) : null; cache = r ? { ...empty(), ...JSON.parse(r) } : empty(); } catch { cache = empty(); }
  return cache!;
}
function save(d: TaxData) {
  cache = d;
  try { localStorage.setItem(KEY, JSON.stringify(d)); } catch { /* storage bị chặn */ }
  listeners.forEach(f => f());
}
export const subscribe = (fn: () => void) => { listeners.add(fn); return () => { listeners.delete(fn); }; };
export const getTax = () => load();
export const setStatus = (id: string, status: CardStatus) => { const d = load(); save({ ...d, cards: { ...d.cards, [id]: { ...d.cards[id], status } } }); };
export const setCardNote = (id: string, note: string) => { const d = load(); save({ ...d, cards: { ...d.cards, [id]: { ...d.cards[id], note } } }); };
export const setExamResult = (id: string, ok: boolean) => { const d = load(); save({ ...d, exam: { ...d.exam, [id]: { ok, at: new Date().toISOString() } } }); };
export const setTrap = (id: string, v: boolean) => { const d = load(); save({ ...d, traps: { ...d.traps, [id]: v } }); };
export const setFc = (id: string, box: number) => {
  const d = load(); const days = [0, 1, 3, 7, 14, 30][Math.min(box, 5)];
  save({ ...d, fc: { ...d.fc, [id]: { box, due: new Date(Date.now() + days * 864e5).toISOString() } } });
};
export const exportTax = () => JSON.stringify({ ...load(), exportedAt: new Date().toISOString() }, null, 2);
export function importTax(text: string) {
  const inc = JSON.parse(text) as TaxData;
  if (inc.version !== 1 || typeof inc.cards !== 'object') throw new Error('File không đúng định dạng tiến độ Tax Atlas');
  const d = load();
  save({ version: 1, cards: { ...d.cards, ...inc.cards }, exam: { ...d.exam, ...inc.exam }, fc: { ...d.fc, ...inc.fc }, traps: { ...d.traps, ...inc.traps } });
}
