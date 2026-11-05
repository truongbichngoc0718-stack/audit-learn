var GLOSS={"on field": ["/ɒn fiːld/", "làm việc tại văn phòng khách hàng"], "draft": ["/drɑːft/", "bản nháp"], "senior": ["/ˈsiːniə/", "kiểm toán viên cấp trên trực tiếp"], "manager": ["/ˈmænɪdʒə/", "quản lý cuộc kiểm toán"], "partner": ["/ˈpɑːtnə/", "thành viên ban lãnh đạo, ký báo cáo"], "deadline": ["/ˈdedlaɪn/", "hạn chót"], "available": ["/əˈveɪləbl/", "rảnh, có mặt để hỗ trợ"], "first impressions matter": ["", "ấn tượng đầu tiên rất quan trọng"], "professional presence": ["/prəˈfeʃənl ˈprezns/", "hình ảnh chuyên nghiệp"], "key takeaways": ["/kiː ˈteɪkəweɪz/", "điều cần mang về"], "pushback": ["/ˈpʊʃbæk/", "sự phản đối"]};
var PAGES=["intro", "b1", "b2", "b3", "b4", "b5", "b6"];
var LESSONS=PAGES.filter(function(p){return p!=='intro';});
var TITLES={"intro": "Tổng quan buổi học", "b1": "Block 1: Ấn tượng đầu tiên", "b2": "Block 2: Một ngày tại văn phòng khách hàng", "b3": "Block 3: Trao đổi với khách hàng", "b4": "Block 4: Xử lý số liệu và làm việc với team", "b5": "Block 5: Khi mọi việc không như kế hoạch", "b6": "Block 6: 5 điều ước gì mình biết sớm hơn"};
var POP=[];
var visited={};
function store(k,v){try{localStorage.setItem(k,v);}catch(e){}}
function load(k){try{return localStorage.getItem(k);}catch(e){return null;}}
function fm(n){var r=Math.round(n);return r.toString().replace(/\B(?=(\d{3})+(?!\d))/g,'.');}
function fm1(n){var r=Math.round(n*10)/10;var s=r.toFixed(r%1?1:0).split('.');return s[0].replace(/\B(?=(\d{3})+(?!\d))/g,'.')+(s[1]?','+s[1]:'');}

/* ---------- navigation ---------- */
function go(id){
  PAGES.forEach(function(p){var el=document.getElementById('page-'+p);if(el)el.classList.toggle('show',p===id);});
  document.querySelectorAll('.toc .navitem').forEach(function(a){a.classList.toggle('active',a.getAttribute('data-page')===id);});
  var mt=document.getElementById('mtitle');if(mt)mt.textContent=TITLES[id]||'';
  if(LESSONS.indexOf(id)>=0){var first=!visited[id];visited[id]=true;store('as_t2_visited',JSON.stringify(visited));}
  updateProgress();store('as_t2_last',id);window.scrollTo({top:0,behavior:'auto'});closeNav();
  var nl=document.getElementById('nhLesson');if(nl)nl.textContent=TITLES[id]||'';
  setupReveal(id);updateRead();modSync(id);
}
function updateProgress(){
  var done=LESSONS.filter(function(l){return visited[l];}).length;
  var pt=document.getElementById('progtext');if(pt)pt.textContent=done+'/'+LESSONS.length+' bài';
  var pf=document.getElementById('progfill');if(pf)pf.style.width=(done/LESSONS.length*100)+'%';
  LESSONS.forEach(function(l){var idx=document.querySelector('.nidx[data-idx="'+l+'"]');if(idx&&visited[l]&&!idx.classList.contains('done')&&idx.textContent!=='✎'){idx.classList.add('done');idx.textContent='✓';}});
  if(done===LESSONS.length&&!load('as_t2_allseen')){store('as_t2_allseen','1');toast('Bạn đã mở hết các bài của Training 1 🎉');confetti(60);}
}
function openNav(){document.getElementById('sidebar').classList.add('open');document.getElementById('scrim').classList.add('show');}
function closeNav(){document.getElementById('sidebar').classList.remove('open');document.getElementById('scrim').classList.remove('show');}
function tog(el){if(el)el.classList.toggle('open');}

/* ---------- scroll reveal + read bar ---------- */
var io=null;
function setupReveal(id){
  var pg=document.getElementById('page-'+id);if(!pg)return;
  var els=pg.querySelectorAll('section.block, .ix, .remember, .lessonnav');
  if(!('IntersectionObserver' in window)){return;}
  if(!io)io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px',threshold:0.05});
  els.forEach(function(el){if(el.classList.contains('in'))return;var r=el.getBoundingClientRect();if(r.top<window.innerHeight){el.classList.add('rv','in');return;}el.classList.add('rv');io.observe(el);});
}
function updateRead(){var h=document.documentElement.scrollHeight-window.innerHeight;var p=h>0?Math.min(1,window.scrollY/h):0;var b=document.getElementById('readbar');if(b)b.style.transform='scaleX('+p+')';}
window.addEventListener('scroll',updateRead,{passive:true});

