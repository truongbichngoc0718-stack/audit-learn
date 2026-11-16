import { useState } from 'react';
import bank from '../data/tax/exam-bank.json';
import { cardById } from '../lib/tax';

type Sitting = { id: string; label: string; law_status: 'current' | 'old-law' | 'check'; has_question: boolean; has_answer: boolean; note_vi: string; topics: string[] };
const KEY = 'tax-exambank-v1';
const read = (): Record<string, boolean> => { try { return JSON.parse(localStorage.getItem(KEY) ?? '{}'); } catch { return {}; } };
const badge: Record<string, string> = { current: '✅ luật hiện hành', 'old-law': '⚠️ luật cũ', check: '❓ cần đối chiếu' };

/** Kho đề theo kỳ thi. Không chép nguyên văn đề; mỗi kỳ trỏ về file trong /source (dùng nội bộ) và các thẻ Atlas liên quan. */
export default function ExamBank() {
  const [done, setDone] = useState<Record<string, boolean>>(() => (typeof localStorage === 'undefined' ? {} : read()));
  const toggle = (id: string) => { const n = { ...done, [id]: !done[id] }; setDone(n); try { localStorage.setItem(KEY, JSON.stringify(n)); } catch {} };
  const sittings = (bank as { sittings: Sitting[] }).sittings;
  return (
    <div className="tx">
      <p className="tx-note">{(bank as any).intro_vi}</p>
      <div className="dt-list">
        {sittings.map(s => (
          <div key={s.id} className="b-card" style={{ opacity: done[s.id] ? .6 : 1 }}>
            <label style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
              <input type="checkbox" checked={!!done[s.id]} onChange={() => toggle(s.id)} />
              <b>{s.label}</b> <span className="tx-src">{badge[s.law_status]}</span>
            </label>
            <small>{s.has_question ? 'Có đề' : 'Chưa có đề'} · {s.has_answer ? 'Có đáp án' : 'Chưa có đáp án'}</small>
            <p style={{ margin: '.3rem 0' }}>{s.note_vi}</p>
            {s.topics.length > 0 && <div className="tx-chips">{s.topics.map(t => { const c = cardById(t); return c ? <a key={t} className="tx-src" href={`/d/atlas/#n-${t}`}>{c.title_en}</a> : null; })}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
