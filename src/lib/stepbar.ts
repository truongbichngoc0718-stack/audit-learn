/**
 * Thanh tiến trình dính cho bài phần hành: "Bước 3/7 · Phân tích", chấm bước bấm được,
 * và nhiệm vụ "Bài tập Biscore đã giải x/y" (mở lời giải = đã làm; lưu theo bài).
 */
import { setScore } from './store';

const solvedKey = (id: string) => `audit-hub:solved:${id}`;
const loadSolved = (id: string): number[] => { try { return JSON.parse(localStorage.getItem(solvedKey(id)) || '[]'); } catch { return []; } };
const saveSolved = (id: string, v: number[]) => { try { localStorage.setItem(solvedKey(id), JSON.stringify(v)); } catch { /* bỏ qua */ } };

/** Đánh dấu lời giải đã xem; trả về hàm đọc số đã giải. */
export function trackSolutions(id: string, onChange?: (done: number, total: number) => void) {
  const sols = Array.from(document.querySelectorAll<HTMLDetailsElement>('.sl-markdown-content details.b-sol'));
  if (!sols.length) return;
  let solved = new Set(loadSolved(id));
  const paint = () => {
    sols.forEach((d, i) => d.classList.toggle('solved', solved.has(i)));
    onChange?.(solved.size, sols.length);
  };
  sols.forEach((d, i) => d.addEventListener('toggle', () => {
    if (!d.open || solved.has(i)) return;
    solved.add(i); saveSolved(id, [...solved]);
    setScore(id, 'biscore', solved.size, sols.length, 'Bài tập Biscore');
    paint();
  }));
  paint();
}

export function initStepBar(id: string) {
  const content = document.querySelector<HTMLElement>('.sl-markdown-content');
  const steps = Array.from(document.querySelectorAll<HTMLElement>('.sl-markdown-content section.b-step'));
  if (!content || steps.length < 2 || content.querySelector('.b-stepbar')) { trackSolutions(id); return; }
  const names = steps.map(s => (s.querySelector('.ttl')?.textContent || '').trim());
  const bar = document.createElement('nav');
  bar.className = 'b-stepbar'; bar.setAttribute('aria-label', 'Tiến trình các bước');
  bar.innerHTML = `<span class="now"></span><span class="dots">${steps.map((s, i) => `<a href="#${s.id}" title="Bước ${i + 1} · ${names[i].replace(/"/g, '&quot;')}">${i + 1}</a>`).join('')}</span><span class="mission"></span>`;
  // Đặt thanh ngay trước bước 1 để không che phần mở bài
  steps[0].parentElement === content ? content.insertBefore(bar, steps[0]) : content.prepend(bar);
  const now = bar.querySelector<HTMLElement>('.now')!;
  const dots = Array.from(bar.querySelectorAll<HTMLAnchorElement>('.dots a'));
  const mission = bar.querySelector<HTMLElement>('.mission')!;
  const setCur = (k: number) => {
    now.textContent = k < 0 ? `Audit program · ${steps.length} bước` : `Bước ${k + 1}/${steps.length} · ${names[k]}`;
    dots.forEach((a, i) => { a.classList.toggle('cur', i === k); a.classList.toggle('past', i < k); });
  };
  setCur(-1);
  const onScroll = () => {
    const y = window.innerHeight * 0.35; let k = -1;
    steps.forEach((s, i) => { if (s.getBoundingClientRect().top < y) k = i; });
    setCur(k);
  };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  trackSolutions(id, (d, t) => { mission.innerHTML = `🎯 <span class="mtxt">Bài tập Biscore: </span><b>${d}/${t}</b>${d === t ? " · hoàn thành!" : ""}`; mission.title = "Bài tập Biscore đã giải"; });
}
