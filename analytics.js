/* Anonymous play statistics: which screens and features are used, overall progress and returning devices.
   No names, no IP addresses — only a random device id kept in this browser. Loaded after the app's main script. */
(() => {
  const ENDPOINT = 'https://apky-analytika.apky-analytika.workers.dev/e';
  const APP = document.currentScript && document.currentScript.dataset.app;
  if (!APP) return;

  const ls = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };
  const rid = () => Array.from(crypto.getRandomValues(new Uint8Array(12)), b => b.toString(36).padStart(2, '0')).join('');
  const list = (k) => { try { return JSON.parse(ls.get(k) || '[]') || []; } catch (e) { return []; } };
  const cnt = (k) => new Set(list(k)).size;
  const safe = (fn) => { try { return fn(); } catch (e) { return null; } };

  // progress per section: [done, total], read from what the app already stores
  const PROGRESS = {
    'zviratkova-dilna': () => ({
      puzzle: [cnt('zd-solved'), ANIMALS.length],
      omalovanky: [cnt('zd-ndone'), PAGES.length],
      cesta: [cnt('zd-road'), RD_LV.length],
      cisla: [cnt('zd-num'), 10],
      abeceda: [cnt('zd-traced'), LETTERS.length],
      logika: [cnt('zd-lg'), LG_ORDER.length],
      spojovacky: [cnt('zd-dots'), DOTS.length],
    }),
    'marusky-apka': () => {
      const stars = safe(() => JSON.parse(ls.get('mm-stars') || '{}')) || {};
      const out = {
        ucivo: [Object.values(stars).reduce((a, b) => a + b, 0), TOPICS.length * 3],
        puzzle: [cnt('mm-solved'), ANIMALS.length],
        omalovanky: [cnt('mm-ndone'), PAGES.length],
        kartičky: [cnt('mm-cards'), CARDS.length],
        cisla: [cnt('mm-num'), 10],
        abeceda: [cnt('mm-traced'), LETTERS.length],
        logika: [cnt('mm-lg'), LG_ORDER.length],
      };
      [1, 2, 3, 4, 5].forEach(g => {
        const ts = TOPICS.filter(t => t.grade === g);
        out[`${g}. třída`] = [ts.reduce((a, t) => a + (stars[t.id] || 0), 0), ts.length * 3];
      });
      return out;
    },
    'garaz': () => ({
      auta: [cnt('gz-built'), VEHICLES.length],
      omalovanky: [cnt('gz-ndone'), PAGES.length],
      draha: [cnt('gz-tracks'), TRACKS.length],
      cisla: [cnt('gz-num'), 10],
      abeceda: [cnt('gz-traced'), LETTERS.length],
      logika: [cnt('gz-lg'), LG_ORDER.length],
    }),
  };

  let device = ls.get('an-device');
  if (!device) { device = rid(); ls.set('an-device', device); }
  const last = +ls.get('an-last') || 0;
  let session = ls.get('an-session');
  if (!session || Date.now() - last > 30 * 60e3) { session = rid(); ls.set('an-session', session); }
  const touch = () => ls.set('an-last', String(Date.now()));
  touch();

  const standalone = !!(navigator.standalone || (window.matchMedia && matchMedia('(display-mode: standalone)').matches));
  let referrer = '';
  try { const r = document.referrer && new URL(document.referrer); if (r && r.host !== location.host) referrer = r.host; } catch (e) {}

  let queue = [], sent = 0, lastProgress = '';
  const push = (type, name, value) => { if (sent + queue.length < 600) queue.push({ type, name, value }); touch(); };
  function flush(beacon) {
    if (!queue.length) return;
    const events = queue.splice(0, 100);
    sent += events.length;
    const body = JSON.stringify({ app: APP, device, session, standalone, referrer, events });
    // text/plain keeps it a simple request (no CORS preflight)
    const blob = new Blob([body], { type: 'text/plain' });
    if (beacon && navigator.sendBeacon) navigator.sendBeacon(ENDPOINT, blob);
    else fetch(ENDPOINT, { method: 'POST', body: blob, keepalive: true, mode: 'cors' }).catch(() => {});
  }

  function progress() {
    const p = safe(PROGRESS[APP]);
    if (!p) return;
    const parts = Object.entries(p).filter(([, v]) => v && v[1] > 0).map(([k, [d, t]]) => [k, Math.min(1, d / t)]);
    const key = JSON.stringify(parts);
    if (key === lastProgress) return;
    lastProgress = key;
    parts.forEach(([k, v]) => push('progress', k, v));
    if (parts.length) push('progress', 'celkem', parts.reduce((a, [, v]) => a + v, 0) / parts.length);
  }

  // screens: the app shows one .screen at a time by toggling [hidden]
  let curScreen = null;
  const visible = () => { const s = [...document.querySelectorAll('.screen')].find(el => !el.hidden); return s && s.id; };
  const onScreen = () => { const s = visible(); if (s && s !== curScreen) { curScreen = s; push('screen', s); progress(); } };
  new MutationObserver(onScreen).observe(document.body, { subtree: true, attributes: true, attributeFilter: ['hidden'] });

  // features: any button or tile the child taps, named by screen + element
  document.addEventListener('click', ev => {
    const el = ev.target.closest && ev.target.closest('button, [role="button"], .ctile, .num-tile, .lg-tile, .mm-topic, a');
    if (!el) return;
    const d = el.dataset || {};
    const what = el.id || (d.back ? 'zpět' : '') || [...el.classList].find(c => !/^(btn|chip|on|sel|active)$/.test(c)) || el.tagName.toLowerCase();
    const detail = d.t || d.m || d.n || d.g || d.s || d.c || '';
    push('feature', `${curScreen || '?'}:${what}${detail ? '=' + detail : ''}`);
  }, true);

  push('open', location.pathname);
  onScreen();
  progress();
  setInterval(() => { progress(); flush(false); }, 15e3);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') { progress(); flush(true); } });
  window.addEventListener('pagehide', () => flush(true));
})();