/* ---------- celebration ---------- */
function toast(t){var el=document.getElementById('toast');el.textContent=t;el.classList.add('show');clearTimeout(el._t);el._t=setTimeout(function(){el.classList.remove('show');},2600);}
function confetti(n){n=n||40;var cs=['#F9C31F','#1C3A4A','#2E5A6E','#138a63','#5b4bbf','#c0413b'];
  for(var i=0;i<n;i++){var d=document.createElement('div');d.className='cf';d.style.left=(Math.random()*100)+'vw';d.style.background=cs[i%cs.length];
    d.style.animationDuration=(1.6+Math.random()*1.6)+'s';d.style.animationDelay=(Math.random()*.4)+'s';d.style.transform='rotate('+(Math.random()*360)+'deg)';
    document.body.appendChild(d);(function(x){setTimeout(function(){x.remove();},3800);})(d);}}
function win(msg){toast(msg||'Chính xác hết! 🎉');confetti(45);}

/* ---------- quiz ---------- */
function pick(btn){
  var q=btn.closest('.quizq');if(q.classList.contains('answered'))return;q.classList.add('answered');
  var correct=q.getAttribute('data-correct'),chosen=btn.getAttribute('data-k');
  q.querySelectorAll('.opt').forEach(function(o){o.classList.add('locked');if(o.getAttribute('data-k')===correct){o.classList.add('correct');o.innerHTML+=' ✓';}});
  if(chosen!==correct){btn.classList.add('incorrect');btn.innerHTML+=' ✗';}
  var ex=q.querySelector('.explain');if(ex)ex.classList.add('show');
  q.setAttribute('data-chosen',chosen);scoreQuiz(q.closest('.quiz'));
}
function scoreQuiz(quiz){
  var qs=quiz.querySelectorAll('.quizq'),tot=qs.length,ans=0,corr=0;
  qs.forEach(function(q){if(q.classList.contains('answered')){ans++;if(q.getAttribute('data-chosen')===q.getAttribute('data-correct'))corr++;}});
  var el=quiz.querySelector('.quizscore');if(!el)return;el.classList.add('show');
  var msg='Điểm hiện tại: <b>'+corr+'/'+tot+'</b>, đã làm '+ans+'/'+tot+' câu';
  if(ans===tot){msg='Kết quả: <b>'+corr+'/'+tot+'</b>. '+(corr===tot?'Xuất sắc! 🎉':(corr>=Math.ceil(tot*0.6)?'Làm tốt lắm!':'Xem lại các bài trong phần này rồi thử lại nhé.'))+' <button class="ixbtn" style="margin-left:8px" onclick="retryQuiz(this)">Làm lại</button>';
    if(corr===tot)win('Đúng hết '+tot+'/'+tot+' câu! 🎉');
    var pg=quiz.closest('.page');if(pg){var pid=pg.id.replace('page-','');if(/^cp/.test(pid)){store('as_t2_score_'+pid,corr+'/'+tot);showScore(pid,corr+'/'+tot);if(pid==='cp4')finishCheck(corr,tot);}}}
  el.innerHTML=msg;
}
function retryQuiz(b){var quiz=b.closest('.quiz');quiz.querySelectorAll('.quizq').forEach(function(q){q.classList.remove('answered');q.removeAttribute('data-chosen');var ex=q.querySelector('.explain');if(ex)ex.classList.remove('show');
  q.querySelectorAll('.opt').forEach(function(o){o.classList.remove('locked','correct','incorrect');o.innerHTML=o.innerHTML.replace(/ [✓✗]/g,'');});});
  var s=quiz.querySelector('.quizscore');s.classList.remove('show');s.innerHTML='';quiz.scrollIntoView({behavior:'smooth',block:'start'});}
function showScore(pid,s){var el=document.getElementById('ns-'+pid);if(el){el.textContent=s;el.classList.add('show');}}
function finishCheck(c,t){var b=document.getElementById('finishBox');if(!b)return;b.classList.add('done');
  document.getElementById('finishTxt').textContent=(c>=6?'Bạn đạt '+c+'/'+t+' câu, sẵn sàng cho Client Day. Hẹn gặp ở Training 2!':'Bạn đạt '+c+'/'+t+' câu. Xem lại các bài còn yếu rồi làm lại để đạt từ 6/8 nhé.');}

/* ---------- classify ---------- */
function clsPick(btn,i){
  var row=btn.closest('.cls-row');if(row.classList.contains('done'))return;
  var ok=+row.getAttribute('data-ok');
  if(i===ok){btn.classList.add('ok');row.classList.remove('miss');row.classList.add('done');row.querySelectorAll('.cls-b').forEach(function(b){b.disabled=true;});}
  else{btn.classList.add('no');row.classList.add('miss');setTimeout(function(){btn.classList.remove('no');},700);row.setAttribute('data-err',(+(row.getAttribute('data-err')||0))+1);}
  var box=row.closest('.cls'),rows=box.querySelectorAll('.cls-row'),done=box.querySelectorAll('.cls-row.done').length,firstTry=0;
  rows.forEach(function(r){if(r.classList.contains('done')&&!r.getAttribute('data-err'))firstTry++;});
  var sc=box.querySelector('.ix-score');sc.innerHTML='Đã làm đúng '+done+'/'+rows.length+(done===rows.length?' · đúng ngay lần đầu '+firstTry+'/'+rows.length:'');
  if(done===rows.length)win(firstTry===rows.length?'Đúng hết ngay lần đầu! 🎉':'Hoàn thành bài phân loại 👍');
}

