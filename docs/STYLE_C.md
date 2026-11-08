---
style_version: "C-1.1-draft"
trạng_thái: NHÁP · chờ duyệt (thay khuôn "một trang = một chương" của C-1.0-draft bằng cấu trúc Elite method, theo yêu cầu 08/11/2026)
căn_cứ: slide ACCA AA (source/library/acca-aa/slide) + 5 Skills Checkpoint; quyết định 05/11/2026: nhánh C riêng, toàn bộ tiếng Anh, giữ nguyên văn câu hỏi checkpoint; yêu cầu 08/11/2026: không build theo từng bài, liên kết mọi phần hành thành một bản đồ
---
# STYLE_C: chuẩn nhánh C · ACCA AA

Bổ sung cho BISC_STYLE v1.0 (không thay thế). BISC_STYLE §1 (bộ lọc 6 chu trình Biscore) **không áp dụng** cho nhánh C: phạm vi = syllabus ACCA AA, nguồn = slide + checkpoint BISC. Các mục khác của BISC_STYLE áp dụng khi không mâu thuẫn.

## 1. Kiến trúc: Elite method (không chia theo chương)
| Tầng | Thư mục | Nội dung | Chương slide |
|---|---|---|---|
| C0 Start here | `c/index.mdx` | Phương pháp, vòng học hằng ngày, bảng "chương nào nằm ở đâu", cấu trúc đề | ch00 |
| C1 Master Map | `c/1/` | Bản đồ tương tác mọi khoản mục + bút toán kép + ripple + lens (`AuditMasterMap`, dữ liệu `src/lib/auditMap.ts`) | ch07 (directional testing) + ch09, ch12–17 |
| C2 Operating system | `c/2/` | 6 mô hình: risk chain · assertions · evidence/AEIOU/3W · direction · roll-forward · proof in total | ch05, ch07, ch12–16 |
| C3 Cycle playbooks | `c/3/` | 7 chu trình: Revenue & receivables · Purchases & payables · Payroll · Inventory · NCA · Financing · Bank & cash (+NFP) | ch09 + ch12–18 |
| C4 Engagement frame | `c/4/` | Before the audit · Planning, risk & controls · Completion & reporting | ch01–06, 08, 10, 11, 19, 20 |
| C5 Checkpoints | `c/5/` | CP1–CP5 nguyên văn | CP1–CP5 |

Mọi chương slide phải có chỗ trong bảng §1 của `c/index.mdx`; không bỏ chương nào.

## 2. Nguồn
- Nguồn duy nhất: `source/library/acca-aa/`. Câu hỏi, đáp án, model answer, examiner's notes của slide/checkpoint: **giữ nguyên văn**, ghi nguồn (`Ch 14 Activity 5`, `CP5 Cookit Co`).
- Lời giảng nối: viết lại ngắn từ slide, không thêm kiến thức ngoài. Phần ngoài nguồn → khối `Extended` + căn cứ.
- Lỗi số học trong nguồn: giữ nguyên văn, thêm ghi chú *Note* ngay dưới, ghi số đúng (ví dụ Ch 12 Activity 4).
- Dữ liệu bản đồ (`auditMap.ts`): mỗi node/edge/scenario có trường `src` trỏ về chương/checkpoint.

## 3. Ngôn ngữ
Toàn bộ tiếng Anh (UK spelling). Tên khoản mục kèm tên tiếng Việt và số hiệu TK VAS/Biscore chỉ trong bản đồ và dòng "Link to Branch A". Chuẩn mực dạng nhãn: "ISA 505 · IAS 37".

## 4. Khuôn trang chu trình (C3 · loai: acca)
Header (Module C3.n · phút · takeaway) → Learning outcomes (≤ 4) → **The cycle on one screen**: `FlowDiagram` theo stage (risk · control objective · control · test of control) + thẻ assertion chính → **Substantive playbook**: bảng theo assertion (Tabs nếu > 1 khoản mục) → **Activities** từ slide (đề tóm tắt, lời giải nguyên văn trong `Solution`, MCQ trong `ExamMcq`) → **Links to other cycles** (`<CycleLinks cycle=… />`, sinh từ dữ liệu bản đồ) → **Exam angle** (bảng requirement · what scores · trap) → ⚠️ IfSkipped + 🔑 KeyPrinciple + QuickCheck → Link Branch A + link node trên bản đồ (`/c/1/c1-master-map/#node-<id>`) → LessonNotes.
Thời lượng: ≤ 20 phút. Ngoại lệ đã ghi nhận: C3.6 Financing dùng thẻ thay FlowDiagram (không có dòng chứng từ theo stage).

## 5. Khuôn trang mô hình/khung (C1, C2, C4)
Learning outcomes → ý chính một câu → tương tác (bản đồ, `SortDrill`, `OpinionDecider`, `DirectionDrill`, `ExamMcq`) có lời dẫn → bảng tóm tắt từ slide/checkpoint → IfSkipped + KeyPrinciple + QuickCheck → link checkpoint luyện tập + Branch A. Mỗi trang ≥ 1 bài **retrieval** (SortDrill/MCQ), điểm lưu vào Tiến độ.

## 6. Khuôn trang Checkpoint (C5 · loai: checkpoint)
Exam structure → Knowledge revision → Exam techniques → Practice MCQ → Constructed response (nhiều phần thì tách từng phần; câu 2 điểm/ý dùng `perPoint={2}`) → Mock test (đồng hồ) → Notes. Dòng "Revise first" trỏ về trang C1–C4 liên quan.

## 7. Checklist review nhánh C
| # | Tiêu chí | Đạt khi |
|---|---|---|
| 1 | Nguồn | Mọi ý có trong slide/checkpoint; nguyên văn câu hỏi/đáp án không bị sửa (trừ lỗi OCR hiển nhiên); ngoài nguồn nằm trong Extended |
| 2 | Kiến trúc | Trang thuộc đúng tầng §1; cycle page theo §4, checkpoint theo §6 |
| 3 | Liên kết | Có link sang bản đồ/chu trình liên quan và Branch A (nếu có); không link chết |
| 4 | Tương tác | ≥ 1 tương tác có lời dẫn; ≥ 1 retrieval drill (trừ C0) |
| 5 | ⚠️ + 🔑 + Quick check | Đủ (trừ C0 và checkpoint) |
| 6 | Ngôn ngữ | Tiếng Anh UK, thuật ngữ ISA đúng |
| 7 | Frontmatter | Đủ trường; `phan` ∈ c0–c5; `style_version` = "C-1.1-draft" đến khi duyệt |
