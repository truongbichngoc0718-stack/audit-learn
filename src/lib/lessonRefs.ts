import { getCollection } from 'astro:content';
export interface LessonRef { id: string; title: string; path: string; group: string; minutes?: number }

const aParts: Record<string, string> = { '0': 'A0 · Lộ trình', '1': 'A1 · Nền tảng', '2': 'A2 · Materiality', '3': 'A3 · Phần hành', '4': 'A4 · Ghi finding' };
const groupName = (d: any) => d.nhanh === 'C' ? 'C · ACCA Audit & Assurance' : d.nhanh === 'B' ? 'B · Excel & Power BI' : d.nhanh === 'D' ? 'D · Thuế Việt Nam' : d.nhanh === 'lib' ? 'Thư viện' : (aParts[String(d.phan)] ?? `Phần ${d.phan}`);
const order = (id: string) => (id.startsWith('a/') ? '1' : id.startsWith('b/') ? '2' : id.startsWith('c/') || id === 'c' ? '3' : id.startsWith('d/') || id === 'd' ? '4' : '5') + id;
export async function getLessonRefs(): Promise<LessonRef[]> {
const docs = (await getCollection('docs')).filter(e => e.data.id && !['he-thong', 'khung'].includes(e.data.loai));
return docs
  .sort((a, b) => {
    const ga = order(a.id), gb = order(b.id);
    if (ga[0] !== gb[0]) return ga < gb ? -1 : 1;
    const dir = (e: any) => (e.filePath ?? '').endsWith('index.mdx') ? e.id : e.id.split('/').slice(0, -1).join('/');
    const da = dir(a), db = dir(b);
    if (da !== db) return da.localeCompare(db, 'vi', { numeric: true });
    const ia = (a.filePath ?? '').endsWith('index.mdx') ? -1 : 0, ib = (b.filePath ?? '').endsWith('index.mdx') ? -1 : 0;
    return ia - ib || ((a.data.sidebar as any)?.order ?? 50) - ((b.data.sidebar as any)?.order ?? 50) || a.id.localeCompare(b.id, 'vi', { numeric: true });
  })
  .map(e => ({ id: e.data.id!, title: (e.data.sidebar as any)?.label ?? e.data.title, path: `/${e.id}/`, group: groupName(e.data), minutes: e.data.thoi_luong }));
}