/* ---------- order ---------- */
function ordTap(btn){
  var o=btn.closest('.ord');if(o.classList.contains('checked'))return;
  var slot=[].slice.call(o.querySelectorAll('.ord-slot')).filter(function(s){return !s.classList.contains('filled');})[0];if(!slot)return;
  slot.classList.add('filled');slot.setAttribute('data-i',btn.getAttribute('data-i'));var v=slot.querySelector('.ord-v');v.textContent=btn.textContent;
  v.onclick=function(){if(o.classList.contains('checked'))return;unplace(o,slot);};btn.classList.add('used');
}
function unplace(o,slot){var i=slot.getAttribute('data-i');var b=o.querySelector('.ord-b[data-i="'+i+'"]');if(b)b.classList.remove('used');
  slot.classList.remove('filled','ok','no');slot.removeAttribute('data-i');slot.querySelector('.ord-v').textContent='';
  /* compact: shift later items up */
  var slots=[].slice.call(o.querySelectorAll('.ord-slot')),items=slots.filter(function(s){return s.classList.contains('filled');}).map(function(s){return [s.getAttribute('data-i'),s.querySelector('.ord-v').textContent];});
  slots.forEach(function(s,k){s.classList.remove('filled');s.removeAttribute('data-i');s.querySelector('.ord-v').textContent='';if(items[k]){s.classList.add('filled');s.setAttribute('data-i',items[k][0]);s.querySelector('.ord-v').textContent=items[k][1];(function(ss){ss.querySelector('.ord-v').onclick=function(){if(!o.classList.contains('checked'))unplace(o,ss);};})(s);}});}
function ordCheck(b){
  var o=b.closest('.ord'),slots=o.querySelectorAll('.ord-slot'),out=o.querySelector('.ix-out'),n=slots.length,filled=o.querySelectorAll('.ord-slot.filled').length;
  if(filled<n){out.className='ix-out show mid';out.textContent='Còn '+(n-filled)+' thẻ chưa xếp.';return;}
  var right=0;slots.forEach(function(s,k){var ok=+s.getAttribute('data-i')===k;s.classList.add(ok?'ok':'no');if(ok)right++;});
  o.classList.add('checked');
  if(right===n){out.className='ix-out show good';out.innerHTML='✅ Đúng thứ tự!';win('Sắp xếp chính xác! 🎉');}
  else{out.className='ix-out show bad';out.innerHTML='Đúng vị trí '+right+'/'+n+'. Các ô đỏ đang sai chỗ, bấm “Làm lại” để thử tiếp.';}
}
function ordReset(b){var o=b.closest('.ord');o.classList.remove('checked');o.querySelectorAll('.ord-b').forEach(function(x){x.classList.remove('used');});
  o.querySelectorAll('.ord-slot').forEach(function(s){s.classList.remove('filled','ok','no');s.removeAttribute('data-i');s.querySelector('.ord-v').textContent='';});
  var out=o.querySelector('.ix-out');out.className='ix-out';}

function fanPick(c){c.parentNode.querySelectorAll(".fan-c").forEach(function(x){x.classList.toggle("on",x===c);});}
function modTog(b){b.parentNode.classList.toggle('open');}
function modSync(id){document.querySelectorAll('.modgrp').forEach(function(g){var ps=g.getAttribute('data-pids').split(',');
  if(ps.indexOf(id)>=0)g.classList.add('open');
  var ls=ps.filter(function(p){return LESSONS.indexOf(p)>=0;});var d=ls.length&&ls.every(function(p){return visited[p];});g.classList.toggle('done',!!d);if(d)g.querySelector('.mstat').textContent='✓';});}
/* ---------- stepper ---------- */
function stPick(btn,i){var st=btn.closest('.st');st.querySelectorAll('.st-tab').forEach(function(t,k){if(t.classList.contains('on'))t.classList.add('seen');t.classList.toggle('on',k===i);});
  st.querySelectorAll('.st-pan').forEach(function(p,k){p.classList.toggle('on',k===i);});}

/* ---------- hotspot (rows, bars) ---------- */
function hsPick(el){
  var box=el.closest('.ix'),out=box.querySelector('.ix-out');
  box.querySelectorAll('[data-ok]').forEach(function(x){x.classList.remove('no');});
  var ok=el.getAttribute('data-ok')==='1';el.classList.add(ok?'ok':'no');
  out.className='ix-out show '+(ok?'good':'mid');out.innerHTML=(ok?'✅ ':'🤔 ')+el.getAttribute('data-fb');
  if(ok&&!box.getAttribute('data-won')){box.setAttribute('data-won','1');win('Mắt kiểm toán viên đây rồi! 🔍');}
}

