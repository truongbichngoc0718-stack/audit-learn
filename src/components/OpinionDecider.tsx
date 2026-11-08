import { useState } from 'react';
import './map.css';

type Nature = 'mis' | 'lim' | 'none' | null;
type YN = 'y' | 'n' | null;

const pct = (a: number, b: number) => (b ? `${((100 * a) / b).toFixed(1)}%` : '–');

/**
 * Cây quyết định ý kiến kiểm toán [SITE MỚI · nhánh C] theo CP5 §2 (ISA 700/705) và §3.2 (ISA 570).
 * Tab 1: sai sót / giới hạn phạm vi → 3 câu hỏi → 1 trong 5 kết quả. Tab 2: going concern 5 kết quả.
 */
export default function OpinionDecider() {
  const [tab, setTab] = useState<'tree' | 'gc'>('tree');
  const [nature, setNature] = useState<Nature>(null);
  const [mat, setMat] = useState<YN>(null);
  const [perv, setPerv] = useState<YN>(null);
  const [amt, setAmt] = useState(1.8); const [pbt, setPbt] = useState(22.7); const [ta, setTa] = useState(85);
  const [gcBasis, setGcBasis] = useState<'ok' | 'bad' | 'unclear' | null>(null);
  const [mu, setMu] = useState<YN>(null);
  const [disc, setDisc] = useState<YN>(null);

  const reset = () => { setNature(null); setMat(null); setPerv(null); };
  let out: { op: string; wording?: string; sections: string } | null = null;
  if (nature === 'none') out = { op: 'Unmodified opinion', sections: 'Clean report (ISA 700). No Basis for modification paragraph.' };
  else if (nature && mat === 'n') out = { op: 'Unmodified opinion', sections: 'Matter not material: no impact on the opinion.' };
  else if (nature && mat === 'y' && perv) {
    const base = 'Opinion section reworded + a "Basis for … Opinion" paragraph IMMEDIATELY AFTER the Opinion section, describing and quantifying the matter.';
    if (nature === 'mis') out = perv === 'n'
      ? { op: 'Qualified opinion', wording: 'Except for the effects of the matter described in the Basis for Qualified Opinion section, the FS present fairly…', sections: base }
      : { op: 'Adverse opinion', wording: 'The FS DO NOT present fairly…', sections: base };
    else out = perv === 'n'
      ? { op: 'Qualified opinion (scope limitation)', wording: 'Except for the possible effects of the matter described in the Basis for Qualified Opinion section, the FS present fairly…', sections: base }
      : { op: 'Disclaimer of opinion', wording: 'We DO NOT express an opinion on the FS', sections: base };
  }

  let gcOut: string | null = null;
  if (gcBasis === 'bad') gcOut = 'ADVERSE opinion: the whole basis of preparation is wrong = pervasive.';
  else if (gcBasis === 'unclear') gcOut = 'QUALIFIED or DISCLAIMER: inability to obtain sufficient appropriate audit evidence (management unwilling to extend its assessment).';
  else if (gcBasis === 'ok' && mu === 'n') gcOut = 'UNMODIFIED. No extra section.';
  else if (gcBasis === 'ok' && mu === 'y' && disc === 'y') gcOut = 'UNMODIFIED opinion + "Material Uncertainty Related to Going Concern" section (NOT a KAM, NOT a modification).';
  else if (gcBasis === 'ok' && mu === 'y' && disc === 'n') gcOut = 'MODIFIED: QUALIFIED or ADVERSE opinion (material misstatement of disclosures).';

  const B = ({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) =>
    <button type="button" className={on ? 'on' : ''} onClick={onClick}>{children}</button>;

  return (
    <div>
      <div className="amm-tabs" role="tablist">
        <button role="tab" aria-selected={tab === 'tree'} className={tab === 'tree' ? 'on' : ''} onClick={() => setTab('tree')}>Misstatement or scope limitation</button>
        <button role="tab" aria-selected={tab === 'gc'} className={tab === 'gc' ? 'on' : ''} onClick={() => setTab('gc')}>Going concern</button>
      </div>
      {tab === 'tree' && <>
        <div className="od-step">
          <div className="q">Step ① Quantify (optional) · amounts in $m</div>
          <div className="od-btns" style={{ alignItems: 'center' }}>
            <label>Issue <input type="number" step="0.1" value={amt} onChange={e => setAmt(+e.target.value)} style={{ width: '5.5rem' }} /></label>
            <label>PBT <input type="number" step="0.1" value={pbt} onChange={e => setPbt(+e.target.value)} style={{ width: '5.5rem' }} /></label>
            <label>Total assets <input type="number" step="0.1" value={ta} onChange={e => setTa(+e.target.value)} style={{ width: '5.5rem' }} /></label>
          </div>
          <div className="why">{pct(amt, pbt)} of PBT · {pct(amt, ta)} of total assets. Benchmarks in CP5: 5% of PBT; 0.5–1% of revenue; 1–2% of total assets. Rule of thumb: &gt;10% of PBT and touching multiple balances = pervasive candidate; single line at 5–10% of PBT = material but not pervasive. Preset: CP5 Cookit Co.</div>
        </div>
        <div className="od-step">
          <div className="q">Q1. Is the issue a material MISSTATEMENT in the FS, or an INABILITY to obtain sufficient appropriate audit evidence?</div>
          <div className="od-btns">
            <B on={nature === 'mis'} onClick={() => { setNature('mis'); setMat(null); setPerv(null); }}>Misstatement (wrong number or omitted disclosure)</B>
            <B on={nature === 'lim'} onClick={() => { setNature('lim'); setMat(null); setPerv(null); }}>Inability (scope limitation)</B>
            <B on={nature === 'none'} onClick={() => { setNature('none'); setMat(null); setPerv(null); }}>Neither</B>
          </div>
        </div>
        {nature && nature !== 'none' && <div className="od-step">
          <div className="q">Q2. Is the matter MATERIAL?</div>
          <div className="od-btns"><B on={mat === 'y'} onClick={() => { setMat('y'); setPerv(null); }}>Yes</B><B on={mat === 'n'} onClick={() => setMat('n')}>No</B></div>
        </div>}
        {nature && nature !== 'none' && mat === 'y' && <div className="od-step">
          <div className="q">Q3. Is the matter PERVASIVE? (any one of ISA 705's three tests)</div>
          <div className="why">① Not confined to specific elements, accounts or items · ② if confined, represents or could represent a substantial proportion of the FS · ③ for disclosures, fundamental to users' understanding.</div>
          <div className="od-btns"><B on={perv === 'y'} onClick={() => setPerv('y')}>Yes, pervasive</B><B on={perv === 'n'} onClick={() => setPerv('n')}>No, material only</B></div>
        </div>}
        {out && <div className="od-out">
          <div className="k">Step ② Decision tree → opinion</div>
          <div className="big">{out.op}</div>
          {out.wording && <div><q>{out.wording}</q></div>}
          <div style={{ marginTop: '.4rem' }}><b style={{ color: 'var(--bisc-amber)' }}>Step ③ Report sections:</b> {out.sections}</div>
        </div>}
        {nature && <p style={{ marginTop: '.5rem' }}><button type="button" className="b-btn ghost" onClick={reset}>Start again</button></p>}
      </>}
      {tab === 'gc' && <>
        <div className="od-step">
          <div className="q">Is the going concern basis appropriate?</div>
          <div className="od-btns">
            <B on={gcBasis === 'ok'} onClick={() => { setGcBasis('ok'); setMu(null); setDisc(null); }}>Appropriate</B>
            <B on={gcBasis === 'bad'} onClick={() => setGcBasis('bad')}>Inappropriate, FS still on GC basis</B>
            <B on={gcBasis === 'unclear'} onClick={() => setGcBasis('unclear')}>Unclear, management unwilling to extend assessment</B>
          </div>
        </div>
        {gcBasis === 'ok' && <div className="od-step">
          <div className="q">Does a material uncertainty exist?</div>
          <div className="od-btns"><B on={mu === 'y'} onClick={() => { setMu('y'); setDisc(null); }}>Yes</B><B on={mu === 'n'} onClick={() => setMu('n')}>No</B></div>
        </div>}
        {gcBasis === 'ok' && mu === 'y' && <div className="od-step">
          <div className="q">Is the disclosure adequate?</div>
          <div className="od-btns"><B on={disc === 'y'} onClick={() => setDisc('y')}>Adequate</B><B on={disc === 'n'} onClick={() => setDisc('n')}>Inadequate</B></div>
        </div>}
        {gcOut && <div className="od-out"><div className="k">Auditor's report</div><div className="big" style={{ fontSize: '1.05rem' }}>{gcOut}</div>
          <div style={{ fontSize: '.85rem' }}>BIG TRAP 2: the GC assessment period is 12 months from THE DATE OF THE FS, not from the auditor's report date.</div></div>}
      </>}
    </div>
  );
}
