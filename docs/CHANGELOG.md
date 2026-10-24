# Changelog redesignu

## 24. 10. 2026 — nová zvířátka a čísla (V4)
- Všech 50 obrázků k vybarvování je nakreslených znovu v jednom roztomilém stylu: kulaté tvary, velké oči s odlesky, tvářičky, fialové obrysy, sluníčko s obličejem. Stejně i 5 pozadí pro „Poskládej“ a 16 nálepek (srdíčko, hvězdička, sluníčko, mráček, kytička a muchomůrka mají obličej). Kresby jsou v `js/zd-art-v4.js`.
- Čísla jsou vidět: bílé kolečko s barevným okrajem a tučným číslem místo šedého čísílka. Velikost podle místa, kolečka se nepřekrývají a jejich střed je vždy ťuknutí do správného políčka (ověřeno na všech 50 obrázcích).
- Vybraná barva: kolečka se vyplní a pulzují, políčka té barvy se jemně podbarví. Po 9 s bez ťuknutí přijde silnější nápověda. Ťuknutí vedle: kolečko se zatřese, správná barva dole povyskočí a zazní „Tohle je číslo 4.“
- Tlačítka barev jsou větší (62 px, na tabletu 76 px), s kroužkem postupu a fajfkou u hotové barvy. Místo „Zbývá políček“ je proužek postupu „3 z 12“ a hvězdička.
- Bílá místa nemají číslo, drobné detaily se vybarví samy.
- Obrázek leží na čtvercové kartě bez prázdného místa. Na šířku a na tabletu je obrázek vlevo a barvy vpravo (dřív byl na šířku obrázek maličký).
- Výběr obrázků: náhledy jsou bledé, ale plné (dřív průhledné, prosvítaly překrývající se části). Hotové obrázky jsou v plných barvách s hvězdičkou.
- Rozpracované vybarvení starých kreseb nejde na nové obrázky přenést, proto se jednou smaže. Hvězdičky za hotové obrázky zůstávají.

## 23. 10. 2026 — barevná Malířská dílna
- Výběr omalovánek ukazuje u nevybarvených obrázků jemný náhled barev (poloprůhledně), takže polička vypadá jako barevná knížka, ne jako hromada prázdných obrysů. Co dítě samo vybarvilo, je vidět v plné síle; hotové obrázky „Podle čísel“ mají ⭐.
- Barvy náhledu počítá stejná funkce jako vybarvování podle čísel (`planColours`), jen bez náročného měření ploch. Rychlé (zlomek ms na obrázek), náhledy se dobarvují postupně. Plány „Podle čísel“ zůstaly beze změny (ověřeno na všech 50 obrázcích).
- Noční nebe má tmavou oblohu, Moře modrou vodu.
- Pokyn „Vyber číslo dole a ťukej na políčka se stejným číslem.“ teď i zazní při otevření obrázku podle čísel; u scén „Vyber nálepku a polep obrázek.“

## 23. 10. 2026 — hlas, design pass, příprava na ilustrace
- Hlas: tempo a výška podle typu hlášky. Pokyny klidně, pochvaly („…!“) živěji, otázky zvídavě, jednotlivá slova (čísla, písmena, zvířátka) pomaleji a zřetelně. Emoji se nikdy nečtou nahlas. Na iPhonu web smí jen základní hlas Zuzana, výrazně lepší hlas by znamenal předgenerované nahrávky (AUDIO_MOTION_GUIDE → Produkce hlasu).
- Čísla: předměty k počítání jsou hlavní obsah obrazovky. Do pěti v jedné řadě až 96 px, víc ve dvou vyvážených řadách (7 = 4 + 3). Původní třída `.num-row` je omezovala na 6,5em, proto byly drobné. Lili s bublinou stojí nad nimi.
- Abeceda: větší písmeno i obrázek.
- Puzzle: volné dílky mají zase bílý okraj, takže jsou vidět i na pozadí stejné barvy.
- Výběrové obrazovky: zmizela prázdná bílá bublina vpravo nahoře.
- Ilustrace: napojení `js/world-art.js` + `css/world-art.css` a prázdný `img/world/manifest.json`. Prompty pro Midjourney/Flux jsou v `ILLUSTRACE.md`.

