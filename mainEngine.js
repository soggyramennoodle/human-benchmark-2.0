//Adeeb Rahman
//CS30 Capstone Project
//This file stores all the core functions of the game.

function draw() {
  background(20);
  gameStateHandler();
}

//---------------------------------------------------------------------------------------

function generateInitialSequence() { //this function generates a sequence at the beginning of the game
  sequence = []; 
  for (let i = 0; i < sequenceLength; i ++) {
    let randomCol = int(random(0, currentGridSize));
    let randomRow = int(random(0, currentGridSize));
    sequence.push([randomCol, randomRow]);
  }
  sequenceComplete = false;
  currentSquare = -1;
}

function extendSequence() { //this function adds to the sequence, as the player progresses
  let randomCol = int(random(0, currentGridSize));
  let randomRow = int(random(0, currentGridSize));
  sequence.push([randomCol, randomRow])
}

//---------------------------------------------------------------------------------------

function mousePressed() {
  if (gameState === 0) { //if the menu button is pressed, initialize the game.
    if (mouseX >= button.x && mouseX <= button.x + button.width && mouseY >= button.y && mouseY <= button.y + button.height) {
      button.growthState = 'growing';
    }
  }
  else if (gameState === 3) { //checks bounds of player input
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height &&  playerSequence.length < sequenceLength) {
      let col = int(mouseX/rectWidth);
      let row = int(mouseY/rectHeight);
      playerSequence.push([col, row]);
      inputSound.play();
      grid[row][col] = 15;
      checkPlayerInput();
    }
  }
}

function checkPlayerInput() { //checks if player input is correct
  let currentCheckedSquare = playerSequence.length -1;
  if (playerSequence[currentCheckedSquare][0] !==  sequence[currentCheckedSquare][0] || playerSequence[currentCheckedSquare][1] !== sequence[currentCheckedSquare][1]) {
    gameState = 5; //sends user to "game over" state
    messageTimerStart = millis();
    return;
  }

  else if (playerSequence.length === sequenceLength) {
    console.log("Sequences match, moving to next phase...");
    sequenceLength++;
    correctSequenceCount++;

    if (sequenceLength >  (currentGridSize - 1)*2) { //this can be changed to make game progress faster or slower
      increaseGridSize();
    }

    else {
      sequenceComplete = false;
      currentSquare = -1;
      extendSequence();
      gameState = 6;
      messageTimerStart = millis();
    }
  }
}

function increaseGridSize() { //self explanatory
  currentGridSize++;
  rectWidth = width/currentGridSize;
  rectHeight = height/currentGridSize;
  initializeGrid();

  while (sequence.length < sequenceLength) {
    let randomCol = int(random(0, currentGridSize));
    let randomRow = int(random(0, currentGridSize));
    sequence.push([randomCol, randomRow]);
  }

  sequenceComplete = false;
  currentSquare = -1;
  gameState = 6; //to delay to show new sequence on new grid
  messageTimerStart = millis();
}

//-------------------------------------------------------------------------------------------

function displayMessage(message) { //displays messages
  noStroke();
  if (message !== lastMessage) {
    currentTextX = width/2;
    currentTextY = 0;
    lastMessage = message;
  }

  let paddingX = 30;
  let paddingY = 20;
  let rectWidth = textWidth(message) + paddingX * 2;
  let rectHeight = paddingY + 75;
  
  currentTextX = lerp(currentTextX, width/2, 0.05);
  currentTextY = lerp(currentTextY, height/10, 0.05); 

  fill(40, 40, 40, 200);
  rect(currentTextX - rectWidth/2, currentTextY - rectHeight/2, rectWidth, rectHeight, 90);

  textAlign(CENTER, CENTER);
  fill(255);
  textSize(45);
  text(message, currentTextX, currentTextY);
}

function resetGame() { //resets the game back to the state it's in when it first starts.
  currentGridSize = 2;
  rectWidth = width/currentGridSize;
  rectHeight = height/currentGridSize;

  sequence = [];
  playerSequence = [];
  sequenceLength = 1;
  sequenceComplete = false;
  currentSquare = -1;
  gameState = 0;
  initializeGrid();
  generateInitialSequence();
  correctSequenceCount = 0;
}


