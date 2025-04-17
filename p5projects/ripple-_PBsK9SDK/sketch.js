let x = 40;
let y = 20;
let timer = 0;
let start = false;

function setup() {
  createCanvas(800, 500);
  //background(0, 0, 0);
}

function draw() {
  background(0, 0, 0, 16);
  noFill();
  stroke(255);

  if (start) {
    console.log(start,timer)
    timer++;
    if (timer - floor(timer / 5) * 5 == 0 && timer < 30) {
      ellipse(mouseX, mouseY, x, y);
      x = x + 20;
      y = y + 5;
    } if (timer>30){ //only when timer is larger than 30, start becomes false
      start=false
      timer=0
      x=40
      y=20
    }
  } 
}

function mousePressed() {
  start = true;
  console.log("test");
}
