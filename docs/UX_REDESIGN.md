# A — UX redesign

## Cíl
Přestavět aplikaci z kolekce miniher na jeden kouzelný svět. Pro koho a s jakými pravidly: `STYLE_GUIDE.md` (Kdo hraje, Ochrana výuky).

## Home / kouzelný svět
Horní HUD obsahuje odměny a zvuk. Střed je ilustrovaná mapa s lokacemi. Místo rovnoměrného gridu jsou lokace záměrně různě velké a lehce posunuté, aby působily jako mapa.

Mapa potřebuje skutečné ilustrace lokací (viz `IMPLEMENTATION_PLAN.md` → Assety). Dokud nejsou, zůstávají karty a celý Home se musí vejít na jednu obrazovku bez scrollování, na výšku i na šířku.

Hlavní lokace:
- Duhová cesta — hlavní dobrodružství
- Puzzle louka
- Malířská dílna
- Číselná jeskyně
- Abecední les
- Hádanková stezka
- Pexesový háj

Lili je průvodkyně, ne tlačítko nebo dekorace blokující obsah.

## Výběr aktivit
Velké ilustrované dlaždice, minimum textu, jasný progres a obtížnost. Vstup karet jemným opacity + translateY, ne létání přes obrazovku.

## Puzzle
Herní plocha má mít 70–80 % screenu. Dílek při uchopení lehce vyroste, správná pozice magneticky docvakne a dostane jediný krátký halo efekt. Chyba nemá červenou ani trestající zvuk. Dílky musí být dobře vidět i na barevném pozadí.

Hint po 6–8 sekundách bez akce.

## Completion
0 ms poslední dílek
150 ms obrázek se sjednotí (bez švů mezi dílky)
300 ms zvířátko ožije
450 ms 5–7 hvězd od objektu
650 ms success chime
750 ms jedna krátká pochvala Lili
900 ms odměna
1200 ms aktivní CTA

Celá sekvence max cca 1.5 sekundy.

## Omalovánky
Obrázek zabírá maximum plochy. Spodní floating toolbar, velké barvy a jasně označený vybraný nástroj. Priorita: výplň, štětec, guma, undo; později sparkle brush a samolepky. Tlačítko ✓ Hotovo je vždy dobře vidět.

## Čísla
Každé číslo je mini scéna. Pořadí: slyším číslo → vidím počet → počítám → obtahuji → odměna.

Počítání nahlas po jednom předmětu je jádro lekce (viz `STYLE_GUIDE.md` → Ochrana výuky). Předměty k počítání jsou na obrazovce největší a nejvýraznější.

## Abeceda
Každé písmeno je mini scéna: velké písmeno + obrázek + hlas + jedna krátká interakce.

## Můj jednorožec / sbírka
Dlouhodobý důvod vracet se: doplňky, korunky, samolepky, obrázky a dekorace. Bez lootboxového dojmu.

## Navigace
Primární: Home, Back a jedna hlavní herní akce. Rodičovské nastavení držet mimo dětský flow.

## Jak poznáme, že redesign pomohl
Data už sbírá `analytics.js` (obrazovky, ťuknutí, postup v %, sezení). Před nasazením redesignu do main zapsat výchozí hodnoty a po 2–3 týdnech porovnat:
- **Návraty:** v kolika dnech v týdnu se na zařízení hraje.
- **Délka hraní:** průměrná délka sezení.
- **Dokončování:** jaký podíl rozehraných puzzle a lekcí čísel a abecedy dítě dokončí.
- **Nápověda:** jak často se v puzzle používá nápověda (hodně nápověd = moc těžké nebo nejasné).
- **Co se hraje:** podíl jednotlivých lokací a lokace, ze kterých dítě rychle odchází.

ID obrazovek a tlačítek neměnit, jinak se data před a po nedají porovnat.

## Pět největších změn
1. Menu → kouzelný svět.
2. Samostatné vizuály → jeden art direction.
3. Náhodné efekty → motion systém.
4. Minihry → progres a sbírka.
5. Technický TTS → skutečná persona Lili.
