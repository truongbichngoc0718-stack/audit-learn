

(function(){
  var roots={1:document.getElementById('doc1'),2:document.getElementById('doc2'),3:document.getElementById('doc3')};
  var pos={1:0,2:0,3:0}, cur=1;
  function show(n,anchor){
    n=+n; if(!roots[n]) return;
    if(n!==cur){
      pos[cur]=window.pageYOffset||document.documentElement.scrollTop||0;
      roots[cur].hidden=true; roots[n].hidden=false;
      document.documentElement.className='on'+n;
      cur=n;
      window.scrollTo(0,pos[n]||0);
      window.dispatchEvent(new Event('resize'));
    }
    if(anchor){
      var el=roots[n].querySelector('[id="'+anchor+'"]')||roots[n].querySelector('[id="d'+n+anchor+'"]');
      if(el) setTimeout(function(){el.scrollIntoView({block:'start'});},30);
    }
  }
  window.switchDoc=show;
  document.addEventListener('click',function(e){
    var t=e.target;
    while(t&&t.getAttribute&&!t.getAttribute('data-doc-switch')) t=t.parentNode;
    if(!t||!t.getAttribute) return;
    var n=t.getAttribute('data-doc-switch'); if(!n) return;
    e.preventDefault();
    show(n,t.getAttribute('data-doc-anchor'));
  });
  document.documentElement.className='on1';
})();

