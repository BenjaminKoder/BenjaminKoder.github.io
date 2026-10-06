# Lykkehjul med database

Lykkehjul der du spinner for penger, laget i JavaScript med Firebase Firestore som database i 2022.

**Prøv det:** [benjaminkoder.github.io/Spillsider/SpinnerTob/saannBenjiVil](https://benjaminkoder.github.io/Spillsider/SpinnerTob/saannBenjiVil/index.html)

## Slik virker det

- Skriv inn et brukernavn. Penger, spins og oppgraderinger lagres på brukeren i Firestore, så du kan fortsette senere.
- Spinn hjulet for å vinne penger. Treffer du bomben, mister du alt.
- Bruk pengene på flere spins eller på å oppgradere hvor lang tid hvert spin tar.
- Ledertavlen viser spillerne med mest penger.

## Filer

- `index.html` – oppsettet
- `script.js` – spillogikken og koblingen til Firestore
- `style.css` – utseendet
- `Images/` – grafikk

En enklere versjon uten database ligger i [Spillsider/SpinnerTycoon](../../SpinnerTycoon).
