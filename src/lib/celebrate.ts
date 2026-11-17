/**
 * Pop-up chúc mừng giữa màn hình + pháo hoa trái tim khi đánh dấu xong một bài.
 * Câu chúc lấy theo "bộ bài" xáo ngẫu nhiên: hết một vòng 7 câu mới xáo lại, không lặp câu liền nhau.
 */
const MESSAGES = [
  'Chúc mừng vợ yêu đã hoàn thành bài học!!!',
  'VỢ LÀ SỐ 1',
  'Bae giỏi quá ai nớp diu',
  'Em bé nhà ai mà giỏi thí này',
  'Cố lên vợ ơi!!',
  'Học tiếp nào vợ!!!',
  'My baby năm bờ oăn 1111',
];
const KEY = 'audit-hub:cheer-deck';

function nextMessage(): string {
  let deck: number[] = [];
  try { deck = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { /* bỏ qua */ }
  if (!Array.isArray(deck) || !deck.length) {
    let last = -1; try { last = +(localStorage.getItem(KEY + ':last') ?? -1); } catch { /* bỏ qua */ }
    deck = MESSAGES.map((_, i) => i);
    for (let i = deck.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [deck[i], deck[j]] = [deck[j], deck[i]]; }
    if (deck[0] === last && deck.length > 1) [deck[0], deck[1]] = [deck[1], deck[0]];
  }
  const k = deck.shift()!;
  try { localStorage.setItem(KEY, JSON.stringify(deck)); localStorage.setItem(KEY + ':last', String(k)); } catch { /* bỏ qua */ }
  return MESSAGES[k] ?? MESSAGES[0];
}

const CSS = `
.cheer-ov{position:fixed;inset:0;z-index:1000;display:grid;place-items:center;background:rgba(15,37,48,.45);backdrop-filter:blur(2px);animation:cheer-fade .25s ease-out}
.cheer-ov canvas{position:fixed;inset:0;width:100%;height:100%;pointer-events:none}
.cheer-card{position:relative;max-width:min(92vw,30rem);text-align:center;background:#fff;color:#1C3A4A;border-radius:22px;padding:1.6rem 1.8rem 1.3rem;box-shadow:0 24px 60px rgba(8,25,34,.4);border:3px solid #F9C31F;animation:cheer-pop .45s cubic-bezier(.2,1.6,.4,1)}
.cheer-card .h{font-size:3rem;line-height:1;margin-bottom:.4rem;animation:cheer-beat 1s ease-in-out infinite}
.cheer-card .m{font:700 1.6rem/1.3 Lora,Georgia,serif;margin:0 0 1rem;color:#d6336c}
.cheer-card button{border:0;border-radius:999px;background:#1C3A4A;color:#F9C31F;font:700 1rem Inter,system-ui,sans-serif;padding:.6rem 1.4rem;cursor:pointer}
@keyframes cheer-fade{from{opacity:0}to{opacity:1}}
@keyframes cheer-pop{from{transform:scale(.6);opacity:0}to{transform:none;opacity:1}}
@keyframes cheer-beat{0%,100%{transform:scale(1)}50%{transform:scale(1.18)}}
@media (prefers-reduced-motion:reduce){.cheer-ov,.cheer-card,.cheer-card .h{animation:none}}`;

function heartPath(ctx: CanvasRenderingContext2D, x: number, y: number, s: number) {
  ctx.beginPath(); ctx.moveTo(x, y + s * 0.3);
  ctx.bezierCurveTo(x, y, x - s / 2, y, x - s / 2, y + s * 0.3);
  ctx.bezierCurveTo(x - s / 2, y + s * 0.6, x, y + s * 0.8, x, y + s);
  ctx.bezierCurveTo(x, y + s * 0.8, x + s / 2, y + s * 0.6, x + s / 2, y + s * 0.3);
  ctx.bezierCurveTo(x + s / 2, y, x, y, x, y + s * 0.3); ctx.fill();
}

function fireworks(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d'); if (!ctx) return () => {};
  const dpr = window.devicePixelRatio || 1;
  const fit = () => { canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
  fit();
  const colors = ['#ff4d6d', '#ff8fab', '#F9C31F', '#e5383b', '#ffb3c6', '#c9184a'];
  type P = { x: number; y: number; vx: number; vy: number; s: number; c: string; life: number; rot: number };
  const ps: P[] = [];
  const burst = (x: number, y: number) => {
    const n = 34;
    for (let i = 0; i < n; i++) {
      // vận tốc theo đường viền trái tim để cả chùm nổ thành hình trái tim
      const t = (i / n) * Math.PI * 2;
      const hx = 16 * Math.sin(t) ** 3, hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      const k = 0.32 + Math.random() * 0.05;
      ps.push({ x, y, vx: hx * k, vy: hy * k, s: 9 + Math.random() * 7, c: colors[(Math.random() * colors.length) | 0], life: 1, rot: Math.random() * 0.6 - 0.3 });
    }
  };
  let shots = 0, raf = 0, last = 0;
  const loop = (t: number) => {
    if (t - last > 380 && shots < 7) { last = t; shots++; burst(innerWidth * (0.15 + Math.random() * 0.7), innerHeight * (0.15 + Math.random() * 0.45)); }
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = ps.length - 1; i >= 0; i--) {
      const p = ps[i]; p.x += p.vx; p.y += p.vy; p.vx *= 0.97; p.vy = p.vy * 0.97 + 0.06; p.life -= 0.011;
      if (p.life <= 0) { ps.splice(i, 1); continue; }
      ctx.save(); ctx.globalAlpha = Math.min(1, p.life * 1.4); ctx.fillStyle = p.c; ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      heartPath(ctx, 0, -p.s / 2, p.s); ctx.restore();
    }
    if (shots < 7 || ps.length) raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  addEventListener('resize', fit);
  return () => { cancelAnimationFrame(raf); removeEventListener('resize', fit); };
}

export function celebrate() {
  if (!document.getElementById('cheer-css')) {
    const st = document.createElement('style'); st.id = 'cheer-css'; st.textContent = CSS; document.head.append(st);
  }
  document.querySelector('.cheer-ov')?.remove();
  const ov = document.createElement('div'); ov.className = 'cheer-ov'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-live', 'polite');
  const canvas = document.createElement('canvas');
  const card = document.createElement('div'); card.className = 'cheer-card';
  card.innerHTML = `<div class="h" aria-hidden="true">💖</div><p class="m"></p><button type="button">Yêu vợ 😘</button>`;
  card.querySelector('.m')!.textContent = nextMessage();
  ov.append(canvas, card); document.body.append(ov);
  const stop = matchMedia('(prefers-reduced-motion: reduce)').matches ? () => {} : fireworks(canvas);
  const close = () => { stop(); ov.remove(); removeEventListener('keydown', onKey); clearTimeout(timer); };
  const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' || e.key === 'Enter') close(); };
  ov.addEventListener('click', close); addEventListener('keydown', onKey);
  const timer = setTimeout(close, 6000);
  card.querySelector('button')!.focus();
}
