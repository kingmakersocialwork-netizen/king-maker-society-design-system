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
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- MOBILE NAV DRAWER ---------- */
  const toggle = document.getElementById('nav-toggle');
  const overlay = document.getElementById('mobile-nav-overlay');
  const drawer = document.getElementById('mobile-nav-drawer');

  function openMobileNav() {
    if (!overlay) return;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileNav() {
    if (!overlay) return;
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  function toggleMobileNav() {
    overlay && overlay.classList.contains('open') ? closeMobileNav() : openMobileNav();
  }

  if (toggle) toggle.addEventListener('click', toggleMobileNav);

  // Close on overlay backdrop click
  if (overlay) overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeMobileNav();
  });

  // Close when a link inside the drawer is tapped
  if (drawer) drawer.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => closeMobileNav());
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileNav();
  });

  /* ---------- GOLD PARTICLE FIELD: hero + full-page background ---------- */
  function startParticles(canvas, COUNT) {
    const ctx = canvas.getContext('2d');
    let w, h, particles, raf;

    // pre-render a soft gold glow sprite (cheap to stamp many x/frame)
    const sprite = document.createElement('canvas');
    const SP = 64; sprite.width = SP; sprite.height = SP;
    const sctx = sprite.getContext('2d');
    const grad = sctx.createRadialGradient(SP/2, SP/2, 0, SP/2, SP/2, SP/2);
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
      const z = Math.random();           // depth 0 (far) .. 1 (near)
      return {
        x: Math.random() * w,
        y: initial ? Math.random() * h : h + Math.random() * 60,
        z,
        size: (z * 2.6 + 0.5),
        speed: (z * 0.7 + 0.15) * (canvas.height / 700),
        drift: (Math.random() - 0.5) * 0.3,
        alpha: z * 0.55 + 0.12,
        tw: Math.random() * Math.PI * 2,
        twSpeed: Math.random() * 0.03 + 0.008,
      };
    }
    function init() {
      resize();
      particles = Array.from({ length: COUNT }, () => makeParticle(true));
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
        ctx.drawImage(sprite, p.x - s/2, p.y - s/2, s, s);
        if (p.y < -20) Object.assign(p, makeParticle(false));
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    }
    // Wait until canvas has real dimensions (iOS fixed elements can start at 0x0)
    function safeStart() {
      if (canvas.offsetWidth === 0 || canvas.offsetHeight === 0) {
        requestAnimationFrame(safeStart);
        return;
      }
      init();
      frame();
    }
    safeStart();
    let rt;
    window.addEventListener('resize', () => {
      clearTimeout(rt);
      rt = setTimeout(() => { cancelAnimationFrame(raf); init(); frame(); }, 200);
    });
  }

  /* ---------- WOVEN METAL WAVE: sitewide background shader ----------
     Fullscreen Three.js shader quad: the woven-metal texture sampled
     through a two-axis sine UV warp (the wave), with a specular pass
     derived from that same wave's analytic slope (the reflection),
     plus a soft gold radial glow blended on top. Falls back silently
     (canvas stays empty, body's dark background shows through) if
     Three.js or WebGL aren't available. */
  function startWaveBackground(canvas) {
    if (!window.THREE) return;

    const vertexShader = 'void main() {\n  gl_Position = vec4( position, 1.0 );\n}\n';
    const fragmentShader = [
      'precision highp float;',
      'uniform vec2 resolution;',
      'uniform float time;',
      'uniform sampler2D tex;',
      'uniform vec2 texAspect;',
      'uniform float texLoaded;',
      'void main(void) {',
      '  vec2 uv = gl_FragCoord.xy / resolution.xy;',
      '  vec2 screenAspect = resolution / min(resolution.x, resolution.y);',
      '  float s = max(screenAspect.x / texAspect.x, screenAspect.y / texAspect.y);',
      '  vec2 cuv = (uv - 0.5) * screenAspect / s * texAspect + 0.5;',
      '  float t = time * 0.6;',
      '  float wAmp = 0.028;',
      '  float wx = sin(cuv.y * 9.0 + t) * cos(cuv.y * 3.0 - t*0.4) * wAmp;',
      '  float wy = sin(cuv.x * 7.0 - t*0.8) * cos(cuv.x * 2.2 + t*0.3) * wAmp;',
      '  vec2 wuv = cuv + vec2(wx, wy);',
      '  float dWx = cos(cuv.y * 9.0 + t) * 9.0 * wAmp;',
      '  float dWy = cos(cuv.x * 7.0 - t*0.8) * 7.0 * wAmp;',
      '  vec3 normal = normalize(vec3(-dWy, -dWx, 1.0));',
      '  vec3 texColor = mix(vec3(0.08,0.08,0.09), texture2D(tex, wuv).rgb, texLoaded);',
      '  vec3 lightDir = normalize(vec3(0.4, 0.55, 0.7));',
      '  vec3 viewDir = vec3(0.0, 0.0, 1.0);',
      '  vec3 halfDir = normalize(lightDir + viewDir);',
      '  float spec = pow(max(dot(normal, halfDir), 0.0), 40.0);',
      '  float fres = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);',
      '  vec3 goldSpec = vec3(1.0, 0.85, 0.55) * spec * 1.1;',
      '  vec3 platFres = vec3(0.75, 0.78, 0.82) * fres * 0.22;',
      '  vec3 color = texColor * (0.78 + 0.4*normal.z) + goldSpec + platFres;',
      '  vec2 ruv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);',
      '  float rt = time * 0.05;',
      '  vec3 radial = vec3(0.0);',
      '  for(int j = 0; j < 3; j++){',
      '    for(int i = 0; i < 5; i++){',
      '      float fi = float(i); float fj = float(j);',
      '      radial[j] += 0.0016*fi*fi / (abs(fract(rt - 0.01*fj + fi*0.01)*5.0 - length(ruv) + mod(ruv.x+ruv.y, 0.2)) + 0.05);',
      '    }',
      '  }',
      '  radial = min(radial, vec3(1.4));',
      '  vec3 radialGold = vec3(radial.r*1.1, radial.g*0.85, radial.b*0.35);',
      '  color = color * 0.4 + radialGold * 0.05;', // darker, subtler sitewide ambient vs. the hero-focused preview
      '  gl_FragColor = vec4(color, 1.0);',
      '}'
    ].join('\n');

    const camera = new THREE.Camera();
    camera.position.z = 1;
    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);
    const uniforms = {
      time: { type: 'f', value: 1.0 },
      resolution: { type: 'v2', value: new THREE.Vector2() },
      tex: { type: 't', value: null },
      texAspect: { type: 'v2', value: new THREE.Vector2(1, 1) },
      texLoaded: { type: 'f', value: 0.0 },
    };
    new THREE.TextureLoader().load('assets/wave-texture.jpg', (t) => {
      t.wrapS = THREE.MirroredRepeatWrapping;
      t.wrapT = THREE.MirroredRepeatWrapping;
      t.minFilter = THREE.LinearFilter;
      const tmin = Math.min(t.image.width, t.image.height);
      uniforms.texAspect.value.set(t.image.width / tmin, t.image.height / tmin);
      uniforms.tex.value = t;
      uniforms.texLoaded.value = 1.0;
    });
    const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader });
    scene.add(new THREE.Mesh(geometry, material));

    let renderer;
    try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false }); }
    catch (e) { return; }
    if (!renderer.getContext()) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    function resize() {
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      uniforms.resolution.value.x = renderer.domElement.width;
      uniforms.resolution.value.y = renderer.domElement.height;
    }
    function safeStart() {
      if (canvas.offsetWidth === 0 || canvas.offsetHeight === 0) {
        requestAnimationFrame(safeStart);
        return;
      }
      resize();
      animate();
    }
    let raf;
    function animate() {
      raf = requestAnimationFrame(animate);
      uniforms.time.value += 0.05;
      renderer.render(scene, camera);
    }
    safeStart();
    let rt;
    window.addEventListener('resize', () => {
      clearTimeout(rt);
      rt = setTimeout(resize, 200);
    });
  }

  if (!reduceMotion) {
    const bgCanvas = document.getElementById('bg-canvas');
    if (bgCanvas) startWaveBackground(bgCanvas);
    const heroCanvas = document.getElementById('hero-canvas');
    if (heroCanvas) startWaveBackground(heroCanvas);
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
    d: document.getElementById('cd-d'), h: document.getElementById('cd-h'),
    m: document.getElementById('cd-m'), s: document.getElementById('cd-s'),
  };
  if (cd.d) {
    let target = nextClassDate();
    const pad = (n) => String(n).padStart(2, '0');
    function set(el, val) { const v = pad(val); if (el.textContent !== v) el.textContent = v; }
    function tick() {
      let diff = target.getTime() - Date.now();
      if (diff <= 0) { target = nextClassDate(); diff = target.getTime() - Date.now(); }
      set(cd.d, Math.floor(diff / 86400000));
      set(cd.h, Math.floor((diff % 86400000) / 3600000));
      set(cd.m, Math.floor((diff % 3600000) / 60000));
      set(cd.s, Math.floor((diff % 60000) / 1000));
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- MEMBER COUNTER 0 -> 300 (ease-out cubic) ---------- */
  const counter = document.getElementById('member-count');
  if (counter) {
    let done = false;
    const animate = () => {
      if (done) return; done = true;
      const target = 300, dur = 2200, start = performance.now();
      const ease = (t) => 1 - Math.pow(1 - t, 3);
      function step(now) {
        const t = Math.min((now - start) / dur, 1);
        counter.textContent = Math.round(ease(t) * target) + '+';
        if (t < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    };
    new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => { if (e.isIntersecting) { animate(); obs.disconnect(); } });
    }, { threshold: 0.5 }).observe(counter);
  }

  /* ---------- SCROLL REVEAL ---------- */
  const revealObs = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach((el) => revealObs.observe(el));

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const q = item.querySelector('.faq-q') || item.querySelector('.faq-question');
    if (q) q.addEventListener('click', () => item.classList.toggle('open'));
  });

  /* ---------- MODALS (referral, privacy, terms) ---------- */
  let lastFocus = null;
  function openModal(modalOverlay) {
    if (!modalOverlay) return;
    lastFocus = document.activeElement;
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModals() {
    document.querySelectorAll('.modal-overlay.open').forEach((o) => o.classList.remove('open'));
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  document.querySelectorAll('[data-modal]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(document.getElementById(btn.getAttribute('data-modal')));
    });
  });
  document.querySelectorAll('.modal-overlay').forEach((mo) => {
    // Don't double-bind the mobile nav overlay
    if (mo.id === 'mobile-nav-overlay') return;
    mo.addEventListener('click', (e) => { if (e.target === mo) closeModals(); });
    const x = mo.querySelector('.modal-close');
    if (x) x.addEventListener('click', closeModals);
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeModals(); closeMobileNav(); } });

  /* ---------- Smooth scroll for in-page anchors ---------- */
  document.querySelectorAll('a[data-scroll]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id && id.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
