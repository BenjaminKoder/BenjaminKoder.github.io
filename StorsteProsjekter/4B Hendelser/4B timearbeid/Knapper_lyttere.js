let buttonEl = document.querySelector("button");
let bodyEl = document.querySelector("body");


buttonEl.addEventListener("click", backgroundColorSwitch);
let blueBackground = false;
/* let randomColor; */

function backgroundColorSwitch(){
    if (blueBackground === false){
        /* randomColor = Math.floor(Math.random()*16777215).toString(16); */
        let hue = Math.floor(Math.random()*360);
        let saturation = Math.random()*70+30;
        let lightness = Math.random()*60+20;
        bodyEl.style.backgroundColor=`hsl(${hue}, ${saturation}%,${lightness}%)`;
        blueBackground=true;
    } else if (blueBackground === true){
        bodyEl.style.backgroundColor = "rgb(255,255,255)";
        blueBackground=false;
    }
}

let 