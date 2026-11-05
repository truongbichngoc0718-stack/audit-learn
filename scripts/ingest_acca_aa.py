"""Nạp bộ ACCA AA của BISC (slide 341 trang + 5 Skills Checkpoint) vào source/library/acca-aa/.

Cách chạy:  python scripts/ingest_acca_aa.py <thư mục chứa PDF>
Cần poppler (pdftotext). Tầng thư viện: giữ nguyên ý nguồn, chỉ làm sạch khoảng trắng,
đánh dấu số trang PDF gốc để trích dẫn (vd. "slide tr. 51").
"""
import re
import subprocess
import sys
from pathlib import Path

SRC = Path(sys.argv[1] if len(sys.argv) > 1 else '.')
OUT = Path(__file__).resolve().parent.parent / 'source' / 'library' / 'acca-aa'

SLIDE = 'bissc-acca-aa-slide.pdf'
# (chương, tiêu đề, trang PDF bắt đầu, phần syllabus) — trang lấy từ trang bìa chương trong slide
CHAPTERS = [
    (0, 'Introduction: ACCA, capabilities, exam format', 1, 'Intro'),
    (1, 'The concept of audit and other assurance engagements', 4, 'A'),
    (2, 'Statutory audits and regulation', 16, 'A'),
    (3, 'Corporate governance', 28, 'A'),
    (4, 'Professional ethics and quality management procedures', 36, 'A'),
    (5, 'Risk assessment', 71, 'B'),
    (6, 'Audit planning and documentation', 109, 'B'),
    (7, 'Introduction to audit evidence', 119, 'D'),
    (8, 'Internal control', 134, 'C'),
    (9, 'Tests of controls', 149, 'C'),
    (10, 'Internal audit', 180, 'C'),
    (11, 'Audit sampling and automated tools and techniques', 191, 'D'),
    (12, 'Non-current assets', 205, 'D'),
    (13, 'Inventory', 225, 'D'),
    (14, 'Receivables', 242, 'D'),
    (15, 'Bank and cash', 262, 'D'),
    (16, 'Payables and accruals', 274, 'D'),
    (17, "Non-current liabilities, capital and directors' emoluments", 289, 'D'),
    (18, 'Not-for-profit organisations', 304, 'D'),
    (19, 'Audit review and finalisation', 312, 'E'),
    (20, 'Reports', 323, 'E'),
]
CHECKPOINTS = [
    (1, 'Chương 1–4 · Audit framework & corporate governance'),
    (2, 'Chương 4–6 · Ethics & risk assessment'),
    (3, 'Chương 8–10 · Internal control'),
    (4, 'Chương 7, 11–18 · Audit substantive procedures'),
    (5, 'Chương 19–20 · Audit review & reporting'),
]
FOOTER = re.compile(r'^\s*(Ha Long Giang, FCCA, CPA.*|bisconline\.edu\.vn|BISC\.EDU\.VN.*)\s*$', re.I)


def pages(pdf: Path, layout: bool):
    args = ['pdftotext'] + (['-layout'] if layout else []) + [str(pdf), '-']
    txt = subprocess.run(args, capture_output=True, text=True, check=True).stdout
    return txt.split('\f')


def clean(lines):
    out, blank = [], 0
    for ln in lines:
        ln = ln.rstrip()
        if FOOTER.match(ln):
            continue
        if not ln.strip():
            blank += 1
            if blank > 1:
                continue
        else:
            blank = 0
        out.append(ln)
    return '\n'.join(out).strip()


def slide_md(text: str) -> str:
    # Mỗi trang PDF = 2 slide in; số slide đứng riêng một dòng ngay sau nội dung slide.
    lines = [re.sub(r'\s{2,}', '  ', l).strip() for l in text.splitlines()]
    body = clean(lines)
    body = re.sub(r'\n(\d{1,3})\n\n\1\n', r'\n*(slide \1)*\n', body)  # "21 \n\n21" → nhãn slide
    return body


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / 'slide').mkdir(exist_ok=True)
    (OUT / 'checkpoint').mkdir(exist_ok=True)

    sp = pages(SRC / SLIDE, layout=False)
    n = len([p for p in sp if p.strip()])
    idx = ['---', 'nguon: BISC · ACCA AA (Audit & Assurance) · GV Hà Long Giang FCCA, CPA; checkpoint đồng soạn Nguyễn Kiên Cường ACCA',
           f'file_goc: {SLIDE} ({n} trang PDF, mỗi trang 2 slide) + bisc-acca-aa-check-point-1…5.pdf',
           'ngon_ngu: tiếng Anh', 'ngay_nap: 2026-11-05', '---', '',
           '# Thư viện · ACCA AA (Audit & Assurance)', '',
           'Tầng nguồn trung lập: văn bản trích từ PDF, chưa viết lại theo BISC_STYLE. '
           'Bảng và sơ đồ trong slide mất bố cục khi trích; khi viết bài cần xem ảnh trang gốc (`pdftoppm -f N -l N`).', '',
           '## Slide theo chương', '', '| Ch | Phần syllabus | Tiêu đề | Trang PDF | File |', '|---|---|---|---|---|']
    for i, (ch, title, start, part) in enumerate(CHAPTERS):
        end = CHAPTERS[i + 1][2] - 1 if i + 1 < len(CHAPTERS) else n
        # trang bìa chương có thể chứa cuối chương trước → chương trước kết thúc tại trang bìa
        if i + 1 < len(CHAPTERS):
            end = CHAPTERS[i + 1][2]
        parts = [f'# Chương {ch} · {title}', '',
                 f'> Nguồn: `{SLIDE}` trang {start}–{end} · syllabus phần {part}', '']
        for pno in range(start, end + 1):
            parts += [f'<!-- trang {pno} -->', f'### Trang {pno}', '', slide_md(sp[pno - 1]), '']
        fn = f'slide/ch{ch:02d}.md'
        (OUT / fn).write_text('\n'.join(parts), encoding='utf-8')
        idx.append(f'| {ch} | {part} | {title} | {start}–{end} | [{fn}]({fn}) |')

    idx += ['', 'Phần syllabus: A Framework & regulation · B Planning & risk assessment · C Internal control · '
            'D Audit evidence · E Review & reporting.', '', '## Skills Checkpoint', '',
            'Mỗi checkpoint: 1 Knowledge revision (mindmap/bảng) → 2 Exam techniques → 3 Practice (MCQ + constructed response, có đáp án) → 4 Mock test.', '',
            '| # | Phạm vi | Trang | File |', '|---|---|---|---|']
    for k, scope in CHECKPOINTS:
        f = SRC / f'bisc-acca-aa-check-point-{k}.pdf'
        cp = [p for p in pages(f, layout=True)]
        parts = [f'# Skills Checkpoint {k} · {scope}', '', f'> Nguồn: `{f.name}` ({len([p for p in cp if p.strip()])} trang)', '']
        for pno, p in enumerate(cp, 1):
            if not p.strip():
                continue
            parts += [f'<!-- trang {pno} -->', f'### Trang {pno}', '', '```text', clean(p.splitlines()), '```', '']
        fn = f'checkpoint/cp{k}.md'
        (OUT / fn).write_text('\n'.join(parts), encoding='utf-8')
        idx.append(f'| {k} | {scope} | {len([p for p in cp if p.strip()])} | [{fn}]({fn}) |')

    (OUT / 'index.md').write_text('\n'.join(idx) + '\n', encoding='utf-8')
    print('OK', OUT)


if __name__ == '__main__':
    main()
