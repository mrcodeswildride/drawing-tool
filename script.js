let canvasBox = document.getElementById(`canvasBox`)
let canvas = document.getElementById(`canvas`)
let context = canvas.getContext(`2d`)

let lineColor = document.getElementById(`lineColor`)
let lineWidth = document.getElementById(`lineWidth`)
let mushroom = document.getElementById(`mushroom`)
let flower = document.getElementById(`flower`)
let star = document.getElementById(`star`)

let drawingMode = false
let selectedImage

canvas.addEventListener(`mousedown`, startDrawing)
canvas.addEventListener(`mouseover`, startDrawing)
canvas.addEventListener(`mousemove`, draw)
canvas.addEventListener(`mouseup`, stopDrawing)
canvas.addEventListener(`mouseout`, stopDrawing)

canvas.addEventListener(`dragenter`, dragEnter)
canvas.addEventListener(`dragover`, dragOver)
canvas.addEventListener(`drop`, drop)
canvas.addEventListener(`dragleave`, dragLeave)

lineColor.addEventListener(`input`, changeLineColor)
lineWidth.addEventListener(`input`, changeLineWidth)
mushroom.addEventListener(`dragstart`, dragStart)
flower.addEventListener(`dragstart`, dragStart)
star.addEventListener(`dragstart`, dragStart)

function startDrawing(event) {
  if (event.buttons == 1) {
    context.beginPath()
    drawingMode = true
  }
}

function draw(event) {
  let x = event.offsetX
  let y = event.offsetY

  if (drawingMode) {
    context.lineTo(x, y)
    context.stroke()
  }
}

function stopDrawing(event) {
  context.closePath()
  drawingMode = false
}

function changeLineColor() {
  context.strokeStyle = lineColor.value
}

function changeLineWidth() {
  context.lineWidth = lineWidth.value
}

function dragStart() {
  selectedImage = this
}

function dragEnter() {
  canvasBox.classList.add(`drag`)
}

function dragOver(event) {
  event.preventDefault()
}

function drop(event) {
  let x = event.offsetX
  let y = event.offsetY

  canvasBox.classList.remove(`drag`)
  canvasBox.appendChild(selectedImage)

  selectedImage.style.position = `absolute`
  selectedImage.style.left = `${x - selectedImage.width / 2}px`
  selectedImage.style.top = `${y - selectedImage.height / 2}px`
}

function dragLeave() {
  canvasBox.classList.remove(`drag`)
}