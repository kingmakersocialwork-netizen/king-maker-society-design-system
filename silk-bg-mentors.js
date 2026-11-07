/* ============================================================
   KING MAKER SOCIETY — "SILK" WEBGL BACKGROUND (Mentors page)
   ============================================================
   Plain WebGL1, no libraries. Fullscreen triangle + the exact
   "Silk" fragment shader exported from the 21st.dev Shader Builder.
   Mounted on #bg-canvas-silk-mentors (fixed, full-viewport,
   z-index:-1, pointer-events:none — see landing.css). Replaces the
   sitewide gold "woven metal wave" background (#bg-canvas /
   landing.js) on this page only: this page's canvas uses a
   different id, so landing.js's
   `document.getElementById('bg-canvas')` lookup simply finds
   nothing and leaves it alone.

   Settings baked into the uniforms below (from the Shader Builder
   export): style "Silk", colours #140A00/#1E1D1D/#FFC300/#FFF1B8
   (blended in OKLab), speed 23, zoom 39, intensity 47, warp 0,
   contrast 42, brightness 50, saturation 46, hue 0, vignette 0,
   grain 0, cursor swirl (strength 65, radius 50).
   ============================================================ */
(function () {
  var canvas = document.getElementById('bg-canvas-silk-mentors');
  if (!canvas) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var gl = null;
  try {
    gl = canvas.getContext('webgl', { antialias: true, alpha: false, premultipliedAlpha: false })
      || canvas.getContext('experimental-webgl', { antialias: true, alpha: false, premultipliedAlpha: false });
  } catch (e) { gl = null; }
  if (!gl) return; // silently fall back to the page's plain dark background

  var VERT_SRC = [
    'attribute vec2 a_position;',
    'void main() {',
    '  gl_Position = vec4(a_position, 0.0, 1.0);',
    '}'
  ].join('\n');

  // Exact fragment shader from the Shader Builder export — unmodified.
  var FRAG_SRC = [
    '#ifdef GL_FRAGMENT_PRECISION_HIGH',
    'precision highp float;',
    '#else',
    'precision mediump float;',
    '#endif',
    '',
    'uniform vec3 u_colors[8];',
    'uniform vec4 u_scene;',
    'uniform vec4 u_shape;',
    'uniform vec4 u_surface;',
    'uniform vec4 u_finish;',
    'uniform vec4 u_transform;',
    'uniform vec4 u_space;',
    'uniform vec4 u_cursor;',
    '',
    '#define u_resolution u_scene.xy',
    '#define u_time u_scene.z',
    '#define u_colorCount u_scene.w',
    '#define u_scale u_shape.x',
    '#define u_intensity u_shape.y',
    '#define u_paramA u_shape.z',
    '#define u_warp u_shape.w',
    '#define u_detail u_surface.x',
    '#define u_contrast u_surface.y',
    '#define u_brightness u_surface.z',
    '#define u_saturation u_surface.w',
    '#define u_hue u_finish.x',
    '#define u_vignette u_finish.y',
    '#define u_blur u_finish.z',
    '#define u_grain u_finish.w',
    '#ifdef GL_FRAGMENT_PRECISION_HIGH',
    '#define u_seed u_transform.x',
    '#else',
    '#define u_seed mod(u_transform.x, 31.0)',
    '#endif',
    '#define u_rotate u_transform.y',
    '#define u_drift u_transform.z',
    '#define u_oklab u_transform.w',
    '#define u_offset u_space.xy',
    '#define u_mouse u_space.zw',
    '#define u_cursorPresence u_cursor.x',
    '#define u_cursorEffect u_cursor.y',
    '#define u_cursorStrength u_cursor.z',
    '#define u_cursorRadius u_cursor.w',
    '',
    'float hash21(vec2 p) {',
    '#ifndef GL_FRAGMENT_PRECISION_HIGH',
    '  p = mod(p, 31.0);',
    '#endif',
    '  p = fract(p * vec2(234.34, 435.345));',
    '  p += dot(p, p + 34.23);',
    '  return fract(p.x * p.y);',
    '}',
    '',
    'float grainHash(vec2 p) {',
    '  vec3 p3 = fract(vec3(p.xyx) * 0.1031);',
    '  p3 += dot(p3, p3.yzx + 33.33);',
    '  return fract((p3.x + p3.y) * p3.z);',
    '}',
    '',
    'vec2 hash22(vec2 p) {',
    '#ifndef GL_FRAGMENT_PRECISION_HIGH',
    '  p = mod(p, 31.0);',
    '#endif',
    '  float n = sin(dot(p, vec2(41.0, 289.0)));',
    '  return fract(vec2(15731.743, 7892.321) * n);',
    '}',
    '',
    'float noise(vec2 p) {',
    '  vec2 i = floor(p);',
    '  vec2 f = fract(p);',
    '  vec2 u = f * f * (3.0 - 2.0 * f);',
    '  return mix(',
    '    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),',
    '    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),',
    '    u.y);',
    '}',
    '',
    'float fbm(vec2 p) {',
    '  float v = 0.0;',
    '  float a = 0.5;',
    '  for (int i = 0; i < 5; i++) {',
    '    v += a * noise(p);',
    '    p = p * 2.03 + vec2(17.0, 9.2);',
    '    a *= 0.5;',
    '  }',
    '  return v;',
    '}',
    '',
    'vec3 srgbToLinear(vec3 c) {',
    '  return mix(c / 12.92, pow((c + 0.055) / 1.055, vec3(2.4)),',
    '    step(0.04045, c));',
    '}',
    'vec3 linearToSrgb(vec3 c) {',
    '  return mix(c * 12.92, 1.055 * pow(max(c, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055,',
    '    step(0.0031308, c));',
    '}',
    'vec3 linToOklab(vec3 c) {',
    '  float l = 0.4122214708 * c.r + 0.5363325363 * c.g + 0.0514459929 * c.b;',
    '  float m = 0.2119034982 * c.r + 0.6806995451 * c.g + 0.1073969566 * c.b;',
    '  float s = 0.0883024619 * c.r + 0.2817188376 * c.g + 0.6299787005 * c.b;',
    '  l = pow(max(l, 0.0), 1.0 / 3.0);',
    '  m = pow(max(m, 0.0), 1.0 / 3.0);',
    '  s = pow(max(s, 0.0), 1.0 / 3.0);',
    '  return vec3(',
    '    0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,',
    '    1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,',
    '    0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s);',
    '}',
    'vec3 oklabToLin(vec3 c) {',
    '  float l = c.x + 0.3963377774 * c.y + 0.2158037573 * c.z;',
    '  float m = c.x - 0.1055613458 * c.y - 0.0638541728 * c.z;',
    '  float s = c.x - 0.0894841775 * c.y - 1.2914855480 * c.z;',
    '  l = l * l * l; m = m * m * m; s = s * s * s;',
    '  return vec3(',
    '    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,',
    '    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,',
    '    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s);',
    '}',
    'vec3 mixColour(vec3 a, vec3 b, float t) {',
    '  if (u_oklab > 0.5) {',
    '    vec3 la = linToOklab(srgbToLinear(a));',
    '    vec3 lb = linToOklab(srgbToLinear(b));',
    '    return clamp(linearToSrgb(oklabToLin(mix(la, lb, t))), 0.0, 1.0);',
    '  }',
    '  return mix(a, b, t);',
    '}',
    '',
    'vec3 palette(float x) {',
    '  float n = max(u_colorCount - 1.0, 1.0);',
    '  float f = clamp(x, 0.0, 1.0) * n;',
    '  vec3 col = u_colors[0];',
    '  for (int i = 0; i < 7; i++) {',
    '    if (float(i) < n)',
    '      col = mixColour(col, u_colors[i + 1],',
    '        smoothstep(0.0, 1.0, clamp(f - float(i), 0.0, 1.0)));',
    '  }',
    '  return col;',
    '}',
    '',
    'vec3 hueRotate(vec3 col, float a) {',
    '  const mat3 toYIQ = mat3(0.299, 0.596, 0.211,',
    '                          0.587, -0.274, -0.523,',
    '                          0.114, -0.322, 0.312);',
    '  const mat3 toRGB = mat3(1.0, 1.0, 1.0,',
    '                          0.956, -0.272, -1.106,',
    '                          0.621, -0.647, 1.703);',
    '  vec3 yiq = toYIQ * col;',
    '  float ca = cos(a), sa = sin(a);',
    '  yiq = vec3(yiq.x, yiq.y * ca - yiq.z * sa, yiq.y * sa + yiq.z * ca);',
    '  return toRGB * yiq;',
    '}',
    '',
    'vec3 shade(vec2 uv, vec2 p, float t) {',
    '  vec2 q = p * 1.6;',
    '  float amp = 0.25 + u_intensity * 0.85;',
    '  for (float i = 1.0; i < 5.0; i += 1.0) {',
    '    q.x += amp / i * cos(i * 2.4 * q.y + t * 0.8 + u_seed);',
    '    q.y += amp / i * cos(i * 1.7 * q.x + t * 0.6);',
    '  }',
    '  return palette(0.5 + 0.5 * sin(q.x + q.y));',
    '}',
    '',
    'void main() {',
    '  vec2 uv = gl_FragCoord.xy / u_resolution.xy;',
    '  vec2 screenUv = uv;',
    '  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy)',
    '    / min(u_resolution.x, u_resolution.y);',
    '  float cursorMask = 0.0;',
    '',
    '  if (u_cursorPresence > 0.001) {',
    '    vec2 cursor = (0.5 * u_mouse * u_resolution.xy)',
    '      / min(u_resolution.x, u_resolution.y);',
    '    vec2 cursorDelta = p - cursor;',
    '    if (u_cursorEffect < 0.5) {',
    '      p += cursor * u_cursorPresence * u_cursorStrength * 0.55;',
    '    } else {',
    '      float cursorDistance = length(cursorDelta);',
    '      vec2 cursorDirection = cursorDelta / max(cursorDistance, 0.0001);',
    '      cursorMask = u_cursorPresence',
    '        * (1.0 - smoothstep(0.0, u_cursorRadius, cursorDistance));',
    '      if (u_cursorEffect < 1.5) {',
    '        p -= cursorDirection * cursorMask * u_cursorStrength * 0.24;',
    '      } else if (u_cursorEffect < 2.5) {',
    '        float cursorAngle = cursorMask * u_cursorStrength * 2.2;',
    '        float cc = cos(cursorAngle), cs = sin(cursorAngle);',
    '        p = cursor + mat2(cc, -cs, cs, cc) * cursorDelta;',
    '      } else if (u_cursorEffect < 3.5) {',
    '        float ripple = sin(',
    '          cursorDistance / max(u_cursorRadius, 0.001) * 18.0 - u_time * 5.0);',
    '        p -= cursorDirection * ripple * cursorMask * u_cursorStrength * 0.07;',
    '      }',
    '    }',
    '  }',
    '',
    '  uv = p * min(u_resolution.x, u_resolution.y) / u_resolution.xy + 0.5;',
    '  p *= u_scale;',
    '  if (abs(u_rotate) > 0.0001) {',
    '    float cr = cos(u_rotate), sr = sin(u_rotate);',
    '    p = mat2(cr, -sr, sr, cr) * p;',
    '  }',
    '  p += u_offset;',
    '  if (u_drift > 0.0001)',
    '    p += u_drift * vec2(sin(u_time * 0.31), cos(u_time * 0.23));',
    '  if (u_warp > 0.0) {',
    '    p += u_warp * (vec2(',
    '      fbm(p * u_detail + u_seed),',
    '      fbm(p * u_detail + vec2(5.2, 1.3))) - 0.5);',
    '  }',
    '  vec3 col;',
    '  if (u_blur > 0.0) {',
    '    float e = u_blur;',
    '    float pe = e * u_scale;',
    '    vec2 uvE = vec2(e) * min(u_resolution.x, u_resolution.y) / u_resolution.xy;',
    '    col  = shade(uv, p, u_time) * 0.36;',
    '    col += shade(uv + vec2(uvE.x, 0.0), p + vec2(pe, 0.0), u_time) * 0.16;',
    '    col += shade(uv - vec2(uvE.x, 0.0), p - vec2(pe, 0.0), u_time) * 0.16;',
    '    col += shade(uv + vec2(0.0, uvE.y), p + vec2(0.0, pe), u_time) * 0.16;',
    '    col += shade(uv - vec2(0.0, uvE.y), p - vec2(0.0, pe), u_time) * 0.16;',
    '  } else {',
    '    col = shade(uv, p, u_time);',
    '  }',
    '  if (abs(u_contrast - 1.0) > 0.0001)',
    '    col = (col - 0.5) * u_contrast + 0.5;',
    '  if (abs(u_saturation - 1.0) > 0.0001) {',
    '    float luma = dot(col, vec3(0.299, 0.587, 0.114));',
    '    col = mix(vec3(luma), col, u_saturation);',
    '  }',
    '  if (abs(u_hue) > 0.0001)',
    '    col = hueRotate(col, u_hue);',
    '  if (abs(u_brightness) > 0.0001)',
    '    col += u_brightness;',
    '  if (u_vignette > 0.0001) {',
    '    float vd = length(screenUv - 0.5) * 1.41421356;',
    '    col *= 1.0 - u_vignette * smoothstep(0.35, 1.0, vd);',
    '  }',
    '  if (u_cursorPresence > 0.001 && u_cursorEffect > 3.5)',
    '    col += (vec3(0.18) + col * 0.12) * cursorMask * u_cursorStrength;',
    '  if (u_grain > 0.0001)',
    '    col += (grainHash(',
    '      gl_FragCoord.xy + vec2(u_seed * 17.0, u_seed * 31.0)) - 0.5) * u_grain;',
    '  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);',
    '}'
  ].join('\n');

  function compile(type, src) {
    var sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      gl.deleteShader(sh);
      return null;
    }
    return sh;
  }

  var vs = compile(gl.VERTEX_SHADER, VERT_SRC);
  var fs = compile(gl.FRAGMENT_SHADER, FRAG_SRC);
  if (!vs || !fs) return;

  var prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);

  // Fullscreen triangle: one triangle covering clip space, cheaper than a quad.
  var posBuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1,
     3, -1,
    -1,  3
  ]), gl.STATIC_DRAW);
  var aPos = gl.getAttribLocation(prog, 'a_position');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  var uColors = gl.getUniformLocation(prog, 'u_colors[0]');
  var uScene = gl.getUniformLocation(prog, 'u_scene');
  var uShape = gl.getUniformLocation(prog, 'u_shape');
  var uSurface = gl.getUniformLocation(prog, 'u_surface');
  var uFinish = gl.getUniformLocation(prog, 'u_finish');
  var uTransform = gl.getUniformLocation(prog, 'u_transform');
  var uSpace = gl.getUniformLocation(prog, 'u_space');
  var uCursor = gl.getUniformLocation(prog, 'u_cursor');

  // Colours (low -> high): #140A00, #1E1D1D, #FFC300, #FFF1B8. The shader
  // only reads the first u_colorCount (4) entries; the rest are padding.
  var colors = new Float32Array([
    0.078, 0.039, 0.000,
    0.118, 0.114, 0.114,
    1.000, 0.765, 0.000,
    1.000, 0.945, 0.722,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
  ]);
  gl.uniform3fv(uColors, colors);

  // Static "feel" uniforms, exactly as packed by the Shader Builder export.
  var shape = [1.28, 0.47, 0.50, 0.00];       // scale, intensity, paramA, warp
  var surface = [2.40, 0.98, 0.00, 0.92];     // detail, contrast, brightness, saturation
  var finish = [0.00, 0.00, 0.000, 0.00];     // hue, vignette, blur, grain
  var transform = [707.0, 0.00, 0.00, 1.0];   // seed, rotation, drift, OKLab toggle
  var cursorEffect = 2.0;                     // swirl
  var cursorStrength = 0.65;
  var cursorRadius = 0.46;

  gl.uniform4f(uShape, shape[0], shape[1], shape[2], shape[3]);
  gl.uniform4f(uSurface, surface[0], surface[1], surface[2], surface[3]);
  gl.uniform4f(uFinish, finish[0], finish[1], finish[2], finish[3]);
  gl.uniform4f(uTransform, transform[0], transform[1], transform[2], transform[3]);

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var w = 0, h = 0;

  function resize() {
    var cw = canvas.clientWidth, ch = canvas.clientHeight;
    if (!cw || !ch) return;
    w = Math.round(cw * dpr);
    h = Math.round(ch * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
  }

  // Pointer tracking: canvas is pointer-events:none, so listen on the
  // document. Presence eases toward its target each frame for a soft
  // fade in/out rather than a hard swirl pop.
  var mouseX = 0, mouseY = 0, presenceTarget = 0, presence = 0;
  function onPointerMove(e) {
    var x = (e.touches && e.touches[0]) ? e.touches[0].clientX : e.clientX;
    var y = (e.touches && e.touches[0]) ? e.touches[0].clientY : e.clientY;
    if (x == null || y == null) return;
    mouseX = (x / window.innerWidth) * 2 - 1;
    mouseY = 1 - (y / window.innerHeight) * 2;
    presenceTarget = 1;
  }
  function onPointerLeave() { presenceTarget = 0; }
  window.addEventListener('mousemove', onPointerMove, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  document.addEventListener('mouseleave', onPointerLeave);
  window.addEventListener('blur', onPointerLeave);

  var raf = null;
  var startTime = null;
  var visible = !document.hidden;

  function render(now) {
    raf = null;
    if (!visible) return;
    if (startTime === null) startTime = now;
    resize();
    presence += (presenceTarget - presence) * 0.08;

    var elapsed = (now - startTime) / 1000;
    // Speed 23/100 -> seconds * -0.54 (negative: flow runs in reverse).
    gl.uniform4f(uScene, w, h, elapsed * -0.54, 4.0);
    gl.uniform4f(uSpace, 0.0, 0.0, mouseX, mouseY);
    gl.uniform4f(uCursor, presence, cursorEffect, cursorStrength, cursorRadius);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
    raf = requestAnimationFrame(render);
  }

  function start() {
    if (raf !== null) return;
    raf = requestAnimationFrame(render);
  }
  function stop() {
    if (raf !== null) { cancelAnimationFrame(raf); raf = null; }
  }

  document.addEventListener('visibilitychange', function () {
    visible = !document.hidden;
    if (visible) start(); else stop();
  });

  window.addEventListener('resize', resize);

  if (reduceMotion) {
    // Render a single static frame and skip the animation loop + cursor
    // interactivity, matching the site's existing reduced-motion behavior.
    resize();
    gl.uniform4f(uScene, w, h, 0.0, 4.0);
    gl.uniform4f(uSpace, 0.0, 0.0, 0.0, 0.0);
    gl.uniform4f(uCursor, 0.0, cursorEffect, cursorStrength, cursorRadius);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    return;
  }

  function safeStart() {
    if (canvas.clientWidth === 0 || canvas.clientHeight === 0) {
      requestAnimationFrame(safeStart);
      return;
    }
    start();
  }
  safeStart();
})();
