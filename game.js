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
        this.speedX = 0
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

function intGame(){
    player = new Player("player", "red", 30, 30, xCenterCoord, yCenterCoord, 0.05, -2)
    platform1 = new Platform("platform", "blue", 100, 30, xCenterCoord, yCenterCoord + 200)
    platform2 = new Platform("platform", "blue", 100, 30, xCenterCoord, yCenterCoord + 200)
    platform3 = new Platform("platform", "blue", 100, 30, xCenterCoord, yCenterCoord + 200)


    const platforms = [platform1, platform2, platform3]

    startGame()
}





function drawRect(rect){
    context.fillStyle = rect.color
    context.fillRect(rect.posX, rect.posY, rect.width, rect.height)
}

function clearScreen(){
    context.drawImage(img, 250, 100)
    //context.fillRect(0, 0, canvas.width, canvas.height)
}

function detectBottom(entity){
    let maxYValue = canvas.height - entity.height
    let platformYValue = platform.posY - entity.height

    if (entity.posY > platformYValue) {
        entity.posY = platformYValue
        entity.gravitySpeed = 0
        entity.speedY = 0
    }

    if (entity.posY > maxYValue) {
      entity.posY = maxYValue
      entity.gravitySpeed = 0
      entity.speedY = 0
    }
    

    
}

function updatePos(entity){
    entity.gravitySpeed += entity.gravity
    entity.posX += entity.speedX
    entity.posY += entity.speedY + entity.gravitySpeed

    

    //detectBottom(entity)
}   

function jump(entity){
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
      case "a":
        walkLeft(platform)
        break;
      case "d":
        walkRight(platform)
        break;
    }
  };

function update(){
    clearScreen()
   updatePos(player)
    drawRect(player)

    drawRect(platform)
    updatePos(platform)
}

setInterval(update, 10)