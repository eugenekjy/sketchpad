const range = document.querySelector("#range");
const paintContainer = document.querySelector(".paint-container");
const rangeLabel = document.querySelector(".rangeText");
const rainbowButton = document.querySelector('.rainbow');
const resetButton = document.querySelector('.clean');
const chosenColor = document.querySelector(".color-choice")
const eraserButton = document.querySelector(".eraser")
//var
let rainbowMode = false;
let eraserMode = false;
//event listeners
range.addEventListener("input",createGrid);
rainbowButton.addEventListener("click", () => {
    rainbowMode = !rainbowMode;
    rainbowButton.textContent = "Rainbow Mode " + ((rainbowMode) ? "On" : "Off");
});
resetButton.addEventListener("click", createGrid);
eraserButton.addEventListener("click", () => {
    eraserMode = !eraserMode;
    eraserButton.classList.toggle("active");
})

//Grid Creation
function createGrid() {
    paintContainer.innerHTML = "";
    
    rangeLabel.textContent = `${range.value} x ${range.value}`;

    // Prepare faster DOM insertion
    const fragment = document.createDocumentFragment();

    // Pre-calculate sizes once (instead of in every loop)
    const squareWidth = paintContainer.clientWidth / range.value;
    const squareHeight = paintContainer.clientHeight / range.value;

    for (let i = 0; i < (range.value * range.value); i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.width = squareWidth + "px";
        square.style.height = squareHeight + "px";
        square.style.backgroundColor = "rgb(190, 139, 72";
        fragment.appendChild(square);
    }
    paintContainer.appendChild(fragment);
}

//use event bubbling because you use 1 listener instead of individual squares.

   paintContainer.addEventListener("mouseover", (e) => {
    if (!e.target.classList.contains("square")) return;

    if (rainbowMode) {
        e.target.style.backgroundColor = getRandomColor();
    }
});    

// event bubbling for clicks
paintContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("square") && eraserMode) {
        e.target.style.backgroundColor = "rgb(190, 139, 72";
    }
    else if (e.target.classList.contains("square") && !rainbowMode) {
        e.target.style.backgroundColor = chosenColor.value;
    }
})
//function get random color

function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
}


createGrid();
