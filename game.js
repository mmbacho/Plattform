let canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight

yCenterCoord = canvas.height / 2
xCenterCoord = canvas.width / 2

let context = canvas.getContext("2d")

context.fillStyle = "black"
context.fillRect(0, 0, canvas.width, canvas.height)

player = {
    color: "red",
    width: 30,
    height: 30,
    posX: xCenterCoord,
    posY: yCenterCoord,
    speedX: 0,
    speedY: 0,
    gravity: 0.05,
    gravitySpeed: 0,
    jumpSpeed: -2,
}

platform = {
    color: "blue",
    width: 50,
    height: 30,
    posX: xCenterCoord,
    posY: yCenterCoord + 200,
    speedX: 0,
    speedY: 0,
    gravity: 0,
    gravitySpeed: 0,
}

function drawRect(rect){
    context.fillStyle = rect.color
    context.fillRect(rect.posX, rect.posY, rect.width, rect.height)
}

function clearScreen(){
    context.fillStyle = "black"
    context.fillRect(0, 0, canvas.width, canvas.height)
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

    detectBottom(entity)
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