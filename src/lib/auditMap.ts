/**
 * Audit Master Map · dữ liệu dùng chung cho nhánh C (C1 map, cycle playbooks, CycleLinks).
 * Nguồn: slide ACCA AA ch05, ch07, ch09, ch12–17, ch19 + Skills Checkpoint 1–5 (source/library/acca-aa).
 * Mỗi node = một khoản mục; mỗi edge = một bút toán kép nối hai khoản mục, kèm thủ tục "một test, hai câu trả lời".
 */
export type CycleId = 'rev' | 'pur' | 'pay' | 'inv' | 'nca' | 'fin' | 'cash';
export type Dir = 'over' | 'under';

export interface Cycle { id: CycleId; name: string; color: string; href: string; ch: string }
export interface MapNode {
  id: string; name: string; vn: string; tk: string; fs: 'SOFP' | 'SPL' | 'Note';
  cycle: CycleId; x: number; y: number; short?: string;
  risk: string; assertions: string[]; procedures: string[]; analytics: string; trap: string;
  src: string; a?: { label: string; href: string };
}
export interface MapEdge { a: string; b: string; tx: string; entry: string; shared: string; src: string }
export interface Scenario {
  id: string; title: string; story: string; effects: { node: string; dir: Dir }[];
  profit: 'over' | 'under' | 'none'; assertion: string; detect: string; direction: 'Records → evidence (errors)' | 'Source → records (omissions)';
  report: string; src: string;
}
export interface Lens { id: string; name: string; nodes: string[]; note: string; src: string }

export const cycles: Cycle[] = [
  { id: 'rev', name: 'Revenue & receivables', color: '#2563eb', href: '/c/3/c3-1-revenue-receivables/', ch: 'Ch 9 · Ch 14' },
  { id: 'pur', name: 'Purchases & payables', color: '#d97706', href: '/c/3/c3-2-purchases-payables/', ch: 'Ch 9 · Ch 16' },
  { id: 'pay', name: 'Payroll', color: '#7c3aed', href: '/c/3/c3-3-payroll/', ch: 'Ch 9 · Ch 16 · Ch 17' },
  { id: 'inv', name: 'Inventory', color: '#0d9488', href: '/c/3/c3-4-inventory/', ch: 'Ch 9 · Ch 13' },
  { id: 'nca', name: 'Non-current assets', color: '#059669', href: '/c/3/c3-5-non-current-assets/', ch: 'Ch 9 · Ch 12' },
  { id: 'fin', name: 'Financing: loans, provisions, capital', color: '#e11d48', href: '/c/3/c3-6-financing/', ch: 'Ch 17' },
  { id: 'cash', name: 'Bank & cash: the hub', color: '#1e3a5f', href: '/c/3/c3-7-bank-cash/', ch: 'Ch 9 · Ch 15' },
];

