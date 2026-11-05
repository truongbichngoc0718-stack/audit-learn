/**
 * Lưu tiến độ, ghi chú, điểm quiz.
 * Giai đoạn 1: localStorage. Mọi truy cập đi qua interface `Backend` để sau này
 * thay bằng Supabase (cùng shape dữ liệu, thêm user_id) mà không sửa component.
 */
export interface LessonState { title: string; path: string; visitedAt?: string; done?: boolean; note?: string; quiz?: { score: number; total: number; at: string } }
export interface HubData { version: 1; lessons: Record<string, LessonState> }

interface Backend { load(): HubData; save(d: HubData): void }
const KEY = 'audit-hub:v1';
const empty = (): HubData => ({ version: 1, lessons: {} });

const localBackend: Backend = {
  load() { try { const r = localStorage.getItem(KEY); return r ? { ...empty(), ...JSON.parse(r) } : empty(); } catch { return empty(); } },
  save(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch { /* storage bị chặn: bỏ qua */ } },
};
let backend: Backend = localBackend;
export const setBackend = (b: Backend) => { backend = b; };

const listeners = new Set<() => void>();
export const subscribe = (fn: () => void) => { listeners.add(fn); return () => { listeners.delete(fn); }; };
function update(id: string, patch: (s: LessonState) => LessonState, title = '', path = '') {
  const d = backend.load();
  const cur = d.lessons[id] ?? { title, path };
  d.lessons[id] = patch({ ...cur, title: title || cur.title, path: path || cur.path });
  backend.save(d); listeners.forEach(f => f());
}
export const getData = () => backend.load();
export const getLesson = (id: string): LessonState | undefined => backend.load().lessons[id];
export const markVisited = (id: string, title: string, path: string) => update(id, s => ({ ...s, visitedAt: s.visitedAt ?? new Date().toISOString() }), title, path);
export const setDone = (id: string, done: boolean) => update(id, s => ({ ...s, done }));
export const setNote = (id: string, note: string) => update(id, s => ({ ...s, note }));
export const setQuiz = (id: string, score: number, total: number) => update(id, s => ({ ...s, quiz: { score, total, at: new Date().toISOString() } }));

export function exportJSON(): string { return JSON.stringify({ ...backend.load(), exportedAt: new Date().toISOString() }, null, 2); }
export function importJSON(text: string, mode: 'merge' | 'replace' = 'merge') {
  const inc = JSON.parse(text) as HubData;
  if (inc.version !== 1 || typeof inc.lessons !== 'object') throw new Error('File không đúng định dạng Audit Learning Hub');
  const d = mode === 'replace' ? empty() : backend.load();
  for (const [k, v] of Object.entries(inc.lessons)) d.lessons[k] = { ...d.lessons[k], ...v };
  backend.save(d); listeners.forEach(f => f());
}
