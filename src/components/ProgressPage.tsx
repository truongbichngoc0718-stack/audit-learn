import { useEffect, useRef, useState } from 'react';
import { getData, subscribe, type HubData } from '../lib/store';
import { getTax, subscribe as subTax } from '../lib/taxStore';
import { cards as taxCards } from '../lib/tax';
import { backupText, restoreText } from '../lib/backup';

export interface LessonRef { id: string; title: string; path: string; group: string; minutes?: number }

export default function ProgressPage({ lessons }: { lessons: LessonRef[] }) {
  const [d, setD] = useState<HubData>({ version: 1, lessons: {} }); const [msg, setMsg] = useState('');
  const [known, setKnown] = useState(0);
  const file = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const k = () => setKnown(Object.values(getTax().cards).filter(c => c.status === 'known').length);
    setD(getData()); k();
    const u1 = subscribe(() => setD(getData())); const u2 = subTax(k); return () => { u1(); u2(); };
  }, []);
  const isDone = (l: LessonRef) => !!d.lessons[l.id]?.done;
  const done = lessons.filter(isDone).length;
  const doExport = () => { const b = new Blob([backupText()], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = `audit-hub-sao-luu-${new Date().toISOString().slice(0, 10)}.json`; a.click(); setMsg('Đã tải file sao lưu. Giữ file này để chuyển sang máy khác.'); };
  const doImport = async (f?: File) => { if (!f) return; try { setMsg(restoreText(await f.text())); setD(getData()); } catch (e: any) { setMsg('Lỗi: ' + e.message); } };
  const groups = [...new Set(lessons.map(l => l.group))];
  // Bài tiếp theo: bài đang xem dở gần nhất, nếu không có thì bài đầu tiên chưa xong theo lộ trình
  const visited = lessons.filter(l => d.lessons[l.id]?.visitedAt && !isDone(l)).sort((a, b) => (d.lessons[b.id].visitedAt! > d.lessons[a.id].visitedAt! ? 1 : -1));
  const next = visited[0] ?? lessons.find(l => !isDone(l));
  const pct = (a: number, b: number) => (b ? Math.round((100 * a) / b) : 0);
  return (
    <div>
      <div className="b-card b-continue">
        <div>
          <div className="b-kicker">Tổng tiến độ · {done}/{lessons.length} bài · {pct(done, lessons.length)}%</div>
          {next ? <div className="ttl">Tiếp theo: {next.title}</div> : <div className="ttl">🎉 Bạn đã hoàn thành toàn bộ lộ trình</div>}
        </div>
        {next && <a className="b-btn" href={next.path}>{d.lessons[next.id]?.visitedAt ? 'Học tiếp →' : 'Bắt đầu →'}</a>}
        <div className="bar"><i style={{ width: `${pct(done, lessons.length)}%` }} /></div>
      </div>

      <h2>Bản đồ lộ trình</h2>
      <div className="b-road">
        {groups.map(g => {
          const ls = lessons.filter(l => l.group === g); const n = ls.filter(isDone).length; const first = ls.find(l => !isDone(l)) ?? ls[0];
          return <a key={g} href={first.path} className={n === ls.length ? 'full' : ''}>
            <div className="nm">{n === ls.length ? '✅ ' : ''}{g}</div>
            <div className="ct">{n}/{ls.length} bài</div>
            <div className="bar"><i style={{ width: `${pct(n, ls.length)}%` }} /></div>
          </a>;
        })}
        <a href="/d/atlas/" className={known === taxCards.length ? 'full' : ''}>
          <div className="nm">D · Tax Atlas</div>
          <div className="ct">{known}/{taxCards.length} thẻ đã thuộc</div>
          <div className="bar"><i style={{ width: `${pct(known, taxCards.length)}%` }} /></div>
        </a>
      </div>

      <h2>Chi tiết từng bài</h2>
      {groups.map(g => {
        const ls = lessons.filter(l => l.group === g); const n = ls.filter(isDone).length; const started = ls.some(l => d.lessons[l.id]?.visitedAt);
        return (
          <details key={g} className="b-grp" open={started && n < ls.length}>
            <summary>{g}<small>{n}/{ls.length} bài</small></summary>
            <table><thead><tr><th>Bài</th><th>Trạng thái</th><th>Điểm</th><th>Ghi chú</th></tr></thead><tbody>
              {ls.map(l => { const s = d.lessons[l.id]; return (
                <tr key={l.id}><td><a href={l.path}>{l.title}</a>{l.minutes ? <span style={{ color: 'var(--bisc-muted)' }}> · {l.minutes}′</span> : ''}</td>
                  <td>{s?.done ? '✅ Xong' : s?.visitedAt ? '📖 Đang học' : '—'}</td>
                  <td>{s?.quiz ? `Quiz ${s.quiz.score}/${s.quiz.total}` : ''}{s?.scores && Object.values(s.scores).map((x, k) => <div key={k} style={{ fontSize: '.8rem' }}>{x.label ?? ''}: {x.score}/{x.total}</div>)}{!s?.quiz && !s?.scores ? '—' : null}</td>
                  <td style={{ whiteSpace: 'pre-wrap', fontSize: '.85rem' }}>{s?.note || '—'}</td></tr>); })}
            </tbody></table>
          </details>
        );
      })}

      <div className="b-card" style={{ marginTop: '2rem' }}>
        <div className="b-kicker">Sao lưu & chuyển máy</div>
        <p style={{ margin: '0 0 .7rem' }}>Tiến độ, ghi chú, điểm quiz, thẻ Tax Atlas và ghi chú giấy làm việc chỉ lưu trên trình duyệt này. Tải bản sao lưu để giữ lại hoặc mở trên máy khác.</p>
        <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button type="button" className="b-btn" onClick={doExport}>⬇ Tải bản sao lưu</button>
          <button type="button" className="b-btn ghost" onClick={() => file.current?.click()}>⬆ Khôi phục từ file</button>
          <input ref={file} type="file" accept="application/json" hidden onChange={e => doImport(e.target.files?.[0])} />
          <span style={{ fontSize: '.85rem' }}>{msg}</span>
        </div>
      </div>
    </div>
  );
}
