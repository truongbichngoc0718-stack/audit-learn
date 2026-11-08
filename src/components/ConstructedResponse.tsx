import { useEffect, useState, type ReactNode } from 'react';
import { getLesson, setDraft, setScore } from '../lib/store';
import './exam.css';

export interface AnswerGroup { heading?: string; points: string[] }

/**
 * Câu tự luận (constructed response) kiểu ACCA Section B.
 * Người học viết câu trả lời (lưu nháp) → mở model answer → tick các ý đã có → điểm = min(số ý, marks).
 * Tình huống (scenario) truyền qua children (HTML tĩnh từ MDX).
 */
export default function ConstructedResponse({ id, crKey, title, marks, minutes, source, requirement, answer, notes, perPoint = 1, children }:
  { id: string; crKey: string; title: string; marks: number; minutes?: number; source?: string; requirement: string;
    answer: AnswerGroup[]; notes?: string[]; perPoint?: number; children?: ReactNode }) {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [ticks, setTicks] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState('');
  useEffect(() => { setText(getLesson(id)?.drafts?.[crKey] ?? ''); }, [id, crKey]);
  useEffect(() => { const t = setTimeout(() => { if (text !== (getLesson(id)?.drafts?.[crKey] ?? '')) { setDraft(id, crKey, text); setSaved('Draft saved'); } }, 700); return () => clearTimeout(t); }, [text, id, crKey]);
  const ticked = Object.values(ticks).filter(Boolean).length;
  const score = Math.min(ticked * perPoint, marks);
  let k = 0;
  return (
    <div className="b-card x-cr" style={{ marginTop: '1rem' }}>
      <div className="b-kicker">Constructed response · {marks} marks{minutes ? ` · approx. ${minutes} minutes` : ''}</div>
      <h3 style={{ margin: '.2rem 0 0' }}>{title}</h3>
      {source && <div style={{ fontSize: '.78rem', color: 'var(--bisc-muted)' }}>Source: {source}</div>}
      {children && <div className="scenario">{children}</div>}
      <div className="req">Required: {requirement}</div>
      <textarea rows={8} value={text} onChange={e => { setText(e.target.value); setSaved(''); }} style={{ marginTop: '.7rem' }}
        placeholder="Write your answer here. One procedure per line: verb + document + purpose (assertion)." />
      <div className="x-bar" style={{ marginTop: '.4rem' }}>
        <button type="button" className="b-btn" onClick={() => setOpen(!open)}>{open ? 'Hide model answer' : 'Show model answer & mark yourself'}</button>
        <span style={{ fontSize: '.78rem', color: 'var(--bisc-muted)' }}>{saved}</span>
      </div>
      {open && (
        <div style={{ marginTop: '.8rem' }}>
          <div className="b-kicker">Model answer · tick each point your answer covers</div>
          {answer.map((g, gi) => (
            <div key={gi} style={{ marginTop: '.5rem' }}>
              {g.heading && <div style={{ fontWeight: 700, marginTop: '.4rem' }}>{g.heading}</div>}
              {g.points.map((p, pi) => {
                const key = `${gi}-${pi}`; k += 1;
                return (
                  <label key={key} className="x-pt">
                    <input type="checkbox" checked={!!ticks[key]} onChange={e => setTicks({ ...ticks, [key]: e.target.checked })} />
                    <span className="n">{pi + 1}.</span><span>{p}</span>
                  </label>
                );
              })}
            </div>
          ))}
          <div className="x-bar">
            <b>Your mark: {score}/{marks}</b>
            <span style={{ fontSize: '.8rem', color: 'var(--bisc-muted)' }}>({ticked} of {k} points ticked{perPoint !== 1 ? ` × ${perPoint} marks` : ''}; maximum {marks})</span>
            <button type="button" className="b-btn ghost" onClick={() => { setScore(id, crKey, score, marks, title); setSaved('Mark saved to Progress'); }}>Save mark</button>
          </div>
          {notes && notes.length > 0 && (
            <div className="x-note"><b>Examiner's report · key observations</b>
              <ul style={{ margin: '.3rem 0 0' }}>{notes.map((n, i) => <li key={i} dangerouslySetInnerHTML={{ __html: n.replace(/^([^:]+:)/, '<b>$1</b>') }} />)}</ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
