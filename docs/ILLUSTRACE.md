# D — Ilustrace světa (Midjourney / Flux)

Hra je na ilustrace připravená: co v `img/world/` existuje a je zapsané v `img/world/manifest.json`, to se ukáže. Co chybí, zůstává jako dnes. Dá se tedy začít jedním obrázkem.

## Co vyrobit (14 obrázků)

| Soubor | Kde se ukáže | Poměr stran |
|---|---|---|
| `tile-road` | karta Duhová cesta na úvodu (široká) | 2:1 |
| `tile-puzzle` | karta Puzzle louka | 3:2 |
| `tile-color` | karta Malířská dílna | 3:2 |
| `tile-count` | karta Číselná jeskyně | 3:2 |
| `tile-abc` | karta Abecední les | 3:2 |
| `tile-logic` | karta Hádanková stezka | 3:2 |
| `tile-memo` | karta Pexesový háj | 3:2 |
| `bg-road` … `bg-memo` | pozadí herních obrazovek dané lokace (7×) | 9:16 |

Karta: hlavní motiv uprostřed, kolem volné místo. Na šířku se z karty ukáže jen pruh přes střed a ve spodní části leží název.
Pozadí: střed klidný a skoro prázdný (tam je hra), detaily jen dole a trochu v horních rozích. Na šířku se ukazuje spodní část.

Lili do obrázků nepatří. Zůstává nakreslená v kódu, aby vypadala všude stejně.

## Jak docílit jednotného stylu
1. Začni kartou **Puzzle louka**. Vygeneruj pár variant a vyber tu, která nejvíc ladí s hrou: pastelová, měkká, „plastelínová“.
2. **Midjourney:** zkopíruj adresu vybraného obrázku a ke všem dalším promptům přidej `--sref <adresa> --sw 200`.
   **Flux (FLUX.2 v playground.bfl.ai):** vybraný obrázek přidej k dalším jako referenční a do promptu připiš `in the exact style of the reference image`.
3. Teprve potom generuj zbytek. U jeskyně a lesa hlídej písmena a čísla: pokud vyjdou pokřiveně, vygeneruj znovu, nebo je z promptu vyhoď.

## Stylový základ
Patří na začátek každého promptu (anglicky, nástroje mu rozumí nejlépe):

```
Cute storybook illustration for a preschool children's game, soft 3D clay style, rounded chunky shapes, pastel fantasy world, gentle diffused lighting, soft ambient occlusion, matte surfaces, calm and friendly mood, pastel color palette of soft pink (#FF9FD1), lavender (#C9A7FF), mint aqua (#89E4D9), baby blue (#A8D8FF), vanilla yellow (#FFF2B8), peach (#FFD6B0) and cream (#FFF9F2), no black outlines, no harsh shadows, not photorealistic
```

## Karty na úvod
Za každý řádek níže doplň stylový základ před něj. Parametry na konci jsou pro Midjourney, ve Fluxu je vynech a poměr stran nastav v nabídce.

**tile-road — Duhová cesta**
```
a winding rainbow-colored path across soft rolling green hills, leading to a small pastel castle on a fluffy cloud in the distance, a tiny lost kitten waiting by the path, wildflowers, the path is the hero of the picture, wide panoramic view --ar 2:1 --s 150 --no text, letters, numbers, people, logo, watermark, dark
```

**tile-puzzle — Puzzle louka**
```
a sunny flower meadow where the grass is made of giant soft jigsaw puzzle pieces fitting together, one piece lifted up slightly, a small fluffy bunny sitting on it, daisies and butterflies, subject centered with breathing room around --ar 3:2 --s 150 --no text, letters, numbers, people, logo, watermark, dark
```

**tile-color — Malířská dílna**
```
a cozy little round painting workshop inside a hollow tree stump, a small easel with a colorful half-painted rainbow, paint pots, brushes in a jar, soft pastel paint splashes, subject centered with breathing room around --ar 3:2 --s 150 --no text, letters, numbers, people, logo, watermark, dark
```

**tile-count — Číselná jeskyně**
```
the entrance of a friendly cave glowing with pastel crystals in pink, lavender and aqua, three round stepping stones engraved with the numbers 1, 2 and 3, tiny glowing fireflies, warm light inside, magical but not dark, subject centered with breathing room around --ar 3:2 --s 150 --no text, words, people, logo, watermark
```

