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

## Kdo hraje
Předškoláci (zhruba 3–6 let), kteří většinou ještě nečtou. Hrají na iPhonu, často krátce a s rodičem poblíž. Z toho plynou pevná pravidla:
- **Každá instrukce pro dítě musí zaznít hlasem.** Text na obrazovce je jen doplněk pro rodiče, nikdy jediný nosič informace.
- Místo vět ikony a obrázky (např. 🔊 místo „Ťukni a poslechni si…“).
- Co je v bublině maskota, je přesně to, co maskot říká.
- Nový text do UI přidávat jen tehdy, když ho dítě nepotřebuje ke hraní.

## Ochrana výuky
Redesign mění vzhled, ne způsob, jak se dítě učí. Změna výukové mechaniky potřebuje výslovné rozhodnutí a zápis do `CHANGELOG.md` s důvodem.

Chráněné mechaniky:
- **Čísla:** každý předmět se objeví a nahlas se napočítá („jedna, dva, tři…“), tempo cca 0,8 s na předmět, na konci „Číslo X!“. Předměty k počítání jsou hlavní obsah obrazovky, ne dekorace v rohu.
- **Abeceda:** ťuknutí přehraje písmeno i slovo. Písmeno a obrázek jsou největší prvky karty.
- **Obtahování:** pořadí a směr tahů zůstávají.
- **Puzzle:** silueta a nápověda pomáhají, ale nikdy nevyřeší úkol za dítě.
- **Hlas se nepřekrývá:** každá nová hláška ukončí předchozí, proto počítání ani zadání úkolu nesmí přerušit jiná hláška. U sekvencí nechat hlasu čas doznít.

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

Pastel nesmí sníst kontrast: vybraný stav a akční tlačítka (✓ Hotovo, Další) musí být barevně výrazné, ikona na nich vždy vidět.

## Obrázky a čísla
Omalovánky (50 obrázků), pozadí pro „Poskládej“ a nálepky jsou vektorové kresby v `js/zd-art-v4.js`.

### Styl kreseb
- Roztomilý (kawaii) styl: kulaté tvary, velká hlava, malé tělíčko, krátké packy.
- Oči: tmavý ovál se dvěma bílými odlesky. K tomu růžové tvářičky a malá pusinka.
- Obrys tmavě fialový (`--ink` #3A2A5C), nikdy černý. Detaily (pusinky, vousky, proužky) tenčí čarou.
- Každý obrázek má prostředí: nebe, tráva nebo voda, sluníčko s obličejem, mráček, kytičky.
- Zvířátko zabírá většinu obrázku a stojí na zemi, ne ve vzduchu.

### Pravidla pro „Podle čísel“
- Každá oblast má cílovou barvu (`data-nc`). Na obrázek nejvýš 7 barev, duhové obrázky 11.
- Bílá oblast nemá číslo. Vybarvovat bílou na bílém nic neukáže.
- Oblast užší než kolečko s číslem nemá číslo a vybarví se sama, jakmile je hotová její barva. Detail v barvě, kterou žádné číslo nepoužívá (čumáček, vnitřek ouška), je vybarvený od začátku.
- Oči, tvářičky a pusinky nejsou oblasti. Nevybarvují se a čísla se jim vyhýbají.
- Číslo: bílé kolečko s okrajem v tmavším odstínu cílové barvy a tučné číslo. Na tmavé barvě je číslo bílé.
- Velikost kolečka podle místa v oblasti, poloměr 11 až 17 jednotek obrázku (obrázek má 400). Dvě kolečka vedle sebe se zmenší, ale nikdy nepřekryjí. Střed kolečka je vždy bezpečné ťuknutí do správné oblasti.
- Vybraná barva: její kolečka se vyplní barvou a pulzují, nevybarvená políčka se jemně podbarví.
- Po 9 s bez ťuknutí se políčka vybrané barvy podbarví víc a ostatní čísla zbledou.
- Ťuknutí vedle: kolečko se zatřese, správné tlačítko dole povyskočí a hlas řekne „Tohle je číslo 4.“ (nejvýš jednou za 2,5 s).
- Tlačítka barev: 62 px (tablet 76 px), číslo uvnitř, kroužek kolem ukazuje, kolik té barvy je hotovo, hotová barva má fajfku. Do 4 barev jedna řada, do 8 dvě řady.
- Obrázek leží na čtvercové kartě, bez prázdného místa nad a pod. Na šířku (telefon, tablet, počítač) je obrázek vlevo a barvy vpravo.

### Výběr obrázků
- Nevybarvený obrázek: bledý, ale plný náhled jeho barev (nic neprosvítá).
- Co dítě vybarvilo, je vidět tak, jak to vybarvilo.
- Hotový obrázek „Podle čísel“ má hvězdičku a je v plných barvách.
- Uložené vybarvení patří ke konkrétní kresbě. Překreslený obrázek má číslo verze (`v`) a ukládá se pod novým klíčem (`zd-c4-…`). Hvězdičky (`zd-ndone`) zůstávají.

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

Každá lokace je ilustrovaný objekt, má maximálně jednu jemnou ambient animaci a vizuální progres. Název lokace musí nést i obraz: Číselná jeskyně má vypadat jako jeskyně. Dokud ilustrace nejsou, jsou názvy pracovní.

## Maskot Lili
Průvodkyní je jednorožčice **Lili**, kterou hra už má (úvodní obrazovka, Duhová cesta, lekce čísel a abecedy, v kódu `liliSvg()`). Děti ji znají, proto se nepřejmenovává. Pracovní jméno „Lumi“ z první verze dokumentů se nepoužívá.

Je laskavá, hravá, klidná a chytrá. Nikdy pisklavá, komická nebo přehnaně afektovaná. Stavy: neutral, happy, excited, thinking, encouraging, celebrating, sleepy.

## Voice
Zakázaný je komický vysoký pitch, robotický TTS jako finální řešení, dlouhé proslovy a stále stejná pochvala. Preferovaný je teplý přirozený hlas, střední pitch, klidnější tempo a krátké věty. Detaily a produkce hlasu: `AUDIO_MOTION_GUIDE.md`.

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
- minimum textu, každá instrukce zazní hlasem,
- velké tap zóny,
- jasný Home/Back,
- vybraný stav (nástroj, obtížnost, režim) je vidět na první pohled,
- chyba dítě netrestá,
- hint až po prodlevě,
- zvuk/voice lze vypnout a ztlumení platí pro všechny zvuky i hlas,
- respektovat prefers-reduced-motion.

## Definition of Done
Nový screen je hotový, jen když:
- dítě chápe hlavní akci bez vysvětlování a bez čtení,
- všechny instrukce zazní hlasem a nic důležitého se neusekne,
- výuková mechanika odpovídá sekci Ochrana výuky,
- UI odpovídá tomuto guide a nevypadá jako webový formulář,
- tap má okamžitý feedback a animace mají smysl,
- vybraný stav je jasně vidět a akční tlačítka mají kontrast,
- se ztlumeným zvukem nic nemluví a s reduced motion se nic zbytečně nehýbe,
- vejde se na výšku i na šířku na cílovém iPhonu i na menším (iPhone SE) a běží plynule,
- je vyzkoušený na skutečném iPhonu, ideálně s dítětem, ne jen v prohlížeči na počítači.
