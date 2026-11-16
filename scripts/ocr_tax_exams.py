"""OCR đề thi TX-VNM dạng ảnh (Jun 21 → Dec 24 + CBE sample J20) vào source/library/acca-tx-vnm/exams/.

Cách chạy:  python scripts/ocr_tax_exams.py <thư mục Tax>
Cần tesseract (eng) + pdftoppm. Đề: ảnh trong file .xlsx (mỗi sheet 1 ảnh, theo thứ tự sheet).
Đáp án: PDF scan. OCR tiếng Anh trên ảnh chụp màn hình sạch, độ chính xác ước tính ~95%;
số liệu bảng có thể lệch cột → luôn đối chiếu ảnh gốc trước khi dùng số.
"""
import re, subprocess, sys, tempfile, zipfile
from pathlib import Path

SRC = Path(sys.argv[1] if len(sys.argv) > 1 else '.') / 'past-exam-cac-nam (1)/past-exam-cac-nam'
OUT = Path(__file__).resolve().parent.parent / 'source' / 'library' / 'acca-tx-vnm' / 'exams'
SITTINGS = [
    ('2021-jun', 'F6 - past exam - Jun 21.xlsx', 'F6 past exam - Jun 21 - Ans.pdf'),
    ('2021-dec', 'F6 - past exam -  Dec 21.xlsx', 'F6 past exam - Dec 21 - Ans.pdf'),
    ('2022-jun', 'F6 - past exam -  Jun  2022.xlsx', 'F6 past exam - Jun 22 - Ans.pdf'),
    ('2022-dec', 'F6 - past exam - Dec 2022.xlsx', 'F6 past exam - Dec 22 - Ans.pdf'),
    ('2023-jun', 'F6 - past exam -  Jun 23.xlsx', 'F6 past exam - Jun 23 - Ans.pdf'),
    ('2023-dec', 'F6 - past exam -  Dec 23.xlsx', 'F6 past exam - Dec 23 - Ans.pdf'),
    ('2024-dec', 'F6.TX - Past exam Dec 24- Question.xlsx', 'F6 - Past exam Dec 24 - Answer.pdf'),
]
SAMPLE_Q = 'TX (VNM) -  July 20 CBE Sample Questions (1).pdf'


CACHE = Path.home() / '.ocr_tax_cache'


def ocr(img: Path) -> str:
    """OCR có cache theo nội dung ảnh, để chạy lại theo từng đợt ngắn."""
    import hashlib
    CACHE.mkdir(exist_ok=True)
    key = CACHE / (hashlib.sha1(img.read_bytes()).hexdigest() + '.txt')
    if key.exists():
        return key.read_text(encoding='utf-8')
    r = subprocess.run(['tesseract', str(img), '-', '-l', 'eng', '--psm', '4'], capture_output=True, text=True)
    out = re.sub(r'\n{3,}', '\n\n', r.stdout).strip()
    key.write_text(out, encoding='utf-8')
    return out


def xlsx_images(xlsx: Path, tmp: Path):
    """Ảnh theo thứ tự sheet → drawing → media."""
    z = zipfile.ZipFile(xlsx)
    names = set(z.namelist())
    wb = z.read('xl/workbook.xml').decode('utf8')
    wbrels = z.read('xl/_rels/workbook.xml.rels').decode('utf8')
    rid2t = dict(re.findall(r'Id="(rId\d+)"[^>]*Target="([^"]+)"', wbrels)) | {a: b for b, a in re.findall(r'Target="([^"]+)"[^>]*Id="(rId\d+)"', wbrels)}
    out = []
    for sname, rid in re.findall(r'<sheet [^>]*name="([^"]*)"[^>]*r:id="(rId\d+)"', wb):
        sheet = 'xl/' + rid2t[rid].lstrip('/').replace('xl/', '')
        srel = sheet.replace('worksheets/', 'worksheets/_rels/') + '.rels'
        if srel not in names:
            continue
        for d in re.findall(r'Target="\.\./drawings/(drawing\d+\.xml)"', z.read(srel).decode('utf8')):
            drel = f'xl/drawings/_rels/{d}.rels'
            if drel not in names:
                continue
            for m in re.findall(r'Target="\.\./media/([^"]+)"', z.read(drel).decode('utf8')):
                p = tmp / f'{len(out):03d}_{m}'
                p.write_bytes(z.read('xl/media/' + m))
                out.append((sname, p))
    return out


def pdf_images(pdf: Path, tmp: Path):
    subprocess.run(['pdftoppm', '-r', '200', '-png', str(pdf), str(tmp / 'p')], check=True)
    return sorted(tmp.glob('p-*.png'))


def write(dest: Path, title: str, src: str, blocks):
    dest.parent.mkdir(parents=True, exist_ok=True)
    head = [f'# {title}\n', f'> Nguồn: `{src}` · OCR tesseract (eng), độ chính xác ước tính ~95%.  ',
            '> ⚠️ Đề thi theo luật hiệu lực tại kỳ thi đó — không dùng số/quy tắc ở đây khi chưa đối chiếu luật áp dụng kỳ Dec 2026.\n']
    dest.write_text('\n'.join(head + [f'\n### {lab}\n\n```text\n{t}\n```' for lab, t in blocks]) + '\n', encoding='utf-8')


def main():
    for key, qx, ap in SITTINGS:
        d = OUT / key
        if not (d / 'question.md').exists():
            with tempfile.TemporaryDirectory() as t:
                imgs = xlsx_images(SRC / '1. Question' / qx, Path(t))
                write(d / 'question.md', f'TX-VNM {key} · Đề', qx, [(f'sheet {s}', ocr(p)) for s, p in imgs])
            print(key, 'question', len(imgs), flush=True)
        if not (d / 'answer.md').exists():
            with tempfile.TemporaryDirectory() as t:
                imgs = pdf_images(SRC / '2. Answer' / ap, Path(t))
                write(d / 'answer.md', f'TX-VNM {key} · Đáp án', ap, [(f'tr. {i}', ocr(p)) for i, p in enumerate(imgs, 1)])
            print(key, 'answer', len(imgs), flush=True)
    d = OUT / '2020-sample'
    if not (d / 'question.md').exists():
        with tempfile.TemporaryDirectory() as t:
            imgs = pdf_images(SRC / '1. Question' / SAMPLE_Q, Path(t))
            write(d / 'question.md', 'TX-VNM CBE sample (J20) · Đề', SAMPLE_Q, [(f'tr. {i}', ocr(p)) for i, p in enumerate(imgs, 1)])
        print('sample question', len(imgs), flush=True)


if __name__ == '__main__':
    main()
