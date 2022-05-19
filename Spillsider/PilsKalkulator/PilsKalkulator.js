let sumPilsEl = document.querySelector("#outline2");
let randomDrinkControl = 0;
let randomDrink;
let drikkeEnhetCounter = 5;

let plussDrikkeBtn = document.querySelector("#plussDrikke");
plussDrikkeBtn.addEventListener("click", plussDrikke);
let nullstillBtn = document.querySelector("#nullstill");
nullstillBtn.addEventListener("click", refresh);

let drikkeEnheterEl = document.querySelector("#drikkeEnheter");



function plussDrikke() {
    let randomDrink = Math.floor(Math.random()*17+1);
    while (randomDrinkControl==randomDrink) {
        randomDrink = Math.floor(Math.random()*17+1);
    }
        drikkeEnheterEl.innerHTML += `<div class='drikkeenhet'>
    <img src='./Bilder/Drikke${randomDrink}.png' alt='drikke' class='drikkebilde'>
    <div>
        <label for='antall${drikkeEnhetCounter}'>Antall (stk)</label>
        <input id='antall${drikkeEnhetCounter}' type='number' placeholder='0' min='0'>
    </div>
    <div>
        <label for='mengde${drikkeEnhetCounter}'>Mengde (dl)</label>
        <input id='mengde${drikkeEnhetCounter}' type='number' placeholder='0' min='0'>
    </div>
    <div>
        <label for='prosent${drikkeEnhetCounter}'>Prosent (%)</label>
        <input id='prosent${drikkeEnhetCounter}' type='number' placeholder='0' min='0'>
    </div>
    </div>`;
    randomDrinkControl = randomDrink;
    drikkeEnhetCounter++;
}
function refresh() {
    document.location.reload()
}

let antallEl = [];
let mengdeEl = [];
let prosentEl = [];

let beregnBtn = document.querySelector("#beregn");
beregnBtn.addEventListener("click", beregnDrikke);
let enkeltAntallEl;
let enkeltMengdeEl;
let enkeltProsentEl;

let sumAlkohol = 0;
let pilsAlkohol = 500*0.045;
let antallPils;
let promille;
let tilstand;

function beregnDrikke() {
    let drikkeEnhetEl = document.querySelectorAll(".drikkeenhet");
    for (let i=1; i<=drikkeEnhetEl.length; i++) {
        let enkeltAntallEl = document.querySelector(`#antall${i}`);
        antallEl.push(enkeltAntallEl.value);
    }
    for (let i=1; i<=drikkeEnhetEl.length; i++) {
        let enkeltMengdeEl = document.querySelector(`#mengde${i}`);
        mengdeEl.push(enkeltMengdeEl.value);
    }
    for (let i=1; i<=drikkeEnhetEl.length; i++) {
        let enkeltProsentEl = document.querySelector(`#prosent${i}`);
        prosentEl.push(enkeltProsentEl.value);
    }
    for (let i=0;i<drikkeEnhetEl.length;i++) {
        sumAlkohol += Number(antallEl[i])*Number(mengdeEl[i])*Number(prosentEl[i]);
    }
    /* console.log(antallEl);
    console.log(mengdeEl);
    console.log(prosentEl);
    console.log(sumAlkohol) */
    //sletter arrayen:
    antallEl.length=0;
    mengdeEl.length=0;
    prosentEl.length=0;

    /* bodyEl.innerHTML+=`<p>Det blir ${sumAlkohol} ml ren alkohol</p>` */
    let antallPils = sumAlkohol/pilsAlkohol;
    console.log(antallPils);
    promille = antallPils*0.2;
    console.log(promille)
    if (promille < 0) {
        tilstand = "NEGATIV PROMILLE"
    } else if (0 <= promille && promille <= 0.2) {
        tilstand = "LOVLIG Å KJØRE";
    } else if (0.2 < promille && promille <= 0.4) {
        tilstand = "FØLERN SÅVIDT";
    }else if (0.4<promille && promille <=0.6) {
        tilstand = "BRISEN"
    } else if (0.6<promille && promille <=1) {
        tilstand = "LYKKERUS"
    } else if (1<promille && promille <=1.5) {
        tilstand = "LÆTTIS"
    } else if (1.5<promille && promille <=2) {
        tilstand = "KANAKAZ"
    } else if (2<promille && promille <=2.5) {
        tilstand = "FARLIGE SAKER"
    } else if (2.5<promille && promille <=3) {
        tilstand = "BLACKOUT MUCH?"
    } else if (3<promille && promille <=4) {
        tilstand = "SKAFF HJELP."
    } else if (promille > 4) {
        tilstand = "DÆV"
    }
    
    sumPilsEl.innerHTML=`<p class="overskrift">PILS 🍺</p>
    <div class="hoved" id="hoved2">
        <h1 class="underskrift">Drikken din tilsvarer ca.</h1>
        <h1 class="underskrift" id="pilsTall">${antallPils.toFixed(1)} PILS</h1>
        <h1 class="underskrift" >TILSTAND: ${tilstand}</h1>
    </div>`

    sumAlkohol=0;
}