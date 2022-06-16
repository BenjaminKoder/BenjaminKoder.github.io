let sumPilsEl = document.querySelector("#outline2");
let PromilleEl = document.querySelector("#outline3");
let promilleOverTidEl = document.querySelector("#outline4")
let randomDrinkControl = 0;
let randomDrink;
let drikkeEnhetCounter = 5;

let plussDrikkeBtn = document.querySelector("#plussDrikke");
plussDrikkeBtn.addEventListener("click", plussDrikke);
let nullstillBtn = document.querySelector("#nullstill");
nullstillBtn.addEventListener("click", refresh);

let drikkeEnheterEl = document.querySelector("#drikkeEnheter");



function plussDrikke() {
    let randomDrink = Math.floor(Math.random()*18+1);
    while (randomDrinkControl==randomDrink) {
        randomDrink = Math.floor(Math.random()*18+1);
    }
    let nyDrikkeEl = document.createElement("div")

    nyDrikkeEl.classList.add("drikkeenhet")
    console.log(randomDrink)

    nyDrikkeEl.innerHTML += `
    <img src='./Bilder/Drikke${randomDrink}F.png' alt='drikke' class='drikkebilde'>
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
    `
    drikkeEnheterEl.appendChild(nyDrikkeEl)
    randomDrinkControl = randomDrink;
    drikkeEnhetCounter++;
}
function refresh() {
    document.location.reload()
}

let antallEl = [];
let mengdeEl = [];
let prosentEl = [];

let beregnPilsBtn = document.querySelector(".beregn");
beregnPilsBtn.addEventListener("click", beregnDrikke);
let enkeltAntallEl;
let enkeltMengdeEl;
let enkeltProsentEl;

let sumAlkoholMl = 0;
let pilsAlkohol = 500*0.045;
let antallPils;
let promille;
let tilstand;
let vektEl;
let vektDisplayEl;
/* let hovedPromilleEl; */

