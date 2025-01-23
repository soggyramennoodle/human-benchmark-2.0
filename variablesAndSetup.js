//This file holds all the global variables, as well as preload, and setup.

//==================VARIABLES RELATED TO UI==================
const button = {
  x: 300,
  y: 350,
  width: 200,
  height: 100,
  targetWidth: 800,
  targetHeight: 800,
  growthState: 'idle',
};

let color1 = 50;
let color2 = 53;
let color3 = 63;

//==================VARIABLES RELATED TO GRID AND SCALING==================
let currentGridSize = 2;
let sequenceLength = 1; //length of sequence, should increase with dififculty 
let grid = []; //needs to start empty, to enable dynamic changing during game. initial setup in setup().
let sequence = []; //stores sequence in order
let playerSequence = [];

//==================VARIABLES RELATED TO HIGHLIGHTING==================
let highlightDurationLength = 650;
let highlightStartTime;
let currentSquare = -1;
let highlightState = "off";
let sequenceComplete = false;

//==================VARIABLES RELATED TO GAMESTATE==================
let gameState = 0; 
//1 = show sequence
//2 = transition to show "your turn"
//3 player input
//4 transition to check playerSequence
//5 either reset or continue, etc...
//6 delay

//==================VARIABLES RELATED TO MESSAGES==================
let messageTimerStart; 
let messageShowDuration = 3000;
let currentTextX;
let currentTextY;
let lastMessage = '';

let readingDelay = 2000;
let readingDelayStartTime = 0;
let readingDelayState = "off";

//==================OTHER VARIABLES==================
let rectWidth, rectHeight;
let customFont;
let correctSequenceCount = 0;

/////////////////////////////////////FUNCTIONS///////////////////////////////////////////////

function preload() {
  customFont = loadFont('assets/SFPRODISPLAYMEDIUM.otf');
  attentionSound = loadSound('assets/Attention to Sequence.mp3');
  inputSound = loadSound('assets/Clicking Sequence.ogg');
  showingSound = loadSound('assets/Showing Sequence.mp3');
  correctSound = loadSound('assets/Correct Sequence.wav');
  incorrectSound = loadSound('assets/Incorrect Sequence.wav');
}

function setup() {
  createCanvas(800, 800);
  rectWidth = width/currentGridSize;
  rectHeight = height/currentGridSize;
  stroke(255);
  textFont(customFont);
  initializeGrid();
  generateInitialSequence(); //generates sequence, need to find way to put in draw, to add onto sequence
  messageTimerStart = millis();
  displayMenu();
}

function displayMenu() {
  noStroke();
  textAlign(CENTER, CENTER);  
  textSize(75);
  fill(255);
  text('Brain Trainer', width/2, height/3); 

  if (button.growthState === 'idle') { //button hasn't been clicked yet.
    fill(color1, color2, color3);
    rect(button.x, button.y, button.width, button.height, 20);
    textSize(35);
    fill(255);
    text('Begin', button.x + button.width/2, button.y + button.height / 2); 
  }
  else if (button.growthState === 'growing') { //button clicked.
    button.width = lerp(button.width, button.targetWidth, 0.05);
    button.height = lerp(button.height, button.targetHeight, 0.05);
    button.x = lerp(button.x, 0, 0.05); 
    button.y = lerp(button.y, 0, 0.05);
    //TRYING TO MAKE COLOR GRADUALLY CHANGE TO GRID COLOR
    color1 = lerp(color1, 20, 0.05);
    color2 = lerp(color2, 20, 0.05);
    color3 = lerp(color3, 20, 0.05);
    if (button.width >= button.targetWidth - 1 && button.height >= button.targetHeight  - 1) {
      gameState = 1;
    }

    fill(color1, color2, color3);
    rect(button.x, button.y, button.width, button.height);
  }
}

function initializeGrid() {
  grid = [];
  for (let y = 0; y < currentGridSize; y++) {
    let row = [];
    for (let x = 0; x < currentGridSize; x++) {
      row.push(0);
    }
    grid.push(row); 
  }
}

function drawGrid() {
  stroke(255);
  for (let x = 0; x < currentGridSize; x++) {
    for (let y = 0; y < currentGridSize; y++) {
      if (grid[y][x] > 0) {
        grid[y][x] -= 1;
        fill(grid[y][x] * 17);
      }
      else {
        fill(20);
      }
      rect(x*rectWidth, y*rectHeight, rectWidth, rectHeight);
    }
  }
}


