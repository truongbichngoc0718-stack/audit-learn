
(function(){
  var ORDER=["home", "p1", "p1l1", "p1l2", "p1t", "p2", "p2l1", "p2l2", "p2t", "p3", "p3l1", "p3l2", "p3l3", "p3l4", "p3l5", "p3l6", "p3l7", "p3t", "fin"];
  var TITLES={"home": "Trang chủ", "p1": "Tổng quan Phần 1", "p1l1": "1.1 — TB, GL và subledger", "p1l2": "1.2 — Mục đích của kiểm toán", "p1t": "Phần 1 · Kiểm tra", "p2": "Tổng quan Phần 2", "p2l1": "2.1 — Ba mức trọng yếu", "p2l2": "2.2 — Test dựa vào materiality", "p2t": "Phần 2 · Kiểm tra", "p3": "Tổng quan Phần 3", "p3l1": "3.1 — Doanh thu", "p3l2": "3.2 — Phải thu khách hàng", "p3l3": "3.3 — Phải trả người bán", "p3l4": "3.4 — Chi phí hoạt động", "p3l5": "3.5 — Vay và lãi vay", "p3l6": "3.6 — Tài sản cố định", "p3l7": "3.7 — Bút toán tay & bên liên quan", "p3t": "Phần 3 · Kiểm tra", "fin": "Kết — Từ thủ tục đến finding"};
  var KV='auditsim_visited', KL='auditsim_last';
  var REDUCED=false; try{REDUCED=window.matchMedia('(prefers-reduced-motion: reduce)').matches;}catch(e){}
  function $(id){return document.getElementById(id);}
  function store(k,v){try{localStorage.setItem(k,v);}catch(e){}}
  function load(k){try{return localStorage.getItem(k);}catch(e){return null;}}
  var LESSONS=[].map.call(document.querySelectorAll('.nidx[data-idx]'),function(n){return n.getAttribute('data-idx');});
  var visited={};
  try{visited=JSON.parse(load(KV)||'{}')||{};}catch(e){visited={};}
  var cur='home';

  /* ---------- number formatting (vi-VN) ---------- */
  function fmt(n,d){
    var s=(Math.round(n*Math.pow(10,d))/Math.pow(10,d)).toFixed(d);
    var parts=s.split('.'); parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,'.');
    return parts.length>1?parts[0]+','+parts[1]:parts[0];
  }
  function trim(s){return s.indexOf(',')>=0?s.replace(/,?0+$/,''):s;}
  function money(trieu){ /* input: million VND */
    if(!isFinite(trieu)) return '—';
    if(Math.abs(trieu)>=1000) return trim(fmt(trieu/1000,2))+' tỷ';
    if(Math.abs(trieu)>=100) return fmt(trieu,0)+' triệu';
    return trim(fmt(trieu,1))+' triệu';
  }

  /* ---------- progress + navigation ---------- */
  function updateProgress(){
    var done=LESSONS.filter(function(l){return visited[l];}).length;
    var pt=$('progtext'); if(pt) pt.textContent=done+'/'+LESSONS.length+' lessons';
    var pf=$('progfill'); if(pf) pf.style.width=(LESSONS.length?done/LESSONS.length*100:0)+'%';
    LESSONS.forEach(function(l){
      var idx=document.querySelector('.nidx[data-idx="'+l+'"]');
      if(!idx) return;
      if(!idx.hasAttribute('data-orig')) idx.setAttribute('data-orig',idx.textContent);
      if(visited[l]){idx.classList.add('done');idx.textContent='✓';}
      else{idx.classList.remove('done');idx.textContent=idx.getAttribute('data-orig');}
    });
  }
  function scrollSidebarTo(el){
    var sb=$('sidebar'); if(!el||!sb) return;
    try{var er=el.getBoundingClientRect(),sr=sb.getBoundingClientRect();
      if(er.top<sr.top||er.bottom>sr.bottom){sb.scrollTop+=(er.top-sr.top)-(sr.height/2)+(er.height/2);}}catch(e){}
  }
  function openNav(){var s=$('sidebar');if(s)s.classList.add('open');var sc=$('scrim');if(sc)sc.classList.add('show');}
  function closeNav(){var s=$('sidebar');if(s)s.classList.remove('open');var sc=$('scrim');if(sc)sc.classList.remove('show');}

  function countUp(page){
    if(REDUCED||!page) return;
    page.querySelectorAll('.cu').forEach(function(el){
      var v=parseFloat(el.getAttribute('data-v')),d=parseInt(el.getAttribute('data-d')||'0',10),u=el.getAttribute('data-u')||'';
      var t0=null,dur=900;
      function step(ts){
        if(!t0) t0=ts; var p=Math.min(1,(ts-t0)/dur); var e=1-Math.pow(1-p,3);
        el.textContent=fmt(v*e,d)+u;
        if(p<1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }
  function show(id){
    if(!$('page-'+id)) id='home';
    cur=id;
    var pg=null;
    document.querySelectorAll('.page').forEach(function(p){var on=p.id==='page-'+id;p.classList.toggle('show',on);if(on)pg=p;});
    var act=null;
    document.querySelectorAll('.navitem').forEach(function(a){var on=a.getAttribute('data-page')===id;a.classList.toggle('active',on);if(on)act=a;});
    var mt=$('mtitle'); if(mt) mt.textContent=TITLES[id]||'';
    if(LESSONS.indexOf(id)>=0){visited[id]=true;store(KV,JSON.stringify(visited));}
    updateProgress(); store(KL,id);
    try{history.replaceState(null,'','#'+id);}catch(e){}
    setTimeout(function(){scrollSidebarTo(act);},30);
    closeNav();
    return pg;
  }
  function go(id){
    document.body.classList.add('anim');
    var pg=show(id);
    countUp(pg);
    try{window.scrollTo({top:0,behavior:'smooth'});}catch(e){window.scrollTo(0,0);}
  }
  window.go=go;

  /* ---------- quiz, worked examples, steptabs ---------- */
  function scoreQuiz(quiz){
    if(!quiz) return;
    var qs=quiz.querySelectorAll('.quizq[data-correct]'),tot=qs.length,ans=0,corr=0;
    qs.forEach(function(q){if(q.classList.contains('answered')){ans++;if(q.getAttribute('data-chosen')===q.getAttribute('data-correct'))corr++;}});
    var el=quiz.querySelector('.quizscore'); if(!el) return;
    el.classList.add('show');
    var msg='Điểm hiện tại: <b>'+corr+'/'+tot+'</b> · đã trả lời '+ans+'/'+tot;
    if(ans===tot&&tot>0){msg='Kết quả: <b>'+corr+'/'+tot+'</b> · '+(corr===tot?'Xuất sắc!':(corr>=Math.ceil(tot*0.6)?'Tốt! Xem lại các câu sai.':'Đọc lại bài và thử lại.'));}
    el.innerHTML=msg;
  }
  function pick(btn){
    var q=btn.closest('.quizq'); if(!q||q.classList.contains('answered')) return;
    q.classList.add('answered');
    var correct=q.getAttribute('data-correct'),chosen=btn.getAttribute('data-k');
    q.querySelectorAll('.opt').forEach(function(o){o.classList.add('locked');if(o.getAttribute('data-k')===correct){o.classList.add('correct');o.textContent+=' ✓';}});
    if(chosen!==correct){btn.classList.add('incorrect');btn.textContent+=' ✗';}
    var ex=q.querySelector('.explain'); if(ex) ex.classList.add('show');
    q.setAttribute('data-chosen',chosen);
    scoreQuiz(q.closest('.quiz'));
  }
  function owSubmit(b){
    var c=b.closest('.ow1-card'); if(!c) return;
    c.querySelectorAll('.ow1-ta').forEach(function(t){t.readOnly=true;});
    var s=c.querySelector('.ow1-sol'); if(s) s.classList.add('open');
    b.style.display='none';
  }
  function stSwitch(t){
    var w=t.closest('.steptabs'); if(!w) return;
    var s=t.getAttribute('data-step');
    w.querySelectorAll('.st-tab').forEach(function(x){var on=x.getAttribute('data-step')===s;x.classList.toggle('active',on);x.setAttribute('aria-selected',on?'true':'false');});
    w.querySelectorAll('.st-panel').forEach(function(p){p.classList.toggle('active',p.getAttribute('data-step')===s);});
  }

  /* ---------- road timeline ---------- */
  function roadShow(road,n){
    var cards=road.querySelectorAll('.rcard'),labels=road.querySelectorAll('.road-labels button'),marker=road.querySelector('.road-marker');
    var i=((n%cards.length)+cards.length)%cards.length;
    road.setAttribute('data-i',i);
    cards.forEach(function(c,j){c.classList.toggle('on',j===i);});
    labels.forEach(function(b,j){b.classList.toggle('on',j===i);});
    if(marker) marker.className='road-marker m'+(i+1);
  }

  /* ---------- yellow band slider ---------- */
  var cbTimer=null,cbStopped=false;
  function cbShow(n){
    var cb=$('caseband'); if(!cb) return;
    var slides=cb.querySelectorAll('.cb-slide'); var i=((n%slides.length)+slides.length)%slides.length;
    slides.forEach(function(s,j){s.classList.toggle('on',j===i);});
    cb.querySelectorAll('[data-cb]').forEach(function(b){b.classList.toggle('on',parseInt(b.getAttribute('data-cb'),10)===i);});
    cb.setAttribute('data-i',i);
  }
  function cbAuto(){
    if(REDUCED||cbStopped) return;
    cbTimer=setInterval(function(){
      if(cur!=='home'||document.hidden) return;
      var cb=$('caseband'); if(!cb) return;
      cbShow(parseInt(cb.getAttribute('data-i')||'0',10)+1);
    },6500);
  }

  /* ---------- tools ---------- */
  function setVbox(el,cls,txt){ if(!el) return; el.className='vbox '+cls; el.textContent=txt; }
  var OM=250, PM=175, CTT=12.5; /* ví dụ Công ty A, triệu đồng */
  function matUpdate(){
    var r=$('mat-range'); if(!r) return;
    var v=parseFloat(r.value)||0; /* million VND */
    $('mat-val').textContent=money(v);
    var z=v<CTT?1:(v<=PM?2:(v<=OM?3:4));
    var msg={1:['ok','Dưới CTT 12,5 triệu: không tổng hợp, trừ khi có dấu hiệu gian lận'],2:['mid','Từ CTT 12,5 triệu: đưa vào bảng tổng hợp sai sót'],3:['hi','Vượt PM 175 triệu: mở rộng thủ tục ở khoản mục này'],4:['bad','Vượt OM 250 triệu: ảnh hưởng ý kiến nếu không được điều chỉnh']}[z];
    setVbox($('mat-verdict'),msg[0],msg[1]);
    document.querySelectorAll('#mat-leg [data-z]').forEach(function(d){d.classList.toggle('on',parseInt(d.getAttribute('data-z'),10)===z);});
  }
  function pjUpdate(){
    var pop=parseFloat($('pj-pop').value),smp=parseFloat($('pj-smp').value),err=parseFloat($('pj-err').value);
    if(!(pop>0)||!(smp>0)||!(err>=0)){setVbox($('pj-verdict'),'mid','Nhập population và giá trị mẫu lớn hơn 0.');return;}
    if(smp>pop){setVbox($('pj-verdict'),'mid','Giá trị mẫu không thể lớn hơn population.');return;}
    var rate=err/(smp*1000), proj=rate*pop*1000;
    $('pj-rate').textContent=fmt(rate*100,2)+'%';
    $('pj-proj').textContent=money(proj);
    $('pj-pm').textContent=fmt(proj/PM*100,0)+'%';
    if(proj<CTT) setVbox($('pj-verdict'),'ok','Dưới CTT 12,5 triệu: không tổng hợp.');
    else if(proj<=PM) setVbox($('pj-verdict'),'mid','Từ CTT 12,5 triệu: đưa vào bảng tổng hợp. Chưa vượt PM.');
    else if(proj<=OM) setVbox($('pj-verdict'),'hi','Vượt PM 175 triệu: mở rộng thủ tục ở khoản mục này.');
    else setVbox($('pj-verdict'),'bad','Vượt OM 250 triệu: ảnh hưởng ý kiến nếu không điều chỉnh.');
  }
  function parseD(s){var m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(s||'');return m?Date.UTC(+m[1],+m[2]-1,+m[3]):NaN;}
  var DAY=86400000, Y26=Date.UTC(2026,0,1), Y25=Date.UTC(2025,0,1);
  function ppUpdate(){ /* gói dịch vụ trả trước: doanh thu theo tháng sử dụng */
    var v=parseFloat($('pp-val').value),s=parseInt($('pp-start').value,10),n=parseInt($('pp-n').value,10),box=$('pp-cells');
    if(!(v>=0)||!(n>=1)||!(n<=36)||!(s>=1&&s<=12)){box.innerHTML='';$('pp-a').textContent='—';$('pp-b').textContent='—';setVbox($('pp-verdict'),'mid','Nhập giá trị gói và số tháng từ 1 đến 36.');return;}
    var c25=0,html='';
    for(var k=0;k<n;k++){
      var m=s-1+k,y=2025+Math.floor(m/12),mm=m%12+1;
      if(y===2025) c25++;
      html+='<i class="'+(y===2025?'y25':'y26')+'">T'+mm+'<small>'+y+'</small></i>';
    }
    box.innerHTML=html;
    var rev=v*c25/n,def=v-rev;
    $('pp-a').textContent=money(rev);$('pp-b').textContent=money(def);
    if(c25===n) setVbox($('pp-verdict'),'ok','Dịch vụ kết thúc trong năm 2025: ghi nhận toàn bộ vào doanh thu 2025.');
    else setVbox($('pp-verdict'),'mid',c25+'/'+n+' tháng thuộc năm 2025. Ghi hết vào doanh thu khi thu tiền → doanh thu 2025 ghi thừa '+money(def)+'.');
  }
  function pvUpdate(){
    var bal=parseFloat($('pv-bal').value),m=parseFloat($('pv-m').value);
    if(!(bal>=0)||!(m>=0)){setVbox($('pv-verdict'),'mid','Nhập số dư và số tháng quá hạn.');return;}
    var b=m<6?0:(m<12?1:(m<24?2:(m<36?3:4)));
    var rate=[0,.3,.5,.7,1][b], grp=['Dưới 6 tháng','6 tháng – dưới 1 năm','1 – dưới 2 năm','2 – dưới 3 năm','Từ 3 năm'][b];
    $('pv-grp').textContent=grp; $('pv-rate').textContent=fmt(rate*100,0)+'%'; $('pv-amt').textContent=money(bal*rate*1000);
    document.querySelectorAll('.stair [data-b]').forEach(function(x){x.classList.toggle('on',parseInt(x.getAttribute('data-b'),10)===b);});
    if(b===0) setVbox($('pv-verdict'),'ok','Chưa đến mức trích theo khung TT48, vẫn xem khả năng thu hồi.');
    else setVbox($('pv-verdict'),b>=3?'hi':'mid','So với số đã trích trên 2293. Trích thiếu → lợi nhuận ghi thừa.');
  }
  function itUpdate(){
    var p=parseFloat($('it-p').value),r=parseFloat($('it-r').value),d=parseD($('it-d').value);
    if(!(p>=0)||!(r>=0)||isNaN(d)){setVbox($('it-verdict'),'mid','Nhập dư nợ, lãi suất và ngày giải ngân.');return;}
    var start=Math.max(d,Y25), days=Math.max(0,Math.round((Y26-start)/DAY));
    var interest=p*r/100*days/365; /* tỷ */
    $('it-days').textContent=fmt(days,0);
    $('it-day').textContent=money(p*r/100/365*1000);
    $('it-int').textContent=money(interest*1000);
    if(days===0) setVbox($('it-verdict'),'ok','Giải ngân sau năm 2025: không có lãi năm 2025.');
    else setVbox($('it-verdict'),'mid','So với 635 + 241 trên sổ. Sổ ghi ít hơn → lãi ghi thiếu; phần chưa trả nằm trên 335.');
  }
  var JEL={late:'Sau khóa sổ',wk:'Cuối tuần · lễ',usr:'Người lập',rnd:'Số tròn',pair:'Cặp TK lạ',vague:'Diễn giải'};
  function jeUpdate(){
    var tbl=$('je-tbl'); if(!tbl) return;
    var act=[].filter.call(document.querySelectorAll('#je-fil button'),function(b){return b.getAttribute('aria-pressed')==='true';}).map(function(b){return b.getAttribute('data-k');});
    var n=0;
    tbl.querySelectorAll('tbody tr').forEach(function(tr){
      var f=(tr.getAttribute('data-f')||'').split(' ').filter(Boolean);
      var hits=f.filter(function(k){return act.indexOf(k)>=0;});
      tr.classList.toggle('hit',hits.length>0); if(hits.length) n++;
      var cell=tr.querySelector('.flags');
      cell.innerHTML=hits.map(function(k){return '<span class="on">'+JEL[k]+'</span>';}).join('');
    });
    $('je-n').textContent=n;
  }

  /* ---------- events ---------- */
  document.addEventListener('click',function(e){
    var t=e.target;
    var cbb=t.closest('[data-cb]'); if(cbb){cbStopped=true;if(cbTimer)clearInterval(cbTimer);cbShow(parseInt(cbb.getAttribute('data-cb'),10));return;}
    var sc=t.closest('[data-scroll]'); if(sc){var tg=$(sc.getAttribute('data-scroll'));if(tg){try{tg.scrollIntoView({behavior:REDUCED?'auto':'smooth',block:'start'});}catch(x){tg.scrollIntoView();}}return;}
    var g=t.closest('[data-go]'); if(g){e.preventDefault();go(g.getAttribute('data-go'));return;}
    var o=t.closest('.opt'); if(o){pick(o);return;}
    var b=t.closest('.ow1-btn'); if(b){owSubmit(b);return;}
    var st=t.closest('.st-tab'); if(st){stSwitch(st);return;}
    var rl=t.closest('.road-labels button'); if(rl){roadShow(rl.closest('.road'),parseInt(rl.getAttribute('data-i'),10));return;}
    var rc=t.closest('.rcard'); if(rc){var rd=rc.closest('.road');roadShow(rd,parseInt(rd.getAttribute('data-i')||'0',10)+1);return;}
    var jb=t.closest('#je-fil button'); if(jb){jb.setAttribute('aria-pressed',jb.getAttribute('aria-pressed')==='true'?'false':'true');jeUpdate();return;}
    var r=t.closest('.reveal'); if(r){r.classList.toggle('open');return;}
    if(t.closest('.hamb')){openNav();return;}
    if(t.closest('.scrim')){closeNav();return;}
  });
  document.addEventListener('keydown',function(e){
    var t=e.target;
    if((e.key==='Enter'||e.key===' ')&&t.matches&&t.matches('[data-go]:not(a):not(button)')){e.preventDefault();go(t.getAttribute('data-go'));return;}
    if(t.closest&&t.closest('input,textarea,select,[contenteditable]')) return;
    if(e.altKey||e.ctrlKey||e.metaKey) return;
    var i=ORDER.indexOf(cur);
    if(e.key==='ArrowRight'&&i<ORDER.length-1){go(ORDER[i+1]);}
    else if(e.key==='ArrowLeft'&&i>0){go(ORDER[i-1]);}
    else if(e.key==='Escape'){closeNav();}
  });
  function on(id,fn){var el=$(id);if(el){el.addEventListener('input',fn);el.addEventListener('change',fn);}}
  on('mat-range',matUpdate);
  ['pj-pop','pj-smp','pj-err'].forEach(function(x){on(x,pjUpdate);});
  ['pp-val','pp-start','pp-n'].forEach(function(x){on(x,ppUpdate);});
  ['pv-bal','pv-m'].forEach(function(x){on(x,pvUpdate);});
  ['it-p','it-r','it-d'].forEach(function(x){on(x,itUpdate);});

  /* reveal-on-view for strips and comparisons (always visible; only straighten) */
  var obsEls=document.querySelectorAll('.sof-strip,.cmp-anim');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}});},{threshold:.25});
    obsEls.forEach(function(el){io.observe(el);});
  }else{obsEls.forEach(function(el){el.classList.add('in');});}

  /* init */
  document.querySelectorAll('.road').forEach(function(rd){roadShow(rd,0);});
  matUpdate(); if($('pj-pop')) pjUpdate(); if($('pp-val')) ppUpdate(); if($('pv-bal')) pvUpdate(); if($('it-p')) itUpdate(); jeUpdate();
  cbShow(0); cbAuto();
  var h=(location.hash||'').replace('#','');
  var start=(h&&$('page-'+h))?h:(load(KL)||'home');
  show(start);
})();