/* ---------- flagger ---------- */
function flTog(r){var f=r.closest('.fl');if(f.classList.contains('checked'))return;r.classList.toggle('flag');}
function flCheck(b){
  var f=b.closest('.fl'),rows=f.querySelectorAll('.fl-row'),right=0,bad=0,caught=0,fp=0;
  rows.forEach(function(r){var isBad=r.getAttribute('data-bad')==='1',fl=r.classList.contains('flag'),ok=isBad===fl;var why=r.nextElementSibling;
    r.classList.add(ok?'r-ok':'r-no');why.classList.add(ok?'r-ok':'r-no');if(ok)right++;if(isBad){bad++;if(fl)caught++;}else if(fl)fp++;});
  f.classList.add('checked');var out=f.querySelector('.ix-out');
  if(right===rows.length){out.className='ix-out show good';out.innerHTML='✅ Chuẩn! Bạn bắt được cả '+bad+' bút toán bất thường và không bị mắc bẫy bút toán kết chuyển.';win('Quét sổ cái xuất sắc! 🔍');}
  else{out.className='ix-out show mid';out.innerHTML='Bạn bắt được '+caught+'/'+bad+' bút toán bất thường'+(fp?', và đánh dấu nhầm '+fp+' bút toán bình thường':'')+'. Đọc lý do dưới từng dòng.';}
}
function flReset(b){var f=b.closest('.fl');f.classList.remove('checked');f.querySelectorAll('.fl-row,.fl-why').forEach(function(r){r.classList.remove('flag','r-ok','r-no');});f.querySelector('.ix-out').className='ix-out';}

/* ---------- number check ---------- */
function ncCheck(el){var nc=el.closest('.nc'),inp=nc.querySelector('.nc-in'),v=parseFloat((inp.value||'').replace(/\./g,'').replace(',','.')),ans=+nc.getAttribute('data-ans');
  var ok=Math.abs(v-ans)<0.5;nc.querySelector('.nc-fb.ok').classList.toggle('show',ok);nc.querySelector('.nc-fb.bad').classList.toggle('show',!ok);
  if(ok&&!nc.getAttribute('data-won')){nc.setAttribute('data-won','1');win('Tự cộng lại là thói quen tốt! 🧮');}}

/* ---------- glossary ---------- */
function glFilter(q){q=(q||'').toLowerCase().trim();var n=0;document.querySelectorAll('.gl-row').forEach(function(r){var m=!q||r.getAttribute('data-s').indexOf(q)>=0;r.style.display=m?'':'none';if(m)n++;});
  document.getElementById('glnone').style.display=n?'none':'block';}

/* ---------- abbreviation tooltip ---------- */
var abTip=null,abCur=null;
function abShow(el){abTip=abTip||document.getElementById('abtip');var t=el.getAttribute('data-t'),k=t.indexOf(':');
  abTip.innerHTML=k>0?'<b>'+el.textContent+'</b> = '+t.slice(0,k)+'<br>'+t.slice(k+1).trim():t;abTip.classList.add('show');
  var r=el.getBoundingClientRect(),w=abTip.offsetWidth,h=abTip.offsetHeight,l=Math.max(8,Math.min(r.left+r.width/2-w/2,window.innerWidth-w-8)),tp=r.top-h-8;if(tp<8)tp=r.bottom+8;
  abTip.style.left=l+'px';abTip.style.top=tp+'px';abCur=el;}
function abHide(){if(abTip)abTip.classList.remove('show');if(abCur)abCur.classList.remove('on');abCur=null;}
document.addEventListener('mouseover',function(e){var a=e.target.closest&&e.target.closest('abbr.ab');if(a)abShow(a);});
document.addEventListener('mouseout',function(e){var a=e.target.closest&&e.target.closest('abbr.ab');if(a)abHide();});
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('abbr.ab');if(a){if(a.closest('button'))return;e.stopPropagation();if(abCur===a){abHide();}else{abHide();a.classList.add('on');abShow(a);}}else abHide();},true);
window.addEventListener('scroll',abHide,{passive:true});

/* ---------- materiality calculator ---------- */
var MCB='pbt',MCR={rev:[0.5,1,0.05,0.5],pbt:[5,10,0.5,5],ta:[1,2,0.1,1]};
function mcBase(b){MCB=b;if(!document.getElementById("mcRate"))return;document.querySelectorAll('.mc-base .seg').forEach(function(s){s.classList.toggle('on',s.getAttribute('data-b')===b);});
  var r=document.getElementById('mcRate'),c=MCR[b];r.min=c[0];r.max=c[1];r.step=c[2];r.value=c[3];mcCalc();}
