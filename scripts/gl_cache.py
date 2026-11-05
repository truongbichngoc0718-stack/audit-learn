"""Gộp 12 file sổ cái BISCORE thành 1 file pickle để phân tích nhanh (không commit file cache).
Dùng: python3 scripts/gl_cache.py <thư mục So cai GL theo thang> <file.pkl>"""
import sys,glob,os,pandas as pd
d,out=sys.argv[1],sys.argv[2]
fr=[]
for f in sorted(glob.glob(os.path.join(d,'*.xlsx'))):
    df=pd.read_excel(f,header=3,dtype={'Tài khoản':str,'TK đối ứng':str})
    df=df[df['STT'].astype(str).str.startswith('GL')]
    fr.append(df)
gl=pd.concat(fr,ignore_index=True)
for c in ['Phát sinh Nợ','Phát sinh Có']: gl[c]=pd.to_numeric(gl[c]).fillna(0)
gl['Ngày hạch toán']=pd.to_datetime(gl['Ngày hạch toán'],dayfirst=True)
gl.to_pickle(out); print(len(gl),'dòng', gl['Phát sinh Nợ'].sum()-gl['Phát sinh Có'].sum())
