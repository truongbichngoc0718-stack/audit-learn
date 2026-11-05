# LESSON_GUIDE: quy trình & khuôn bài giảng
Áp dụng cho mọi bài trong `src/content/docs/`. Phong cách: **BISC_STYLE.md** (bắt buộc đọc trước). Ngưỡng ví dụ Biscore: OM 3,6 tỷ · PM 2,2 tỷ · CTT 180 triệu. Thuật ngữ: **GLOSSARY.md**.
Bài mẫu chuẩn (golden lessons): `a1-1-tb-gl-subledger`, `a2-1-om-pm-ctt`, `a3-1-doanh-thu`. Mọi bài mới phải đối chiếu với bài mẫu cùng loại.

## 1. Quy trình viết một bài
1. Đọc `docs/CONTENT_MAP.md` → lấy id, tiêu đề, nguồn của bài.
2. Đọc **nguồn trong /source** (không viết từ trí nhớ): đoạn ebook tương ứng (`source/ebooks/md/...`, tìm theo id gốc trong `outline.json`), dữ liệu BISCORE (`source/biscore/INVENTORY.md` → mở file Excel thật để lấy số), ghi chú cá nhân nếu có.
3. Đọc BISC_STYLE.md + GLOSSARY.md + bài mẫu cùng loại.
4. Viết bằng khuôn ở mục 3 (`docs/templates/lesson-*.mdx`).
5. Phần ngoài ebook → bọc trong `<Extended basis="…">`.
6. `npm run build` (schema kiểm tra frontmatter) → mở trang kiểm tra hiển thị.
7. Giao agent review độc lập theo checklist BISC_STYLE §9 → sửa đến khi đạt.
8. Ghi `docs/CHANGELOG.md` (+ trang "Mới cập nhật" đọc từ đó), cập nhật trạng thái trong CONTENT_MAP.

## 2. Frontmatter (bắt buộc, kiểm tra bằng schema trong `src/content.config.ts`)
```yaml
---
title: TB, GL và subledger            # ≤ 6 từ
description: Kết luận trên TB, chọn mẫu trên GL, test trên chứng từ.   # = takeaway 1 câu
id: a1-1-tb-gl-subledger              # theo CONTENT_MAP
nhanh: A                              # A (Kiểm toán) | B (Excel/Power BI) | lib (Thư viện)
phan: 1                               # 0–4 (nhánh A); b (nhánh B)
bai: "1.1"                            # số bài hiển thị
nhan: Bộ dữ liệu kế toán              # chủ đề ngắn trong nhãn "Bài 1.1 — … · 4 phút" (phần hành: "Chu trình 01")
loai: ky-thuat                        # tong-quan | ky-thuat | phan-hanh | kiem-tra | thu-vien | excel
thoi_luong: 4                         # phút
nguon:                                # nơi lấy nội dung, trỏ vào /source
  - "T#p1l1"                          # ebook 1, id gốc
  - "B:Công nợ phải thu.xlsx/04"      # dữ liệu BISCORE
assertion: [Completeness, Accuracy]   # có thể rỗng
chuan_muc: ["VSA 500"]                # có thể rỗng
ngay_cap_nhat: 2026-11-05
trang_thai: goc                       # goc | mo-rong | gop
style_version: "1.0"
lien_ket: [b3-sumifs]                 # (tùy chọn) bài liên quan, link chéo nhánh
---
```

## 3. Khuôn theo loại bài
Thành phần MDX (định nghĩa ở `src/components/`). Mỗi bài import một dòng: `import { Eyebrow, QuickCheck, … } from '@components';`
**Tự động, không cần viết:** header bài (breadcrumb · "Bài x.y · n phút" · tiêu đề · takeaway · chip assertion/chuẩn mực) sinh từ frontmatter; điều hướng trước/sau do Starlight tạo theo thứ tự sidebar (`sidebar.order`).
Thành phần React cần directive: `<Quiz client:visible …/>`, `<FlowDiagram client:visible …/>`, `<LessonNotes client:only="react" id="…"/>`, máy tính `client:visible`.

