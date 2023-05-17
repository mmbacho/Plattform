//Klasser
class Player{
    constructor(tag, color, width, height, posX, posY, gravity, jumpSpeed, numOfJumps, jumpsAllowed, numOfPoints){
        this.tag = "player"
        this.color = color
        this.width = width
        this.height = height
        this.posX = posX
        this.posY = posY
        this.gravity = gravity
        this.gravitySpeed = 0
        this.jumpSpeed = jumpSpeed
        this.speedY = 0
        this.numOfJumps = numOfJumps
        this.jumpsAllowed = jumpsAllowed
        this.numOfPoints = numOfPoints
    }
}


class Platform{
    constructor(tag, color, width, height, posX, posY){
        this.tag = "platform"
        this.color = color
        this.width = width
        this.height = height
        this.posX = posX
        this.posY = posY
        this.speedX = -0.5
        this.speedY = 0
        this.gravity = 0
        this.gravitySpeed = 0
    }
}
// canvas.width = window.innerWidth
// canvas.height = window.innerHeight

let canvas = document.getElementById("canvas")
canvas.width = 1000
canvas.height = 500

yCenterCoord = canvas.height / 2
xCenterCoord = canvas.width / 2

let context = canvas.getContext("2d")

const img = new Image()
img.src = "background.png"
img.onload = () => {
    context.drawImage(img, 0,0)
}
context.fillRect(0, 0, canvas.width, canvas.height)

platformDefaultSpawnLevel = yCenterCoord + 100

const gravity = 0.05
let isOnGround = false
let isGameOver = false
const platformSpawnX = canvas.width - 300
const endOfScreen = -100
const groundLevel = canvas.height-100
let roofLevel = 0

let score = document.getElementById("score")





let player = new Player("player", "red", 50, 50, xCenterCoord, yCenterCoord - 100, gravity, -3, 0, 2, 0)
let platform1 = new Platform("platform", "blue", 100, 30, xCenterCoord, platformDefaultSpawnLevel)
let platform2 = new Platform("platform", "blue", 100, 30, xCenterCoord + 200, platformDefaultSpawnLevel)
let platform3 = new Platform("platform", "blue", 100, 30, xCenterCoord + 400, platformDefaultSpawnLevel )
let platform4 = new Platform("platform", "blue", 100, 30, xCenterCoord + 600, platformDefaultSpawnLevel)
let platform5 = new Platform("platform", "blue", 100, 30, xCenterCoord + 800, platformDefaultSpawnLevel)
let platform6 = new Platform("platform", "blue", 100, 30, xCenterCoord + 1000, platformDefaultSpawnLevel)

const platforms = [platform1, platform2, platform3, platform4, platform5, platform6]





function drawPlatforms(){
    for (let i = 0; i < platforms.length; i++) {
        let plat = platforms[i];
        
        context.fillStyle = plat.color
        context.fillRect(plat.posX, plat.posY, plat.width, plat.height)
    }
}


    function drawPlayer(){
        var image = new Image()
        image.src = "Owl.png"
        var canvas = document.querySelector("canvas");
    
        var ctx = canvas.getContext("2d");
    
        ctx.drawImage(image, player.posX, player.posY, 50, 50)
    }

function clearScreen(){
    context.drawImage(img, 0, 0)
    //context.fillRect(0, 0, canvas.width, canvas.height)
}


function gameOver(){
    player.gravity = 0
    player.gravitySpeed = 0
    player.speedY = 0

    isGameOver = true

    for (let k = 0; k < platforms.length; k++) {
        const plat = platforms[k];
        plat.speedX = 0
    }

}

function collisionDetection() {

        for (let r = 0; r < platforms.length; r++) {
            
            const b = platforms[r];
            if(player.posX > b.posX - player.width && player.posX < b.posX + b.width && player.posY + player.height > b.posY + 5 && player.posY < b.posY + b.height){
                gameOver()
            }
            else if (player.posX > b.posX - player.width && player.posX < b.posX + b.width && player.posY + player.height > b.posY && player.posY < b.posY + b.height) {
                player.gravitySpeed = 0
                player.speedY = 0
                player.posY = b.posY - player.height
                player.numOfJumps = 0
            }

        }

        if(player.posY + player.height > groundLevel || player.posY < roofLevel){
            gameOver()
        }

        

}

function generateNewPos(plat){
    let heightDiviation = 150 * Math.random()
    plat.posX = canvas.width + 100
    plat.posY = 200 + heightDiviation

    player.numOfPoints += 1
    score.innerHTML = "Score: " + player.numOfPoints
}

function updatePos(entity){
    entity.gravitySpeed += entity.gravity
    entity.posY += entity.speedY + entity.gravitySpeed

}

function updatePlatformPos(){
    for (let c = 0; c < platforms.length; c++) {
        const plat = platforms[c];
        plat.posX += plat.speedX

        if(plat.posX < endOfScreen){
            generateNewPos(plat)
        }
    }

}   

function jump(){
    if(player.numOfJumps < 2 && isGameOver === false){
        player.gravitySpeed = 0
        player.speedY = player.jumpSpeed
        player.numOfJumps += 1
    }
}


document.onkeydown = function (e) {
    const key = e.key;
    switch (key) {
      case "w":
        jump()
        
        break;
    }
  };

function update(){
    clearScreen()
    updatePos(player)
    drawPlayer()

    drawPlatforms()
    updatePlatformPos()
    collisionDetection(player)
}

function startGame(){
    setInterval(update, 10)
}

startGame()