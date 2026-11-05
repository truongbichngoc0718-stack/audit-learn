---
name: build-lesson
description: Viết hoặc sửa một bài giảng của Audit Learning Hub (BISC) đúng chuẩn BISC_STYLE và LESSON_GUIDE. Dùng khi được yêu cầu tạo bài mới, mở rộng bài, hoặc chuyển nội dung từ /source vào /src/content.
---
# build-lesson

## Đầu vào
id bài (theo docs/CONTENT_MAP.md) hoặc mô tả bài mới + nguồn.

## Các bước (không bỏ bước)
1. Đọc `docs/CONTENT_MAP.md`, `docs/CHANGELOG.md` → xác định bài, nguồn, trạng thái.
2. Đọc `docs/BISC_STYLE.md` (ghi lại style_version hiện hành), `docs/GLOSSARY.md`, `docs/LESSON_GUIDE.md`.
3. Đọc bài mẫu cùng loại: kỹ thuật → `a1-1-tb-gl-subledger`, materiality → `a2-1-om-pm-ctt`, phần hành → `a3-1-doanh-thu`.
4. Đọc nguồn trong `/source`: ebook md theo id gốc (`outline.json`), số liệu BISCORE đọc trực tiếp từ file Excel bằng script (ghi file/sheet/ô), ghi chú `source/ebooks/notes/`. Không viết từ trí nhớ.
5. Áp bộ lọc kiến thức (BISC_STYLE §1). Phần không qua → để ở `source/library`, không đưa vào bài.
6. Viết MDX từ khuôn `docs/templates/lesson-<loại>.mdx`. Nội dung ngoài ebook bọc `<Extended basis="…">`.
7. `npm run build` phải không lỗi (schema frontmatter). Mở trang bằng trình duyệt để kiểm tra hiển thị.
8. Giao một agent riêng (chưa xem quá trình viết) review theo checklist BISC_STYLE §9, đối chiếu nguồn; sửa đến khi đạt hết 12 tiêu chí.
9. Ghi `docs/CHANGELOG.md`, cập nhật cột trạng thái trong CONTENT_MAP.
10. Báo ngắn bằng tiếng Việt: bài nào, nguồn nào, điểm review, chỗ mở rộng.

## Không được
- Sửa `docs/BISC_STYLE.md` (chỉ người dùng duyệt phiên bản mới).
- Chép nguyên văn tài liệu bên thứ ba lên web; xóa file (chuyển vào `_to_delete/`).
