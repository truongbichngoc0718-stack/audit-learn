import { useState } from 'react';
export interface FlowStep { label: string; sub?: string; detail: string }
/** Sơ đồ dòng chảy bấm được: bấm từng thẻ để xem vai trò (BISC_STYLE §3.1 mục 4). */
export default function FlowDiagram({ steps, footer, stepLabel = 'Tầng' }: { steps: FlowStep[]; footer?: string; stepLabel?: string }) {
  const [i, setI] = useState(0);
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'stretch', gap: '.35rem', flexWrap: 'wrap' }}>
        {steps.map((s, k) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: '.35rem' }}>
            <button type="button" onClick={() => setI(k)} aria-pressed={i === k}
              style={{ padding: '.55rem .8rem', borderRadius: 12, cursor: 'pointer', font: 'inherit', textAlign: 'left',
                border: `1.5px solid ${i === k ? 'var(--bisc-amber)' : 'var(--bisc-line)'}`, background: i === k ? 'var(--bisc-navy)' : 'var(--bisc-card)', color: i === k ? '#fff' : 'inherit' }}>
              <div style={{ fontSize: '.68rem', opacity: .75 }}>{stepLabel} {k + 1}</div>
              <div style={{ fontWeight: 700 }}>{s.label}</div>
              {s.sub && <div style={{ fontSize: '.75rem', opacity: .8 }}>{s.sub}</div>}
            </button>
            {k < steps.length - 1 && <span aria-hidden style={{ color: 'var(--bisc-muted)' }}>→</span>}
          </div>
        ))}
      </div>
      <div className="b-card" style={{ marginTop: '.6rem' }} dangerouslySetInnerHTML={{ __html: steps[i].detail }} />
      {footer && <p style={{ fontSize: '.85rem', color: 'var(--bisc-muted)', marginTop: '.5rem' }}>{footer}</p>}
    </div>
  );
}
