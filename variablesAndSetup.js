//This file holds all the global variables, as well as preload, and setup.

let NUM_ROWS = 4;
let NUM_COLS = 4;
let rectWidth, rectHeight;
let currentRow, currentCol;
let customFont;

//-----------GAME SETUP-------------
let grid = [[0,0,0,0],
                   [0,0,0,0],
                   [0,0,0,0],
                   [0,0,0,0]];
let sequence = []; //stores sequence in order
let sequenceLength; //length of sequence, should increase with dififculty 

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


//---------------PLAYER INPUT-----------------
let playerSequence = [];

//---------------GAME DIFFICULTY---------------
let gameDifficulty = 0;

//-------------MESSAGE VARIABLES---------------
let messageTimerStart;
let messageShowDuration = 1000;

/////////////////////////////////////FUNCTIONS///////////////////////////////////////////////

function preload() {
  customFont = loadFont('assets/SFPRODISPLAYBOLD.OTF');
}


function setup() {
  createCanvas(800, 700);
  rectWidth = width/NUM_COLS;
  rectHeight = height/NUM_ROWS;
  stroke(255);
  textFont(customFont);
  generateSequence(); //generates sequence, need to find way to put in draw, to add onto sequence
  messageTimerStart = millis();
}

function drawGrid() {
  for (let x = 0; x < NUM_COLS; x++) {
    for (let y = 0; y < NUM_ROWS; y++) {
      if (grid[y][x] > 0) {
        grid[y][x] -= 1;
        fill(255);
      }
      else {
        fill(grid[y][x]);
      }
      rect(x*rectWidth, y*rectHeight, rectWidth, rectHeight);
    }
  }
}
