(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const PHONE = '917298512186';
  const root = document.documentElement;
  root.classList.add('js');

  /* ---------- Load sequence ---------- */
  const heroImg = $('.arch--hero img');
  const go = () => requestAnimationFrame(() => document.body.classList.add('is-loaded'));
  if (heroImg && !heroImg.complete) { heroImg.addEventListener('load', go, { once: true }); setTimeout(go, 1400); } else go();

  /* ---------- Scroll lock ---------- */
  let locks = 0;
  const lock = () => { if (locks++ === 0) root.style.overflow = 'hidden'; };
  const unlock = () => { if (--locks <= 0) { locks = 0; root.style.overflow = ''; } };

  /* ---------- Header + action bar ---------- */
  const head = $('[data-masthead]');
  const bar = $('[data-actionbar]');
  const heroCta = $('.hero__cta');
  let lastY = scrollY;
  const onScroll = () => {
    const y = scrollY;
    head.classList.toggle('is-solid', y > 24);
    head.classList.toggle('is-hidden', y > 640 && y > lastY + 4 && !menu.classList.contains('is-open'));
    if (y < lastY - 4 || y < 640) head.classList.remove('is-hidden');
    lastY = y;
    const ctaBottom = heroCta.getBoundingClientRect().bottom;
    bar.classList.toggle('is-shown', ctaBottom < 0);
  };
  addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const menu = $('[data-menu]');
  const menuBtn = $('[data-menu-open]');
  const openMenu = () => {
    menu.hidden = false; lock();
    requestAnimationFrame(() => menu.classList.add('is-open'));
    menuBtn.setAttribute('aria-expanded', 'true');
    $('[data-menu-close]').focus();
  };
  const closeMenu = (focusBack = true) => {
    if (menu.hidden) return;
    menu.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    unlock();
    setTimeout(() => { menu.hidden = true; }, reduced ? 0 : 650);
    if (focusBack) menuBtn.focus();
  };
  menuBtn.addEventListener('click', openMenu);
  $('[data-menu-close]').addEventListener('click', () => closeMenu());
  $$('.menu__nav a').forEach(a => a.addEventListener('click', () => closeMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) closeMenu(); });

  /* ---------- Active nav ---------- */
  const navLinks = $$('.nav a');
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['treatments', 'studio', 'doctor', 'stories', 'visit'].forEach(id => io.observe(document.getElementById(id)));

  /* ---------- Opening hours (IST) ---------- */
  const SESSIONS = [[630, 840], [990, 1230]];
  const fmt = m => {
    const h = Math.floor(m / 60), mm = m % 60, ap = h >= 12 ? 'pm' : 'am', h12 = ((h + 11) % 12) + 1;
    return mm ? `${h12}:${String(mm).padStart(2, '0')} ${ap}` : `${h12} ${ap}`;
  };
  const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const istNow = () => {
    const p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
    const get = t => p.find(x => x.type === t).value;
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
    return { day, min: +get('hour') * 60 + +get('minute') };
  };
  const status = () => {
    const { day, min } = istNow();
    const nextOpenDay = d => (d === 6 ? 'Monday' : d === 5 ? 'tomorrow' : 'tomorrow');
    if (day === 0) return { open: false, text: 'Closed today. Opens Monday at 10:30 am' };
    for (const [a, b] of SESSIONS) if (min >= a && min < b) return { open: true, text: `Open now, until ${fmt(b)}` };
    if (min < SESSIONS[0][0]) return { open: false, text: `Opens today at ${fmt(SESSIONS[0][0])}` };
    if (min < SESSIONS[1][0]) return { open: false, text: `Lunch break. Back at ${fmt(SESSIONS[1][0])}` };
    return { open: false, text: `Closed now. Opens ${nextOpenDay(day)} at 10:30 am` };
  };
  const paintStatus = () => {
    const s = status();
    $$('[data-open-text]').forEach(el => { el.textContent = s.text; });
    $$('[data-open-dot]').forEach(el => el.classList.toggle('is-closed', !s.open));
    const { day } = istNow();
    $$('.hours tr').forEach(tr => tr.classList.toggle('is-today', +tr.dataset.day === day));
  };
  paintStatus();
  setInterval(paintStatus, 60000);

  /* ---------- Treatments ---------- */
  const txList = $('[data-tx-list]');
  $$('.tx__row', txList).forEach(btn => {
    btn.addEventListener('click', () => {
      const li = btn.closest('.tx');
      const open = !li.classList.contains('is-open');
      li.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });
  $$('[data-filter]').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('[data-filter]').forEach(t => t.setAttribute('aria-selected', String(t === tab)));
      const f = tab.dataset.filter;
      $$('.tx', txList).forEach(li => { li.hidden = f !== 'all' && li.dataset.cat !== f; });
    });
  });

  /* ---------- Smile studio ---------- */
  const svg = $('[data-smile]');
  const teethG = $('[data-teeth]', svg);
  const gumP = $('[data-gum]', svg);
  const gridG = $('[data-grid]', svg);
  const scrub = $('[data-scrub]');
  const NS = 'http://www.w3.org/2000/svg';
  // per tooth (centre outwards): [width, gingival top, incisal edge, rotation]
  const IDEAL = { c: [86, 82, 204, 0], l: [53, 92, 192, 0], k: [33, 84, 196, 0], p: [20, 92, 184, 0] };
  const BEFORE = {
    R: { c: [84, 80, 205, 1], l: [50, 90, 188, 4], k: [36, 86, 199, 0], p: [22, 94, 184, 0] },
    L: { c: [80, 84, 196, -1], l: [47, 97, 197, -7], k: [37, 85, 198, 0], p: [22, 94, 185, 0] },
    gaps: { mid: 7, cl: 2, lk: 3, kp: 1 }
  };
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const toothPath = (x, w, t, b) => {
    const r = w * .24, mid = t + (b - t) * .45;
    return `M${x},${t} L${x + w},${t} C${x + w + .8},${mid} ${x + w},${b - r * 1.3} ${x + w - r * .35},${b - r * .55} ` +
      `Q${x + w - r * .9},${b + 1} ${x + w / 2},${b + 1.6} Q${x + r * .9},${b + 1} ${x + r * .35},${b - r * .55} ` +
      `C${x},${b - r * 1.3} ${x - .8},${mid} ${x},${t} Z`;
  };
  const order = ['c', 'l', 'k'];
  const gapKeys = ['cl', 'lk'];
  const els = [];
  for (let i = 0; i < 6; i++) {
    const g = document.createElementNS(NS, 'g');
    const body = document.createElementNS(NS, 'path');
    body.setAttribute('fill', 'url(#enamel)');
    body.setAttribute('stroke', 'rgba(156,116,50,.75)');
    body.setAttribute('stroke-width', '.9');
    const shine = document.createElementNS(NS, 'path');
    shine.setAttribute('stroke', 'rgba(156,116,50,.4)');
    shine.setAttribute('stroke-linecap', 'round');
    shine.setAttribute('fill', 'none');
    g.append(body, shine);
    teethG.append(g);
    els.push({ g, body, shine });
  }

  let progress = 0;
  const geometry = t => {
    const out = [];
    ['R', 'L'].forEach(side => {
      let x = 300 + (side === 'R' ? 1 : -1) * lerp(BEFORE.gaps.mid, 0, t) / 2;
      order.forEach((k, i) => {
        if (i > 0) x += (side === 'R' ? 1 : -1) * lerp(BEFORE.gaps[gapKeys[i - 1]], 0, t);
        const a = BEFORE[side][k], z = IDEAL[k];
        const w = lerp(a[0], z[0], t), top = lerp(a[1], z[1], t), bot = lerp(a[2], z[2], t), rot = lerp(a[3], z[3], t);
        const left = side === 'R' ? x : x - w;
        out.push({ side, k, left, w, top, bot, rot });
        x += (side === 'R' ? 1 : -1) * w;
      });
    });
    return out;
  };

  const renderSmile = () => {
    const t = ease(progress);
    const geo = geometry(t);
    geo.forEach((g, i) => {
      const el = els[i];
      el.body.setAttribute('d', toothPath(g.left, g.w, g.top, g.bot));
      el.shine.setAttribute('d', `M${g.left + g.w * .22},${g.bot - 15} Q${g.left + g.w / 2},${g.bot - 10} ${g.left + g.w * .78},${g.bot - 15}`);
      el.shine.setAttribute('stroke-width', '.7');
      el.g.setAttribute('transform', `rotate(${g.rot.toFixed(2)} ${g.left + g.w / 2} ${(g.top + g.bot) / 2})`);
    });
    // gum
    const sorted = [...geo].sort((a, b) => a.left - b.left);
    let d = `M0,0 L0,124 L${sorted[0].left - 10},124`;
    sorted.forEach(g => {
      d += ` L${g.left},${g.top + 26} Q${g.left + g.w / 2},${g.top - 8} ${g.left + g.w},${g.top + 26}`;
    });
    d += ` L${sorted[sorted.length - 1].left + sorted[sorted.length - 1].w + 10},124 L600,124 L600,0 Z`;
    gumP.setAttribute('d', d);

    // proportion grid on the right-hand teeth
    const R = geo.filter(g => g.side === 'R');
    const lat = R.find(g => g.k === 'l').w;
    const lines = [R[0].left, ...R.map(g => g.left + g.w)];
    const labels = R.map(g => ({ x: g.left + g.w / 2, v: (g.w / lat).toFixed(2) }));
    gridG.innerHTML = lines.map(x => `<line x1="${x.toFixed(1)}" x2="${x.toFixed(1)}" y1="38" y2="262"/>`).join('') +
      labels.map(l => `<text x="${l.x.toFixed(1)}" y="30" font-size="15">${l.v}</text>`).join('');

    const c = R.find(g => g.k === 'c').w, k = R.find(g => g.k === 'k').w;
    $('[data-r-c]').textContent = (c / 10).toFixed(1) + ' mm';
    $('[data-r-l]').textContent = (lat / 10).toFixed(1) + ' mm';
    $('[data-r-k]').textContent = (k / 10).toFixed(1) + ' mm';
    $('[data-r-ratio]').textContent = `${(c / lat).toFixed(2)} : 1 : ${(k / lat).toFixed(2)}`;
    scrub.style.setProperty('--p', (progress * 100) + '%');
  };
  scrub.addEventListener('input', () => { autoplay = false; progress = scrub.value / 100; renderSmile(); });
  $('[data-grid-toggle]').addEventListener('change', e => gridG.classList.toggle('is-off', !e.target.checked));

  const mix = (a, b, t) => {
    const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
    const A = p(a), B = p(b);
    return '#' + A.map((v, i) => Math.round(lerp(v, B[i], t)).toString(16).padStart(2, '0')).join('');
  };
  const setShade = hex => {
    $('[data-shade-top]').setAttribute('stop-color', mix(hex, '#C9A46A', .28));
    $('[data-shade-mid]').setAttribute('stop-color', hex);
    $('[data-shade-edge]').setAttribute('stop-color', mix(hex, '#AEB8BC', .32));
  };
  $$('[data-shade]').forEach(b => b.addEventListener('click', () => {
    $$('[data-shade]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    setShade(getComputedStyle(b).getPropertyValue('--c').trim());
  }));
  setShade('#E8D6B2');
  renderSmile();

  // one authored moment: the smile designs itself the first time it is seen
  let autoplay = true;
  const studioIO = new IntersectionObserver(([en]) => {
    if (!en.isIntersecting) return;
    studioIO.disconnect();
    if (reduced) return;
    const start = performance.now(), dur = 2600;
    setTimeout(() => {
      const t0 = performance.now();
      const step = now => {
        if (!autoplay) return;
        const p = Math.min(1, (now - t0) / dur);
        progress = p; scrub.value = Math.round(p * 100); renderSmile();
        if (p < 1) requestAnimationFrame(step);
        else {
          const bl = $('[data-shade="BL2"]');
          setTimeout(() => autoplay && bl.click(), 250);
        }
      };
      requestAnimationFrame(step);
    }, 500);
    void start;
  }, { threshold: .45 });
  studioIO.observe(svg);

  /* ---------- Reviews ---------- */
  const quotes = $('[data-quotes]');
  const qCount = $('[data-q-count]');
  const qItems = $$('.quote', quotes);
  const qIndex = () => Math.round(quotes.scrollLeft / (qItems[1].offsetLeft - qItems[0].offsetLeft));
  const qGo = i => {
    const n = Math.max(0, Math.min(qItems.length - 1, i));
    quotes.scrollTo({ left: qItems[n].offsetLeft - qItems[0].offsetLeft, behavior: reduced ? 'auto' : 'smooth' });
  };
  quotes.addEventListener('scroll', () => { qCount.textContent = `${qIndex() + 1} / ${qItems.length}`; }, { passive: true });
  $('[data-q-prev]').addEventListener('click', () => qGo(qIndex() - 1));
  $('[data-q-next]').addEventListener('click', () => qGo(qIndex() + 1 >= qItems.length ? 0 : qIndex() + 1));
  quotes.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); qGo(qIndex() + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); qGo(qIndex() - 1); }
  });

  /* ---------- Form helpers ---------- */
  const digits = v => v.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '');
  const fmtPhone = v => { const d = digits(v).slice(0, 10); return d.length > 5 ? d.slice(0, 5) + ' ' + d.slice(5) : d; };
  const validPhone = v => /^[6-9]\d{9}$/.test(digits(v));
  const validEmail = v => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim());
  const setErr = (input, key, msg, scope = document) => {
    const field = input.closest('.field');
    const out = $(`[data-err-for="${key}"]`, scope);
    field.classList.toggle('is-invalid', !!msg);
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (out) { out.textContent = msg || ''; out.id = out.id || 'err-' + key; input.setAttribute('aria-describedby', out.id); }
    return !msg;
  };
  $$('input[inputmode="numeric"]').forEach(inp => inp.addEventListener('input', () => {
    const end = inp.selectionStart === inp.value.length;
    inp.value = fmtPhone(inp.value);
    if (end) inp.setSelectionRange(inp.value.length, inp.value.length);
  }));

  /* ---------- Enquiry form ---------- */
  const enq = $('[data-enquiry]');
  const msg = $('#q-msg');
  msg.addEventListener('input', () => { $('[data-count]').textContent = msg.value.length; });
  const checkEnquiry = () => {
    const n = $('#q-name'), p = $('#q-phone');
    const a = setErr(n, 'name', n.value.trim().length < 2 ? 'Please enter your name.' : '', enq);
    const b = setErr(p, 'phone', !p.value.trim() ? 'Please enter a mobile number so we can reply.' : !validPhone(p.value) ? 'Enter a 10-digit Indian mobile number, for example 98200 12345.' : '', enq);
    const c = setErr(msg, 'message', msg.value.trim().length < 8 ? 'Tell us a little more, at least a few words.' : '', enq);
    return a && b && c;
  };
  $$('#q-name, #q-phone, #q-msg').forEach(el => el.addEventListener('blur', () => { if (el.value) checkEnquiry(); }));
  enq.addEventListener('submit', e => {
    e.preventDefault();
    if (!checkEnquiry()) { $('[aria-invalid="true"]', enq)?.focus(); return; }
    const btn = $('button[type="submit"]', enq);
    btn.classList.add('is-loading');
    setTimeout(() => {
      btn.classList.remove('is-loading');
      const name = $('#q-name').value.trim().split(' ')[0];
      const pref = new FormData(enq).get('pref');
      const where = pref === 'Email' ? 'by email' : pref === 'Call' ? `with a call on +91 ${fmtPhone($('#q-phone').value)}` : `on WhatsApp at +91 ${fmtPhone($('#q-phone').value)}`;
      $('[data-enquiry-msg]').textContent = `Thank you, ${name}. Dr. Shweta's team will reply ${where} within two working hours.`;
      $('[data-enquiry-done]').hidden = false;
      $('[data-enquiry-reset]').focus();
    }, 1100);
  });
  $('[data-enquiry-reset]').addEventListener('click', () => {
    enq.reset(); $('[data-count]').textContent = '0'; $('[data-enquiry-done]').hidden = true; $('#q-name').focus();
  });

  /* ---------- Newsletter ---------- */
  const jour = $('[data-journal]');
  jour.addEventListener('submit', e => {
    e.preventDefault();
    const out = $('[data-journal-msg]');
    const v = $('#j-email').value;
    if (!validEmail(v)) { out.textContent = 'That email looks incomplete. Check it and try again.'; out.classList.add('is-error'); return; }
    out.classList.remove('is-error');
    out.textContent = `Subscribed. The next note arrives in ${new Date(Date.now() + 864e5 * 40).toLocaleString('en-IN', { month: 'long' })}.`;
    jour.reset();
  });

  /* ---------- Booking ---------- */
  const dlg = $('[data-booking]');
  const form = $('[data-bk-form]');
  const TREATMENTS = [
    ['Consultation and smile assessment', '45 min, ₹1,000'],
    ['Porcelain veneers', 'Consultation first, 45 min'],
    ['Composite bonding', 'Consultation first, 45 min'],
    ['Teeth whitening', '75 min session'],
    ['Smile makeover', 'Smile design consultation, 60 min'],
    ['Clear aligners', '3D scan and consultation, 45 min'],
    ['Dental implants', 'Assessment with CBCT, 45 min'],
    ['Crowns and bridges', 'Consultation, 30 min'],
    ['Root canal treatment', 'Assessment, 30 min'],
    ['Cleaning and check-up', '45 min, ₹2,000'],
    ['Gum treatment', 'Assessment, 30 min'],
    ['Pain or emergency', 'Same-day slot if available']
  ];
  $('[data-bk-treatments]').innerHTML = TREATMENTS.map(([n, s], i) =>
    `<label class="opt"><input type="radio" name="treatment" value="${n}" ${i === 0 ? 'checked' : ''}><span><b>${n}</b><small>${s}</small></span></label>`).join('');

  const MORNING = [630, 675, 720, 765];
  const EVENING = [990, 1035, 1080, 1125, 1170];
  const state = { step: 1, day: null, slot: null };
  const hash = s => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return (h >>> 0) / 4294967295; };
  const days = [];
  {
    const base = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    base.setHours(0, 0, 0, 0);
    for (let i = 0; i < 15; i++) { const d = new Date(base); d.setDate(base.getDate() + i); days.push(d); }
  }
  const dayKey = d => d.toISOString().slice(0, 10) + d.getDate();
  const daysEl = $('[data-bk-days]');
  daysEl.innerHTML = days.map((d, i) => {
    const closed = d.getDay() === 0;
    const label = i === 0 ? 'Today' : i === 1 ? 'Tmrw' : d.toLocaleDateString('en-IN', { weekday: 'short' });
    return `<button type="button" class="day" role="radio" aria-checked="false" data-i="${i}" ${closed ? 'disabled aria-label="Sunday, closed"' : ''}><small>${closed ? 'Closed' : label}</small><b>${d.getDate()}</b><small>${d.toLocaleDateString('en-IN', { month: 'short' })}</small></button>`;
  }).join('');
  const renderSlots = () => {
    const box = $('[data-bk-slots]');
    if (state.day == null) { box.innerHTML = '<p class="slots__empty">Pick a day to see open times.</p>'; return; }
    const d = days[state.day];
    const nowMin = state.day === 0 ? istNow().min + 60 : -1;
    const group = (title, list) => {
      const btns = list.map(m => {
        const taken = hash(dayKey(d) + m) < .34 || m < nowMin;
        return `<button type="button" class="slot" role="radio" aria-checked="${state.slot === m}" data-m="${m}" ${taken ? 'disabled aria-label="' + fmt(m) + ', booked"' : ''}>${fmt(m)}</button>`;
      }).join('');
      return `<div class="slots__group"><h3>${title}</h3><div class="slots" role="radiogroup" aria-label="${title} times">${btns}</div></div>`;
    };
    box.innerHTML = group('Morning', MORNING) + group('Evening', EVENING);
    if (!$('.slot:not(:disabled)', box)) box.innerHTML = '<p class="slots__empty">This day is fully booked. Try the next day, or call us and we will try to fit you in.</p>';
  };
  daysEl.addEventListener('click', e => {
    const b = e.target.closest('.day'); if (!b || b.disabled) return;
    state.day = +b.dataset.i; state.slot = null;
    $$('.day', daysEl).forEach(x => x.setAttribute('aria-checked', String(x === b)));
    renderSlots(); $('[data-bk-err2]').textContent = '';
  });
  $('[data-bk-slots]').addEventListener('click', e => {
    const b = e.target.closest('.slot'); if (!b || b.disabled) return;
    state.slot = +b.dataset.m;
    $$('.slot').forEach(x => x.setAttribute('aria-checked', String(x === b)));
    $('[data-bk-err2]').textContent = '';
  });

  const longDate = d => d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
  const showStep = n => {
    state.step = n;
    $$('.bk-step', form).forEach(s => { s.hidden = +s.dataset.step !== n; });
    $('[data-bk-back]').hidden = n === 1 || n === 5;
    $('[data-bk-foot]').hidden = n === 5;
    $('[data-bk-steplabel]').textContent = n === 5 ? 'Confirmed' : `Step ${n} of 4`;
    $('[data-bk-bar]').style.transform = `scaleX(${Math.min(n, 4) / 4})`;
    const next = $('[data-bk-next]');
    next.textContent = n === 4 ? 'Confirm booking' : 'Continue';
    form.scrollTop = 0;
    if (n === 2 && state.day == null) {
      const first = $('.day:not(:disabled)', daysEl); first.click();
    }
    if (n === 4) {
      const f = new FormData(form);
      const d = days[state.day];
      $('[data-bk-summary]').innerHTML = [
        ['For', f.get('treatment')],
        ['When', `${longDate(d)}, ${fmt(state.slot)}`],
        ['Name', f.get('name')],
        ['Mobile', '+91 ' + fmtPhone(f.get('phone'))],
        f.get('email') ? ['Email', f.get('email')] : null,
        ['Where', '2nd Floor, Sea Breeze Court, 33rd Road, Bandra West']
      ].filter(Boolean).map(([k, v]) => `<div><dt>${k}</dt><dd>${String(v).replace(/</g, '&lt;')}</dd></div>`).join('');
    }
    const h = $(`.bk-step[data-step="${n}"] h2`, form);
    h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true });
  };
  const checkStep = n => {
    if (n === 2) {
      if (state.day == null || state.slot == null) { $('[data-bk-err2]').textContent = 'Choose a time to continue.'; return false; }
    }
    if (n === 3) {
      const nm = $('#b-name'), ph = $('#b-phone'), em = $('#b-email');
      const a = setErr(nm, 'b-name', nm.value.trim().length < 2 ? 'Please enter your full name.' : '', dlg);
      const b = setErr(ph, 'b-phone', !validPhone(ph.value) ? 'Enter a 10-digit Indian mobile number, for example 98200 12345.' : '', dlg);
      const c = setErr(em, 'b-email', em.value && !validEmail(em.value) ? 'That email looks incomplete, or leave it blank.' : '', dlg);
      if (!(a && b && c)) { $('[aria-invalid="true"]', dlg).focus(); return false; }
    }
    return true;
  };
  $('[data-bk-next]').addEventListener('click', () => {
    if (!checkStep(state.step)) return;
    if (state.step < 4) return showStep(state.step + 1);
    const btn = $('[data-bk-next]');
    btn.classList.add('is-loading');
    setTimeout(() => { btn.classList.remove('is-loading'); confirmBooking(); }, 1300);
  });
  $('[data-bk-back]').addEventListener('click', () => showStep(Math.max(1, state.step - 1)));

  let booking = null;
  const confirmBooking = () => {
    const f = new FormData(form);
    const d = days[state.day];
    const ref = 'DSC-' + String(d.getDate()).padStart(2, '0') + String(d.getMonth() + 1).padStart(2, '0') + '-' + Math.floor(100 + Math.random() * 900);
    booking = { ref, d, m: state.slot, treatment: f.get('treatment'), name: f.get('name').trim() };
    $('[data-bk-ref]').textContent = ref;
    $('[data-bk-donetext]').textContent = `See you on ${longDate(d)} at ${fmt(state.slot)}, ${booking.name.split(' ')[0]}. We've sent the details by SMS to +91 ${fmtPhone(f.get('phone'))}.`;
    const wa = `Hello, I've booked ${booking.treatment} on ${longDate(d)} at ${fmt(state.slot)}. Reference ${ref}. Please send me a reminder.`;
    $('[data-bk-wa]').href = `https://wa.me/${PHONE}?text=${encodeURIComponent(wa)}`;
    showStep(5);
  };
  $('[data-bk-ics]').addEventListener('click', () => {
    if (!booking) return;
    const { d, m } = booking;
    const pad = n => String(n).padStart(2, '0');
    // IST is UTC+5:30
    const startUTC = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 0, m - 330));
    const endUTC = new Date(startUTC.getTime() + 45 * 60000);
    const z = x => `${x.getUTCFullYear()}${pad(x.getUTCMonth() + 1)}${pad(x.getUTCDate())}T${pad(x.getUTCHours())}${pad(x.getUTCMinutes())}00Z`;
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Dr. Shweta Dental Clinic//Booking//EN', 'BEGIN:VEVENT',
      `UID:${booking.ref}@drshwetadental.in`, `DTSTAMP:${z(new Date())}`, `DTSTART:${z(startUTC)}`, `DTEND:${z(endUTC)}`,
      `SUMMARY:${booking.treatment}, Dr. Shweta Dental Clinic`,
      'LOCATION:2nd Floor\\, Sea Breeze Court\\, 33rd Road\\, off Linking Road\\, Bandra West\\, Mumbai 400050',
      `DESCRIPTION:Booking reference ${booking.ref}. To reschedule call +91 72985 12186.`,
      'BEGIN:VALARM', 'TRIGGER:-PT2H', 'ACTION:DISPLAY', 'DESCRIPTION:Dental appointment in 2 hours', 'END:VALARM',
      'END:VEVENT', 'END:VCALENDAR'
    ].join('\r\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
    a.download = `dr-shweta-${booking.ref}.ics`;
    document.body.append(a); a.click(); a.remove();
  });

  const openBooking = pre => {
    closeMenu(false);
    form.reset();
    $$('.field', dlg).forEach(f => f.classList.remove('is-invalid'));
    $$('[data-err-for]', dlg).forEach(e => { e.textContent = ''; });
    state.day = null; state.slot = null;
    $$('.day', daysEl).forEach(x => x.setAttribute('aria-checked', 'false'));
    renderSlots();
    let start = 1;
    if (pre) {
      const r = $(`input[name="treatment"][value="${pre}"]`, form);
      if (r) { r.checked = true; start = 2; }
    }
    dlg.showModal(); lock();
    showStep(start);
    bar.classList.remove('is-shown');
  };
  $$('[data-book]').forEach(b => b.addEventListener('click', () => openBooking(b.dataset.book)));
  const closeBooking = () => dlg.close();
  $('[data-bk-close]').addEventListener('click', closeBooking);
  dlg.addEventListener('close', () => { unlock(); onScroll(); });
  dlg.addEventListener('click', e => {
    if (e.target !== dlg) return;
    const r = dlg.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) closeBooking();
  });
  form.addEventListener('submit', e => { e.preventDefault(); $('[data-bk-next]').click(); });
  form.addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.target.tagName === 'INPUT' && e.target.type !== 'radio') { e.preventDefault(); $('[data-bk-next]').click(); }
  });

  onScroll();
})();
