/**
 * Ước tính thời lượng học từ chính nội dung bài (MDX thô), để con số hiển thị luôn khớp với độ dài thật.
 * Đọc: ~170 từ/phút (văn bản chuyên ngành, có số liệu). Thực hành: lời giải Biscore 3′, kiểm tra nhanh 1′,
 * mỗi câu quiz 1′, mỗi công cụ tương tác 3′.
 */
export interface Duration { read: number; practice: number; total: number }
const count = (s: string, re: RegExp) => (s.match(re) ?? []).length;

export function estimate(body = ''): Duration {
  const solutions = count(body, /<Solution\b/g);
  const quick = count(body, /<QuickCheck\b/g);
  const quizQ = /<(Quiz|ExamMcq)\b/.test(body) ? count(body, /\bq\s*:\s*['"`]/g) : 0;
  const tools = count(body, /<[A-Z][A-Za-z]+\b[^>]*client:(load|only|visible|idle)/g) - count(body, /<(LessonNotes|Quiz|FlowDiagram)\b[^>]*client:/g);
  const text = body
    .replace(/^---[\s\S]*?---/, '')
    .replace(/^import .*$/gm, '')
    .replace(/questions=\{\[[\s\S]*?\]\}/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[{}[\]()*_#>`|=-]/g, ' ');
  const words = text.split(/\s+/).filter(w => /[\p{L}\p{N}]/u.test(w)).length;
  const read = Math.max(1, Math.round(words / 170));
  const practice = Math.round(solutions * 3 + quick * 1 + quizQ * 1 + Math.max(0, tools) * 3);
  return { read, practice, total: read + practice };
}
export const fmtDuration = (d: Duration, lang: 'vi' | 'en' = 'vi') =>
  lang === 'en'
    ? (d.practice ? `Read ${d.read} min · Practice ${d.practice} min` : `${d.read} min`)
    : (d.practice ? `Đọc ${d.read}′ · Thực hành ${d.practice}′` : `${d.read} phút đọc`);
