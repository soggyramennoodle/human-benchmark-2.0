//Adeeb Rahman
//CS30 Capstone Project
//This file stores all the core functions of the game.


function draw() {
  background(20);
  drawGrid();
  gameStateHandler();
}

//---------------------------------------------------------------------------------------

function generateInitialSequence() { //this function generates a sequence at the beginning of the game
  sequence = [];  //empty sequence at start, generation occurs in setup()
  for (let i = 0; i < sequenceLength; i ++) {
    let randomCol = int(random(0, currentGridSize));
    let randomRow = int(random(0, currentGridSize));
    sequence.push([randomCol, randomRow]);
  }
  sequenceComplete = false;
  currentSquare = -1;
  console.log(sequence); //here for debugging purposes
}

function extendSequence() { //this function adds to the sequence, as the player progresses
  let randomCol = int(random(0, currentGridSize));
  let randomRow = int(random(0, currentGridSize));
  sequence.push([randomCol, randomRow]);
  console.log(sequence); //here for debugging purposes
}

//---------------------------------------------------------------------------------------

function mousePressed() {
  if (gameState === 3) {
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height &&  playerSequence.length < sequenceLength) {
      let col = int(mouseX/rectWidth);
      let row = int(mouseY/rectHeight);
      playerSequence.push([col, row]);
      grid[row][col] = 15;
      checkPlayerInput();
    }
  }
}

function checkPlayerInput() { 
  let currentCheckedSquare = playerSequence.length -1;
  if (playerSequence[currentCheckedSquare][0] !==  sequence[currentCheckedSquare][0] || playerSequence[currentCheckedSquare][1] !== sequence[currentCheckedSquare][1]) {
    gameState = 5; //game over state
    messageTimerStart = millis();
    return;
  }

  else if (playerSequence.length === sequenceLength) {
    console.log("Sequences match, moving to next phase...");
    sequenceLength++;

    if (sequenceLength >  currentGridSize*currentGridSize) {
      increaseGridSize();
    }

    else {
    sequenceComplete = false;
    currentSquare = -1;
    extendSequence();
    gameState = 6; //go to delay state, to transition to another phase.
    messageTimerStart = millis();
    }
  }
}

function increaseGridSize() {
  //increases grid size
  currentGridSize++;
  rectWidth = width/currentGridSize;
  rectHeight = height/currentGridSize;
  initializeGrid();

  //resets sequence, almost fresh start of game, but not really
  sequenceLength = 1;
  playerSequence = [];
  sequence = []; 
  generateInitialSequence();
  sequenceComplete = false;
  currentSquare = -1;
  gameState = 6; //to delay to show new sequence on new grid
  messageTimerStart = millis();
}

//-------------------------------------------------------------------------------------------

function displayMessage(message) { //may need to figure out how to put this into html/css for better design
  if (message !== lastMessage) {
    currentTextX = width/2;
    currentTextY = 0;
    lastMessage = message;
  }

  textAlign(CENTER, CENTER);
  fill(149, 6, 6);
  textSize(75);
  currentTextX = lerp(currentTextX, width/2, 0.05);
  currentTextY = lerp(currentTextY, height/6.5, 0.05); //easing into screen only works at very beginning, need to find a way to make it work throughout.
  text(message, currentTextX, currentTextY);
}

function resetGame() {
  //have to reset grid size, sequence, playerSequence, everything back to original
  currentGridSize = 2;
  rectWidth = width/currentGridSize;
  rectHeight = height/currentGridSize;

  sequence = [];
  playerSequence = [];
  sequenceLength = 1;
  sequenceComplete = false;
  currentSquare = -1;
  gameState = 1;
  initializeGrid();
  generateInitialSequence();
}


///////////////////////--------TESTING CORNER-----------//////////////////////////

function testCoordinate() { //used to test grid coordinate system
  if (mouseX >=0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    let gridX = int(mouseX / rectWidth);
    let gridY = int(mouseY / rectHeight);
    console.log(gridX, gridY);
  }
}

