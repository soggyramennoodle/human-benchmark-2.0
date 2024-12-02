// human benchmark 2.0
// Adeeb Rahman
// 12.2.2024
//
// CAPSTONE PROJECT

let NUM_ROWS = 4;
let NUM_COLS = 4;
let rectWidth, rectHeight;
let currentRow, currentCol;
let grid = [[0,0,0,0],
                   [0,0,0,0],
                   [0,0,0,0],
                   [0,0,0,0]];

function setup() {
  createCanvas(1000, 700);
  rectWidth = width/NUM_COLS;
  rectHeight = height/NUM_ROWS;
  stroke(255);
}

function draw() {
  background(20);
  drawGrid();
  coordinate(); //testing coordinates of grid
}

function drawGrid() {
  for (let x = 0; x < NUM_COLS; x++) {
    for (let y = 0; y < NUM_ROWS; y++) {
      fill(grid[y][x]);
      rect(x*rectWidth, y*rectHeight, rectWidth, rectHeight);
    }
  }
}

function generateSequence() {
  for ()
}


///////////////////////--------TESTING CORNER-----------//////////////////////////
function coordinate() {
  if (mouseX >=0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    let gridX = (mouseX / rectWidth);
    let gridY = (mouseY / rectHeight);
    console.log(gridX, gridY);
  }
}

