import { useEffect, useRef, useState } from 'react';
import { trees, treeById, cardById, srcLabel } from '../lib/tax';

type Step = { node: string; pick?: number };

/** Cây quyết định: sơ đồ nhánh (bấm nhãn nhánh để chọn) + khung từng bước dùng chung trạng thái. Dữ liệu: src/data/tax/trees.json. */
export default function DecisionTree({ treeId }: { treeId: string }) {
  const tree = treeById(treeId);
  const [path, setPath] = useState<Step[]>(() => tree ? [{ node: tree.start }] : []);
  const [showMap, setShowMap] = useState(true);
  const [zoom, setZoom] = useState(1);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => { if (tree) setPath([{ node: tree.start }]); }, [treeId]);
  useEffect(() => {
    const c = box.current, el = c?.querySelector('.tf-box.cur') as HTMLElement | null;
    if (!c || !el) return;
    const cr = c.getBoundingClientRect(), er = el.getBoundingClientRect();
    const out = er.left < cr.left || er.right > cr.right || er.top < cr.top || er.bottom > cr.bottom;
    if (out) c.scrollBy({ left: er.left - cr.left - 40, top: er.top - cr.top - 40, behavior: 'smooth' });
  }, [path, showMap]);
  if (!tree) return <p>Không tìm thấy cây "{treeId}".</p>;
  const cur = path[path.length - 1]; if (!cur) return null;
  const node = tree.nodes[cur.node];
  const choose = (i: number) => setPath(p => [...p.slice(0, -1), { node: p[p.length - 1].node, pick: i }, { node: node.options[i].next }]);
  const back = () => setPath(p => p.length > 1 ? [...p.slice(0, -2), { node: p[p.length - 2].node }] : p);

  /** Vẽ một nhánh. trail = đường từ gốc tới ô này; on = ô này nằm trên đường đang đi. */
  const draw = (id: string, trail: Step[], on: boolean, key: string): JSX.Element => {
    const n = tree.nodes[id];
    const d = trail.length - 1;
    const step = on ? path[d] : undefined;
    const isCur = on && d === path.length - 1;
    const cell = (
      <button type="button" className={`tf-box ${n.result ? 'res' : 'q'}${on ? ' on' : ''}${isCur ? ' cur' : ''}`}
        title={n.result ? n.verdict_vi : `${n.q_vi}\n${n.q_en}`} onClick={() => setPath(trail)}>
        {n.result ? <><b>✅ {n.verdict_vi}</b><small>{n.verdict_en}</small></> : <><span>{n.q_vi}</span>{n.hint_vi && <small>💡 có gợi ý</small>}</>}
      </button>
    );
    if (n.result) return <div className="tf-node" key={key}>{cell}</div>;
    return (
      <div className="tf-node" key={key}>{cell}
        <div className="tf-kids">{n.options.map((o: any, i: number) => {
          const taken = on && step?.pick === i;
          const dim = on && step?.pick !== undefined && !taken;
          const next: Step[] = [...trail.slice(0, -1), { node: id, pick: i }, { node: o.next }];
          return (
            <div key={i} className={`tf-kid${taken ? ' on' : ''}${dim ? ' dim' : ''}`}>
              <button type="button" className="tf-edge" title={o.label_en} onClick={() => setPath(next)}>{o.label_vi}</button>
              {draw(o.next, next, taken, `${key}.${i}`)}
            </div>
          );
        })}</div>
      </div>
    );
  };

  return (
    <div className="tx">
      <div className="tx-chips">{tree.sources.map((s: string) => <span key={s} className="tx-src" title={srcLabel(s)}>{s}</span>)}</div>

      <div className="x-bar">
        <button type="button" className="b-btn ghost" onClick={() => setShowMap(v => !v)}>{showMap ? '🗺️ Ẩn sơ đồ' : '🗺️ Hiện sơ đồ'}</button>
        {showMap && <>
          <button type="button" className="b-btn ghost" onClick={() => setZoom(z => Math.max(.6, +(z - .1).toFixed(1)))} aria-label="Thu nhỏ">−</button>
          <button type="button" className="b-btn ghost" onClick={() => setZoom(z => Math.min(1.3, +(z + .1).toFixed(1)))} aria-label="Phóng to">+</button>
          <small>Bấm nhãn nhánh (Có / Không…) để chọn đường; bấm một ô để quay về bước đó.</small>
        </>}
      </div>
      {showMap && <div className="tf-wrap" ref={box}><div className="tf" style={{ zoom }}>{draw(tree.start, [{ node: tree.start }], true, 'r')}</div></div>}

      {path.length > 1 && <div className="dt-path" aria-label="Đường đã đi">{path.slice(0, -1).map((p, i) => {
        const n = tree.nodes[p.node];
        return <button type="button" key={i} onClick={() => setPath([...path.slice(0, i), { node: p.node }])} title="Quay về bước này">{n.q_vi?.slice(0, 40)}… → <b>{n.options[p.pick!]?.label_vi}</b></button>;
      })}</div>}
      {!node.result ? (
        <div className="dt-q">
          <div className="en">{node.q_en}</div><div className="vi">{node.q_vi}</div>
          {node.hint_vi && <div className="hint">💡 {node.hint_vi}</div>}
          {node.options.map((o: any, i: number) => <button key={i} type="button" className="dt-opt" onClick={() => choose(i)}>{o.label_en}<small>{o.label_vi}</small></button>)}
        </div>
      ) : (
        <div className="dt-res">
          <div className="en">✅ {node.verdict_en}</div>
          <p><b>{node.verdict_vi}</b></p>
          <ul>{node.rules_vi?.map((r: string, i: number) => <li key={i}>{r}</li>)}</ul>
          {node.trap_vi && <div className="tx-trap">⚠️ {node.trap_vi}</div>}
          {node.cards?.length > 0 && <><div className="tx-grp">Mở thẻ</div><div className="tx-chips">{node.cards.map((c: string) => { const cd = cardById(c); return <a key={c} className="b-chip std" href={`/d/atlas/#n-${c}`}>{cd ? cd.title_en : c}</a>; })}</div></>}
          <div className="tx-chips">{node.sources?.map((s: string) => <span key={s} className="tx-src" title={srcLabel(s)}>{s}</span>)}</div>
          {node.next_tree && treeById(node.next_tree) && <p><a className="b-btn" href={`/d/decide/${node.next_tree}/`}>Chạy cây tiếp theo: {treeById(node.next_tree).title_vi} →</a></p>}
        </div>
      )}
      <div className="x-bar">
        <button type="button" className="b-btn ghost" disabled={path.length < 2} onClick={back}>← Quay lại</button>
        <button type="button" className="b-btn ghost" onClick={() => setPath([{ node: tree.start }])}>↺ Làm lại</button>
      </div>
    </div>
  );
}

export function DecisionList() {
  const parts: Record<string, string> = { A: 'Quản lý thuế', B: 'PIT', C: 'CIT', D: 'FCT', E: 'VAT & hóa đơn' };
  return (
    <div className="tx">
      {['B', 'C', 'D', 'E', 'A'].map(p => { const l = trees.filter(t => t.part === p); if (!l.length) return null; return (
        <div key={p}><div className="tx-grp">{p} · {parts[p]}</div>
          <div className="dt-list">{l.map(t => {
            const n = Object.values<any>(t.nodes);
            return <a key={t.id} href={`/d/decide/${t.id}/`}><b>{t.title_vi}</b><small>{t.title_en}</small>
              <small className="dt-first">Câu đầu: {t.nodes[t.start].q_vi}</small>
              <small>{n.filter(x => !x.result).length} câu hỏi · {n.filter(x => x.result).length} kết luận</small></a>;
          })}</div></div>
      ); })}
    </div>
  );
}
