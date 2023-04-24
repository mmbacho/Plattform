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
}

function drawRect(rect){
    context.fillStyle = rect.color
    context.fillRect(rect.posX, rect.posY, rect.width, rect.height)
}

function clearScreen(){
    context.fillStyle = "black"
    context.fillRect(10, 10, canvas.width, canvas.height)
}

function moveObject(object){
    object.posX += 1
    object.posY += 1
}

function update(){
    moveObject(player)
    drawRect(player)
    clearScreen()
}

setInterval(update, 10)