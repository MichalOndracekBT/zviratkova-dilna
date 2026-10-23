/* Zvířátková dílna — redesign v2 behavior */
(() => {
  'use strict';

  const $v = (s, root=document) => root.querySelector(s);
  const reduce = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);

  /* ---------- HOME AS A WORLD ---------- */
  const homeNames = {
    goRoad: ['Duhová cesta', 'Zachraň zvířecí kamarády'],
    goPuzzle: ['Puzzle louka', 'Skládej zvířecí kamarády'],
    goColor: ['Malířská dílna', 'Barvy, štětce a obrázky'],
    goCount: ['Číselná jeskyně', 'Objevuj čísla 1 až 10'],
    goAbc: ['Abecední les', 'Písmenka, zvuky a slova'],
    goLogic: ['Hádanková stezka', 'Logika a pozornost'],
    goMemo: ['Pexesový háj', 'Najdi zvířecí dvojice']
  };
  Object.entries(homeNames).forEach(([id,[name,sub]]) => {
    const b = document.getElementById(id);
    if (!b) return;
    const n = b.querySelector('.mode-name');
    const s = b.querySelector('.mode-sub');
    if (n) n.textContent = name;
    if (s && id !== 'goRoad') s.textContent = sub;
    b.setAttribute('aria-label', name + '. ' + sub);
  });

  const lead = $v('#home .lead');
  if (lead) lead.textContent = 'Vyber si místo a začni dobrodružství.';
  const mascot = document.getElementById('mascot');
  if (mascot) mascot.setAttribute('aria-label','Jednorožec Lumi');

  /* ---------- CONSISTENT TAP FEEL ---------- */
  const tappable = '.mode,.btn,.tile,.ctile,.num-tile,.ans,.tool,.chip,.abc-key';
  document.addEventListener('pointerdown', e => {
    const el = e.target.closest && e.target.closest(tappable);
    if (el) el.classList.add('v2-pressed');
  }, {passive:true});
  ['pointerup','pointercancel','pointerleave'].forEach(type => {
    document.addEventListener(type, e => {
      const el = e.target.closest && e.target.closest(tappable);
      if (el) el.classList.remove('v2-pressed');
    }, {passive:true});
  });

  /* ---------- PROFESSIONAL LOCAL SUCCESS BURST ---------- */
  const burstColors = ['#FFD86B','#FF9FD1','#C9A7FF','#89E4D9','#FFFFFF'];
  function burst(origin, count=7) {
    if (reduce) return;
    const layer = document.createElement('div');
    layer.className = 'v2-burst-layer';
    document.body.appendChild(layer);

    let cx = innerWidth/2, cy = innerHeight*.44;
    const el = origin instanceof Element ? origin : $v(origin || '#winArt');
    if (el) {
      const r = el.getBoundingClientRect();
      cx = r.left + r.width/2;
      cy = r.top + r.height/2;
    }

    const total = Math.max(3, Math.min(8, count));
    for (let i=0;i<total;i++) {
      const a = (-Math.PI*.88) + (Math.PI*.76)*(i/Math.max(1,total-1));
      const distance = 54 + Math.random()*48;
      const star = document.createElement('i');
      star.className = 'v2-burst-star';
      star.style.setProperty('--x', cx+'px');
      star.style.setProperty('--y', cy+'px');
      star.style.setProperty('--dx', Math.cos(a)*distance+'px');
      star.style.setProperty('--dy', Math.sin(a)*distance+'px');
      star.style.setProperty('--s', (9+Math.random()*9)+'px');
      star.style.setProperty('--d', (600+Math.random()*180)+'ms');
      star.style.setProperty('--delay', (i*22)+'ms');
      star.style.setProperty('--rot', ((Math.random()-.5)*120)+'deg');
      star.style.setProperty('--c', burstColors[i%burstColors.length]);
      layer.appendChild(star);
    }
    setTimeout(() => layer.remove(), 1100);
  }
  window.ZDBurst = burst;

  // Replace the old 170-particle full-screen shower. Keep the same function name
  // so existing game completion flows automatically use the new effect.
  try {
    confetti = function() {
      burst($v('#win:not([hidden]) #winArt') || $v('.screen:not([hidden]) .board.done') || null, 7);
    };
  } catch (_) {}

  /* ---------- VOICE FALLBACK ---------- */
  let cachedVoice = null;
  let currentUtterance = null;
  let lastPraise = '';
  let lastPraiseAt = 0;

  function scoreVoice(v) {
    let score = 0;
    const lang = String(v.lang || '').toLowerCase();
    const name = String(v.name || '').toLowerCase();
    if (lang === 'cs-cz') score += 100;
    else if (lang.startsWith('cs')) score += 80;
    if (/zuzana|vlasta/.test(name)) score += 35;
    if (/google|microsoft|apple/.test(name)) score += 20;
    if (/enhanced|premium|natural|neural/.test(name)) score += 25;
    if (/espeak|compact/.test(name)) score -= 35;
    if (v.default) score += 5;
    return score;
  }

  function bestCzechVoice() {
    if (!('speechSynthesis' in window)) return null;
    const voices = speechSynthesis.getVoices().filter(v => /^cs([-_]|$)/i.test(v.lang || ''));
    if (!voices.length) return null;
    voices.sort((a,b) => scoreVoice(b)-scoreVoice(a));
    cachedVoice = voices[0];
    return cachedVoice;
  }
  if ('speechSynthesis' in window) {
    speechSynthesis.addEventListener?.('voiceschanged', () => { cachedVoice = null; bestCzechVoice(); });
    bestCzechVoice();
  }

  function polishedSay(text) {
    try {
      if (typeof muted !== 'undefined' && muted) return;
    } catch (_) {}
    if (!text || !('speechSynthesis' in window)) return;

    const synth = speechSynthesis;
    const u = new SpeechSynthesisUtterance(String(text));
    u.lang = 'cs-CZ';
    u.rate = .91;
    u.pitch = .96;
    u.volume = .94;
    const voice = cachedVoice || bestCzechVoice();
    if (voice) u.voice = voice;
    currentUtterance = u;
    window.__zvLumiUtterance = u;

    const play = () => {
      try { synth.resume(); synth.speak(u); } catch (_) {}
    };
    if (synth.speaking || synth.pending) {
      synth.cancel();
      setTimeout(play, 65);
    } else play();
  }

  try { say = polishedSay; } catch (_) {}

  const voiceBank = {
    welcome: ['Ahoj! Co si dnes zahrajeme?','Vyber si dobrodružství.','Tak kam se dnes podíváme?'],
    praise: ['Skvěle.','To se povedlo.','Výborně.','Přesně tak.','Paráda.'],
    retry: ['Zkus to ještě jednou.','Skoro.','Ještě kousek.'],
    complete: ['Hotovo! Paráda.','To se ti povedlo.','Máš to!']
  };
  function pick(list, previous) {
    const choices = list.filter(x => x !== previous);
    return choices[Math.floor(Math.random()*choices.length)] || list[0];
  }
  window.LumiVoice = {
    say: polishedSay,
    welcome() { polishedSay(pick(voiceBank.welcome,'')); },
    retry() { polishedSay(pick(voiceBank.retry,'')); },
    complete() { polishedSay(pick(voiceBank.complete,'')); },
    praise() {
      const now = Date.now();
      if (now-lastPraiseAt < 3200) return;
      lastPraiseAt = now;
      lastPraise = pick(voiceBank.praise,lastPraise);
      polishedSay(lastPraise);
    }
  };

  /* ---------- LUMI: ONE QUIET INTERACTION ---------- */
  let bubbleTimer = 0;
  if (mascot) mascot.addEventListener('click', () => {
    const hero = mascot.closest('.hero-row') || mascot.parentElement;
    if (!hero) return;
    hero.style.position = 'relative';
    hero.querySelector('.v2-lumi-bubble')?.remove();
    const bubble = document.createElement('div');
    bubble.className = 'v2-lumi-bubble';
    bubble.textContent = 'Co si dnes zahrajeme?';
    bubble.style.right = '8px';
    bubble.style.bottom = '2px';
    hero.appendChild(bubble);
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(() => bubble.remove(), 2300);
    window.LumiVoice?.welcome();
  });

  /* ---------- REMOVE OVERACTIVE HOME EFFECTS ---------- */
  document.querySelectorAll('#home .mode').forEach(el => {
    el.addEventListener('animationend', () => {
      // Entrance animation runs once. No repeating card animation is added here.
    }, {once:true});
  });
})();
