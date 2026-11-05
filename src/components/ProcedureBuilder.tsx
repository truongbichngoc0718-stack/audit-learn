import { useState } from 'react';
import './calc.css';
import './exam.css';

export interface Pick { t: string; ok: boolean; why?: string }
export interface Task3W { task: string; nouns: Pick[]; whys: Pick[]; model: string }

const VERBS: Pick[] = [
  { t: 'Inspect', ok: true }, { t: 'Recalculate', ok: true }, { t: 'Reperform', ok: true }, { t: 'Reconcile', ok: true },
  { t: 'Agree', ok: true }, { t: 'Trace', ok: true }, { t: 'Enquire of', ok: true }, { t: 'Obtain', ok: true },
  { t: 'Cast', ok: true }, { t: 'Confirm', ok: true }, { t: 'Vouch', ok: true },
  { t: 'Check', ok: false }, { t: 'Look at', ok: false }, { t: 'Ensure', ok: false }, { t: 'See if', ok: false },
];
const GENERIC = 'supporting documents';

/**
 * Công thức 3W (Skills Checkpoint 4 §1.2): VERB (what to do) + NOUN (to what) + WHY (for what purpose).
 * Người học ghép thủ tục cho từng tình huống → chấm Full / Half / No mark theo tiêu chí checkpoint.
 */
export default function ProcedureBuilder({ tasks }: { tasks: Task3W[] }) {
  const [ti, setTi] = useState(0);
  const [v, setV] = useState(''); const [n, setN] = useState(''); const [w, setW] = useState('');
  const [checked, setChecked] = useState(false);
  const task = tasks[ti];
  const go = (i: number) => { setTi(i); setV(''); setN(''); setW(''); setChecked(false); };
  const verb = VERBS.find(x => x.t === v); const noun = task.nouns.find(x => x.t === n); const why = task.whys.find(x => x.t === w);

  const issues: string[] = []; let mark: 'Full mark' | 'Half mark' | 'No mark' = 'Full mark';
  if (checked) {
    if (!verb || !verb.ok) { issues.push(`VERB: "${v || '—'}" is too vague. Use an ISA verb (Inspect, Recalculate, Reconcile, Agree, Trace…).`); mark = 'No mark'; }
    if (!noun) { issues.push('NOUN: name the specific document or item tested.'); mark = 'No mark'; }
    else if (n === GENERIC) { issues.push('NOUN: "supporting documents" alone is not enough. Name at least one specific document.'); if (mark !== 'No mark') mark = 'Half mark'; }
    else if (!noun.ok) { issues.push(`NOUN: ${noun.why ?? 'this evidence does not address the risk in the scenario.'}`); mark = 'No mark'; }
    if (!why || w === '(no purpose stated)') { issues.push('WHY: no purpose stated. Why are we doing this? Which assertion?'); if (mark === 'Full mark') mark = 'Half mark'; }
    else if (!why.ok) { issues.push(`WHY: ${why.why ?? 'this purpose addresses a different assertion.'}`); if (mark === 'Full mark') mark = 'Half mark'; }
  }
  const cls = mark === 'Full mark' ? 'ok' : mark === 'Half mark' ? 'mid' : 'bad';

  return (
    <div className="calc">
      <div className="x-tabs">{tasks.map((t, i) => <button key={i} type="button" className={i === ti ? 'on' : ''} onClick={() => go(i)}>Scenario {i + 1}</button>)}</div>
      <p style={{ margin: '.7rem 0', fontWeight: 600 }}>{task.task}</p>
      <div className="x-3w">
        <label>Verb · what to do<select value={v} onChange={e => { setV(e.target.value); setChecked(false); }}><option value="">Choose…</option>{VERBS.map(x => <option key={x.t}>{x.t}</option>)}</select></label>
        <label>Noun · to what<select value={n} onChange={e => { setN(e.target.value); setChecked(false); }}><option value="">Choose…</option>{task.nouns.map(x => <option key={x.t}>{x.t}</option>)}</select></label>
        <label>Why · for what purpose<select value={w} onChange={e => { setW(e.target.value); setChecked(false); }}><option value="">Choose…</option>{task.whys.map(x => <option key={x.t}>{x.t}</option>)}</select></label>
      </div>
      <div className="x-sentence"><span className="w">{v || 'Verb'}</span> the <span className="w">{n || 'document'}</span> <span className="w">{w || 'to …'}</span>.</div>
      <div className="x-bar"><button type="button" className="b-btn" disabled={!v && !n && !w} onClick={() => setChecked(true)}>Mark my procedure</button></div>
      {checked && (
        <div className={`verdict ${cls}`}>
          {mark}{issues.length > 0 && <ul style={{ margin: '.3rem 0 0', fontWeight: 400 }}>{issues.map((x, i) => <li key={i}>{x}</li>)}</ul>}
          {mark !== 'Full mark' && <div style={{ fontWeight: 400, marginTop: '.4rem' }}><b>Model:</b> {task.model}</div>}
        </div>
      )}
    </div>
  );
}
