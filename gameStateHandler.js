//Handles gameStates

function gameStateHandler() {
  if (gameState === 1) {
    highlightSequence();
    displayMessage("Watch Carefully");

    if (sequenceComplete === true) {
      messageTimerStart = millis();
      gameState = 2;
    }
  }

  else if (gameState === 2) {
    displayMessage("Your Turn");
    if (millis() - messageTimerStart > messageShowDuration ) {
      gameState = 3;
    }
  }

  else if (gameState === 3) {
    //player input phase
  }

  else if (gameState === 4) {
    textSize(32);
    fill(255);
    textAlign(CENTER, CENTER);
    text("Game over! Click to restart", width/2, height/2); //need to eventually make a button to restart, rather than screen click
  }

  else if (gameState === 5) {
    displayMessage("Uh oh!");
    if (millis() - messageTimerStart > 2000) {
      resetGame();
    }
  }
}