function beregnDrikke() {
    sumAlkoholMl=0;
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
        sumAlkoholMl += Number(antallEl[i])*Number(mengdeEl[i])*Number(prosentEl[i]);
    }
    //sletter arrayen:
    antallEl.length=0;
    mengdeEl.length=0;
    prosentEl.length=0;
    console.log("Ren alkohol i ml:",sumAlkoholMl);


    antallPils = sumAlkoholMl/pilsAlkohol;
    promille = antallPils*0.2;
    if (promille < 0) {
        tilstand = "NEGATIV PROMILLE"
    } else if (0 <= promille && promille <= 0.2) {
        tilstand = "LOVLIG Å KJØRE";
    } else if (0.2 < promille && promille <= 0.4) {
        tilstand = "FØLERN LITT";
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
        <h1 class="underskrift" id="pilsForklaring">Drikken din tilsvarer</h1>
        <h1 class="underskrift" id="pilsTall">${antallPils.toFixed(1)} PILS</h1>
        <h1 class="underskrift" id="pilsForklaring">TILSTAND: ${tilstand}</h1>
    </div>`
    /* let sumPilsHoved = document.querySelector("#hoved2");
    for(i=0;i<=antallPils;i+=0.1){
        sumPilsHoved.innerHTML=`<h1 class="underskrift">Drikken din tilsvarer ca.</h1>
        <h1 class="underskrift" id="pilsTall">${antallPils.toFixed(1)-antallPils.toFixed(1)+i} PILS</h1>`;
        sumPilsEl.scrollIntoView();
    }
    sumPilsHoved.innerHTML+=`
        <h1 class="underskrift" >TILSTAND: ${tilstand}</h1>` */

    PromilleEl.innerHTML=`
        <p class="overskrift">Finn din promille ‰</p>
    <div class="hoved">
        <h1 class="underskrift" id="underskriftPromille">Kjønn</h1>
        <form id="kjønnForm">
            <label class="kjønnLabels active" id="mannLabel">
                <img src="./Bilder/DrikkendeMannF.png" alt="mann">
                <input id="mannInput" type="radio" name="kjønn" class="kjønnInputs" checked>
                <p class="underskrift">Mann</p>
            </label>
            <label class="kjønnLabels unactive" id="dameLabel">
                <img src="./Bilder/DrikkendeDameF.png" alt="dame">
                <input id="dameInput" type="radio" name="kjønn" class="kjønnInputs">
                <p class="underskrift">Dame</p>
            </label>
        </form>
            <label for="vekt" id="vektLabel">
                <h1 id="underskriftVekt">Vekt (Kg):</h1>
                <input id="vektDisplay" type="number" value="68" min="1" max="125">
            </label>
        <form id="vektForm">
            <input id="vekt" class="slider" type="range" placeholder="0" min="1" max="125" value="68">
        </form>
            <label for="drikkeperiode" id="drikkeperiodeLabel">
                <h1 class="underskrift" id="underskriftDrikkeperiode">Drikkeperiode (timer): </h1>
                <input id="drikkeperiodeDisplay" type="number" value="3" min="1" max="24">
            </label>
        <form id="drikkeperiodeForm">
            <input id="drikkeperiode" class="slider" type="range" placeholder="0" min="1" max="24" value="3">
        </form>
        <button class="beregn" id="beregnPromille">Beregn</button>
    </div>`

    sumPilsEl.scrollIntoView();

    vektEl = document.querySelector("#vekt");
    vektDisplayEl = document.querySelector("#vektDisplay");

    vektEl.addEventListener("input", oppdaterVektDisplay);
    vektDisplayEl.addEventListener("input", oppdaterVektSlider);

    function oppdaterVektDisplay() {
        vektDisplayEl.value = vektEl.value;
    }
    function oppdaterVektSlider() {
        vektEl.value = vektDisplayEl.value;
    }

    drikkeperiodeEl = document.querySelector("#drikkeperiode");
    drikkeperiodeDisplayEl = document.querySelector("#drikkeperiodeDisplay");

    drikkeperiodeEl.addEventListener("input", OppdaterdrikkeperiodeDisplay);
    drikkeperiodeDisplayEl.addEventListener("input", OppdaterdrikkeperiodeSlider);

    function OppdaterdrikkeperiodeDisplay() {
        drikkeperiodeDisplayEl.value = drikkeperiodeEl.value;
    }
    function OppdaterdrikkeperiodeSlider() {
        drikkeperiodeEl.value = drikkeperiodeDisplayEl.value;
    }

    let kjønnInputEls = document.querySelectorAll(".kjønnInputs");
    let kjønnLabelEls = document.querySelectorAll(".kjønnLabels");
    for (i=0; i<kjønnInputEls.length;i++) {
       kjønnInputEls[i].addEventListener("click", sjekkAktiv);
    }
    /* let mannInputEl = document.querySelector("#mannInput");
    let dameInputEl = document.querySelector("#dameInput");
    mannInputEl.addEventListener("click", sjekkAktivMann);
    dameInputEl.addEventListener("click", sjekkAktivDame);

    function sjekkAktivMann() {

            if (mannInputEl.checked==true) {
                mannInputEl.setAttribute("class", "active");
            } else if (mannInputEl.checked==false){
            mannInputEl.setAttribute("class", "unactive");
            } 
        }
    function sjekkAktivDame() {
            if (dameInputEl.checked==true) {
                dameInputEl.setAttribute("class", "active");
            } else if (dameInputEl.checked==false){
            dameInputEl.setAttribute("class", "unactive");
            } 
        } */

    function sjekkAktiv() {
        for (i=0; i<kjønnInputEls.length;i++) {
            if (kjønnInputEls[i].checked==true) {
                kjønnLabelEls[i].setAttribute("class", "active");
            } else if (kjønnInputEls[i].checked==false){
            kjønnLabelEls[i].setAttribute("class", "unactive");
            } 
        }
    }

    let beregnPromilleBtn = document.querySelector("#beregnPromille");
    beregnPromilleBtn.addEventListener("click", beregnPromille);

}

let kjønnsKonstant;
let sumAlkoholGram;
let vektGram;
let Promille;
let PromilleOverTid;
let promilleOverTidHovedEl
let promilleFarge = 0;
let drikketid;

//Kilde for formel til å beregne promille: https://www.wikihow.com/Calculate-Blood-Alcohol-Content-(Widmark-Formula)
function beregnPromille() {
    let mannInputEl = document.querySelector("#mannInput");
    let dameInputEl = document.querySelector("#dameInput");

    if(mannInputEl.checked) {
        //kjønnskonstanten er lik 0.68 for menn:
        kjønnsKonstant=0.73;
    } else if (dameInputEl.checked) {
        //kjønnskonstant er lik 0.55 for damer:
        kjønnsKonstant=0.59;
    }

    sumAlkoholGram=sumAlkoholMl*0.79

    vektGram=vektDisplayEl.value*1000;

    Promille=(sumAlkoholGram/(vektGram*kjønnsKonstant))*1000-0.04;

    drikketid = drikkeperiodeEl.value;

    promilleOverTidEl.innerHTML=`    
    <p class="overskrift">Promille over tid i timer</p>
    <div class="hoved" id="promilleOverTidHoved">
            <p id="forklaringPromille">Tiden gjelder fra siste drink etter drikkeperioden på ${drikketid} timer.</p>
            <div id="promilleEtterTidOverskrift">
                <h1 id="tidOverskrift">Tid:</h1>
                <h1 id="promilleOverskrift">Promille:</h1>
            </div>
    </div>`
    promilleOverTid=Promille-(drikketid*0.15);

    promilleOverTidHovedEl = document.querySelector("#promilleOverTidHoved");  

    for (i=0;i<=2000;i++){
        promilleOverTid=Promille-(i*0.075+drikketid*0.15);
        if (i===2){
            promilleOverTid=Promille-(i*0.075+drikketid*0.15);
            promilleOverTidHovedEl.innerHTML+=`
            <div class="promilleEtterTid">
                <h1 class="tid">${i/2} time:</h1>
                <h1 class="promille">${promilleOverTid.toFixed(2)}</h1>
            </div>`
        } else if (promilleOverTid>0){
            promilleOverTidHovedEl.innerHTML+=`
            <div class="promilleEtterTid">
                <h1 class="tid">${i/2} timer:</h1>
                <h1 class="promille">${promilleOverTid.toFixed(2)}</h1>
            </div>`
        } else if(promilleOverTid<=0){
            promilleOverTidHovedEl.innerHTML+=`
            <div class="promilleEtterTid">
                <h1 class="tid">${i/2} timer:</h1>
                <h1 class="promille">${0.00.toFixed(2)}</h1>
            </div>`
            let promilleOverTidUnderseksjon = document.querySelectorAll(".promille");
            let promilleFargeHsl=`hsl(125,100%,43%)`
            promilleOverTidUnderseksjon[i].style.color=promilleFargeHsl;
            break;
        }
    
        if (promilleOverTid < 0) {
            promilleFarge=125;
        } else if (0 <= promilleOverTid && promilleOverTid <= 0.2) {
            promilleFarge=Math.floor(Math.random()*10)+120;
        } else if (0.2 < promilleOverTid && promilleOverTid <= 0.4) {
            promilleFarge=Math.floor(Math.random()*15)+110;
        }else if (0.4<promilleOverTid && promilleOverTid <=0.6) {
            promilleFarge=Math.floor(Math.random()*15)+90;
        } else if (0.6<promilleOverTid && promilleOverTid <=1) {
            promilleFarge=Math.floor(Math.random()*15)+70;
        } else if (1<promilleOverTid && promilleOverTid <=1.5) {
            promilleFarge=Math.floor(Math.random()*15)+50;
        } else if (1.5<promilleOverTid && promilleOverTid <=2) {
            promilleFarge=Math.floor(Math.random()*15)+30;
        } else if (2<promilleOverTid && promilleOverTid <=2.5) {
            promilleFarge=Math.floor(Math.random()*15)+20;
        } else if (2.5<promilleOverTid && promilleOverTid <=3) {
            promilleFarge=Math.floor(Math.random()*15)+10;
        } else if (3<promilleOverTid <=4) {
            promilleFarge=Math.floor(Math.random()*8)+2;
        } else if (promilleOverTid>4){
            promilleFarge=Math.floor(Math.random()*5);
        }
        let promilleOverTidUnderseksjon = document.querySelectorAll(".promille");
        let promilleFargeHsl=`hsl(${promilleFarge},100%,43%)`
        promilleOverTidUnderseksjon[i].style.color=promilleFargeHsl;
    }

    promilleOverTidEl.scrollIntoView();
}



    