function mcCalc(){var r=document.getElementById('mcRate');if(!r)return;
  var base={rev:+document.getElementById('mcRev').value,pbt:+document.getElementById('mcPbt').value,ta:+document.getElementById('mcTa').value}[MCB];
  var rate=+r.value,pmp=+document.getElementById('mcPm').value,trp=+document.getElementById('mcTr').value;
  var om=base*rate/100,pm=om*pmp/100,tr=om*trp/100;
  document.getElementById('mcRateV').textContent=fm1(rate)+'%';document.getElementById('mcPmV').textContent=pmp+'%';document.getElementById('mcTrV').textContent=trp+'%';
  document.getElementById('mcOM').textContent=fm(om)+' triệu';document.getElementById('mcPM').textContent=fm(pm)+' triệu';document.getElementById('mcTR').textContent=fm(tr)+' triệu';
  document.getElementById('mcBOM').style.width='100%';document.getElementById('mcBPM').style.width=pmp+'%';document.getElementById('mcBTR').style.width=Math.max(trp,2)+'%';
  var note='';
  if(base<=0)note='⚠️ Tiêu chí đang bằng 0 hoặc âm. Khi doanh nghiệp lỗ, không dùng lợi nhuận trước thuế làm tiêu chí; hãy chuyển sang doanh thu hoặc tổng tài sản.';
  else{note=(pmp<=60?'Tỷ lệ mức thực hiện thấp: phù hợp khách hàng mới, rủi ro cao hoặc năm trước có nhiều sai sót. ':(pmp>=75?'Tỷ lệ mức thực hiện cao: phù hợp khách hàng quen, kiểm soát tốt, ít sai sót các năm trước. ':'Tỷ lệ mức thực hiện ở giữa: rủi ro trung bình. '))+
    'Mọi hóa đơn lớn hơn '+fm(pm)+' triệu sẽ là phần tử chính và được kiểm tra 100%.';}
  document.getElementById('mcNote').innerHTML=note;}

/* ---------- projected misstatement ---------- */
function pjCalc(){var e=+document.getElementById('pjE').value,s=+document.getElementById('pjS').value,r=+document.getElementById('pjR').value,t=+document.getElementById('pjT').value,o=document.getElementById('pjOut');if(!o)return;
  if(!(s>0)){o.className='calc-res';o.innerHTML='Nhập tổng giá trị mẫu lớn hơn 0.';return;}
  var p=e/s*r,rate=e/s*100;
  o.className='calc-res '+(p>t?'bad':'good');
  o.innerHTML='Tỷ lệ sai sót trong mẫu = '+fm1(e)+' / '+fm(s)+' = '+fm1(Math.round(rate*100)/100)+'%<span class="big">Sai sót ngoại suy ≈ '+fm(p)+' triệu</span>'+
   (p>t?'❌ Vượt sai sót có thể chấp nhận ('+fm(t)+' triệu): mở rộng mẫu hoặc đề nghị khách hàng rà soát lại toàn bộ tổng thể.':'✅ Thấp hơn sai sót có thể chấp nhận ('+fm(t)+' triệu): có thể kết luận tổng thể không có sai sót trọng yếu, nhưng vẫn đưa sai sót ngoại suy vào bảng tổng hợp.');}

/* ---------- sampling simulator ---------- */
var simState={key:false};
function simRender(){var g=document.getElementById('simGrid');if(!g)return;g.innerHTML='';
  POP.forEach(function(p,i){var d=document.createElement('div');d.className='sim-t';d.id='simT'+i;d.innerHTML='<div class="no">Hóa đơn '+p.no+'</div><div class="v">'+fm1(p.v)+'</div>';g.appendChild(d);});
  document.getElementById('simStrip').innerHTML='';var o=document.getElementById('simOut');o.className='ix-out';simState={key:false};}
function simKey(){var thr=+document.getElementById('simThr').value,k=[],tot=0;
  POP.forEach(function(p,i){var el=document.getElementById('simT'+i);el.classList.remove('pick');el.classList.toggle('key',p.v>thr);if(p.v>thr){k.push(p);tot+=p.v;}});
  var rest=POP.filter(function(p){return p.v<=thr;}),s=document.getElementById('simStrip'),rt=rest.reduce(function(a,p){return a+p.v;},0);s.innerHTML='';
  POP.forEach(function(p,i){if(p.v<=thr){var seg=document.createElement('div');seg.className='sim-seg';seg.id='simS'+i;seg.style.width=(p.v/rt*100)+'%';seg.title='Hóa đơn '+p.no+': '+fm1(p.v)+' triệu';s.appendChild(seg);}});
  simState={key:true,thr:thr,rt:rt};var o=document.getElementById('simOut');o.className='ix-out show mid';
  o.innerHTML='<b>Bước 1:</b> có '+k.length+' hóa đơn lớn hơn '+fm(thr)+' triệu, tổng '+fm1(tot)+' triệu → kiểm tra 100%. Phần còn lại gồm '+rest.length+' hóa đơn, tổng '+fm1(rt)+' triệu, sẽ được chọn mẫu ở Bước 2.';}
