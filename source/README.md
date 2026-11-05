# /source — Nguồn gốc duy nhất của Audit Learning Hub

Trích xuất ngày 05/11/2026 từ ebooks.bisc.edu.vn (quyền truy cập hết hạn 15/11/2026) và folder BISCORE trên máy.
Không sửa tay các file trong `ebooks/html` (bản gốc). Bản Markdown sinh lại được bằng `scripts/extract_ebook.py`.

## 1. Ebook

| # | File gốc (`ebooks/html`) | Markdown (`ebooks/md`) | Nội dung | Quy mô | Vai trò |
|---|---|---|---|---|---|
| 1 | bisc_01_Training_Audit_Simulation.html | 01-training/main.md | Technique Training 23/10: Trang chủ → P1 Nền tảng (1.1 TB/GL/subledger, 1.2 Mục đích kiểm toán) → P2 Materiality (2.1 Ba mức trọng yếu, 2.2 Test dựa vào materiality) → P3 Phần hành (3.1 Doanh thu 7 bước, 3.2–3.7 mỗi phần hành 6 bước + Red flags) → Kết: Từ thủ tục đến finding (mini WP 8 trường) | ~10.000 từ · 36 ảnh · 3 bài kiểm tra chốt (15 câu có đáp án) · 7 "Kiểm tra nhanh" · máy tính suy rộng | **Nguồn chính** |
| 2 | bisc_02_Audit_Simulation_2026_Training_1_2.html | 02-simulation/ (main_frame1, main_frame2) | Trang gộp 2 tab: **Training 1** = bản sao ebook 1 (chỉ bỏ thời lượng từng bài), **Training 2** = bản sao ebook 4 | ~11.400 từ | ⚠ Trùng lặp, không có nội dung mới |
| 3 | bisc_03_Excel_PowerBI_Audit_Simulation.html | 03-excel-powerbi/ | 9 bài/65 phút (GV Khánh Bùi): Excel xl1–xl4 (di chuyển, Freeze/Filter/Table, SUMIFS, XLOOKUP) · Power BI pl1–pl4 (ghép 12 file GL, measure SUM/DIVIDE, relationship/merge, dashboard) · AI tại Big4 · khung lồng slide 7 trang | ~3.600 từ · 4 ảnh | Nhánh B |
| 4 | bisc_04_Training2_Ky_nang_mem.html | 04-ky-nang-mem/ | Kỹ năng mềm cho associate mới: 6 block/40 phút | ~1.700 từ · 17 ảnh | Tham khảo, chưa dùng |
| 5 | bisc_05_case_study_biscore_full.html | 05-case-biscore/ | 3 tài liệu: 01 Tổng quan ngành · 02 Hồ sơ Biscore (6 phần + phụ lục dữ liệu D-01…D-12) · 03 Yêu cầu (phạm vi 6 chu trình + lớp xuyên suốt, OM 3,6 tỷ / PM 2,2 tỷ / CTT 180 tr, 4 sản phẩm nộp, mẫu mini WP) | ~14.900 từ · 10 ảnh | Đề bài Simulation, đối chiếu BISCORE |

Mỗi thư mục md có: `*.md` (nội dung), `*_scripts.js` (script có tiếng Việt: điều hướng, quiz, máy tính — giữ để tái tạo tương tác), `img/` (ảnh tách từ base64), `outline.json` (mục lục theo heading + id gốc).

Ghi chú cá nhân trên ebook: `ebooks/notes/bisc_notes_ca_nhan.md` (5 nhóm: materiality, test dựa vào materiality, phần hành, other, partner questions).

## 2. BISCORE (folder máy: `Ebook/Biscore_Tài liệu kiểm toán/`)
Chi tiết từng sheet: `biscore/INVENTORY.md`. Text 2 PDF: `biscore/BSC-120…md`, `biscore/BSC-122…md`.

| Mã (ebook 5) | File trên máy | Có? |
|---|---|---|
| D-01 BCTC chưa kiểm toán | Báo cáo tài chính.xlsx | ✅ |
| D-02 Bảng CĐPS | Bảng cân đối phát sinh.xlsx (kèm danh mục TK, đối tượng, quy ước số CT) | ✅ |
| D-03 Sổ cái (80.496 dòng) | So cai GL theo thang/ T01–T12 (khớp 80.496 dòng) | ✅ |
| D-04 + D-11 Báo cáo doanh thu | Báo cáo doanh thu.xlsx (8 sheet; ebook ghi 10 sheet) | ✅ ⚠ thiếu 2 sheet |
| D-05 Tuổi nợ phải thu | Công nợ phải thu.xlsx | ✅ |
| D-06 Công nợ phải trả | Công nợ phải trả.xlsx | ✅ |
| D-08 FAR | Tài sản cố định.xlsx | ✅ |
| D-10 Chi phí trả trước | Chi phí trả trước.xlsx | ✅ |
| D-12 Sổ phụ ngân hàng | Sổ phụ ngân hàng.xlsx | ✅ |
| D-07, D-09 | — (ebook không liệt kê; có thể là hợp đồng vay / chứng từ theo document request) | ❌ |
| Tài liệu chung | BSC-120 Chính sách kế toán 2025 · BSC-122 Danh sách bên liên quan | ✅ |
| Mẫu nộp bài | Mẫu working paper.xlsx (Finding Register · Mini WP · Ví dụ) | ✅ |

Số liệu then chốt: Doanh thu 724,8 tỷ (thuần 721,2 tỷ) · Vay dài hạn 620 tỷ, vay ngắn hạn mới 40 tỷ, CP tài chính 59,3 tỷ · NCC100 = công ty mẹ (76%).
