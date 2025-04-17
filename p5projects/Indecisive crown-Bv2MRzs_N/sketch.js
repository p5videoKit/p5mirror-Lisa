let things = [];
let sceneScale = 1.0;

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
  for (let i = 0; i < 3; i++) {
    things[i] = new Thing((i+1) * 100, height / 2);
  }
}

function draw() {
  background(0);
  push();
  // focus on the object
  translate(things[2].x, things[2].y);
  
  //scale
  scale(sceneScale);
  sceneScale += 0.01;
  sceneScale = constrain(sceneScale, 1.0, 3.0);

  //display 
  for (let i = 0; i < things.length; i++) {
    push();
    translate(-things[2].x, -things[2].y);
    things[i].display();
    pop();
  }
  pop();
}

class Thing {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  display() {
    fill(255);
    rect(this.x, this.y, 50, 50);
  }
}