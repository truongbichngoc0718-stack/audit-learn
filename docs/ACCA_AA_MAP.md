# ACCA_AA_MAP: đối chiếu slide ACCA AA + 5 Skills Checkpoint với site
Trạng thái: **v2 · 08/11/2026 · chờ duyệt.** Mục 3 (bảng theo 20 chương) được thay bằng mục 0 dưới đây theo yêu cầu "không build theo từng bài". Giữ nguyên: nhánh C riêng + link chéo · toàn bộ tiếng Anh · nguyên văn câu hỏi checkpoint. Nguồn: `source/library/acca-aa/` (index.md)

## 0. Cấu trúc v2 · Elite method (đã build)
| Trang | id | Gộp từ | Link nhánh A |
|---|---|---|---|
| C0 Start here | c0-tong-quan | ch00 + exam structure CP1–5 | — |
| C1 Audit Master Map | c1-master-map | ch07 directional testing; ch09, ch12–17 (18 khoản mục, 27 bút toán, 9 tình huống ripple, 6 lens) | A3 tổng quan, từng bài A3 qua node |
| C2 Audit operating system | c2-operating-system | ch05 (risk, materiality), ch07 (evidence, assertions, AEIOU, direction, HMA), ch12/13/16 account schedule, CP2 §2, CP4 §1 | A1.3, A1.4, A2.1 |
| C3.1 Revenue & receivables | c3-1-revenue-receivables | ch09 §3.1, ch14, CP3 §1.2 | A3.1, A3.2 |
| C3.2 Purchases & payables | c3-2-purchases-payables | ch09 §3.2, ch16 §1, CP3 | A3.3, A3.4 |
| C3.3 Payroll | c3-3-payroll | ch09 §3.3, ch16 §2, ch17 §4 | A3.4 |
| C3.4 Inventory | c3-4-inventory | ch09 §3.4, ch13 | — (Biscore không có) |
| C3.5 Non-current assets | c3-5-non-current-assets | ch09 §3.6, ch12 | A3.6 |
| C3.6 Financing | c3-6-financing | ch17 §1–3 | A3.5 |
| C3.7 Bank & cash (+NFP) | c3-7-bank-cash | ch09 §3.5, ch15, ch18 | A3.3 |
| C4.1 Before the audit | c4-1-before-the-audit | ch01–04, ch10, CP1–2 | A1.2 |
| C4.2 Planning, risk & controls | c4-2-planning-risk-control | ch05, 06, 08, 09 §4–5, 11 | A2.1, A2.3 |
| C4.3 Completion & reporting | c4-3-completion-reporting | ch19, ch20, CP5 | A1.2, A4.1 |
| C5 Checkpoint 1–5 | c-cp1 … c-cp5 | CP1–CP5 nguyên văn | — |

Trang cũ theo chương (c07a, c07b) đã gộp vào C1/C2; bản gốc chuyển vào `Ebook/_to_delete/c-chapter-pages/`.

**Lỗi nguồn cần tác giả xem (giữ nguyên văn, có ghi chú trên trang):** Ch 12 Activity 4 in lỗ thanh lý $17,000 (đúng là $7,000) · Ch 16 Activity 1 viết "sổ cái cao hơn sao kê" trong khi tổng sổ cái $2,060k thấp hơn $2,308k · CP5 Mercury Issue 3 nói KAM "likely include" going concern song song MURGC, mâu thuẫn với CP5 §2.3/Q3 (MURGC có mục riêng) · CP2 bảng materiality (PBT 5%, revenue 1–2%) khác slide ch05 (revenue 0,5–1%, profit 5–10%).

