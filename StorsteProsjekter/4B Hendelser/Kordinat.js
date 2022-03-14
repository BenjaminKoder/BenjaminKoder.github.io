let xEl = document.querySelector("#x");
let yEl = document.querySelector("#y");
let keysEl = document.querySelector("#keys");
let bodyEl = document.querySelector("body");

bodyEl.addEventListener("mousemove", pilflytt);
bodyEl.addEventListener("keydown", sjekknapp);
/* let bredde = (bodyEl.style.width)/2;
console.log(bodyEl.style.width + "px")
 */
function pilflytt(e) {
    xEl.innerHTML = "x-koordinat: " + e.clientX;
    yEl.innerHTML = "y-koordinat: " + e.clientY;
    if (e.clientX>500) {
        bodyEl.style.backgroundColor="rgb(255,140,230)";
    }
    else {
        bodyEl.style.backgroundColor="rgb(230,140,255)";
    }
}

let bokstav = Math.floor(Math.random()*25)+65;
let antall=0;

function sjekknapp(e) {
    let tast = String.fromCharCode(e.keyCode);
    /* console.log(e.ctrlKey);
    console.log(e.keyCode); */
    antall++;
    if (e.keyCode==bokstav) {
        keysEl.innerHTML="Riktig! Du brukte " + antall + " forsøk";
    }
    else {
        keysEl.innerHTML="Keycode: " + tast;
    }
}