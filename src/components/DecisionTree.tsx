import { useEffect, useState } from 'react';
import { trees, treeById, cardById, srcLabel } from '../lib/tax';

/** Cây quyết định: đi từng bước, quay lại, hiện đường đã đi; kết quả link về thẻ. Dữ liệu: src/data/tax/trees.json. */
export default function DecisionTree({ treeId }: { treeId: string }) {
  const tree = treeById(treeId);
  const [path, setPath] = useState<{ node: string; pick?: string }[]>([]);
  useEffect(() => { if (tree) setPath([{ node: tree.start }]); }, [treeId]);
  if (!tree) return <p>Không tìm thấy cây "{treeId}".</p>;
  const cur = path[path.length - 1]; if (!cur) return null;
  const node = tree.nodes[cur.node];
  const choose = (o: any) => setPath(p => [...p.slice(0, -1), { ...p[p.length - 1], pick: o.label_vi }, { node: o.next }]);
  const back = () => setPath(p => p.length > 1 ? p.slice(0, -1).map((x, i, a) => i === a.length - 1 ? { node: x.node } : x) : p);
  return (
    <div className="tx">
      <p>{tree.intro_vi}</p>
      <div className="tx-chips">{tree.sources.map((s: string) => <span key={s} className="tx-src" title={srcLabel(s)}>{s}</span>)}</div>
      {path.length > 1 && <div className="dt-path" aria-label="Đường đã đi">{path.slice(0, -1).map((p, i) => <span key={i}>{tree.nodes[p.node].q_vi?.slice(0, 40)}… → <b>{p.pick}</b></span>)}</div>}
      {!node.result ? (
        <div className="dt-q">
          <div className="en">{node.q_en}</div><div className="vi">{node.q_vi}</div>
          {node.hint_vi && <div className="hint">💡 {node.hint_vi}</div>}
          {node.options.map((o: any, i: number) => <button key={i} type="button" className="dt-opt" onClick={() => choose(o)}>{o.label_en}<small>{o.label_vi}</small></button>)}
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
          <div className="dt-list">{l.map(t => <a key={t.id} href={`/d/decide/${t.id}/`}><b>{t.title_vi}</b><small>{t.title_en}</small></a>)}</div></div>
      ); })}
    </div>
  );
}