## 23. 10. 2026 — opravy po review
- Pryč je doslovný text `\n` v `index.html`. Byl vidět nahoře na každé obrazovce a posouval obsah dolů.
- Omalovánky: zelené ✓ Hotovo je zase vidět. Bílý styl tlačítek v horní liště už nepřebíjí barevná tlačítka.
- Vybraná volba v segmentech (obtížnost, režim puzzle, omalovánek, abecedy, pexesa) je zase výrazná. Bílá ikona na bílém pozadí zmizela.
- Ztlumení zvuku platí i pro maskota na úvodní obrazovce. Dřív při vypnutém zvuku promluvil.
- Čísla: Lili zase počítá nahlas každý předmět („jedna, dva, tři…“) v tempu, kdy se hlášky neusekávají. Bublina ukazuje přesně to, co Lili říká. V první verzi V3 se u čísel 4–10 nepočítalo nahlas a u 1–3 se hlášky usekávaly.
- Abeceda: místo věty „Ťukni a poslechni si další slovo“ je ikona 🔊.
- Puzzle: složený obrázek už nemá švy, umístěné dílky nemají stín.
- Úvod na šířku: vejde se bez scrollování, nadpis se nepřekrývá s kartami, stisk karty už neposkočí.
- Úvod na výšku na menších iPhonech (SE, mini): vejde se bez scrollování. Na nízkých displejích se schovají podnadpisy karet, ty jsou stejně jen pro rodiče.
- Měkčí zvuky a lepší výběr českého hlasu jsou přímo v `index.html`. Přepisy v `js/redesign-v2.js` se kvůli uzavřenému skriptu hry nikdy neprojevily. Vrstva teď se hrou mluví přes `window.ZD`.
- Stisknutý stav karet se uvolní i po puštění prstu mimo kartu.
- Maskot zůstává Lili místo pracovního „Lumi“, dokumenty jsou sjednocené.
- Dokumenty: doplněno Kdo hraje, Ochrana výuky, Produkce hlasu, Assety, Architektura vrstvy, měření úspěchu a pravdivý stav v plánu.

## 23. 10. 2026 — V3 art-direction correction
Po vizuální kontrole bylo zjištěno, že samotný CSS polish stále působil příliš jako webová aplikace. V3 proto mění i kompozici obsahu.

- Čísla: nová story-scene kompozice místo velké prázdné plochy
- Čísla: vlastní vektorový maskot přímo v lekci (Lili, v původním zápisu „Lumi“)
- Čísla: magický number crystal + samostatná counting zóna
- Čísla: odstraněné emoji dekorace slunce/květin z pozadí
- Čísla: nové prostředí pro meadow/garden/farm/sea/sky/night/city/fairy
- Abeceda: nový storybook layout místo stacku písmeno + emoji + text
- Abeceda: maskot jako součást kompozice
- Puzzle picker: používá lokální SVG zvířat před raw emoji fallbackem
- odstraněn globální particle efekt po každém pointerdown
- snížené legacy sparkles v omalovánkách, hádankách, pexesu, Duhové cestě a tracingu

Hlavní pravidlo V3: **nepřebarvovat starý layout, ale měnit kompozici obrazovky tam, kde stále působí webově.**

## 23. 10. 2026 — full-app visual pass
Druhá iterace sjednocuje všechny hlavní části hry do stejného vizuálního světa:

- Puzzle picker — nové herní karty a louka
- Puzzle — hlubší herní plocha, čistší dílky a hinty
- Extra puzzle hra — sjednocený stage
- Omalovánky picker — nové ilustrativní karty
- Omalovánky — papírový stage + floating nástroje a paleta
- Čísla — Číselná jeskyně, nové karty i herní stage
- Abeceda — Abecední les, nové písmenkové karty a tracing
- Hádanky — Hádanková stezka, nové volby a odpovědi
- Pexeso — Pexesový háj, nové karty a flip vzhled
- Duhová cesta — nové world cards, level tiles a herní frame
- Win/reward modal — kompletní redesign
- Jednotný topbar, filtry, segmenty, progress a tap feedback
- Screen transitions
- Landscape a small-phone polish (na šířku se úvod nevešel, opraveno 23. 10.)

## 23. 10. 2026 — první redesign iterace
- branch redesign-v2
- dokumentace a README odkazy
- základ design tokenů
- nový world-map vizuální směr Home
- sjednocený tap feedback
- odstraněný starý full-screen 170-particle confetti shower
- nový lokální reward burst 5–7 hvězd
- kultivovanější český browser voice fallback (neprojevil se, opraveno 23. 10.)
- voice bank + cooldown pro pochvaly (připravená, hry ji zatím nepoužívají)
- interakce maskota na Home
- reduced-motion respektován v redesign vrstvě
- puzzle: nápověda po nečinnosti a zazáření místo třesení
- měkčí zvuky puzzle a dokončení (neprojevily se, opraveno 23. 10.)
