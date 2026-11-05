import { useEffect, useRef, useState } from 'react';
import { exportJSON, getData, importJSON, subscribe, type HubData } from '../lib/store';

export interface LessonRef { id: string; title: string; path: string; group: string; minutes?: number }

export default function ProgressPage({ lessons }: { lessons: LessonRef[] }) {
  const [d, setD] = useState<HubData>({ version: 1, lessons: {} }); const [msg, setMsg] = useState('');
  const file = useRef<HTMLInputElement>(null);
  useEffect(() => { setD(getData()); return subscribe(() => setD(getData())); }, []);
  const done = lessons.filter(l => d.lessons[l.id]?.done).length;
  const doExport = () => { const b = new Blob([exportJSON()], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = `audit-hub-tien-do-${new Date().toISOString().slice(0, 10)}.json`; a.click(); };
  const doImport = async (f?: File) => { if (!f) return; try { importJSON(await f.text()); setMsg('Đã nhập và gộp dữ liệu.'); } catch (e: any) { setMsg('Lỗi: ' + e.message); } };
  const groups = [...new Set(lessons.map(l => l.group))];
  return (
    <div>
      <div className="b-card">
        <div className="b-kicker">Tổng tiến độ</div>
        <div style={{ fontSize: '1.6rem', fontWeight: 700 }}>{done}/{lessons.length} bài</div>
        <div style={{ height: 8, background: 'var(--bisc-line)', borderRadius: 99, marginTop: '.4rem' }}><div style={{ width: `${lessons.length ? (100 * done) / lessons.length : 0}%`, height: '100%', background: 'var(--bisc-amber)', borderRadius: 99 }} /></div>
        <div style={{ display: 'flex', gap: '.5rem', marginTop: '.9rem', flexWrap: 'wrap' }}>
          <button type="button" className="b-btn" onClick={doExport}>Xuất JSON</button>
          <button type="button" className="b-btn ghost" onClick={() => file.current?.click()}>Nhập JSON</button>
          <input ref={file} type="file" accept="application/json" hidden onChange={e => doImport(e.target.files?.[0])} />
          <span style={{ fontSize: '.85rem' }}>{msg}</span>
        </div>
      </div>
      {groups.map(g => (
        <div key={g}>
          <h3>{g}</h3>
          <table><thead><tr><th>Bài</th><th>Trạng thái</th><th>Quiz</th><th>Ghi chú</th></tr></thead><tbody>
            {lessons.filter(l => l.group === g).map(l => { const s = d.lessons[l.id]; return (
              <tr key={l.id}><td><a href={l.path}>{l.title}</a>{l.minutes ? ` · ${l.minutes}′` : ''}</td>
                <td>{s?.done ? '✅ Xong' : s?.visitedAt ? '👀 Đã xem' : '—'}</td>
                <td>{s?.quiz ? `${s.quiz.score}/${s.quiz.total}` : ''}{s?.scores && Object.values(s.scores).map((x, k) => <div key={k} style={{ fontSize: '.8rem' }}>{x.label ?? ''}: {x.score}/{x.total}</div>)}{!s?.quiz && !s?.scores ? '—' : null}</td>
                <td style={{ whiteSpace: 'pre-wrap', fontSize: '.85rem' }}>{s?.note || '—'}</td></tr>); })}
          </tbody></table>
        </div>
      ))}
    </div>
  );
}
