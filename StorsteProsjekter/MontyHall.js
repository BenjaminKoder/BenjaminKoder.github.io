let dorBilderEl = document.querySelectorAll(".dor");
let bodyEl = document.querySelector("body");

let lamboNumber = Math.floor(Math.random()*3);

let refreshEl = document.querySelector("#refreshimg");
refreshEl.addEventListener("click", reloadFunction);
function reloadFunction(){
    document.location.reload()
}

for (i=0;i<dorBilderEl.length;i++){
    dorBilderEl[i].addEventListener("click", endreTilGeitBil);
    
    dorBilderEl[i].setAttribute("id","Geit");
    /* console.log(dorBilderEl[i].id) */
}


dorBilderEl[lamboNumber].removeAttribute("id");
dorBilderEl[lamboNumber].setAttribute("id","Lambo");
/* console.log(dorBilderEl[lamboNumber].id) */

let LamboEl = document.querySelector("#Lambo");
let GeitEl = document.querySelectorAll("#Geit");;
let AllButtonsEl = document.querySelector("#buttons");
let SelectedGeitEl;
let SelectedLamboEl;



function endreTilGeitBil(e){
    /* console.log(e.target.id);
    if(e.target.id == lamboId){
        e.target.src = "./Images/lambo.webp"
    } else {
        e.target.src = "./Images/goat.jpg"
    } */
    /* if (e.target.id=="Lambo"){
        
    } else if (e.target.id == "Geit"){
        e.target.setAttribute("id","SelectedGeit");
    } */
    e.target.setAttribute("class","Chosen");
    /* e.target.style.outlineColor = "blue";
    e.target.style.outlineWidth = "3px"; */

    /* console.log(e.target.id) */

    
    
    ChosenEl = document.querySelector(".Chosen");
    /* SelectedLamboEl = document.querySelector(".Chosen"); */
    
   if (GeitEl[0].classList.contains("Chosen")==false){
    GeitEl[0].src = "./Images/goat.jpg";
    GeitEl[0].value="shown"
    } else if (GeitEl[1].classList.contains("Chosen")==false){
    GeitEl[1].src = "./Images/goat.jpg";
    GeitEl[1].value="shown"
    }

    
    AllButtonsEl.setAttribute("id","active");
    refreshEl.setAttribute("class","show");
    
    for (i=0;i<dorBilderEl.length;i++){
        dorBilderEl[i].removeEventListener("click", endreTilGeitBil);
    }
}







let buttonEl = document.querySelectorAll("button");

buttonEl[0].addEventListener("click", ApneDøren);
buttonEl[1].addEventListener("click", BytteDøren);

function ApneDøren(){
    if (ChosenEl.classList.contains("Chosen") && ChosenEl.id == "Geit"){
        ChosenEl.src="./Images/goat.jpg";
        bodyEl.style.backgroundColor="red";
    } else if (ChosenEl.classList.contains("Chosen") && ChosenEl.id == "Lambo"){
        ChosenEl.src="./Images/lambo.webp";
        bodyEl.setAttribute("id", "rainbow");
    }
    buttonEl[0].removeEventListener("click", ApneDøren);
    buttonEl[1].removeEventListener("click", BytteDøren);
}
function BytteDøren(){
    if (GeitEl[0].classList.contains("Chosen")==false && GeitEl[0].id == "Geit" && GeitEl[0].value!="shown"){
        GeitEl[0].src="./Images/goat.jpg";
        bodyEl.style.backgroundColor="red";
    } else if (GeitEl[1].classList.contains("Chosen")==false && GeitEl[1].id == "Geit" && GeitEl[1].value!="shown"){
        GeitEl[1].src="./Images/goat.jpg";
        bodyEl.style.backgroundColor="red";
    }else if (LamboEl.classList.contains("Chosen")==false && LamboEl.id == "Lambo"){
        LamboEl.src="./Images/lambo.webp";
        bodyEl.setAttribute("id", "rainbow");
    }
    buttonEl[0].removeEventListener("click", ApneDøren);
    buttonEl[1].removeEventListener("click", BytteDøren);
    
}



