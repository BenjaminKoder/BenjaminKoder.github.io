
let navnInputEl = document.querySelector(".navnInput");
let navnLabelEl = document.querySelector(".navnLabel");

if (localStorage.navnverdi) {
    navnInputEl.value = localStorage.navnverdi;
    navnInputEl.style.backgroundColor = "rgba(60, 255, 0, 0.502)";
    navnInputEl.style.border = "3px rgb(0, 216, 18) solid";
    navnLabelEl.style.color = "rgb(0, 161, 13)";
    navnInputEl.blur();
}

navnInputEl.addEventListener("keydown", function(event) {
    if (event.key == "Enter" && navnInputEl.value != "") {
        navnInputEl.style.backgroundColor = "rgba(60, 255, 0, 0.502)";
        navnInputEl.style.border = "3px rgb(0, 216, 18) solid";
        navnLabelEl.style.color = "rgb(0, 161, 13)";
        localStorage.navnverdi = navnInputEl.value;
        navnInputEl.blur();
    } else if (event.key == "Enter" && navnInputEl.value == "") {
        navnInputEl.style.backgroundColor = "rgba(255, 0, 0, 0.502)";
        navnInputEl.blur();
    }   else {
        navnInputEl.style.backgroundColor = "#fff";
        navnInputEl.style.border = "1px #000 solid";
        navnLabelEl.style.color = "#000";
    }
})


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBp7J-JtNoxDkIBRCgCO855dlodFUntPFI",
    authDomain: "geometrydashish-80a36.firebaseapp.com",
    projectId: "geometrydashish-80a36",
    storageBucket: "geometrydashish-80a36.appspot.com",
    messagingSenderId: "815295319421",
    appId: "1:815295319421:web:323c9d69efc19688951014",
    measurementId: "G-1ZBH4FB7XB"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Lager en referanse til databasen
let db = firebase.firestore();


const menyknappEl = document.querySelector("#menyknapp");
const MenyEl = document.querySelector("#meny");

let menyOpen = false;
//add leaderboards:
const leaderboardsknappEl = document.querySelector("#leaderboardsknapp");
const leaderboardsEl = document.querySelector("#leaderboards");

let leaderboardsOpen = false;

menyknappEl.addEventListener("click", () => {
    if (!menyOpen) {
        MenyEl.setAttribute("class","active");
        menyOpen = true;
    } else if(menyOpen===true) {
        MenyEl.removeAttribute('class','active');
        menyOpen=false;
    }
    if (leaderboardsOpen===true && menyOpen===true) {
        leaderboardsEl.removeAttribute('class','active');
        leaderboardsOpen=false;
    }
});



leaderboardsknappEl.addEventListener("click", () => {
    if (!leaderboardsOpen) {
        leaderboardsEl.setAttribute("class","active");
        leaderboardsOpen = true;
    } else if(leaderboardsOpen===true) {
        leaderboardsEl.removeAttribute('class','active');
        leaderboardsOpen=false;
    } 
    if (leaderboardsOpen===true && menyOpen===true) {
        MenyEl.removeAttribute('class','active');
        menyOpen=false;
    }
});

function addUser(time) {
    console.log("addUser")
        leaderboardsEl.innerHTML += `<div class="score">
        <h2>Navn: ${navnInputEl.value} </h2>
        <p>Tid: ${time.toFixed(3)} sek</p>
        </div>`

        //legg til i databasen:
        db.collection(collectionName).add({
            navn: navnInputEl.value,
            tid: time
        })

        console.log("Brukeren ble lagt til i databasen");
        getUsers();
}

function getUsers() {
    db.collection(collectionName).orderBy("tid").get().then((snapshot) => {
        let dokumenter = snapshot.docs;

        leaderboardsEl.innerHTML = "";

        for (let i=0;i<5;i++) {
            let data = dokumenter[i].data();
            /* console.log(dokumenter[i].data()) */

            leaderboardsEl.innerHTML += `<div class="score">
            <h2>Navn: ${data.navn} </h2>
            <p>Tid: ${data.tid.toFixed(3)} sek</p>
            </div>`
            let scoreEl = document.querySelectorAll(".score");
            let randomColorScore = Math.floor(Math.random()*360);
            scoreEl[i].style.backgroundColor = `hsl(${randomColorScore}, 100%, 40%)`;
        }
    })
}

getUsers();