//Adeeb Rahman
//CS30 Capstone Project


function draw() {
  background(20);
  drawGrid();
  gameStateHandler();
}

//---------------------------------------------------------------------------------------

function generateSequence() {
  sequence = [];  //empty sequence at start, generation occurs in setup()
  for (let i = 0; i < sequenceLength; i ++) {
    let randomCol = int(random(0, NUM_COLS));
    let randomRow = int(random(0, NUM_ROWS));
    sequence.push([randomCol, randomRow]);
  }
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
    sequenceComplete = false;
    currentSquare = -1;
    generateSequence();
    gameState = 6; //go to delay state, to transition to another phase.
    messageTimerStart = millis();
  }
}

//-------------------------------------------------------------------------------------------

function displayMessage(message) { //may need to figure out how to put this into html/css for better design
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(75);
  currentTextX = lerp(currentTextX, width/2, 0.05);
  currentTextY = lerp(currentTextY, height/6.5, 0.05); //easing into screen only works at very beginning, need to find a way to make it work throughout.
  text(message, currentTextX, currentTextY);
}

function resetGame() {
  sequence = [];
  playerSequence = [];
  sequenceLength = 1;
  sequenceComplete = false;
  currentSquare = -1;
  gameState = 1;
  generateSequence();
}



///////////////////////--------TESTING CORNER-----------//////////////////////////

function testCoordinate() { //used to test grid coordinate system
  if (mouseX >=0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    let gridX = int(mouseX / rectWidth);
    let gridY = int(mouseY / rectHeight);
    console.log(gridX, gridY);
  }
}

