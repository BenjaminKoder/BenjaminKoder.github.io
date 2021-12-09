var character = document.getElementById("character")
var block = document.getElementById("block")


let currentDate = new Date();
const tstart = currentDate.getTime();
let score;


function jump() {
    if(character.classList != "animate") {
    character.classList.add("animate"); 
    }
    setTimeout(function(){
        character.classList.remove("animate");
    }, 500)
}

var checkDead = setInterval(function(){
    var characterTop=
    parseInt(window.getComputedStyle(character).getPropertyValue("top"))
    var blockLeft=
    parseInt(window.getComputedStyle(block).getPropertyValue("left"))
    if (blockLeft < 40 && blockLeft > 0 && characterTop>=260) {
        block.style.animation="none";
        block.style.display="none";
        currentDate = new Date();

        score = currentDate.getTime() - tstart
        score = Math.floor(score/10)
        console.log(score)
        let msg = "Du tapte. Din score: " + score
        //alert("Du tapte lol");
        alert(msg);
    }

}, 10)