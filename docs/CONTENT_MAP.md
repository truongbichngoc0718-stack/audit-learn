# CONTENT_MAP: ánh xạ nguồn → trang mới
Trạng thái: **ĐÃ DUYỆT 05/11/2026** · Bước 4 hoàn thành: toàn bộ trang dưới đây đã xuất bản (✅), trừ ghi chú khác · cập nhật 05/11/2026

## Ký hiệu nguồn
| Mã | Nguồn | Vị trí trong /source |
|---|---|---|
| **T** | Ebook 1 · Technique Training (id gốc, ví dụ `T#p3l1`) | `ebooks/md/01-training/main.md` |
| **S** | Ebook 2 · Training 1 & 2: **trùng hoàn toàn với T và K**, không ánh xạ riêng | `ebooks/md/02-simulation/` |
| **X** | Ebook 3 · Excel & Power BI (`X#xl1`…`X#pl4`) | `ebooks/md/03-excel-powerbi/` |
| **K** | Ebook 4 · Kỹ năng mềm: ngoài phạm vi giai đoạn này | `ebooks/md/04-ky-nang-mem/` |
| **C** | Ebook 5 · Case Biscore: 01 Ngành · 02 Hồ sơ · 03 Yêu cầu (`C#business-risks`…) | `ebooks/md/05-case-biscore/main.md` |
| **B** | Dữ liệu BISCORE trên máy (`B:Doanh thu/08` = file Báo cáo doanh thu, sheet 08) | `biscore/INVENTORY.md` |
| **N** | Ghi chú cá nhân của bạn trên ebook | `ebooks/notes/bisc_notes_ca_nhan.md` |

Trạng thái trang: 🟢 gốc (có sẵn trong ebook) · 🟡 gộp/tái cấu trúc · 🔵 mở rộng mới (phải ghi căn cứ)

## ⚠ Phát hiện cần bạn quyết
1. **Ebook 2 không phải "simulator".** Nó chỉ là trang gộp 2 tab: Training 1 (bản sao ebook 1, bỏ thời lượng từng bài) và Training 2 (bản sao ebook 4). Vì vậy phần "Thực hành (Simulation)" trong mỗi phần hành sẽ lấy từ **đề case Biscore (C)** cộng **dữ liệu BISCORE (B)**. Mình đề xuất làm như vậy. Nếu Simulation thật nằm ở chỗ khác (bản khác, file khác), bạn cho mình biết.
2. **Thiếu dữ liệu so với ebook 5:** không có D-07 và D-09. Báo cáo doanh thu chỉ có 8 sheet, trong khi C ghi 10 sheet. C cũng có chỗ ghi "13 file" nhưng bảng chỉ liệt kê 10 file. Phần hành **Vay** chỉ có dữ liệu trong GL/BCĐPS và mô tả 4 khoản vay trong C (VAY01–04); không có hợp đồng hay sổ chi tiết vay.
3. **Spoiler:** C#business-risks và C#p5 (sự kiện trọng yếu) chứa đúng các "bẫy" của đề thi (Sao Mai Land, Vietnam Global Summit, PKT doanh thu, dự phòng giảm…). Đề xuất: ví dụ BISCORE nêu **dữ kiện + câu hỏi**, đáp án/finding đặt trong khối ẩn "Xem lời giải".
4. **Thời lượng:** ebook 1 ghi 45 phút cho 3 phần/12 bài, nhưng bản ebook 2 bỏ thời lượng. Site mới dùng thời lượng của ebook 1 cho bài gốc; bài mở rộng tự ước lượng.

## NHÁNH A · KIỂM TOÁN

### Phần 0 · Lộ trình
| id trang mới | Tiêu đề | Nguồn | Trạng thái | Ghi chú |
|---|---|---|---|---|
| a0-lo-trinh | Lộ trình & 3 câu hỏi xuyên suốt | T#home, T#caseband, T#p3 ("Sáu chu trình…", "Mọi phần hành, 6 bước"), T#p2 câu "Ba mức trọng yếu quyết định test cái gì, test bao nhiêu" | 🟡 | 3 câu hỏi có mầm trong T (p2); khung "Kết luận thế nào" lấy từ T#fin |
| a0-gioi-thieu-biscore | Làm quen Biscore Group | C#01 Ngành, C#p1–p4 (tóm tắt), C#scope, C#materiality | 🟡 | Trang "nhân vật xuyên suốt": 2 dòng KD, BCTC, phạm vi 6 chu trình, OM/PM/CTT của đề |

