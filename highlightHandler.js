//This file stores all the functions related to highlighting the squares on screen.

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
  playerSequence = [];
}