**tile-abc — Abecední les**
```
a whimsical forest clearing with round lollipop-shaped pastel trees, three big wooden toy blocks with the letters A, B and C, little mushrooms and a winding path, soft sunbeams, subject centered with breathing room around --ar 3:2 --s 150 --no words, people, logo, watermark, dark
```

**tile-logic — Hádanková stezka**
```
a playful winding path of round stepping stones through a garden, wooden signposts with big question marks, a curious little owl sitting on one signpost, colorful flowers, subject centered with breathing room around --ar 3:2 --s 150 --no text, letters, numbers, people, logo, watermark, dark
```

**tile-memo — Pexesový háj**
```
a small magical grove of round trees with pairs of identical fruits hanging from the branches (two apples, two pears, two cherries), a few rounded picture cards lying face down on soft moss, dappled light, subject centered with breathing room around --ar 3:2 --s 150 --no text, letters, numbers, people, logo, watermark, dark
```

## Pozadí herních obrazovek
Ke každému řádku přidej stylový základ a tenhle dovětek:

```
vertical background for a mobile game screen, very calm and simple, a large empty soft-gradient area in the middle for game content, details only along the bottom edge and lightly in the top corners, low contrast, light airy tones, no characters
```

**bg-road**
```
a rainbow path winding along the bottom over gentle green hills, a tiny pastel castle on a cloud near a top corner, soft sky --ar 9:16 --s 100 --no text, letters, numbers, people, animals, logo, watermark, dark
```

**bg-puzzle**
```
a flower meadow with jigsaw-puzzle-shaped grass patches along the bottom, a few daisies, pale blue sky --ar 9:16 --s 100 --no text, letters, numbers, people, animals, logo, watermark, dark
```

**bg-color**
```
a soft cream studio wall with pastel paint splashes and drips along the bottom edge, the corner of an easel at the bottom left, paint brushes in a jar at the bottom right --ar 9:16 --s 100 --no text, letters, numbers, people, animals, logo, watermark, dark
```

**bg-count**
```
inside a friendly crystal cave, soft lavender cave walls fading into a light misty center, glowing pastel crystal clusters along the bottom and in the top corners --ar 9:16 --s 100 --no text, letters, numbers, people, animals, logo, watermark
```

**bg-abc**
```
a forest edge along the bottom with round lollipop-shaped pastel trees and mushrooms, soft sunbeams from the top, pale green and cream sky --ar 9:16 --s 100 --no text, letters, numbers, people, animals, logo, watermark, dark
```

**bg-logic**
```
a winding stepping-stone path and small wooden signposts along the bottom, flowers, pale lavender sky with soft clouds --ar 9:16 --s 100 --no text, letters, numbers, people, animals, logo, watermark, dark
```

**bg-memo**
```
a grove of round pastel trees along the bottom with pairs of identical fruits, pale pink and lavender sky --ar 9:16 --s 100 --no text, letters, numbers, people, animals, logo, watermark, dark
```

## Kontrola před odesláním
- všech 14 obrázků vypadá jako jedna sada (barvy, světlo, materiál)
- žádný text navíc, písmena a čísla jen tam, kde mají být, a čitelná
- žádné postavy, které připomínají známé pohádky, filmy nebo značky
- karta: motiv uprostřed, nic důležitého u okrajů
- pozadí: střed klidný a světlý, nic tmavého

## Jak je dostat do hry
Nejjednodušší: pošli obrázky do chatu Claudovi (PNG nebo JPG, plné rozlišení, pojmenované podle tabulky). Claude je zmenší, převede do WebP, nahraje do `img/world/` a zapíše do `manifest.json`.

Technicky (kdyby to dělal kdokoli jiný):
- karty: WebP 1200 × 800 (Duhová cesta 1600 × 800), kvalita cca 80, do 150 kB
- pozadí: WebP 1080 × 1920, kvalita cca 78, do 250 kB
- `img/world/manifest.json`: klíče hotových obrázků do `tiles` a `backgrounds` (např. `"tiles": ["puzzle", "count"]`). Při výměně obrázků zvýšit `"v"`, aby si iPhone nenechal starou verzi.
