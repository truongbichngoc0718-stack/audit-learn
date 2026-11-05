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
