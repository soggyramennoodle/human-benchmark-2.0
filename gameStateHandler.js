//Handles gameStates

function gameStateHandler() {
  if (gameState === 1) { //show sequence
    highlightSequence();
    displayMessage("Watch Carefully");

    if (sequenceComplete === true) {
      messageTimerStart = millis();
      gameState = 2;
    }
  }

  else if (gameState === 2) { //transition to player input
    displayMessage("Your Turn");
    if (millis() - messageTimerStart > messageShowDuration ) {
      gameState = 3;
    }
  }

  else if (gameState === 3) {
    //player input phase
  }

  //i had gameState 4 here, but because the difficulty increase works, there is no point in having game over, restart, since the game
  //continues until the player loses, hence going to state 5. 

  else if (gameState === 5) { //if player input is wrong
    displayMessage("Uh oh!");
    if (millis() - messageTimerStart > messageShowDuration) {
      resetGame();
    }
  }

  else if (gameState === 6) { //delay phase after player input
    displayMessage("Correct! Get Ready...");
    if (millis() - messageTimerStart > 1000) {
      gameState = 1;
    }
  }
}