# C — Voice, Sound & Motion Guide

## Cíl
Zvuk a animace mají dodat game feel, ne předvádět efekty.

## Voice persona — Lili
Hlas: mladá dospělá, jemný ženský hlas (Lili je jednorožčice), střední pitch, tempo cca 0.9–1.0, energie 6/10, přirozená česká výslovnost.

Nechceme vysoký cartoon voice, robotický zvuk, šišlání ani přehnanou roztomilost.

## Voice pravidla
- jedna krátká věta
- typicky 0.5–2 s
- ne po každém tapu
- cooldown cca 3–5 s u pochval
- stejnou hlášku neopakovat dvakrát za sebou
- při voice stáhnout hudbu
- dítě rychle pokračuje → voice nesmí brzdit
- každá nová hláška ukončí tu předchozí: počítání a zadání úkolu nepřerušovat, u sekvencí držet rozestup (počítání cca 0,8 s)
- ztlumení zvuku vypíná i hlas, všude včetně maskota
- co Lili říká, to je v její bublině (a naopak)

## Voice bank
Připravená v `js/redesign-v2.js` jako `window.LiliVoice` (cooldown pochval, bez opakování stejné hlášky). Hry ji zatím nepoužívají, mluví vlastními hláškami přes `say()`.

Welcome:
- Ahoj! Co si dnes zahrajeme?
- Ahoj! Vyber si dobrodružství.

Praise:
- Super.
- Skvěle.
- Výborně.
- To se povedlo.
- Přesně tak.

Retry:
- Zkus to ještě jednou.
- Skoro.
- Ještě kousek.

Hint:
- Zkus se podívat sem.
- Kam asi ten dílek patří?

Complete:
- Hotovo! Paráda.
- To se ti povedlo.
- Máš to!

## Produkce hlasu
Browser TTS (`speechSynthesis`) je jen fallback: na každém zařízení zní jinak a na iPhonu záleží na tom, jaké české hlasy jsou stažené. Cílový stav:
1. Všechny pevné hlášky (zadání úkolů, pochvaly, čísla 1–10, písmena a slova z abecedy, jména zvířátek) předgenerovat kvalitním českým neurálním hlasem do souborů `audio/cs/<id>.mp3` jedním skriptem.
2. Ve hře přehrávat soubor podle id; když chybí, použít `say()`.
3. Dynamické věty skládat z hotových dílků (např. „Výborně!“ + jméno zvířátka), aby nebyl potřeba TTS.

Rozsah pro představu: v kódu je kolem 40 volání `say()`, 102 zvířátek, 10 čísel a abeceda se slovy.

Do té doby `say()` v `index.html` vybírá nejlepší dostupný český hlas (Zuzana, enhanced/premium před compact a eSpeak).

## SFX
- ui_tap 60–120 ms
- ui_back 100–180 ms
- drag_pick 80–140 ms
- puzzle_snap 120–220 ms
- correct_small 250–400 ms
- reward_star 400–700 ms
- unlock 600–900 ms
- transition 200–350 ms

Žádné agresivní transienty.

## Motion
Tap:
0 ms scale 1
70 ms scale .96
180 ms scale 1.02
260 ms scale 1

Card entrance: opacity 0→1 + translateY 12→0, cca 320 ms.

Screen transition: fade + subtle translate, cca 320–450 ms.

## Puzzle snap
Magnetický posun 140–200 ms, scale 1.04→0.98→1, soft snap, jedno halo. Bez confetti.

## Small success
3 malé hvězdy, radius 30–60 px, cca 500–700 ms.

## Big celebration
Pouze hotové puzzle/lekce/unlock:
1. pulse hlavního objektu
2. 5–7 hvězd
3. Lili celebrate
4. success chime
5. jedna voice hláška
6. reward card

Do cca 1.5 s musí jít pokračovat.

## Ambient
Na screenu současně max 2–3 významné ambient pohyby. Mrak 10–14 s, Lili blink nepravidelně, motýl jen občas. Žádné permanentní bounce a konstantní particles.

## Particle pravidla
3–7 hvězd, 8–18 px, radiální/obloukový směr, 550–850 ms. Nikdy gravity rain přes celý screen ani stovky částic.

## Reduced motion
Vypnout ambient loops a parallax; zachovat krátký opacity feedback a statický success.

## Akceptační test
Po 10 minutách nesmí být audio otravné. Nic se nehýbe jen proto, že může. Success je příjemný, ne chaotický. Žádný efekt nesmí působit jako prach/popel. Voice zní jako postava, ne jako technický TTS. Se ztlumeným zvukem nic nemluví.
