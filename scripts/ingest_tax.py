"""Nạp bộ ACCA TX-VNM (BISC) vào source/library/acca-tx-vnm/.

Cách chạy:  python scripts/ingest_tax.py <thư mục Tax>
Cần poppler (pdftotext). Tầng thư viện: giữ nguyên ý nguồn, chỉ làm sạch khoảng trắng,
đánh dấu số trang PDF gốc ("### tr. N") để trích dẫn. Đề thi dạng ảnh: OCR riêng (scripts/ocr_tax_exams.py).
"""
import re, subprocess, sys
from pathlib import Path

SRC = Path(sys.argv[1] if len(sys.argv) > 1 else '.')
OUT = Path(__file__).resolve().parent.parent / 'source' / 'library' / 'acca-tx-vnm'

# (file, đích, tiêu đề, phần syllabus)
DOCS = [
    ('tx-vnm-syllabus-and-study-guide-j26-j27.pdf', 'syllabus.md', 'Syllabus & Study guide J26–J27 (ACCA)', 'all'),
    ('tx-vnm-taxtables-j26-j27.pdf', 'tax-tables-j26-j27.md', 'Tax rates & allowances J26–J27 (cho trong đề)', 'all'),
    ('bisc-tx-vnm-taxation-chapter-0.pdf', 'study/ch0-intro.md', 'Chapter 0 · Introduction', 'A'),
    ('bisc-tx-vnm-taxation-chapter-1.pdf', 'study/ch1-tax-admin.md', 'Chapter 1 · Tax system & administration', 'A'),
    ('bisc-tx-vnm-taxation-chapter-2.pdf', 'study/ch2-pit.md', 'Chapter 2 · Personal income tax', 'B'),
    ('tx-vnm-taxation-chapter-3.pdf', 'study/ch3-cit.md', 'Chapter 3 · Corporate income tax', 'C'),
    ('tx-vnm-taxation-chapter-4-1.pdf', 'study/ch4-vat.md', 'Chapter 4 · Value added tax', 'E'),
    ('bisc-acca-tx-vnm-fct.pdf', 'study/ch5-fct.md', 'Chapter 5 · Foreign contractor tax', 'D'),
    ('bisc-tx-chapter-1-revision.pdf', 'revision/r1-tax-admin.md', 'Revision 1 · Tax administration', 'A'),
    ('bisc-tx-chapter-2-revision.pdf', 'revision/r2-pit.md', 'Revision 2 · PIT', 'B'),
    ('bisc-tx-chapter-3-revison.pdf', 'revision/r3-cit.md', 'Revision 3 · CIT', 'C'),
    ('bisc-tx-chapter-4-revison.pdf', 'revision/r4-vat.md', 'Revision 4 · VAT', 'E'),
    ('bisc-tx-chapter-5-revison.pdf', 'revision/r5-fct.md', 'Revision 5 · FCT', 'D'),
]
EXAMS = 'past-exam-cac-nam (1)/past-exam-cac-nam'
EXAM_TEXT = [  # đề/đáp án có lớp text
    ('1. Question/F6_Past exam papers_Until Dec17_ Đề bài.pdf', 'exams/until-dec17/question.md', 'F6 VNM past papers ≤ Dec 2017 · Đề'),
    ('2. Answer/F6_Past exam papers_ Until Dec17_Đáp án.pdf', 'exams/until-dec17/answer.md', 'F6 VNM past papers ≤ Dec 2017 · Đáp án'),
    ('1. Question/txvnm-2018-jun- Đề bài.pdf', 'exams/2018-jun/question.md', 'TX-VNM Jun 2018 · Đề'),
    ('2. Answer/txvnm-2018-jun- Đáp án.pdf', 'exams/2018-jun/answer.md', 'TX-VNM Jun 2018 · Đáp án'),
    ('1. Question/txvnm-2018-dec- Đề bài.pdf', 'exams/2018-dec/question.md', 'TX-VNM Dec 2018 · Đề'),
    ('2. Answer/txvnm-2018-dec- Đáp án.pdf', 'exams/2018-dec/answer.md', 'TX-VNM Dec 2018 · Đáp án'),
    ('1. Question/TXVNM-2019-Jun- Đề bài.pdf', 'exams/2019-jun/question.md', 'TX-VNM Jun 2019 · Đề'),
    ('2. Answer/txvnm-2019-jun- Đáp án.pdf', 'exams/2019-jun/answer.md', 'TX-VNM Jun 2019 · Đáp án'),
    ('2. Answer/J20 TX VNM Sample - Suggested Solutions and Marking Schemes v1.0 (1).pdf', 'exams/2020-sample/answer.md', 'TX-VNM CBE sample (J20) · Đáp án + marking scheme'),
]
NOISE = re.compile(r'^\s*(bisc\.edu\.vn|www\.bisc.*|BISC\.EDU\.VN.*|© ACCA.*All rights reserved\.?)\s*$', re.I)


def pdf_pages(pdf: Path):
    txt = subprocess.run(['pdftotext', '-layout', str(pdf), '-'], capture_output=True, text=True).stdout
    return txt.split('\f')


def clean(text: str) -> str:
    out, blank = [], 0
    for ln in text.splitlines():
        ln = re.sub(r'\s{3,}', '   ', ln.rstrip())
        if NOISE.match(ln):
            continue
        if not ln.strip():
            blank += 1
            if blank > 1:
                continue
        else:
            blank = 0
        out.append(ln)
    return '\n'.join(out).strip()


def write(src: Path, dest: str, title: str, part: str = ''):
    pages = pdf_pages(src)
    body = [f'# {title}\n', f'> Nguồn: `{src.name}` · {len([p for p in pages if p.strip()])} trang · phần syllabus: {part or "—"}  ',
            '> Tầng thư viện: giữ nguyên ý nguồn. Trích dẫn theo "tr. N" (số trang PDF).\n']
    for i, p in enumerate(pages, 1):
        c = clean(p)
        if c:
            body.append(f'\n### tr. {i}\n\n```text\n{c}\n```')
    f = OUT / dest
    f.parent.mkdir(parents=True, exist_ok=True)
    f.write_text('\n'.join(body) + '\n', encoding='utf-8')
    return dest, len(pages)


def main():
    done = []
    for fn, dest, title, part in DOCS:
        done.append((write(SRC / fn, dest, title, part), title, part))
    for fn, dest, title in EXAM_TEXT:
        done.append((write(SRC / EXAMS / fn, dest, title, 'exam'), title, 'exam'))
    print('\n'.join(f'{d[0][0]}\t{d[0][1]} tr.\t{d[1]}' for d in done))


if __name__ == '__main__':
    main()
