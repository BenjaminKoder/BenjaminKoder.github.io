


const firebaseConfig = {
    // Her er konfigurasjonen til databasen. Denne er unik
    /* apiKey: "AIzaSyABcHecG_p2rzhzQwHmL_dk12-VB8uXVU8",
    authDomain: "sjekke.firebaseapp.com",
    projectId: "sjekke",
    storageBucket: "sjekke.appspot.com",
    messagingSenderId: "244016051048",
    appId: "1:244016051048:web:212402562ad8aa5e875cdd" */
    apiKey: "AIzaSyArtcs9CrZFvrnjLtu9RdXLh8zdrCNFsYE",
    authDomain: "sistegang-24413.firebaseapp.com",
    projectId: "sistegang-24413",
    storageBucket: "sistegang-24413.appspot.com",
    messagingSenderId: "754408743746",
    appId: "1:754408743746:web:bf7787e14aa12fedc45edb"
};



//Initialiserer databasen
firebase.initializeApp(firebaseConfig);

//Deklarer en variabel slik at det kan være lett å endre senere
let collectionName = "Brukere"

let db = firebase.firestore();

//Metoden document.querySelector() lar oss hente HTML-elementer slik at vi kan redigere dem med JavaScript

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




//Deklarer variabler
let score = 0;
let queue = true;//Boolean. True or false
let numbera;
let numberb;


// Initialiserer spilleren
//Isteden for å bruke dette objektet, kunne jeg brukt localStorage. spiller.money og localStorage.money fungrer da på mange måter likt, men localStorage lagrer seg i browseren. 
let spiller = {
    navn: "Temp",
    money: 350,
    spins: 15,
    timeSpin: 5000,
    upgradeCost: 50,
}
let spinsCost = 10;



//Oppdaterer siden. Denne kommer vi senere til å henvise til. Når vi har endret noen verdier er det fint å oppdatere dem.
function updateSite() {
    scoreCounterEl.innerText = `Penger: ${spiller.money}kr`;
    timeCounterEl.innerText = `Tid per spin: ${spiller.timeSpin / 1000}s`;
    containerEl.style.transition = spiller.timeSpin / 1000 + "s";
    spinsCounterEl.innerText = `Spins: ${spiller.spins}`;
    upgradeEl.innerText = `Oppgrader fart: ${spiller.upgradeCost}kr`;
}
//Kjører update med en gang
updateSite()

//Oppdaterer informasjonen til databasen. For hvis brukernavnet allerede finnes i databasen skal vi .update og ikke .add
function updateDatabase(spiller) {
    console.log("Oppdaterer databasen")
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
    //toggler class hidden når knappen blir trykktet på. På den måten kan vi ha en knapp som viser innstruks om spillet. Deretter kan man trykke på knappen igjen for å fjerne informasjonen
}
//upgrade funksjonen kjører hvis spiller.timeSpin er over 150 og større enn spiller.upgradeCost. spiller.upgradeCost varier fordi den øker. 
function upgrade() {
    if (spiller.timeSpin > 150) {
        //Hvis pengene til brukeren er større eller er lik det oppgraderingsKosten nå ligger på(den øker), trekk fra tid per spin og penger
        if (spiller.money >= spiller.upgradeCost) {
            spiller.timeSpin -= 250;
            spiller.money -= spiller.upgradeCost;


            containerEl.style.transition = spiller.timeSpin / 1000 + "s";//Forteller hvor lang tid det tar for hjulet å gå rundt
            /* scoreCounterEl.innerText = `Penger: ${spiller.money}`;
            timeCounterEl.innerText = `Tid per spin: ${spiller.timeSpin / 1000}s`
            spiller.upgradeCost = Math.floor(Number(spiller.upgradeCost) * 1.25);
            upgradeEl.innerText = `Oppgrader fart: ${Number(spiller.upgradeCost)}kr` */
            //Oppdaterer den nye informasjonen
            updateSite();
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
        /* scoreCounterEl.innerText = `Penger: ${Number(spiller.money)}kr`;
        spinsCounterEl.innerText = `Spins: ${Number(spiller.spins)}`; */
        updateSite()

    }
    //Oppdaterer til databasen
    updateDatabase(spiller)
}

//Hvis brukeren har mer eller lik 1 kan spin funksjonen få kjøre. Da har brukeren nok penger
function spinCheck() {
    if (spiller.spins >= 1) {
        spin()
    }
    else {
        console.log("Du har ikke nok penger")
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
            score = 60;
        } else if (score > 6 && score < 7) {
            score = 30;
        } else if (score > 5 && score < 6) {
            score = 25;
        } else if (score > 4 && score < 5) {
            score = 15;
        } else if (score > 3 && score < 4) {
            score = 5;
        } else if (score > 2 && score < 3) {
            score = 3;
        } else if (score > 1 && score < 2) {
            score = 0;
        }
        if (score > 0 && score < 1) {
            /* score = 15; */
            //Det er her bildet av bomben er
            spiller.money = 0;
            console.log("du mistet alle pengene dine taper")
        }
        if (9 > score >= 8) {
            spiller.money = 0;
            console.log("du mistet alle pengene dine taper")
        }
        spinDegrees += Math.floor(Math.random() * 1000 + 200);
        //Oppdaterer info på nettsiden etter hjulet har spunnet
        setTimeout(scoreShow, spiller.timeSpin)
        //gjør at du får en mindre i spins
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
    spiller.upgradeCost = 50;

    scoreCounterEl.innerText = `Penger: ${Number(spiller.money)}kr`;

    buySpinsEl.innerText = `Kjøp spins: ${spinsCost}kr`;
    //oppdatere til databasen
    updateDatabase(spiller)
}

//Når registrer knappet blir trykket på eller enter blir presset når du er i navnInput-feltet, kjør lagHentbruker-funksjonen
registrerBtnEl.addEventListener("click", lagHentBruker)

navnInputEl.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
        lagHentBruker();
    }
})


function lagHentBruker() {

    let navn = navnInputEl.value;
    let ny
    //Hvis inputfeltet ikke er tomt, gjør dette
    if (navn != "") {

        navnetEl.innerHTML = `Ditt navn er: ${navn} `;//Vi ser brukernavnet på nettsiden
        //Tar et øyeblikksbilde av hvordan databasen
        db.collection(collectionName).get().then((snapshot) => {
            // Henter ut dokumentene
            let dokumenter = snapshot.docs;
            console.log(dokumenter)

            for (let i = 0; i < dokumenter.length; i++) {
                let data = dokumenter[i].data()


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

                    console.log("refreshe")

                    ny = true
                }
            }

            if (ny) {
                spiller.navn = navn
                refresh()
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





/* bodyEl.addEventListener("click", leaderboards)//når noe blir klikket på nettsiden, kjører leaderboards
bodyEl.addEventListener("mousemove", leaderboards) *///når musen beveger seg over body, nettsiden
window.addEventListener("load", leaderboards)//når nettsiden laster inn
sjekkLeaderboardsEl.addEventListener("click",leaderboards)


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

