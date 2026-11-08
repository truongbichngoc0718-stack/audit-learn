import { useEffect, useRef, useState } from 'react';
import { setScore } from '../lib/store';
import './map.css';

export interface SortItem { s: string; answer: string; why?: string }

/**
 * Bài tập phân loại nhanh (retrieval practice) [SITE MỚI · nhánh C]: mỗi tình huống chọn 1 nhãn.
 * Dùng cho: threat ↔ tình huống, adjusting/non-adjusting, preventive/detective, ToC/substantive, assertion…
 * Nội dung tình huống và đáp án lấy từ slide/checkpoint; ghi nguồn ở trang dùng.
 */
export default function SortDrill({ id, scoreKey, label = 'Sort drill', options, items }:
  { id?: string; scoreKey?: string; label?: string; options: string[]; items: SortItem[] }) {
  const [pick, setPick] = useState<Record<number, string>>({});
  const saved = useRef(false);
  const done = Object.keys(pick).length === items.length;
  const score = items.filter((it, i) => pick[i] === it.answer).length;
  useEffect(() => { if (done && id && scoreKey && !saved.current) { saved.current = true; setScore(id, scoreKey, score, items.length, label); } }, [done]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div>
      {items.map((it, i) => (
        <div key={i} className="sd-item">
          <div>{i + 1}. {it.s}</div>
          <div className="sd-opts">
            {options.map(o => {
              const p = pick[i]; const cls = p ? (o === it.answer ? 'ok' : p === o ? 'bad' : '') : '';
              return <button key={o} type="button" className={cls} disabled={!!p} onClick={() => setPick({ ...pick, [i]: o })}>{o}</button>;
            })}
          </div>
          {pick[i] && <div className="sd-why"><b style={{ color: pick[i] === it.answer ? 'var(--bisc-emerald)' : 'var(--bisc-rose)' }}>{pick[i] === it.answer ? 'Correct.' : `Answer: ${it.answer}.`}</b> {it.why}</div>}
        </div>
      ))}
      <div className="x-bar" style={{ marginTop: '.6rem', display: 'flex', gap: '.6rem', alignItems: 'center' }}>
        {done && <b>Score: {score}/{items.length}</b>}
        {Object.keys(pick).length > 0 && <button type="button" className="b-btn ghost" onClick={() => { setPick({}); saved.current = false; }}>Try again</button>}
      </div>
    </div>
  );
}