function simMus(){if(!simState.key||simState.thr!==+document.getElementById('simThr').value)simKey();
  var n=+document.getElementById('simN').value,thr=simState.thr,rt=simState.rt,I=rt/n,start=Math.random()*I,s=document.getElementById('simStrip');
  s.querySelectorAll('.sim-tick').forEach(function(t){t.remove();});POP.forEach(function(p,i){var el=document.getElementById('simT'+i);el.classList.remove('pick');var sg=document.getElementById('simS'+i);if(sg)sg.classList.remove('pick');});
  var targets=[];for(var k=0;k<n;k++)targets.push(start+k*I);
  var cum=0,chosen=[];POP.forEach(function(p,i){if(p.v>thr)return;var lo=cum;cum+=p.v;targets.forEach(function(t){if(t>=lo&&t<cum&&chosen.indexOf(i)<0)chosen.push(i);});});
  targets.forEach(function(t,k){setTimeout(function(){var tk=document.createElement('div');tk.className='sim-tick';tk.style.left=(t/rt*100)+'%';s.appendChild(tk);},k*220);});
  chosen.forEach(function(i,k){setTimeout(function(){document.getElementById('simT'+i).classList.add('pick');var sg=document.getElementById('simS'+i);if(sg)sg.classList.add('pick');},k*220+120);});
  var o=document.getElementById('simOut');o.className='ix-out show';
  o.innerHTML='<b>Bước 2:</b> khoảng cách mẫu = '+fm1(rt)+' / '+n+' ≈ <b>'+fm1(I)+' triệu</b>; điểm bắt đầu ngẫu nhiên '+fm1(start)+' triệu; sau đó cứ cộng thêm một khoảng cách. Các hóa đơn chứa “đồng tiền” tại vạch vàng được chọn: '+
    chosen.map(function(i){return POP[i].no+' ('+fm1(POP[i].v)+')';}).join(', ')+'.'+(chosen.length<n?' Một hóa đơn trúng hai vạch nên số mẫu thực tế ít hơn '+n+'.':'')+' Bấm “Bước 2” lần nữa để chọn lại với điểm bắt đầu khác.';}
function simReset(){document.getElementById('simThr').value=340;document.getElementById('simN').value=5;document.getElementById('simNv').textContent='5';simRender();}

/* ---------- SUM evaluator ---------- */
function smCalc(){var tot=0;document.querySelectorAll('.sm-row').forEach(function(r){var adj=r.querySelector('input').checked;r.classList.toggle('adj',adj);if(!adj)tot+=+r.getAttribute('data-v');});
  var el=document.getElementById('smTot');if(!el)return;el.textContent='('+fm(tot)+')';
  var OM=450,f=document.getElementById('smFill');f.style.width=Math.min(100,tot/(OM/0.769)*100)+'%';
  var o=document.getElementById('smOut');
  if(tot>OM){f.style.background='var(--rose)';o.className='ix-out show bad';o.innerHTML='❌ Tổng '+fm(tot)+' triệu <b>vượt</b> mức trọng yếu tổng thể 450 triệu. Đề nghị khách hàng điều chỉnh; nếu khách hàng từ chối, cân nhắc ý kiến ngoại trừ hoặc trái ngược. Thử bật công tắc để xem cần điều chỉnh khoản nào.';}
  else if(tot>=OM*0.75){f.style.background='var(--amber)';o.className='ix-out show mid';o.innerHTML='⚠️ Tổng '+fm(tot)+' triệu thấp hơn nhưng <b>rất sát</b> mức trọng yếu tổng thể. Vẫn nên đề nghị điều chỉnh, vì còn có thể có sai sót chưa phát hiện.';}
  else{f.style.background='var(--emerald)';o.className='ix-out show good';o.innerHTML='✅ Tổng '+fm(tot)+' triệu thấp hơn nhiều so với mức trọng yếu tổng thể. Có thể đưa ý kiến chấp nhận toàn phần, sau khi xem xét thêm mặt định tính.';
    var x=document.getElementById('smFill');if(!x.getAttribute('data-won')){x.setAttribute('data-won','1');win('Báo cáo đã an toàn ✅');}}}

/* ---------- enquiry list ---------- */
function eqSave(t){store('as_t2_'+t.getAttribute('data-k'),t.value);}
function eqDownload(){var txt='DANH SÁCH CÂU HỎI CLIENT DAY: DOANH THU\n\n';document.querySelectorAll('.eq-row').forEach(function(r){txt+=r.querySelector('.eq-k').textContent+':\n'+(r.querySelector('.eq-in').value||'(chưa có)')+'\n\n';});
  var blob=new Blob([txt],{type:'text/plain;charset=utf-8'}),u=URL.createObjectURL(blob),l=document.createElement('a');l.href=u;l.download='cau-hoi-client-day-doanh-thu.txt';document.body.appendChild(l);l.click();setTimeout(function(){URL.revokeObjectURL(u);l.remove();},100);}

