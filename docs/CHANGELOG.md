# Changelog redesignu

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
