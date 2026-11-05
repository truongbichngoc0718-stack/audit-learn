import { useState } from 'react';
export interface Drill { s: string; answer: 'vouching' | 'tracing'; assertion: string; why: string }
/** Bài tập chọn chiều vouching / tracing [SITE MỚI, căn cứ T#p1l2]. */
export default function DirectionDrill({ items }: { items: Drill[] }) {
  const [pick, setPick] = useState<Record<number, string>>({});
  const score = items.filter((it, i) => pick[i] === it.answer).length;
  return (
    <div>
      {items.map((it, i) => (
        <div key={i} className="b-card" style={{ marginTop: '.6rem' }}>
          <div>{i + 1}. {it.s}</div>
          <div style={{ display: 'flex', gap: '.4rem', marginTop: '.5rem' }}>
            {(['vouching', 'tracing'] as const).map(d => (
              <button key={d} type="button" className={`b-dir ${pick[i] === d ? d : ''}`} disabled={!!pick[i]} onClick={() => setPick({ ...pick, [i]: d })}
                style={{ border: 0, cursor: pick[i] ? 'default' : 'pointer', opacity: pick[i] && pick[i] !== d ? .4 : 1, padding: '.3rem .8rem' }}>
                {d === 'vouching' ? 'Vouching ↓ sổ → chứng từ' : 'Tracing ↑ nguồn → sổ'}
              </button>
            ))}
          </div>
          {pick[i] && <p style={{ marginTop: '.5rem', fontSize: '.9rem' }}><b style={{ color: pick[i] === it.answer ? 'var(--bisc-emerald)' : 'var(--bisc-rose)' }}>{pick[i] === it.answer ? 'Đúng.' : `Chưa đúng: ${it.answer}.`}</b> {it.assertion} · {it.why}</p>}
        </div>
      ))}
      {Object.keys(pick).length === items.length && <p><b>Kết quả: {score}/{items.length}</b></p>}
    </div>
  );
}
