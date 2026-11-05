
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const pad = n => String(n).padStart(2, '0');
  const slides = $$('.slide');
  const N = slides.length;
  const dots = $('.dots');
  const wipe = $('.wipe');
  let cur = -1, busy = false;

  /* Split text to run the effect, keep child tags such as <em>, .ph */
  function splitWords(el) {
    let i = 0;
    const walk = node => [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(p => {
          if (!p) return;
          if (/^\s+$/.test(p)) { frag.append(document.createTextNode(' ')); return; }
          const w = document.createElement('span'), s = document.createElement('span');
          w.className = 'w'; s.textContent = p; s.style.setProperty('--i', i++);
          w.append(s); frag.append(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) walk(n);
    });
    walk(el);
  }
  function splitLetters(el) {
    const text = el.textContent.normalize('NFC');
    el.setAttribute('aria-label', text);
    el.textContent = '';
    let i = 0;
    text.split(' ').forEach((word, wi) => {
      if (wi) el.append(' ');
      const w = document.createElement('span');
      w.style.whiteSpace = 'nowrap'; w.setAttribute('aria-hidden', 'true');
      Array.from(word).forEach(c => {
        const s = document.createElement('span');
        s.className = 'ch'; s.textContent = c; s.style.setProperty('--i', i++);
        w.append(s);
      });
      el.append(w);
    });
  }
  $$('[data-split]').forEach(splitWords);
  $$('[data-letters]').forEach(splitLetters);

  /* Count up */
  function count(el) {
    const to = +el.dataset.count, t0 = performance.now(), dur = reduce ? 1 : 1400;
    const f = t => {
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 4)));
      if (p < 1) requestAnimationFrame(f);
    };
    el.textContent = 0; requestAnimationFrame(f);
  }

  /* Navigation dots */
  slides.forEach((s, i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.dataset.label = s.dataset.label;
    b.setAttribute('aria-label', `Trang ${i + 1}: ${s.dataset.label}`);
    b.addEventListener('click', () => go(i));
    dots.append(b);
  });
  $('.count .total').textContent = pad(N);
  [['0', 'Giới thiệu'], ['1', 'Trainer'], ['2', 'Lộ trình'], ['5', 'Mục tiêu']].forEach(([sec, name]) => {
    const b = document.createElement('button');
    b.type = 'button'; b.dataset.sec = sec; b.textContent = name;
    b.addEventListener('click', () => go(slides.findIndex(x => x.dataset.sec === sec)));
    $('.pills').append(b);
  });

  function go(n, dir) {
    if (n < 0 || n >= N || n === cur || busy) return;
    dir = dir || (n > cur ? 1 : -1);
    document.body.classList.toggle('used', cur >= 0);
    if (cur < 0 || reduce) { show(n, dir); return; }
    busy = true;
    wipe.classList.remove('run', 'rev'); void wipe.offsetWidth;
    wipe.dataset.v = slides[n].dataset.tr || 'h'; wipe.classList.add('run'); if (dir < 0 && wipe.dataset.v === 'h') wipe.classList.add('rev');
    setTimeout(() => show(n, dir), 520);
    setTimeout(() => { busy = false; wipe.classList.remove('run', 'rev'); }, 1150);
  }

  function show(n, dir) {
    const old = slides[cur];
    if (old) { old.classList.remove('is-active'); old.setAttribute('aria-hidden', 'true'); leave(old); }
    cur = n;
    const s = slides[n];
    s.classList.add('is-active'); s.setAttribute('aria-hidden', 'false');
    document.body.dataset.scene = s.dataset.scene;

    // Entering the page from behind: show all points; from the front: hide, click → reveal gradually
    $$('[data-step]', s).forEach(st => st.classList.toggle('step-on', dir < 0));
    setTimeout(() => {
      if (slides[cur] !== s) return;
      $$('[data-count]', s).forEach(c => {
        if (c.closest('[data-auto]')) return;
        const st = c.closest('[data-step]');
        if (!st || st.classList.contains('step-on')) count(c);
      });
    }, 650);
    enter(s, dir);

    $('.count .now').textContent = pad(n + 1);
    $$('.pills button').forEach(b => b.setAttribute('aria-current', b.dataset.sec === s.dataset.sec ? 'true' : 'false'));
    $('.progress i').style.transform = `scaleX(${(n + 1) / N})`;
    [...dots.children].forEach((d, i) => d.setAttribute('aria-current', i === n ? 'true' : 'false'));
    $('#prevBtn').disabled = n === 0; $('#nextBtn').disabled = n === N - 1;
    history.replaceState(null, '', '#' + (n + 1));
  }

  function enter(s, dir) {
    if (s._enter) s._enter(dir);
    $$('[data-auto]', s).forEach((el, i) => setTimeout(() => {
      if (slides[cur] !== s) return;
      el.classList.add('step-on'); $$('[data-count]', el).forEach(count);
    }, (reduce ? 0 : 750) + i * 180));
    const fan = $('.fan', s);
    if (fan) setTimeout(() => { if (slides[cur] === s) fan.classList.add('open'); }, reduce ? 0 : 900);
  }
  function leave(s) {
    const fan = $('.fan', s);
    if (fan) { fan.classList.remove('open', 'has-pick'); $$('.card', fan).forEach(c => c.classList.remove('pick')); }
    $$('[data-auto]', s).forEach(el => el.classList.remove('step-on'));
  }

  function next() {
    if (slides[cur]._step && slides[cur]._step(1)) return;
    const st = $$('[data-step]', slides[cur]).find(e => !e.classList.contains('step-on'));
    if (st) { st.classList.add('step-on'); $$('[data-count]', st).forEach(count); return; }
    go(cur + 1, 1);
  }
  function prev() {
    if (slides[cur]._step && slides[cur]._step(-1)) return;
    const on = $$('[data-step].step-on', slides[cur]);
    if (on.length) { on[on.length - 1].classList.remove('step-on', 'flip'); return; }
    go(cur - 1, -1);
  }

  /* Keyboard, mouse wheel, swipe */
  addEventListener('keydown', e => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const k = e.key, onBtn = e.target.closest && e.target.closest('button');
    if (['ArrowRight', 'ArrowDown', 'PageDown'].includes(k) || ((k === ' ' || k === 'Enter') && !onBtn)) { e.preventDefault(); next(); }
    else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(k)) { e.preventDefault(); prev(); }
    else if (k === 'Home') go(0);
    else if (k === 'End') go(N - 1);
    else if (k === 'f' || k === 'F') toggleFs();
    else if (k === 'Escape') $$('.fan', slides[cur]).forEach(f => { f.classList.remove('has-pick'); $$('.card', f).forEach(c => c.classList.remove('pick')); });
  });
  let wheelLock = 0;
  addEventListener('wheel', e => {
    if (Math.abs(e.deltaY) < 25 || innerWidth <= 860) return;
    const now = Date.now(); if (now < wheelLock) return;
    wheelLock = now + 1300; e.deltaY > 0 ? next() : prev();
  }, { passive: true });
  let tx = 0, ty = 0;
  addEventListener('touchstart', e => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  addEventListener('touchend', e => {
    if (e.target.closest && e.target.closest('[data-no-swipe]')) return;
    const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) dx < 0 ? next() : prev();
  }, { passive: true });
  $('#prevBtn').addEventListener('click', prev);
  $('#nextBtn').addEventListener('click', next);
  $$('[data-next]').forEach(b => b.addEventListener('click', next));
  $$('[data-prev]').forEach(b => b.addEventListener('click', prev));
  $$('[data-restart]').forEach(b => b.addEventListener('click', () => go(0, -1)));

  function toggleFs() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.().catch(() => {});
  }
  $('#fsBtn').addEventListener('click', toggleFs);


  /* Page 3: open each block */



  /* 3D financial statement set — edit the left-hand content here */
  const FS = [
    { vn: 'Statement of financial position', en: 'Statement of Financial Position · Balance Sheet',
      meta: ['Form B01-DN', 'At a point in time'],
      q: 'On the reporting date, what does the business hold, whom does it owe, and what belongs to the owners?',
      eq: '<b>Assets</b> = Liabilities + Equity',
      parts: ['Current assets', 'Non-current assets', 'Liabilities', 'Equity'],
      link: 'Closing equity is explained in detail in the Statement of changes in equity.' },
    { vn: 'Income statement', en: 'Statement of Profit or Loss',
      meta: ['Form B02-DN', 'For the whole period'],
      q: 'During the period, how much revenue did the business generate and how much profit did it keep?',
      eq: 'Revenue − Expenses = <b>Profit</b>',
      parts: ['Revenue', 'Cost of goods sold', 'Operating expenses', 'Profit after tax'],
      link: 'Profit after tax flows into equity.' },
    { vn: 'Statement of changes in equity', en: 'Statement of Changes in Equity',
      meta: ['IFRS: separate statement', 'VAS: presented in the Notes', 'For the whole period'],
      q: 'How did the owners’ equity increase or decrease during the period, and why?',
      eq: 'Opening equity + Profit + Capital contributed − Dividends = <b>Closing equity</b>',
      parts: ['Contributed capital', 'Retained earnings', 'Dividends', 'Reserves'],
      link: 'The closing balance agrees to Equity on the Statement of financial position.' },
    { vn: 'Cash flow statement', en: 'Statement of Cash Flows',
      meta: ['Form B03-DN', 'For the whole period'],
      q: 'Where does cash really come from and go to, and does profit come with cash?',
      eq: 'Opening cash + Operating CF + Investing + Financing = <b>Closing cash</b>',
      parts: ['Operating activities', 'Investing activities', 'Financing activities'],
      link: 'Closing cash agrees to Cash and cash equivalents on the Statement of financial position.' },
    { vn: 'Notes to the financial statements', en: 'Notes to the Financial Statements',
      meta: ['Form B09-DN', 'Accompanies every statement'],
      q: 'How are the numbers measured, and what else does not appear on the other four statements?',
      eq: 'Accounting policies + Line-item details + <b>Off-balance-sheet information</b>',
      parts: ['Accounting policies', 'Line-item details', 'Related parties', 'Commitments & contingent liabilities'],
      link: 'Explains and supplements all four other statements.' }
  ];
  const fsSlide = $('.s-fs');
  if (fsSlide) {
    const stage = $('.fs-stage', fsSlide), fd = $('.fd', fsSlide), body = $('.fs-body', fsSlide);
    const docs = $$('.fd-doc', fsSlide).sort((p, q) => p.dataset.i - q.dataset.i);
    const tabs = $$('[data-go]', fsSlide), K = FS.length;
    let idx = 0, picked = -1;
    const mod = (a, n) => ((a % n) + n) % n;
    const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    function render(k, animate) {
      const d = FS[k];
      $('.fs-idx', body).textContent = pad(k + 1);
      $('.fs-name', body).textContent = d.vn;
      $('.fs-en', body).textContent = d.en;
      $('.fs-meta', body).innerHTML = d.meta.map(m => `<span>${esc(m)}</span>`).join('');
      $('.fs-q', body).textContent = d.q;
      $('.fs-eq', body).innerHTML = d.eq;
      $('.fs-parts', body).innerHTML = d.parts.map(m => `<span>${esc(m)}</span>`).join('');
      $('.fs-link', body).innerHTML = `<i>↳</i><span>${esc(d.link)}</span>`;
      tabs.forEach((t, i) => t.setAttribute('aria-current', i === k ? 'true' : 'false'));
      if (animate) { body.classList.remove('swap'); void body.offsetWidth; body.classList.add('swap'); }
    }
    /* Effect when a sheet is pulled out: glow ring + particles */
    function burst(doc) {
      if (reduce) return;
      const r = doc.querySelector('.hit').getBoundingClientRect(), sr = stage.getBoundingClientRect();
      const cx = r.left + r.width / 2 - sr.left, cy = r.top + r.height * .2 - sr.top;
      const ring = document.createElement('i'); ring.className = 'ring-pop';
      ring.style.left = cx + 'px'; ring.style.top = cy + 'px'; stage.append(ring);
      setTimeout(() => ring.remove(), 800);
      for (let n = 0; n < 14; n++) {
        const p = document.createElement('i'), a = Math.random() * Math.PI * 2, d = 60 + Math.random() * 90;
        p.className = 'spark' + (n % 3 ? '' : ' w');
        p.style.left = cx + 'px'; p.style.top = cy + 'px';
        p.style.setProperty('--dx', Math.cos(a) * d + 'px'); p.style.setProperty('--dy', Math.sin(a) * d - 30 + 'px');
        stage.append(p); setTimeout(() => p.remove(), 900);
      }
    }
    function pick(k, fx) {
      picked = k;
      docs.forEach((d, i) => d.classList.toggle('pick', i === k));
      fd.classList.add('has-pick');
      if (k !== idx) { idx = k; render(k, true); }
      if (fx) burst(docs[k]);
    }
    // Put the pulled sheet back into the folder
    function putBack() {
      picked = -1;
      docs.forEach(d => d.classList.remove('pick')); fd.classList.remove('has-pick');
    }
    // Press → / ← on this page: pull out each sheet in turn, only then change page
    fsSlide._step = dir => {
      const k = picked < 0 ? (dir > 0 ? 0 : -1) : picked + dir;
      if (k < 0 || k >= K) return false;
      pick(k, true); return true;
    };
    fsSlide._enter = dir => {
      putBack();
      idx = dir < 0 ? K - 1 : 0; render(idx, false);
      if (dir < 0) setTimeout(() => { if (slides[cur] === fsSlide) pick(K - 1, false); }, reduce ? 0 : 1300);
    };
    tabs.forEach(t => t.addEventListener('click', () => pick(+t.dataset.go, true)));
    $$('[data-rot]', fsSlide).forEach(b => b.addEventListener('click', () => pick(mod(idx + +b.dataset.rot, K), true)));

    /* Click a sheet: pull it out; bấm lại đúng tờ đó: cất vào */
    docs.forEach((d, i) => d.querySelector('.hit').addEventListener('click', () => {
      if (picked === i) putBack(); else pick(i, true);
    }));
    render(0, false);
  }

  /* ===== NỘI DUNG — lấy nguyên từ file Word ===== */
  const SESS = {
    1: { n: 'Excel', q: '“Làm sao xử lý 7.000 dòng sổ cái trong vài phút?”' },
    2: { n: 'Power BI', q: '“Làm sao gộp 12 file và nhìn ra bất thường trên một trang?”' },
    3: { n: 'AI tại Big4', q: '“Big4 đang dùng AI gì, để làm gì, và dùng sao cho an toàn?”' }
  };
  const MODS = [
    { k: '1.1', b: 1, m: 5, lo: 'LO1', t: 'Di chuyển & chọn vùng nhanh', d: 'Ctrl + mũi tên, Ctrl + Shift + mũi tên, Ctrl + Home / End trên sổ cái 7.216 dòng.' },
    { k: '1.2', b: 1, m: 7, lo: 'LO1', t: 'Freeze, Filter & Vẽ bảng', d: 'Alt W F F, Ctrl + Shift + L, Ctrl + T và các phím kẻ viền.' },
    { k: '1.3', b: 1, m: 10, lo: 'LO2', s: 1, t: 'SUMIFS', d: 'Đối chiếu sổ cái với bảng cân đối phát sinh; tách phát sinh theo tháng.' },
    { k: '1.4', b: 1, m: 5, lo: 'LO3', t: 'XLOOKUP', d: 'Tra danh mục tài khoản, đối tượng; tìm mã không có trong danh mục.' },
    { k: '2.1', b: 2, m: 8, lo: 'LO4', s: 1, t: 'Ghép nhiều file cùng bố cục', d: 'Get Data → Folder → Combine: gộp 12 file sổ cái thành một bảng.' },
    { k: '2.2', b: 2, m: 6, lo: 'LO4', t: 'Measure đơn giản', d: 'Viết measure bằng SUM và DIVIDE.' },
    { k: '2.3', b: 2, m: 6, lo: 'LO4', t: 'Join dữ liệu', d: 'Nối sổ cái với danh mục bằng Relationship hoặc Merge Queries.' },
    { k: '2.4', b: 2, m: 10, lo: 'LO4', s: 1, t: 'Dựng dashboard', d: 'KPI, biểu đồ theo tháng, top khách hàng, bảng kết quả và slicer.' },
    { k: '3.1', b: 3, m: 8, lo: 'LO5', t: 'AI tại Big4 & tổng kết', d: 'Big4 đang dùng AI gì, dùng để làm gì; tổng kết buổi học và hỏi đáp.' }
  ];
  const BOARD = ['Xử lý nhanh dữ liệu client trên Excel', 'Dựng dashboard để khoanh vùng bất thường', 'Dùng AI đúng cách và an toàn'];
  const LOS = [
    { k: 'LO1', s: 'Thao tác nhanh trên dữ liệu lớn', f: 'Dùng phím tắt để di chuyển, chọn vùng, freeze, lọc và định dạng bảng trên sổ cái hàng nghìn dòng.', bl: 'Apply' },
    { k: 'LO2', s: 'Đối chiếu sổ cái với TB bằng SUMIFS', f: 'Dùng SUMIFS một và nhiều điều kiện để đối chiếu phát sinh và tách số liệu theo tháng, bộ phận.', bl: 'Apply / Analyze' },
    { k: 'LO3', s: 'Tra danh mục và tìm mã lạ bằng XLOOKUP', f: 'Tra thông tin từ danh mục và phát hiện đối tượng có giao dịch nhưng không có trong danh mục.', bl: 'Analyze' },
    { k: 'LO4', s: 'Ghép file và dựng dashboard Power BI', f: 'Gộp nhiều file cùng bố cục, viết measure, join danh mục và dựng một trang dashboard.', bl: 'Apply / Create' },
    { k: 'LO5', s: 'Dùng AI an toàn trong kiểm toán', f: 'Nắm cách Big4 đang dùng AI để đọc hợp đồng, viết phân tích, tóm tắt audit guide; tuân thủ bảo mật.', bl: 'Understand' }
  ];
  const GOALS = [
    { s: 'Làm việc nhanh với dữ liệu client', f: 'Mở bất kỳ file sổ cái nào của client là thao tác được ngay: di chuyển, lọc, định dạng bằng phím tắt.' },
    { s: 'Tự kiểm tra tính đầy đủ của dữ liệu', f: 'Đối chiếu sổ cái với bảng cân đối phát sinh và sổ chi tiết trước khi làm thủ tục kiểm toán.' },
    { s: 'Nhìn ra bất thường trên một trang', f: 'Gộp dữ liệu nhiều tháng và dựng dashboard để khoanh vùng tài khoản, tháng cần hỏi client.' },
    { s: 'Dùng AI như kiểm toán viên Big4', f: 'Biết Big4 đang dùng AI để làm gì và dùng AI đúng cách, an toàn với dữ liệu khách hàng.' }
  ];

  /* A3: module table under the roadmap — hover to show details on the right */
  const rm = $('#rmPanel');
  function paintRoad(b) {
    if (!rm) return;
    rm.classList.toggle('goal', !b);
    if (!b) {
      rm.innerHTML = `<div class="rm-goal"><div class="rm-head"><b>Mục tiêu</b><span>Sẵn sàng cho Client Day và Final Pitching</span></div>
        <div class="rm-tiles row">${BOARD.map((q, i) => `<span class="rm-tile static" style="--i:${i}"><span class="k">${i + 1}</span>${q}</span>`).join('')}</div></div>`;
      return;
    }
    const se = SESS[b], list = MODS.filter(m => m.b === b), sum = list.reduce((a, m) => a + m.m, 0);
    rm.innerHTML = `<div class="rm-left"><div class="rm-head"><b>0${b}</b><span><i>Phần ${b}</i>${se.n}</span></div>
      <div class="rm-tiles grid">${list.map((m, i) => `<button type="button" class="rm-tile" data-k="${m.k}" style="--i:${i}"><span class="k">${m.k}</span><span class="tt">${m.t}</span><span class="mm">${m.m}′${m.s ? ' ★' : ''}</span></button>`).join('')}</div></div>
      <div class="rm-det" id="rmDet"></div>`;
    const det = $('#rmDet');
    const idle = () => { det.innerHTML = `<span class="rm-k">Phần ${b} · ${sum} phút</span><p class="q">${se.q}</p><p class="rm-hint">Rê chuột vào từng bài để xem nội dung</p>`; };
    const show = t => {
      const m = MODS.find(x => x.k === t.dataset.k);
      $$('.rm-tile', rm).forEach(x => x.classList.toggle('on', x === t));
      det.innerHTML = `<span class="rm-k">${m.k}${m.s ? ' ★' : ''}</span><h4>${m.t}</h4><div class="chs"><span class="ch a">${m.m} phút</span>${m.lo !== '—' ? `<span class="ch">${m.lo}</span>` : ''}</div><p>${m.d}</p>`;
      det.classList.remove('swap'); void det.offsetWidth; det.classList.add('swap');
    };
    $$('.rm-tile', rm).forEach(t => { t.addEventListener('mouseenter', () => show(t)); t.addEventListener('focus', () => show(t)); t.addEventListener('click', () => show(t)); });
    rm.querySelector('.rm-left').addEventListener('mouseleave', () => { $$('.rm-tile', rm).forEach(x => x.classList.remove('on')); idle(); });
    idle();
  }
  paintRoad(1);

  /* A5: fan of 5 LO cards — hover to flip */
  const fan5 = $('#loFan');
  if (fan5) {
    LOS.forEach(lo => {
      const c = document.createElement('button');
      c.type = 'button'; c.className = 'card';
      c.innerHTML = `<span class="card-flip">
        <span class="side front"><span class="k">${lo.k}</span><h3>${lo.s}</h3><span class="more">Rê chuột để xem</span></span>
        <span class="side back"><span class="k">${lo.k}</span><p>${lo.f}</p><span class="bl">Bloom · <b>${lo.bl}</b></span></span>
      </span>`;
      const pickIt = () => {
        $$('.card', fan5).forEach(x => x.classList.toggle('pick', x === c));
        fan5.classList.add('has-pick');
      };
      c.addEventListener('mouseenter', pickIt); c.addEventListener('focus', pickIt); c.addEventListener('click', pickIt);
      fan5.append(c);
    });
    fan5.addEventListener('mouseleave', () => { fan5.classList.remove('has-pick'); $$('.card', fan5).forEach(x => x.classList.remove('pick')); });
  }

  /* A6: 4 objectives — hover to open */
  const gt = $('#goalTracks');
  if (gt) {
    const R = ['i', 'ii', 'iii', 'iv'];
    GOALS.forEach((g, i) => {
      const t = document.createElement('div');
      t.className = 'track'; t.setAttribute('aria-expanded', i === 0 ? 'true' : 'false');
      t.innerHTML = `<div class="track-head"><span class="n">${R[i]}</span><span class="t">${g.s}</span><span class="plus" aria-hidden="true"></span></div>
        <div class="track-body"><div><div class="pad"><p class="goal-txt">${g.f}</p></div></div></div>`;
      const open = () => { $$('.track', gt).forEach(x => x.setAttribute('aria-expanded', x === t ? 'true' : 'false')); $$('.arw').forEach(a => a.classList.toggle('hl', +a.dataset.i === i)); };
      t.addEventListener('mouseenter', open); t.addEventListener('click', open);
      gt.append(t);
    });
  }


  /* A6: arrow flies along an orbit then hits the bullseye */
  const bandWrap = $('.s-journey .band-wrap'), bull = $('.s-journey .bull');
  if (bandWrap && bull) {
    const NS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(NS, 'svg'); svg.setAttribute('class', 'flight'); bandWrap.append(svg);
    let raf = 0, timer = 0;
    function run() {
      cancelAnimationFrame(raf); clearTimeout(timer); bull.classList.remove('landed');
      const wr = bandWrap.getBoundingClientRect(), br = bull.getBoundingClientRect();
      const k = br.width / 120, tx = br.left - wr.left + 56 * k, ty = br.top - wr.top + 64 * k, s = br.width;
      svg.setAttribute('viewBox', `0 0 ${wr.width} ${wr.height}`);
      const d = `M${tx + 1.5 * s} ${ty - 1.5 * s} C${tx + .3 * s} ${ty - 2.1 * s},${tx - 2.2 * s} ${ty - 1.3 * s},${tx - 1.6 * s} ${ty + .4 * s}`
        + ` C${tx - 1.1 * s} ${ty + 1.6 * s},${tx + 1.4 * s} ${ty + 1.2 * s},${tx + 1.15 * s} ${ty - .2 * s}`
        + ` C${tx + 1 * s} ${ty - 1 * s},${tx + .55 * s} ${ty - .55 * s},${tx} ${ty}`;
      const L = 62 * k;
      svg.innerHTML = `<path class="trail" d="${d}"/><ellipse class="shadow" rx="${L * .45}" ry="${L * .09}"/>
        <g class="fa"><line x1="${-L}" y1="0" x2="0" y2="0" stroke="#FFFFFF" stroke-width="${7 * k}" stroke-linecap="round"/>
        <line x1="${-L}" y1="0" x2="0" y2="0" stroke="#143644" stroke-width="${3.5 * k}" stroke-linecap="round"/>
        <path d="M${2 * k} 0 L${-10 * k} ${-6 * k} L${-8 * k} 0 L${-10 * k} ${6 * k}Z" fill="#143644" stroke="#FFFFFF" stroke-width="${1.5 * k}" paint-order="stroke"/>
        <path d="M${-62 * k} 0 L${-74 * k} ${-8 * k} L${-69 * k} 0 L${-74 * k} ${8 * k}Z M${-53 * k} 0 L${-65 * k} ${-8 * k} L${-60 * k} 0 L${-65 * k} ${8 * k}Z" fill="#143644"/></g>`;
      const path = svg.querySelector('.trail'), fa = svg.querySelector('.fa'), sh = svg.querySelector('.shadow');
      const len = path.getTotalLength(); 
      const mask = document.createElementNS(NS, 'path'); mask.setAttribute('d', d);
      path.style.strokeDashoffset = 0; path.style.clipPath = 'none';
      path.style.strokeDasharray = `0.01 ${len + 10}`;
      const dur = reduce ? 1 : 3200, t0 = performance.now() + 700;
      const ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      fa.style.opacity = 0; sh.style.opacity = 0;
      const step = now => {
        const raw = Math.min(1, Math.max(0, (now - t0) / dur)), t = ease(raw), at = len * t;
        const p = path.getPointAtLength(at), q = path.getPointAtLength(Math.min(len, at + 1)), p0 = path.getPointAtLength(Math.max(0, at - 1));
        const tang = Math.atan2(q.y - p0.y, q.x - p0.x) * 180 / Math.PI;
        const settle = raw < .78 ? 0 : (raw - .78) / .22, sm = settle * settle * (3 - 2 * settle);
        const depth = Math.sin(Math.PI * raw * 2.2) * (1 - sm);
        const sc = 1 + .45 * Math.max(0, depth) - .15 * Math.max(0, -depth);
        const tilt = 1 - .35 * Math.abs(Math.cos(Math.PI * raw * 2.2)) * (1 - sm);
        let da = 135 - tang; while (da > 180) da -= 360; while (da < -180) da += 360;
        const ang = tang + da * sm;
        fa.setAttribute('transform', `translate(${p.x} ${p.y}) rotate(${ang}) scale(${sc} ${sc * tilt})`);
        fa.style.opacity = raw > 0 ? 1 : 0;
        sh.setAttribute('cx', p.x - 6 * k); sh.setAttribute('cy', p.y + 26 * k * sc); sh.style.opacity = raw > 0 ? (.55 / sc) * (1 - sm) : 0;
        sh.setAttribute('transform', `scale(1)`);
        // orbit trail drawn progressively along the arrow
        const dashes = []; for (let x = 0; x < at; x += 9) dashes.push(3, 6);
        path.style.strokeDasharray = `${Math.max(0.01, at)} ${len + 10}`;
        if (raw < 1) raf = requestAnimationFrame(step);
        else { fa.style.opacity = 0; sh.style.opacity = 0; bull.classList.add('landed');
          path.style.transition = 'opacity 1.2s ease'; timer = setTimeout(() => path.style.opacity = 0, 900); }
      };
      path.style.transition = 'none'; path.style.opacity = .55;
      raf = requestAnimationFrame(step);
    }
    const sec = bandWrap.closest('.slide');
    new MutationObserver(() => { if (sec.classList.contains('is-active')) run(); else { cancelAnimationFrame(raf); bull.classList.remove('landed'); } })
      .observe(sec, { attributes: true, attributeFilter: ['class'] });
    if (sec.classList.contains('is-active')) run();
  }

