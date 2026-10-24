/* Zvířátková dílna – obrázky k vybarvování, styl V4 (kawaii).
   Každý obrázek je SVG 400×400 složené z oblastí (class "r"), které dítě vybarvuje.
   data-nc = barva oblasti v režimu „Podle čísel“ (cílová barva). Oči (k + hl), tvářičky (ck)
   a pusinky (l2) nejsou oblasti, nevybarvují se a čísla se jim vyhýbají.
   Pravidla stylu: docs/STYLE_GUIDE.md → Obrázky a čísla. */
window.ZD_ART = (() => {
  const c = (x, y, r, k = 'r') => `<circle class="${k}" cx="${x}" cy="${y}" r="${r}"/>`;
  const e = (x, y, rx, ry, k = 'r', rot = 0) => `<ellipse class="${k}" cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"${rot ? ` transform="rotate(${rot} ${x} ${y})"` : ''}/>`;
  const p = (d, k = 'r') => `<path class="${k}" d="${d}"/>`;
  const rc = (x, y, w, h, rx, k = 'r') => `<rect class="${k}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"/>`;
  // class hacks: a region with its colour-by-number colour (data-nc), and the home-screen glitter demo (data-d)
  const N = col => `r" data-nc="${col}`;
  const ND = (col, d) => `r" data-nc="${col}" data-d="${d}`;
  const f1 = v => +v.toFixed(1);

  /* ---------- palette (target colours) ---------- */
  const K = {
    sky: '#A8D8FF', dusk: '#C9B8F5', night: '#3D4A9E', water: '#8FD3F5', sea: '#5EC2F0', deep: '#7FB8F5',
    grass: '#9BD67B', leaf: '#59B868', lime: '#C6E86E', mint: '#A8EBC9', teal: '#6FD6CF',
    sun: '#FFD86B', yellow: '#FFE066', lemon: '#FFF3A0', orange: '#FFB066', fox: '#FF9F59', coral: '#FF8A7A', red: '#FF6B6B',
    pink: '#FFB3D9', rose: '#FF8FBF', blush: '#FFD3E6', lilac: '#C8A8F5', purple: '#B48CF2', grape: '#9A6FE0',
    white: '#FFFFFF', cream: '#FFF1DD', sand: '#FFE3A8', tan: '#E8C097', brown: '#C99A6E', cocoa: '#A97C5A',
    grey: '#C9CFD8', slate: '#8C93A8', dark: '#5B5F7A', ink: '#4A4560', ice: '#DDF3FF', blue: '#9CC8F5', navy: '#4A5BA8', ele: '#BFCBE6', pale: '#E9F7D9', snowsky: '#BFE6FF', forest: '#3E8A6A', croc: '#7CCB6A',
    gPink: 'url(#g-pink)', gLilac: 'url(#g-lilac)', gGold: 'url(#g-gold)', gBlue: 'url(#g-blue)', gMint: 'url(#g-mint)'
  };

  /* ---------- scenery ---------- */
  const SKY = (col = K.sky) => `<rect class="r bg" data-nc="${col}" width="400" height="400"/>`;
  const HILL = (col = K.grass) => p('M-10 306 C70 290 140 294 200 300 C270 306 330 288 410 296 L410 410 L-10 410 Z', N(col));
  // cloud: x,y = bottom left; about 122×60 at s = 1
  const cloud = (x, y, s = 1, col = K.white) => p(`M${x} ${y} c${f1(-18 * s)} 0 ${f1(-26 * s)} ${f1(-18 * s)} ${f1(-14 * s)} ${f1(-30 * s)} c${f1(2 * s)} ${f1(-16 * s)} ${f1(22 * s)} ${f1(-22 * s)} ${f1(34 * s)} ${f1(-14 * s)} c${f1(8 * s)} ${f1(-16 * s)} ${f1(34 * s)} ${f1(-18 * s)} ${f1(44 * s)} ${f1(-2 * s)} c${f1(16 * s)} ${f1(-4 * s)} ${f1(30 * s)} ${f1(8 * s)} ${f1(26 * s)} ${f1(24 * s)} c${f1(14 * s)} ${f1(4 * s)} ${f1(14 * s)} ${f1(22 * s)} ${f1(-2 * s)} ${f1(24 * s)} Z`, N(col));
  function sun(x = 348, y = 64, r = 31, col = K.sun) {
    const rays = Array.from({ length: 8 }, (_, i) => {
      const a = i * Math.PI / 4 + Math.PI / 8;
      return `M${f1(x + Math.cos(a) * (r + 9))} ${f1(y + Math.sin(a) * (r + 9))} L${f1(x + Math.cos(a) * (r + 19))} ${f1(y + Math.sin(a) * (r + 19))}`;
    }).join(' ');
    return p(rays, 'l') + c(x, y, r, N(col)) + c(x - 9, y + 5, 3.2, 'k') + c(x + 9, y + 5, 3.2, 'k') +
      p(`M${x - 6} ${y + 14} Q${x} ${y + 19} ${x + 6} ${y + 14}`, 'l2') + e(x - 17, y + 13, 4.5, 3, 'ck') + e(x + 17, y + 13, 4.5, 3, 'ck');
  }
  function star(cx, cy, R, r, k = 'r', n = 5) {
    let d = '';
    for (let i = 0; i < n * 2; i++) { const a = -Math.PI / 2 + i * Math.PI / n, q = i % 2 ? r : R; d += (i ? 'L' : 'M') + f1(cx + q * Math.cos(a)) + ' ' + f1(cy + q * Math.sin(a)) + ' '; }
    return p(d + 'Z', k);
  }
  const heart = (x, y, s, k = 'r') => p(`M${x} ${f1(y + s * .9)} C${f1(x - s * 1.2)} ${f1(y + s * .1)} ${f1(x - s * .5)} ${f1(y - s * .6)} ${x} ${y} C${f1(x + s * .5)} ${f1(y - s * .6)} ${f1(x + s * 1.2)} ${f1(y + s * .1)} ${x} ${f1(y + s * .9)} Z`, k);
  function scallop(cx, cy, R, n, bump, a0 = 0) {
    let d = '';
    for (let i = 0; i < n; i++) {
      const s = a0 + i / n * Math.PI * 2, t = a0 + (i + 1) / n * Math.PI * 2, m = (s + t) / 2;
      if (!i) d += `M${f1(cx + R * Math.cos(s))} ${f1(cy + R * Math.sin(s))} `;
      d += `Q${f1(cx + (R + bump * 2) * Math.cos(m))} ${f1(cy + (R + bump * 2) * Math.sin(m))} ${f1(cx + R * Math.cos(t))} ${f1(cy + R * Math.sin(t))} `;
    }
    return d + 'Z';
  }
  // a flower: petals + centre (small, they colour themselves in colour-by-number)
  const flower = (x, y, s = 1, petal = K.pink, mid = K.sun) =>
    [0, 1, 2, 3, 4].map(i => { const a = -Math.PI / 2 + i * 2 * Math.PI / 5; return c(f1(x + Math.cos(a) * 9 * s), f1(y + Math.sin(a) * 9 * s), f1(7 * s), N(petal)); }).join('') + c(x, y, f1(5.5 * s), N(mid));
  // smooth curve through points (quadratic through the midpoints), continues a path
  function thru(P) {
    let d = '';
    for (let i = 1; i < P.length - 1; i++) d += `Q${f1(P[i][0])} ${f1(P[i][1])} ${f1((P[i][0] + P[i + 1][0]) / 2)} ${f1((P[i][1] + P[i + 1][1]) / 2)} `;
    const z = P[P.length - 1]; return d + `L${f1(z[0])} ${f1(z[1])} `;
  }
  // a soft tube along a centre line (tentacles, tails, trunks): width w0 → w1, rounded tip
  function tube(C, w0, w1, k, sweep = 1) {
    const n = C.length, A = [], B = [];
    C.forEach((q, i) => {
      const a = C[Math.max(0, i - 1)], b = C[Math.min(n - 1, i + 1)], dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1;
      const w = (w0 + (w1 - w0) * i / (n - 1)) / 2;
      A.push([q[0] - dy / l * w, q[1] + dx / l * w]); B.push([q[0] + dy / l * w, q[1] - dx / l * w]);
    });
    const r = w1 / 2, Br = B.slice().reverse();
    return p(`M${f1(A[0][0])} ${f1(A[0][1])} ` + thru(A) + `A${f1(r)} ${f1(r)} 0 0 ${sweep} ${f1(B[n - 1][0])} ${f1(B[n - 1][1])} ` + thru(Br) + 'Z', k);
  }
  const tuft = (x, y) => p(`M${x - 8} ${y} L${x - 4} ${y - 9} L${x} ${y} L${x + 4} ${y - 9} L${x + 8} ${y}`, 'l2');

  /* ---------- faces ---------- */
  const eye = (x, y, s = 1) => e(x, y, f1(8.5 * s), f1(10.4 * s), 'k') + c(f1(x + 2.8 * s), f1(y - 4 * s), f1(3.4 * s), 'hl') + c(f1(x - 2.6 * s), f1(y + 4.4 * s), f1(1.7 * s), 'hl');
  const eyes = (x1, x2, y, s = 1) => eye(x1, y, s) + eye(x2, y, s);
  const cheeks = (x1, x2, y, s = 1) => e(x1, y, f1(9 * s), f1(5.5 * s), 'ck') + e(x2, y, f1(9 * s), f1(5.5 * s), 'ck');
  const smile = (x, y, w = 7) => p(`M${f1(x - w)} ${y} Q${x} ${f1(y + w)} ${f1(x + w)} ${y}`, 'l2');
  const wmouth = (x, y, w = 6) => p(`M${x} ${y} Q${x} ${f1(y + w)} ${f1(x - w)} ${f1(y + w)} M${x} ${y} Q${x} ${f1(y + w)} ${f1(x + w)} ${f1(y + w)}`, 'l2');
  const happyEye = (x, y, s = 1) => p(`M${f1(x - 8 * s)} ${f1(y + 3 * s)} Q${x} ${f1(y - 8 * s)} ${f1(x + 8 * s)} ${f1(y + 3 * s)}`, 'l2');
  const lashes = (x1, x2, y, s = 1) => p(`M${f1(x1 - 8 * s)} ${f1(y - 5 * s)} L${f1(x1 - 13.5 * s)} ${f1(y - 8.5 * s)} M${f1(x2 + 8 * s)} ${f1(y - 5 * s)} L${f1(x2 + 13.5 * s)} ${f1(y - 8.5 * s)}`, 'l2');
  // standard face: eyes, cheeks and a smile under the eyes (x = middle)
  const face = (x, y, d = 30, s = 1, mouth = 'smile') => eyes(x - d, x + d, y, s) + cheeks(x - d - 24 * s, x + d + 24 * s, f1(y + 20 * s), s) +
    (mouth === 'w' ? wmouth(x, f1(y + 16 * s), f1(6 * s)) : mouth ? smile(x, f1(y + 18 * s), f1(6 * s)) : '');

  /* ---------- sitting animal (front view): big head over a small round body ---------- */
  // body + belly + feet + arms, all in colour `col`, belly in `bel`
  const seat = (col, bel, o = {}) =>
    e(200, o.by || 272, o.bw || 62, 52, N(col)) + (bel ? e(200, (o.by || 272) + 14, 34, 30, N(bel)) : '') +
    e(146, 270, 15, 24, N(o.arm || col), 22) + e(254, 270, 15, 24, N(o.arm || col), -22) +
    e(170, 328, 25, 13, N(o.foot || col)) + e(230, 328, 25, 13, N(o.foot || col));

  // lying pony (Jednorožec na louce, Okřídlený jednorožec, Koník, Zebra); head on the right, tail on the left
  function pony(o) {
    const body = o.body, m = o.mane, t = o.tail || o.mane, hoof = o.hoof || K.lilac, inner = o.inner || K.rose;
    return c(110, 276, 22, N(t[1])) + p('M102 280 Q100 268 110 267 Q118 267 118 275', 'l2') +
      c(132, 238, 24, N(t[0])) + p('M123 242 Q121 229 132 228 Q141 228 141 237', 'l2') +
      p('M120 300 C112 262 140 226 196 224 C246 222 278 246 284 280 C288 300 276 312 256 312 L140 312 C128 312 122 308 120 300 Z', N(body)) +
      (o.stripes || '') + p('M146 306 Q147 284 168 277', 'l2') +
      p('M232 312 Q232 296 244 296 Q256 296 256 312 Z', N(hoof)) + p('M258 312 Q258 296 270 296 Q282 296 282 312 Z', N(hoof)) +
      (o.wing || '') +
      (o.oneMane ? p('M212 138 C186 136 176 160 184 176 C164 184 164 220 184 228 C174 250 196 268 216 260 C234 254 238 232 228 222 L252 190 L240 150 C236 142 226 138 212 138 Z', N(m[0])) +
        p('M190 208 Q188 194 200 193 Q210 193 210 203 M201 166 Q199 153 210 152 Q219 152 219 161 M198 244 Q196 232 206 231 Q214 231 214 239', 'l2') :
      c(206, 240, 22, N(m[2])) + p('M198 244 Q196 232 206 231 Q214 231 214 239', 'l2') +
      c(200, 204, 26, N(m[1])) + p('M190 208 Q188 194 200 193 Q210 193 210 203', 'l2') +
      c(210, 162, 24, N(m[0])) + p('M201 166 Q199 153 210 152 Q219 152 219 161', 'l2')) +
      p('M228 166 Q222 128 236 110 Q252 122 256 150 Z', N(body)) + p('M236 154 Q233 134 240 123 Q247 131 248 148 Z', N(inner)) +
      p('M324 166 Q330 128 316 110 Q300 122 296 150 Z', N(body)) + p('M316 154 Q319 134 312 123 Q305 131 304 148 Z', N(inner)) +
      (o.horn ? p('M261 148 Q267 110 273 80 Q276 70 279 80 Q285 110 291 148 Z', N(o.horn)) + p('M266.5 129.5 L284.5 122 M269 111.5 L282 104 M271.8 94.5 L279.8 89.5', 'l2') : '') +
      e(276, 190, 58, 54, N(body)) + (o.headDeco || '') +
      (o.forelock ? p('M244 148 Q258 124 278 138 Q292 124 308 140 Q294 150 280 148 Q264 162 244 148 Z', N(m[0])) : '') +
      e(237, 211, 9, 5.5, 'ck') + e(315, 211, 9, 5.5, 'ck') + eyes(254, 298, 193) + lashes(254, 298, 193) + smile(276, 210, 7);
  }
  // big baby unicorn face (Malý jednorožec, Jednorožčí princezna, Jednorožec a duha); D markers feed the home-screen glitter demo
  function babyFace(crown, muzzle = K.blush) {
    return p(scallop(200, 214, 104, 13, 11), ND(K.gPink, 'g-pink')) +
      p('M132 148 Q110 94 128 70 Q160 92 174 128 Z', N(K.white)) + p('M268 148 Q290 94 272 70 Q240 92 226 128 Z', N(K.white)) +
      p('M138 136 Q126 102 134 86 Q152 104 160 126 Z', ND(K.gLilac, 'g-lilac')) + p('M262 136 Q274 102 266 86 Q248 104 240 126 Z', ND(K.gLilac, 'g-lilac')) +
      p('M184 134 L200 40 L216 134 Z', ND(K.gGold, 'g-gold')) + p('M189 114 L211 108 M192 94 L208 89 M195 74 L205 71', 'l2') +
      e(200, 222, 92, 84, N(K.white)) +
      p('M150 150 Q200 112 250 150 Q234 144 220 164 Q200 142 180 164 Q166 144 150 150 Z', ND(K.gLilac, 'g-lilac')) +
      (crown ? p('M146 152 L152 104 L178 130 L200 92 L222 130 L248 104 L254 152 Q200 140 146 152 Z', ND(K.gGold, 'g-gold')) + c(200, 120, 7, N(K.rose)) + c(160, 132, 5.5, N(K.blue)) + c(240, 132, 5.5, N(K.blue)) : '') +
      e(200, 272, 46, 28, N(muzzle)) + e(187, 264, 3, 4.2, 'k') + e(213, 264, 3, 4.2, 'k') + smile(200, 280, 9) +
      eyes(160, 240, 220, 1.35) + lashes(160, 240, 220, 1.35) +
      c(132, 250, 12, ND(K.gPink, 'g-pink')) + c(268, 250, 12, ND(K.gPink, 'g-pink'));
  }

  const PAGES = [];
  const add = (id, name, emoji, svg, extra = {}) => PAGES.push({ id, name, e: emoji, v: 4, svg, ...extra });

  /* ===== Kočička ===== */
  add('cat', 'Kočička', '🐈', SKY() + sun() + cloud(40, 86, .8) + HILL() +
    p('M248 300 C298 304 322 270 312 238 C306 222 290 226 294 240 C302 266 288 284 246 284 Z', N(K.orange)) +
    seat(K.orange, K.cream) +
    p('M134 140 L128 84 Q129 74 138 78 L182 112 Z', N(K.orange)) + p('M266 140 L272 84 Q271 74 262 78 L218 112 Z', N(K.orange)) +
    p('M142 124 L140 94 L166 112 Z', N(K.pink)) + p('M258 124 L260 94 L234 112 Z', N(K.pink)) +
    e(200, 172, 78, 66, N(K.orange)) +
    p('M188 116 L190 128 M200 113 L200 126 M212 116 L210 128', 'l2') +
    face(200, 178, 32, 1, false) + p('M193 194 L207 194 L200 202 Z', N(K.pink)) + wmouth(200, 202, 7) +
    p('M118 194 L146 198 M118 208 L146 206 M282 194 L254 198 M282 208 L254 206', 'l2'));

  /* ===== Pejsek ===== */
  add('dog', 'Pejsek', '🐕', SKY() + sun() + cloud(34, 92, .8, K.cream) + HILL() +
    c(54, 334, 20, N(K.teal)) + p('M36 326 Q54 340 72 326', 'l2') +
    p('M250 296 C280 292 294 270 288 248 C284 236 272 240 274 252 C278 268 268 280 246 282 Z', N(K.tan)) +
    seat(K.tan, K.cream) +
    rc(150, 222, 100, 20, 10, N(K.teal)) + c(200, 252, 10, N(K.sun)) +
    e(200, 168, 78, 66, N(K.tan)) + e(232, 160, 22, 20, N(K.cocoa)) +
    p('M138 118 C108 116 94 152 100 188 C104 210 124 216 134 200 C146 182 152 148 138 118 Z', N(K.cocoa)) +
    p('M262 118 C292 116 306 152 300 188 C296 210 276 216 266 200 C254 182 248 148 262 118 Z', N(K.cocoa)) +
    e(200, 202, 32, 22, N(K.cream)) + eyes(168, 232, 166) + cheeks(142, 258, 188) +
    e(200, 192, 11, 7.5, 'k') + c(196, 190, 2.4, 'hl') + p('M200 199 L200 205 M189 206 Q194 213 200 205 Q206 213 211 206', 'l2'));

  /* ===== Prasátko ===== */
  add('pig', 'Prasátko', '🐖', SKY() + sun() + cloud(36, 88, .8) + HILL() + flower(62, 326, 1.4, K.rose) + flower(344, 334, 1.1, K.rose) +
    p('M258 262 C270 256 276 246 268 240 C262 236 256 244 262 248 C268 252 276 248 280 242', 'l') +
    seat(K.pink, K.blush) +
    p('M140 134 Q116 122 114 92 Q116 82 127 86 Q158 98 178 118 Z', N(K.pink)) + p('M260 134 Q284 122 286 92 Q284 82 273 86 Q242 98 222 118 Z', N(K.pink)) +
    p('M146 122 Q130 110 128 96 Q150 104 166 118 Z', N(K.rose)) + p('M254 122 Q270 110 272 96 Q250 104 234 118 Z', N(K.rose)) +
    e(200, 172, 80, 66, N(K.pink)) + e(200, 198, 32, 22, N(K.rose)) + e(189, 198, 4.5, 7, 'k') + e(211, 198, 4.5, 7, 'k') +
    eyes(156, 244, 170) + cheeks(134, 266, 196) + smile(200, 226, 7));

  /* ===== Medvídek ===== */
  add('bear', 'Medvídek', '🐻', SKY() + sun() + cloud(36, 88, .8) + HILL() +
    rc(282, 262, 70, 66, 22, N(K.orange)) + rc(276, 250, 82, 20, 9, N(K.yellow)) + p('M296 270 Q300 290 306 280 Q312 296 318 272', 'l2') +
    seat(K.brown, K.tan) +
    c(140, 118, 30, N(K.brown)) + c(260, 118, 30, N(K.brown)) + c(142, 120, 16, N(K.tan)) + c(258, 120, 16, N(K.tan)) +
    e(200, 172, 78, 66, N(K.brown)) + e(200, 202, 34, 24, N(K.tan)) +
    eyes(166, 234, 166) + cheeks(140, 260, 190) + e(200, 192, 12, 8, 'k') + c(196, 190, 2.4, 'hl') +
    p('M200 200 L200 206 M189 208 Q194 214 200 206 Q206 214 211 208', 'l2'));

  /* ===== Zajíček ===== */
  add('bunny', 'Zajíček', '🐇', SKY() + sun() + HILL() + flower(60, 322, 1.3, K.pink) + flower(348, 334, 1.1, K.pink) +
    e(166, 82, 22, 60, N(K.white), -8) + e(234, 82, 22, 60, N(K.white), 8) + e(167, 88, 10, 42, N(K.pink), -8) + e(233, 88, 10, 42, N(K.pink), 8) +
    seat(K.white, '') +
    p('M268 246 Q262 224 276 214 Q284 230 280 244 Z', N(K.leaf)) + p('M276 250 Q290 228 306 230 Q298 246 282 252 Z', N(K.leaf)) +
    p('M206 304 C202 300 202 294 206 290 L256 244 C264 236 278 240 282 250 C286 260 280 266 272 270 Z', N(K.orange)) +
    p('M226 286 L234 292 M242 270 L250 276 M256 258 L263 263', 'l2') +
    e(254, 270, 15, 24, N(K.white), -22) +
    e(200, 178, 74, 62, N(K.white)) + face(200, 182, 30, 1, false) + p('M193 198 L207 198 L200 205 Z', N(K.pink)) + wmouth(200, 205, 6));

  /* ===== Myška ===== */
  add('mouse', 'Myška', '🐁', SKY() + sun() + cloud(36, 88, .8) + HILL() +
    p('M248 316 C296 330 330 312 330 282 C330 262 312 254 302 264', 'l') +
    p('M286 306 L352 280 L352 322 L286 334 Z', N(K.yellow)) + c(312, 312, 6, N(K.sun)) + c(334, 298, 5, N(K.sun)) +
    seat(K.grey, K.blush) +
    c(132, 122, 42, N(K.grey)) + c(268, 122, 42, N(K.grey)) + c(134, 124, 26, N(K.pink)) + c(266, 124, 26, N(K.pink)) +
    e(200, 176, 76, 64, N(K.grey)) + face(200, 180, 30, 1, false) + c(200, 198, 7, N(K.pink)) + wmouth(200, 205, 6) +
    p('M120 196 L148 200 M120 210 L148 208 M280 196 L252 200 M280 210 L252 208', 'l2'));

  /* ===== Lev ===== */
  add('lion', 'Lev', '🦁', SKY() + sun() + cloud(36, 88, .8) + HILL() +
    p('M254 300 Q300 306 312 270', 'l') + e(316, 258, 13, 17, N(K.orange)) +
    seat(K.yellow, K.cream) +
    p(scallop(200, 170, 94, 16, 9), N(K.orange)) +
    c(140, 112, 18, N(K.yellow)) + c(260, 112, 18, N(K.yellow)) + c(140, 114, 9, N(K.orange)) + c(260, 114, 9, N(K.orange)) +
    e(200, 174, 72, 64, N(K.yellow)) + e(200, 204, 32, 22, N(K.cream)) +
    eyes(168, 232, 168) + cheeks(144, 256, 192) + e(200, 194, 11, 7.5, 'k') + c(196, 192, 2.4, 'hl') +
    p('M200 201 L200 207 M189 209 Q194 215 200 207 Q206 215 211 209', 'l2'));

  /* ===== Panda ===== */
  add('panda', 'Panda', '🐼', SKY() + sun() + HILL() +
    rc(300, 150, 20, 176, 8, N(K.leaf)) + p('M300 206 L320 206 M300 262 L320 262', 'l') + p('M320 172 Q352 146 370 158 Q348 176 320 176 Z', N(K.leaf)) +
    e(200, 272, 62, 52, N(K.white)) + e(146, 270, 15, 24, N(K.ink), 22) + e(254, 270, 15, 24, N(K.ink), -22) +
    e(170, 328, 25, 13, N(K.ink)) + e(230, 328, 25, 13, N(K.ink)) +
    c(138, 118, 28, N(K.ink)) + c(262, 118, 28, N(K.ink)) +
    e(200, 174, 80, 66, N(K.white)) + e(166, 174, 22, 26, N(K.ink), 24) + e(234, 174, 22, 26, N(K.ink), -24) +
    c(168, 172, 8.5, 'hl') + c(232, 172, 8.5, 'hl') + c(169, 174, 5, 'k') + c(231, 174, 5, 'k') +
    cheeks(136, 264, 200) + e(200, 196, 10, 7, 'k') + p('M200 202 L200 208 M190 210 Q195 215 200 208 Q205 215 210 210', 'l2'));

  /* ===== Rybička ===== */
  add('fish', 'Rybička', '🐠', SKY(K.water) +
    p('M-10 334 C80 318 160 326 220 330 C300 334 350 320 410 326 L410 410 L-10 410 Z', N(K.sand)) +
    p('M44 410 C32 366 64 344 46 300 C78 330 62 366 74 410 Z', N(K.leaf)) + p('M342 410 C332 372 362 352 348 316 C376 344 362 376 370 410 Z', N(K.leaf)) +
    c(86, 104, 13, N(K.white)) + c(62, 70, 9, N(K.white)) + c(90, 42, 6, N(K.white)) + c(330, 92, 10, N(K.white)) + c(346, 62, 6, N(K.white)) +
    star(262, 360, 26, 12, N(K.pink)) + e(122, 364, 22, 12, N(K.lilac)) +
    p('M276 200 L346 150 Q334 200 346 250 Z', N(K.orange)) + p('M162 140 Q204 92 252 142 Z', N(K.orange)) + p('M178 254 Q210 306 246 250 Z', N(K.orange)) +
    e(200, 200, 98, 68, N(K.orange)) +
    p('M174 137 Q192 200 174 263 L200 265.5 Q216 200 200 134.5 Z', N(K.white)) + p('M238 140 Q256 200 238 260 L260 251 Q274 200 260 149 Z', N(K.white)) +
    eye(140, 188, 1.15) + e(128, 216, 9, 5.5, 'ck') + smile(118, 214, 5));

  /* ===== Sovička ===== */
  add('owl', 'Sovička', '🦉', SKY(K.dusk) + c(336, 72, 30, N(K.lemon)) + star(68, 62, 14, 6, N(K.lemon)) + star(118, 122, 9, 4, N(K.lemon)) + star(300, 150, 8, 3.5, N(K.lemon)) +
    p('M-10 316 Q110 300 200 312 Q300 324 410 302 L410 332 Q300 352 200 340 Q100 328 -10 346 Z', N(K.brown)) +
    e(50, 306, 30, 13, N(K.leaf), -14) + e(356, 296, 30, 13, N(K.leaf), 14) +
    p('M126 144 L114 86 L166 122 Z', N(K.grape)) + p('M274 144 L286 86 L234 122 Z', N(K.grape)) +
    e(200, 214, 94, 102, N(K.purple)) +
    e(200, 260, 52, 52, N(K.white)) + p('M180 236 q10 8 20 0 q10 8 20 0 M170 262 q10 8 20 0 q10 8 20 0 q10 8 20 0 M184 288 q8 7 16 0 q8 7 16 0', 'l2') +
    p('M108 196 C82 234 88 286 122 302 C126 264 126 228 108 196 Z', N(K.grape)) + p('M292 196 C318 234 312 286 278 302 C274 264 274 228 292 196 Z', N(K.grape)) +
    c(162, 180, 30, N(K.white)) + c(238, 180, 30, N(K.white)) + eye(164, 182, 1.25) + eye(236, 182, 1.25) + cheeks(124, 276, 220) +
    p('M190 208 L210 208 L200 226 Z', N(K.sun)) + e(178, 316, 13, 8, N(K.sun)) + e(222, 316, 13, 8, N(K.sun)));

  /* ===== Želvička ===== */
  add('turtle', 'Želvička', '🐢', SKY() + sun() + cloud(36, 88, .8) + HILL() + flower(56, 334, 1.2, K.pink) +
    e(126, 312, 22, 26, N(K.lime)) + e(262, 312, 22, 26, N(K.lime)) + p('M88 286 L52 302 L90 306 Z', N(K.lime)) +
    e(302, 266, 34, 22, N(K.lime), -24) + c(336, 236, 40, N(K.lime)) +
    p('M84 296 Q90 154 200 150 Q310 154 316 296 Z', N(K.brown)) +
    p('M176 186 L224 186 L242 230 L200 258 L158 230 Z', N(K.tan)) +
    p('M126 202 L164 196 L150 242 L106 248 Q108 220 126 202 Z', N(K.tan)) + p('M274 202 L236 196 L250 242 L294 248 Q292 220 274 202 Z', N(K.tan)) +
    p('M104 262 L152 252 L188 276 L184 292 L96 292 Q98 274 104 262 Z', N(K.tan)) + p('M296 262 L248 252 L212 276 L216 292 L304 292 Q302 274 296 262 Z', N(K.tan)) +
    p('M72 292 Q200 316 328 292 L328 308 Q200 332 72 308 Z', N(K.tan)) +
    eye(346, 228, 1) + e(336, 254, 8, 5, 'ck') + smile(360, 250, 6));

  /* ===== Motýlek ===== */
  add('butterfly', 'Motýlek', '🦋', SKY() + sun() + HILL() + flower(56, 322, 1.4, K.pink) + flower(344, 334, 1.2, K.pink) +
    p('M192 206 C150 96 54 84 66 166 C72 208 140 222 192 216 Z', N(K.pink)) + p('M208 206 C250 96 346 84 334 166 C328 208 260 222 208 216 Z', N(K.pink)) +
    p('M192 222 C138 228 88 268 118 312 C148 342 188 288 196 238 Z', N(K.blue)) + p('M208 222 C262 228 312 268 282 312 C252 342 212 288 204 238 Z', N(K.blue)) +
    c(112, 152, 20, N(K.yellow)) + c(288, 152, 20, N(K.yellow)) + c(154, 190, 10, N(K.yellow)) + c(246, 190, 10, N(K.yellow)) + c(138, 288, 14, N(K.yellow)) + c(262, 288, 14, N(K.yellow)) +
    e(200, 248, 16, 60, N(K.lilac)) +
    p('M188 138 Q176 100 158 94 M212 138 Q224 100 242 94', 'l') + c(158, 94, 8, N(K.lilac)) + c(242, 94, 8, N(K.lilac)) +
    c(200, 166, 36, N(K.lilac)) + eyes(185, 215, 164, .8) + cheeks(174, 226, 182, .7) + smile(200, 180, 5));

  /* ===== Slon ===== */
  add('elephant', 'Slon', '🐘', SKY() + sun() + cloud(36, 88, .8) + HILL() +
    seat(K.ele, '') + p('M160 330 L160 322 M170 334 L170 324 M180 330 L180 322 M220 330 L220 322 M230 334 L230 324 M240 330 L240 322', 'l2') +
    e(116, 170, 52, 60, N(K.ele)) + e(284, 170, 52, 60, N(K.ele)) + e(120, 174, 33, 41, N(K.pink)) + e(280, 174, 33, 41, N(K.pink)) +
    e(200, 168, 72, 64, N(K.ele)) +
    p('M186 196 C184 228 194 250 220 250 C240 250 254 234 256 212 Q257 204 249 204 Q242 204 242 212 C240 226 232 234 222 234 C210 234 212 220 214 196 Z', N(K.ele)) +
    eyes(164, 236, 164) + cheeks(140, 260, 190));

  /* ===== Beruška ===== */
  add('ladybug', 'Beruška', '🐞', SKY() + sun() + cloud(36, 88, .8) + HILL() +
    p('M40 340 C100 262 300 248 370 318 C302 366 128 374 40 340 Z', N(K.leaf)) + p('M62 334 Q210 298 350 316', 'l') +
    p('M124 236 L96 220 M116 272 L86 276 M126 306 L102 326 M276 236 L304 220 M284 272 L314 276 M274 306 L298 326', 'l') +
    p('M186 128 Q178 98 160 90 M214 128 Q222 98 240 90', 'l') + c(160, 90, 9, N(K.ink)) + c(240, 90, 9, N(K.ink)) +
    p('M200 200 C140 200 110 244 112 284 C114 326 158 346 200 346 Z', N(K.red)) + p('M200 200 C260 200 290 244 288 284 C286 326 242 346 200 346 Z', N(K.red)) +
    c(158, 250, 16, N(K.ink)) + c(150, 300, 13, N(K.ink)) + c(182, 326, 9, N(K.ink)) + c(242, 250, 16, N(K.ink)) + c(250, 300, 13, N(K.ink)) + c(218, 326, 9, N(K.ink)) +
    e(200, 166, 58, 50, N(K.ink)) +
    c(178, 162, 11, 'hl') + c(222, 162, 11, 'hl') + c(180, 164, 6.5, 'k') + c(220, 164, 6.5, 'k') + c(182.5, 161, 2.2, 'hl') + c(222.5, 161, 2.2, 'hl') +
    e(156, 188, 8, 5, 'ck') + e(244, 188, 8, 5, 'ck') + p('M191 188 Q200 196 209 188', 'lw'));

  /* ===== Tučňák ===== */
  add('penguin', 'Tučňák', '🐧', SKY(K.snowsky) + sun() +
    p('M-10 304 L60 214 L106 252 L150 196 L222 304 Z', N(K.ice)) + p('M240 304 L300 230 L334 262 L410 200 L410 304 Z', N(K.ice)) +
    HILL(K.white) +
    p('M116 214 C88 242 88 286 110 302 C122 276 126 246 116 214 Z', N(K.navy)) + p('M284 214 C312 242 312 286 290 302 C278 276 274 246 284 214 Z', N(K.navy)) +
    e(200, 222, 88, 112, N(K.navy)) + e(200, 270, 58, 58, N(K.white)) +
    p('M200 150 C176 126 130 136 136 184 C140 218 176 226 200 212 C224 226 260 218 264 184 C270 136 224 126 200 150 Z', N(K.white)) +
    p('M114 222 Q200 252 286 222 L288 242 Q200 274 112 242 Z', N(K.red)) + p('M232 246 L244 296 L266 288 L254 242 Z', N(K.red)) +
    e(170, 334, 26, 11, N(K.orange)) + e(230, 334, 26, 11, N(K.orange)) +
    eyes(174, 226, 180) + cheeks(154, 246, 200, .9) + p('M188 196 L212 196 L200 212 Z', N(K.orange)));

  /* ===== Šnek ===== */
  add('snail', 'Šnek', '🐌', SKY() + sun() + cloud(36, 88, .8) + HILL() + flower(56, 344, 1.1, K.pink) + flower(374, 340, 1, K.pink) +
    p('M322 172 Q312 136 298 120 M342 170 Q350 134 364 116', 'l') + c(298, 118, 9, N(K.lilac)) + c(364, 114, 9, N(K.lilac)) +
    p('M60 318 Q60 296 96 296 L282 296 L290 214 C292 182 312 166 334 168 C358 170 370 192 366 218 L356 300 C356 322 344 336 316 336 L96 336 Q60 336 60 318 Z', N(K.yellow)) +
    c(178, 214, 96, N(K.pink)) + p('M178 220 a12 12 0 0 1 24 0 a24 24 0 0 1 -48 0 a36 36 0 0 1 72 0 a48 48 0 0 1 -96 0 a60 60 0 0 1 120 0', 'l') +
    eyes(316, 344, 206, .85) + cheeks(304, 358, 224, .7) + smile(330, 222, 5));

  /* ===== Kachnička ===== */
  add('duck', 'Kachnička', '🦆', SKY() + sun() + cloud(36, 88, .8) + HILL() +
    p('M30 300 L30 250 M48 300 L48 236 M352 296 L352 246', 'l') + e(30, 244, 7, 16, N(K.brown)) + e(48, 230, 7, 16, N(K.brown)) + e(352, 240, 7, 16, N(K.brown)) +
    e(200, 344, 214, 66, N(K.water)) +
    e(122, 274, 22, 32, N(K.yellow), 36) + e(278, 274, 22, 32, N(K.yellow), -36) +
    e(200, 290, 88, 42, N(K.yellow)) + p('M92 330 Q106 322 120 330 M280 330 Q294 322 308 330 M150 346 Q164 338 178 346 M226 346 Q240 338 254 346', 'l2') +
    p('M196 128 Q188 106 204 98 Q202 114 214 122 Z', N(K.yellow)) +
    c(200, 194, 66, N(K.yellow)) + e(200, 224, 28, 12, N(K.orange)) + p('M178 224 Q200 230 222 224', 'l2') +
    eyes(172, 228, 186) + cheeks(148, 252, 208));

  /* ===== Žabka ===== */
  add('frog', 'Žabka', '🐸', SKY() + sun() +
    p('M-10 236 C80 226 320 226 410 236 L410 410 L-10 410 Z', N(K.water)) +
    p('M30 334 C30 290 120 272 200 272 C280 272 370 290 370 334 C370 372 290 384 200 384 C110 384 30 372 30 334 Z', N(K.leaf)) +
    p('M30 304 Q12 280 30 268 Q44 286 40 300 Q52 270 70 268 Q66 290 46 306 Z', N(K.pink)) +
    e(130, 300, 32, 22, N(K.grass), -16) + e(270, 300, 32, 22, N(K.grass), 16) +
    e(200, 290, 70, 46, N(K.grass)) + e(200, 300, 42, 30, N(K.pale)) +
    e(156, 334, 24, 10, N(K.grass)) + e(244, 334, 24, 10, N(K.grass)) +
    c(146, 160, 32, N(K.grass)) + c(254, 160, 32, N(K.grass)) +
    e(200, 214, 96, 60, N(K.grass)) + eye(146, 160, 1.2) + eye(254, 160, 1.2) + cheeks(124, 276, 232) +
    p('M160 228 Q200 256 240 228', 'l2'));

  /* ===== Kravička ===== */
  add('cow', 'Kravička', '🐄', SKY() + sun() + cloud(36, 88, .8) + HILL() + flower(56, 330, 1.2, K.pink) + flower(350, 338, 1, K.pink) +
    p('M252 300 Q292 302 302 272', 'l') + e(305, 262, 9, 13, N(K.cocoa)) +
    seat(K.white, '') + p('M168 282 Q190 274 196 292 Q192 310 172 306 Q160 296 168 282 Z', N(K.cocoa)) + p('M214 300 Q234 292 240 308 Q234 322 218 318 Q208 310 214 300 Z', N(K.cocoa)) +
    p('M150 120 Q134 94 148 80 Q156 98 168 112 Z', N(K.cream)) + p('M250 120 Q266 94 252 80 Q244 98 232 112 Z', N(K.cream)) +
    e(114, 150, 30, 14, N(K.white), -24) + e(286, 150, 30, 14, N(K.white), 24) + e(116, 151, 17, 7, N(K.pink), -24) + e(284, 151, 17, 7, N(K.pink), 24) +
    e(200, 168, 76, 64, N(K.white)) + p('M222 112 Q250 104 258 126 Q254 146 236 142 Q218 134 222 112 Z', N(K.cocoa)) +
    e(200, 206, 46, 26, N(K.pink)) + e(185, 204, 5, 7.5, 'k') + e(215, 204, 5, 7.5, 'k') + smile(200, 218, 7) +
    eyes(164, 236, 164) + cheeks(134, 266, 186) + c(200, 250, 11, N(K.sun)) + p('M193 252 L207 252', 'l2'));

  /* ===== Lištička ===== */
  add('fox', 'Lištička', '🦊', SKY() + sun() + cloud(36, 88, .8) + HILL() + flower(56, 330, 1.2, K.pink) +
    p('M232 330 C300 342 352 300 336 246 C328 222 302 220 302 240 C314 270 298 304 240 306 Z', N(K.fox)) +
    p('M302 240 C302 220 328 222 336 246 C340 262 338 276 332 288 C324 270 316 254 302 240 Z', N(K.white)) +
    seat(K.fox, K.white, { foot: K.ink }) +
    p('M128 142 L116 78 Q118 70 126 74 L180 112 Z', N(K.fox)) + p('M272 142 L284 78 Q282 70 274 74 L220 112 Z', N(K.fox)) +
    p('M136 126 L128 90 L164 114 Z', N(K.white)) + p('M264 126 L272 90 L236 114 Z', N(K.white)) +
    p('M116 168 Q118 110 200 106 Q282 110 284 168 Q286 208 250 230 Q226 244 200 244 Q174 244 150 230 Q114 208 116 168 Z', N(K.fox)) +
    p('M134 196 Q164 190 200 222 Q236 190 266 196 Q260 228 232 238 Q216 244 200 244 Q184 244 168 238 Q140 228 134 196 Z', N(K.white)) +
    eyes(166, 234, 172) + cheeks(148, 252, 214, .8) + e(200, 216, 10, 7, 'k') + c(197, 214, 2.2, 'hl') + wmouth(200, 223, 6));

  /* ===== Ježek ===== */
  add('hedgehog', 'Ježek', '🦔', SKY() + sun() + cloud(36, 88, .8) + HILL() +
    rc(64, 300, 18, 30, 7, N(K.white)) + p('M42 306 Q44 270 73 268 Q102 270 104 306 Z', N(K.red)) + c(62, 288, 5, N(K.white)) + c(84, 284, 4, N(K.white)) +
    star(200, 214, 132, 104, N(K.brown), 22) +
    c(254, 96, 22, N(K.red)) + p('M254 74 Q252 64 258 58', 'l') + p('M258 70 Q272 56 284 64 Q274 76 258 70 Z', N(K.grass)) +
    e(172, 326, 24, 12, N(K.tan)) + e(228, 326, 24, 12, N(K.tan)) +
    c(136, 166, 17, N(K.tan)) + c(264, 166, 17, N(K.tan)) +
    e(200, 236, 80, 70, N(K.tan)) + eyes(170, 230, 222) + cheeks(144, 256, 246) + c(200, 240, 8, 'k') + smile(200, 254, 6));

  /* ===== Žirafa ===== */
  add('giraffe', 'Žirafa', '🦒', SKY() + sun() + cloud(36, 92, .8) + HILL() + flower(330, 336, 1.2, K.pink) +
    e(200, 292, 66, 42, N(K.yellow)) + e(170, 332, 22, 11, N(K.cocoa)) + e(230, 332, 22, 11, N(K.cocoa)) +
    e(144, 300, 14, 24, N(K.yellow), 12) + e(256, 300, 14, 24, N(K.yellow), -12) +
    p('M174 270 L178 150 L222 150 L226 270 Z', N(K.yellow)) +
    e(186, 214, 9, 12, N(K.orange)) + e(212, 240, 8, 10, N(K.orange)) + e(208, 182, 7, 9, N(K.orange)) +
    e(166, 294, 13, 10, N(K.orange)) + e(234, 300, 14, 10, N(K.orange)) + e(204, 318, 10, 7, N(K.orange)) +
    rc(164, 48, 12, 38, 6, N(K.yellow)) + rc(224, 48, 12, 38, 6, N(K.yellow)) + c(170, 48, 10, N(K.cocoa)) + c(230, 48, 10, N(K.cocoa)) +
    e(130, 102, 26, 12, N(K.yellow), -22) + e(270, 102, 26, 12, N(K.yellow), 22) +
    e(200, 112, 62, 52, N(K.yellow)) + e(200, 138, 40, 24, N(K.cream)) + e(188, 134, 3.5, 5, 'k') + e(212, 134, 3.5, 5, 'k') +
    eyes(176, 224, 102, .9) + cheeks(152, 248, 122, .8) + smile(200, 148, 5));

  /* ===== Velryba ===== */
  add('whale', 'Velryba', '🐳', SKY() + sun() + cloud(36, 92, .8) +
    p('M-10 214 Q30 200 70 214 T150 214 T230 214 T310 214 T410 214 L410 410 L-10 410 Z', N(K.sea)) +
    p('M194 138 Q184 98 156 94 Q184 80 200 110 Q216 80 244 94 Q216 98 206 138 Z', N(K.white)) +
    p('M308 240 Q348 178 380 196 Q356 222 344 246 Q370 254 384 286 Q348 294 312 264 Z', N(K.deep)) +
    p('M60 264 Q66 152 200 148 Q320 148 334 248 Q320 318 200 320 Q78 320 60 264 Z', N(K.deep)) +
    p('M74 280 Q200 330 318 270 Q304 310 200 314 Q98 314 74 280 Z', N(K.ice)) +
    eye(120, 232, 1.1) + e(112, 260, 9, 5.5, 'ck') + smile(88, 258, 6) +
    p('M40 352 Q55 344 70 352 M300 364 Q315 356 330 364 M150 378 Q165 370 180 378', 'l2'));

  /* ===== Chobotnice ===== */
  add('octopus', 'Chobotnice', '🐙', SKY(K.water) +
    p('M-10 344 C80 330 160 338 220 340 C300 344 350 330 410 336 L410 410 L-10 410 Z', N(K.sand)) +
    p('M40 410 C28 370 60 350 42 312 C74 340 58 372 70 410 Z', N(K.leaf)) + p('M346 410 C336 376 366 356 352 322 C380 350 366 380 374 410 Z', N(K.leaf)) +
    c(70, 86, 12, N(K.white)) + c(92, 56, 7, N(K.white)) + c(330, 74, 9, N(K.white)) + c(350, 46, 6, N(K.white)) +
    [0, 1, 2, 3, 4, 5].map(i => { const x = 122 + i * 31, d = i < 3 ? -1 : 1, k = [1, .8, .45, .45, .8, 1][i];
      return tube([[x, 214], [x + d * 2, 258], [x + d * 12 * k, 290], [x + d * 30 * k, 312], [x + d * 48 * k, 306], [x + d * 46 * k, 290]], 30, 14, N(K.lilac), d < 0 ? 1 : 0); }).join('') +
    e(200, 168, 100, 92, N(K.lilac)) + c(144, 116, 13, N(K.purple)) + c(254, 108, 15, N(K.purple)) + c(198, 90, 10, N(K.purple)) +
    eyes(166, 234, 184, 1.1) + cheeks(136, 264, 212) + smile(200, 210, 7));

  /* ===== Kuřátko ===== */
  add('chick', 'Kuřátko', '🐤', SKY() + sun() + cloud(36, 92, .8) + HILL() + flower(56, 330, 1.2, K.pink) + flower(348, 334, 1.1, K.pink) +
    c(200, 206, 84, N(K.yellow)) +
    p('M118 210 Q90 232 106 266 Q130 258 136 226 Z', N(K.yellow)) + p('M282 210 Q310 232 294 266 Q270 258 264 226 Z', N(K.yellow)) +
    p('M150 140 L166 120 L184 136 L202 114 L220 136 L238 120 L252 140 Q236 104 200 102 Q164 104 150 140 Z', N(K.white)) +
    eyes(170, 230, 196) + cheeks(146, 254, 220) + p('M188 214 L212 214 L200 230 Z', N(K.orange)) +
    p('M104 268 L128 242 L152 268 L176 242 L200 268 L224 242 L248 268 L272 242 L296 268 Q306 344 200 348 Q94 344 104 268 Z', N(K.white)));

  /* ===== Včelka ===== */
  add('bee', 'Včelka', '🐝', SKY() + sun() + HILL() +
    p('M60 340 L60 290', 'l') + flower(60, 280, 1.6, K.pink) + p('M344 342 L344 296', 'l') + flower(344, 286, 1.5, K.lilac) +
    e(122, 152, 48, 30, N(K.ice), -34) + e(278, 152, 48, 30, N(K.ice), 34) +
    p('M188 128 Q180 96 162 88 M212 128 Q220 96 238 88', 'l') + c(162, 86, 9, N(K.ink)) + c(238, 86, 9, N(K.ink)) +
    c(200, 224, 92, N(K.yellow)) +
    p('M116 252 Q200 274 284 252 L278 278 Q200 300 122 278 Z', N(K.ink)) + p('M138 300 Q200 318 262 300 L244 320 Q200 334 156 320 Z', N(K.ink)) +
    eyes(170, 230, 196) + cheeks(144, 256, 220) + smile(200, 216, 7));

  /* ===== Krab ===== */
  add('crab', 'Krab', '🦀', SKY() + sun() + cloud(36, 92, .8) +
    p('M-10 196 Q60 184 130 196 T270 196 T410 196 L410 260 L-10 260 Z', N(K.sea)) +
    p('M-10 250 C80 236 320 236 410 250 L410 410 L-10 410 Z', N(K.sand)) +
    star(340, 350, 24, 11, N(K.orange)) + p('M58 360 Q70 336 82 360 Z', N(K.pink)) +
    p('M132 288 L96 304 L88 330 M140 304 L110 334 M268 288 L304 304 L312 330 M260 304 L290 334', 'l') +
    p('M136 252 L104 212 M264 252 L296 212', 'l') +
    p('M100 212 Q56 202 64 160 Q80 178 98 174 Q92 158 110 148 Q128 182 100 212 Z', N(K.coral)) +
    p('M300 212 Q344 202 336 160 Q320 178 302 174 Q308 158 290 148 Q272 182 300 212 Z', N(K.coral)) +
    p('M178 220 L172 182 M222 220 L228 182', 'l') + c(172, 172, 15, N(K.white)) + c(228, 172, 15, N(K.white)) + c(174, 174, 7, 'k') + c(226, 174, 7, 'k') + c(176, 171, 2.4, 'hl') + c(228, 171, 2.4, 'hl') +
    e(200, 272, 98, 60, N(K.coral)) + cheeks(150, 250, 280) + smile(200, 276, 9));

  /* ===== Hroch ===== */
  add('hippo', 'Hroch', '🦛', SKY() + sun() + cloud(36, 92, .8) + HILL() +
    p('M-10 262 C80 250 320 250 410 262 L410 410 L-10 410 Z', N(K.water)) +
    e(70, 330, 34, 10, N(K.leaf)) + e(340, 350, 30, 9, N(K.leaf)) +
    c(132, 118, 22, N(K.lilac)) + c(268, 118, 22, N(K.lilac)) + c(134, 120, 11, N(K.pink)) + c(266, 120, 11, N(K.pink)) +
    e(200, 196, 98, 82, N(K.lilac)) + e(200, 252, 78, 46, N(K.blush)) + e(176, 242, 6, 9, 'k') + e(224, 242, 6, 9, 'k') +
    eyes(164, 236, 172) + cheeks(128, 272, 204) + smile(200, 268, 10) +
    p('M92 302 Q120 292 148 302 M252 302 Q280 292 308 302', 'l2'));

  /* ===== Dinosaurus ===== */
  add('dino', 'Dinosaurus', '🦕', SKY() + sun() + cloud(36, 92, .8) + HILL() + flower(56, 330, 1.2, K.pink) +
    p('M248 296 C300 300 350 284 380 240 C384 262 370 300 340 318 C310 334 276 334 248 326 Z', N(K.teal)) +
    p('M318 288 L324 268 L336 284 Z M346 272 L354 252 L362 270 Z', N(K.yellow)) +
    seat(K.teal, K.cream) +
    p('M168 112 L178 88 L192 108 Z', N(K.yellow)) + p('M196 104 L206 78 L218 102 Z', N(K.yellow)) + p('M224 108 L236 86 L246 112 Z', N(K.yellow)) +
    e(200, 170, 80, 66, N(K.teal)) + c(150, 130, 8, N(K.yellow)) + c(252, 134, 7, N(K.yellow)) +
    face(200, 180, 32) + p('M190 196 L190 199 M210 196 L210 199', 'l2'));

  /* ===== Ovečka ===== */
  add('sheep', 'Ovečka', '🐑', SKY() + sun() + cloud(36, 92, .8) + HILL() + flower(56, 330, 1.2, K.lilac) + flower(350, 338, 1, K.lilac) +
    e(170, 330, 22, 12, N(K.slate)) + e(230, 330, 22, 12, N(K.slate)) +
    p(scallop(200, 262, 74, 14, 10), N(K.white)) +
    e(132, 168, 28, 13, N(K.blush), -20) + e(268, 168, 28, 13, N(K.blush), 20) + e(134, 169, 16, 6, N(K.pink), -20) + e(266, 169, 16, 6, N(K.pink), 20) +
    e(200, 180, 62, 58, N(K.blush)) + p(scallop(200, 128, 34, 9, 7), N(K.white)) +
    eyes(176, 224, 184) + cheeks(150, 250, 204) + smile(200, 204, 6));

  /* ===== Opička ===== */
  add('monkey', 'Opička', '🐒', SKY() + sun() + cloud(36, 92, .8) + HILL() +
    p('M252 310 C300 324 344 304 340 262 C338 238 318 232 306 246 C300 254 306 262 314 258', 'l') +
    seat(K.brown, K.tan) +
    p('M186 318 C208 322 242 310 256 284 Q260 276 266 280 Q270 284 266 292 C252 324 214 338 186 330 Q178 324 186 318 Z', N(K.yellow)) + p('M262 282 L268 272', 'l2') +
    e(254, 270, 15, 24, N(K.brown), -22) +
    c(120, 172, 28, N(K.brown)) + c(280, 172, 28, N(K.brown)) + c(122, 172, 15, N(K.tan)) + c(278, 172, 15, N(K.tan)) +
    e(200, 168, 76, 64, N(K.brown)) +
    p('M200 146 C188 126 150 128 148 160 C146 182 156 200 168 210 C180 224 220 224 232 210 C244 200 254 182 252 160 C250 128 212 126 200 146 Z', N(K.tan)) +
    eyes(174, 226, 168) + cheeks(154, 246, 196, .8) + c(194, 188, 2.6, 'k') + c(206, 188, 2.6, 'k') + smile(200, 200, 9));

  /* ===== jednorožci ===== */
  add('uni-baby', 'Malý jednorožec', '🦄', SKY() + star(56, 64, 15, 6.5, N(K.lemon)) + star(344, 74, 13, 5.5, N(K.lemon)) + star(52, 330, 12, 5, N(K.lemon)) + star(350, 336, 14, 6, N(K.lemon)) +
    heart(334, 188, 16, N(K.rose)) + heart(64, 196, 14, N(K.rose)) + babyFace(false));
  add('uni-crown', 'Jednorožčí princezna', '🦄', SKY(K.dusk) + star(56, 64, 15, 6.5, N(K.lemon)) + star(344, 74, 13, 5.5, N(K.lemon)) + star(52, 330, 12, 5, N(K.lemon)) + star(350, 336, 14, 6, N(K.lemon)) +
    heart(334, 188, 16, N(K.rose)) + heart(64, 196, 14, N(K.rose)) + babyFace(true));
  add('uni-meadow', 'Jednorožec na louce', '🦄', SKY() + sun() + cloud(40, 106, 1) + HILL() + flower(46, 344, 1.2, K.gPink, K.sun) + flower(352, 350, 1.2, K.gLilac, K.sun) +
    pony({ body: K.white, mane: [K.gLilac, K.gPink, K.gLilac], tail: [K.gPink, K.gLilac], horn: K.gGold, hoof: K.gLilac, inner: K.gPink }));
  add('uni-wings', 'Okřídlený jednorožec', '🦄', SKY(K.dusk) + star(56, 70, 14, 6, N(K.lemon)) + star(330, 64, 12, 5, N(K.lemon)) + star(200, 52, 9, 4, N(K.lemon)) + star(360, 160, 9, 4, N(K.lemon)) +
    cloud(24, 74, .7) +
    p('M44 372 C20 372 12 344 34 332 C32 306 66 296 86 310 C98 286 140 284 154 304 C174 286 210 288 220 308 C244 294 280 300 288 320 C314 308 348 318 350 342 C376 344 380 372 354 376 Z', N(K.white)) +
    pony({ body: K.white, mane: [K.gPink, K.gLilac, K.gPink], tail: [K.gLilac, K.gPink], horn: K.gGold, hoof: K.gLilac, inner: K.gPink,
      wing: p('M186 230 C188 172 156 128 104 116 C116 134 112 142 100 150 C116 158 116 166 108 176 C126 182 140 200 152 236 Z', N(K.gBlue)) + p('M170 214 Q148 182 118 166 M178 196 Q160 160 128 142', 'l2') }));
  add('unicorn', 'Jednorožec', '🦄', SKY() +
    [K.red, K.orange, K.yellow, K.grass, K.blue, K.purple].map((col, i) => { const R1 = 198 - i * 24, R2 = R1 - 24; return p(`M${200 - R1} 330 A${R1} ${R1} 0 0 1 ${200 + R1} 330 L${200 + R2} 330 A${R2} ${R2} 0 0 0 ${200 - R2} 330 Z`, N(col)); }).join('') +
    cloud(26, 336, 1) + cloud(298, 336, 1) + HILL() +
    c(136, 246, 22, N(K.gLilac)) + c(118, 280, 20, N(K.gPink)) +
    seat(K.white, '', { foot: K.gLilac }) +
    p('M162 112 C128 100 102 124 112 152 C90 166 94 198 116 206 C100 226 116 252 144 246 L172 228 Z', N(K.gPink)) +
    p('M238 112 C272 100 298 124 288 152 C310 166 306 198 284 206 C300 226 284 252 256 246 L228 228 Z', N(K.gLilac)) +
    p('M140 132 Q128 92 144 74 Q166 96 174 122 Z', N(K.white)) + p('M260 132 Q272 92 256 74 Q234 96 226 122 Z', N(K.white)) +
    p('M146 122 Q138 98 146 88 Q160 102 164 118 Z', N(K.gPink)) + p('M254 122 Q262 98 254 88 Q240 102 236 118 Z', N(K.gPink)) +
    p('M186 116 L200 40 L214 116 Z', N(K.gGold)) + p('M190 98 L210 93 M193 80 L207 76 M196 62 L204 60', 'l2') +
    e(200, 172, 74, 64, N(K.white)) + p('M160 128 Q200 98 240 128 Q226 124 214 140 Q200 122 186 140 Q172 124 160 128 Z', N(K.gLilac)) +
    eyes(170, 230, 178) + lashes(170, 230, 178) + cheeks(146, 254, 200) + smile(200, 202, 7), { maxColors: 11 });
  add('uni-rainbow', 'Jednorožec a duha', '🦄', SKY() + star(50, 50, 13, 5.5, N(K.yellow)) + star(350, 56, 11, 4.5, N(K.yellow)) +
    [K.red, K.orange, K.yellow, K.grass, K.blue, K.purple].map((col, i) => { const R1 = 198 - i * 26, R2 = R1 - 26; return p(`M${200 - R1} 384 A${R1} ${R1} 0 0 1 ${200 + R1} 384 L${200 + R2} 384 A${R2} ${R2} 0 0 0 ${200 - R2} 384 Z`, N(col)); }).join('') +
    p('M-10 410 L-10 350 Q10 322 50 336 Q76 306 114 328 Q150 314 166 346 Q190 332 204 352 L204 410 Z', N(K.white)) +
    p('M196 410 L196 352 Q220 326 254 342 Q280 312 316 330 Q354 312 382 338 Q402 334 410 342 L410 410 Z', N(K.white)) +
    `<g transform="translate(78 108) scale(.61)">${babyFace(false, K.white)}</g>`, { maxColors: 11 });
  add('uni-cake', 'Jednorožčí dort', '🦄', SKY(K.blush) + star(52, 62, 14, 6, N(K.lemon)) + star(348, 70, 12, 5, N(K.lemon)) + heart(58, 156, 14, N(K.rose)) + heart(342, 166, 14, N(K.rose)) +
    p('M-10 344 H410 V410 H-10 Z', N(K.lilac)) + e(200, 338, 160, 20, N(K.white)) +
    rc(84, 238, 232, 96, 18, N(K.white)) + rc(116, 164, 168, 82, 18, N(K.white)) +
    p('M116 200 Q130 216 144 200 Q158 218 172 200 Q186 218 200 200 Q214 218 228 200 Q242 218 256 200 Q270 214 284 200 L284 182 Q284 164 266 164 L134 164 Q116 164 116 182 Z', N(K.gPink)) +
    p('M84 274 Q100 290 116 274 Q132 292 148 274 Q164 292 180 274 Q196 292 212 274 Q228 292 244 274 Q260 292 276 274 Q292 292 316 274 L316 256 Q316 238 298 238 L102 238 Q84 238 84 256 Z', N(K.gLilac)) +
    p('M134 170 L144 128 L170 166 Z', N(K.white)) + p('M266 170 L256 128 L230 166 Z', N(K.white)) + p('M142 160 L146 140 L160 160 Z', N(K.rose)) + p('M258 160 L254 140 L240 160 Z', N(K.rose)) +
    p('M184 166 L200 76 L216 166 Z', N(K.gGold)) + p('M189 146 L211 140 M192 124 L208 120 M195 102 L205 99', 'l2') +
    happyEye(162, 220) + happyEye(238, 220) + lashes(162, 238, 226, .9) + cheeks(140, 260, 232, .9) +
    [110, 152, 194, 236, 278].map(x => c(x, 306, 11, N(K.teal))).join(''));

  /* ===== Koník, Zebra ===== */
  add('horse', 'Koník', '🐎', SKY() + sun() + HILL() + flower(46, 344, 1.2, K.pink) + flower(352, 350, 1.2, K.pink) + flower(90, 372, 1, K.pink) +
    pony({ body: K.tan, mane: [K.cocoa, K.cocoa, K.cocoa], tail: [K.cocoa, K.cocoa], hoof: K.ink, inner: K.pink, oneMane: true }));
  add('zebra', 'Zebra', '🦓', SKY() + sun() + cloud(40, 106, 1) + HILL() + flower(46, 344, 1.2, K.pink) + flower(352, 350, 1.2, K.pink) +
    pony({ body: K.white, mane: [K.ink, K.ink, K.ink], tail: [K.ink, K.white], hoof: K.ink, inner: K.pink, oneMane: true,
      stripes: p('M150 262 Q160 256 168 264 Q160 284 166 306 L154 308 Q146 288 150 262 Z', N(K.ink)) + p('M176 252 Q186 246 194 256 Q184 282 192 310 L178 310 Q170 282 176 252 Z', N(K.ink)) +
        p('M232 262 Q242 256 250 266 Q244 286 252 300 L240 304 Q230 284 232 262 Z', N(K.ink)),
      headDeco: p('M262 156 Q268 168 262 178 M276 152 L276 172 M290 156 Q284 168 290 178', 'l') }));

  /* ===== Slepička ===== */
  add('hen', 'Slepička', '🐔', SKY() + sun() + cloud(40, 106, 1) + HILL() + flower(46, 344, 1.2, K.pink) +
    e(326, 334, 54, 17, N(K.sand)) + e(308, 316, 15, 19, N(K.cream)) + e(342, 318, 14, 18, N(K.cream)) + p('M280 336 L300 330 M318 340 L338 332 M350 342 L368 336', 'l2') +
    p('M262 150 Q304 118 312 160 Q328 146 330 180 Q310 196 280 184 Z', N(K.tan)) +
    e(122, 240, 22, 40, N(K.tan), 22) + e(278, 240, 22, 40, N(K.tan), -22) +
    e(200, 224, 90, 98, N(K.cream)) +
    p('M170 132 Q164 100 186 102 Q188 82 208 88 Q222 76 232 98 Q252 100 238 126 Q204 116 170 132 Z', N(K.red)) +
    p('M180 320 L180 340 M168 348 L180 340 L192 348 M220 320 L220 340 M208 348 L220 340 L232 348', 'l') +
    eyes(170, 230, 184) + cheeks(146, 254, 206) + p('M188 200 L212 200 L200 216 Z', N(K.orange)) + p('M194 216 Q200 236 206 216 Z', N(K.red)));

  /* ===== Delfín ===== */
  add('dolphin', 'Delfín', '🐬', SKY() + sun(60, 64) + cloud(250, 90, .9) +
    p('M-10 282 Q30 268 70 282 T150 282 T230 282 T310 282 T410 282 L410 410 L-10 410 Z', N(K.sea)) +
    c(354, 110, 22, N(K.red)) + p('M334 102 Q354 116 374 102 M354 88 L354 132', 'l') +
    p('M112 290 Q76 272 58 288 Q80 296 86 308 Q76 326 88 340 Q106 320 118 300 Z', N(K.deep)) +
    p('M150 196 Q154 158 186 150 Q178 170 196 186 Z', N(K.deep)) +
    p('M244 214 Q254 248 232 262 Q232 238 228 218 Z', N(K.deep)) +
    e(330, 200, 26, 14, N(K.deep), 18) +
    tube([[106, 300], [134, 246], [180, 208], [234, 188], [282, 186]], 26, 86, N(K.deep), 0) +
    e(276, 214, 36, 17, N(K.ice), -8) +
    eye(286, 176, 1.05) + e(306, 196, 8.5, 5, 'ck') + p('M312 208 Q326 214 342 206', 'l2') +
    c(60, 256, 8, N(K.white)) + c(104, 244, 6, N(K.white)) + c(78, 232, 5, N(K.white)) + p('M40 344 Q55 336 70 344 M290 360 Q305 352 320 360 M170 380 Q185 372 200 380', 'l2'));

  /* ===== Papoušek ===== */
  add('parrot', 'Papoušek', '🦜', SKY() +
    p('M168 318 L156 396 L184 384 L200 400 L216 384 L244 396 L232 318 Z', N(K.blue)) +
    p('M-10 310 Q120 296 200 304 Q300 312 410 294 L410 318 Q300 338 200 330 Q100 322 -10 336 Z', N(K.brown)) +
    e(56, 296, 32, 13, N(K.leaf), -16) + e(352, 286, 32, 13, N(K.leaf), 16) + e(96, 286, 22, 9, N(K.leaf), 30) +
    p('M186 128 Q178 96 196 90 Q196 108 208 112 Z', N(K.red)) +
    p('M136 200 C104 240 108 300 144 322 C154 282 154 242 136 200 Z', N(K.blue)) + p('M264 200 C296 240 292 300 256 322 C246 282 246 242 264 200 Z', N(K.blue)) +
    e(200, 224, 72, 96, N(K.red)) + e(200, 258, 40, 54, N(K.yellow)) +
    eyes(174, 226, 186) + cheeks(150, 250, 208) +
    p('M186 202 Q200 194 214 202 Q214 222 200 232 Q190 222 186 202 Z', N(K.cream)) +
    e(182, 318, 12, 7, N(K.orange)) + e(218, 318, 12, 7, N(K.orange)));

  /* ===== Koala ===== */
  add('koala', 'Koala', '🐨', SKY() + HILL() +
    rc(252, -20, 74, 440, 30, N(K.cocoa)) + p('M262 92 Q300 70 340 74', 'l') +
    e(330, 70, 26, 12, N(K.leaf), -10) + e(368, 92, 24, 11, N(K.leaf), 20) + e(300, 52, 22, 10, N(K.leaf), -30) +
    e(210, 276, 64, 58, N(K.grey)) + e(178, 330, 24, 12, N(K.grey)) + e(244, 330, 24, 12, N(K.grey)) +
    e(270, 252, 34, 15, N(K.grey), -14) + e(148, 262, 15, 24, N(K.grey), 22) +
    c(128, 136, 36, N(K.grey)) + c(280, 136, 36, N(K.grey)) + c(130, 138, 20, N(K.blush)) + c(278, 138, 20, N(K.blush)) +
    e(204, 176, 80, 66, N(K.grey)) + e(204, 196, 15, 20, N(K.ink)) + c(199, 188, 3, 'hl') +
    eyes(166, 242, 172) + cheeks(142, 266, 198) + smile(204, 222, 6));

  /* ===== Veverka ===== */
  add('squirrel', 'Veverka', '🐿️', SKY() + sun() + cloud(40, 106, .9, K.cream) + HILL() + flower(46, 344, 1.2, K.pink, K.sun) +
    p('M240 322 C318 324 354 266 334 206 C320 166 282 146 252 162 C230 176 238 200 262 198 C290 196 302 228 292 258 C282 288 256 302 236 304 Z', N(K.orange)) +
    seat(K.orange, K.cream) +
    e(200, 262, 16, 18, N(K.brown)) + p('M182 256 Q200 234 218 256 Z', N(K.brown)) + p('M200 238 L200 230', 'l2') +
    e(146, 268, 15, 22, N(K.orange), 40) + e(254, 268, 15, 22, N(K.orange), -40) +
    p('M136 136 L126 84 Q128 76 136 80 L174 112 Z', N(K.orange)) + p('M264 136 L274 84 Q272 76 264 80 L226 112 Z', N(K.orange)) +
    e(200, 172, 76, 64, N(K.orange)) + e(200, 200, 36, 24, N(K.cream)) +
    eyes(168, 232, 168) + cheeks(142, 258, 194) + e(200, 192, 8, 6, 'k') + wmouth(200, 198, 6));

  /* ===== Netopýr ===== */
  add('bat', 'Netopýr', '🦇', SKY(K.night) + c(200, 150, 104, N(K.lemon)) +
    star(52, 60, 13, 5.5, N(K.lemon)) + star(350, 70, 11, 4.5, N(K.lemon)) + star(336, 252, 9, 4, N(K.lemon)) + star(66, 262, 8, 3.5, N(K.lemon)) +
    HILL(K.forest) +
    p('M196 214 Q150 150 62 158 Q84 180 76 206 Q108 198 118 226 Q138 210 160 236 Q180 220 196 240 Z', N(K.grape)) +
    p('M204 214 Q250 150 338 158 Q316 180 324 206 Q292 198 282 226 Q262 210 240 236 Q220 220 204 240 Z', N(K.grape)) +
    e(200, 240, 36, 44, N(K.purple)) + e(200, 250, 20, 26, N(K.lilac)) +
    p('M170 166 L162 122 L194 152 Z', N(K.purple)) + p('M230 166 L238 122 L206 152 Z', N(K.purple)) +
    c(200, 188, 44, N(K.purple)) + eyes(184, 216, 186, .8) + cheeks(170, 230, 202, .7) + smile(200, 202, 6) +
    p('M193 207 L196 214 L199 207 Z', N(K.white)) + p('M201 207 L204 214 L207 207 Z', N(K.white)));

  /* ===== Dýně ===== */
  add('pumpkin', 'Dýně', '🎃', SKY(K.dusk) + c(70, 70, 30, N(K.lemon)) + cloud(250, 92, .9) + HILL() +
    p('M234 160 Q280 138 300 166 Q270 182 234 160 Z', N(K.leaf)) + p('M196 150 Q170 130 182 108', 'l') +
    rc(188, 136, 24, 40, 8, N(K.cocoa)) +
    e(132, 256, 70, 80, N(K.fox)) + e(268, 256, 70, 80, N(K.fox)) + e(200, 256, 72, 90, N(K.orange)) +
    eyes(172, 228, 248, 1.15) + cheeks(146, 254, 276) + smile(200, 276, 10) +
    e(342, 326, 30, 22, N(K.orange)) + rc(336, 294, 12, 14, 5, N(K.cocoa)));

  /* ===== Sněhulák ===== */
  add('snowman', 'Sněhulák', '⛄', SKY(K.snowsky) + [[52, 60], [120, 116], [330, 118], [300, 40], [58, 232], [350, 236]].map(([x, y]) => star(x, y, 11, 4, N(K.white), 6)).join('') +
    HILL(K.white) +
    p('M140 206 L84 168 M98 178 L88 160 M260 206 L316 168 M302 178 L312 160', 'l') +
    c(200, 286, 76, N(K.white)) + c(200, 168, 60, N(K.white)) +
    p('M146 214 Q200 238 254 214 L256 234 Q200 260 144 234 Z', N(K.red)) + p('M226 236 L236 284 L258 278 L246 232 Z', N(K.red)) +
    p('M146 142 Q146 94 200 92 Q254 94 254 142 Z', N(K.teal)) + rc(140, 132, 120, 20, 10, N(K.white)) + c(200, 86, 14, N(K.white)) +
    eyes(178, 222, 168, .85) + cheeks(162, 238, 186, .8) + p('M200 180 L234 188 L200 196 Z', N(K.orange)) + smile(200, 202, 7) +
    c(200, 270, 7, 'k') + c(200, 300, 7, 'k'));

  /* ===== Dráček ===== */
  add('dragon', 'Dráček', '🐉', SKY() + sun() + cloud(40, 106, .9) + HILL() + flower(46, 344, 1.2, K.pink) +
    p('M248 296 C300 300 350 284 378 242 L392 262 L370 268 C356 300 330 324 296 330 C276 334 260 332 248 326 Z', N(K.lilac)) +
    p('M150 222 Q90 170 64 198 Q88 208 80 230 Q106 226 114 246 Q130 232 150 252 Z', N(K.pink)) + p('M250 222 Q310 170 336 198 Q312 208 320 230 Q294 226 286 246 Q270 232 250 252 Z', N(K.pink)) +
    seat(K.lilac, K.yellow) +
    p('M146 124 Q134 96 148 80 Q156 100 168 110 Z', N(K.cream)) + p('M254 124 Q266 96 252 80 Q244 100 232 110 Z', N(K.cream)) +
    p('M178 110 L188 86 L198 106 Z', N(K.yellow)) + p('M202 106 L212 84 L222 108 Z', N(K.yellow)) +
    e(200, 170, 80, 66, N(K.lilac)) + face(200, 178, 32) + c(192, 196, 2.2, 'k') + c(208, 196, 2.2, 'k') +
    p('M108 214 Q80 204 70 222 Q60 210 48 222 Q62 238 78 230 Q86 244 104 230 Z', N(K.orange)));

  /* ===== Krokodýl ===== */
  add('croc', 'Krokodýl', '🐊', SKY() + sun() + cloud(40, 106, .9) + HILL() +
    e(70, 334, 50, 14, N(K.water)) +
    p('M248 296 C296 300 336 290 368 262 C372 286 350 314 318 326 C292 334 266 332 248 326 Z', N(K.croc)) +
    seat(K.croc, K.pale) + p('M178 270 L222 270 M174 290 L226 290 M180 310 L220 310', 'l2') +
    c(158, 120, 26, N(K.croc)) + c(242, 120, 26, N(K.croc)) +
    e(200, 172, 82, 64, N(K.croc)) + e(200, 210, 70, 34, N(K.grass)) + e(184, 200, 4, 3, 'k') + e(216, 200, 4, 3, 'k') +
    p('M140 220 Q200 244 260 220', 'l2') + p('M160 226 L166 234 L172 228 M228 228 L234 234 L240 226', 'lw') +
    eye(158, 122, 1.1) + eye(242, 122, 1.1) + cheeks(126, 274, 186, .9));

  /* ===== Poskládej: pozadí pro nálepky ===== */
  const SCENES = [];
  const scene = (id, name, emoji, svg) => SCENES.push({ id, name, e: emoji, v: 4, svg });
  const arcs = (cols, R0, w, cy) => cols.map((col, i) => { const R1 = R0 - i * w, R2 = R1 - w; return p(`M${200 - R1} ${cy} A${R1} ${R1} 0 0 1 ${200 + R1} ${cy} L${200 + R2} ${cy} A${R2} ${R2} 0 0 0 ${200 - R2} ${cy} Z`, N(col)); }).join('');
  scene('scn-meadow', 'Louka', '🌼', SKY() + sun() + cloud(40, 96, .8) + cloud(196, 132, .7) +
    p('M-10 300 C60 220 170 214 250 290 L250 410 L-10 410 Z', N(K.leaf)) + HILL() +
    flower(70, 338, 1.3, K.pink) + flower(150, 362, 1.1, K.lilac) + flower(300, 344, 1.2, K.pink) + flower(360, 374, 1, K.lilac));
  scene('scn-sea', 'Moře', '🌊', SKY() + sun() + cloud(40, 96, .8) +
    p('M-10 196 Q30 182 70 196 T150 196 T230 196 T310 196 T410 196 L410 410 L-10 410 Z', N(K.sea)) +
    p('M-10 352 C80 336 160 344 220 348 C300 352 350 338 410 344 L410 410 L-10 410 Z', N(K.sand)) +
    c(70, 290, 9, N(K.white)) + c(88, 258, 6, N(K.white)) + c(316, 278, 8, N(K.white)) +
    p('M330 352 C320 316 340 300 330 270 C352 292 342 320 352 352 Z', N(K.leaf)) + star(110, 374, 18, 8, N(K.orange)) + p('M250 374 Q262 350 274 374 Z', N(K.pink)) +
    p('M60 230 Q75 222 90 230 M220 250 Q235 242 250 250 M140 300 Q155 292 170 300', 'l2'));
  scene('scn-night', 'Noční nebe', '🌙', SKY(K.night) + c(330, 76, 38, N(K.lemon)) + happyEye(316, 72) + happyEye(344, 72) + e(306, 88, 6, 3.6, 'ck') + e(354, 88, 6, 3.6, 'ck') + smile(330, 88, 6) +
    star(70, 66, 15, 6, N(K.lemon)) + star(196, 46, 11, 4.5, N(K.lemon)) + star(140, 132, 9, 4, N(K.lemon)) + star(250, 118, 13, 5, N(K.lemon)) +
    star(46, 190, 9, 4, N(K.lemon)) + star(352, 196, 8, 3.5, N(K.lemon)) +
    p('M-10 300 C60 240 160 240 230 296 L230 410 L-10 410 Z', N(K.forest)) + HILL(K.leaf));
  scene('scn-castle', 'Zámek', '🏰', SKY() + cloud(30, 84, .7) + cloud(272, 112, .75) + HILL() +
    [132, 168, 208, 244].map(x => rc(x, 178, 24, 22, 4, N(K.blush))).join('') +
    rc(130, 196, 140, 136, 0, N(K.blush)) + rc(94, 152, 54, 180, 0, N(K.pink)) + rc(252, 152, 54, 180, 0, N(K.pink)) +
    p('M86 154 L121 88 L156 154 Z', N(K.purple)) + p('M244 154 L279 88 L314 154 Z', N(K.purple)) + p('M121 88 L121 58 M279 88 L279 58', 'l') +
    p('M121 58 L146 66 L121 74 Z', N(K.rose)) + p('M279 58 L304 66 L279 74 Z', N(K.rose)) +
    p('M174 332 L174 282 Q200 252 226 282 L226 332 Z', N(K.lilac)) +
    rc(108, 184, 26, 34, 13, N(K.lemon)) + rc(266, 184, 26, 34, 13, N(K.lemon)) + rc(186, 214, 28, 30, 14, N(K.lemon)) +
    flower(56, 340, 1.2, K.pink) + flower(344, 344, 1.2, K.pink));
  scene('scn-rainbow', 'Duha', '🌈', SKY() + sun(70, 70) + arcs([K.red, K.orange, K.yellow, K.grass, K.blue], 182, 22, 330) +
    cloud(18, 330, 1) + cloud(292, 330, 1) + HILL());

  /* ===== nálepky (kolem bodu 0,0, asi 104 × 104) ===== */
  const fc = (x, y, s, d = 10) => eyes(x - d, x + d, y, s) + smile(x, f1(y + 9 * s * 1.6), f1(4 * s * 2));
  const STICKERS = [
    { k: 'crown', name: 'Korunka', svg: p('M-38 22 L-42 -18 L-20 2 L0 -28 L20 2 L42 -18 L38 22 Z') + rc(-40, 14, 80, 14, 5) + c(0, -32, 6) + c(-42, -22, 5) + c(42, -22, 5) },
    { k: 'bow', name: 'Mašle', svg: p('M0 0 L-42 -26 Q-50 0 -42 26 Z') + p('M0 0 L42 -26 Q50 0 42 26 Z') + c(0, 0, 11) },
    { k: 'hat', name: 'Čepička', svg: p('M0 -38 L30 34 Q0 44 -30 34 Z') + p('M-12 -8 L14 -2 M-20 14 L22 22', 'l') + c(0, -40, 9) },
    { k: 'glasses', name: 'Brýle', svg: c(-22, 0, 18) + c(22, 0, 18) + p('M-5 -3 Q0 -8 5 -3 M-40 -4 L-48 -12 M40 -4 L48 -12', 'l') },
    { k: 'heart', name: 'Srdíčko', svg: p('M0 39.6 C-55 6.6 -39.6 -41.8 0 -15.4 C39.6 -41.8 55 6.6 0 39.6 Z') + eyes(-11, 11, 0, .5) + cheeks(-21, 21, 9, .5) + smile(0, 8, 4) },
    { k: 'star', name: 'Hvězdička', svg: star(0, 2, 44, 19) + eyes(-8, 8, 4, .42) + smile(0, 12, 3.5) },
    { k: 'balloon', name: 'Balonek', svg: p('M0 22 Q-8 34 0 42 Q6 48 0 52', 'l') + e(0, -14, 28, 34) + p('M-6 22 L6 22 L0 16 Z') + e(-10, -26, 5, 9, 'hl', -20) },
    { k: 'flower', name: 'Kytička', svg: [0, 1, 2, 3, 4, 5].map(i => c(f1(Math.cos(i * 1.047) * 20), f1(Math.sin(i * 1.047) * 20), 14)).join('') + c(0, 0, 13) + eyes(-5, 5, -1, .36) + smile(0, 5, 3) },
    { k: 'sun', name: 'Sluníčko', svg: p(Array.from({ length: 8 }, (_, i) => { const a = i / 8 * Math.PI * 2; return `M${f1(Math.cos(a) * 32)} ${f1(Math.sin(a) * 32)} L${f1(Math.cos(a) * 46)} ${f1(Math.sin(a) * 46)}`; }).join(' '), 'l') + c(0, 0, 26) + eyes(-9, 9, -2, .5) + cheeks(-17, 17, 8, .45) + smile(0, 7, 4.5) },
    { k: 'cloud', name: 'Mráček', svg: cloud(-33, 25, .85) + eyes(-8, 14, 4, .42) + smile(3, 11, 3.5) },
    { k: 'rainbow', name: 'Duha', svg: [[46, 36], [36, 26], [26, 16]].map(([R1, R2]) => p(`M${-R1} 20 A${R1} ${R1} 0 0 1 ${R1} 20 L${R2} 20 A${R2} ${R2} 0 0 0 ${-R2} 20 Z`)).join('') },
    { k: 'tree', name: 'Stromek', svg: rc(-8, 10, 16, 36, 4) + c(-18, 2, 19) + c(18, 2, 19) + c(0, -18, 24) },
    { k: 'gift', name: 'Dárek', svg: p('M0 -24 Q-22 -48 -26 -30 Q-22 -24 0 -24 Z M0 -24 Q22 -48 26 -30 Q22 -24 0 -24 Z') + rc(-32, -10, 64, 48, 6) + rc(-38, -24, 76, 16, 5) + rc(-6, -24, 12, 62, 2) },
    { k: 'cake', name: 'Dort', svg: rc(-3, -36, 6, 22, 2) + p('M0 -52 Q9 -43 0 -38 Q-9 -43 0 -52 Z') + rc(-30, -16, 60, 26, 7) + rc(-40, 6, 80, 32, 7) },
    { k: 'shroom', name: 'Muchomůrka', svg: rc(-14, 0, 28, 36, 10) + p('M-44 6 Q-42 -40 0 -42 Q42 -40 44 6 Z') + c(-20, -16, 6) + c(8, -26, 5) + c(22, -8, 5) + eyes(-6, 6, 15, .33) + smile(0, 22, 3) },
    { k: 'wand', name: 'Kouzelná hůlka', svg: rc(-4, 4, 8, 46, 3) + star(0, -14, 28, 12) }
  ];

  return { v: 4, pages: PAGES, scenes: SCENES, stickers: STICKERS, kit: { K } };
})();