/* ---------- tra từ ---------- */
var curWord='';
function lookupWord(raw){var w=raw.toLowerCase().replace(/[\"“”‘’'.,;:!?()\[\]]/g,'').trim().replace(/\s+/g,' ');
  if(GLOSS[w])return{w:w,ipa:GLOSS[w][0],vi:GLOSS[w][1]};
  if(w.length>3&&w.slice(-1)==='s'&&GLOSS[w.slice(0,-1)]){var s=w.slice(0,-1);return{w:s,ipa:GLOSS[s][0],vi:GLOSS[s][1]};}
  return{w:w,ipa:'',vi:''};}
function speakWord(e){if(e){e.stopPropagation();e.preventDefault();}if(!('speechSynthesis'in window)||!curWord)return;try{speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(curWord);u.lang='en-GB';u.rate=.9;speechSynthesis.speak(u);}catch(err){}}
function hidePop(){var p=document.getElementById('wordpop');if(p){p.classList.remove('show');p.style.display='none';}}
function showWordPop(text,rect){
  curWord=text;var info=lookupWord(text);
  document.getElementById('wpWord').textContent=info.w||text.toLowerCase();
  var ipaEl=document.getElementById('wpIpa'),viEl=document.getElementById('wpVi'),srcEl=document.getElementById('wpSrc');
  if(info.ipa){ipaEl.style.display='block';ipaEl.textContent=info.ipa;}else{ipaEl.style.display='none';}
  if(info.vi){viEl.innerHTML='<b>'+info.vi+'</b>';srcEl.textContent='Từ điển khoá học · bấm 🔊 để nghe';}
  else{viEl.innerHTML='<span style="color:var(--muted)">Chưa có trong từ điển khoá học.</span>';srcEl.textContent='Bấm 🔊 để nghe phát âm';}
  var pop=document.getElementById('wordpop');pop.style.display='block';pop.classList.add('show');
  var pw=pop.offsetWidth,top=rect.bottom+window.scrollY+8,left=rect.left+window.scrollX+(rect.width/2)-pw/2;
  var maxL=window.scrollX+document.documentElement.clientWidth-pw-10;left=Math.max(window.scrollX+10,Math.min(left,maxL));
  pop.style.top=top+'px';pop.style.left=left+'px';
}
function handleSelection(){
  var sel=window.getSelection();if(!sel||sel.isCollapsed)return;var text=sel.toString().trim();
  if(!text||text.length>60||!/[a-zA-Z]/.test(text)||/[À-ỹ]/.test(text))return;
  var node=sel.anchorNode;if(node){var el=node.nodeType===1?node:node.parentElement;if(el&&el.closest&&(el.closest('.sidebar')||el.closest('#wordpop')||el.closest('.note-panel')||el.closest('input,textarea')))return;}
  var rect;try{rect=sel.getRangeAt(0).getBoundingClientRect();}catch(e){return;}
  if(rect.width===0&&rect.height===0)return;showWordPop(text,rect);
}
document.addEventListener('mouseup',function(e){if(e.target.closest&&e.target.closest('#wordpop'))return;setTimeout(handleSelection,10);});
document.addEventListener('mousedown',function(e){if(!(e.target.closest&&e.target.closest('#wordpop')))hidePop();});
window.addEventListener('scroll',function(){hidePop();},true);

/* ---------- ghi chú ---------- */
function toggleNote(){var p=document.getElementById('notePanel'),b=document.getElementById('noteBtn');var o=p.classList.toggle('open');b.classList.toggle('open',o);b.textContent=o?'✕':'✎';}
function saveNote(){var a=document.getElementById('noteArea');store('as_t2_note',a.value);var s=document.getElementById('noteSaved');s.classList.add('show');clearTimeout(s._t);s._t=setTimeout(function(){s.classList.remove('show');},1200);}
function clearNote(){var a=document.getElementById('noteArea');a.value='';saveNote();}
function downloadNote(){var a=document.getElementById('noteArea');var blob=new Blob([a.value],{type:'text/plain;charset=utf-8'});var u=URL.createObjectURL(blob);var l=document.createElement('a');l.href=u;l.download='ghi-chu-training-1.txt';document.body.appendChild(l);l.click();setTimeout(function(){URL.revokeObjectURL(u);l.remove();},100);}

/* ---------- init ---------- */
(function(){try{var v=load('as_t2_visited');if(v)visited=JSON.parse(v)||{};}catch(e){visited={};}
  if(load('as_t2_allseen')===null&&LESSONS.every(function(l){return visited[l];}))store('as_t2_allseen','1');
  var n=load('as_t2_note');if(n)document.getElementById('noteArea').value=n;
  document.querySelectorAll('.eq-in').forEach(function(t){var x=load('as_t2_'+t.getAttribute('data-k'));if(x)t.value=x;});
  PAGES.forEach(function(p){if(/^cp/.test(p)){var s=load('as_t2_score_'+p);if(s)showScore(p,s);}});
  try{simRender();mcBase("pbt");pjCalc();smCalc();}catch(e){}
  updateProgress();var last=load('as_t2_last');go(last&&PAGES.indexOf(last)>=0?last:'intro');})();

/* ---------- Training 2 ---------- */
(function(){
  function onView(el,fn){if(!el)return;if(!('IntersectionObserver' in window)){fn();return;}
    var o=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){setTimeout(fn,180);o.disconnect();}});},{threshold:.25});o.observe(el);}
  function arm(){
    onView(document.getElementById('fan4'),function(){document.getElementById('fan4').classList.add('open');});}
  var _go=go;go=function(id){_go(id);
    if(id==='b5'){var f=document.getElementById('fan4');f.classList.remove('open');}if(id==='b2')tlReset();setTimeout(arm,60);};
  document.querySelectorAll('.nb-row input').forEach(function(i){if(load('as_t2_'+i.getAttribute('data-k'))==='1')i.checked=true;});
  tkCount();arm();
})();
function tkCount(){var all=document.querySelectorAll('.nb-row input'),n=0;all.forEach(function(i){if(i.checked)n++;});var f=document.getElementById('nbFoot');
  if(f)f.textContent=n?('Bạn đã chọn '+n+'/'+all.length+' điều để áp dụng'+(n===all.length?' 🎉':'')):'Tick vào điều bạn sẽ áp dụng ngay từ Client Day';return n;}