export const nodes: MapNode[] = [
  { id: 'rev', name: 'Revenue', vn: 'Doanh thu', tk: '511 · 521 · 3387', fs: 'SPL', cycle: 'rev', x: 120, y: 70,
    risk: 'Overstatement where management has incentives (CP2)', assertions: ['Occurrence', 'Completeness', 'Accuracy', 'Cut-off'],
    procedures: ['Trace a sample of GDNs to sales invoices and the revenue account (completeness, starting outside the ledger)', 'Agree GDNs either side of the year end to the period revenue was recognised (cut-off)', 'Review credit notes issued after the year end for pre year-end sales'],
    analytics: 'Monthly revenue vs prior year; quantities × prices; returns and discounts; gross margin by product line.',
    trap: 'Revenue cut-off is tested from the GDN date, not the invoice date.', src: 'Ch 14 §2 · CP4', a: { label: 'Bài 3.1 Doanh thu', href: '/a/3/a3-1-doanh-thu/' } },
  { id: 'ar', name: 'Trade receivables', vn: 'Phải thu KH · dự phòng', tk: '131 · 2293', fs: 'SOFP', cycle: 'rev', x: 300, y: 150,
    risk: 'Overstatement', assertions: ['Existence', 'Rights & obligations', 'Valuation & allocation'],
    procedures: ['Positive confirmation of a sample of balances; follow up exceptions and non-responses', 'Review cash received after the year end (existence + valuation in one test)', 'Inspect the aged listing for old, overdue and unusual balances; review credit notes after the year end'],
    analytics: 'Receivables collection period vs prior year; balance per customer year on year.',
    trap: 'A credit balance on a receivable may need to be shown as a payable.', src: 'Ch 14 §1', a: { label: 'Bài 3.2 Phải thu', href: '/a/3/a3-2-phai-thu/' } },
  { id: 'inv', name: 'Inventory', vn: 'Hàng tồn kho', tk: '152–156 (Biscore: không có)', fs: 'SOFP', cycle: 'inv', x: 500, y: 70,
    risk: 'Overstatement', assertions: ['Existence', 'Completeness', 'Valuation & allocation', 'Cut-off'],
    procedures: ['Attend the count: observe, inspect condition, test count both directions', 'Agree cost of a sample of lines to purchase invoices, timesheets and overhead records', 'Compare cost with selling prices after the year end (lower of cost and NRV)'],
    analytics: 'Inventory holding period vs prior year; gross margin.',
    trap: 'Records → floor proves existence; floor → records proves completeness.', src: 'Ch 13' },
  { id: 'cos', name: 'Cost of sales', vn: 'Giá vốn', tk: '632', fs: 'SPL', cycle: 'inv', x: 690, y: 70,
    risk: 'Understatement (when inventory is overstated)', assertions: ['Completeness', 'Occurrence', 'Accuracy', 'Classification'],
    procedures: ['Gross profit margin by product line vs prior year and budget', 'Purchases cut-off: GRNs before the year end are in purchases, payables and inventory'],
    analytics: 'Closing inventory feeds cost of sales: every $ of overstated inventory is $1 of understated cost of sales.',
    trap: 'A margin test gives evidence over receivables, revenue and cost of sales at once (Ch 14 §1.5).', src: 'Ch 13 §2.5 · Ch 14 §1.5' },
  { id: 'ap', name: 'Trade payables', vn: 'Phải trả người bán', tk: '331', fs: 'SOFP', cycle: 'pur', x: 700, y: 175,
    risk: 'Understatement', assertions: ['Completeness', 'Cut-off', 'Rights & obligations', 'Presentation'],
    procedures: ['Reconcile supplier statements to the purchase ledger for a sample of suppliers', 'Search for unrecorded liabilities: post year-end payments and invoices back to the year-end listing', 'Examine unmatched purchase orders, GRNs and invoices'],
    analytics: 'Payables payment period vs prior year and industry; amounts per major supplier year on year.',
    trap: 'Select suppliers by activity, not by balance: a nil balance can hide the liability.', src: 'Ch 16 §1', a: { label: 'Bài 3.3 Phải trả', href: '/a/3/a3-3-phai-tra/' } },
  { id: 'acc', name: 'Accruals', vn: 'Chi phí phải trả', tk: '335', fs: 'SOFP', cycle: 'pur', x: 880, y: 250,
    risk: 'Understatement', assertions: ['Completeness', 'Accuracy', 'Cut-off'],
    procedures: ['Recalculate a sample of accruals', 'Payments after the year end that relate to the year must be accrued (e.g. internet July–September)'],
    analytics: 'Compare accruals with the prior year line by line.',
    trap: 'An accrual is the twin of an expense: missing accrual = understated expense.', src: 'Ch 16 §1.4–1.6' },
  { id: 'opex', name: 'Operating expenses', vn: 'Chi phí hoạt động', tk: '641 · 642', fs: 'SPL', cycle: 'pur', x: 880, y: 120,
    risk: 'Understatement', assertions: ['Completeness', 'Occurrence', 'Classification', 'Cut-off'],
    procedures: ['Compare each administrative expense with the prior year and expectations; investigate differences', 'Inspect a sample of purchase invoices to the amount posted', 'Review repairs and sundry expenses for capital items'],
    analytics: 'Line-by-line comparison with expectations; proof in total for rent (agreement × months).',
    trap: 'Capital vs revenue: one misclassification moves profit and assets together.', src: 'Ch 16 §1.7 · Ch 12', a: { label: 'Bài 3.4 Chi phí', href: '/a/3/a3-4-chi-phi/' } },
  { id: 'prep', name: 'Prepayments', vn: 'Chi phí trả trước', tk: '242', fs: 'SOFP', cycle: 'pur', x: 880, y: 360,
    risk: 'Overstatement', assertions: ['Existence', 'Valuation & allocation', 'Completeness'],
    procedures: ['Recalculate the amount prepaid for a sample from the prepayments listing', 'Verify to invoices, cash book and correspondence', 'Compare with the prior year for reasonableness'],
    analytics: 'Level of prepayments vs prior year.',
    trap: 'Overstated prepayment = understated expense.', src: 'Ch 14 §3', a: { label: 'Bài 3.4 Chi phí (242)', href: '/a/3/a3-4-chi-phi/' } },
  { id: 'pay', name: 'Wages & salaries', vn: 'Chi phí lương', tk: '334 · 622 · 642', fs: 'SPL', cycle: 'pay', x: 880, y: 470,
    risk: 'Occurrence (ghost employees) and accuracy', assertions: ['Occurrence', 'Completeness', 'Accuracy'],
    procedures: ['Proof in total: average employees × average wage, compare with the FS', 'Agree net pay per payroll to the bank transfer summary and cash book', 'Agree joiners and leavers to contracts and resignation letters; recalculate their month'],
    analytics: 'Monthly payroll vs prior year (bonus, overtime months); proof in total.',
    trap: 'One clerk who inputs employees and submits the bank file can pay a ghost.', src: 'Ch 16 §2 · CP3' },
  { id: 'dir', name: "Directors' emoluments", vn: 'Thù lao HĐQT/BGĐ', tk: 'Thuyết minh', fs: 'Note', cycle: 'pay', x: 880, y: 570,
    risk: 'Material by nature: disclosure', assertions: ['Existence', 'Completeness', 'Accuracy', 'Presentation'],
    procedures: ['Agree the disclosure to a schedule per director (salary, bonus, benefits, pension)', 'Vouch bonuses to board minutes, payroll and bank', 'Obtain written confirmation that disclosed emoluments are complete'],
    analytics: 'Each director vs prior year and expectations.',
    trap: 'Small amounts can still be material by nature (CP2 mock M6).', src: 'Ch 17 §4' },
  { id: 'ppe', name: 'PPE & assets under construction', short: 'PPE & construction in progress', vn: 'TSCĐ · XDCB', tk: '211 · 241', fs: 'SOFP', cycle: 'nca', x: 300, y: 450,
    risk: 'Overstatement', assertions: ['Existence', 'Rights & obligations', 'Valuation & allocation', 'Completeness'],
    procedures: ['Roll forward cost and depreciation from opening (agreed to signed FS) to closing', 'Physically inspect a sample of additions; agree cost to invoices; inspect title documents', 'Review repairs accounts for items that should be capitalised (completeness)'],
    analytics: 'Ratio of depreciation to cost by category vs prior year and policy.',
    trap: 'Training costs and deposits for assets not yet received are not additions (Ch 12 Activity 3).', src: 'Ch 12', a: { label: 'Bài 3.6 TSCĐ', href: '/a/3/a3-6-tscd/' } },
  { id: 'dep', name: 'Depreciation', vn: 'Khấu hao', tk: '214 · 6274 · 6424', fs: 'SPL', cycle: 'nca', x: 120, y: 540,
    risk: 'Valuation (estimate)', assertions: ['Accuracy', 'Valuation & allocation'],
    procedures: ['Proof in total: average cost × rate per category', 'Recalculate depreciation for a sample; revalued assets on the revalued amount', 'Review lives, residual values and gains/losses on disposal'],
    analytics: 'Proof in total ((opening cost + closing cost) / 2 × rate).',
    trap: 'Fully depreciated assets should not be charged again.', src: 'Ch 12 Activity 6', a: { label: 'Bài 3.6 TSCĐ', href: '/a/3/a3-6-tscd/' } },
  { id: 'int', name: 'Intangibles & development', vn: 'TSCĐ vô hình', tk: '213', fs: 'SOFP', cycle: 'nca', x: 120, y: 360,
    risk: 'Overstatement', assertions: ['Existence', 'Valuation & allocation', 'Classification'],
    procedures: ['Confirm capitalised development meets all PIRATE criteria (inspect project details, budgets)', 'Inspect invoices and payroll records for capitalised costs', 'Recalculate amortisation; it starts with production'],
    analytics: 'Development spend vs budget and prior year.',
    trap: 'Research is always expensed (CP5 Czech Co: $2.1m capitalised → qualified).', src: 'Ch 12 §3 · CP4 · CP5' },
  { id: 'loan', name: 'Loans', vn: 'Vay', tk: '341', fs: 'SOFP', cycle: 'fin', x: 680, y: 470,
    risk: 'Understatement and classification', assertions: ['Completeness', 'Existence', 'Accuracy', 'Classification'],
    procedures: ['Obtain direct confirmation from lenders: outstanding amount, accrued interest, security held', 'Review board minutes and the cash book for new borrowings', 'Agree current / non-current split to repayment dates in the loan agreements'],
    analytics: 'Compare with prior year working papers; items no longer included agreed to repayment or reclassification.',
    trap: 'Covenants close to breach: flag misstatement risk AND going concern (CP2).', src: 'Ch 17 §1', a: { label: 'Bài 3.5 Vay', href: '/a/3/a3-5-vay/' } },
  { id: 'fin', name: 'Finance costs', vn: 'Chi phí lãi vay', tk: '635', fs: 'SPL', cycle: 'fin', x: 680, y: 570,
    risk: 'Accuracy and cut-off', assertions: ['Accuracy', 'Completeness', 'Cut-off'],
    procedures: ['Proof in total of finance charges', 'Recalculate interest, agreeing rates to loan agreements', 'Agree capital and interest to lender confirmations'],
    analytics: 'HMA Co: $400k × 2% × 3 months + $350k × 2% × 6 months = $66k expected vs $81k charged.',
    trap: 'Capitalised borrowing costs cannot exceed total finance costs for the period.', src: 'Ch 7 Activity 1 · Ch 12 · Ch 17', a: { label: 'Bài 3.5 Vay', href: '/a/3/a3-5-vay/' } },
  { id: 'prov', name: 'Provisions & contingencies', vn: 'Dự phòng phải trả', tk: '352', fs: 'SOFP', cycle: 'fin', x: 500, y: 570,
    risk: 'Understatement (estimate)', assertions: ['Completeness', 'Valuation & allocation', 'Presentation'],
    procedures: ['Present obligation from a past event? Probable outflow? Best estimate? (IAS 37)', 'Letter to legal advisers; review legal expenses, minutes and correspondence', 'Compare with payments after the year end and past settlements'],
    analytics: 'Warranty provision as % of revenue vs prior year (Dress You Like Co: about 0.50% → 0.43%).',
    trap: 'A public announcement + staff communication before YE = constructive obligation (CP5 Cookit $1.8m).', src: 'Ch 17 §2 · CP5' },
  { id: 'eq', name: 'Share capital, reserves & dividends', short: 'Capital, reserves & dividends', vn: 'Vốn chủ sở hữu', tk: '411 · 421', fs: 'SOFP', cycle: 'fin', x: 320, y: 570,
    risk: 'Legality and authorisation', assertions: ['Existence', 'Accuracy', 'Presentation'],
    procedures: ['Verify share issues to minutes and the constitution; trace cash received', 'Agree dividends to minutes and payments; check distribution rules', 'Agree movements on reserves to authority'],
    analytics: 'Register of members total agreed to issued capital in the ledger.',
    trap: 'A dividend declared after the year end is non-adjusting (CP5 mock Q5).', src: 'Ch 17 §3' },
  { id: 'cash', name: 'Bank & cash', vn: 'Tiền', tk: '111 · 112', fs: 'SOFP', cycle: 'cash', x: 500, y: 320,
    risk: 'Window dressing at the year end', assertions: ['Existence', 'Completeness', 'Rights & obligations', 'Valuation & allocation'],
    procedures: ['Bank confirmation letter, agreed to the balance per the reconciliation', 'Recast the reconciliation; trace outstanding cheques and uncleared lodgements to after-date statements and paying-in slips', 'Cash count where cash is material'],
    analytics: 'Most transactions pass through cash: it is the hub every cycle reconciles to.',
    trap: 'Do not stop at the bank letter: examiners reward the reconciliation procedures.', src: 'Ch 15' },
];