;(function(){const cv=document.querySelector('.cv-stats');if(!cv)return;const sl=cv.closest('.slide');
function run(){cv.querySelectorAll('b[data-to]').forEach((b,i)=>{const to=+b.dataset.to,dec=to%1?1:0;b.textContent='0';
setTimeout(()=>{const t0=performance.now(),dur=1300;(function f(t){const k=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-k,3);
b.textContent=(to*e).toFixed(dec);if(k<1)requestAnimationFrame(f)})(t0)},1500+i*120)})}
let was=false;new MutationObserver(()=>{const a=sl.classList.contains('is-active');if(a&&!was)run();was=a}).observe(sl,{attributes:true,attributeFilter:['class']});
if(sl.classList.contains('is-active')){was=true;run()}})();

;(function(){const sp=document.querySelector('.spark4'),path=document.getElementById('roadPath');if(!sp||!path)return;const road=sp.parentElement,len=path.getTotalLength(),DUR=7000;let t0=performance.now(),last=0;
const star='<svg viewBox="0 0 40 40"><path d="M20 0C21.5 12 28 18.5 40 20C28 21.5 21.5 28 20 40C18.5 28 12 21.5 0 20C12 18.5 18.5 12 20 0Z" fill="#FCB813"/></svg>';
function f(t){const k=((t-t0)%DUR)/DUR,p=path.getPointAtLength(len*k),W=road.clientWidth,H=road.clientHeight,x=p.x/1000*W,y=p.y/380*H;
sp.style.transform=`translate(${x}px,${y}px)`;
if(t-last>140&&road.closest('.slide').classList.contains('is-active')){last=t;const g=document.createElement('span');g.className='spark4-t';g.innerHTML=star;const s=.35+Math.random()*.4;
g.style.cssText=`transform:translate(${x+(Math.random()-.5)*22}px,${y+(Math.random()-.5)*22}px)`;g.firstChild.style.setProperty('--s',s);road.appendChild(g);setTimeout(()=>g.remove(),1000)}
requestAnimationFrame(f)}requestAnimationFrame(f)})();

  /* Page 6: place the stages along the curve */
  const path = $('#roadPath');
  if (path) {
    const len = path.getTotalLength();
    path.style.setProperty('--len', len);
    $$('.stop').forEach(st => {
      const p = path.getPointAtLength(len * +st.dataset.at);
      st.style.left = (p.x / 1000 * 100) + '%';
      st.style.top = (p.y / 380 * 100) + '%';
      st.addEventListener('mouseenter', () => { if (st.getAttribute('aria-pressed') !== 'true') st.click(); });
      st.addEventListener('click', () => {
        $$('.stop').forEach(x => x.setAttribute('aria-pressed', x === st ? 'true' : 'false'));
        paintRoad(+st.dataset.b);
      });
    });
  }

  /* Open the page being viewed (keep position when Live Preview reloads) */
  const h = parseInt(location.hash.slice(1), 10);
  show(h >= 1 && h <= N ? h - 1 : 0, 1);
})();
