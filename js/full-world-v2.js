/* Zvířátková dílna — full-world behavior layer */
(() => {
  'use strict';

  const gameScreens = ['pickPuzzle','puzzle','extra','pickColor','color','count','abc','logic','memo','road'];
  const titles = {
    pickPuzzle:'Puzzle louka',
    pickColor:'Malířská dílna',
    count:'Číselná jeskyně',
    abc:'Abecední les',
    logic:'Hádanková stezka',
    memo:'Pexesový háj'
  };

  // Rename only generic section headers; active activity titles keep their own names.
  Object.entries(titles).forEach(([id,title]) => {
    const screen = document.getElementById(id);
    if (!screen) return;
    const h = screen.querySelector('.topbar h2');
    if (h && !h.id) h.textContent = title;
  });

  const observer = new MutationObserver(records => {
    for (const record of records) {
      const screen = record.target;
      if (!(screen instanceof HTMLElement) || !screen.classList.contains('screen')) continue;
      if (record.attributeName !== 'hidden' || screen.hidden) continue;
      screen.classList.remove('v2-enter');
      void screen.offsetWidth;
      screen.classList.add('v2-enter');
      setTimeout(() => screen.classList.remove('v2-enter'), 430);
    }
  });
  gameScreens.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el,{attributes:true,attributeFilter:['hidden']});
  });

  // Make picker cards feel like game objects, not web buttons.
  document.addEventListener('pointerdown', e => {
    const el = e.target.closest?.('.tile,.ctile,.num-tile,.lg-tile,.lg-card,.memo-card,.rd-lv,.abc-key,.ans');
    if (!el) return;
    el.style.willChange = 'transform';
  }, {passive:true});
  document.addEventListener('pointerup', e => {
    const el = e.target.closest?.('.tile,.ctile,.num-tile,.lg-tile,.lg-card,.memo-card,.rd-lv,.abc-key,.ans');
    if (!el) return;
    setTimeout(() => { el.style.willChange = ''; }, 220);
  }, {passive:true});

  // Accessible world descriptions for screen readers and future voice onboarding.
  const worldLabels = {
    pickPuzzle:'Puzzle louka. Vyber zvířátko a obtížnost.',
    pickColor:'Malířská dílna. Vyber obrázek k vybarvení.',
    count:'Číselná jeskyně. Vyber číslo a zahraj si.',
    abc:'Abecední les. Poznávej písmena a slova.',
    logic:'Hádanková stezka. Vyber si hádanku.',
    memo:'Pexesový háj. Najdi stejné dvojice.',
    road:'Duhová cesta. Zachraň zvířecí kamarády.'
  };
  Object.entries(worldLabels).forEach(([id,label]) => {
    document.getElementById(id)?.setAttribute('aria-label',label);
  });
})();