| Thành phần | Dùng cho |
|---|---|
| `<Objectives>` | Mục tiêu bài / "Sau Phần n, bạn sẽ:" |
| `<Eyebrow>` | Nhãn nhỏ trên H2 ("Dòng chảy số liệu", "Thử ngay"…) |
| `<FlowDiagram steps={[…]} />` | Sơ đồ dòng chảy bấm được (vd. Chứng từ → Subledger → GL → TB → BCTC) |
| `<IfSkipped>` | ⚠️ "Nếu bỏ qua: …" |
| `<KeyPrinciple>` | 🔑 nguyên tắc then chốt |
| `<QuickCheck q="…" short="Chưa">…giải thích…</QuickCheck>` | Kiểm tra nhanh, bấm xem đáp án |
| `<AuditCard question tk assertion data />` | Thẻ đầu bài phần hành |
| `<AuditStep n label assertion direction output>` | Một bước audit program (direction: vouching / tracing / ca-hai / —) |
| `<RedFlags items={[…]} />` | 4 thẻ dấu hiệu |
| `<BiscoreExample source="…">…<Solution>…</Solution></BiscoreExample>` | Ví dụ số liệu BISCORE, lời giải ẩn |
| `<Extended basis="VSA 530">…</Extended>` | Nội dung mở rộng ngoài ebook |
| `<Quiz id questions={[{q, options, answer, explain}]} target />` | Bài kiểm tra 4 câu có giải thích |
| `<LessonNotes />` | Ghi chú cá nhân (localStorage) |
| Máy tính: `<MaterialityCalc />` `<ProjectionCalc />` `<SampleSizeCalc />` `<DirectionDrill />` | Tương tác (React islands) |

### 3.1 Bài kỹ thuật
Objectives → [Eyebrow + H2 + nội dung + FlowDiagram] × n → (khi so sánh tài liệu/khái niệm ngang hàng) thẻ "tài liệu · làm gì · vai trò" (bảng chỉ khi so nhiều chiều) → ví dụ số (minh họa) → BiscoreExample → IfSkipped + KeyPrinciple → QuickCheck → LessonNotes.

### 3.2 Bài phần hành
AuditCard → Objectives → Eyebrow "Audit program" + danh sách bước → **AuditStep 1 Hiểu quy trình** (khâu · chứng từ · kiểm soát; 3 rủi ro → bước) → **AuditStep 2 Reconcile** → AuditStep 3–5 **đúng theo bảng BISC_STYLE §4** (Doanh thu 3–6, tổng 7 bước) → AuditStep cuối Kết luận (chuỗi cố định) → QuickCheck → RedFlags (2–4 thẻ) → **Thực hành BISCORE** (BiscoreExample, mỗi bước 1 bài tập) → IfSkipped + KeyPrinciple → Quiz 4 câu → LessonNotes.

### 3.3 Trang tổng quan Phần / bài kiểm tra
Tổng quan: ảnh + "Phần n · x phút" + 1 câu lý do + Objectives (2 nhóm × 3) + danh sách bài.
Kiểm tra: "n câu: … Mục tiêu: n/n." + Quiz.

### 3.4 Bài nhánh B (Excel/Power BI) · khuôn [SITE MỚI], giữ chuẩn trình bày BISC_STYLE §10
"Làm được gì sau bài" → thao tác từng bước (phím tắt dạng `<kbd>`) → bài tập trên dữ liệu BISCORE (file tải về) → "Dùng ở đâu trong kiểm toán" + link `lien_ket` sang phần hành → QuickCheck.

## 4. Quy ước khác
- Tên file = id (`src/content/docs/a/1/a1-1-tb-gl-subledger.mdx`).
- Ảnh lấy từ `source/ebooks/md/*/img/` copy sang `src/assets/lessons/` (giữ tên băm).
- Số liệu BISCORE: luôn ghi `source="Tên file.xlsx / sheet"`; số lấy bằng script đọc file, không gõ tay từ trí nhớ.
- Mọi thay đổi nội dung ghi CHANGELOG theo mẫu: `- [id] mô tả ngắn (gốc|mở rộng|sửa)`.
