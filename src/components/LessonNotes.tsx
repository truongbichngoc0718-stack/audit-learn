import { useEffect, useState } from 'react';
import { getLesson, setDone, setNote } from '../lib/store';

export default function LessonNotes({ id }: { id: string }) {
  const [note, setN] = useState(''); const [done, setD] = useState(false); const [saved, setSaved] = useState('');
  useEffect(() => { const s = getLesson(id); setN(s?.note ?? ''); setD(!!s?.done); }, [id]);
  useEffect(() => { const t = setTimeout(() => { if (note !== (getLesson(id)?.note ?? '')) { setNote(id, note); setSaved('Đã lưu'); } }, 600); return () => clearTimeout(t); }, [note, id]);
  return (
    <div className="b-card" style={{ marginTop: '2rem' }}>
      <div className="b-kicker">Ghi chú của tôi · lưu trên trình duyệt này</div>
      <textarea value={note} onChange={e => { setN(e.target.value); setSaved(''); }} rows={4} placeholder="Ghi lại điều cần nhớ, câu hỏi cho partner…"
        style={{ width: '100%', borderRadius: 10, border: '1px solid var(--bisc-line)', padding: '.6rem', font: 'inherit', background: 'transparent', color: 'inherit' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '.5rem', gap: '.5rem', flexWrap: 'wrap' }}>
        <label style={{ display: 'flex', gap: '.4rem', alignItems: 'center', cursor: 'pointer', fontWeight: 600 }}>
          <input type="checkbox" checked={done} onChange={e => { setD(e.target.checked); setDone(id, e.target.checked); }} /> Đã học xong bài này
        </label>
        <span style={{ fontSize: '.78rem', color: 'var(--bisc-muted)' }}>{saved}</span>
      </div>
    </div>
  );
}
