let dorbilderEl = document.querySelectorAll("img");

for (let i=0; i<dorbilderEl.length; i++) {
    dorbilderEl[i].addEventListener("click", sjekkdor);
}

let bildetall = Math.floor(Math.random()*3)+1;
    console.log(bildetall);

function sjekkdor(e) {
    let trykketDor=e.target;
    console.log(trykketDor.id);


    if (trykketDor.id==="dor1") {
        if (bildetall===1||bildetall===2) {
            e.target.src="https://assets.codepen.io/5037447/geit.png";
        }
        else if (bildetall===3) {
            e.target.src="https://assets.codepen.io/5037447/bil.png";
        }
        console.log("Du trykket på dør 1");
    }
    else if (trykketDor.id==="dor2") {
        if (bildetall===1||bildetall===3) {
            e.target.src="https://assets.codepen.io/5037447/geit.png";
        }
        else if (bildetall===2) {
            e.target.src="https://assets.codepen.io/5037447/bil.png";
        }
        console.log("Du trykket på dør 2");
    }
    else if (trykketDor.id==="dor3") {
        if (bildetall===2||bildetall===3) {
            e.target.src="https://assets.codepen.io/5037447/geit.png";
        }
        else if (bildetall===1) {
            e.target.src="https://assets.codepen.io/5037447/bil.png";
        }
        console.log("Du trykket på dør 3");
    }
}