export const edges: MapEdge[] = [
  { a: 'rev', b: 'ar', tx: 'Credit sale', entry: 'Dr Receivables / Cr Revenue', shared: 'Confirmation and after-date receipts prove receivables exist AND sales occurred; a post year-end credit note for a pre year-end invoice reduces both.', src: 'Ch 14 Activity 3, 5' },
  { a: 'ar', b: 'cash', tx: 'Customer receipt', entry: 'Dr Bank / Cr Receivables', shared: 'Keeping the cash book open after the year end overstates bank and understates receivables: test lodgement dates on paying-in slips.', src: 'Ch 15 §2.2' },
  { a: 'rev', b: 'cash', tx: 'Cash sale', entry: 'Dr Cash / Cr Revenue', shared: 'Reconcile till records to banking: unrecorded cash income is a completeness risk for revenue.', src: 'Ch 5 §5.1' },
  { a: 'ar', b: 'opex', tx: 'Irrecoverable debt / allowance', entry: 'Dr Expense / Cr Allowance', shared: 'An under-provided receivable overstates assets and profit together (CP5 Vega $1.2m).', src: 'Ch 14 · CP5' },
  { a: 'inv', b: 'cos', tx: 'Goods sold', entry: 'Dr Cost of sales / Cr Inventory', shared: 'Overstated closing inventory = understated cost of sales = overstated profit. Gross margin tests both.', src: 'Ch 13 · Ch 14 §1.5' },
  { a: 'rev', b: 'inv', tx: 'Despatch (cut-off)', entry: 'GDN before YE: revenue + receivable, not inventory', shared: 'One GDN cut-off test covers revenue, receivables and inventory.', src: 'Ch 13 §2.5' },
  { a: 'ap', b: 'inv', tx: 'Purchase of goods', entry: 'Dr Inventory / Cr Payables', shared: 'GRN before YE must be in purchases, payables AND inventory: one GRN cut-off test, three balances.', src: 'Ch 13 §2.5' },
  { a: 'ap', b: 'opex', tx: 'Expense invoice', entry: 'Dr Expense / Cr Payables', shared: 'An unrecorded invoice understates payables and expenses together (Freda\'s Fabrics, $71k).', src: 'Ch 16 Activity 2' },
  { a: 'acc', b: 'opex', tx: 'Accrued expense', entry: 'Dr Expense / Cr Accruals', shared: 'Post year-end payments for services used before YE reveal missing accruals ($8k internet).', src: 'Ch 16 Activity 2' },
  { a: 'ap', b: 'cash', tx: 'Supplier payment', entry: 'Dr Payables / Cr Bank', shared: 'Cheques recorded before YE but sent after reduce bank and payables: check outstanding cheques clear promptly.', src: 'Ch 15 §2.2' },
  { a: 'prep', b: 'opex', tx: 'Prepayment released', entry: 'Dr Expense / Cr Prepayment', shared: 'Recalculating the prepayment tests the expense at the same time.', src: 'Ch 14 §3' },
  { a: 'pay', b: 'cash', tx: 'Net pay', entry: 'Dr Wages / Cr Bank', shared: 'Agree net pay per payroll to the bank transfer summary: occurrence of wages and accuracy of cash.', src: 'Ch 16 §2.1' },
  { a: 'pay', b: 'inv', tx: 'Labour in inventory cost', entry: 'Dr Inventory / Cr Wages', shared: 'Labour cost per unit agreed to timesheets supports inventory valuation.', src: 'Ch 13 Activity 4' },
  { a: 'dir', b: 'pay', tx: 'Directors paid through payroll', entry: 'Part of wages; disclosed separately', shared: 'Vouching salary to monthly payroll and bank supports both the expense and the disclosure.', src: 'Ch 17 §4' },
  { a: 'ppe', b: 'ap', tx: 'Capital addition', entry: 'Dr PPE / Cr Payables (or Bank)', shared: 'Invoices after the year end and board minutes reveal capital commitments and unrecorded additions.', src: 'Ch 12 Activity 3' },
  { a: 'ppe', b: 'opex', tx: 'Capital vs revenue', entry: 'Repairs ↔ additions', shared: 'Review repairs for capital items (completeness of PPE) and additions for revenue items (existence of PPE).', src: 'Ch 12 · Ch 5 §5.1' },
  { a: 'ppe', b: 'dep', tx: 'Depreciation', entry: 'Dr Depreciation expense / Cr Accumulated depreciation', shared: 'Proof in total on cost tests the expense; misstated additions misstate depreciation too.', src: 'Ch 12 Activity 6' },
  { a: 'ppe', b: 'cash', tx: 'Disposal proceeds', entry: 'Dr Bank / Cr Disposal', shared: 'Trace proceeds to the cash book and bank; recalculate the profit or loss on disposal.', src: 'Ch 12 Activity 4' },
  { a: 'ppe', b: 'eq', tx: 'Revaluation', entry: 'Dr PPE / Cr Revaluation surplus', shared: 'Agree the surplus to the valuer\'s report and the reserve; depreciation then runs on the revalued amount.', src: 'Ch 12 Activity 5' },
  { a: 'ppe', b: 'fin', tx: 'Capitalised borrowing costs', entry: 'Dr PPE / Cr Finance costs', shared: 'Costs capitalised in the period cannot exceed total finance costs.', src: 'Ch 12 §2' },
  { a: 'int', b: 'opex', tx: 'Research vs development', entry: 'Dr Intangible or Dr Expense', shared: 'Failing PIRATE moves the cost from asset to expense: assets and profit both overstated.', src: 'Ch 12 §3 · CP5' },
  { a: 'loan', b: 'cash', tx: 'Drawdown / repayment', entry: 'Dr Bank / Cr Loan (repayment: reverse)', shared: 'The bank confirmation covers balances AND loans; new loans in the cash book must be in liabilities.', src: 'Ch 15 · Ch 17' },
  { a: 'loan', b: 'fin', tx: 'Interest', entry: 'Dr Finance costs / Cr Bank or accrual', shared: 'A proof in total on the loan balance tests the finance charge (HMA Co).', src: 'Ch 7 · Ch 17' },
  { a: 'prov', b: 'opex', tx: 'Provision recognised', entry: 'Dr Expense / Cr Provision', shared: 'A missing provision understates liabilities and overstates profit by the same amount.', src: 'Ch 17 · CP5' },
  { a: 'prov', b: 'rev', tx: 'Warranty vs sales', entry: 'Analytical link', shared: 'Warranty provision should move with revenue unless there is a valid reason.', src: 'Ch 17 Activity 2' },
  { a: 'eq', b: 'cash', tx: 'Share issue / dividend paid', entry: 'Dr Bank / Cr Share capital · Dr Retained earnings / Cr Bank', shared: 'Trace consideration received and dividends paid to the bank.', src: 'Ch 17 §3' },
  { a: 'inv', b: 'opex', tx: 'NRV write-down', entry: 'Dr Expense (inventory write-down) / Cr Inventory', shared: 'Damaged goods left at cost overstate inventory and profit (CP3 Solaris, Orion).', src: 'Ch 13 · CP3' },
];

