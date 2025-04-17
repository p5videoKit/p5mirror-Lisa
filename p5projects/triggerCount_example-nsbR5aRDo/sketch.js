let triggerCount = 0;
let wasDetected = false;

function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(220);

  if (mouseX > 3 * width / 4) {
    if (!wasDetected) { 
      triggerCount++; 
      wasDetected = true; 
    }
  } else {
    wasDetected = false; 
  }

  fill(100, 100, 250, 50); 
  rect(3 * width / 4, 0, width - 3 * width / 4, height);

  fill(0);
  text(triggerCount, 10, 50);
}
