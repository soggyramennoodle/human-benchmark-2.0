// human benchmark 2.0
// Adeeb Rahman
// 12.2.2024
//
// CAPSTONE PROJECT


/////////////////GLOBAL VARIABLES///////////////////

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
let messageTimerStart = millis();
let messageShowDuration = 1000;

/////////////////////////////////////FUNCTIONS///////////////////////////////////////////////

function preload() {
  customFont = loadFont('assets/SFPRODISPLAYBOLD.OTF');
}
//---------------------------------------------------------------------------------------
function setup() {
  createCanvas(800, 700);
  rectWidth = width/NUM_COLS;
  rectHeight = height/NUM_ROWS;
  stroke(255);
  textFont(customFont);
  generateSequence(); //generates sequence, need to find way to put in draw, to add onto sequence
}
//---------------------------------------------------------------------------------------
function draw() {
  background(20);
  drawGrid();
  
  //game state handling (might move to function)
  if (gameState === 1) {
    highlightSequence();
    displayMessage("Watch Carefully");

  //   if (sequenceComplete === true) {
  //     console.log('Sequence highlighting complete. Expecting user input soon...');                                         //NOT PART OF PROGRAM
  //   }
  // }
  }
  else if (gameState === 2) {
    displayMessage("Your Turn");
    if (millis() - messageTimerStart > messageShowDuration ) {
      gameState = 3;
    }
  }

  else if (gameState === 3) {
    // checkPlayerInput();
  }

  else if (gameState === 4) {
    textSize(32);
    fill(255);
    textAlign(CENTER, CENTER);
    text("Game over! Click to restart", width/2, height/2); //need to eventually make a button to restart, rather than screen click
  }
}
//---------------------------------------------------------------------------------------
function drawGrid() {
  for (let x = 0; x < NUM_COLS; x++) {
    for (let y = 0; y < NUM_ROWS; y++) {
      fill(grid[y][x]);
      rect(x*rectWidth, y*rectHeight, rectWidth, rectHeight);
    }
  }
}
//---------------------------------------------------------------------------------------
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
//---------------------------------------------------------------------------------------
function highlightSequence() { 
  if (sequenceComplete === true) {
    return;
  }

  if (currentSquare === -1) { 
    currentSquare = 0;
    highlightStartTime = millis();
    highlightState = "on";
  }

  if (currentSquare >= 0 && currentSquare < sequenceLength) {
    let col = sequence[currentSquare][0];
    let row = sequence[currentSquare][1];

    if (highlightState === "on") {
      highlightSquare(col, row); //grabs coordinates of a square in sequence, highlights the square.

      if (millis() - highlightStartTime > highlightDurationLength) {
        highlightState = "off";
        highlightStartTime = millis();
      }
    }

    else if (highlightState === "off") {
      if (millis() - highlightStartTime > highlightDurationLength) {
        highlightState = "on";
        currentSquare++;
        highlightStartTime = millis();
      }
    }
  }

  else if (currentSquare >= sequenceLength) {
    completeSequenceHighlight();
  }
}
//---------------------------------------------------------------------------------------
function highlightSquare(col, row) {
  fill(255);
  rect(col*rectWidth, row*rectHeight, rectWidth, rectHeight);
}
//---------------------------------------------------------------------------------------
function completeSequenceHighlight() {
  sequenceComplete = true;
  gameState = 2;
  playerSequence = [];
}
//---------------------------------------------------------------------------------------
function mousePressed() {
  if (gameState === 2) {
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height &&  playerSequence.length < sequenceLength) {
      let col = int(mouseX/rectWidth);
      let row = int(mouseY/rectHeight);

      playerSequence.push([col, row]);
    }
  }
}

function checkPlayerInput() { //THIS FUNCTION IS WIP
  let currentCheckedSquare = playerSequence.length - 1;
  if (playerSequence[currentCheckedSquare][0] !== player)
}
//-------------------------------------------------------------------------------------------
function displayMessage(message) { //may need to figure out how to put this into html/css for better design
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(32);
  text(message, width/2, height/2);
}




///////////////////////--------TESTING CORNER-----------//////////////////////////

function testCoordinate() { //used to test grid coordinate system
  if (mouseX >=0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    let gridX = int(mouseX / rectWidth);
    let gridY = int(mouseY / rectHeight);
    console.log(gridX, gridY);
  }
}