### Phần 1 · Nền tảng
| id | Tiêu đề | Nguồn | Tr.thái | Ghi chú |
|---|---|---|---|---|
| a1-1-tb-gl-subledger | TB, GL và subledger | T#p1l1 (4') | 🟢 | Sơ đồ Chứng từ → Subledger → GL → TB → BCTC. Ví dụ "TK 131 ba tầng" thay bằng **B: Công nợ phải thu/04** (131.OF 69,15 tỷ khớp BCĐPS) |
| a1-2-muc-dich-kiem-toan | Mục đích kiểm toán: VSA 200/700/705 | T#p1l2 phần "Bốn việc…", "Từ tổng sai sót đến ý kiến" | 🟢 | Tách 1.2 thành 2 bài cho đúng kiến trúc |
| a1-3-vouching-tracing | Vouching vs Tracing | T#p1l2 "Vouching hay tracing" | 🟢 + 🔵 | 🔵 Bài tập chọn chiều (component) với 6–8 tình huống BISCORE |
| a1-4-do-tin-cay-bang-chung | Độ tin cậy bằng chứng (VSA 500) | T#p1l2 "Bằng chứng nào đáng tin hơn" | 🟢 | |
| a1-quiz | Bài kiểm tra Phần 1 | T#p1t (4 câu có đáp án) | 🟢 | |

### Phần 2 · Materiality
| id | Tiêu đề | Nguồn | Tr.thái | Ghi chú |
|---|---|---|---|---|
| a2-1-om-pm-ctt | Ba mức trọng yếu: OM · PM · CTT | T#p2l1 (benchmark, Công ty A, vùng đệm, "PM hai nghĩa", bảng VSA/EY/KPMG/Deloitte·PwC), N:materiality | 🟢 | Ví dụ BISCORE: C#materiality (0,5% × 721,2 tỷ = 3,6 tỷ; PM 60% = 2,2 tỷ; CTT 180 tr) |
| a2-2-scoping-key-items | Khoản mục nào phải test (scoping · key items) | T#p2l2 bước 1–2, N:test dựa vào materiality, B: Công nợ phải thu/01 | 🟡 ✅ MVP | Benchmark đã nằm trong a2-1 (kèm máy tính) nên bài 2.2 cũ "Chọn benchmark" gộp vào 2.1 |
| a2-3-chon-mau | Chọn mẫu đúng phương pháp | T#p2l2 bước 3 | 🟢 + 🔵 ✅ MVP | Mở rộng: cỡ mẫu MUS (VSA 530) |
| a2-4-suy-rong | Suy rộng rồi mới so ngưỡng | T#p2l2 bước 4, ví dụ, máy tính | 🟢 ✅ MVP | |
| a2-quiz | Bài kiểm tra Phần 2 | T#p2t | 🟢 | |

### Phần 3 · Phần hành (mỗi phần hành 1 trang hợp nhất)
Khung chung: **Lý thuyết (T) → Audit program (T, 6–7 bước) → Thực hành (C + B) → Ví dụ BISCORE → Red flags → Quiz**. Phần mở đầu lấy từ T#p3 ("Sáu chu trình và lớp xuyên suốt", "Mọi phần hành, 6 bước") cùng N:Phần hành.

