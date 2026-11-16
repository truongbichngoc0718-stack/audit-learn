# STYLE_D · Khuôn nhánh D (ACCA TX-VNM)

Phiên bản **D-1.0-draft** (chờ duyệt). Nguồn: `docs/TAX_MAP.md` §11.

## Khuôn thẻ Tax Atlas
1. Tiêu đề: `EN term · Tiếng Việt`. Dòng 1: tóm tắt 1–2 câu tiếng Việt.
2. Quy tắc: gạch đầu dòng ngắn, số in đậm, mỗi số có nguồn dạng `r3:20` (revision CIT, trang 20), `tt:1` (bảng thuế J26–J27).
3. Công thức (nếu có) trong khối riêng. Ví dụ số chỉ lấy từ slide hoặc đề, không tự bịa.
4. ⚠️ Bẫy: tối đa 3 dòng. 🆕 nếu là quy định mới 2025–2026. Cờ `conflict` khi nguồn mâu thuẫn (xem TAX_MAP §9), không tự chọn.
5. "Liên quan": panel dây nối, tự sinh từ `src/data/tax/edges.json`; mỗi dây có `why_vi`.
6. Note cá nhân của người học: ô ghi chú lưu localStorage (`tax-progress-v1`), xuất/nhập JSON cùng tiến độ.
7. Không dùng thuật ngữ ngoài `docs/GLOSSARY.md` (mục "Thuế").
8. Frontmatter trang MDX: `nhanh: D`, `phan: d0…d7`, `loai: thue`, `style_version: "D-1.0-draft"`.

## Quy tắc dữ liệu
- Thẻ: `src/data/tax/cards-{a..e}.json` (sinh từ `_gen/*.py`, ★ MVP lấy từ TAX_MAP §5). Cây: `trees.json`. Bảng thuế: `tables-j26.ts` là nguồn duy nhất của máy tính và trang D7.
- Nguồn: chỉ `/source/library/acca-tx-vnm/`. Bình luận của người soạn trong r1 tr.6, tr.8 không đưa lên web.
- Nội dung ngoài slide phải ghi "mở rộng" kèm căn cứ pháp lý (trường `legal`).

## Checklist review
1. Mọi con số có nguồn đúng trang. 2. Không có số bị gạch ngang chọn nhầm. 3. Cờ conflict hiện đúng chỗ. 4. Thuật ngữ khớp GLOSSARY. 5. Ví dụ số có trong nguồn. 6. Bẫy ≤ 3 dòng.
