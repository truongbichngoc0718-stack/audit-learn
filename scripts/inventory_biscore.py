import openpyxl,glob,os,sys
B=sys.argv[1]; out=sys.argv[2]
L=["# Kiểm kê tài liệu BISCORE","","Nguồn gốc: `"+os.path.relpath(B,os.path.dirname(os.path.dirname(os.path.dirname(out))))+"` (giữ nguyên, không sửa). Bảng dưới do `scripts/inventory_biscore.py` sinh tự động.",""]
for f in sorted(glob.glob(os.path.join(B,'**/*.*'),recursive=True)):
    rel=os.path.relpath(f,B); sz=os.path.getsize(f)//1024
    L.append(f"## {rel}  ({sz} KB)")
    if f.endswith('.pdf'): L.append("PDF → bản text: `source/biscore/"+os.path.basename(f)[:-4]+".md`"); L.append(""); continue
    wb=openpyxl.load_workbook(f,read_only=True,data_only=True)
    L.append("| Sheet | Dòng × Cột | Tiêu đề / dòng đầu |"); L.append("|---|---|---|")
    for ws in wb.worksheets:
        first=""
        for r in ws.iter_rows(values_only=True,max_row=3):
            v=[str(c) for c in r if c is not None]
            if v: first=" · ".join(v)[:140].replace('|','/').replace('\n',' '); break
        L.append(f"| {ws.title} | {ws.max_row}×{ws.max_column} | {first} |")
    L.append("")
open(out,'w',encoding='utf-8').write("\n".join(L))
print(len(L))