| id | Phần hành | Lý thuyết + program (T) | Thực hành / ví dụ BISCORE (C, B) | Tr.thái | Thiếu / mở rộng |
|---|---|---|---|---|---|
| a3-1-doanh-thu | Doanh thu | T#p3l1 rv1–rv7 + Red flags (7') | B: Doanh thu/01–08 (theo tháng, khách thuê, khách sạn, sự kiện, giảm trừ, top 25, **PKT thủ công**); C#p5 sự kiện 03–08 (credit note, Sao Mai Land HDO2512-0086, Global Summit HDK2512-0953, tháng 12 sự kiện, PKT); BSC-120 Điều 2–4; N:partner questions (DT tháng 12) | 🟡 | 🔵 ERP/analytics theo tháng (Excel X#xl3); quiz phần hành chưa có trong T → viết mới 4 câu |
| a3-2-phai-thu | Phải thu KH | T#p3l2 ar1–ar6 | B: Công nợ phải thu/01–04 (tuổi nợ, 1.281 HĐ, DSO); C#business-risks (dự phòng 4,5 → 2,65 tỷ); BSC-120 Điều 7 (30/50/70/100%) | 🟡 | 🔵 máy tính dự phòng theo tuổi nợ; mẫu thư xác nhận (VSA 505) |
| a3-3-phai-tra | Phải trả NCC | T#p3l3 ap1–ap6 | B: Công nợ phải trả/01–04 (64 NCC, số dư Nợ), GL 331/335; sổ phụ ngân hàng cho search unrecorded liabilities | 🟡 | 🔵 bài tập "chọn NCC theo phát sinh, không theo số dư" trên dữ liệu thật |
| a3-4-chi-phi | Chi phí hoạt động (gồm 242) | T#p3l4 ox1–ox6 | B: Chi phí trả trước/01–03; GL 632/641/642; BSC-120 Điều 6 | 🟡 | 🔵 tính lại phân bổ 242 |
| a3-5-vay | Vay & lãi vay | T#p3l5 bw1–bw6 | C#business-risks + C#p5-01 (VAY01–04, lãi suất, đáo hạn; VAY03 đáo hạn 30/09/2026 → phân loại ngắn hạn); BCĐPS 3411/635 (59,3 tỷ) | 🟡 | ⚠ thiếu hợp đồng / sổ chi tiết vay; 🔵 máy tính tính lại lãi (365 ngày) |
| a3-6-tscd | Tài sản cố định | T#p3l6 fa1–fa6 | B: TSCĐ/01–04 (FAR, tăng 32,05 tỷ, khấu hao tháng, HVAC nâng cấp), C#p5-02 (XDCB 241: 18 → 65,15 tỷ); BSC-120 Điều 5 (ngưỡng vốn hóa 30 tr) | 🟡 | 🔵 roll-forward tương tác |
| a3-7-but-toan-tay-blq | Bút toán tay & BLQ | T#p3l7 je1–je6 | B: GL 12 tháng (cột người lập, ngày nhập hệ thống), Doanh thu/08; BSC-122 (NCC100 = công ty mẹ 76%) | 🟡 | 🔵 bộ lọc JE criteria tương tác; liên kết nhánh B (Power BI ghép 12 file GL) |
| a3-quiz | Bài kiểm tra Phần 3 | T#p3t | 🟢 | |

### Phần 4 · Ghi finding & mini working paper
| id | Tiêu đề | Nguồn | Tr.thái | Ghi chú |
|---|---|---|---|---|
| a4-1-tu-thu-tuc-den-finding | Từ thủ tục đến finding | T#fin ("Năm mắt xích", "Ba kết luận") | 🟢 | |
| a4-2-mini-working-paper | Mini working paper | T#fin "8 trường", C#mini-wp, C#deliverables, B: Mẫu working paper.xlsx (Finding Register, Mini WP, Ví dụ) | 🟡 | File mẫu tải về; 🔵 form điền mini WP trên trang (lưu localStorage) |
| a4-quiz | Bài kiểm tra Phần 4 | — | 🔵 | Viết mới 4 câu |

