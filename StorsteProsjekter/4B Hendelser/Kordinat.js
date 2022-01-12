let xEl = document.querySelector("#x");
let yEl = document.querySelector("#y");
let bodyEl = document.querySelector("body");

bodyEl.addEventListener("mousemove", pilflytt);

function pilflytt(e) {
    xEl.innerHTML = "x-koordinat: " + e.clientX;
    yEl.innerHTML = "y-koordinat: " + e.clientY;
}