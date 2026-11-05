import { useState } from 'react';
import { setQuiz } from '../lib/store';

export interface QuizQ { q: string; options: string[]; answer: number; explain: string }
const L = ['A', 'B', 'C', 'D', 'E'];

export default function Quiz({ id, questions, target }: { id: string; questions: QuizQ[]; target?: number }) {
  const [picked, setPicked] = useState<(number | null)[]>(questions.map(() => null));
  const [submitted, setSubmitted] = useState(false);
  const score = picked.filter((p, i) => p === questions[i].answer).length;
  const submit = () => { setSubmitted(true); setQuiz(id, score, questions.length); };
  const reset = () => { setPicked(questions.map(() => null)); setSubmitted(false); };
  return (
    <div className="b-quiz">
      <div className="b-kicker">✓ Bài kiểm tra · {questions.length} câu · mục tiêu {target ?? questions.length}/{questions.length}</div>
      {questions.map((qq, i) => (
        <div key={i} className="b-card" style={{ marginTop: '.8rem' }}>
          <div style={{ fontWeight: 600 }}>Q{i + 1}. {qq.q}</div>
          <div style={{ display: 'grid', gap: '.35rem', marginTop: '.6rem' }}>
            {qq.options.map((o, j) => {
              const sel = picked[i] === j; const correct = submitted && j === qq.answer; const wrong = submitted && sel && j !== qq.answer;
              return (
                <button key={j} type="button" disabled={submitted}
                  onClick={() => setPicked(p => p.map((x, k) => (k === i ? j : x)))}
                  style={{ textAlign: 'left', padding: '.5rem .75rem', borderRadius: 10, cursor: submitted ? 'default' : 'pointer',
                    border: `1.5px solid ${correct ? 'var(--bisc-emerald)' : wrong ? 'var(--bisc-rose)' : sel ? 'var(--bisc-amber)' : 'var(--bisc-line)'}`,
                    background: correct ? 'var(--bisc-emerald-soft)' : wrong ? 'var(--bisc-rose-soft)' : sel ? 'var(--bisc-amber-soft)' : 'transparent', color: 'inherit', font: 'inherit' }}>
                  <b>{L[j]}.</b> {o}
                </button>
              );
            })}
          </div>
          {submitted && <p style={{ marginTop: '.6rem' }}><b>Đáp án {L[qq.answer]}.</b> {qq.explain}</p>}
        </div>
      ))}
      <div style={{ marginTop: '.9rem', display: 'flex', gap: '.6rem', alignItems: 'center' }}>
        {!submitted
          ? <button type="button" className="b-btn" disabled={picked.some(p => p === null)} onClick={submit}>Nộp bài</button>
          : <><b>Kết quả: {score}/{questions.length}</b><button type="button" className="b-btn ghost" onClick={reset}>Làm lại</button></>}
        {!submitted && picked.some(p => p === null) && <span style={{ fontSize: '.8rem', color: 'var(--bisc-muted)' }}>Chọn đủ {questions.length} câu để nộp</span>}
      </div>
    </div>
  );
}
