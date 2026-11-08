import { useEffect, useRef, useState } from 'react';
import { setScore } from '../lib/store';
import './exam.css';

export interface McqQ { q: string; items?: string[]; options: string[]; answer: number; explain?: string; source?: string }
const L = ['A', 'B', 'C', 'D', 'E'];
const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

/**
 * Bộ MCQ kiểu đề ACCA.
 * mode="practice": chọn là hiện đáp án + giải thích ngay.
 * mode="mock": bấm Start → đồng hồ đếm ngược; đáp án khóa đến khi Submit hoặc hết giờ.
 * Điểm lưu vào trang Tiến độ (store.setScore).
 */
export default function ExamMcq({ id, scoreKey, label, questions, mode = 'practice', minutes }:
  { id: string; scoreKey: string; label: string; questions: McqQ[]; mode?: 'practice' | 'mock'; minutes?: number }) {
  const n = questions.length;
  const [picked, setPicked] = useState<(number | null)[]>(() => questions.map(() => null));
  const [started, setStarted] = useState(mode === 'practice');
  const [submitted, setSubmitted] = useState(false);
  const [left, setLeft] = useState((minutes ?? 0) * 60);
  const saved = useRef(false);
  const score = picked.filter((p, i) => p === questions[i].answer).length;
  const answered = picked.filter(p => p !== null).length;
  const reveal = (i: number) => mode === 'practice' ? picked[i] !== null : submitted;

  useEffect(() => {
    if (mode !== 'mock' || !started || submitted || !minutes) return;
    if (left <= 0) { setSubmitted(true); return; }
    const t = setTimeout(() => setLeft(l => l - 1), 1000);
    return () => clearTimeout(t);
  }, [mode, started, submitted, left, minutes]);

  useEffect(() => {
    const finished = mode === 'practice' ? answered === n : submitted;
    if (finished && !saved.current) { saved.current = true; setScore(id, scoreKey, score, n, label); }
  }, [answered, submitted]); // eslint-disable-line react-hooks/exhaustive-deps

  const reset = () => { setPicked(questions.map(() => null)); setSubmitted(false); saved.current = false; setLeft((minutes ?? 0) * 60); setStarted(mode === 'practice'); };

  if (!started) return (
    <div className="b-card">
      <div className="b-kicker">{label} · {n} questions{minutes ? ` · ${minutes} minutes` : ''}</div>
      <p style={{ margin: '.3rem 0 .8rem' }}>Answers and explanations stay hidden until you submit{minutes ? ' or the time runs out' : ''}.</p>
      <button type="button" className="b-btn" onClick={() => setStarted(true)}>Start the mock test</button>
    </div>
  );

  return (
    <div>
      {mode === 'mock' && !submitted && minutes ? (
        <div className={`x-timer ${left < 120 ? 'low' : ''}`}><span>{label} · answered {answered}/{n}</span><b>{fmt(left)}</b></div>
      ) : null}
      {questions.map((qq, i) => (
        <div key={i} className="b-card x-q">
          {qq.source && <div className="src">{qq.source}</div>}
          <div className="stem">Q{i + 1}. {qq.q}</div>
          {qq.items && (qq.items[0]?.startsWith('(') ? <ul className="items" style={{ listStyle: 'none', paddingLeft: '.4rem' }}>{qq.items.map((it, k) => <li key={k}>{it}</li>)}</ul> : <ol className="items">{qq.items.map((it, k) => <li key={k} value={k + 1}>{it}</li>)}</ol>)}
          <div className="x-opts">
            {qq.options.map((o, j) => {
              const rv = reveal(i); const sel = picked[i] === j;
              const cls = rv ? (j === qq.answer ? 'ok' : sel ? 'bad' : '') : sel ? 'sel' : '';
              return (
                <button key={j} type="button" className={`x-opt ${cls}`} disabled={rv || submitted}
                  onClick={() => setPicked(p => p.map((x, k) => (k === i ? j : x)))}><b>{L[j]}.</b> {o}</button>
              );
            })}
          </div>
          {reveal(i) && (
            <div className="x-explain">
              <b style={{ color: picked[i] === qq.answer ? 'var(--bisc-emerald)' : 'var(--bisc-rose)' }}>
                {picked[i] === qq.answer ? 'Correct.' : picked[i] === null ? 'Not answered.' : 'Incorrect.'}
              </b>{' '}Answer <b>{L[qq.answer]}</b>.{qq.explain ? ` ${qq.explain}` : ''}
            </div>
          )}
        </div>
      ))}
      <div className="x-bar">
        {mode === 'mock' && !submitted && <button type="button" className="b-btn" onClick={() => setSubmitted(true)}>Submit ({answered}/{n} answered)</button>}
        {(mode === 'practice' ? answered === n : submitted) && <b>Score: {score}/{n} · {Math.round((100 * score) / n)}%{mode === 'mock' ? '' : ''}</b>}
        {(answered > 0 || submitted) && <button type="button" className="b-btn ghost" onClick={reset}>Try again</button>}
      </div>
    </div>
  );
}
