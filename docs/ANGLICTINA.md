# E — Angličtina (Anglický ostrov)

## Cíl
První anglická slovíčka pro předškoláky, kteří ještě nečtou. Dítě slovo slyší, vidí obrázek a hraje si s ním. Nic nepíše, nic nečte a nic se nehodnotí známkou.

## Postavy a hlasy
- **Papoušek Polly** mluví jen anglicky. Dítě pozná „teď je to anglicky“ podle toho, kdo mluví, ne podle textu. Papoušek se hodí, protože opakuje slova. Obrázek je zatím Fluent `img/1f99c.svg`, později kresba v kawaii stylu jako kamarádi z Duhové cesty.
- **Lili** dává česky pokyny a v seznámení řekne české slovo („Kočička.“), Polly hned potom anglické („Cat!“).
- **Opička** v jídle mluví stejným anglickým hlasem, jen o kousek výš.
- Výslovnost je britská a všude stejná. Hlas vybírá `englishVoice()` stejně jako v Maruščině apce: britský před ostatními, přirozené hlasy před robotickými, nikdy Apple „vtipné“ hlasy.
- Lili a Polly se střídají přes `talk()`: další věta začne, až ta předchozí dozní. Nová hláška tu starou ukončí. Se ztlumeným zvukem nemluví nikdo a hra jde dál ve stejném tempu.

## Screen flow
1. **Home** – široká dlaždice dole na mapě: Anglický ostrov (moře, palma, Polly s bublinou Hello). Štítek Nové! do první návštěvy, potom „Umíš 2 z 4 témat“.
2. **Anglický ostrov** (`#english`, rozcestník) – Polly pozdraví Hello!, při první návštěvě ji Lili česky představí. Témata jsou velké obrázkové dlaždice, hotová mají hvězdu. Při odchodu Polly řekne Bye-bye!
3. **Lekce tématu** – 4 kroky (tečky nahoře), asi 3 minuty:
   1. **Seznámení** – slovíčka po jednom: obrázek → Lili česky → Polly anglicky. Na konci šipka „Jdeme hrát“. Ťuknutí na obrázek nebo miniaturu slovo zopakuje.
   2. **Poslouchej a ťukni** – Polly: „Where's the cat?“ Každé slovo jednou, první dvě kola 2 obrázky, pak 4.
   3. **Hra tématu** – pro každé téma jiná (níže).
   4. **Pexeso se slovíčky** – 3 dvojice, každá otočená karta řekne své slovo.
4. **Odměna** – Polly „Well done!“, Lili „Hurá! Umíš anglicky zvířátka!“, hvězda na téma. Tlačítka Další téma, Ještě jednou, Vybrat téma.

## Témata (MVP)
| Téma | Slovíčka | Hra tématu |
|---|---|---|
| Zvířátka | cat, dog, cow, pig, duck, sheep | **Who says moo?** – anglická zvířata dělají jinak (woof, oink, quack, baa) |
| Barvy | red, blue, yellow, green, pink, purple | **Paint it red!** – ťuknout na barvu, balónek / srdíčko / hvězdička / kytička se přebarví |
| Čísla 1–5 | one … five | **Počítej s Polly** – hvězdičky se objeví a Polly je napočítá, pak „Tap three apples!“ a každé ťuknutí se nahlas napočítá |
| Jídlo | apple, banana, strawberry, carrot, cake, ice cream | **Nakrm opičku** – „Banana, please!“ → podat banán → „Yum! Thank you!“ |

Data jsou v `index.html` v `EN_TOPICS` (obrázek, anglicky, česky, u zvířátek zvuk). Nové téma = nový záznam + jeho hra tématu (nebo opakování „Poslouchej a ťukni“).

## Pravidla výuky
- Každé anglické slovo vždy zazní. Text na obrazovce je pro rodiče.
- Význam nese obrázek, dítě nic nečte ani nepíše.
- Čeština jen na pokyny a jednou v seznámení, hry jsou anglicky.
- Chyba netrestá: karta zavrtí „ne-ne“, Polly slovo zopakuje, po dvou chybách správná karta zazáří.
- Počítání jako v Číslech: každý předmět se objeví a nahlas napočítá, tempo asi 0,85 s.
- 6 slovíček na téma (čísla 5), každé zazní v lekci mnohokrát.

## Ukládání a statistiky
- `zd-en` – hotová témata (hvězdy), `zd-en-met` – Polly už se představila.
- Obrazovka `english`, v `analytics.js` postup `anglictina` (počet hotových témat z `EN_TOPICS.length`).

## Soubory
- logika a data: `index.html`, sekce ANGLIČTINA
- vzhled: `css/english.css` (karty ve stylu Hádanek V5, Home dlaždice, na šířku vedle sebe)
- obrázky: `img/` (Fluent Emoji): zvířátka, jídlo, opička 🐒, papoušek 🦜

## Další kolo (zatím ne)
- Témata: Hračky, Tělo (Touch the nose! na medvídkovi), Čísla 6–10, Oblečení (obleč medvídka), Doprava, Počasí, Pozdravy.
- Opakování: mix slovíček z hotových témat, víc těch, která šla hůř (zobrazit až po 2 tématech).
- Hřiště: Bublinky, Polly říká (pohybové pokyny), Papoušek opakuje (dítě řekne slovo a papoušek ho zopakuje jeho hlasem, nic se nehodnotí, chce mikrofon), Písničky, Hledačka ve scéně.
- Pro rodiče (za podržením): přízvuk, čeština ano/ne, co už dítě umí.
- Předgenerované nahrávky `audio/en/<id>.mp3` neurálním britským hlasem (AUDIO_MOTION_GUIDE → Produkce hlasu). U angličtiny je výslovnost přímo to, co se dítě učí, takže tady se to vyplatí nejdřív.
- Polly nakreslená v kawaii stylu a ilustrace `tile-english` / `bg-english` (ILLUSTRACE.md).
- Nálepka do sbírky Můj jednorožec, až bude sbírka.
