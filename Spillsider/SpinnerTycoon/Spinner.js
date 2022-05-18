let containerEl = document.querySelector("#container");
let spinBtn = document.querySelector("#spin");
let scoreEl = document.querySelector("#score")
let scoreCounterEl = document.querySelector("#scoreCounter")
let upgradeEl = document.querySelector("#upgrade");
let timeCounterEl = document.querySelector("#timeCounter");
let spinDegrees = Math.floor(Math.random()* 1000+200);

let score = 0;
let queue = true;
let numbera;
let numberb;


if (!localStorage.money) {
    localStorage.money = 0;
} 
/* localStorage.money = 0; */
scoreCounterEl.innerText = `MONEY: ${Number(localStorage.money)}`;


if (!localStorage.timeSpin) {
    localStorage.timeSpin = 5000;
} 
/* localStorage.timeSpin=5000; */
containerEl.style.transition = Number(localStorage.timeSpin)/1000 +"s";
timeCounterEl.innerText = `TIME PER SPIN: ${Number(localStorage.timeSpin)/1000}s`


if (!localStorage.upgradeCost) {
    localStorage.upgradeCost = 10;
} 
/* localStorage.upgradeCost = 10; */
upgradeEl.innerText = `SPEED UP: ${Number(localStorage.upgradeCost)}`;

spinBtn.addEventListener("click", spin);
upgradeEl.addEventListener("click", upgrade)
function upgrade() {
    if (localStorage.timeSpin > 500){
        if (Number(localStorage.money)>=Number(localStorage.upgradeCost)){
            localStorage.timeSpin=Number(localStorage.timeSpin)-250;
            localStorage.money=Number(localStorage.money)-Number(localStorage.upgradeCost);
            scoreCounterEl.innerText = `MONEY: ${Number(localStorage.money)}`;
            containerEl.style.transition = Number(localStorage.timeSpin)/1000 +"s";
            timeCounterEl.innerText = `TIME PER SPIN: ${Number(localStorage.timeSpin)/1000}s`
            localStorage.upgradeCost=Math.floor(Number(localStorage.upgradeCost)*1.25);
            upgradeEl.innerText = `SPEED UP: ${Number(localStorage.upgradeCost)}`;
        }
    } else {
        upgradeEl.innerText = "OUT OF UPGRADES";
    }
}

function spin() {
    if (queue==true) {
    queue = false;
    containerEl.style.transform = `rotate(${spinDegrees}deg)`;
    score = (spinDegrees+22.5)/45;
    //Slik at man ikke kan få mer enn 8 poeng:
    if (score>9) {
        numbera = score % 8;
        numberb = score - numbera;
        score=score-numberb
    }
    if (score > 0 && score < 1) {
        score=15;
    }
    spinDegrees += Math.floor(Math.random()* 1000+200);
    setTimeout(scoreShow, Number(localStorage.timeSpin))
    }   
}
function scoreShow() {
    queue = true;
    scoreEl.innerText = Math.floor(score);
    localStorage.money = Number(localStorage.money) + Math.floor(score);
    scoreCounterEl.innerText = `MONEY: ${Number(localStorage.money)}`;
}

let refreshBtn = document.querySelector("#refreshimg");

refreshBtn.addEventListener("click", refresh);

function refresh() {
    localStorage.money = 0;
    localStorage.timeSpin = 5000;
    localStorage.upgradeCost = 10;

    scoreCounterEl.innerText = `MONEY: ${Number(localStorage.money)}`;
    timeCounterEl.innerText = `TIME PER SPIN: ${Number(localStorage.timeSpin)/1000}s`
    upgradeEl.innerText = `SPEED UP: ${Number(localStorage.upgradeCost)}`;
}