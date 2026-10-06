# Geometry Dash ish

Plattformspill inspirert av Geometry Dash, laget med HTML5 Canvas og JavaScript i 2022.

**Spill det:** [benjaminkoder.github.io/Spillsider/Canvasgamefreestyle](https://benjaminkoder.github.io/Spillsider/Canvasgamefreestyle/index.html)

## Kontroller

| Tast | Handling |
|---|---|
| `A` / `←` | Gå til venstre |
| `D` / `→` | Gå til høyre |
| `W` / `↑` | Hopp |

## Funksjoner

- 15 baner med økende vanskelighetsgrad. Neste bane låses opp når du fullfører en.
- Teller for forsøk, tid og rekord.
- Gullstjerne hvis banen klares raskt nok.
- Ledertavle i Firebase Firestore: tiden din lagres med navnet ditt, og listen sorteres på tid. Navnet huskes i nettleseren med `localStorage`.

## Filer

- `index.html` – startsiden
- `Canvasgame.html` / `Canvasgame.js` – menyen og banevalget
- `Level1.html`–`Level15.html` med tilhørende `.js` – én fil per bane, med fysikk, plattformer og kollisjonssjekk
- `Leaderboards.html` / `Leaderboards.js` – ledertavlen
- `Canvasgame.img/` og `Canvasgame.audio/` – grafikk og lyd