## 1. Nguồn đã nạp
| Nguồn | Quy mô | Đặc điểm |
|---|---|---|
| Slide AA (GV Hà Long Giang) | 341 trang PDF ≈ 680 slide · 20 chương · syllabus A–E | Tiếng Anh, chuẩn ISA/IFRS, nhiều sơ đồ (mất bố cục khi trích chữ) |
| Checkpoint 1 · Ch 1–4 Framework & governance | 13 tr | Mindmap · kỹ thuật làm bài · 10 MCQ + tự luận · mock 15' |
| Checkpoint 2 · Ethics & risk | 16 tr | Như trên; kỹ thuật viết risk + response |
| Checkpoint 3 · Internal control | 15 tr | 5 thành phần IC · bảng hệ thống bán/mua/lương · đề Dec 2024 Q1 (Solaris Co) |
| Checkpoint 4 · Substantive procedures | 18 tr | Bảng assertion · công thức 3W viết thủ tục · đề Dec 2024 Q3(a), Rigel Co |
| Checkpoint 5 · Review & reporting | 26 tr | Subsequent events · going concern · ý kiến kiểm toán · đề 2013/2024 (Mercury Co) |

## 2. Xung đột với chuẩn hiện hành
1. **BISC_STYLE §1 (bộ lọc):** kiến thức mới phải nằm trong 6 chu trình Simulation và dùng được trên dữ liệu Biscore. Phần lớn ACCA AA **không qua** (đạo đức, quản trị công ty, kiểm soát nội bộ, hàng tồn kho, tiền, NFP, báo cáo kiểm toán). Theo quy tắc hiện tại, các phần đó phải ở lại thư viện.
2. **Ngôn ngữ và chuẩn mực:** ACCA dùng ISA/IFRS bằng tiếng Anh; nhánh A dùng VSA/VAS bằng tiếng Việt.
3. **Bản quyền:** câu hỏi checkpoint ghi nguồn *BPP Workbook* và đề thi ACCA (Dec 2024, Mar/Jun 2024, Dec 2013, sample 2018). Quyết định 05/11/2026: bạn xác nhận dùng nguyên văn; mỗi câu giữ dòng nguồn như checkpoint.

## 3. Đề xuất: nhánh C · ACCA AA + liên kết chéo sang nhánh A
Nhánh C độc lập (như nhánh B), theo 5 phần syllabus; mỗi phần kết thúc bằng 1 Checkpoint.

| Trang nhánh C | Slide | Checkpoint | Link chéo sang nhánh A |
|---|---|---|---|
| C0 · Tổng quan & cấu trúc đề thi | ch00 | phần "Exam structure" của cả 5 CP | A0 Lộ trình |
| **C-A · Framework & regulation** | | | |
| C1 Audit & assurance engagements (CREST, mức đảm bảo) | ch01 | CP1 | A1.2 Mục đích kiểm toán |
| C2 Statutory audit: bổ nhiệm, bãi nhiệm, quyền & nghĩa vụ | ch02 | CP1 | — |
| C3 Corporate governance & audit committee | ch03 | CP1 | — |
| C4 Ethics, threats & safeguards, chấp nhận hợp đồng, quality management | ch04 | CP1, CP2 | — |
| ✓ Checkpoint 1 | | CP1 | |
| **C-B · Planning & risk** | | | |
| C5 Audit risk, materiality, hiểu đơn vị, fraud | ch05 | CP2 | A2.1 OM/PM/CTT, A2.2 scoping |
| C6 Planning, strategy, documentation | ch06 | CP2 | A4.2 Mini WP |
| ✓ Checkpoint 2 | | CP2 | |
| **C-C · Internal control** | | | |
| C7 Internal control (5 thành phần, IT controls) | ch08 | CP3 | Bước 1 mọi phần hành A3 |
| C8 Tests of controls theo hệ thống bán · mua · lương; thư quản lý | ch09 | CP3 | A3.1, A3.3 |
| C9 Internal audit | ch10 | CP3 | — |
| ✓ Checkpoint 3 | | CP3 | |
| **C-D · Audit evidence** | | | |
| C10 Evidence, assertions, directional testing | ch07 | CP4 | A1.3 Vouching/tracing, A1.4 |
| C11 Sampling, automated tools, data analytics | ch11 | CP4 | A2.3 Chọn mẫu, nhánh B |
| C12 Non-current assets | ch12 | CP4 | A3.6 TSCĐ |
| C13 Inventory | ch13 | CP4 | — (Biscore không có) |
| C14 Receivables & revenue | ch14 | CP4 | A3.1, A3.2 |
| C15 Bank & cash | ch15 | CP4 | — |
| C16 Payables, accruals, payroll | ch16 | CP4 | A3.3, A3.4 |
| C17 Non-current liabilities, provisions, capital, directors' emoluments | ch17 | CP4 | A3.5 Vay |
| C18 Not-for-profit | ch18 | CP4 (Montana Co) | — |
| ✓ Checkpoint 4 | | CP4 | |
| **C-E · Review & reporting** | | | |
| C19 Subsequent events, going concern, written representations, đánh giá sai sót | ch19 | CP5 | A2.4 Suy rộng, A4.1 |
| C20 Auditor's report: ý kiến, EOM, KAM, other matter | ch20 | CP5 | A1.2 (VSA 700/705) |
| ✓ Checkpoint 5 | | CP5 | |

