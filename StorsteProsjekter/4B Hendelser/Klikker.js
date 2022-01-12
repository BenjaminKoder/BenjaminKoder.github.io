let overskriftEl= document.querySelector("h1");
let knappEl=document.querySelector("#knapp");
let hovedEl = document.querySelector("#hoved");
let bodyEl = document.querySelector("body")
knappEl.addEventListener("click", skrivAntall);

let knappminusEl=document.querySelector("#knappminus");
knappminusEl.addEventListener("click", skrivAntallMinus);

let knappdobbelEl=document.querySelector("#knappdobbel");
knappdobbelEl.addEventListener("click", skrivAntalldobbel);

let knapppowerEl=document.querySelector("#knapppower");
knapppowerEl.addEventListener("click", skrivAntallpower);

let jackpotEl=document.querySelector("#Jackpot");
jackpotEl.addEventListener("click", Jackpotfunksjon);

let antallTrykk=0;

function skrivAntall() {
    antallTrykk++;
    overskriftEl.innerHTML="Score: "+antallTrykk;
    bodyEl.style.background="rgb(0,255,0)";
}

function skrivAntallMinus() {
    antallTrykk=antallTrykk-1;
    overskriftEl.innerHTML="Score: "+antallTrykk;
    bodyEl.style.background="rgb(255,0,0)";
}

function skrivAntalldobbel() {
    antallTrykk=antallTrykk+Math.floor(Math.random()*7-3);
    overskriftEl.innerHTML="Score: "+antallTrykk;
    bodyEl.style.background="rgb(255,255,0)";
}

function skrivAntallpower() {
    if (antallTrykk>=100) {
    antallTrykk=antallTrykk-100;
    knappEl.removeEventListener("click", skrivAntall)
    knappEl.addEventListener("click", skrivAntallpluss);
    knappEl.innerHTML="<p>2+</p>";
    overskriftEl.innerHTML="Score: "+antallTrykk;
    bodyEl.style.backgroundImage="url(.//images/UPGRADE.jfif)";
    bodyEl.style.backgroundSize="cover"
    }
}


function skrivAntallpluss() {
    antallTrykk=antallTrykk+2;
    overskriftEl.innerHTML="Score: "+antallTrykk;
    bodyEl.style.background="rgb(0,255,0)";
}

function Jackpotfunksjon() {
    if (antallTrykk>=100 ) {
        antallTrykk=antallTrykk+(Math.round(Math.random()*450-100));
        overskriftEl.innerHTML="Score: "+antallTrykk;
        bodyEl.style.backgroundImage="url(.//images/Jackpot.jpg)";
    }
}

