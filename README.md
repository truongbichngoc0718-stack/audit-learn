# Audit Learning Hub (BISC)
Hệ thống học Audit Simulation 2026: Training + Simulation hợp nhất theo phần hành, case Biscore, nhánh Excel/Power BI.

## Chạy trên máy
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # kiểm tra frontmatter + build tĩnh vào dist/
```

## Cấu trúc
- `source/`: nguồn gốc duy nhất (ebook HTML gốc + Markdown, dữ liệu BISCORE đã kiểm kê). Đồng bộ lên Google Drive/NotebookLM.
- `src/content/docs/`: bài giảng MDX (`a/0…4`, `b`, `thu-vien`).
- `src/components/`: thành phần bài giảng + React islands; `src/lib/store.ts`: tiến độ/ghi chú (localStorage, sẵn chỗ gắn Supabase).
- `docs/`: BISC_STYLE, GLOSSARY, LESSON_GUIDE, CONTENT_MAP, CHANGELOG, templates.
- `.claude/skills/build-lesson/`: skill viết bài đúng chuẩn.
- `scripts/`: trích xuất ebook, kiểm kê BISCORE.
