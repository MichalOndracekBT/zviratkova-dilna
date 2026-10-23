# B — Implementační plán

## Princip
Projekt zůstává lehká PWA. Redesign nemá vyžadovat framework. Priorita je rozdělit design systém, motion a voice od herní logiky.

## P0 — bezpečný základ
- branch redesign-v2
- docs ve verzování
- README odkazuje na docs
- neměnit analytics event names bez důvodu

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
Oddělit voice od přímého browser TTS. Přidat katalog hlášek, cooldown, neopakovat stejnou hlášku a vybrat nejlepší dostupný český hlas. Browser TTS je fallback, ne finální audio produkce.

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

## Doporučená struktura
- css/redesign-v2.css
- js/redesign-v2.js
- později css/tokens.css, js/motion.js, js/audio.js, js/voice.js
- docs/STYLE_GUIDE.md
- docs/UX_REDESIGN.md
- docs/IMPLEMENTATION_PLAN.md
- docs/AUDIO_MOTION_GUIDE.md

## Performance
Animovat hlavně transform a opacity. Omezit filter, blur a layout properties. Respektovat prefers-reduced-motion.

## Pull request checklist
- odpovídá Style Guide?
- dítě chápe hlavní akci bez čtení?
- správný tap feedback?
- žádné náhodné particles?
- animace nejsou delší než nutné?
- voice není rušivý?
- funguje bez voice?
- reduced motion?
- výkon?
- progress se neztrácí?
