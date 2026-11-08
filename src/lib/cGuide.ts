/**
 * Chú thích hướng dẫn tiếng Việt cho nhánh C (ACCA AA, toàn bộ tiếng Anh).
 * Hiển thị bằng src/components/CGuide.astro:
 *  - intro: pop-up nhiều bước, tự mở MỖI LẦN vào trang (người học tắt được).
 *  - sections: note nhỏ tự hiện khi cuộn tới tiêu đề (h2/h3) có chữ đầu khớp `h`.
 *  - terms: "Từ vựng nhanh" Anh → Việt (theo docs/GLOSSARY.md).
 * Quy ước (STYLE_C §3): note chỉ điều hướng, hướng dẫn học, mẹo, lưu ý.
 * Không đưa kiến thức mới vào note; kiến thức nằm trong bài.
 * Cú pháp trong body: **đậm**, [chữ](/duong-dan/).
 */
export type NoteType = 'nav' | 'study' | 'tip' | 'warn';
export interface GuideStep { type: NoteType; title: string; body: string }
export interface SectionNote { h: string; type: NoteType; body: string }
export interface PageGuide { intro: GuideStep[]; terms?: [string, string][]; sections?: SectionNote[] }

const CP_HOW: GuideStep = {
  type: 'study',
  title: 'Cách làm một Checkpoint',
  body: 'Đi theo thứ tự: **Knowledge revision** (ôn lý thuyết) → **Exam techniques** (kỹ thuật làm bài) → **Practice** (MCQ + câu tự luận) → **Mock test** 15 phút. Câu hỏi giữ **nguyên văn đề ACCA**. Với câu tự luận: gõ bài của bạn vào ô trước, rồi mới mở model answer và tự chấm từng ý.',
};
const CP_MOCK: SectionNote = {
  h: 'Mock test',
  type: 'warn',
  body: 'Mock test có **đồng hồ**. Chỉ bấm bắt đầu khi bạn có đủ 15 phút liền mạch, làm như thi thật, không mở lại phần lý thuyết.',
};
const CP_MCQ: SectionNote = {
  h: 'Part A',
  type: 'study',
  body: 'Chọn đáp án trước, đọc giải thích sau mỗi câu. Câu sai thì ghi vào ô Notes cuối trang. Điểm được lưu ở trang **Tiến độ**.',
};

