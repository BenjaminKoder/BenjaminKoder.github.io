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
platforms = [new Platform({x:-300,y:innerHeight-50,width:1400, height:50}), 
    new Platform({x:500,y:innerHeight-150,width:100, height:30}), 
    new Platform({x:650,y:innerHeight-220,width:100, height:30}), 
    new Platform({x:630,y:innerHeight-360,width:100, height:30}), 
    new Platform({x:800,y:innerHeight-290,width:100, height:30}), 
    new Platform({x:850,y:innerHeight-430,width:150, height:30}),

    new Platform({x:1100,y:innerHeight-430,width:100, height:430}), 
    new Platform({x:1100,y:innerHeight-100,width:100, height:100}), 

    new Platform({x:1300,y:innerHeight-380,width:90, height:380}),
    new Platform({x:1300,y:innerHeight-100,width:90, height:100}),

    new Platform({x:1480,y:innerHeight-400,width:80, height:400}),
    new Platform({x:1480,y:innerHeight-100,width:80, height:100}),

    new Platform({x:1640,y:innerHeight-350,width:70, height:350}),
    new Platform({x:1640,y:innerHeight-100,width:70, height:100}),

    new Platform({x:1710,y:innerHeight-350,width:300, height:100}),
    new Platform({x:2070,y:innerHeight-340,width:100, height:80}),
    new Platform({x:2220,y:innerHeight-330,width:100, height:60}),
    new Platform({x:2370,y:innerHeight-320,width:100, height:40}),
    new Platform({x:2520,y:innerHeight-310,width:80, height:20}),
    new Platform({x:2900,y:innerHeight-310,width:120, height:20}),
    new Platform({x:3070,y:innerHeight-320,width:100, height:40}),
    new Platform({x:3220,y:innerHeight-330,width:100, height:60}),
    new Platform({x:3370,y:innerHeight-340,width:100, height:80}),
    new Platform({x:3520,y:innerHeight-350,width:300, height:100}),

    new Platform({x:1710,y:innerHeight-100,width:300, height:100}),
    new Platform({x:2070,y:innerHeight-90,width:83, height:15}),
    new Platform({x:2220,y:innerHeight-108,width:79, height:25}),
    new Platform({x:2370,y:innerHeight-106,width:94, height:23}),
    new Platform({x:2520,y:innerHeight-99,width:97, height:30}),
    new Platform({x:2670,y:innerHeight-104,width:85, height:18}),
    new Platform({x:2820,y:innerHeight-92,width:93, height:35}),
    new Platform({x:2970,y:innerHeight-87,width:102, height:24}),
    new Platform({x:3120,y:innerHeight-100,width:76, height:20}),
    new Platform({x:3270,y:innerHeight-94,width:74, height:31}),
    new Platform({x:3420,y:innerHeight-110,width:90, height:15}),
    new Platform({x:3570,y:innerHeight-86,width:92, height:19}),
    new Platform({x:3720,y:innerHeight-115,width:90, height:19}),
    new Platform({x:3870,y:innerHeight-83,width:86, height:34}),
    new Platform({x:4020,y:innerHeight-60,width:250, height:40}),
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

    var end = window.performance.now();
    var time = (end - start)/1000;
    tidtakerEl.innerText="Tid: "+(time).toFixed(1)+" sek";
    
    //Win condition
    if (scrollOffset > 3780 && scrollOffset<3790) {
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

        if (time<=11.1){
            gull = true;
        }

        nestelevelEl.innerHTML = "<a id='nestelevel' href='./Level7.html'>Neste Level</a>";
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


const menyknappEl = document.querySelector("#menyknapp");
const MenyEl = document.querySelector("#meny");

let menyOpen = false;

menyknappEl.addEventListener("click", () => {
    if (!menyOpen) {
        MenyEl.setAttribute("class","active");
        menyOpen = true;
    } else if(menyOpen===true) {
        MenyEl.removeAttribute('class','active');
        menyOpen=false;
    }
});