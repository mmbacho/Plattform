//Klasser
class Player{
    constructor(tag, color, width, height, posX, posY, gravity, jumpSpeed){
        this.tag = "player"
        this.color = color
        this.width = width
        this.height = height
        this.posX = posX
        this.posY = posY
        this.gravity = gravity
        this.gravitySpeed = 0
        this.jumpSpeed = jumpSpeed
        this.speedX = 0
        this.speedY = 0
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

let canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight

yCenterCoord = canvas.height / 2
xCenterCoord = canvas.width / 2

let context = canvas.getContext("2d")

const img = new Image()
img.src = "background.png"
img.onload = () => {
  context.drawImage(img, 250, 100)
}
context.fillRect(0, 0, canvas.width, canvas.height)

function startGame(){
    
}

const gravity = 0.05
let isOnGround = false

let player = new Player("player", "red", 30, 30, xCenterCoord, yCenterCoord - 100, gravity, -3)
let platform1 = new Platform("platform", "blue", 100, 30, xCenterCoord, yCenterCoord)
let platform2 = new Platform("platform", "blue", 100, 30, xCenterCoord + 200, yCenterCoord)
let platform3 = new Platform("platform", "blue", 100, 30, xCenterCoord + 400, yCenterCoord)

const platforms = [platform1, platform2, platform3]

function intGame(){

    startGame()
}



function drawPlatforms(){
    for (let i = 0; i < platforms.length; i++) {
        let plat = platforms[i];
        
        context.fillStyle = plat.color
        context.fillRect(plat.posX, plat.posY, plat.width, plat.height)
    }
}

function drawRect(rect){
    context.fillStyle = rect.color
    context.fillRect(rect.posX, rect.posY, rect.width, rect.height)
}

function clearScreen(){
    context.drawImage(img, 250, 100)
    //context.fillRect(0, 0, canvas.width, canvas.height)
}

// function collisionDetection(player, platform1){
//     // for (let plat = 0; plat < platforms; plat++) {
//         platformLeftCorner = platform1.posX
//         platformRightCorner = platform1.posX + platform1.width
//         platformYValue = platform1.posY

//         playerLeftCorner = player.posX
//         playerRightCorner = player.posX + player.width
//         playerYValue = player.posY + player.height
        
//         if(playerLeftCorner > platformLeftCorner && playerRightCorner < platformRightCorner && playerYValue <= platformYValue){
//             player.speedY = 0
//             player.gravitySpeed = 0
//             console.log("HIT")
//         }
    // }

function collisionDetection() {

        for (let r = 0; r < platforms.length; r++) {
            
            const b = platforms[r];
            if (player.posX > b.posX && player.posX < b.posX + b.width && player.posY + player.height > b.posY && player.posY < b.posY + b.height) {
                player.gravitySpeed = 0
                player.speedY = 0
                player.posY = b.posY - b.height
            }
        }

        

        // else if (player.posY + player.height >= b.posY && player.posY + player.height < b.posY+10 && player.posX > b.posY && player.posX + player.width < b.posY + b.width){
        //     player.posY = 500
        //     player.gravitySpeed = 0
        //     player.speedY = 0
        // }
 }



// function detectBottom(entity){
//     let maxYValue = canvas.height - entity.height
//     let platformYValue = platform.posY - entity.height

//     if (entity.posY > platformYValue) {
//         entity.posY = platformYValue
//         entity.gravitySpeed = 0
//         entity.speedY = 0
//     }

//     if (entity.posY > maxYValue) {
//       entity.posY = maxYValue
//       entity.gravitySpeed = 0
//       entity.speedY = 0
//     }
    

    
// }

function updatePos(entity){
    entity.gravitySpeed += entity.gravity
    entity.posX += entity.speedX
    entity.posY += entity.speedY + entity.gravitySpeed

}

function updatePlatformPos(){
    for (let c = 0; c < platforms.length; c++) {
        const plat = platforms[c];
        plat.posX += plat.speedX
    }

}   

function jump(entity){
    entity.gravitySpeed = 0
    entity.speedY = entity.jumpSpeed
}

function walkRight(entity){
    entity.speedX = -2
}
function walkLeft(entity){
    entity.speedX = 2
}

document.onkeydown = function (e) {
    const key = e.key;
    switch (key) {
      case "w":
        jump(player)
        
        break;
    }
  };

function update(){
    clearScreen()
    updatePos(player)
    drawRect(player)

    drawPlatforms()
    updatePlatformPos()
    collisionDetection(player)
}

setInterval(update, 10)