export const cGuide: Record<string, PageGuide> = {
  /* ───────── C0 ───────── */
  'c0-tong-quan': {
    intro: [
      { type: 'nav', title: 'Chào mừng đến nhánh C', body: 'Nhánh C ôn **ACCA Audit & Assurance (AA)** và viết hoàn toàn bằng tiếng Anh, giống đề thi thật. Đừng lo: trang nào cũng có note tiếng Việt như thế này để dẫn bạn đi từng bước.' },
      { type: 'study', title: 'Không học theo từng chương', body: '20 chương slide được gom thành 5 tầng: **C1 Bản đồ** → **C2 Sáu mô hình tư duy** → **C3 Bảy chu trình** → **C4 Khung engagement** → **C5 Năm Checkpoint**. Học đúng thứ tự này: nắm khung trước, chi tiết treo vào sau.' },
      { type: 'tip', title: 'Mẹo đọc tiếng Anh', body: 'Không cần dịch từng chữ. Đọc **tiêu đề và câu in đậm** trước. Gặp thuật ngữ lạ thì xem "Từ vựng nhanh" bên dưới hoặc [Thư viện › Thuật ngữ](/thu-vien/thuat-ngu/). Trang nào cũng có link sang bài tiếng Việt tương ứng ở nhánh A.' },
    ],
    terms: [['Assurance', 'đảm bảo'], ['Audit risk', 'rủi ro kiểm toán'], ['Assertion', 'cơ sở dẫn liệu'], ['Cycle', 'chu trình'], ['Skills Checkpoint', 'bài luyện kỹ năng làm đề']],
    sections: [
      { h: 'Learn the structure', type: 'study', body: 'Đây là triết lý của nhánh C. Đọc lướt để biết có 5 tầng, chưa cần nhớ chi tiết.' },
      { h: 'Nothing is lost', type: 'nav', body: 'Bảng này cho biết **chương slide nào nằm ở trang nào**. Khi giảng viên nói "Chương 14", tra ở đây để mở đúng trang.' },
      { h: '3 hours', type: 'tip', body: 'Cấu trúc đề thi AA. Ghi nhớ số điểm từng phần để chia thời gian ôn. Xong trang này, mở [C1 · Audit Master Map](/c/1/c1-master-map/).' },
    ],
  },

  /* ───────── C1 ───────── */
  'c1-master-map': {
    intro: [
      { type: 'nav', title: 'Bạn đang ở C1 · Bản đồ tổng', body: 'Trang quan trọng nhất của nhánh C: **một bản đồ nối mọi khoản mục** (receivables, revenue, payables, inventory…) bằng bút toán kép. Các trang sau đều quay lại bản đồ này.' },
      { type: 'study', title: 'Ý chính trong một câu', body: 'Một bên Nợ sai thì bên Có đối ứng cũng sai. Vì vậy test một khoản mục cũng cho bằng chứng về khoản mục đối ứng: **"test one side, conclude on both"**.' },
      { type: 'tip', title: 'Cách dùng bản đồ', body: 'Bấm một khoản mục để xem các liên kết. Bật **Ripple** để xem một sai sót lan sang đâu, bật **Lens** để lọc theo chủ đề (cut-off, ước tính, gian lận…). Mỗi khoản mục có số TK VAS và link sang bài nhánh A.' },
    ],
    terms: [['Debit / Credit', 'Nợ / Có'], ['Misstatement', 'sai sót'], ['Overstatement', 'phản ánh cao hơn thực tế'], ['Understatement', 'phản ánh thấp hơn thực tế'], ['Ripple', 'lan truyền (của sai sót)'], ['Lens', 'lăng kính lọc theo chủ đề']],
    sections: [
      { h: 'A misstated debit', type: 'study', body: 'Đoạn này giải thích vì sao các phần hành **không tách rời**. Ví dụ: doanh thu ghi khống thì phải thu cũng bị khống.' },
      { h: 'Explore, ripple, lens', type: 'tip', body: 'Dành 5 phút bấm thử. Gợi ý: chọn **Receivables**, xem nó nối với Revenue và Bank & cash ra sao, rồi bật Ripple.' },
      { h: 'Three loops', type: 'study', body: 'Lịch ôn **10 phút mỗi ngày**. Ôn đều mỗi ngày hiệu quả hơn học dồn trước kỳ thi.' },
      { h: 'Overstatement or understatement', type: 'tip', body: 'Bài tập nhớ lại: tự chọn trước, không đoán bừa. Câu hỏi gợi ý: khoản mục này dễ bị **ghi cao hơn** hay **ghi thiếu** so với thực tế? Điểm được lưu ở trang Tiến độ.' },
      { h: 'Open a cycle playbook', type: 'nav', body: 'Chọn một trong 7 chu trình để học sâu. Nên bắt đầu với **Revenue & receivables**: nó giống phần hành Doanh thu – Phải thu bạn đã học ở nhánh A. Nếu chưa học C2, hãy mở [C2](/c/2/c2-operating-system/) trước.' },
    ],
  },

  /* ───────── C2 ───────── */
  'c2-operating-system': {
    intro: [
      { type: 'nav', title: 'C2 · Hệ điều hành kiểm toán', body: '**6 mô hình tư duy** dùng chung cho mọi chu trình: Risk chain · Assertions · Evidence & AEIOU · Direction · Roll-forward · Proof in total. Mỗi mô hình là một tab.' },
      { type: 'study', title: 'Mỗi lần học một tab', body: 'Đừng đọc liền cả 6 tab. Học một tab → làm drill trong tab → sang tab tiếp. Sang C3, bạn sẽ gặp lại 6 mô hình này ở mọi chu trình.' },
      { type: 'tip', title: 'Câu cần nhớ của trang', body: '**Assertion trước, chiều kiểm tra sau, thủ tục cuối cùng.** Rủi ro cho biết assertion, assertion cho biết chiều (vouching hay tracing), chiều quyết định thủ tục.' },
    ],
    terms: [['Inherent risk', 'rủi ro tiềm tàng'], ['Control risk', 'rủi ro kiểm soát'], ['Detection risk', 'rủi ro phát hiện'], ['Test of control (ToC)', 'thử nghiệm kiểm soát'], ['Substantive procedure', 'thủ tục cơ bản'], ['Roll-forward', 'đối chiếu đầu kỳ → cuối kỳ'], ['Proof in total', 'ước tính tổng thể để so sánh']],
    sections: [
      { h: 'One loop, six models', type: 'nav', body: 'Đây là vòng lặp chung. Bấm lần lượt **6 tab** bên dưới để đi qua từng mô hình.' },
      { h: 'Audit risk =', type: 'study', body: 'Tab 1: rủi ro kiểm toán gồm 3 thành phần. Làm drill để phân biệt dữ kiện nào thuộc rủi ro tiềm tàng, dữ kiện nào thuộc rủi ro kiểm soát.' },
      { h: 'How to write one risk', type: 'tip', body: 'Mẹo thi: một rủi ro phải nêu **dữ kiện trong đề** và **ảnh hưởng tới khoản mục BCTC nào**. Xem mẫu CP2 rồi tự viết lại bằng lời của bạn.' },
      { h: 'Evidence must answer', type: 'study', body: 'Tab 2: mỗi bằng chứng phải trả lời **đúng assertion**. Đọc sơ đồ assertion, mỗi nhánh kèm cách test.' },
      { h: 'Generating procedures', type: 'tip', body: 'AEIOU là cách nhớ các loại thủ tục. Dùng nó như **checklist khi bí ý** trong câu tự luận.' },
      { h: 'The 3W formula', type: 'tip', body: 'Công thức viết một thủ tục được điểm tối đa. Thủ tục viết thiếu thành phần thường mất điểm. Luyện thêm với 3W builder ở [CP4](/c/5/cp4-substantive-procedures/).' },
      { h: 'Errors from the records', type: 'study', body: 'Tab 4 · Chiều kiểm tra: **ghi sai** thì đi từ sổ ra chứng từ (vouching); **bỏ sót** thì đi từ nguồn ngoài sổ dò vào sổ (tracing). Ôn tiếng Việt ở [Bài 1.3 nhánh A](/a/1/a1-3-vouching-tracing/).' },
      { h: 'Opening + additions', type: 'study', body: 'Tab 5: đầu kỳ + tăng − giảm = cuối kỳ. Dùng cho TSCĐ, vay, dự phòng… để biết cần test phần biến động nào.' },
      { h: 'Build an expectation', type: 'study', body: 'Tab 6: tự ước tính con số trước, rồi so với số trên sổ. Chỉ chênh lệch đáng kể mới cần điều tra.' },
    ],
  },

  /* ───────── C3 ───────── */
  'c3-1-revenue-receivables': {
    intro: [
      { type: 'nav', title: 'C3.1 · Doanh thu & Phải thu', body: 'Chu trình bán hàng: Đơn hàng → Phiếu giao hàng (**GDN**) → Hóa đơn → Thu tiền. Doanh thu và phải thu được test cùng nhau. Nhánh A tương ứng: [Doanh thu](/a/3/a3-1-doanh-thu/) và [Phải thu](/a/3/a3-2-phai-thu/).' },
      { type: 'study', title: 'Lộ trình trong trang (≈ 18 phút)', body: '1) Sơ đồ 4 giai đoạn → 2) Playbook theo assertion (4 tab) → 3) Activities Dress You Like Co → 4) Liên kết chu trình → 5) Exam angle. Cuối trang làm **Quick check** để tự kiểm tra.' },
      { type: 'tip', title: 'Nhớ một câu', body: 'Phải thu: chứng minh **Existence** (hiện hữu) và **Valuation** (đánh giá). Doanh thu: **Occurrence, Completeness, Cut-off**. Tiền thu sau ngày khóa sổ và credit note sau năm trả lời được cả hai.' },
    ],
    terms: [['GDN', 'phiếu giao hàng / xuất kho'], ['Credit note', 'chứng từ ghi giảm công nợ, doanh thu'], ['External confirmation', 'thư xác nhận'], ['After-date cash', 'tiền thu sau ngày khóa sổ'], ['Prepayments', 'chi phí trả trước'], ['Occurrence', 'phát sinh'], ['Existence', 'hiện hữu']],
    sections: [
      { h: 'Four stages, four documents', type: 'study', body: 'Bấm từng giai đoạn: mỗi bước có **rủi ro → mục tiêu kiểm soát → kiểm soát → thử nghiệm kiểm soát**. Đây là chất liệu cho dạng câu "deficiency → recommendation" ở CP3.' },
      { h: 'What to do, by assertion', type: 'tip', body: '4 tab: Receivables · External confirmation · Revenue · Prepayments. Đọc theo **cột assertion**: thủ tục này trả lời assertion nào? Viết được điều đó là ghi điểm.' },
      { h: 'Read the evidence like a senior', type: 'study', body: '**Tự trả lời trước**, rồi mới bấm "Show the slide answer". Đáp án giữ nguyên văn tiếng Anh để bạn học cách diễn đạt của đề.' },
      { h: 'Where this cycle touches', type: 'nav', body: 'Các liên kết lấy từ bản đồ C1. Bấm để nhảy sang chu trình có liên quan (ví dụ Bank & cash).' },
      { h: 'How it is tested', type: 'warn', body: 'Đọc kỹ cột **trap**: đó là những lỗi thí sinh hay mắc.' },
    ],
  },
  'c3-2-purchases-payables': {
    intro: [
      { type: 'nav', title: 'C3.2 · Mua hàng & Phải trả', body: 'Đề nghị mua → Đơn đặt hàng (**PO**) → Phiếu nhận hàng (**GRN**) → Hóa đơn → Thanh toán. Nhánh A tương ứng: [Phải trả NCC](/a/3/a3-3-phai-tra/) và [Chi phí](/a/3/a3-4-chi-phi/).' },
      { type: 'study', title: 'Khác gì phải thu?', body: 'Nợ phải trả có rủi ro **bị ghi thiếu** (Completeness). Vì vậy không đi từ sổ ra hóa đơn mà đi từ nguồn ngoài vào sổ: supplier statement, khoản trả sau năm, GRN chưa có hóa đơn.' },
      { type: 'tip', title: 'Mẹo thi', body: 'Dạng câu CP3 Granstan Co: **Deficiency → Recommendation → Test of control**. Trình bày thành bảng 3 cột, mỗi dòng một ý, rất dễ chấm.' },
    ],
    terms: [['PO', 'đơn đặt hàng'], ['GRN', 'phiếu nhận hàng / nhập kho'], ['Supplier statement', 'bảng đối chiếu công nợ của NCC'], ['Accrual', 'chi phí phải trả (trích trước)'], ['Unrecorded liabilities', 'nợ chưa ghi sổ'], ['Preventive / Detective', 'kiểm soát ngăn ngừa / phát hiện']],
    sections: [
      { h: 'Four stages, five documents', type: 'study', body: 'Bấm từng giai đoạn. Chú ý chứng từ nào chứng minh hàng **đã thực sự nhận**.' },
      { h: 'Preventive or detective', type: 'tip', body: 'Ngăn ngừa = chặn sai sót **trước** khi xảy ra. Phát hiện = tìm ra sai sót **sau** khi đã xảy ra. Hãy tự phân loại trước khi xem đáp án.' },
      { h: 'Hunting for what is not there', type: 'study', body: 'Tiêu đề nói lên tất cả: đi tìm cái **không có trên sổ**. Đọc kỹ nhất tab "Supplier statements".' },
      { h: 'Supplier statements and payments', type: 'warn', body: 'Tự đối chiếu sổ với supplier statement trước khi xem đáp án. Slide gốc có một lỗi số dư; trang đã ghi chú số đúng ngay bên dưới.' },
      { h: 'Deficiency → recommendation', type: 'tip', body: 'Mẫu trả lời Section B. Học **cấu trúc**, không cần thuộc câu chữ.' },
    ],
  },
  'c3-3-payroll': {
    intro: [
      { type: 'nav', title: 'C3.3 · Tiền lương', body: 'Ghi nhận công → tính lương → chi trả, kèm thù lao ban giám đốc (**directors\' emoluments**).' },
      { type: 'study', title: 'Làm theo thứ tự', body: 'Bước 1: **ước tính trước** (số người × mức lương × thời gian) rồi so với sổ. Bước 2: chứng minh **nhân viên có thật** bằng hồ sơ nhân sự.' },
      { type: 'warn', title: 'Đừng bỏ qua', body: 'Thù lao ban giám đốc là khoản **trọng yếu theo bản chất**: vẫn phải test dù số tiền nhỏ hơn mức trọng yếu thực hiện (PM).' },
    ],
    terms: [['Payroll', 'bảng lương'], ['Ghost employee', 'nhân viên ma'], ["Directors' emoluments", 'thù lao ban giám đốc'], ['Material by nature', 'trọng yếu theo bản chất'], ['Deductions', 'các khoản khấu trừ lương']],
    sections: [
      { h: 'Two functions, three stages', type: 'study', body: 'Chú ý sự tách biệt giữa bộ phận nhân sự và bộ phận tính lương. Thiếu tách biệt là kẽ hở cho nhân viên ma.' },
      { h: 'Expectation first', type: 'tip', body: 'Học cách xây con số kỳ vọng cho chi phí lương. Thủ tục này rất hay dùng trong câu tự luận.' },
      { h: 'Material by nature', type: 'study', body: 'Khái niệm "trọng yếu theo bản chất" áp dụng cả ở chu trình khác (ví dụ giao dịch bên liên quan).' },
    ],
  },
  'c3-4-inventory': {
    intro: [
      { type: 'nav', title: 'C3.4 · Hàng tồn kho', body: 'Một khoản mục chạm 3 chu trình: mua hàng (nhập), sản xuất và bán hàng (xuất). Ba trọng tâm: **kiểm kê, cut-off, đánh giá** theo giá thấp hơn giữa giá gốc và giá trị thuần có thể thực hiện (NRV).' },
      { type: 'study', title: 'Lộ trình', body: '1) Vì sao quan trọng → 2) Kiểm kê: trước, trong, sau (ISA 501) → 3) Cut-off → 4) Valuation (IAS 2) → 5) Activities.' },
      { type: 'tip', title: 'Mẹo kiểm kê', body: 'Đếm theo **2 chiều**: từ sổ ra kho (Existence) và từ kho vào sổ (Completeness). Đề thường kiểm tra đúng điểm này.' },
    ],
    terms: [['Inventory count', 'kiểm kê hàng tồn kho'], ['Test count', 'đếm thử'], ['NRV', 'giá trị thuần có thể thực hiện'], ['Cut-off', 'đúng kỳ'], ['Slow-moving', 'chậm luân chuyển'], ['Third-party warehouse', 'kho của bên thứ ba']],
    sections: [
      { h: 'One balance, three cycles', type: 'study', body: 'Bấm từng mục tiêu kiểm soát để xem kiểm soát tương ứng.' },
      { h: 'Before, during and after', type: 'tip', body: 'Chia thủ tục theo **3 thời điểm**. Khi viết bài, nêu rõ thủ tục làm lúc nào sẽ dễ ghi điểm.' },
    ],
  },
  'c3-5-non-current-assets': {
    intro: [
      { type: 'nav', title: 'C3.5 · Tài sản dài hạn', body: 'TSCĐ hữu hình, vô hình và R&D. Công cụ chính: **roll-forward** (đầu kỳ + tăng − giảm = cuối kỳ). Nhánh A tương ứng: [TSCĐ](/a/3/a3-6-tscd/).' },
      { type: 'study', title: 'Lộ trình', body: 'Kiểm soát (phân loại, sổ TSCĐ, bảo vệ tài sản) → Playbook 4 tab theo assertion → Activities Dress You Like Co → Exam angle.' },
      { type: 'tip', title: 'Nhìn cả hai phía', body: 'Tài sản tăng: vouch tới hóa đơn. Nhưng cũng phải **rà chi phí sửa chữa** để tìm khoản lẽ ra phải vốn hóa mà bị ghi vào chi phí.' },
    ],
    terms: [['PPE', 'TSCĐ hữu hình'], ['Asset register', 'sổ theo dõi TSCĐ'], ['Additions / Disposals', 'tăng / thanh lý'], ['Depreciation', 'khấu hao'], ['Capital vs revenue expenditure', 'chi phí vốn hóa vs chi phí trong kỳ'], ['R&D', 'nghiên cứu & triển khai']],
    sections: [
      { h: 'Controls first', type: 'study', body: 'Bấm sơ đồ, rồi làm ngay **Ch 12 Activity 1** bên dưới để ôn assertion.' },
      { h: 'Audit plan by assertion', type: 'tip', body: 'Mẹo nhớ: Existence đi **từ sổ ra tài sản thực tế**; Completeness đi **từ tài sản thực tế vào sổ**.' },
    ],
  },
  'c3-6-financing': {
    intro: [
      { type: 'nav', title: 'C3.6 · Tài trợ vốn', body: 'Vay & chi phí lãi vay · Dự phòng & nợ tiềm tàng · Vốn & cổ tức. Câu hỏi chung: **mọi khoản nợ đã được ghi đủ chưa?** Nhánh A tương ứng: [Vay & lãi vay](/a/3/a3-5-vay/).' },
      { type: 'study', title: 'Trang này dùng thẻ thay sơ đồ', body: 'Chu trình này không có luồng chứng từ theo giai đoạn, nên trang bắt đầu bằng 3 thẻ khoản mục, sau đó là playbook 3 tab.' },
      { type: 'tip', title: 'Tìm trong chữ trước, số sau', body: 'Nợ lớn (vay mới, kiện tụng, cam kết) thường lộ ra trong **biên bản họp, hợp đồng, thư luật sư**. Đọc tài liệu trước khi nhìn con số.' },
    ],
    terms: [['Finance costs', 'chi phí tài chính (lãi vay)'], ['Provision', 'dự phòng phải trả'], ['Contingent liability', 'nợ tiềm tàng'], ['Board minutes', 'biên bản họp HĐQT'], ['Legal letter', 'thư xác nhận của luật sư'], ['Dividend', 'cổ tức']],
    sections: [
      { h: 'Three balances', type: 'study', body: 'Đọc 3 thẻ để nắm phạm vi chu trình, rồi bấm qua 3 tab playbook.' },
    ],
  },
  'c3-7-bank-cash': {
    intro: [
      { type: 'nav', title: 'C3.7 · Ngân hàng & tiền, nơi mọi chu trình gặp nhau', body: 'Mọi chu trình đều kết thúc ở tiền. Trang gồm 5 mục tiêu kiểm soát, playbook **thư xác nhận ngân hàng + bảng đối chiếu**, và biến thể cho tổ chức phi lợi nhuận (NFP).' },
      { type: 'study', title: 'Lộ trình', body: 'Sơ đồ 5 mục tiêu → Playbook → Activity đối chiếu ngân hàng → Drill assertion → Exam angle → NFP.' },
      { type: 'tip', title: 'Nhớ một câu', body: 'Thư xác nhận ngân hàng và bảng đối chiếu **luôn đi cùng nhau**, không bao giờ chỉ dùng một trong hai.' },
    ],
    terms: [['Bank confirmation / bank letter', 'thư xác nhận ngân hàng'], ['Bank reconciliation', 'bảng đối chiếu tiền gửi'], ['Unpresented cheques', 'séc đã phát hành, ngân hàng chưa thanh toán'], ['Outstanding lodgements', 'khoản đã nộp, ngân hàng chưa ghi có'], ['Window dressing', 'làm đẹp số dư cuối kỳ'], ['NFP', 'tổ chức phi lợi nhuận']],
    sections: [
      { h: 'Five control objectives', type: 'study', body: 'Bấm từng mục tiêu để xem kiểm soát và thử nghiệm kiểm soát.' },
      { h: 'Bank letter + reconciliation', type: 'study', body: 'Thư xác nhận cho biết **số dư phía ngân hàng**; bảng đối chiếu **giải thích chênh lệch** với sổ. Hai thứ bổ sung cho nhau.' },
      { h: 'Which assertion', type: 'tip', body: 'Chọn assertion cho từng thủ tục. Sai nhiều thì ôn lại tab **Assertions** ở [C2](/c/2/c2-operating-system/).' },
      { h: 'Same hub, different risks', type: 'nav', body: 'Phần NFP (Ch 18): cùng logic kiểm toán tiền nhưng rủi ro khác doanh nghiệp. Đọc bảng so sánh.' },
    ],
  },

  /* ───────── C4 ───────── */
  'c4-1-before-the-audit': {
    intro: [
      { type: 'nav', title: 'C4.1 · Trước khi kiểm toán', body: '3 "cổng" phải qua trước khi test: (1) đây có phải **hợp đồng dịch vụ đảm bảo** không? (2) việc **bổ nhiệm** kiểm toán viên có hợp lệ và được bảo vệ không? (3) về **đạo đức**, có được nhận khách hàng không?' },
      { type: 'study', title: 'Trang này gom Ch 1–4', body: 'Học xong, làm [Checkpoint 1](/c/5/cp1-framework-governance/) (khung pháp lý, quản trị) và [Checkpoint 2](/c/5/cp2-ethics-risk/) (đạo đức, rủi ro).' },
      { type: 'tip', title: 'Mẹo nhớ', body: 'Học đạo đức theo cặp **nguy cơ (threat) → biện pháp bảo vệ (safeguard)**. Câu tự luận thường hỏi đúng theo cặp này.' },
    ],
    terms: [['Assurance engagement', 'hợp đồng dịch vụ đảm bảo'], ['Reasonable / Limited assurance', 'đảm bảo hợp lý / có giới hạn'], ['Corporate governance', 'quản trị công ty'], ['Audit committee', 'ủy ban kiểm toán'], ['Threat / Safeguard', 'nguy cơ / biện pháp bảo vệ'], ['Engagement letter', 'thư cam kết kiểm toán']],
    sections: [
      { h: 'CREST', type: 'study', body: 'CREST là cách nhớ các yếu tố của một hợp đồng đảm bảo. Phân biệt rõ **đảm bảo hợp lý** (kiểm toán) với **có giới hạn** (soát xét).' },
      { h: 'Statutory rules', type: 'tip', body: 'Bổ nhiệm, bãi nhiệm, quyền của kiểm toán viên: phần lý thuyết thuần, thường ra **MCQ**. Học theo bảng là đủ.' },
      { h: 'Ethics: five principles', type: 'study', body: 'Drill nhận diện nguy cơ: đọc tình huống, tự gọi tên loại threat trước khi xem đáp án.' },
      { h: 'Acceptance checklist', type: 'nav', body: 'Checklist trước khi nhận khách hàng. Dùng làm khung trả lời câu **Beech & Co** ở CP1.' },
    ],
  },
  'c4-2-planning-risk-control': {
    intro: [
      { type: 'nav', title: 'C4.2 · Kế hoạch, rủi ro & kiểm soát', body: 'Gom các chương về lập kế hoạch, trọng yếu, rủi ro, kiểm soát nội bộ, chọn mẫu. **Trọng yếu quyết định test bao nhiêu, rủi ro quyết định test ở đâu.**' },
      { type: 'study', title: 'Lộ trình', body: 'Lộ trình kiểm toán (ISA 200) → Từ dữ kiện đề tới rủi ro → 5 thành phần kiểm soát nội bộ → Chọn mẫu & công cụ tự động. Ôn trọng yếu bằng tiếng Việt ở [Phần 2 nhánh A](/a/2/a2-1-om-pm-ctt/).' },
      { type: 'tip', title: 'Mẹo Section B', body: 'Viết rủi ro kiểm toán: luôn gắn dữ kiện đề với **khoản mục BCTC** và **assertion** cụ thể. Viết chung chung "rủi ro cao" sẽ không được điểm.' },
    ],
    terms: [['Audit strategy / Audit plan', 'chiến lược / kế hoạch kiểm toán'], ['Materiality', 'trọng yếu'], ['Internal control', 'kiểm soát nội bộ'], ['Control environment', 'môi trường kiểm soát'], ['Sampling', 'chọn mẫu'], ['Segregation of duties', 'phân tách nhiệm vụ']],
    sections: [
      { h: 'Where planning leads', type: 'study', body: 'Xem sơ đồ các bước, rồi làm drill phân biệt **chiến lược tổng thể** và **kế hoạch chi tiết**.' },
      { h: 'From scenario facts', type: 'tip', body: 'Phần quan trọng nhất cho Section B: biến **một dữ kiện trong đề** thành **một rủi ro kiểm toán** có khoản mục và assertion.' },
      { h: 'Five components', type: 'study', body: '5 thành phần kiểm soát nội bộ và giới hạn vốn có của kiểm soát. Luyện đề ở [CP3](/c/5/cp3-internal-control/).' },
      { h: 'How many, which ones', type: 'nav', body: 'Chọn mẫu theo ISA 530. Thực hành cỡ mẫu bằng máy tính ở [Bài 2.3 nhánh A](/a/2/a2-3-chon-mau/).' },
    ],
  },
  'c4-3-completion-reporting': {
    intro: [
      { type: 'nav', title: 'C4.3 · Hoàn thành & báo cáo', body: 'Giai đoạn cuối: sự kiện sau ngày kết thúc kỳ, hoạt động liên tục, rồi chọn **loại ý kiến kiểm toán** bằng cây quyết định tương tác.' },
      { type: 'study', title: 'Lộ trình', body: 'Lộ trình hoàn thành 5 giai đoạn → Sự kiện sau (ISA 560 + IAS 10) → Hoạt động liên tục (ISA 570) → Cây quyết định. Học xong làm [Checkpoint 5](/c/5/cp5-review-reporting/).' },
      { type: 'tip', title: 'Công thức 3 bước', body: '**Định lượng** (so với lợi nhuận, tổng tài sản) → **Phân loại** (trọng yếu? lan tỏa?) → **Đặt vào loại ý kiến**. Đừng nhảy thẳng tới "adverse".' },
    ],
    terms: [['Subsequent events', 'sự kiện sau ngày kết thúc kỳ'], ['Adjusting / Non-adjusting', 'cần điều chỉnh / không cần điều chỉnh'], ['Going concern', 'hoạt động liên tục'], ['Material uncertainty', 'yếu tố không chắc chắn trọng yếu'], ['Pervasive', 'lan tỏa'], ['Qualified · Adverse · Disclaimer', 'ngoại trừ · trái ngược · từ chối đưa ra ý kiến']],
    sections: [
      { h: 'Five stages', type: 'study', body: 'Năm giai đoạn hoàn thành, giai đoạn nào cũng dẫn về ý kiến kiểm toán.' },
      { h: 'Did the condition exist', type: 'tip', body: 'Câu hỏi then chốt: **tình trạng đó đã tồn tại tại ngày kết thúc kỳ chưa?** Tự trả lời câu này cho từng tình huống trong drill.' },
      { h: 'Two judgements', type: 'study', body: 'Hai câu hỏi tách bạch: giả định hoạt động liên tục **có phù hợp không**, và **có yếu tố không chắc chắn trọng yếu không**.' },
      { h: 'Three questions, five outcomes', type: 'tip', body: 'Trả lời 3 câu hỏi để ra 1 trong 5 kết quả. Thử nhiều tình huống khác nhau đến khi bạn đoán đúng kết quả trước khi bấm.' },
    ],
  },

  /* ───────── C5 ───────── */
  'c-cp1': {
    intro: [
      { type: 'nav', title: 'Checkpoint 1 · Khung pháp lý & quản trị', body: 'Luyện đề Ch 1–4: hệ sinh thái kiểm toán, quản trị công ty và ủy ban kiểm toán, bổ nhiệm và bãi nhiệm. **Ôn trước:** [C4.1 Before the audit](/c/4/c4-1-before-the-audit/).' },
      CP_HOW,
      { type: 'tip', title: 'Từ khóa câu hỏi', body: 'Đọc **động từ yêu cầu** trước khi đọc tình huống: "explain" cần giải thích vì sao, "describe" chỉ cần mô tả. Hiểu sai động từ là mất điểm dù biết kiến thức.' },
    ],
    terms: [['Statutory audit', 'kiểm toán theo luật định'], ['Appointment / Removal', 'bổ nhiệm / bãi nhiệm'], ['Non-executive director', 'thành viên HĐQT không điều hành'], ['Audit committee', 'ủy ban kiểm toán'], ['Liability', 'trách nhiệm pháp lý'], ['Pre-acceptance', 'trước khi chấp nhận khách hàng']],
    sections: [
      { h: 'The Audit Ecosystem', type: 'study', body: 'Ôn nhanh lý thuyết. Phần nào chưa chắc thì mở lại C4.1 rồi quay về.' },
      { h: 'Section A MCQ approach', type: 'tip', body: 'Đọc kỹ kỹ thuật làm MCQ, rồi áp dụng ngay ở phần Practice bên dưới.' },
      CP_MCQ,
      { h: 'Part B', type: 'study', body: 'Câu tự luận **Beech & Co**: gõ câu trả lời, mở model answer, tự chấm từng ý. Bài nháp được lưu lại.' },
      CP_MOCK,
    ],
  },
  'c-cp2': {
    intro: [
      { type: 'nav', title: 'Checkpoint 2 · Đạo đức & đánh giá rủi ro', body: 'Luyện đề về hai trụ cột đạo đức, các vấn đề độc lập cụ thể và đánh giá rủi ro. **Ôn trước:** [C4.1](/c/4/c4-1-before-the-audit/), [C4.2](/c/4/c4-2-planning-risk-control/) và tab Risk chain ở [C2](/c/2/c2-operating-system/).' },
      CP_HOW,
      { type: 'tip', title: 'Viết rủi ro được điểm', body: 'Mỗi rủi ro: **dữ kiện đề → khoản mục BCTC → assertion**. Câu Blackberry Co yêu cầu 6 rủi ro: viết mỗi rủi ro một đoạn ngắn, đừng gộp.' },
    ],
    terms: [['Independence', 'tính độc lập'], ['Threat / Safeguard', 'nguy cơ / biện pháp bảo vệ'], ['Self-interest threat', 'nguy cơ tư lợi'], ['Self-review threat', 'nguy cơ tự kiểm tra'], ['Inherent risk', 'rủi ro tiềm tàng'], ['Control risk', 'rủi ro kiểm soát']],
    sections: [
      { h: 'Ethics – The Two Pillars', type: 'study', body: 'Ôn khung đạo đức. Học theo cặp nguy cơ → biện pháp bảo vệ.' },
      { h: 'Risk assessment – Section B', type: 'tip', body: 'Phần quan trọng nhất trang: cách viết một rủi ro đủ điểm. Áp dụng ngay cho Blackberry Co.' },
      CP_MCQ,
      { h: 'Part B', type: 'study', body: 'Blackberry Co: viết từng rủi ro một, rồi so với model answer.' },
      CP_MOCK,
    ],
  },
  'c-cp3': {
    intro: [
      { type: 'nav', title: 'Checkpoint 3 · Kiểm soát nội bộ', body: 'Luyện đề về 5 thành phần kiểm soát, hệ thống bán hàng và mua hàng. **Ôn trước:** [C4.2](/c/4/c4-2-planning-risk-control/), [C3.1](/c/3/c3-1-revenue-receivables/), [C3.2](/c/3/c3-2-purchases-payables/).' },
      CP_HOW,
      { type: 'tip', title: 'Khung trả lời', body: '**Deficiency → Recommendation → Test of control**, trình bày bảng 3 cột. Nắm khung này là đủ cho cả Granstan Co và Solaris Co.' },
    ],
    terms: [['Deficiency', 'khiếm khuyết kiểm soát'], ['Recommendation', 'kiến nghị'], ['Test of control', 'thử nghiệm kiểm soát'], ['Segregation of duties', 'phân tách nhiệm vụ'], ['Authorisation', 'phê duyệt'], ['Credit limit', 'hạn mức tín dụng']],
    sections: [
      { h: '1.1 Five components', type: 'study', body: 'Ôn 5 thành phần. Mỗi điểm yếu trong đề thường thuộc một trong các thành phần này.' },
      { h: '1.2 Sales system', type: 'nav', body: 'Đối chiếu bảng này với sơ đồ chu trình bán hàng ở [C3.1](/c/3/c3-1-revenue-receivables/).' },
      { h: '1.3 Purchases system', type: 'nav', body: 'Đối chiếu với sơ đồ chu trình mua hàng ở [C3.2](/c/3/c3-2-purchases-payables/).' },
      { h: '2.1 Answer structure', type: 'tip', body: 'Thuộc cấu trúc 3 cột này: mỗi dòng gồm một điểm yếu, một kiến nghị, một thử nghiệm kiểm soát.' },
      { h: '2.2 Checklist', type: 'tip', body: 'Dùng checklist như **bộ lọc khi đọc tình huống**: gạch chân mọi chỗ có dấu hiệu điểm yếu.' },
      CP_MCQ,
      { h: 'Part B', type: 'study', body: 'Granstan Co: làm từng phần (b), (c) và tự chấm sau mỗi phần.' },
      CP_MOCK,
    ],
  },
  'c-cp4': {
    intro: [
      { type: 'nav', title: 'Checkpoint 4 · Thủ tục cơ bản', body: 'Luyện viết thủ tục kiểm toán theo assertion và công thức 3W. **Ôn trước:** [C2](/c/2/c2-operating-system/) và các chu trình [C3](/c/3/c3-1-revenue-receivables/).' },
      CP_HOW,
      { type: 'tip', title: 'Dùng 3W builder', body: 'Trước khi làm đề, dùng **3W builder** vài lượt để quen cách viết thủ tục đủ thành phần. Sau đó viết tay ở Montana, Gooseberry, Rigel.' },
    ],
    terms: [['Substantive procedure', 'thủ tục cơ bản'], ['Assertion', 'cơ sở dẫn liệu'], ['Recalculate', 'tính toán lại'], ['Agree / Inspect', 'đối chiếu / kiểm tra tài liệu'], ['Long-term contract', 'hợp đồng dài hạn'], ['Development costs', 'chi phí triển khai']],
    sections: [
      { h: 'Financial statement assertions', type: 'study', body: 'Ôn assertion và cách test. Assertion nào cũng có ít nhất một thủ tục điển hình.' },
      { h: 'The 3W formula', type: 'study', body: 'Đọc công thức, rồi thử ngay ở 3W builder bên dưới.' },
      { h: 'Build a procedure', type: 'tip', body: 'Ghép thủ tục rồi để hệ thống chấm. Làm đến khi bạn viết đủ thành phần **mà không cần nhìn gợi ý**.' },
      { h: 'Standard procedures by account area', type: 'nav', body: '6 tab thủ tục chuẩn theo khoản mục, là bản tóm tắt của các trang C3.' },
      { h: 'Common exam mistakes', type: 'warn', body: 'Đọc kỹ danh sách lỗi hay gặp để tránh mất điểm oan.' },
      CP_MCQ,
      { h: 'Part B', type: 'study', body: 'Montana Co: viết thủ tục cho từng khoản thu nhập, rồi so với model answer.' },
      { h: 'Part C', type: 'study', body: 'Gooseberry Co gồm 3 phần (b), (c), (d). Làm và tự chấm từng phần; nhận xét của examiner nằm sau cả 3 phần.' },
      CP_MOCK,
    ],
  },
  'c-cp5': {
    intro: [
      { type: 'nav', title: 'Checkpoint 5 · Soát xét & báo cáo', body: 'Luyện đề về hoàn thành kiểm toán và ý kiến kiểm toán: sự kiện sau, hoạt động liên tục, giải trình bằng văn bản, thông tin khác. **Ôn trước:** [C4.3](/c/4/c4-3-completion-reporting/).' },
      CP_HOW,
      { type: 'tip', title: 'Công thức 3 bước', body: 'Câu "effect on the auditor\'s report": **định lượng → kết luận trọng yếu/lan tỏa → loại ý kiến và vị trí trong báo cáo**. Áp dụng cho Cookit, Panda, Mercury.' },
    ],
    terms: [['Written representations', 'giải trình bằng văn bản'], ['Other information', 'thông tin khác'], ['Emphasis of matter', 'vấn đề cần nhấn mạnh'], ['Going concern', 'hoạt động liên tục'], ['Pervasive', 'lan tỏa'], ['Redundancy provision', 'dự phòng trợ cấp thôi việc']],
    sections: [
      { h: '1.2 The audit completion roadmap', type: 'study', body: 'Lộ trình hoàn thành, giống trang C4.3. Đọc lướt nếu bạn đã học C4.3.' },
      { h: '2.1 Three questions', type: 'tip', body: 'Cây quyết định ý kiến. Thử vài tình huống đến khi ra kết quả đúng trước khi bấm.' },
      { h: '2.2 Pervasiveness test', type: 'study', body: 'Bài kiểm tra tính lan tỏa: quyết định giữa ý kiến ngoại trừ và trái ngược / từ chối.' },
      { h: '2.4 The 3-step answer formula', type: 'tip', body: 'Công thức 3 bước để trả lời câu ảnh hưởng tới báo cáo kiểm toán. Dùng cho mọi câu tự luận bên dưới.' },
      { h: '3.1 Subsequent events', type: 'study', body: 'Phân loại sự kiện: cần điều chỉnh hay chỉ thuyết minh. Nhớ câu hỏi "đã tồn tại tại ngày kết thúc kỳ chưa?".' },
      CP_MCQ,
      { h: 'Part B', type: 'study', body: 'Cookit Co: làm (c) rồi (d); phần (d) dùng công thức 3 bước.' },
      { h: 'Part C', type: 'study', body: 'Panda Co: hai sự kiện, mỗi sự kiện tự chấm riêng, rồi mới làm phần ảnh hưởng tới báo cáo.' },
      CP_MOCK,
    ],
  },
};
