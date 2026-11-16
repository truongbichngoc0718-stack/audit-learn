import { useMemo, useState, useSyncExternalStore } from 'react';
import { cards, partNames, type Part } from '../lib/tax';
import { getTax, subscribe, setFc } from '../lib/taxStore';

/** Flashcard sinh từ trường qa của thẻ Atlas. Lặp lại ngắt quãng đơn giản (hộp 0–5), lưu localStorage. */
export default function TaxFlashcards() {
  const data = useSyncExternalStore(subscribe, getTax, getTax);
  const [part, setPart] = useState<Part | 'all'>('all');
  const [flip, setFlip] = useState(false);
  const [skip, setSkip] = useState(0);
  const deck = useMemo(() => cards.filter(c => part === 'all' || c.part === part).flatMap(c => (c.qa ?? []).map((x, i) => ({ id: `${c.id}#${i}`, card: c, ...x }))), [part]);
  const now = Date.now();
  const due = deck.filter(d => !data.fc[d.id] || new Date(data.fc[d.id].due).getTime() <= now);
  const cur = due.length ? due[skip % due.length] : undefined;
  const rate = (box: number) => { if (!cur) return; setFc(cur.id, box); setFlip(false); setSkip(0); };
  return (
    <div className="tx">
      <div className="tx-bar">
        <select value={part} onChange={e => { setPart(e.target.value as any); setSkip(0); setFlip(false); }}><option value="all">Mọi phần</option>{(Object.keys(partNames) as Part[]).map(p => <option key={p} value={p}>{p} · {partNames[p].en}</option>)}</select>
        <span>Đến hạn: <b>{due.length}</b> / {deck.length} thẻ</span>
      </div>
      {!cur ? <div className="b-card">🎉 Hết thẻ đến hạn. Quay lại sau hoặc đổi phần.</div> : <>
        <button type="button" onClick={() => setFlip(!flip)} className="b-card" style={{ width: '100%', minHeight: 170, cursor: 'pointer', font: 'inherit', color: 'inherit', textAlign: 'left', background: flip ? 'var(--bisc-amber-soft)' : 'var(--bisc-card)' }}>
          <div className="b-kicker">{cur.card.part} · {cur.card.title_en} · {flip ? 'Đáp án' : 'Câu hỏi'}</div>
          <div style={{ fontSize: flip ? '1rem' : '1.2rem', fontWeight: flip ? 500 : 700 }}>{flip ? cur.a_vi : cur.q_en}</div>
          <div style={{ fontSize: '.75rem', color: 'var(--bisc-muted)', marginTop: '.6rem' }}>Bấm để lật</div>
        </button>
        {flip && <div className="x-bar"><button type="button" className="b-btn ghost" onClick={() => rate(0)}>😵 Quên</button><button type="button" className="b-btn ghost" onClick={() => rate(1 + (data.fc[cur.id]?.box ?? 0))}>🙂 Nhớ</button><a href={`/d/atlas/#n-${cur.card.id}`}>Mở thẻ →</a></div>}
        {!flip && <div className="x-bar"><button type="button" className="b-btn ghost" onClick={() => setSkip(skip + 1)}>Bỏ qua →</button></div>}
      </>}
    </div>
  );
}
