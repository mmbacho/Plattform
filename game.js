//Classes
class Player {
    constructor(width, height, posX, posY, gravity, jumpSpeed, numOfJumps, jumpsAllowed, image) {
    this.width = width;
    this.height = height;
    this.posX = posX;
    this.posY = posY;
    this.gravity = gravity;
    this.gravitySpeed = 0;
    this.jumpSpeed = jumpSpeed;
    this.speedY = 0;
    this.numOfJumps = numOfJumps;
    this.jumpsAllowed = jumpsAllowed;
    this.score = 0;
    this.image = image;
  }
}

class Platform { 
    constructor(width, height, posX, posY, image) {
    this.width = width;
    this.height = height;
    this.posX = posX;
    this.posY = posY;
    this.speedX = -0.5;
    this.image = image;
    this.isGivenPoint = false;
  }
}

let canvas = document.getElementById("canvas");
canvas.width = 1000;
canvas.height = 500;

yCenterCoord = canvas.height / 2;
xCenterCoord = canvas.width / 2;

let context = canvas.getContext("2d");

const platformImage = new Image();
platformImage.src = "platform.png";

const img = new Image();
img.src = "background.png";
img.onload = () => {
  context.drawImage(img, 0, 0);
};
context.fillRect(0, 0, canvas.width, canvas.height);


//Game area
const platformSpawnX = canvas.width - 300;
const endOfScreen = -100;
const groundLevel = canvas.height
const roofLevel = 0;

let highscore = 0;
let isGameOver = false

//Game UI
let scoreDiv = document.getElementById("score");
let highscoreDiv = document.getElementById("highscore");
let game = document.getElementById("game_elements");
let menu = document.getElementById("menu_elements");

//Player var
const spawnpointX = xCenterCoord;
const spawnpointY = yCenterCoord;
const gravity = 0.05;
const playerHitboxWidth = 50
const playerHitboxheight = 45

//Default character
let chosenCharacter = "goose.png";

//Platform var
const platformDefaultSpawnLevel = yCenterCoord + 100;
const platformVelocityX = -0.5;
const spawnpointXDiviation = 200;
const spawnpointYDiviation = 20;
const platformHitboxWidth = 100
const platformHitboxHeight= 30

// Objects

let player = new Player(
  playerHitboxWidth,
  playerHitboxheight,
  xCenterCoord,
  yCenterCoord - 100,
  gravity,
  -3,
  0,
  2,
  chosenCharacter
);
let platform1 = new Platform(
  platformHitboxWidth,
  platformHitboxHeight,
  xCenterCoord,
  platformDefaultSpawnLevel
);
let platform2 = new Platform(
  platformHitboxWidth,
  platformHitboxHeight,
  xCenterCoord + 200,
  platformDefaultSpawnLevel
);
let platform3 = new Platform(
  platformHitboxWidth,
  platformHitboxHeight,
  xCenterCoord + 400,
  platformDefaultSpawnLevel
);
let platform4 = new Platform(
  platformHitboxWidth,
  platformHitboxHeight,
  xCenterCoord + 600,
  platformDefaultSpawnLevel
);
let platform5 = new Platform(
  platformHitboxWidth,
  platformHitboxHeight,
  xCenterCoord + 800,
  platformDefaultSpawnLevel
);
let platform6 = new Platform(
  platformHitboxWidth,
  platformHitboxHeight,
  xCenterCoord + 1000,
  platformDefaultSpawnLevel
);

const platforms = [
  platform1,
  platform2,
  platform3,
  platform4,
  platform5,
  platform6,
];

// menu js
const goose = document.getElementById("goose");
const owl = document.getElementById("owl");
const eagle = document.getElementById("eagle");
const swan = document.getElementById("swan");

function chooseCharacter(selectedCharacter) {
  chosenCharacter = selectedCharacter.getAttribute("src");
}

//game js

