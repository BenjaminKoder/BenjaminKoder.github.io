let overskriftEl= document.querySelector("#kroner");
let levelEl= document.querySelector("#level");
let knappEl=document.querySelector("#knapp");
let hovedEl = document.querySelector("#hoved");
let bodyEl = document.querySelector("body");
let imageEl = document.querySelector("#image");

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
let press=0;
let level=1;

function skrivAntall() {
    antallTrykk++;
    press++;
    console.log(press);
    overskriftEl.innerHTML="Kroner: "+antallTrykk;
    bodyEl.style.background="rgb(0,255,0)";

    if (press==50) {
        level++;
        levelEl.innerHTML="Level: "+ level;
        imageEl.innerHTML="<img src='images/Toddler.png' alt='toddler'>"
    }
    else if (press==100) {
        level++;
        levelEl.innerHTML="Level: "+ level;
        imageEl.innerHTML="<img src='images/Teenager' alt='Teenager'>"
    }
    else if (press==200) {
        level++;
        levelEl.innerHTML="Level: "+level;
        imageEl.innerHTML="<img src='images/Adult.png' alt='Adult'>"
    }
    else if (press==400) {
        level++;
        levelEl.innerHTML="Level: "+level;
        imageEl.innerHTML="<img src='images/OldMan.png' alt='OldMan'>"
    }
    else if (press==600) {
        level++;
        levelEl.innerHTML="Level: "+level;
        imageEl.innerHTML=imageEl.innerHTML+"<img src='images/Crown.png' id='crown' alt='Crown'><p>GRATTIS! DU HAR VUNNET DETTE FANTASTISKE KLIKKESPILLET</p>"
    }
}

function skrivAntallMinus() {
    antallTrykk=antallTrykk-1;
    overskriftEl.innerHTML="Kroner: "+antallTrykk;
    bodyEl.style.background="rgb(255,0,0)";
}

function skrivAntalldobbel() {
    antallTrykk=antallTrykk+Math.floor(Math.random()*7-3);
    overskriftEl.innerHTML="Kroner: "+antallTrykk;
    bodyEl.style.background="rgb(255,255,0)";
}

function skrivAntallpower() {
    if (antallTrykk>=100) {
    antallTrykk=antallTrykk-100;
    knappEl.removeEventListener("click", skrivAntall)
    knappEl.addEventListener("click", skrivAntallpluss);
    knappEl.innerHTML="<p>2+</p>";
    knapppowerEl.removeEventListener("click", skrivAntallpower);
    knapppowerEl.addEventListener("click", skrivAntallpower2);
    knapppowerEl.innerHTML="<p>4+, pris 200</p>"
    overskriftEl.innerHTML="Kroner: "+antallTrykk;
    bodyEl.style.backgroundImage="url(.//images/UPGRADE.jfif)";
    bodyEl.style.backgroundSize="cover"
    }
}
function skrivAntallpower2() {
    if (antallTrykk>= 200) {
        antallTrykk=antallTrykk-200;
        knappEl.removeEventListener("click", skrivAntallpluss)
        knappEl.addEventListener("click", skrivAntallpluss2);
        overskriftEl.innerHTML="Score: "+antallTrykk;
        knappEl.innerHTML="<p>4+</p>";
        bodyEl.style.backgroundImage="url(./images/RedX.png)";
        bodyEl.style.backgroundSize="cover"
        knapppowerEl.removeEventListener("click", skrivAntallpower2);
        knapppowerEl.removeAttribute("#knapppower");
        knapppowerEl.setAttribute("id", "red");
        knapppowerEl.innerHTML="<p>Under Konstruksjon</p>"
    }
}


function skrivAntallpluss() {
    antallTrykk=antallTrykk+2;
    press++;
    console.log(press);
    overskriftEl.innerHTML="Kroner: "+antallTrykk;
    bodyEl.style.background="rgb(0,255,0)";

    if (press==50) {
        level++;
        levelEl.innerHTML="Level: "+ level;
        imageEl.innerHTML="<img src='images/Toddler.png' alt='toddler'>"
    }
    else if (press==100) {
        level++;
        levelEl.innerHTML="Level: "+ level;
        imageEl.innerHTML="<img src='images/Teenager' alt='Teenager'>"
    }
    else if (press==200) {
        level++;
        levelEl.innerHTML="Level: "+level;
        imageEl.innerHTML="<img src='images/Adult.png' alt='Adult'>"
    }
    else if (press==400) {
        level++;
        levelEl.innerHTML="Level: "+level;
        imageEl.innerHTML="<img src='images/OldMan.png' alt='OldMan'>"
    }
    else if (press==600) {
        level++;
        levelEl.innerHTML="Level: "+level;
        imageEl.innerHTML=imageEl.innerHTML+"<img src='images/Crown.png' id='crown' alt='Crown'><p>GRATTIS! DU HAR VUNNET DETTE FANTASTISKE KLIKKESPILLET</p>"
    }
}
function skrivAntallpluss2() {
    antallTrykk=antallTrykk+4;
    press++;
    console.log(press);
    overskriftEl.innerHTML="Kroner: "+antallTrykk;
    bodyEl.style.background="rgb(0,255,0)";

    if (press==50) {
        level++;
        levelEl.innerHTML="Level: "+ level;
        imageEl.innerHTML="<img src='images/Toddler.png' alt='toddler'>"
    }
    else if (press==100) {
        level++;
        levelEl.innerHTML="Level: "+ level;
        imageEl.innerHTML="<img src='images/Teenager' alt='Teenager'>"
    }
    else if (press==200) {
        level++;
        levelEl.innerHTML="Level: "+level;
        imageEl.innerHTML="<img src='images/Adult.png' alt='Adult'>"
    }
    else if (press==400) {
        level++;
        levelEl.innerHTML="Level: "+level;
        imageEl.innerHTML="<img src='images/OldMan.png' alt='OldMan'>"
    }
    else if (press==600) {
        level++;
        levelEl.innerHTML="Level: "+level;
        imageEl.innerHTML=imageEl.innerHTML+"<img src='images/Crown.png' id='crown' alt='Crown'><p>GRATTIS! DU HAR VUNNET DETTE FANTASTISKE KLIKKESPILLET</p>"
    }
}

function Jackpotfunksjon() {
    if (antallTrykk>=100 ) {
        antallTrykk=antallTrykk+(Math.round(Math.random()*225)-100);
        overskriftEl.innerHTML="Kroner: "+antallTrykk;
        bodyEl.style.backgroundImage="url(.//images/Jackpot.jpg)";
    }
}