### Thư viện
| id | Nội dung | Nguồn | Tr.thái |
|---|---|---|---|
| lib-thuat-ngu | Thuật ngữ (OM, PM, CTT, vouching, tracing, assertion, ERP, cut-off, key item…) | Rút từ T + N | 🟡 |
| lib-chuan-muc | Chuẩn mực VSA/ISA được nhắc (200, 500, 505, 530, 700, 705; VAS 26) | T, BSC-122 | 🟡 + 🔵 |
| lib-he-thong-tk | Hệ thống tài khoản Biscore (87 TK) đối chiếu TT200 | B: BCĐPS/DANH MUC TAI KHOAN | 🟡 |
| lib-biscore-du-lieu | Danh mục bộ dữ liệu D-01…D-12 + cách dùng | C#appendix-data, source/README | 🟡 |

## NHÁNH B · EXCEL / POWER BI
| id | Bài | Nguồn | Link sang nhánh A | Tr.thái |
|---|---|---|---|---|
| b0-tong-quan | Tổng quan 9 bài · 65 phút | X intro + khung slide X#frame1 | — | 🟢 |
| b1-di-chuyen-chon-vung | Di chuyển & chọn vùng nhanh | X#xl1 | a1-1 (đọc GL) | 🟢 |
| b2-freeze-filter-table | Freeze, Filter & Table | X#xl2 | a3-7 | 🟢 |
| b3-sumifs | SUMIFS: đối chiếu GL ↔ BCĐPS | X#xl3 | a1-1 reconcile, a3-1 ERP theo tháng | 🟢 + bảng tính tương tác |
| b4-xlookup | XLOOKUP: tra danh mục, tìm mã lạ | X#xl4 | a3-7 (đối tượng lạ, BLQ NCC100) | 🟢 |
| b5-ghep-12-file | Power BI: ghép 12 file GL | X#pl1 | a3-7 | 🟢 |
| b6-measure | Measure SUM & DIVIDE (biên LN gộp) | X#pl2 | a3-1, a3-4 | 🟢 |
| b7-join | Relationship & Merge Queries | X#pl3 | a3-2, a3-3 | 🟢 |
| b8-dashboard | Dựng dashboard | X#pl4 | a3-1 | 🟢 |
| b9-ai-big4 | AI tại Big4 | X#wrap | — | 🟢 (cần cập nhật định kỳ) |
| b-files | File thực hành tải về | Tạo từ B (bản rút gọn GL 1 tháng + BCĐPS + danh mục) | — | 🔵 |

## Chỗ trùng (đã xử lý)
- S ≡ T + K: chỉ dùng T và K làm nguồn.
- T#p1l2 gói 3 chủ đề (mục đích kiểm toán, vouching/tracing, VSA 500): tách thành a1-2, a1-3, a1-4.
- Materiality xuất hiện ở T#p2l1, C#materiality và N: gộp vào a2-1/a2-2, số liệu đề Biscore làm ví dụ.
- Mini WP xuất hiện ở T#fin, C#mini-wp và file Excel mẫu: gộp vào a4-2.

## Chỗ thiếu
- Quiz cuối mỗi phần hành và Phần 4 (T chỉ có quiz cuối Phần 1, 2, 3).
- "Nếu bỏ qua…" mới có 1 chỗ trong T; cần viết cho mọi bài (mở rộng nhẹ, căn cứ theo nội dung T).
- Dữ liệu vay chi tiết, D-07/D-09.

## Đề xuất mở rộng (🔵, mỗi mục có căn cứ)
1. Máy tính materiality, máy tính cỡ mẫu và suy rộng (VSA 320, 450, 530).
2. Bài tập chọn chiều vouching/tracing (VSA 500, gắn assertion).
3. Thư xác nhận công nợ (VSA 505).
4. Máy tính dự phòng phải thu (TT48/2019/TT-BTC + BSC-120 Điều 7).
5. Ước tính kế toán và sự kiện sau ngày khóa sổ (VSA 540, VSA 560) cho cut-off/subsequent review.
6. Flashcard thuật ngữ sinh từ Thư viện.

## Số trang dự kiến
Nhánh A: 2 + 5 + 5 + 8 + 3 = 23 trang, cộng 4 trang thư viện. Nhánh B: 11 trang.
MVP (Bước 3): khung site + a0 + a1 + a2 + a3-1 + khung nhánh B (b0 + danh sách bài).