function restartGame() {
  player.posX = spawnpointX;
  player.posY = spawnpointY - 100;
  player.gravity = gravity;
  player.gravitySpeed = 0;
  player.speedY = 0;
  player.numOfJumps = 0;
  player.score = 0;
  displayScore();

  isGameOver = false;

  randomizePlatformPos();
}

function displayScore() {
  scoreDiv.innerHTML = "Score: " + player.score;
}

function displayHighscore() {
  highscoreDiv.innerHTML = "Highscore: " + highscore;
}

function randomizePlatformPos() {
  for (let i = 0; i < platforms.length; i++) {
    let plat = platforms[i];

    plat.posX = spawnpointX + spawnpointXDiviation * i;
    plat.posY = generateNewPosY();
    plat.speedX = platformVelocityX;
    plat.isGivenPoint = false;
  }
}

function drawEntity() {
  let image = new Image();
  image.src = player.image;

  context.drawImage(
    image,
    player.posX,
    player.posY,
    player.width,
    player.height
  );

  for (let i = 0; i < platforms.length; i++) {
    let plat = platforms[i];

    context.drawImage(
      platformImage,
      plat.posX,
      plat.posY,
      plat.width,
      plat.height
    );

    if (plat.posX < xCenterCoord && plat.isGivenPoint == false) {
      player.score += 1;
      displayScore();
      plat.isGivenPoint = true;
    }
  }
}

//Clears screen every frame
function clearScreen() {
  context.drawImage(img, 0, 0);
}

function gameOver() {
  player.gravity = 0;
  player.gravitySpeed = 0;
  player.speedY = 0;

  isGameOver = true;

  scoreDiv.innerHTML = "GAME OVER";

  if (player.score > highscore) {
    highscore = player.score;
    displayHighscore();
  }

  for (let k = 0; k < platforms.length; k++) {
    const plat = platforms[k];
    plat.speedX = 0;
  }
}

function collisionDetection() {
  for (let r = 0; r < platforms.length; r++) {
    const b = platforms[r];
    if (
      player.posX > b.posX - player.width &&
      player.posX < b.posX + b.width &&
      player.posY + player.height > b.posY + 5 &&
      player.posY < b.posY + b.height
    ) {
      gameOver();
    } else if (
      player.posX > b.posX - player.width &&
      player.posX < b.posX + b.width &&
      player.posY + player.height > b.posY &&
      player.posY < b.posY + b.height
    ) {
      player.gravitySpeed = 0;
      player.speedY = 0;
      player.posY = b.posY - player.height;
      player.numOfJumps = 0;
      player.image = chosenCharacter;
    }
  }

  if (player.posY + player.height > groundLevel || player.posY < roofLevel) {
    gameOver();
  }
}

function generateNewPos(plat) {
  newPosY = generateNewPosY();
  plat.posY = newPosY;
  plat.posX = canvas.width + 100;
  plat.isGivenPoint = false;
}

function generateNewPosY() {
  let heightDiviation = 150 * Math.random();
  let newPosY = 200 + heightDiviation;
  return newPosY;
}

function updateEntityPos() {
  player.gravitySpeed += player.gravity;
  player.posY += player.speedY + player.gravitySpeed;

  for (let c = 0; c < platforms.length; c++) {
    let plat = platforms[c];
    plat.posX += plat.speedX;

    if (plat.posX < endOfScreen) {
      generateNewPos(plat);
    }
  }
}

function jump() {
  if (player.numOfJumps < 2 && isGameOver === false) {
    player.gravitySpeed = 0;
    player.speedY = player.jumpSpeed;
    player.numOfJumps += 1;
    player.image = "flying" + chosenCharacter;
  }
}

document.onkeydown = function (e) {
  const key = e.key;
  switch (key) {
    case "w":
      jump();

      break;
  }
};


// Main Update Function
function update() {
  clearScreen();
  drawEntity();
  updateEntityPos();
  collisionDetection();
}

function startGame() {
  menu.style.display = "none";
  game.style.display = "block";

  randomizePlatformPos();
  setInterval(update, 10);
}
