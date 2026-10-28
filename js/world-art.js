/* Zvířátková dílna — AI illustrations of the world (docs/ILLUSTRACE.md)
   Only images listed in img/world/manifest.json are used. A missing image keeps the current look,
   so the game works the same with no illustrations, some, or all of them. */
(() => {
  'use strict';

  // location key -> home card id / game screens that share the location's background
  const HOME = { road: 'goRoad', puzzle: 'goPuzzle', color: 'goColor', count: 'goCount', abc: 'goAbc', logic: 'goLogic', memo: 'goMemo', english: 'goEnglish' };
  const SCREENS = {
    road: ['road'], puzzle: ['pickPuzzle', 'puzzle', 'extra'], color: ['pickColor', 'color'],
    count: ['count'], abc: ['abc'], logic: ['logic'], memo: ['memo'], english: ['english']
  };

  const load = url => new Promise((ok, fail) => { const im = new Image(); im.onload = () => ok(url); im.onerror = fail; im.src = url; });

  fetch('img/world/manifest.json', { cache: 'no-cache' })
    .then(r => (r.ok ? r.json() : null))
    .then(m => { if (m) apply(m); })
    .catch(() => {}); // no manifest: nothing changes

  function apply(m) {
    const v = encodeURIComponent(m.v || 1); // bump "v" in the manifest when images change (iPhone cache)
    // absolute URL: a relative url() inside a CSS variable would resolve against css/, not the page
    const url = (kind, key) => new URL(`img/world/${kind}-${key}.webp?v=${v}`, document.baseURI).href;

    // Home: the illustration fills the card, the small icon steps aside
    (m.tiles || []).forEach(key => {
      const card = document.getElementById(HOME[key]);
      if (!card) return;
      load(url('tile', key)).then(u => {
        card.style.setProperty('--art', `url("${u}")`);
        card.classList.add('has-art');
      }).catch(() => {});
    });

    // Game screens: the background loads the first time the screen is opened
    const pending = new Map();
    (m.backgrounds || []).forEach(key => (SCREENS[key] || []).forEach(id => pending.set(id, key)));
    const paint = screen => {
      const key = pending.get(screen.id);
      if (!key) return;
      pending.delete(screen.id);
      load(url('bg', key)).then(u => {
        const base = getComputedStyle(screen).backgroundImage;
        // a light veil keeps the game content readable on top of the picture
        screen.style.backgroundImage = `linear-gradient(rgba(255,249,242,.34), rgba(255,249,242,.1) 55%, rgba(255,249,242,0)), url("${u}")` +
          (base && base !== 'none' ? ', ' + base : '');
        screen.style.backgroundSize = 'cover';
        screen.style.backgroundPosition = 'center bottom';
        screen.style.backgroundRepeat = 'no-repeat';
        screen.classList.add('has-world-bg');
      }).catch(() => {});
    };
    pending.forEach((key, id) => {
      const screen = document.getElementById(id);
      if (!screen) return;
      if (!screen.hidden) { paint(screen); return; }
      const obs = new MutationObserver(() => { if (!screen.hidden) { obs.disconnect(); paint(screen); } });
      obs.observe(screen, { attributes: true, attributeFilter: ['hidden'] });
    });
  }
})();
