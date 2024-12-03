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

let sequence = []; //stores sequence in order
let sequenceLength; //length of sequence, should increase with dififculty 

function setup() {
  createCanvas(1000, 700);
  rectWidth = width/NUM_COLS;
  rectHeight = height/NUM_ROWS;
  stroke(255);
  generateSequence(); //generates sequence, need to find way to put in draw, to add onto sequence
}

function draw() {
  background(20);
  drawGrid();

  // testCoordinate(); //testing coordinates of grid
  
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
  sequence = []; //empty sequence at start, want generation in setup
  sequenceLength = 4; ///set length for testing
  for (let i = 0; i < sequenceLength; i ++) {
    let randomCol = int(random(0, NUM_COLS));
    let randomRow = int(random(0, NUM_ROWS));
    sequence.push([randomCol, randomRow]);
  }
  console.log(sequence); //here for testing sequence generation
}

function highlightSequence() {
  for (let i = 0; i < sequenceLength; i++) {
    
  }
}


///////////////////////--------TESTING CORNER-----------//////////////////////////

// function testCoordinate() { //used to test grid coordinate system
//   if (mouseX >=0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
//     let gridX = int((mouseX / rectWidth));
//     let gridY = int((mouseY / rectHeight));
//     console.log(gridX, gridY);
//   }
// }

