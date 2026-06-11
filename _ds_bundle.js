/* @ds-bundle: {"format":3,"namespace":"KingMakerSocietyDesignSystem_b08c13","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"FaqItem","sourcePath":"components/surfaces/FaqItem.jsx"},{"name":"PricingCard","sourcePath":"components/surfaces/PricingCard.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"bad97786ca65","components/core/Badge.jsx":"1846b58969b9","components/core/Button.jsx":"1b206c63d7ed","components/core/Eyebrow.jsx":"3690bace4eac","components/surfaces/Card.jsx":"722c3b683c80","components/surfaces/FaqItem.jsx":"4d23979da477","components/surfaces/PricingCard.jsx":"953f801be85f","ui_kits/landing/landing.js":"7296024166bb"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.KingMakerSocietyDesignSystem_b08c13 = window.KingMakerSocietyDesignSystem_b08c13 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Avatar({
  initials,
  src,
  size = 56,
  color,
  style,
  ...rest
}) {
  const fontSize = size * 0.36;
  const ring = {
    width: size,
    height: size,
    borderRadius: '50%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    overflow: 'hidden',
    border: '1px solid var(--border-strong)',
    boxShadow: '0 6px 18px -8px rgba(138,95,16,0.6)',
    ...style
  };
  if (src) {
    return /*#__PURE__*/React.createElement("span", _extends({
      style: ring
    }, rest), /*#__PURE__*/React.createElement("img", {
      src: src,
      alt: initials || '',
      loading: "lazy",
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }
    }));
  }
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      ...ring,
      background: color || 'linear-gradient(150deg, var(--gold-light), var(--gold-deep))',
      fontFamily: 'var(--font-display)',
      fontSize,
      letterSpacing: '0.04em',
      color: 'var(--black)'
    }
  }, rest), initials);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Badge({
  children,
  variant = 'gold',
  style,
  ...rest
}) {
  const variants = {
    gold: {
      background: 'var(--gold)',
      color: 'var(--black)',
      border: '1px solid var(--gold)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--gold)',
      border: '1px solid var(--border-strong)'
    },
    red: {
      background: 'var(--red)',
      color: 'var(--off-white)',
      border: '1px solid var(--red)'
    },
    ghost: {
      background: 'rgba(201,168,76,0.08)',
      color: 'var(--gold-light)',
      border: '1px solid var(--border)'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      fontFamily: 'var(--font-label)',
      fontWeight: 700,
      fontSize: '0.68rem',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      padding: '5px 11px',
      borderRadius: 'var(--radius-sm)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.4em',
      lineHeight: 1,
      whiteSpace: 'nowrap',
      ...variants[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  disabled = false,
  type = 'button',
  onClick,
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '9px 18px',
      fontSize: '0.72rem',
      letterSpacing: '0.16em'
    },
    md: {
      padding: '14px 28px',
      fontSize: '0.82rem',
      letterSpacing: '0.18em'
    },
    lg: {
      padding: '18px 38px',
      fontSize: '0.95rem',
      letterSpacing: '0.2em'
    }
  };
  const variants = {
    // Red — action / commit. Urgency only.
    primary: {
      background: 'var(--red)',
      color: 'var(--off-white)',
      border: '1px solid var(--red)'
    },
    // Gold outline — secondary CTA
    outline: {
      background: 'transparent',
      color: 'var(--gold)',
      border: '1px solid var(--gold)'
    },
    // Solid gold — light-dark surfaces, trials
    gold: {
      background: 'var(--gold)',
      color: 'var(--black)',
      border: '1px solid var(--gold)'
    },
    // Ghost — tertiary, nav
    ghost: {
      background: 'transparent',
      color: 'var(--off-white)',
      border: '1px solid transparent'
    }
  };
  const base = {
    fontFamily: 'var(--font-label)',
    fontWeight: 700,
    textTransform: 'uppercase',
    borderRadius: 'var(--radius-md)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.6em',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    lineHeight: 1,
    opacity: disabled ? 0.45 : 1,
    transition: 'transform var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)',
    ...sizes[size],
    ...variants[variant],
    ...style
  };
  const hoverMap = {
    primary: {
      background: 'var(--red-light)',
      borderColor: 'var(--red-light)'
    },
    outline: {
      background: 'rgba(201,168,76,0.1)',
      color: 'var(--gold-light)',
      borderColor: 'var(--gold-light)'
    },
    gold: {
      background: 'var(--gold-light)',
      borderColor: 'var(--gold-light)'
    },
    ghost: {
      color: 'var(--gold)'
    }
  };
  const onEnter = e => {
    if (disabled) return;
    Object.assign(e.currentTarget.style, hoverMap[variant]);
    e.currentTarget.style.transform = 'translateY(-2px)';
  };
  const onLeave = e => {
    if (disabled) return;
    Object.assign(e.currentTarget.style, variants[variant]);
    e.currentTarget.style.transform = 'translateY(0)';
  };
  const Tag = href ? 'a' : 'button';
  const tagProps = href ? {
    href
  } : {
    type,
    disabled
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({}, tagProps, {
    onClick: onClick,
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
    style: base
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Eyebrow({
  children,
  color = 'gold',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      fontFamily: 'var(--font-label)',
      fontWeight: 600,
      fontSize: '0.8rem',
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: color === 'gold' ? 'var(--gold)' : 'var(--muted)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.7em',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: '28px',
      height: '1px',
      background: 'var(--gold)',
      opacity: 0.55,
      display: 'inline-block'
    }
  }), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  children,
  featured = false,
  glow = false,
  padding,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: 'relative',
      background: 'var(--surface-card)',
      border: `1px solid ${featured ? 'var(--gold)' : 'var(--border-card)'}`,
      borderRadius: 'var(--radius-md)',
      padding: padding || 'var(--space-6)',
      boxShadow: glow || featured ? 'var(--glow-gold-soft), var(--shadow-card)' : 'var(--shadow-card)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/FaqItem.jsx
try { (() => {
function FaqItem({
  question,
  answer,
  defaultOpen = false
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: '1px solid var(--border-card)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(o => !o),
    "aria-expanded": open,
    style: {
      width: '100%',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: 'var(--space-5) 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1.5rem',
      textAlign: 'left',
      color: 'var(--off-white)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-label)',
      fontWeight: 600,
      fontSize: '1.05rem',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: open ? 'var(--gold)' : 'var(--off-white)',
      transition: 'color var(--dur-fast) var(--ease-out)'
    }
  }, question), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      flexShrink: 0,
      width: '26px',
      height: '26px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--gold)',
      fontSize: '1.1rem',
      transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
      transition: 'transform var(--dur-med) var(--ease-out)'
    }
  }, "+")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateRows: open ? '1fr' : '0fr',
      transition: 'grid-template-rows var(--dur-med) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      padding: '0 2.5rem var(--space-5) 0',
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: '1.02rem',
      lineHeight: 1.75,
      color: 'var(--muted)'
    }
  }, answer))));
}
Object.assign(__ds_scope, { FaqItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/FaqItem.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/PricingCard.jsx
try { (() => {
function PricingCard({
  tier,
  price,
  cadence = '/mo',
  features = [],
  cta = 'Join',
  ctaVariant,
  featured = false,
  badge = 'Most Popular',
  href,
  onCta
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.Card, {
    featured: featured,
    padding: "0",
    style: {
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }
  }, featured && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      height: '3px',
      background: 'linear-gradient(90deg, transparent, var(--gold-light), var(--gold), transparent)',
      backgroundSize: '200% 100%',
      animation: 'kms-shimmer 2.6s linear infinite'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-6)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)',
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-label)',
      fontWeight: 700,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      fontSize: '0.95rem',
      color: 'var(--off-white)'
    }
  }, tier), featured && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    variant: "gold"
  }, badge)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: '0.3em'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '3.4rem',
      lineHeight: 0.9,
      color: 'var(--gold)',
      letterSpacing: '0.02em'
    }
  }, price), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: '0.95rem',
      color: 'var(--muted)',
      paddingBottom: '0.5rem'
    }
  }, cadence)), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.7rem',
      flex: 1
    }
  }, features.map((f, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: 'flex',
      gap: '0.7em',
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: '0.95rem',
      lineHeight: 1.5,
      color: 'var(--off-white)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      color: 'var(--gold)',
      flexShrink: 0
    }
  }, "\u25C6"), /*#__PURE__*/React.createElement("span", null, f)))), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: ctaVariant || (featured ? 'gold' : 'outline'),
    href: href,
    onClick: onCta,
    style: {
      width: '100%'
    }
  }, cta)));
}
Object.assign(__ds_scope, { PricingCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/PricingCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/landing.js
try { (() => {
/* ============================================================
   KING MAKER SOCIETY — LANDING PAGE INTERACTIONS (REDESIGN)
   ============================================================ */
(function () {
  'use strict';

  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- NAV opacity on scroll ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, {
    passive: true
  });
  onScroll();
  const toggle = document.getElementById('nav-toggle');
  if (toggle) toggle.addEventListener('click', () => {
    const p = document.getElementById('pricing');
    if (p) p.scrollIntoView({
      behavior: 'smooth'
    });
  });

  /* ---------- GOLD PARTICLE FIELD: hero + full-page background ---------- */
  function startParticles(canvas, COUNT) {
    const ctx = canvas.getContext('2d');
    let w, h, particles, raf;

    // pre-render a soft gold glow sprite (cheap to stamp many x/frame)
    const sprite = document.createElement('canvas');
    const SP = 64;
    sprite.width = SP;
    sprite.height = SP;
    const sctx = sprite.getContext('2d');
    const grad = sctx.createRadialGradient(SP / 2, SP / 2, 0, SP / 2, SP / 2, SP / 2);
    grad.addColorStop(0, 'rgba(240,224,150,1)');
    grad.addColorStop(0.25, 'rgba(201,168,76,0.85)');
    grad.addColorStop(1, 'rgba(201,168,76,0)');
    sctx.fillStyle = grad;
    sctx.fillRect(0, 0, SP, SP);
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.width = canvas.offsetWidth * dpr;
      h = canvas.height = canvas.offsetHeight * dpr;
    }
    function makeParticle(initial) {
      const z = Math.random(); // depth 0 (far) .. 1 (near)
      return {
        x: Math.random() * w,
        y: initial ? Math.random() * h : h + Math.random() * 60,
        z,
        size: z * 2.6 + 0.5,
        speed: (z * 0.7 + 0.15) * (canvas.height / 700),
        drift: (Math.random() - 0.5) * 0.3,
        alpha: z * 0.55 + 0.12,
        tw: Math.random() * Math.PI * 2,
        twSpeed: Math.random() * 0.03 + 0.008
      };
    }
    function init() {
      resize();
      particles = Array.from({
        length: COUNT
      }, () => makeParticle(true));
    }
    function frame() {
      // fade prior frame for soft trails
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(10,10,8,0.22)';
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      for (const p of particles) {
        p.y -= p.speed;
        p.x += p.drift;
        p.tw += p.twSpeed;
        const a = p.alpha * (0.65 + 0.35 * Math.sin(p.tw));
        const s = p.size * 6;
        ctx.globalAlpha = Math.max(0, Math.min(1, a));
        ctx.drawImage(sprite, p.x - s / 2, p.y - s / 2, s, s);
        if (p.y < -20) Object.assign(p, makeParticle(false));
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    }
    init();
    frame();
    let rt;
    window.addEventListener('resize', () => {
      clearTimeout(rt);
      rt = setTimeout(() => {
        cancelAnimationFrame(raf);
        init();
        frame();
      }, 200);
    });
  }
  if (!isMobile && !reduceMotion) {
    const bgCanvas = document.getElementById('bg-canvas');
    if (bgCanvas) startParticles(bgCanvas, 340);
    const heroCanvas = document.getElementById('hero-canvas');
    if (heroCanvas) startParticles(heroCanvas, 420);
  }

  /* ---------- COUNTDOWN to next Master Class (Tue & Fri, 2PM CST) ---------- */
  // CST = UTC-6 -> 2PM CST = 20:00 UTC. Tuesday = day 2, Friday = day 5.
  function nextClassDate() {
    const now = new Date();
    const out = [];
    for (let i = 0; i < 14; i++) {
      const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + i, 20, 0, 0));
      const day = d.getUTCDay();
      if ((day === 2 || day === 5) && d.getTime() > now.getTime()) out.push(d);
    }
    out.sort((a, b) => a - b);
    return out[0];
  }
  const cd = {
    d: document.getElementById('cd-d'),
    h: document.getElementById('cd-h'),
    m: document.getElementById('cd-m'),
    s: document.getElementById('cd-s')
  };
  if (cd.d) {
    let target = nextClassDate();
    const pad = n => String(n).padStart(2, '0');
    function set(el, val) {
      const v = pad(val);
      if (el.textContent !== v) el.textContent = v;
    }
    function tick() {
      let diff = target.getTime() - Date.now();
      if (diff <= 0) {
        target = nextClassDate();
        diff = target.getTime() - Date.now();
      }
      set(cd.d, Math.floor(diff / 86400000));
      set(cd.h, Math.floor(diff % 86400000 / 3600000));
      set(cd.m, Math.floor(diff % 3600000 / 60000));
      set(cd.s, Math.floor(diff % 60000 / 1000));
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- MEMBER COUNTER 0 -> 150 (ease-out cubic) ---------- */
  const counter = document.getElementById('member-count');
  if (counter) {
    let done = false;
    const animate = () => {
      if (done) return;
      done = true;
      const target = 150,
        dur = 2200,
        start = performance.now();
      const ease = t => 1 - Math.pow(1 - t, 3);
      function step(now) {
        const t = Math.min((now - start) / dur, 1);
        counter.textContent = Math.round(ease(t) * target) + '+';
        if (t < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    };
    new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animate();
          obs.disconnect();
        }
      });
    }, {
      threshold: 0.5
    }).observe(counter);
  }

  /* ---------- SCROLL REVEAL ---------- */
  const revealObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        obs.unobserve(e.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q').addEventListener('click', () => item.classList.toggle('open'));
  });

  /* ---------- MODALS (referral, privacy, terms) ---------- */
  let lastFocus = null;
  function openModal(overlay) {
    if (!overlay) return;
    lastFocus = document.activeElement;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModals() {
    document.querySelectorAll('.modal-overlay.open').forEach(o => o.classList.remove('open'));
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      openModal(document.getElementById(btn.getAttribute('data-modal')));
    });
  });
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeModals();
    });
    const x = overlay.querySelector('.modal-close');
    if (x) x.addEventListener('click', closeModals);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModals();
  });

  /* ---------- Smooth scroll for in-page anchors ---------- */
  document.querySelectorAll('a[data-scroll]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id && id.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(id);
        if (el) el.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/landing.js", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.FaqItem = __ds_scope.FaqItem;

__ds_ns.PricingCard = __ds_scope.PricingCard;

})();
