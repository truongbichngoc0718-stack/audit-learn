import { useState } from 'react';
import { setQuiz } from '../lib/store';

export interface QuizQ { q: string; options: string[]; answer: number; explain: string }
const L = ['A', 'B', 'C', 'D', 'E'];

export default function Quiz({ id, questions, target }: { id: string; questions: QuizQ[]; target?: number }) {
  const [picked, setPicked] = useState<(number | null)[]>(questions.map(() => null));
  const score = picked.filter((p, i) => p === questions[i].answer).length;
  const answered = picked.filter(p => p !== null).length;
  const submitted = answered === questions.length;
  const pick = (i: number, j: number) => {
    if (picked[i] !== null) return;
    const next = picked.map((x, k) => (k === i ? j : x));
    setPicked(next);
    if (next.every(p => p !== null)) setQuiz(id, next.filter((p, k) => p === questions[k].answer).length, questions.length);
  };
  const reset = () => setPicked(questions.map(() => null));
  return (
    <div className="b-quiz">
      <div className="b-kicker">✓ Bài kiểm tra · {questions.length} câu · mục tiêu {target ?? questions.length}/{questions.length}</div>
      {questions.map((qq, i) => (
        <div key={i} className="b-card" style={{ marginTop: '.8rem' }}>
          <div style={{ fontWeight: 600 }}>Q{i + 1}. {qq.q}</div>
          <div style={{ display: 'grid', gap: '.35rem', marginTop: '.6rem' }}>
            {qq.options.map((o, j) => {
              const sel = picked[i] === j; const lock = picked[i] !== null; const correct = lock && j === qq.answer; const wrong = lock && sel && j !== qq.answer;
              return (
                <button key={j} type="button" disabled={lock}
                  onClick={() => pick(i, j)}
                  style={{ textAlign: 'left', padding: '.5rem .75rem', borderRadius: 10, cursor: lock ? 'default' : 'pointer', opacity: lock && !correct && !wrong ? .6 : 1,
                    border: `1.5px solid ${correct ? 'var(--bisc-emerald)' : wrong ? 'var(--bisc-rose)' : sel ? 'var(--bisc-amber)' : 'var(--bisc-line)'}`,
                    background: correct ? 'var(--bisc-emerald-soft)' : wrong ? 'var(--bisc-rose-soft)' : sel ? 'var(--bisc-amber-soft)' : 'transparent', color: 'inherit', font: 'inherit' }}>
                  <b>{L[j]}.</b> {o}
                </button>
              );
            })}
          </div>
          {picked[i] !== null && <p style={{ marginTop: '.6rem' }}><b style={{ color: picked[i] === qq.answer ? 'var(--bisc-emerald)' : 'var(--bisc-rose)' }}>{picked[i] === qq.answer ? '✓ Chính xác.' : `✗ Chưa đúng. Đáp án ${L[qq.answer]}.`}</b> {qq.explain}</p>}
        </div>
      ))}
      <div style={{ marginTop: '.9rem', display: 'flex', gap: '.6rem', alignItems: 'center' }}>
        {!submitted
          ? <span style={{ fontSize: '.85rem', color: 'var(--bisc-muted)' }}>Đã làm {answered}/{questions.length} câu · đúng {score}. Chọn đáp án để xem giải thích ngay.</span>
          : <><b>{score === questions.length ? '🎉 ' : ''}Kết quả: {score}/{questions.length}{score >= (target ?? questions.length) ? ' · đạt mục tiêu' : ''}</b><button type="button" className="b-btn ghost" onClick={reset}>Làm lại</button></>}
      </div>
    </div>
  );
}
