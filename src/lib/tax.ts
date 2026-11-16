/** Dữ liệu nhánh D · Tax. Thẻ nằm trong src/data/tax/cards-{a..e}.json, dây nối trong edges.json, cây trong trees.json. */
import treesJson from '../data/tax/trees.json';
import cardsA from '../data/tax/cards-a.json';
import cardsB from '../data/tax/cards-b.json';
import cardsC from '../data/tax/cards-c.json';
import cardsD from '../data/tax/cards-d.json';
import cardsE from '../data/tax/cards-e.json';
import edgesJson from '../data/tax/edges.json';

export type Part = 'A' | 'B' | 'C' | 'D' | 'E';
export interface TaxCard {
  id: string; part: Part; group: string; mvp?: boolean;
  title_en: string; title_vi: string; summary_vi: string;
  rules_vi: string[];
  numbers?: { label: string; value: string; src?: string }[];
  formula?: string;
  example?: { q_en: string; a_vi: string; src?: string };
  traps?: { text_vi: string; src?: string }[];
  legal?: string[]; sources: string[];
  flags?: ('new' | 'off-focus' | 'conflict')[];
  conflict_vi?: string;
  qa?: { q_en: string; a_vi: string }[];
  exam_refs?: string[];
}
export type EdgeType = 'affects' | 'same-number' | 'confused-with' | 'exception-of' | 'computed-with' | 'contrast';
export interface TaxEdge { from: string; to: string; type: EdgeType; why_vi: string }

export const cards: TaxCard[] = [...cardsA, ...cardsB, ...cardsC, ...cardsD, ...cardsE] as TaxCard[];
export const edges: TaxEdge[] = (edgesJson as { edges: TaxEdge[] }).edges;
export const trees = (treesJson as any).trees as any[];
export const cardById = (id: string) => cards.find(c => c.id === id);
export const treeById = (id: string) => trees.find(t => t.id === id);

export const partNames: Record<Part, { en: string; vi: string }> = {
  A: { en: 'Tax system & administration', vi: 'Hệ thống thuế, quản lý thuế, chuyển giá' },
  B: { en: 'Personal income tax', vi: 'Thuế thu nhập cá nhân (PIT)' },
  C: { en: 'Corporate income tax', vi: 'Thuế thu nhập doanh nghiệp (CIT)' },
  D: { en: 'Foreign contractor tax', vi: 'Thuế nhà thầu nước ngoài (FCT)' },
  E: { en: 'VAT & invoices', vi: 'Thuế GTGT và hóa đơn (VAT)' },
};
export const edgeLabels: Record<EdgeType, { icon: string; vi: string }> = {
  affects: { icon: '→', vi: 'Ảnh hưởng sang' },
  'same-number': { icon: '＝', vi: 'Cùng con số / ngưỡng' },
  'confused-with': { icon: '≠', vi: 'Hay nhầm với' },
  'exception-of': { icon: '⊂', vi: 'Ngoại lệ của' },
  'computed-with': { icon: '∑', vi: 'Dùng chung trong phép tính' },
  contrast: { icon: '⇄', vi: 'So sánh' },
};

const srcNames: Record<string, string> = { r1: 'Revision · Tax admin', r2: 'Revision · PIT', r3: 'Revision · CIT', r4: 'Revision · VAT', r5: 'Revision · FCT', s1: 'Study · Ch1', s2: 'Study · Ch2 PIT', s3: 'Study · Ch3 CIT', s4: 'Study · Ch4 VAT', s5: 'Study · Ch5 FCT', tt: 'Tax tables J26–J27', D320: 'Decree 320/2025' };
export function srcLabel(code: string): string {
  const [k, p] = code.split(':');
  return `${srcNames[k] ?? k}${p ? ` · tr. ${p}` : ''}`;
}
/** Ánh xạ thẻ → cây quyết định dùng thẻ đó. */
export const treesByCard: Record<string, { id: string; title_vi: string }[]> = (() => {
  const m: Record<string, { id: string; title_vi: string }[]> = {};
  for (const t of trees) for (const n of Object.values<any>(t.nodes)) if (n.result) for (const c of n.cards ?? []) {
    (m[c] ??= []); if (!m[c].some(x => x.id === t.id)) m[c].push({ id: t.id, title_vi: t.title_vi });
  }
  return m;
})();