export const scenarios: Scenario[] = [
  { id: 'unrec-inv', title: 'Supplier invoice left out of the ledger', story: 'Payments in the first week of October relate to invoices dated before the 30 September year end, but are not in the year-end purchase ledger.',
    effects: [{ node: 'ap', dir: 'under' }, { node: 'cos', dir: 'under' }], profit: 'over', assertion: 'Completeness · Cut-off',
    detect: 'For a sample of post year-end payments, determine whether they relate to the year; if so vouch that they are in the purchase ledger or accruals.', direction: 'Source → records (omissions)',
    report: 'Propose an adjustment: Dr Purchases / Cr Payables $71,000.', src: 'Ch 16 Activity 2 (Dress You Like Co)' },
  { id: 'early-sale', title: 'Sale recorded before the goods left', story: 'A customer replies to the confirmation: goods not received at the year end (GDN 127057).',
    effects: [{ node: 'rev', dir: 'over' }, { node: 'ar', dir: 'over' }, { node: 'inv', dir: 'under' }], profit: 'over', assertion: 'Cut-off · Occurrence · Existence',
    detect: 'Inspect the GDN and its date; if despatched after the year end, remove from revenue and receivables and record the goods in inventory.', direction: 'Records → evidence (errors)',
    report: 'Profit overstated by the margin; revenue and receivables by the invoice value.', src: 'Ch 14 Activity 5 · Ch 13 §2.5' },
  { id: 'credit-note', title: 'Credit note after the year end for a disputed invoice', story: 'Jasco Supermarket has not paid $220,000; a credit note is issued in October for a disputed invoice due > 90 days.',
    effects: [{ node: 'rev', dir: 'over' }, { node: 'ar', dir: 'over' }], profit: 'over', assertion: 'Existence · Occurrence · Valuation',
    detect: 'Review credit notes issued after the year end; where they relate to pre year-end invoices, discuss adjustment.', direction: 'Records → evidence (errors)',
    report: 'Reduce revenue and receivables by $220,000.', src: 'Ch 14 Activity 2–3' },
  { id: 'cap-repairs', title: 'Training cost capitalised with a machine', story: 'Cutting machinery additions include $2,500 of training cost.',
    effects: [{ node: 'ppe', dir: 'over' }, { node: 'opex', dir: 'under' }, { node: 'dep', dir: 'over' }], profit: 'over', assertion: 'Existence · Classification · Valuation',
    detect: 'Review the additions listing for items that should be expensed; agree cost to invoices.', direction: 'Records → evidence (errors)',
    report: 'Non-current assets overstated, expenses understated (IAS 16 excludes training).', src: 'Ch 12 Activity 3' },
  { id: 'damaged-inv', title: 'Damaged inventory still at cost', story: 'Damaged goods are moved to a separate area but no write-off is requested; records keep them at cost.',
    effects: [{ node: 'inv', dir: 'over' }, { node: 'cos', dir: 'under' }], profit: 'over', assertion: 'Valuation & allocation',
    detect: 'At the count, note damaged items; after the year end compare cost with selling prices and post-YE sales invoices.', direction: 'Records → evidence (errors)',
    report: 'Write down to NRV (IAS 2: lower of cost and NRV).', src: 'CP3 Solaris · Ch 13 Activity 3, 5' },
  { id: 'vega', title: 'Customer insolvent, no allowance', story: 'Vega Industrial owed $1.2m at YE, in difficulty since January, insolvent on 5 June. The FD refuses an allowance. PBT $15m.',
    effects: [{ node: 'ar', dir: 'over' }, { node: 'opex', dir: 'under' }], profit: 'over', assertion: 'Valuation & allocation',
    detect: 'Inspect the insolvency announcement and correspondence from January; review cash received after the year end; recalculate the allowance.', direction: 'Records → evidence (errors)',
    report: 'Adjusting event, 8% of PBT, not pervasive → qualified "except for".', src: 'CP5 Mercury Manufacturing Co' },
  { id: 'redundancy', title: 'Redundancy provision not recognised', story: 'Store closures announced publicly and to staff on 28 May (YE 31 May). Estimated cost $1.8m; the FD will expense it when paid. PBT $22.7m.',
    effects: [{ node: 'prov', dir: 'under' }, { node: 'pay', dir: 'under' }], profit: 'over', assertion: 'Completeness · Valuation',
    detect: 'Inspect board minutes, the press release and staff communication dated before the year end; recalculate entitlements.', direction: 'Source → records (omissions)',
    report: 'Constructive obligation (IAS 37); 7.9% of PBT, not pervasive → qualified "except for".', src: 'CP5 Cookit Co' },
  { id: 'research', title: 'Research capitalised', story: 'Czech Co capitalised research expenditure of $2.1m (8% of PBT); directors refuse to expense it.',
    effects: [{ node: 'int', dir: 'over' }, { node: 'opex', dir: 'under' }], profit: 'over', assertion: 'Existence · Classification',
    detect: 'Inspect project details and budgets against the PIRATE criteria; discuss with technical managers.', direction: 'Records → evidence (errors)',
    report: 'IAS 38: research is expensed. Material, not pervasive → qualified.', src: 'CP5 practice Q5 · Ch 12 §3' },
  { id: 'window', title: 'Cash book kept open after the year end', story: 'Remittances received in October are recorded as September receipts.',
    effects: [{ node: 'cash', dir: 'over' }, { node: 'ar', dir: 'under' }], profit: 'none', assertion: 'Cut-off · Existence',
    detect: 'For uncleared lodgements, inspect paying-in slips to confirm they were banked on or before the year end.', direction: 'Records → evidence (errors)',
    report: 'No profit effect; the bank balance is flattered and, combined with cheques recorded before they are sent, the current ratio (window dressing).', src: 'Ch 15 §2.2' },
];

