//This file holds all the global variables, as well as preload, and setup.

//================VARIABLES RELATED TO UI==================
let menuTitle;
let menuButtonX;
let menuButtonY;
let menuButtonWidth;
let menuButtonHeight;
let menuTitleX;
let menuTitleY;
let startTransition = false;

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
let highlightElapsedTime;
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
let currentRow, currentCol;
let customFont;

/////////////////////////////////////FUNCTIONS///////////////////////////////////////////////

function preload() {
  customFont = loadFont('assets/SCHABO-Condensed.otf');
  attentionSound = loadSound('assets/Attention to Sequence.mp3');
  inputSound = loadSound('assets/Clicking Sequence.ogg');
  showingSound = loadSound('assets/Showing Sequence.mp3');
  correctSound = loadSound('assets/Correct Sequence.wav')
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
  initializeMenu();
}

function drawMenu() {
  background(20);
  textAlign(CENTER, CENTER);

  //for the title
  textSize(64);
  fill(225);
  text('Brain Trainer', menuTitleX, menuTitleY);

  //for the button
  textSize(32);
  fill(100, 106, 113);
  rect(menuButtonX, menuTitleY + 100, menuButtonWidth, menuButtonHeight, 10);
  fill(255);
  text('Start', menuButtonX + menuButtonWidth/2, menuTitleY + menuButtonHeight/2 + 100);


  if (startTransition === true) {
    menuTitleX = lerp(menuTitleX, width/2, 0.05);
    menuTitleY = lerp(menuTitleY, height + 200, 0.05);
    if (menuTitleY > height + 100) {
      gameState = 1;
    }
  }
}

function initializeMenu() {
  menuTitle = 'Brain Trainer';
  menuButtonWidth = 200;
  menuButtonHeight = 50;
  menuButtonX = width/2 - menuButtonWidth / 2;
  menuTitleX = width/2;
  menuTitleY = height/3;
  menuButtonY = menuTitleY + 100;
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


