/* let navnInputEl = document.querySelector(".navnInput");
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

let collectionName = "tider11";




function getUsers() {
    db.collection(collectionName).orderBy("tid").get().then((snapshot) => {
        let dokumenter = snapshot.docs;

        leaderboardsEl.innerHTML = "";

        for (let i=0;i<5;i++) {
            let data = dokumenter[i].data();

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







 */




const canvas = document.querySelector("#canvas");
const c = canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=innerHeight;

//lager tyngdekraft;
var gravity;
let antalldød = 1;
let start;
let celebration = new Audio("./Canvasgame.audio/Celebration.mp3");
let death = new Audio("./Canvasgame.audio/Lose.mp3")
let highscore = 100**100;
let gull = false;

const forsokEl = document.querySelector("#antallforsøk");
const tidtakerEl = document.querySelector("#tidtaker");
const highscoreEl = document.querySelector("#highscore");
const nestelevelEl = document.querySelector("#levelparent");
const gullEl = document.querySelector("#gullstjerne");

var randomColorplayer = Math.floor(Math.random()*16777215).toString(16);
var randomColorplatform = Math.floor(Math.random()*16777215).toString(16);

class Player {
    //metoden constructor blir avført når en spiller blir plassert/brukt:
    constructor() {
        //posisjon til spilleren:
        this.position = {
            x:100,
            y:innerHeight-80
        }
        //setter fart på objektet:
        this.velocity = {
            x:0,
            y:0
        }
        //bredde og høyde til spilleren:
        this.width=30
        this.height=30

        this.speed=8
    }
    //metoden draw tegner hvordan playeren ser ut:
    draw(){
        //referer til "construkter"-objektet og tegner spilleren
        c.fillStyle="#"+randomColorplayer;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    //Metode som endrer på Playerens "properties" når man kaller på metoden
    update() {
        //tegner objektet:
        this.draw()
        //endrer på y-posisjonen til objektet utifra y-farten den har
        this.position.y+=this.velocity.y;
        //endrer på x-posisjonen til objektet utifra x-farten den har
        this.position.x+=this.velocity.x;

        if (player.position.y<0) {
            gravity=5;
        }else if (player.position.y>0) {
            gravity=0.5;
        }
        //hvis (y-posisjonen til spilleren (den måler fra toppen av objektet) + høyden til spilleren + y-farten til spilleren) er lavere enn eller lik høyden til canvaset, skjer if-setningen
        if (this.position.y+this.height+this.velocity.y <= canvas.height) {
            //adderer tyngdekraften til y-farten
            this.velocity.y+=gravity;
        }
    }
}

class Platform {
    //Når det står {x,y} gir det oss muligheten å bestemme de to verdiene når vi lager en platform. Disse to verdiene er "lenket til" x- og y-posisjonene til platformen.
    constructor({x, y, width, height}) {
        this.position = {
            x:x,
            y:y
        }
        this.width=width;
        this.height=height;
    }
    draw() {
        c.fillStyle="#"+randomColorplatform;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

//lager en ny spiller med "Player"-objektet:
let player = new Player()
//lager en ny platform med "Platform"-objektet
let platforms = []
//kaller på update-metoden:
let keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

let scrollOffset = 0;


//Når spiller dør:
function init(){

start = window.performance.now();
keys.right.pressed=false;
keys.left.pressed=false;
//Setter nye farger:
randomColorplatform = Math.floor(Math.random()*16777215).toString(16);
randomColorplayer = Math.floor(Math.random()*16777215).toString(16);
//lager en ny spiller med "Player"-objektet:
player = new Player()
//lager en ny platform med "Platform"-objektet
platforms = [new Platform({x:-300,y:innerHeight-50,width:700, height:50}), 
    new Platform({x:500,y:innerHeight-50,width:300, height:50}),
    new Platform({x:850,y:innerHeight-150,width:100, height:150}),
    new Platform({x:650,y:innerHeight-250,width:100, height:30}),
    new Platform({x:850,y:innerHeight-350,width:400, height:30}),
    new Platform({x:1200,y:innerHeight-250,width:100, height:30}),
    new Platform({x:1450,y:innerHeight-150,width:150, height:30}),
    new Platform({x:1580,y:innerHeight-350,width:100, height:30}),
    new Platform({x:1730,y:innerHeight-350,width:20, height:350}),
    new Platform({x:1930,y:innerHeight-300,width:50, height:300}),
    new Platform({x:2000,y:innerHeight-400,width:10, height:400}),
    new Platform({x:2400,y:innerHeight-100,width:100, height:100}),
    new Platform({x:2550,y:innerHeight-200,width:100, height:200}),
    new Platform({x:2700,y:innerHeight-300,width:100, height:300}),
    new Platform({x:2850,y:innerHeight-400,width:100, height:400}),
    new Platform({x:3290,y:innerHeight-400,width:110, height:400}),
    new Platform({x:3400,y:innerHeight-400,width:300, height:30}),
    new Platform({x:3500,y:innerHeight-310,width:300, height:30}),
    new Platform({x:3800,y:0,width:30, height:innerHeight-100}),
    new Platform({x:3650,y:innerHeight-40,width:300, height:40}),
    new Platform({x:4100,y:innerHeight-30,width:30, height:30}),
    new Platform({x:4430,y:innerHeight-40,width:20, height:40}),
    new Platform({x:4750,y:innerHeight-30,width:200, height:40}),
    new Platform({x:5150,y:innerHeight-30,width:500, height:40}),
    new Platform({x:5880,y:innerHeight-30,width:500, height:40}),

    new Platform({x:6580,y:innerHeight-100,width:60, height:30}),
    new Platform({x:6750,y:innerHeight-70,width:40, height:30}),
    new Platform({x:6910,y:innerHeight-150,width:30, height:30}),
    new Platform({x:6750,y:innerHeight-230,width:60, height:30}),
    new Platform({x:6550,y:innerHeight-270,width:60, height:30}),
    new Platform({x:6350,y:innerHeight-230,width:60, height:30}),
    new Platform({x:6050,y:innerHeight-230,width:90, height:30}),
    new Platform({x:6060,y:innerHeight-330,width:70, height:30}),
    new Platform({x:6070,y:innerHeight-430,width:50, height:30}),
    new Platform({x:6250,y:innerHeight-410,width:70, height:30}),
    new Platform({x:6440,y:innerHeight-420,width:80, height:30}),
    new Platform({x:6620,y:innerHeight-400,width:90, height:30}),
    new Platform({x:6810,y:innerHeight-390,width:100, height:30}),
    new Platform({x:7050,y:innerHeight-430,width:120, height:30}),
    new Platform({x:7550,y:innerHeight-50,width:120, height:50}),
    new Platform({x:7755,y:innerHeight-120,width:30, height:30}),
    new Platform({x:8000,y:innerHeight-50,width:450, height:50}),
]
//kaller på update-metoden:

scrollOffset = 0;

if (gull===true){
    randomColorplayer="d4af37";
    gullEl.innerHTML="<img src='./Canvasgame.img/Gullstjerne.png'>";
}

}

function animate() {
    //kaller på animate-funksjonen: (recursive function)
    requestAnimationFrame(animate);
    //funksjon som clearer canvaset:
    c.clearRect(0,0,canvas.width,canvas.height);
    player.update();
    platforms.forEach(platform => {
        platform.draw()
    })
    
    

    //hvis keys.right.pressed er lik sant beveger den seg med 5 som fart, hvis ikke (altså hvis keys.right.pressed er lik usant) er x-farten lik 0
    //gjør slik at x-posisjonen til playeren ikke kan være mer enn 400
    if (keys.right.pressed && player.position.x<400) {
        player.velocity.x=player.speed;
    } else if (keys.left.pressed && player.position.x>100) {
        player.velocity.x=-player.speed;
    } else {
        player.velocity.x*=0.8; //kan ta ganger 0.9

        //Når right-key er pressed og har player-position-x større enn eller lik 400 eller left-key er pressed og har player.position.x større enn eller lik 100:
        if (keys.right.pressed){
            //ScrollOffset er distansen playeren har kommet. Når playeren går mot høyre stiger distansen, og når han går mot venstre synker den.
            scrollOffset +=player.speed
            //copy-paster platform-tegnememtoden
            platforms.forEach(platform => {
                platform.position.x -=player.speed;
            })
        } else if (keys.left.pressed) {
            scrollOffset -=player.speed
            platforms.forEach(platform => {
                platform.position.x +=player.speed;
            })
        }
    }

    //Platform collision-detection
    //hvis spillerens y-posisjon + spillerens høyde er mindre enn eller lik platformens y-posisjon (toppen tror jeg). Og spillerens y-posisjon (toppen) + spillerens høyde + spillerens y-fart er større enn eller lik platformens y-posisjon. Og spillerens x-posisjon og bredde er større enn eller lik platformens x-posisjon
    platforms.forEach(platform => {
        if (player.position.y+player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
            player.velocity.y=0
        }
    })

    let end = window.performance.now();
    let time = (end - start)/1000;
    tidtakerEl.innerText="Tid: "+(time).toFixed(1)+" sek";
    
    //Win condition
    if (scrollOffset > 8000 && scrollOffset<8100) {
        console.log("You won")
        end = window.performance.now();
        celebration.play();
        addUser(time);
        
        antalldød=1;

        if (time<highscore){
            highscore=time.toFixed(1);
            console.log("Du fikk ny rekord! Gratulerer! Du brukte "+antalldød+" forsøk og "+time.toFixed(1)+ " sekunder på det siste forsøket.");
        }
        highscoreEl.innerText="Rekord: "+ highscore;

        if (time<=38.1){
            gull = true;
        }

        nestelevelEl.innerHTML = "<a id='nestelevel' href='./Level12.html'>Neste Level</a>";
        init();
    }

    //Lose condition
    //Hvis toppen av spilleren er under høyden av skjermen:
    if(player.position.y>canvas.height){
        init();
        antalldød++;
        forsokEl.innerText="Forsøk: "+antalldød;
        death.play();
    }
    
}
init();
animate();

// Når en keyCode trykkes: 
window.addEventListener("keydown", ({ keyCode })=>{
    // Når casesene er gjennomført (her trykket på), utføres switch-statementet
    switch (keyCode) {
        case 65 : //65 er keyCoden til a
            keys.left.pressed=true
            break
        case 68: //68 er keyCoden til d
            keys.right.pressed=true
            break
        case 87: //87 er keyCoden til w
            if (player.velocity.y===0){
                player.velocity.y=-10
            }
            break

        
        case 37 : //37 er keyCoden til arrow (left)
            keys.left.pressed=true
            break
        case 39: //39 er keyCoden til arrow (right)
            keys.right.pressed=true
            break
        case 38: //38 er keyCoden til arrow (up)
            if (player.velocity.y==0){
                player.velocity.y=-10
            }
            break
    }
})
window.addEventListener("keyup", ({ keyCode })=>{
    // Når casesene er gjennomført (her trykket på), utføres switch-statementet
    switch (keyCode) {
        case 65: //65 er keyCoden til a (left)
            keys.left.pressed=false
            break
        case 68: //68 er keyCoden til d (right)
            //når spilleren slipper tasten blir farten lik 0
            keys.right.pressed=false
            break
        case 87: //87 er keyCoden til w (opp)
            break


        case 37: //37 er keyCoden til arrow (left)
            keys.left.pressed=false
            break
        case 39: //39 er keyCoden til arrow (right)
            //når spilleren slipper tasten blir farten lik 0
            keys.right.pressed=false
            break
        case 38: //38 er keyCoden til arrow (opp)
            break
    }
})

