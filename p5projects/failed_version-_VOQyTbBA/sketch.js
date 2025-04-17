let square = { x: 150, y: 150, size: 100 }; 
let mouseDetected = false;
let transparency = 0; 
let colorB=0

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(colorB,transparency);
 
  stroke(0);
  noFill();
  rect(square.x, square.y, square.size, square.size);

  if (mouseX > square.x && mouseX < square.x + square.size &&
      mouseY > square.y && mouseY < square.y + square.size) {
    mouseDetected = true;
  } else {
    mouseDetected = false;
  }

  if (mouseDetected) {
    if (transparency < 255) {
      transparency ++; 
    }
  } else {    
    // colorB=255
    // transparency=0
  }
  
  noStroke();
}