export const lenses: Lens[] = [
  { id: 'cutoff', name: 'Cut-off boundary', nodes: ['rev', 'ar', 'inv', 'cos', 'ap', 'acc', 'cash'], note: 'GDNs and GRNs either side of the year end, plus lodgements and cheques on the reconciliation. One boundary, seven balances.', src: 'Ch 13 §2.5 · Ch 15 §2.2' },
  { id: 'estimates', name: 'Accounting estimates (ISA 540)', nodes: ['ar', 'inv', 'dep', 'prov', 'int'], note: 'Allowance for receivables, inventory obsolescence, useful lives, warranty and litigation provisions: judgement areas where bias moves profit.', src: 'Ch 12 §2.2' },
  { id: 'bias', name: 'Management bias & fraud (ISA 240)', nodes: ['rev', 'ar', 'prov', 'acc', 'int', 'opex'], note: 'Bonus or covenant pressure → overstate revenue/assets, understate expenses/liabilities. Bonus schemes always flag earnings management (CP2).', src: 'Ch 5 §6 · CP2' },
  { id: 'third', name: 'Third-party evidence', nodes: ['ar', 'ap', 'cash', 'loan', 'prov', 'inv'], note: 'Customer and supplier confirmations, bank letter, lender confirmation, legal letter, third-party inventory confirmation (ISA 505, 501).', src: 'Ch 13–17' },
  { id: 'subsequent', name: 'Subsequent events & going concern', nodes: ['ar', 'inv', 'prov', 'loan', 'cash', 'eq'], note: 'Post-YE receipts, sales, settlements, insolvencies and facility renewals confirm or change year-end amounts (ISA 560, 570).', src: 'Ch 19 · CP5' },
  { id: 'disclosure', name: 'Material by nature', nodes: ['dir', 'eq', 'prov', 'loan'], note: 'Directors\' emoluments, related parties, contingencies and loan classification are judged on nature as well as size.', src: 'Ch 17 · CP2' },
];

export const nodeById = (id: string) => nodes.find(n => n.id === id)!;
export const cycleById = (id: CycleId) => cycles.find(c => c.id === id)!;
export const linksOf = (cycle: CycleId) => {
  const mine = new Set(nodes.filter(n => n.cycle === cycle).map(n => n.id));
  return edges.filter(e => mine.has(e.a) !== mine.has(e.b) || (mine.has(e.a) && mine.has(e.b)));
};
