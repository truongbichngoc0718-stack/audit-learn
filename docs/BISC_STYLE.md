---
style_version: "1.0"
trạng_thái: ĐÃ DUYỆT 05/11/2026 · khóa v1.0
căn_cứ: phân tích ebook 1 (Technique Training), 3 (Excel & Power BI), 5 (Case Biscore) trong /source/ebooks/md; đã qua 1 vòng review độc lập
---
# BISC_STYLE: chuẩn phong cách dạy BISC

> Hệ thống kỹ thuật có thể đổi, chuẩn này thì không. Mọi bài trong `/src/content` phải qua checklist ở mục 11.
> `[T#p1l1]` = chỗ trong ebook gốc thể hiện quy tắc. **[SITE MỚI]** = quy tắc dự án thêm vào, ebook không làm đồng nhất. Hai loại đều bắt buộc với bài mới.

## 1. Bộ lọc chọn kiến thức
**Nội dung có trong ebook gốc: luôn được đưa vào** (có thể tách, gộp, đổi thứ tự). Bộ lọc dưới đây áp cho **kiến thức mới** (mở rộng, từ thư viện, tài liệu nạp ngoài). Kiến thức mới vào bài giảng khi:
1. **Bắt buộc:** giúp trả lời một trong 3 câu hỏi xuyên suốt. Test cái gì · Test bao nhiêu · Kết luận thế nào [T#home].
2. **Bắt buộc:** nằm trong phạm vi Simulation: 6 chu trình + lớp xuyên suốt [C#scope]. Hàng tồn kho, lương, thuế, định giá BĐS chỉ nhắc khi cần phân biệt.
3. **Ít nhất một trong hai:** (a) dùng được trên một bộ dữ liệu (TB, GL, subledger, chứng từ BISCORE); hoặc (b) thay đổi một quyết định của KTV (chọn chiều, chọn mẫu, chọn ngưỡng, loại ý kiến, đề xuất bút toán, đọc đúng tên gọi).

Không qua → để ở `source/library`. Ưu tiên khi viết: **thủ tục > nguyên tắc > khái niệm > định nghĩa**. Mỗi bài chốt được ít nhất một hành động ("Reconcile trước khi test", "Suy rộng rồi mới so ngưỡng").

## 2. Giọng văn
- **Ngắn, khẳng định, chủ động.** Câu 8–20 từ, không rào đón. "Kết luận trên TB, chọn mẫu trên GL, test trên chứng từ." [T#p1l1]
- Nhánh A gọi người học là **"bạn"** ("Sau Phần 1, bạn sẽ:"). Nhánh B giữ giọng lớp học **"các bạn"** [X].
- **Nối cụm bằng dấu "·"** thay cho dấu phẩy khi liệt kê ngắn: "Hợp đồng · hóa đơn · phiếu xuất".
- **Thuật ngữ tiếng Anh** cho nghề KTV giữ nguyên, không dịch (vouching, tracing, population, key items, cut-off, walkthrough, finding). Assertion **viết hoa trên chip/nhãn** (Occurrence), **viết thường trong câu** ("kiểm tra completeness"). [SITE MỚI] Thuật ngữ chưa có trong GLOSSARY thì lần đầu kèm nghĩa Việt.
- **Viết tắt dùng được** (theo ebook): TB, GL, BCTC, CĐPS, TK, OM, PM, CTT, KTV, TSCĐ, NCC, BGĐ, HĐQT, GTGT, LNTT, JE, PO, FAR, MUS. Bên liên quan **viết đầy đủ** trong câu (BLQ chỉ dùng ở id/nhãn ngắn). Không viết tắt DN, HĐ, KH trong câu. Viết tắt mới phải thêm vào GLOSSARY trước.
- **In đậm đúng chữ quyết định** (1–3 chữ): "Suy rộng **rồi mới** so ngưỡng".
- **Tương phản để khắc sâu:** vouching ↔ tracing, ghi khống ↔ ghi thiếu, key items cộng thẳng ↔ mẫu suy rộng, dư Nợ ≠ dư Có.
- **Công thức đặt trong hộp, toán tử in đậm:** "Phải thu bình quân **÷** Doanh thu **×** 365".
- **Liên kết chéo bằng số bài:** "(Bài 2.2)", "cách lọc ở Bài 3.7".
- Biểu tượng chức năng: ⚠️ cảnh báo/Nếu bỏ qua, 🔑 nguyên tắc, ✓ kiểm tra/khớp, → dòng chảy. Nhánh A không emoji trang trí; nhánh B được dùng icon minh họa như ebook 3.
- Số kiểu Việt: chấm hàng nghìn, phẩy thập phân (12,5 triệu; 721.226.300.000 đ); đơn vị luôn rõ.

## 3. Cấu trúc bài kỹ thuật (Phần 1, 2, 4)
1. **Breadcrumb + nhãn:** "Phần 1 · Nền tảng / Bài 1.1" và "Bài 1.1 — {chủ đề ngắn} · {n} phút" (chủ đề ngắn ≠ tiêu đề, vd. "Bộ dữ liệu kế toán", "Đích đến", "Xác định trọng yếu").
2. **Tiêu đề** ≤ 6 từ + **takeaway 1–2 câu**: dạng vế song song có in đậm [T#p1l1], dạng quy trình [T#p2l1: "Chọn benchmark, tính OM, rồi suy ra PM và CTT."], hoặc **câu hỏi lớn** của bài [T#p1l2].
3. **Khối khái niệm:** eyebrow (nhãn nhỏ: "Dòng chảy số liệu", "Mô hình hóa", "Ví dụ minh họa", "Thử ngay", "Cẩn thận tên gọi", "Chọn đúng chiều") → H2 dạng câu/cụm hành động.
4. Ít nhất một **sơ đồ hoặc tương tác** có lời dẫn thao tác ("Bấm vào thẻ…", "Kéo nút đỏ…", "Đổi số liệu để xem kết luận thay đổi").
5. **"Tài liệu nào · làm gì · vai trò"**: khi bài so sánh các tài liệu/khái niệm ngang hàng, trình bày bằng **thẻ** (3 thẻ cho 3 vai trò [T#p1l1]); bảng chỉ dùng khi so nhiều chiều (vd. tên gọi theo firm [T#p2l1]).
6. **⚠️ Nếu bỏ qua** (1 câu hậu quả cụ thể) và **🔑 nguyên tắc** (1 câu). Ebook dùng ⚠️ cho cả cảnh báo khác ("Không chia nhỏ một sai sót…" [T#p2l2]). [SITE MỚI] Mỗi bài có đủ cả hai.
7. **Kiểm tra nhanh:** tình huống 1–2 câu có số/thao tác → đáp án ngắn ("Chưa", "Không", "Chưa, nhưng đã sát ngưỡng") → giải thích 2–3 câu. Biến thể của ebook: "Bài làm của bạn" → lời giải đánh số → máy tính [T#p2l2]. [SITE MỚI] Mỗi bài có ít nhất một Kiểm tra nhanh.
8. **Điều hướng** trước/sau (tự động).

**Trang tổng quan Phần:** "Technique training · Phần n · x phút" → tiêu đề → 1 câu lý do → **"Sau Phần n, bạn sẽ:"** 2 nhóm × 3 gạch bắt đầu bằng động từ. Ngoại lệ Phần 3: thay mục tiêu bằng **Audit scope** (7 thẻ: chu trình · TK · 2 assertion chính) + **khung chung 6 bước** [T#p3].

## 4. Cấu trúc bài phần hành (Phần 3)
1. **Thẻ đầu bài:** "Chu trình 0x · {English}{ · chuẩn mực nếu có}" → **câu hỏi kiểm toán** ("Doanh thu có thật và ghi đúng kỳ?") → (tùy bài) 1 câu rủi ro → 3 dòng **Tài khoản · Assertion · Dữ liệu**. Câu hỏi kiểm toán đóng vai trò takeaway.
2. **Audit program:** 6 bước; **bước 1 Hiểu quy trình, bước 2 Reconcile, bước 6 Kết luận cố định**; bước 3–5 theo đặc thù phần hành, giữ đúng ebook:
   | Bài | Bước 3–5 trong ebook |
   |---|---|
   | 3.1 Doanh thu (7 bước) | 3 Phân tích · 4 Test chi tiết · 5 Cut-off · 6 Sau kỳ · JE · 7 Kết luận |
   | 3.2 Phải thu | 3 Số ngày thu tiền · 4 Xác nhận · 5 Dự phòng · 6 Trình bày · kết luận |
   | 3.3 Phải trả | theo T#p3l3 (ap3–ap5: phân tích · chọn NCC theo phát sinh · nợ chưa ghi nhận) |
   | 3.4 Chi phí | theo T#p3l4 (ox3–ox5: phân tích tháng · vouching · 242 & đúng kỳ) |
   | 3.5 Vay | 3 Tính lại lãi · 4 Phân loại · 5 Covenants |
   | 3.6 TSCĐ | 2 Roll-forward · 3 Tỷ lệ khấu hao · 4 Vouching tăng & 241 · 5 Tính lại khấu hao, thanh lý |
   | 3.7 Bút toán tay & bên liên quan | 3 Lọc tiêu chí · 4 Vouch + phê duyệt · 5 Bên liên quan test 100% |
3. Mỗi bước: "Bước n" + nhãn tiếng Anh (Understanding, Reconcile, Analytics, Confirmation, Valuation, Test of details, Cut-off, Subsequent review, Evaluate · conclude) → H2 dạng câu → chip assertion → sơ đồ dòng chảy → **Output** (giấy tờ làm việc của bước).
4. **Bước 1 có khuôn cố định:** chuỗi 4–5 khâu, mỗi khâu = **tên khâu · chứng từ · kiểm soát**; dòng "Kiểm soát chính"; **đúng 3 rủi ro**, mỗi rủi ro "Tên → Bước n".
5. **Bước test ghi chiều** (vouching/tracing) và assertion. **Bước kết luận dùng chuỗi cố định:** "Sai sót đã lượng hóa → So CTT · PM → Bút toán điều chỉnh đề xuất"; Output luôn có "mini working paper cho từng finding".
6. **Red flags: 2–4 thẻ** (tiêu đề 2–5 chữ + 1 dòng).
7. **Kiểm tra nhanh** khi ebook có (3.3, 3.4, 3.6, 3.7); [SITE MỚI] mọi trang phần hành có ít nhất một, cộng **quiz 4 câu** riêng.
8. [SITE MỚI] **Thực hành Biscore:** dữ kiện + câu hỏi; lời giải trong khối ẩn.

## 5. Bài kiểm tra chốt
"✓ Bài kiểm tra chốt" → "n câu: {phạm vi}. Mục tiêu: n/n." (Phần 3: 7 câu, mục tiêu 6/7) → 4 phương án A–D, 1 đáp án → "**Đáp án X.** {vì sao đúng + nguyên tắc chuyển giao}", kèm chuẩn mực nếu có. Giải thích vì sao phương án nhiễu sai **khi phương án đó là một nhầm lẫn phổ biến** [SITE MỚI].

## 6. Thời lượng
- Bài kỹ thuật 3–4 phút; phần hành 3 phút (Doanh thu 7, bên liên quan 5); trang Kết 3 phút. Phần 1 = 8, Phần 2 = 7, Phần 3 = 27, Kết = 3 → tổng 45 phút [T#home].
- Giả định ước lượng cho bài mới [SITE MỚI]: ~200–250 từ đọc + 1 tương tác ≈ 3 phút; quá 5 phút thì tách bài.

## 7. Cách đặt ví dụ số
- **Một doanh nghiệp minh họa chạy xuyên suốt:** Công ty A, LNTT 5 tỷ → OM 250 · PM 175 · CTT 12,5 triệu, dùng ở Phần 2 và tiếp tục ở Phần 3 (Kiểm tra nhanh 3.6, 3.7, sơ đồ bên liên quan). Thỉnh thoảng dùng **Công ty B** để thử chuyển giao trong bài kiểm tra.
- Ví dụ minh họa ghi "Số liệu minh họa, đơn vị tỷ đồng."
- Phép tính viết từng bước đánh số, kết quả in đậm, **kết thúc bằng hệ quả kiểm toán** (vào bảng tổng hợp? mở rộng thủ tục? ảnh hưởng ý kiến?).
- **Hai tầng ví dụ [SITE MỚI]:** (a) minh họa số tròn (giữ từ ebook) để hiểu nguyên lý; (b) **ví dụ Biscore** số thật, ghi nguồn file/sheet. Không trộn hai tầng trong một phép tính.
- **Ngưỡng của ví dụ Biscore** luôn dùng bộ số chính thức của đề [C#materiality]: **OM 3,6 tỷ** (0,5% × doanh thu thuần 721.226.300.000 đ) · **PM 2,2 tỷ** (60% × OM) · **CTT 180 triệu** (5% × OM). Lý do PM thấp: năm đầu kiểm toán, đơn vị chịu áp lực kết quả kinh doanh và điều khoản cam kết với ngân hàng. Không so số Biscore với ngưỡng của Công ty A.
- **Niên độ Biscore:** FY2025, khóa sổ 31/12/2025, soát xét sau kỳ tháng 1–2/2026, block cut-off quanh 16/12/2025–15/01/2026.
- Tương tác số: giá trị mặc định = ví dụ chạy suốt, kết luận chữ đổi theo số.

## 8. Câu hỏi kiểm tra
- Kiểm tra nhanh nhắm vào **một nhầm lẫn phổ biến**: chọn sai chiều, so sai sót thô với CTT, chọn mẫu khi chưa reconcile, suy rộng thứ không phải sampling.
- Trắc nghiệm 4 phương án; **ưu tiên** phương án nhiễu là nhầm lẫn có thật; câu tính toán dùng kết quả của bước tính sai điển hình (vd. 400 tr = quên nhân PM%). Không dùng "tất cả đều đúng/sai".
- **Chủ đề lặp xuyên suốt cần khai thác:** chọn item cụ thể / chọn theo tiêu chí **không phải sampling → không suy rộng** (key items, nợ chưa ghi nhận, bút toán tay, bên liên quan test 100%).

## 9. Gắn chuẩn mực
- Gắn **ngắn, đúng chỗ, dạng nhãn**: "VSA 200 · VSA 700", "Bằng chứng · VSA 500", "Chu trình 01 · Revenue · VSA 240"; trong giải thích: "(VSA 500)", "(VSA 550, VAS 26)".
- Chuẩn mực/văn bản **ebook đã dẫn**: VSA 200, 240, 500, 550, 700, 705; VAS 03, 16, 26; Thông tư 48/2019 (dự phòng), Thông tư 45/2013 (ngưỡng TSCĐ 30 triệu); ebook 1 gọi hệ thống tài khoản là "VAS", case ghi "VAS và Thông tư 200/2014/TT-BTC" [C].
- Chuẩn mực **chưa có trong ebook** (VSA 320, 450, 505, 530, 540, 560…) chỉ xuất hiện trong khối **Mở rộng**.
- Thực tế các firm chỉ dùng để **phân biệt tên gọi**, không dạy quy trình riêng của firm.
- Không trích nguyên văn đoạn dài của chuẩn mực trong bài; đặt ở Thư viện.

## 10. Nhánh B (Excel / Power BI) [X]
- Nhãn "Bài 1.3 · Công thức" (dấu "·"), không ghi số phút từng bài; tổng "9 bài trong 65 phút".
- Thao tác: đường dẫn menu in đậm nối bằng → (**Home → Transform data**), phím tắt dạng phím, bảng "Ô | Công thức", tên sheet bài tập cụ thể ("BT1 SUMIFS TB").
- Bài tập luôn trên dữ liệu kiểm toán (GL 12 tháng, Bảng CĐPS, danh mục).
- [SITE MỚI] Thêm "Làm được gì sau bài", "Dùng ở đâu trong kiểm toán" (link sang phần hành), 1 Kiểm tra nhanh.

## 11. Hình thức
- Màu: navy `#1C3A4A` / `#2E5A6E`, vàng `#F9C31F`, nền `#f2f7f9`, chữ `#2A4A5A`, ink `#0F2530`; xanh lá `#138a63` = khớp/đúng; đỏ `#c0413b` = rủi ro/sai. Font: tiêu đề Lora, thân Inter, số mono. Thẻ bo 16px, chip assertion, mũi tên dòng chảy.

## 12. Checklist review (agent soát bài)
| # | Tiêu chí | Đạt khi |
|---|---|---|
| 1 | Bộ lọc | Nội dung gốc giữ đủ ý; nội dung mới qua đủ 3 điều kiện §1 và nằm trong khối Mở rộng |
| 2 | Header | Breadcrumb; "Bài x.y — {chủ đề ngắn} · n phút"; tiêu đề ≤ 6 từ; takeaway 1–2 câu (phần hành: câu hỏi kiểm toán) |
| 3 | Mục tiêu | Động từ hành động, ≤ 6 gạch |
| 4 | Sơ đồ/tương tác | ≥ 1, có lời dẫn thao tác |
| 5 | Ví dụ số | Bước đánh số, kết quả in đậm, kết bằng hệ quả kiểm toán; ghi minh họa hay Biscore + nguồn; Biscore dùng OM 3,6 tỷ · PM 2,2 tỷ · CTT 180 tr |
| 6 | ⚠️ + 🔑 | Có đủ, mỗi cái 1 câu cụ thể |
| 7 | Kiểm tra nhanh | Tình huống có số/thao tác; đáp án ngắn + giải thích nguyên tắc |
| 8 | Phần hành | Thẻ đầu bài; bước 1/2/6 cố định, 3–5 đúng ebook; Bước 1 đủ khâu · chứng từ · kiểm soát + 3 rủi ro → bước; chiều + assertion ở bước test; Output mỗi bước; Red flags 2–4 |
| 9 | Giọng văn | Câu ngắn, chủ động; thuật ngữ và viết tắt đúng §2 + GLOSSARY; số kiểu Việt |
| 10 | Chuẩn mực | Dạng nhãn đúng chỗ; chuẩn mực ngoài ebook chỉ trong Mở rộng |
| 11 | Thời lượng | Khớp §6 (±1 phút) |
| 12 | Frontmatter | Đủ trường LESSON_GUIDE, có style_version |
