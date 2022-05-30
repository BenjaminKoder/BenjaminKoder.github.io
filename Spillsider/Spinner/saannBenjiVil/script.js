


const firebaseConfig = {
    // Skriv din config her
    /* apiKey: "AIzaSyBPnlx2XV9Sg-k3DYD0n_InzhhQPN5xUsQ",
    authDomain: "newprog-616ae.firebaseapp.com",
    projectId: "newprog-616ae",
    storageBucket: "newprog-616ae.appspot.com",
    messagingSenderId: "514830459978",
    appId: "1:514830459978:web:a8b0b2b16ffe8ce56532b3" */
    /* apiKey: "AIzaSyB36lZchbB9irTEi1RJgVZB0vtCdBdAnVs",
    authDomain: "myproject251-da91c.firebaseapp.com",
    projectId: "myproject251-da91c",
    storageBucket: "myproject251-da91c.appspot.com",
    messagingSenderId: "1026524450308",
    appId: "1:1026524450308:web:c1f45cada822a371996f51" */
    // Your web app's Firebase configuration
        apiKey: "AIzaSyABcHecG_p2rzhzQwHmL_dk12-VB8uXVU8",
        authDomain: "sjekke.firebaseapp.com",
        projectId: "sjekke",
        storageBucket: "sjekke.appspot.com",
        messagingSenderId: "244016051048",
        appId: "1:244016051048:web:212402562ad8aa5e875cdd"
};




firebase.initializeApp(firebaseConfig);

let collectionName = "Brukere"
/* let collectionName= "DidrikVarHer" */

let db = firebase.firestore();


let bodyEl = document.querySelector("body")
let containerEl = document.querySelector("#container");
let spinBtn = document.querySelector("#spin");
let scoreEl = document.querySelector("#score")
let scoreCounterEl = document.querySelector("#scoreCounter")
let buySpinsEl = document.querySelector("#buySpins");
let timeCounterEl = document.querySelector("#timeCounter");
let spinDegrees = Math.floor(Math.random() * 1000 + 200);
let leaderboardsEl = document.querySelector("#leaderboards");
let navnInputEl = document.querySelector("#fornavn");
let sjekkLeaderboardsEl = document.querySelector("#sjekkLeaderboards")
let toggleLeaderboardsEl = document.querySelector("#toggleLeaderboards")
let navnetEl = document.querySelector("#navnet")
let spinsCounterEl = document.querySelector("#spinsCounter")
let upgradeEl = document.querySelector("#upgrade")
let registrerBtnEl = document.querySelector("#registrer")
let innstruksEl = document.querySelector("#innstruks")
let btnInfoEl = document.querySelector("#btnInfo")





let score = 0;
let queue = true;
let numbera;
let numberb;


// Initialiserer spilleren
let spiller = {
    navn: "Temp",
    money: 350,
    spins: 15,
    timeSpin: 5000,
    upgradeCost: 4,
}
let spinsCost = 10;



//Oppdaterer siden 
function updateSite() {
    scoreCounterEl.innerText = `Penger: ${spiller.money}kr`;
    timeCounterEl.innerText = `Tid per spin: ${spiller.timeSpin / 1000}s`;
    containerEl.style.transition = spiller.timeSpin / 1000 + "s";
    spinsCounterEl.innerText = `Spins: ${spiller.spins}`;
    upgradeEl.innerText = `Oppgrader fart: ${spiller.upgradeCost}kr`;
}

updateSite()

//Oppdaterer informasjonen til databasen. For hvis brukernavnet allerede finnes i databasen skal vi .update og ikke .add
function updateDatabase(spiller) {
    console.log("Oppdaterer databasen")
    //let id = e.target.getAttribute("data-id");
    // Bruker navnet på spilleren som id i firebase dokumentet
    let id = spiller.navn
    db.collection(collectionName).doc(id).update({
        money: spiller.money,
        spins: spiller.spins,
        timeSpin: spiller.timeSpin,
        upgradeCost: spiller.upgradeCost
    });
}


//eventlisteners på ulike buttons. Kjører funksjoner ved click
spinBtn.addEventListener("click", spinCheck);
buySpinsEl.addEventListener("click", buySpin)
upgradeEl.addEventListener("click", upgrade)
btnInfoEl.addEventListener("click", kjorInnstruks)

function kjorInnstruks() {
    innstruksEl.classList.toggle("hidden")
}
//upgrade funksjonen kjører hvis spiller.timeSpin er over 150 og større enn spiller.upgradeCost. spiller.upgradeCost varier fordi den øker. 
function upgrade() {
    if (spiller.timeSpin > 150) {
        if (spiller.money >= spiller.upgradeCost) {
            spiller.timeSpin -= 250;
            spiller.money -= spiller.upgradeCost;
            scoreCounterEl.innerText = `Penger: ${spiller.money}`;
            containerEl.style.transition = spiller.timeSpin / 1000 + "s";
            timeCounterEl.innerText = `Tid per spin: ${spiller.timeSpin / 1000}s`
            spiller.upgradeCost = Math.floor(Number(spiller.upgradeCost) * 1.25);
            upgradeEl.innerText = `Oppgrader fart: ${Number(spiller.upgradeCost)}kr`;
        }
    } else {
        upgradeEl.innerText = "Tom for oppgraderinger"
    }
    //oppdaterer informasjonen til databasen fordi det har skjedd noen nytt nå
    updateDatabase(spiller)

}


//når du kjøper spin så trekkes du i penger og får en ny spin
function buySpin() {
    if (spiller.money >= spinsCost) {
        spiller.spins += 1
        spiller.money -= spinsCost
        scoreCounterEl.innerText = `Penger: ${Number(spiller.money)}kr`;
        spinsCounterEl.innerText = `Spins: ${Number(spiller.spins)}`;

    }

    updateDatabase(spiller)
}

