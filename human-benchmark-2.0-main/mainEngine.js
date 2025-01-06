//Adeeb Rahman
//CS30 Capstone Project


function draw() {
  background(20);
  drawGrid();
  gameStateHandler();
}

//---------------------------------------------------------------------------------------

function generateSequence() {
  sequence = [];                                                                   //empty sequence at start, generation occurs in setup()
  sequenceLength = 4;                                                                                     ///CONSTANT length for testing
  for (let i = 0; i < sequenceLength; i ++) {
    let randomCol = int(random(0, NUM_COLS));
    let randomRow = int(random(0, NUM_ROWS));
    sequence.push([randomCol, randomRow]);
  }
  console.log(sequence);                                                                      //here to allow troubleshooting related to sequence
}

//---------------------------------------------------------------------------------------

function mousePressed() {
  if (gameState === 3) {
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height &&  playerSequence.length < sequenceLength) {
      let col = int(mouseX/rectWidth);
      let row = int(mouseY/rectHeight);

      playerSequence.push([col, row]);
      checkPlayerInput();
    }
  }
}

function checkPlayerInput() { //THIS FUNCTION IS WIP ISSUE IS HERE
  let currentCheckedSquare = playerSequence.length -1;

  if (playerSequence[currentCheckedSquare][0] !==  sequence[currentCheckedSquare][0] || playerSequence[currentCheckedSquare][1] !== sequence[currentCheckedSquare][1]) {
    gameState = 5;
    messageTimerStart = millis();
    return;
  }
  else if (playerSequence.length === sequenceLength) {
    console.log("Sequences match, moving to next phase...")
    gameState = 4; //ends the game here for extremely basic functionality, but we want the game to continue with harder sequences.
  }
}

//-------------------------------------------------------------------------------------------

function displayMessage(message) { //may need to figure out how to put this into html/css for better design
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(32);
  text(message, width/2, height/2);
}

function resetGame() {
  sequence = [];
  playerSequence = [];
  sequenceLength = 4;
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

