let things = [];
let sceneScale = 1.0;
let scenePosX1 = 0;
let scenePosY1 = 0;
let scenePosX2 = 0;
let scenePosY2 = 0;

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 3; i++) {
    things[i] = new Thing(i * 150, height / 2);
  }
}

function draw() {
  
  background(0);
  if (keyCode===RIGHT_ARROW){
  push();
  //place the focus to the middle
  let lerpPct = 0.01;
  scenePosX1 = lerp(scenePosX1, width / 2, lerpPct);
  scenePosY1 = lerp(scenePosY1, height / 2, lerpPct);
  translate(scenePosX1,scenePosY1);
  
  //scale
  scale(sceneScale);
  sceneScale += 0.01;
  sceneScale = constrain(sceneScale, 1.0, 3.0);

  //placing the object to the middle
  scenePosX2 = lerp(scenePosX2, -things[0].x, lerpPct);
  scenePosY2 = lerp(scenePosY2, -things[0].y, lerpPct);
  translate(scenePosX2, scenePosY2);
  for (let i = 0; i < things.length; i++) {
    things[i].display();
  }
  pop();
}}

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