function tkSave(i){store('as_t2_'+i.getAttribute('data-k'),i.checked?'1':'0');if(tkCount()===document.querySelectorAll('.nb-row input').length&&i.checked)confetti(50);}

/* B1 orbit */
var orbTimer=null,orbIdx=0,orbUser=false;
function orbShow(n){var o=document.getElementById('orb');if(!o)return;var ns=o.querySelectorAll('.orb-n'),i=+n.getAttribute('data-i');
  ns.forEach(function(x){x.classList.toggle('on',x===n);});o.querySelectorAll('.ol').forEach(function(l,k){l.classList.toggle('on',k===i-1);});
  var inn=o.querySelector('.orb-in');inn.classList.add('fade');setTimeout(function(){document.getElementById('orbK').textContent='0'+i;document.getElementById('orbT').textContent=n.getAttribute('data-t');document.getElementById('orbD').textContent=n.getAttribute('data-d');inn.classList.remove('fade');},220);}
function orbPick(n){orbUser=true;clearInterval(orbTimer);orbShow(n);}
(function(){var o=document.getElementById('orb');if(!o)return;var ns=o.querySelectorAll('.orb-n');
  orbTimer=setInterval(function(){if(orbUser)return;if(!document.getElementById('page-b1').classList.contains('show'))return;orbShow(ns[orbIdx%4]);orbIdx++;},3200);})();
/* B3 twist */
function twFlip(c){c.classList.add('on');var t=document.getElementById('tw2'),side=c.getAttribute('data-side');
  var both=t.querySelectorAll('.tcard.on').length===2;
  t.classList.remove('l','r');if(both){t.classList.add('both');document.getElementById('twQ').textContent='Bị kéo về cả hai phía. Giữ thăng bằng bằng 4 kỹ năng bên dưới ↓';}else t.classList.add(side);}
/* B3 puzzle */
function pzCount(){var g=document.getElementById('pzg'),n=g.querySelectorAll('.pz.placed').length;document.getElementById('pzCount').textContent=n+'/4';return n;}
function pzPlace(p){if(p.classList.contains('placed'))return;p.classList.add('placed');if(pzCount()===4){var g=document.getElementById('pzg');setTimeout(function(){g.classList.add('done');win('Ráp đủ 4 mảnh ghép! 🧩');},700);}}
function pzReset(){var g=document.getElementById('pzg');g.classList.remove('done');g.querySelectorAll('.pz').forEach(function(p){p.classList.remove('placed');});pzCount();}
/* B4 tree */
function trHi(s){var t=document.getElementById('tree');t.classList.remove('l','r');if(s)t.classList.add(s);}

/* B2 step reveal */
function tlReset(){var t=document.getElementById('tl');if(!t)return;var rs=t.querySelectorAll('.tl-r');rs.forEach(function(r,k){r.classList.toggle('on',k===0);r.classList.remove('lk');});
  var b=document.getElementById('tlBtn');if(b)b.parentNode.classList.remove('done');}
function tlNext(){var t=document.getElementById('tl'),rs=[].slice.call(t.querySelectorAll('.tl-r')),k=rs.filter(function(r){return r.classList.contains('on');}).length;
  if(k<rs.length){rs[k-1].classList.add('lk');rs[k].classList.add('on');setTimeout(function(){rs[k].scrollIntoView({behavior:'smooth',block:'center'});},80);}
  if(k+1>=rs.length)document.getElementById('tlBtn').parentNode.classList.add('done');}
tlReset();
/* B5 flashcards */
var fcSrc=null,fcBusy=false;
function fcFrom(card,btn){var r=btn.getBoundingClientRect(),c=card.getBoundingClientRect();
  return 'translate('+(r.left+r.width/2-(c.left+c.width/2))+'px,'+(r.top+r.height/2-(c.top+c.height/2))+'px) scale('+(r.width/c.width)+','+(r.height/c.height)+')';}
function fcOpen(btn){if(fcBusy)return;var fc=document.getElementById('fc'),card=document.getElementById('fcCard');
  card.innerHTML=document.getElementById('fc'+btn.getAttribute('data-i')).innerHTML;card.classList.remove('flip');fcSrc=btn;
  fc.style.opacity='0';fc.classList.add('show');card.style.transition='none';card.style.transform=fcFrom(card,btn);card.style.opacity='.4';
  btn.style.visibility='hidden';void card.offsetWidth;
  requestAnimationFrame(function(){card.style.transition='';card.style.transform='none';card.style.opacity='1';fc.style.opacity='1';});}
function fcFlip(e){e.stopPropagation();document.getElementById('fcCard').classList.toggle('flip');}
function fcClose(e){var fc=document.getElementById('fc');if(e&&e.target!==fc)return;if(!fcSrc||fcBusy)return;fcBusy=true;
  var card=document.getElementById('fcCard');card.classList.remove('flip');card.style.transform=fcFrom(card,fcSrc);card.style.opacity='.4';fc.style.opacity='0';
  setTimeout(function(){fc.classList.remove('show');fcSrc.style.visibility='';fcSrc.classList.add('viewed');fcSrc=null;fcBusy=false;card.style.transform='';},520);}
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&fcSrc){fcClose({target:document.getElementById('fc')});}});
