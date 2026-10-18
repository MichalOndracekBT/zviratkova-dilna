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

  // progress per section: [done, total]; done from what the app stores, totals from window.appTotals()
  const PROGRESS = {
    'zviratkova-dilna': (T) => ({
      puzzle: [cnt('zd-solved'), T.puzzle], omalovanky: [cnt('zd-ndone'), T.omalovanky], cesta: [cnt('zd-road'), T.cesta],
      cisla: [cnt('zd-num'), T.cisla], abeceda: [cnt('zd-traced'), T.abeceda], logika: [cnt('zd-lg'), T.logika], spojovacky: [cnt('zd-dots'), T.spojovacky],
    }),
    'marusky-apka': (T) => {
      const stars = safe(() => JSON.parse(ls.get('mm-stars') || '{}')) || {};
      const sum = (ts) => ts.reduce((a, t) => a + Math.min(3, stars[t.id] || 0), 0);
      const out = {
        ucivo: [sum(T.topics), T.topics.length * 3],
        puzzle: [cnt('mm-solved'), T.puzzle], omalovanky: [cnt('mm-ndone'), T.omalovanky], karticky: [cnt('mm-cards'), T.karticky],
        cisla: [cnt('mm-num'), T.cisla], abeceda: [cnt('mm-traced'), T.abeceda], logika: [cnt('mm-lg'), T.logika],
      };
      [1, 2, 3, 4, 5].forEach(g => { const ts = T.topics.filter(t => t.grade === g); out[`${g}. třída`] = [sum(ts), ts.length * 3]; });
      return out;
    },
    'garaz': (T) => ({
      auta: [cnt('gz-built'), T.auta], omalovanky: [cnt('gz-ndone'), T.omalovanky], draha: [cnt('gz-tracks'), T.draha],
      cisla: [cnt('gz-num'), T.cisla], abeceda: [cnt('gz-traced'), T.abeceda], logika: [cnt('gz-lg'), T.logika],
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
    const p = safe(() => PROGRESS[APP](window.appTotals()));
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
