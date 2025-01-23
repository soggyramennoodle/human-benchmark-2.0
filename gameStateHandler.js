//Handles gameStates

function gameStateHandler() { //handles all the interactions and handoffs between game states
  if (gameState === 0) {
    displayMenu();
  }
  else if (gameState === 1) { //sequence is shown 
    drawGrid();
    if (readingDelayState === "off") {
      readingDelayStartTime = millis();
      readingDelayState = "on";
      attentionSound.play();
    }
    displayMessage("Watch Carefully");

    if (millis() - readingDelayStartTime > readingDelay) { //gives the reader time to read text on screen
      highlightSequence();

    }

    if (sequenceComplete === true) {
      messageTimerStart = millis();
      readingDelayState = "off";
      gameState = 2;
    }
  }

  else if (gameState === 2) { //begin to transition to player input
    drawGrid();
    displayMessage("Your Turn");
    if (millis() - messageTimerStart > messageShowDuration ) {
      gameState = 3;
    }
  }

  else if (gameState === 3) { //this is the phase when player inputs their sequence
    drawGrid();
  }

  //had gameState 4 here, but because the difficulty increase works, there is no point in having game over, restart button, since the game
  //continues until the player loses, hence going to state 5. 

  else if (gameState === 5) { //if player input is wrong
    drawGrid();
    displayMessage("Uh oh! Here's your score:" + " " + correctSequenceCount + " " + "levels");
    if (incorrectSound.isPlaying() === false) {
      incorrectSound.play();
    }
    if (millis() - messageTimerStart > messageShowDuration) {
      resetGame();
      gameState = 0;
      button.growthState = "idle";
      button.x = 300;
      button.y = 350;
      button.width = 200;
      button.height = 100;
      color1 = 50;
      color2 = 53;
      color3 = 63;
    }
  }

  else if (gameState === 6) { //delay phase after player input, gives player time to chill
    drawGrid();
    displayMessage("Correct! Get Ready...");
    if (correctSound.isPlaying() === false) {
      correctSound.play();
    } 
    if (millis() - messageTimerStart > 2000) {
      readingDelayState = "off";
      gameState = 1;
    }
  }
}