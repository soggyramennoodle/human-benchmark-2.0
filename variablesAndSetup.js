//This file holds all the global variables, as well as preload, and setup.

let NUM_ROWS = 2;
let NUM_COLS = 2;
let rectWidth, rectHeight;
let currentRow, currentCol;
let customFont;

//-----------GAME SETUP-------------
let grid = []; //needs to start empty, to enable dynamic changing during game. initial setup in setup().
let sequence = []; //stores sequence in order
let playerSequence = [];
let sequenceLength = 1; //length of sequence, should increase with dififculty 

//----------------HIGHLIGHTING-----------------
let highlightDurationLength = 650;
let highlightStartTime;
let currentSquare = -1;
let highlightElapsedTime;
let highlightState = "off";
let highlightOffDuration = 200;
let sequenceComplete = false;

//------------------GAME STATES------------------
let gameState = 1; 
//1 = show sequence
//2 = transition to show "your turn"
//3 player input
//4 transition to check playerSequence
//5 either reset or continue, etc...

//-------------MESSAGE VARIABLES---------------
let messageTimerStart;
let messageShowDuration = 1000;

/////////////////////////////////////FUNCTIONS///////////////////////////////////////////////

function preload() {
  customFont = loadFont('assets/SFPRODISPLAYBOLD.OTF');
}


function setup() {
  createCanvas(800, 800);
  rectWidth = width/NUM_COLS;
  rectHeight = height/NUM_ROWS;
  stroke(255);
  textFont(customFont);
  initializeGrid();
  generateSequence(); //generates sequence, need to find way to put in draw, to add onto sequence
  messageTimerStart = millis();
}

function initializeGrid() {
  for (let y = 0; y < NUM_ROWS; y++) {
    let row = [];
    for (let x = 0; x < NUM_COLS; x++) {
      row.push(0);
    }
    grid.push(row);
  }
}

function drawGrid() {
  for (let x = 0; x < NUM_COLS; x++) {
    for (let y = 0; y < NUM_ROWS; y++) {
      if (grid[y][x] > 0) {
        grid[y][x] -= 1;
        fill(grid[y][x] * 17);
      }
      else {
        fill(20);
      }
      rect(x*rectWidth, y*rectHeight, rectWidth, rectHeight);
    }
  }
}
