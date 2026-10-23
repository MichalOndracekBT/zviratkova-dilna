# A — UX redesign

## Cíl
Přestavět aplikaci z kolekce miniher na jeden kouzelný svět.

## Home / kouzelný svět
Horní HUD obsahuje odměny a zvuk. Střed je ilustrovaná mapa s lokacemi. Místo rovnoměrného gridu jsou lokace záměrně různě velké a lehce posunuté, aby působily jako mapa.

Hlavní lokace:
- Duhová cesta — hlavní dobrodružství
- Puzzle louka
- Malířská dílna
- Číselná jeskyně
- Abecední les
- Hádanková stezka
- Pexesový háj

Lumi je průvodce, ne tlačítko nebo dekorace blokující obsah.

## Výběr aktivit
Velké ilustrované dlaždice, minimum textu, jasný progres a obtížnost. Vstup karet jemným opacity + translateY, ne létání přes obrazovku.

## Puzzle
Herní plocha má mít 70–80 % screenu. Dílek při uchopení lehce vyroste, správná pozice magneticky docvakne a dostane jediný krátký halo efekt. Chyba nemá červenou ani trestající zvuk.

Hint po 6–8 sekundách bez akce.

## Completion
0 ms poslední dílek
150 ms obrázek se sjednotí
300 ms zvířátko ožije
450 ms 5–7 hvězd od objektu
650 ms success chime
750 ms jedna krátká pochvala Lumi
900 ms odměna
1200 ms aktivní CTA

Celá sekvence max cca 1.5 sekundy.

## Omalovánky
Obrázek zabírá maximum plochy. Spodní floating toolbar, velké barvy a jasně označený vybraný nástroj. Priorita: výplň, štětec, guma, undo; později sparkle brush a samolepky.

## Čísla
Každé číslo je mini scéna. Pořadí: slyším číslo → vidím počet → počítám → obtahuji → odměna.

## Abeceda
Každé písmeno je mini scéna: velké písmeno + obrázek + hlas + jedna krátká interakce.

## Můj jednorožec / sbírka
Dlouhodobý důvod vracet se: doplňky, korunky, samolepky, obrázky a dekorace. Bez lootboxového dojmu.

## Navigace
Primární: Home, Back a jedna hlavní herní akce. Rodičovské nastavení držet mimo dětský flow.

## Pět největších změn
1. Menu → kouzelný svět.
2. Samostatné vizuály → jeden art direction.
3. Náhodné efekty → motion systém.
4. Minihry → progres a sbírka.
5. Technický TTS → skutečná persona Lumi.
