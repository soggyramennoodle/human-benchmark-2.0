//Handles gameStates

function gameStateHandler() {
  if (gameState === 0) {
    displayMenu();
  }
  else if (gameState === 1) { //show sequence
    drawGrid();
    if (readingDelayState === "off") {
      readingDelayStartTime = millis();
      readingDelayState = "on";
      attentionSound.play();
    }
    displayMessage("Watch Carefully");

    if (millis() - readingDelayStartTime > readingDelay) {
      highlightSequence(); //allows user to read text on screen, before highlighting begins, to make game less painful

    }

    if (sequenceComplete === true) {
      messageTimerStart = millis();
      readingDelayState = "off";
      gameState = 2;
    }
  }

  else if (gameState === 2) { //transition to player input
    drawGrid();
    displayMessage("Your Turn");
    if (millis() - messageTimerStart > messageShowDuration ) {
      gameState = 3;
    }
  }

  else if (gameState === 3) {
    drawGrid();
    //player input phase
  }

  //had gameState 4 here, but because the difficulty increase works, there is no point in having game over, restart, since the game
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

  else if (gameState === 6) { //delay phase after player input
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