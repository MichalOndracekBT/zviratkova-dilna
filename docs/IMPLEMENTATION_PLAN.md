# B — Implementační plán

## Princip
Projekt zůstává lehká PWA. Redesign nemá vyžadovat framework. Priorita je rozdělit design systém, motion a voice od herní logiky.

## P0 — bezpečný základ
- branch redesign-v2
- docs ve verzování
- README odkazuje na docs
- neměnit analytics event names bez důvodu (ID obrazovek a tlačítek zůstávají)

## P1 — design systém
Přidat centrální CSS tokeny a override layer:
- barvy
- radius
- shadows
- spacing
- motion duration
- konzistentní button/card states

## P2 — nový Home
Stávající funkční ID zachovat, ale vizuálně z menu vytvořit mapu světa. Nejdřív změnit layout, názvy lokací, hloubku, hierarchii a tap feedback. Herní logiku neměnit.

## P3 — motion cleanup
Zavést jednotný motion manager:
- tap
- snap
- smallSuccess
- bigReward
- hint
- screen transition

Současný full-screen confetti shower odstranit. Success burst max 5–7 částic lokálně kolem objektu.

## P4 — voice
Oddělit voice od přímého browser TTS. Přidat katalog hlášek, cooldown, neopakovat stejnou hlášku a vybrat nejlepší dostupný český hlas. Browser TTS je fallback, ne finální audio produkce. Postup produkce: `AUDIO_MOTION_GUIDE.md` → Produkce hlasu.

## P5 — puzzle polish
- lift při drag
- magnetic snap
- halo při správném dílku
- jemný návrat při chybě
- hint po idle
- krátká completion sekvence

## P6 — další aktivity
Omalovánky: floating toolbar, selected states, galerie.
Čísla: scény a počítání.
Abeceda: písmeno jako mini scéna.
Rewards: hvězdy, krystaly, sbírka.

## Assety
Bez obrázků a zvuku zůstane redesign u přebarvení. Potřeba:
- **Ilustrace lokací** pro mapu světa a pozadí herních obrazovek, v jednom stylu (pastel, soft 2.5D). Formát SVG nebo WebP, složka `img/world/`. Lokaci přejmenovat až s ilustrací, která název nese.
- **Hlas Lili** jako předgenerované audio soubory (viz `AUDIO_MOTION_GUIDE.md`).
- Doporučení: nejdřív dotáhnout jednu část naplno (Home + puzzle) včetně assetů, vyzkoušet s dětmi a pak teprve další.

## Architektura vrstvy redesignu
- Herní skript v `index.html` běží uzavřený ve funkci `(() => { … })()`. Soubory v `js/` se k jeho proměnným a funkcím (`say`, `sfx`, `confetti`, `muted`) nedostanou a nemůžou je přepsat. Pokus o přepis navíc tiše spolkne `try/catch`.
- Změny herní logiky, hlasu a zvuků proto patří přímo do `index.html`.
- Vrstva v `js/` mluví se hrou jen přes `window.ZD` (`say`, `isMuted`) a hra volá efekt přes `window.ZDBurst`.
- CSS: pozor na selektory s váhou ID. `.screen:not(#home)` má váhu ID a přebije třeba `.btn.green`. Barevná tlačítka a stavy (`aria-pressed`) z takových pravidel vynechat.
- Při změně CSS/JS zvednout `?v=` v odkazu v `index.html`, aby si iPhone nenechal starou verzi z cache.

## Doporučená struktura
- css/redesign-v2.css
- js/redesign-v2.js
- později css/tokens.css, js/motion.js, js/audio.js, js/voice.js
- docs/STYLE_GUIDE.md
- docs/UX_REDESIGN.md
- docs/IMPLEMENTATION_PLAN.md
- docs/AUDIO_MOTION_GUIDE.md
- docs/CHANGELOG.md (co se kdy změnilo a proč)

## Performance
Animovat hlavně transform a opacity. Omezit filter, blur a layout properties. Respektovat prefers-reduced-motion.

## Pull request checklist
- odpovídá Style Guide?
- dítě chápe hlavní akci bez čtení?
- zazní každá instrukce hlasem a nic se neusekne?
- nemění se výuková mechanika (Ochrana výuky)?
- správný tap feedback?
- je vidět vybraný stav a ✓/akční tlačítka?
- žádné náhodné particles?
- animace nejsou delší než nutné?
- voice není rušivý?
- funguje bez voice a se ztlumeným zvukem nic nemluví?
- reduced motion?
- vejde se na výšku i na šířku (i iPhone SE)?
- výkon?
- progress se neztrácí?
- vyzkoušeno na skutečném iPhonu?

## Stav k 23. 10. 2026
Historie jednotlivých iterací je v `CHANGELOG.md`.

Hotovo:
- [x] branch redesign-v2, dokumentace a README odkazy
- [x] základ design tokenů a jednotný vzhled obrazovek (CSS vrstva)
- [x] sjednocený tap feedback
- [x] pryč je full-screen confetti shower (170 částic) i jiskry po každém ťuknutí
- [x] lokální reward burst 5–7 hvězd
- [x] puzzle: nápověda po 7 s nečinnosti, jemné zazáření místo třesení
- [x] puzzle picker s lokálními SVG zvířat (stejné obrázky jako v samotném puzzle)
- [x] čísla a abeceda: nová kompozice scény (V3), počítání nahlas zachované
- [x] odměna po dokončení: klidnější karta bez částic přes tlačítka
- [x] měkčí zvuky docvaknutí a výhry, lepší výběr českého hlasu (funguje od oprav 23. 10.)
- [x] reduced-motion v redesign vrstvě
- [x] opravy po review 23. 10. (viz CHANGELOG)

Částečně:
- [ ] Home jako mapa světa: zatím natočené karty, chybí ilustrace lokací (vejde se bez scrollování na všech iPhonech od SE po Pro Max, na výšku i na šířku)
- [ ] herní obrazovky (hádanky, pexeso, omalovánky) přišly o ilustrovanou krajinu v pozadí: vrátit, nebo nahradit novými ilustracemi
- [ ] voice bank s cooldownem: připravená (`window.LiliVoice`), ale hry ji zatím nepoužívají
- [ ] completion sekvence podle UX_REDESIGN (zvířátko ožije, pochvala Lili): zatím jen zkrácené časování

Další:
- [ ] ilustrace lokací (Assety)
- [ ] skutečné audio hlasu Lili (Produkce hlasu)
- [ ] samostatný audio manager a music ducking
- [ ] reward/collection systém (Můj jednorožec)

## Před merge do main
- projít Definition of Done ze STYLE_GUIDE na iPhonu, na výšku i na šířku
- nechat hrát děti a sledovat, kde se zaseknou
- zapsat výchozí metriky z analytiky (UX_REDESIGN → Jak poznáme, že redesign pomohl)
- zvážit postupné nasazení po částech
