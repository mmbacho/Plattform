let canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let context = canvas.getContext("2d")

context.fillStyle = "black"
context.fillRect(10, 10, canvas.width, canvas.height)

player = {
    color: "red",
    width: 30,
    height: 30,
    posX: 10,
    posY: 10,
}