let terning1El = document.querySelector("#terning1");
let terning2El = document.querySelector("#terning2");
let terning3El = document.querySelector("#terning3");
let terning4El = document.querySelector("#terning4");
let terning5El = document.querySelector("#terning5");

let terningdiv1El = document.querySelector("#terningdiv1");
let terningdiv2El = document.querySelector("#terningdiv2");
let terningdiv3El = document.querySelector("#terningdiv3");
let terningdiv4El = document.querySelector("#terningdiv4");
let terningdiv5El = document.querySelector("#terningdiv5");

let knappEl = document.querySelector("button");
knappEl.addEventListener("click", knapptrykk);
let terninger = [terning1El,terning2El, terning3El, terning4El, terning5El];
let terningdiver = [terningdiv1El, terningdiv2El, terningdiv3El, terningdiv4El, terningdiv5El];

let antallkast=3;
let sum;

function knapptrykk() {

function terning() {
    return Math.floor(Math.random()*6) + 1;
}

let n = 5;

let antall1 = 0;
let antall2 = 0;
let antall3 = 0;
let antall4 = 0;
let antall5 = 0;
let antall6 = 0;
let antall = [antall1,antall2,antall3,antall4,antall5,antall6];
let kast;

for (let i=0;i<n;i++) {
    kast=terning();
    /* console.log(kast); */
    if (terninger[i].checked===false){
    terningdiver[i].innerHTML = "<h1>" +kast+ "</h1>";
        /* if (kast===1){
            terningdiver[i].setAttribute("class", one)
        } */
    }
    console.log(terninger[i].checked);
    /* terningdiver[i].setAttribute("class", rulling); */
    antall[kast-1]++;
}


for (let k=1;k<=antall.length;k++){
    console.log("Antall "+k+" er: "+antall[k-1]);
}

antallkast-=1;
/* console.log(antallkast); */

knappEl.innerHTML="Kast igjen: "+antallkast;

if (antallkast===0){
    knappEl.removeEventListener("click", knapptrykk);
    for (let j=0;j<n;j++){
        sum+=Number(terningdiver[j].innerText);
        /* console.log(Number(terningdiver[j].innerText)); */
    }
}
}
console.log(sum);