(function(){var __r=document.getElementById('doc1');var __d=(typeof Proxy!=='undefined')?new Proxy(document,{get:function(t,k){if(k==='querySelector')return function(s){return __r.querySelector(s);};if(k==='querySelectorAll')return function(s){return __r.querySelectorAll(s);};if(k==='getElementById')return function(id){return __r.querySelector('[id="'+id+'"]');};var v=t[k];return (typeof v==='function')?v.bind(t):v;}}):document;(function(document){

window.tog=function(el){if(!el)return;var o=el.classList.toggle('open');el.setAttribute('aria-expanded',o?'true':'false');};

/* donut: rê chuột legend thì làm nổi lát tương ứng */
(function(){
  if(window.__pieInit)return; window.__pieInit=1;
  function boot(){
    document.querySelectorAll('.pie').forEach(function(fig){
      var segs=fig.querySelectorAll('.pie-seg,.pw-seg'), lis=fig.querySelectorAll('.pie-li');
      function hot(i){
        fig.classList.toggle('dim', i!==null);
        segs.forEach(function(s){s.classList.toggle('hot', i!==null && +s.getAttribute('data-i')===i);});
      }
      lis.forEach(function(li){
        var i=+li.getAttribute('data-i');
        li.addEventListener('mouseenter',function(){hot(i);});
        li.addEventListener('mouseleave',function(){hot(null);});
      });
      segs.forEach(function(sg){
        var i=+sg.getAttribute('data-i');
        sg.addEventListener('mouseenter',function(){hot(i);});
        sg.addEventListener('mouseleave',function(){hot(null);});
      });
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();

/* slider ba mảng kinh doanh */
(function(){
  if(window.__envslInit)return; window.__envslInit=1;
  function boot(){
    document.querySelectorAll('[data-envsl]').forEach(function(root){
      var track=root.querySelector('.envsl-track');
      var slides=Array.prototype.slice.call(root.querySelectorAll('.envr'));
      var btns=Array.prototype.slice.call(root.querySelectorAll('.envsl-btn'));
      if(!track||slides.length<2)return;
      var i=0,n=slides.length;
      function draw(){
        track.style.transform='translateX('+(-100*i)+'%)';
        slides.forEach(function(s,k){
          s.setAttribute('aria-hidden',k===i?'false':'true');
          s.querySelectorAll('a,button').forEach(function(f){f.tabIndex=k===i?0:-1;});
        });
        btns.forEach(function(b){
          var d=+b.getAttribute('data-dir');
          b.disabled=(d<0&&i===0)||(d>0&&i===n-1);
        });
      }
      function go(k){i=Math.max(0,Math.min(n-1,k));draw();}
      btns.forEach(function(b){b.addEventListener('click',function(){go(i+(+b.getAttribute('data-dir')));});});
      root.addEventListener('keydown',function(e){
        if(e.key==='ArrowLeft'){go(i-1);e.preventDefault();}
        else if(e.key==='ArrowRight'){go(i+1);e.preventDefault();}
      });
      /* vuốt trên cảm ứng */
      var x0=null,y0=null;
      root.addEventListener('touchstart',function(e){x0=e.touches[0].clientX;y0=e.touches[0].clientY;},{passive:true});
      root.addEventListener('touchend',function(e){
        if(x0===null)return;
        var dx=e.changedTouches[0].clientX-x0, dy=e.changedTouches[0].clientY-y0;
        if(Math.abs(dx)>44&&Math.abs(dx)>Math.abs(dy))go(i+(dx<0?1:-1));
        x0=null;y0=null;
      },{passive:true});
      draw();
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();

/* reveal on scroll */
(function(){
  if(window.__rvInit)return; window.__rvInit=1;
  function run(){
    var els=document.querySelectorAll('.rv,.sof-strip,.ms-bar,.bmk-m,.cht');
    if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in');});return;}
    var io=new IntersectionObserver(function(en){en.forEach(function(x){
      if(x.isIntersecting)x.target.classList.add('in');
      else x.target.classList.remove('in');
    });},{threshold:.16});
    els.forEach(function(e){io.observe(e);});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();

/* count-up (số nguyên) */
(function(){
  if(window.__cupInit)return; window.__cupInit=1;
  var runs=new WeakMap();
  function fmt(n,d){return n.toLocaleString('vi-VN',{minimumFractionDigits:d,maximumFractionDigits:d});}
  function run(el){
    var token=(runs.get(el)||0)+1;runs.set(el,token);
    var to=+el.getAttribute('data-to'),dur=+(el.getAttribute('data-dur')||1000),d=+(el.getAttribute('data-decimals')||0),prefix=el.getAttribute('data-prefix')||'',suffix=el.getAttribute('data-suffix')||'',t0=null,pow=Math.pow(10,d);
    function step(ts){if(runs.get(el)!==token)return;t0=t0||ts;var q=Math.min(1,(ts-t0)/dur),e=1-Math.pow(1-q,3),v=Math.round(to*e*pow)/pow;el.textContent=prefix+fmt(v,d)+suffix;if(q<1)requestAnimationFrame(step);}
    requestAnimationFrame(step);
  }
  function reset(el){var d=+(el.getAttribute('data-decimals')||0),prefix=el.getAttribute('data-prefix')||'',suffix=el.getAttribute('data-suffix')||'';runs.set(el,(runs.get(el)||0)+1);el.textContent=prefix+fmt(0,d)+suffix;}
  function boot(){
    var els=document.querySelectorAll('.cup');
    if(!('IntersectionObserver' in window)){els.forEach(run);return;}
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting)run(x.target);else reset(x.target);});},{threshold:.4});
    els.forEach(function(e){io.observe(e);});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();

})(__d);})();
(function(){var __r=document.getElementById('doc2');var __d=(typeof Proxy!=='undefined')?new Proxy(document,{get:function(t,k){if(k==='querySelector')return function(s){return __r.querySelector(s);};if(k==='querySelectorAll')return function(s){return __r.querySelectorAll(s);};if(k==='getElementById')return function(id){return __r.querySelector('[id="'+id+'"]');};var v=t[k];return (typeof v==='function')?v.bind(t):v;}}):document;(function(document){

(function(){
  function init(){
    var els=document.querySelectorAll('.toc,.part,section,.chart,.flow-animate');
    els.forEach(function(el){el.classList.add('reveal-bisc');});
    if(!('IntersectionObserver' in window)){els.forEach(function(el){el.classList.add('in');});return;}
    var io=new IntersectionObserver(function(entries){entries.forEach(function(entry){
      if(entry.isIntersecting)entry.target.classList.add('in');
      else entry.target.classList.remove('in');
    });},{threshold:.08,rootMargin:'0px 0px -5% 0px'});
    els.forEach(function(el){io.observe(el);});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

(function(){
  window.csShow=function(id,idx){var st=document.getElementById(id);if(!st)return;var sl=[].slice.call(st.querySelectorAll('.cs-slide'));idx=(idx+sl.length)%sl.length;sl.forEach(function(x,j){x.classList.toggle('on',j===idx);});var d=document.querySelectorAll('[data-dots="'+id+'"] .cs-dot');[].forEach.call(d,function(x,j){x.classList.toggle('on',j===idx);});};
  window.csGo=function(id,dir){var st=document.getElementById(id);if(!st)return;var sl=[].slice.call(st.querySelectorAll('.cs-slide'));var cur=-1;sl.forEach(function(x,j){if(x.classList.contains('on'))cur=j;});if(cur<0)cur=0;window.csShow(id,cur+dir);};
})();

(function(){
  var cards=[].slice.call(document.querySelectorAll('.tbar-card,.evb')); if(!cards.length) return;
  if(!('IntersectionObserver' in window)){cards.forEach(function(c){c.classList.add('in');});return;}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)e.target.classList.add('in');});},{threshold:.2});
  cards.forEach(function(c){io.observe(c);});
})();

(function(){
  var box=document.querySelector('.hmix'); if(!box) return;
  var slices=[].slice.call(box.querySelectorAll('circle.sl')),
      rows=[].slice.call(box.querySelectorAll('.hmix-row'));
  function hi(i){
    slices.forEach(function(c,k){c.classList.toggle('hot',k===i);c.classList.toggle('dim',i!==null&&k!==i);});
    rows.forEach(function(r,k){r.classList.toggle('hot',k===i);});
  }
  function bind(el,i){
    el.addEventListener('mouseenter',function(){hi(i);});
    el.addEventListener('mouseleave',function(){hi(null);});
  }
  slices.forEach(function(c,i){bind(c,i);});
  rows.forEach(function(r,i){bind(r,i);});
})();

(function(){
  var box=document.querySelector('.stx'); if(!box) return;
  var tabs=[].slice.call(box.querySelectorAll('.stx-tab')),
      panels=[].slice.call(box.querySelectorAll('.stx-panel'));
  function pick(i){
    tabs.forEach(function(t,k){var on=k===i;t.classList.toggle('on',on);t.setAttribute('aria-selected',on?'true':'false');});
    panels.forEach(function(pn,k){pn.classList.toggle('on',k===i);});
  }
  tabs.forEach(function(t,i){t.addEventListener('click',function(){pick(i);});});
})();

(function(){
  var box=document.querySelector('.opsx'); if(!box) return;
  var items=[].slice.call(box.querySelectorAll('.ox-item')),
      panels=[].slice.call(box.querySelectorAll('.ox-panel'));
  function pick(i){
    items.forEach(function(t,k){var on=k===i;t.classList.toggle('on',on);t.setAttribute('aria-selected',on?'true':'false');});
    panels.forEach(function(pn,k){pn.classList.toggle('on',k===i);});
  }
  items.forEach(function(t,i){t.addEventListener('click',function(){pick(i);});});
})();

(function(){
  var box=document.querySelector('.corex'); if(!box) return;
  var tabs=[].slice.call(box.querySelectorAll('.cx-tab')),
      panels=[].slice.call(box.querySelectorAll('.cx-panel'));
  function pick(i){
    tabs.forEach(function(t,k){var on=k===i;t.classList.toggle('on',on);t.setAttribute('aria-selected',on?'true':'false');});
    panels.forEach(function(pn,k){pn.classList.toggle('on',k===i);});
  }
  tabs.forEach(function(t,i){
    t.addEventListener('click',function(){pick(i);});
    t.addEventListener('mouseenter',function(){if(window.matchMedia('(hover:hover)').matches)pick(i);});
  });
})();

(function(){
  var wrap=document.querySelector('.occ-wrap'); if(!wrap) return;
  var tip=wrap.querySelector('.occ-tip'), cross=wrap.querySelector('.occ-cross');
  var dots=wrap.querySelectorAll('.occ-dot');
  wrap.querySelectorAll('.occ-hit').forEach(function(r){
    function on(){
      var i=+r.dataset.i, x=+r.dataset.x, y=+r.dataset.y;
      dots.forEach(function(d,j){d.classList.toggle('on', j===i);});
      cross.setAttribute('x1',x); cross.setAttribute('x2',x); cross.style.opacity='1';
      tip.querySelector('b').textContent=r.dataset.m;
      tip.querySelector('span').textContent=r.dataset.v;
      tip.style.left=(x/1000*100)+'%'; tip.style.top=(y/320*100)+'%';
      tip.classList.add('on');
    }
    function off(){dots.forEach(function(d){d.classList.remove('on');});cross.style.opacity='0';tip.classList.remove('on');}
    r.addEventListener('pointerenter',on); r.addEventListener('pointermove',on);
    r.addEventListener('pointerleave',off); r.addEventListener('focus',on); r.addEventListener('blur',off);
  });
  wrap.addEventListener('pointerleave',function(){dots.forEach(function(d){d.classList.remove('on');});cross.style.opacity='0';tip.classList.remove('on');});
})();

})(__d);})();
(function(){var __r=document.getElementById('doc3');var __d=(typeof Proxy!=='undefined')?new Proxy(document,{get:function(t,k){if(k==='querySelector')return function(s){return __r.querySelector(s);};if(k==='querySelectorAll')return function(s){return __r.querySelectorAll(s);};if(k==='getElementById')return function(id){return __r.querySelector('[id="'+id+'"]');};var v=t[k];return (typeof v==='function')?v.bind(t):v;}}):document;(function(document){

(function(){
  function init(){
    var els=document.querySelectorAll('.toc,.part,section,.chart');
    els.forEach(function(el){el.classList.add('reveal-bisc');});
    if(!('IntersectionObserver' in window)){els.forEach(function(el){el.classList.add('in');});return;}
    var io=new IntersectionObserver(function(entries){entries.forEach(function(e){
      if(e.isIntersecting)e.target.classList.add('in'); else e.target.classList.remove('in');
    });},{threshold:.08,rootMargin:'0px 0px -5% 0px'});
    els.forEach(function(el){io.observe(el);});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

})(__d);})();
