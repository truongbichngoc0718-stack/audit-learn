import { useEffect, useState } from 'react';
import { getLesson, setDone, setNote } from '../lib/store';

const T = { vi: { k: 'Ghi chú của tôi · lưu trên trình duyệt này', ph: 'Ghi lại điều cần nhớ, câu hỏi cho partner…', done: 'Đã học xong bài này', saved: 'Đã lưu' }, en: { k: 'My notes · saved in this browser', ph: 'Key points to remember, questions for your tutor…', done: 'I have finished this page', saved: 'Saved' } };
export default function LessonNotes({ id, lang = 'vi' }: { id: string; lang?: 'vi' | 'en' }) {
  const t = T[lang];
  const [note, setN] = useState(''); const [done, setD] = useState(false); const [saved, setSaved] = useState('');
  useEffect(() => { const s = getLesson(id); setN(s?.note ?? ''); setD(!!s?.done); }, [id]);
  useEffect(() => { const tm = setTimeout(() => { if (note !== (getLesson(id)?.note ?? '')) { setNote(id, note); setSaved(t.saved); } }, 600); return () => clearTimeout(tm); }, [note, id]);
  return (
    <div className="b-card" style={{ marginTop: '2rem' }}>
      <div className="b-kicker">{t.k}</div>
      <textarea value={note} onChange={e => { setN(e.target.value); setSaved(''); }} rows={4} placeholder={t.ph}
        style={{ width: '100%', borderRadius: 10, border: '1px solid var(--bisc-line)', padding: '.6rem', font: 'inherit', background: 'transparent', color: 'inherit' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '.5rem', gap: '.5rem', flexWrap: 'wrap' }}>
        <label style={{ display: 'flex', gap: '.4rem', alignItems: 'center', cursor: 'pointer', fontWeight: 600 }}>
          <input type="checkbox" checked={done} onChange={e => { setD(e.target.checked); setDone(id, e.target.checked); }} /> {t.done}
        </label>
        <span style={{ fontSize: '.78rem', color: 'var(--bisc-muted)' }}>{saved}</span>
      </div>
    </div>
  );
}
