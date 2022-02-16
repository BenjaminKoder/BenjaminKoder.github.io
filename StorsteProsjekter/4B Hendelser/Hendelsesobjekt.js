let dorbilderEl = document.querySelectorAll("img");

for (let i=0; i<dorbilderEl.length; i++) {
    dorbilderEl[i].addEventListener("click", sjekkdor);
}

function sjekkdor(e) {
    let trykketDor=e.target;
    console.log(trykketDor.id);



    console.log(e.target);
    console.log(e.type);
}