/* let tittelEl = document.querySelector("#tittel");
console.log(tittelEl.value);

let beskrivelseEl = document.querySelector("#beskrivelse");
console.log(beskrivelseEl.value);

let selectEl = document.querySelector("#aldersgrense");
console.log(selectEl.value); */

/* let tall1El=document.querySelector("#tall1");
let tall2El=document.querySelector("#tall2");
let knappEl=document.querySelector("button");
let resultatEl=document.querySelector("#resultat");

knappEl.addEventListener("click", beregn);

function beregn() {
    let tall1=tall1El.value;
    let tall2=tall2El.value;
    let sum=tall1+tall2;

    resultatEl.innerHTML="Summen blir "+sum;
}    
 */


// Henter elementer
let tall1El = document.querySelector("#tall1");
let tall2El = document.querySelector("#tall2");
let knappEl = document.querySelector("#knapp");
let sumEl = document.querySelector("#sum");
let subtraksjonEl = document.querySelector("#subtraksjon");
let multiplikasjonEl = document.querySelector("#multiplikasjon");
let divisjonEl = document.querySelector("#divisjon");


// Legger til lytter på knappen
knappEl.addEventListener("click", beregnsum);
knappEl.addEventListener("click", beregnsubtraksjon);
knappEl.addEventListener("click", beregnmultiplikasjon);
knappEl.addEventListener("click", beregndivisjon);


// Funksjon som beregner og skriver ut summen på nettsiden
function beregnsum() {
  let tall1 = Number(tall1El.value);
  let tall2 = Number(tall2El.value);
  let sum = tall1 + tall2;

  sumEl.innerHTML = "Summen blir " + sum.toFixed(2);
}
function beregnsubtraksjon() {
  let tall1 = Number(tall1El.value);
  let tall2 = Number(tall2El.value);
  let sum = tall1 - tall2;

  subtraksjonEl.innerHTML = "Subtraksjonen blir " + sum.toFixed(2);
}
function beregnmultiplikasjon() {
  let tall1 = Number(tall1El.value);
  let tall2 = Number(tall2El.value);
  let sum = tall1 * tall2;
  
  multiplikasjonEl.innerHTML = "Produktet blir " + sum.toFixed(2);
}
function beregndivisjon() {
  let tall1 = Number(tall1El.value);
  let tall2 = Number(tall2El.value);
  let sum = tall1 / tall2;

  divisjonEl.innerHTML = "Divisjonen blir " + sum.toFixed(2);
}
