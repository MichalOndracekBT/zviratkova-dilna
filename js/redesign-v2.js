/* Zvířátková dílna — redesign v2 behavior
   The game script in index.html runs inside a closure, so this layer cannot replace its
   functions (say, sfx, confetti). Changes to game logic, voice and sounds live in index.html;
   this file only adds UI behaviour and talks to the game through window.ZD. */
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
  const mascot = document.getElementById('mascot'); // jednorožčice Lili (STYLE_GUIDE: Maskot Lili)

  /* ---------- CONSISTENT TAP FEEL ---------- */
  const tappable = '.mode,.btn,.tile,.ctile,.num-tile,.ans,.tool,.chip,.abc-key';
  document.addEventListener('pointerdown', e => {
    const el = e.target.closest && e.target.closest(tappable);
    if (el) el.classList.add('v2-pressed');
  }, {passive:true});
  // release anywhere (also outside the pressed element) clears the pressed state
  ['pointerup','pointercancel'].forEach(type => {
    document.addEventListener(type, () => {
      document.querySelectorAll('.v2-pressed').forEach(el => el.classList.remove('v2-pressed'));
    }, {passive:true});
  });

  /* ---------- LOCAL SUCCESS BURST (3–8 stars at the source) ---------- */
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

  /* ---------- LILI VOICE BANK ----------
     Prepared for AUDIO_MOTION_GUIDE (short phrases, praise cooldown, no immediate repeats).
     Not wired into the games yet. It speaks through the game's own say(), so mute is respected. */
  const voiceBank = {
    welcome: ['Ahoj! Co si dnes zahrajeme?','Vyber si dobrodružství.','Tak kam se dnes podíváme?'],
    praise: ['Skvěle.','To se povedlo.','Výborně.','Přesně tak.','Paráda.'],
    retry: ['Zkus to ještě jednou.','Skoro.','Ještě kousek.'],
    complete: ['Hotovo! Paráda.','To se ti povedlo.','Máš to!']
  };
  const speak = text => { if (window.ZD && text) window.ZD.say(text); };
  const last = {};
  function pick(kind) {
    const list = voiceBank[kind];
    const choices = list.filter(x => x !== last[kind]);
    return (last[kind] = choices[Math.floor(Math.random()*choices.length)] || list[0]);
  }
  let lastPraiseAt = 0;
  window.LiliVoice = {
    welcome() { speak(pick('welcome')); },
    retry() { speak(pick('retry')); },
    complete() { speak(pick('complete')); },
    praise() {
      const now = Date.now();
      if (now - lastPraiseAt < 3200) return;
      lastPraiseAt = now;
      speak(pick('praise'));
    }
  };

  /* ---------- LILI: ONE QUIET INTERACTION ----------
     The game already greets on tap ("Ahoj! Já jsem Lili. Pojď si se mnou hrát!").
     The bubble only shows the same words; it does not speak a second line. */
  let bubbleTimer = 0;
  if (mascot) mascot.addEventListener('click', () => {
    const hero = mascot.closest('.hero-row') || mascot.parentElement;
    if (!hero) return;
    hero.style.position = 'relative';
    hero.querySelector('.v2-lumi-bubble')?.remove();
    const bubble = document.createElement('div');
    bubble.className = 'v2-lumi-bubble';
    bubble.textContent = 'Ahoj! Já jsem Lili. Pojď si se mnou hrát!';
    bubble.style.right = '8px';
    bubble.style.bottom = '2px';
    hero.appendChild(bubble);
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(() => bubble.remove(), 3200);
  });
})();