Khoảng 21 trang bài + 5 trang Checkpoint + 1 trang Exam technique tổng hợp.

### Khuôn bài nhánh C (đề xuất bổ sung BISC_STYLE §13, cần bạn duyệt)
Header (Chương · syllabus · phút · takeaway) → Mục tiêu → Khái niệm + sơ đồ tương tác (vẽ lại từ slide) → bảng/thẻ so sánh → **Exam angle** (đề hỏi thế nào · bẫy thường gặp, lấy từ CP) → ví dụ (tình huống đề thi viết lại; nếu có, đối chiếu Biscore) → ⚠️ + 🔑 → Kiểm tra nhanh → điều hướng. Giải thích tiếng Việt, thuật ngữ và câu hỏi giữ tiếng Anh như đề thi; chuẩn mực ghi ISA, kèm VSA tương ứng khi có.

### Trang Checkpoint
1. Knowledge revision: mindmap tương tác (bấm nhánh để mở).
2. Exam techniques: bảng "dạng câu · cách làm · bẫy".
3. Practice MCQ: chấm điểm + giải thích.
4. Constructed response: viết câu trả lời → mở model answer theo từng ý chấm → tự chấm điểm.
5. Mock test có đồng hồ (15'), chỉ hiện đáp án khi nộp.

## 4. Chức năng web cần build
| Thành phần | Dùng ở | Ghi chú |
|---|---|---|
| `MockTest` | Checkpoint | Đồng hồ đếm ngược, khóa đáp án đến khi nộp, lưu điểm vào Tiến độ |
| `ConstructedResponse` | Checkpoint, bài C | Ô viết, model answer theo ý (1 mark/ý), tự chấm, lưu localStorage |
| `Mindmap` | Checkpoint, C0 | Cây thu gọn/mở, dữ liệu JSON |
| `ProcedureBuilder` (3W) | C10–C17 | Ghép Verb + Noun + Why; kiểm tra thiếu thành phần |
| `ThreatMatrix` | C4 | Chọn tình huống → threat → safeguard |
| `OpinionDecider` | C20 | Material? Pervasive? → loại ý kiến + đoạn cơ sở |
| `SubsequentEventsTimeline` | C19 | Kéo sự kiện vào giai đoạn 1–5 → adjusting/non-adjusting, việc KTV làm |
| Tái dùng | Quiz, Flashcards (thuật ngữ ACCA EN–VI), ProgressPage | Thêm nhóm "C" vào trang Tiến độ |

## 5. Thứ tự thực hiện đề xuất
1. Duyệt mục 3 + khuôn bài nhánh C → cập nhật BISC_STYLE (v1.1) và LESSON_GUIDE.
2. Build 4 thành phần chính (MockTest, ConstructedResponse, Mindmap, OpinionDecider) + trang mẫu Checkpoint 4 và bài C10 làm **bài mẫu** → ⛔ chờ duyệt.
3. Viết phần còn lại theo từng phần syllabus; review độc lập mỗi phần.
