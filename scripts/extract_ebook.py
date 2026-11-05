"""HTML ebook BISC (srcdoc) -> Markdown sạch + ảnh tách riêng + outline.
Dùng: python3 scripts/extract_ebook.py source/ebooks/html/<file>.html source/ebooks/md/<slug>
"""
import sys,os,re,base64,hashlib,json
from bs4 import BeautifulSoup
from markdownify import markdownify as md
src,outdir=sys.argv[1],sys.argv[2]
os.makedirs(os.path.join(outdir,'img'),exist_ok=True)
html=open(src,encoding='utf-8').read()
outline=[]
def save_img(tag):
    s=tag.get('src','')
    m=re.match(r'data:image/(\w+)[^;]*;base64,(.*)',s,re.S)
    if m:
        ext=m.group(1).replace('svg+xml','svg').replace('jpeg','jpg'); data=base64.b64decode(m.group(2))
        name=hashlib.md5(data).hexdigest()[:10]+'.'+ext
        open(os.path.join(outdir,'img',name),'wb').write(data); tag['src']='img/'+name
def convert(html,depth=0,label='main'):
    soup=BeautifulSoup(html,'html.parser')
    parts=[]
    # nested iframes (ebook wrapper) -> convert separately
    for i,f in enumerate(soup.find_all('iframe')):
        if f.get('srcdoc'):
            sub=f"{label}_frame{i+1}"
            convert(f['srcdoc'],depth+1,sub)
            f.replace_with(soup.new_string(f'\n[→ Nội dung khung lồng: {sub}.md]\n'))
    js=[t.string or '' for t in soup.find_all('script')]
    js=[x for x in js if re.search(r'[àáảãạăâđêôơưếềểễệốồổỗộớờởỡợứừửữựíìỉĩị]',x)]
    if js: open(os.path.join(outdir,label+'_scripts.js'),'w',encoding='utf-8').write('\n\n/* ---- script ---- */\n'.join(js))
    for t in soup(['script','style','noscript','link','meta']): t.decompose()
    for t in soup.find_all('svg'):
        if len(str(t))>4000: t.replace_with(soup.new_string('[sơ đồ SVG]'))
    for im in soup.find_all('img'): save_img(im)
    for h in soup.find_all(['h1','h2','h3']):
        sec=h.find_parent(['section','div'],id=True)
        outline.append({'file':label,'level':h.name,'id':sec.get('id') if sec else None,'text':h.get_text(' ',strip=True)})
    body=soup.body or soup
    title=soup.title.get_text(strip=True) if soup.title else label
    text=md(str(body),heading_style='ATX',bullets='-')
    text=re.sub(r'\n{3,}','\n\n',text)
    head=f"---\nsource_html: {os.path.basename(src)}\npart: {label}\ntitle: \"{title}\"\n---\n\n"
    open(os.path.join(outdir,label+'.md'),'w',encoding='utf-8').write(head+text)
    print(label,len(text),'chars')
convert(html)
json.dump(outline,open(os.path.join(outdir,'outline.json'),'w',encoding='utf-8'),ensure_ascii=False,indent=1)
print('headings',len(outline),'imgs',len(os.listdir(os.path.join(outdir,'img'))))
