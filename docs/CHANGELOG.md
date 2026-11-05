# CHANGELOG

## 2026-11-05 · Bước 1 — Trích xuất & kiểm kê
- Xuất 5 ebook BISC (HTML gốc) vào `source/ebooks/html`, chuyển sang Markdown + ảnh + outline (`scripts/extract_ebook.py`).
- Lưu ghi chú cá nhân trên ebook vào `source/ebooks/notes/`.
- Kiểm kê folder BISCORE (`scripts/inventory_biscore.py` → `source/biscore/INVENTORY.md`), chuyển 2 PDF sang text.
- Báo cáo kiểm kê: `source/README.md`.

## 2026-11-05 · Bước 2 — CONTENT_MAP (nháp chờ duyệt)
- Lập `docs/CONTENT_MAP.md`: ánh xạ T/X/C/B/N → 23 trang nhánh A, 4 trang thư viện, 11 trang nhánh B; ghi chỗ trùng, chỗ thiếu, đề xuất mở rộng.

## 2026-11-05 · Bộ chuẩn BISC & khung site (chờ duyệt)
- CONTENT_MAP được duyệt, chấp nhận 4 đề xuất: Thực hành lấy từ case Biscore + dữ liệu; Vay dựa trên mô tả VAY01–04 + GL; lời giải BISCORE để ẩn; dùng thời lượng ebook 1.
- Viết `docs/BISC_STYLE.md` v1.0-draft, `docs/GLOSSARY.md`, `docs/LESSON_GUIDE.md`, khuôn `docs/templates/`, skill `.claude/skills/build-lesson`.
- Dựng khung Astro 7 + Starlight 0.42 + React: theme BISC navy/vàng, schema frontmatter có kiểm tra, sidebar theo kiến trúc A0–A4 · Thư viện · B, 13 thành phần bài giảng, trang Tiến độ (xuất/nhập JSON), trang Mới cập nhật, trang demo thành phần.
- Review độc lập bộ chuẩn: sửa 25 điểm (ngưỡng Biscore OM 3,6 tỷ · PM 2,2 tỷ · CTT 180 tr; bước 3–5 theo từng phần hành; Red flags 2–4 thẻ; đánh dấu [SITE MỚI]; viết tắt và chuẩn mực theo đúng ebook; thêm trường `nhan`; mã finding theo case).

## 2026-11-05 · Khóa BISC_STYLE v1.0
- Bạn duyệt BISC_STYLE.md và GLOSSARY.md → khóa v1.0. Mã finding theo case (REV/AR/AP/OPEX/BOR/FA/JE-nn).

## 2026-11-05 · Bước 3 — MVP (chờ duyệt)
- [a1-1-tb-gl-subledger] bài mẫu chuẩn, ví dụ Biscore 3 tầng TK 131 khớp đến đồng (gộp)
- [a2-1-om-pm-ctt] bài mẫu chuẩn, máy tính materiality có preset Biscore, lý do benchmark (gộp)
- [a3-1-doanh-thu] bài mẫu chuẩn phần hành: 7 bước + 7 bài tập Biscore (Sao Mai Land, Global Summit, PKT Đại Nam Việt / Liên Việt), quiz 4 câu mới (gộp + mở rộng)
- [a0-lo-trinh] [a0-gioi-thieu-biscore] Phần 0 (gộp)
- [a1-2] [a1-3] [a1-4] tách từ ebook 1.2; a1-3 thêm bài tập chọn chiều 6 tình huống Biscore (mở rộng); [a1-quiz] (gốc)
- [a2-2] [a2-3] [a2-4] tách từ ebook 2.2 (gốc + ví dụ Biscore); a2-3 mở rộng cỡ mẫu MUS (VSA 530); [a2-quiz] (gốc)
- [a3-tong-quan] (gốc); khung nhánh B: tổng quan + 9 bài "sắp có"
- Sửa theo review độc lập bài mẫu: tách REV-04 thành Further evidence required (sai sót đã xác định 7,37 tỷ), bỏ chữ "ghi khống", thêm chip Management override, khôi phục 3 thẻ "Doanh thu ghi nhận khi nào", nêu giả định giá phòng đều.
- CONTENT_MAP: Phần 2 tổ chức lại thành 2.1 OM/PM/CTT (gồm benchmark) · 2.2 scoping & key items · 2.3 chọn mẫu · 2.4 suy rộng.
- GLOSSARY: thêm POS, F&B, night audit, folio.

## 2026-11-05 · Bước 4 — Hoàn thiện nội dung
- [a3-2-phai-thu] Tuổi nợ, xác nhận, dự phòng; AR-01 dự phòng nhóm 181–365 ngày thiếu 0,89 tỷ (gộp + mở rộng)
- [a3-3-phai-tra] AP-01 bù trừ dư Nợ 331 4,98 tỷ; AP-02 335 đầu kỳ 26 tỷ cần thêm bằng chứng (gộp)
- [a3-4-chi-phi] OPEX-01 PKT2512-0014 chuyển 1,65 tỷ bảo trì sang 242 (gộp)
- [a3-5-vay] BOR-01 lãi VAY04 quý 4 chưa trích 0,81 tỷ; BOR-02 vốn hóa lãi 1,15 tỷ; BOR-03 phân loại vay (gộp)
- [a3-6-tscd] Roll-forward; FA-01 241 chưa kết chuyển; FA-02 thang máy cũ chưa ghi giảm (gộp)
- [a3-7-but-toan-tay-blq] Lọc JE tương tác; 3 PKT nhập sau khóa sổ; bên liên quan chưa khai báo, thiếu thuyết minh VAS 26 (gộp)
- [a3-quiz] (gốc) · [a4-tong-quan] [a4-1] [a4-2] [a4-quiz]: năm mắt xích, mini WP, bảng tổng hợp sai sót Biscore (LNTT ghi thừa 10,72 tỷ), form soạn mini WP (mở rộng)
- Thư viện: thuật ngữ + flashcard, chuẩn mực & văn bản, hệ thống tài khoản Biscore (sinh từ dữ liệu), bộ dữ liệu Biscore
- Nhánh B: 9 bài theo BISC_STYLE §10, file thực hành `public/files/thuc-hanh-excel-biscore-T12.xlsx` (3 bài tập + đáp án)
- Thành phần mới: AllowanceCalc, InterestCalc, JEFilter, MiniWPForm, Flashcards

## 2026-11-05 · Bước 5 — Chuẩn bị triển khai
- `vercel.json`, `package-lock.json`, `engines.node = 22.x`; `noindex` + `robots.txt`
- `docs/HUONG_DAN_TRIEN_KHAI.md`: GitHub Desktop → Vercel, quy trình cập nhật, Cloudflare Pages dự phòng
- Sửa theo review độc lập Bước 4: tách BOR-03 (VAY03, Confirmed) và BOR-04 (VAY04, Further evidence); thêm FA-03 khấu hao theo ngày (TT45/2013, khoảng 0,23 tỷ, Further evidence); ghi rõ tình huống giả định ở thư xác nhận 3.2; trích đúng nguồn chính sách; khôi phục bài tập gốc SUMIFS (BT1 TB, BT2 tháng) và công thức gốc DAX ở nhánh B, phần Biscore đánh dấu mở rộng; thêm mã RP vào GLOSSARY.
