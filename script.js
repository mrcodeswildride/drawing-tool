var canvasBox = document.getElementById("canvasBox");
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var canvasColorInput = document.getElementById("canvasColor");
var lineColorInput = document.getElementById("lineColor");
var lineWidthInput = document.getElementById("lineWidth");
var mushroom = document.getElementById("mushroom");
var flower = document.getElementById("flower");
var star = document.getElementById("star");

var drawingMode = false;
var selectedItem;

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseover", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);
canvas.addEventListener("mousemove", draw);

canvas.addEventListener("dragenter", dragEnter);
canvas.addEventListener("dragleave", dragLeave);
canvas.addEventListener("dragover", dragOver);
canvas.addEventListener("drop", placeItem);

canvasColorInput.addEventListener("input", setCanvasColor);
lineColorInput.addEventListener("input", setLineColor);
lineWidthInput.addEventListener("input", setLineWidth);
mushroom.addEventListener("dragstart", dragItem);
flower.addEventListener("dragstart", dragItem);
star.addEventListener("dragstart", dragItem);

function startDrawing(event) {
    if (event.buttons == 1) {
        context.beginPath();
        drawingMode = true;
    }
}

function stopDrawing(event) {
    context.closePath();
    drawingMode = false;
}

function draw(event) {
    if (drawingMode) {
        context.lineTo(event.offsetX, event.offsetY);
        context.stroke();
    }
}

function setCanvasColor() {
    canvas.style.backgroundColor = canvasColorInput.value;
}

function setLineColor() {
    context.strokeStyle = lineColorInput.value;
}

function setLineWidth() {
    context.lineWidth = lineWidthInput.value;
}

function dragItem() {
    selectedItem = this;
}

function dragEnter() {
    canvasBox.classList.add("drag");
}

function dragLeave() {
    canvasBox.classList.remove("drag");
}

function dragOver(event) {
    event.preventDefault();
}

function placeItem(event) {
    canvasBox.classList.remove("drag");
    canvasBox.appendChild(selectedItem);

    selectedItem.style.position = "absolute";
    selectedItem.style.left = event.offsetX - (selectedItem.width / 2) + "px";
    selectedItem.style.top = event.offsetY - (selectedItem.height / 2) + "px";
}
