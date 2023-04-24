let canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let context = canvas.getContext("2d")

context.fillStyle = "black"
context.fillRect(0, 0, canvas.width, canvas.height)

player = {
    color: "red",
    width: 30,
    height: 30,
    posX: 10,
    posY: 10,
    speedX: 10,
    speedY: 10,
}

function drawRect(rect){
    context.fillStyle = rect.color
    context.fillRect(rect.posX, rect.posY, rect.width, rect.height)
}

function clearScreen(){
    context.fillStyle = "black"
    context.fillRect(0, 0, canvas.width, canvas.height)
}

function moveObject(object){
    object.posX += object.speedX
    object.posY += object.speedY

    if(object.posX > canvas.width || object.posX < 0){
        object.speedX = -object.speedX
    }

    if(object.posY > canvas.height || object.posY < 0){
        object.speedY = -object.speedY
    }
}   

function jump(){
    player.posY = oldValueY
    while(true){
        player.speedY = 10
        if(player.posY > oldValueY + 50){
            player.speedY = 0
            break
        }
    }

}

document.onkeydown = function (e) {
    const key = e.key;
    switch (key) {
      case "":
        console.log("");
        break;
      case "":
        console.log("");
        break;
    }
  };

function update(){
    clearScreen()
    moveObject(player)
    drawRect(player)
}

setInterval(update, 10)