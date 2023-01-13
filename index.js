const DEFAULT_ROW = 16;
const DEFAULT_COL = 16;
const MAX_ROWS = 64;
const MAX_COLS = 64;
const MIN_ROWS = 4;
const MIN_COLS = 4;
const DEFAULT_COLOR = "#000000";
const DEFAULT_MODE = "draw";

let pixel_row = DEFAULT_ROW;
let pixel_col = DEFAULT_COL;
let color_picker = DEFAULT_COLOR; // used to store the selected color 
let current_mode = "";
let current_color = DEFAULT_COLOR; // the color that is drawing
let mouseDown = false;
let showGrid = false;

const canvasGrid = document.querySelector('.drawing-canvas');
const increaseDim = document.querySelector('.increase-size');
const decreaseDim = document.querySelector('.decrease-size');
const drawBtn  = document.querySelector('.drawing');
const eraserBtn = document.querySelector('.eraser');
const clearBtn = document.querySelector('.clear-canvas');
const gridControl = document.querySelector('.show-grid-line');
const canActive = [drawBtn, eraserBtn];

document.body.onmousedown = () => {mouseDown = true};
document.body.onmouseup = () => {mouseDown = false};
clearBtn.addEventListener('click', clearCanvas);
drawBtn.addEventListener('click', () => setMode("draw"));
eraserBtn.addEventListener('click', () => setMode("eraser"));
gridControl.addEventListener('click', ()=>{
    showGrid = !showGrid;
    if(showGrid) gridControl.classList.add('btn-active');
    else gridControl.classList.remove('btn-active');
    setGrid();
});

increaseDim.addEventListener('click', () => {
    pixel_row += 2;
    pixel_col += 2;
    if(pixel_col >= MAX_COLS || pixel_row >= MAX_ROWS){
        pixel_row = MAX_ROWS;
        pixel_col = MAX_COLS; 
    }
    canvasGrid.innerHTML = "";
    initialCanvas(pixel_row, pixel_col);
})
decreaseDim.addEventListener('click', () => {
    pixel_row -= 2;
    pixel_col -= 2;
    if(pixel_col <= MIN_COLS || pixel_row <= MIN_ROWS){
        pixel_row = MIN_ROWS;
        pixel_col = MIN_COLS; 
    }
    canvasGrid.innerHTML = "";
    initialCanvas(pixel_row, pixel_col);
})

function setGrid(){
    
    document.querySelectorAll('.pixel').forEach(px => {
        if(showGrid){
            px.classList.add('pixel-grid');
        }
        else{
            px.classList.remove('pixel-grid');
        }
    })
}

// only doing black and white right now, might need to change this later
function setMode(mode){
    if(current_mode === mode) return;
    canActive.forEach(btn => btn.classList.remove('btn-active'));
    current_mode = mode;
    switch(mode){
        default:
        case "draw":
            current_color = DEFAULT_COLOR;
            drawBtn.classList.add('btn-active');
            break;
        case "eraser":
            current_color = "#FFFFFF";
            eraserBtn.classList.add('btn-active');
            break;
    }
}

function clearCanvas(){ 
    document.querySelectorAll('.pixel').forEach(pixel => {
        pixel.style.backgroundColor = "#FFFFFF";
    })
}

function setColor(event){
    if(event.type === 'mouseover' && !mouseDown) return;
    event.target.style.backgroundColor = current_color;
}

function initialCanvas(rows, cols){
    canvasGrid.style.cssText = `grid-template: repeat(${rows},1fr) / repeat(${cols}, 1fr)`
    for(let i = 0; i < rows; ++i){
        for(let j = 0; j < cols; ++j){
            let pixel = document.createElement('div');
            if(showGrid) pixel.classList.add('pixel', 'pixel-grid');
            else pixel.classList.add('pixel');
            pixel.addEventListener('mouseover', setColor);
            pixel.addEventListener('mousedown', setColor);
            canvasGrid.appendChild(pixel);
        }
    }

}

window.onload = () => {
    setMode("draw");
    showGrid = true;
    gridControl.classList.add('btn-active');
    initialCanvas(pixel_row, pixel_col);
};

