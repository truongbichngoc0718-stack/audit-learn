import { useState } from 'react';
export interface Card { front: string; back: string }
/** Flashcard thuật ngữ: bấm thẻ để lật, nút để chuyển. */
export default function Flashcards({ cards }: { cards: Card[] }) {
  const [i, setI] = useState(0), [flip, setFlip] = useState(false);
  const order = cards; const c = order[i];
  const go = (d: number) => { setFlip(false); setI((i + d + order.length) % order.length); };
  return (
    <div>
      <button type="button" onClick={() => setFlip(!flip)} className="b-card" style={{ width: '100%', minHeight: 150, cursor: 'pointer', font: 'inherit', color: 'inherit', textAlign: 'center', background: flip ? 'var(--bisc-amber-soft)' : 'var(--bisc-card)' }}>
        <div className="b-kicker">{flip ? 'Nghĩa · cách dùng' : `Thuật ngữ ${i + 1}/${order.length}`}</div>
        <div style={{ fontSize: flip ? '1rem' : '1.5rem', fontWeight: 700, marginTop: '.4rem' }}>{flip ? c.back : c.front}</div>
        <div style={{ fontSize: '.75rem', color: 'var(--bisc-muted)', marginTop: '.6rem' }}>Bấm để lật</div>
      </button>
      <div style={{ display: 'flex', gap: '.5rem', justifyContent: 'center', marginTop: '.6rem' }}>
        <button type="button" className="b-btn ghost" onClick={() => go(-1)}>← Trước</button>
        <button type="button" className="b-btn" onClick={() => go(1)}>Tiếp →</button>
      </div>
    </div>
  );
}