//Hvis brukeren har mer eller lik 1 kan spin funksjonen få kjøre. Da har brukeren nok penger
function spinCheck() {
    if (spiller.spins >= 1) {
        spin()
    }
    else if (spiller.spins === 0) {
        hovedEl.innerHTML += '<h1>Dette går ikke</h1>'

    }
}
function spin() {
    //spinsDegrees er deklarert tidligere og er tilfeldig tall mellom 200 og 1200
    if (queue == true) {
        queue = false;//kan ikke kjøre spin hvis hjulet allerede spinner rundt
        containerEl.style.transform = `rotate(${spinDegrees}deg)`;//roterer så langt som spinDegress er
        score = (spinDegrees + 22.5) / 45;
        console.log(spinDegrees)
        console.log(score)
        //Slik at man ikke kan få mer enn 8 poeng:
        if (score > 9) {
            numbera = score % 8;
            numberb = score - numbera;
            score = score - numberb;

        }
        if (score > 7 && score < 8) {
            score = 25;
        } else if (score > 6 && score < 7) {
            score = 18;
        } else if (score > 5 && score < 6) {
            score = 12;
        } else if (score > 4 && score < 5) {
            score = 10;
        } else if (score > 3 && score < 4) {
            score = 5;
        } else if (score > 2 && score < 3) {
            score = 3;
        } else if (score > 1 && score < 2) {
            score = 0;
        }
        if (score > 0 && score < 1) {
            /* score = 15; */
            spiller.money = 0;
            console.log("du mistet alle pengene dine taper")
        }
        if (9 > score >= 8) {
            spiller.money = 0;
            console.log("du mistet alle pengene dine taper")
        }
        spinDegrees += Math.floor(Math.random() * 1000 + 200);
        setTimeout(scoreShow, spiller.timeSpin)
        spiller.spins -= 1
    }
}

//Viser de nye tallene og endrer queue til true. Da er hjulet klart til å spinnes igjen
function scoreShow() {
    queue = true;
    scoreEl.innerText = Math.floor(score);
    spiller.money = Number(spiller.money) + Math.floor(score);
    scoreCounterEl.innerText = `Penger: ${Number(spiller.money)}kr`;
    spinsCounterEl.innerText = `Spins: ${Number(spiller.spins)}`;
    updateDatabase(spiller)//oppdaterer til databasen
}

//Resetter informasjon. Denne bruker vi når vi lager ny bruker
function refresh() {
    spiller.money = 350;
    spiller.spins = 15;
    spiller.timeSpin = 5000;
    spiller.upgradeCost = 4;

    scoreCounterEl.innerText = `Penger: ${Number(spiller.money)}kr`;

    buySpinsEl.innerText = `Kjøp spins: ${spinsCost}kr`;
    updateDatabase(spiller)
}

registrerBtnEl.addEventListener("click", lagHentBruker)

function lagHentBruker() {

    let navn = navnInputEl.value;
    let ny
    //Hvis inputfeltet ikke er tomt, gjør dette
    if (navn != "") {

        navnetEl.innerHTML = `Ditt navn er: ${navn} `;//Vi ser brukernavnet på nettsiden

        db.collection(collectionName).get().then((snapshot) => {
            // Henter ut dokumentene
            let dokumenter = snapshot.docs;
            console.log(dokumenter)

            for (let i = 0; i < dokumenter.length; i++) {
                let data = dokumenter[i].data()
                console.log(data)

                if (data.navn == navn) {
                    //Henter ut informasjonen som ligger i databasen når brukernavnet skrevet i inputfeltet er lik en av dem i databasen
                    ny = false
                    spiller.navn = data.navn,
                        spiller.money = data.money,
                        spiller.spins = data.spins,
                        spiller.timeSpin = data.timeSpin,
                        spiller.upgradeCost = data.upgradeCost

                    break
                } else {
                    refresh()
                    ny = true
                }
            }

            if (ny) {
                spiller.navn = navn
                lagBruker(navn)
            }

            console.log("Velkommen", spiller.navn)
            //Inputfeltet tømmes
            navnInputEl.value = ""
            updateSite()//Oppdaterer informasjonen på nettsiden
        })
    }
    else {
        console.log("Brukernavn feltet er tomt og spiller vil ikke fungere")
    }
}





function lagBruker(navn) {
    //legger til ny informasjon. Spesifiserer et id navn. her: navn. for å lage dokumentet
    db.collection(collectionName).doc(navn).set({
        navn: navn,
        money: spiller.money,
        spins: spiller.spins,
        timeSpin: spiller.timeSpin,
        upgradeCost: spiller.upgradeCost,


    })
}





bodyEl.addEventListener("click", leaderboards)//når noe blir klikket på nettsiden, kjører leaderboards
bodyEl.addEventListener("mousemove", leaderboards)//når musen beveger seg over body, nettsiden
window.addEventListener("load", leaderboards)//når nettsiden laster inn

navnInputEl.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
        lagHentBruker();
    }
})

function leaderboards() {
    //sorterer etter penger fra øverst til nederst
    db.collection(collectionName).orderBy("money", "desc").get().then((snapshot) => {
        // Henter ut dokumentene
        let dokumenter = snapshot.docs;

        leaderboardsEl.innerHTML = ""
        // Går gjennom dokumentene og sender dem videre      
        for (let i = 0; i < 5; i++) {

            let data = dokumenter[i].data();

            leaderboardsEl.innerHTML += `<div class="score">
            <h1>${data.navn} </h1>
            <p>Penger: ${data.money} kr</p>
            
            </div>`



        }
    });
}

