# Zvířátková dílna — Style Guide

> Source of truth pro UI, UX, ilustrace, voice, sound a motion.

## Produktová vize
Zvířátková dílna má působit jako prémiová dětská hra pro předškoláky, ne jako webová stránka s dětskými obrázky. Základ je kouzelný svět jednorožců a zvířátek, který dítě objevuje.

Cílový pocit:
- okamžitě pochopitelné ovládání,
- bohatý vizuál bez přeplácanosti,
- laskavý, pozitivní tón,
- kvalitní game feel,
- konzistentní styl napříč aktivitami.

## Design principy
### Méně UI, více světa
Domovská obrazovka není seznam tlačítek. Aktivity mají působit jako místa v jednom světě.

Preferovat velké ilustrované lokace, vizuální navigaci, minimum textu a velké dotykové plochy. Omezit klasické webové karty, malé ikony, technické rámečky a formulářový vzhled.

### Jedna hlavní akce
Dítě musí během vteřiny poznat co je hlavní, na co lze sáhnout, co má udělat a co se stalo.

### Měkkost a hloubka
Velké radiusy, měkké stíny, jemné gradienty a 2.5D vrstvení. Žádné ostré rohy, tvrdé stíny ani plochý webový vzhled.

## Vizuální směr
Pastel fantasy + soft 2.5D game UI. Kvalitou se inspirovat nejlepšími dětskými aplikacemi, ale zachovat vlastní svět.

### Paleta
- Pink #FF9FD1
- Lavender #C9A7FF
- Aqua #89E4D9
- Sky #A8D8FF
- Vanilla #FFF2B8
- Peach #FFD6B0
- Cream #FFF9F2
- Text #4A4358
- Gold #FFD86B
- Success #7FD6A3

Na jedné obrazovce držet maximálně dvě dominantní a dvě akcentní barvy. Nepoužívat čistou černou ani neonové odstíny.

## Typografie
Maximálně dvě font family. Nadpisy kulaté a výrazné, běžný text velmi čitelný. Dětské UI nesmí vyžadovat čtení dlouhých vět.

## Interakce
Primární tap target ideálně 60+ px. Pressed stav: krátké zmenšení cca 0.96 a spring návrat. Obyčejný tap nikdy nespouští particles.

## Hlavní svět
Domovská obrazovka je mapa světa. Lokace:
- Duhová cesta
- Puzzle louka
- Malířská dílna
- Číselná jeskyně
- Abecední les
- Hádanková stezka
- Pexesový háj
- později Pokladnice a Můj jednorožec

Každá lokace je ilustrovaný objekt, má maximálně jednu jemnou ambient animaci a vizuální progres.

## Maskot Lumi
Pracovní jméno průvodce: Lumi. Je laskavý, hravý, klidný a chytrý. Nikdy pisklavý, komický nebo přehnaně afektovaný. Stavy: neutral, happy, excited, thinking, encouraging, celebrating, sleepy.

## Voice
Zakázaný je komický vysoký pitch, robotický TTS jako finální řešení, dlouhé proslovy a stále stejná pochvala. Preferovaný je teplý přirozený hlas, střední pitch, klidnější tempo a krátké věty.

## Motion
Hierarchie:
1. ambient = pomalý a nenápadný,
2. interaction = rychlý a hmatový,
3. success = krátký a výrazný,
4. big reward = největší, ale čitelný.

Časy:
- tap 90–220 ms
- micro feedback 180–450 ms
- transition 300–550 ms
- celebration 700–1400 ms
- ambient 4–12 s

## Particles
Particles nejsou univerzální odměna. Správný efekt má 3–8 hvězd nebo jisker, vzniká u zdroje akce a mizí cca do 600–900 ms.

Nikdy nepoužívat:
- particle rain přes celý screen,
- desítky teček padajících dolů,
- efekt „popel“,
- konfety po každém tapu.

## Odměny
Hvězdičky, krystaly, jednorožci, samolepky, korunky, dekorace a části světa. Žádné FOMO, countdowny ani trestání.

## Dětské UX
- minimum textu,
- velké tap zóny,
- jasný Home/Back,
- chyba dítě netrestá,
- hint až po prodlevě,
- zvuk/voice lze vypnout,
- respektovat prefers-reduced-motion.

## Definition of Done
Nový screen je hotový jen pokud dítě chápe hlavní akci bez vysvětlování, UI odpovídá tomuto guide, tap má okamžitý feedback, animace mají smysl, screen nevypadá jako webový formulář a běží plynule na cílovém iPhonu.
