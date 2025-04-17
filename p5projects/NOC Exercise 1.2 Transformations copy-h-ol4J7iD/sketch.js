// Note: play with the angle, positons, width and height of the rectangle!

let angle = 0;
let x = 0;
let w = 1;

function setup() {
  createCanvas(400, 400);
  background(0);
}

function draw() {
  // update values
  angle = angle + 170.5;
  w = w + 150;
  //x = x + 1;
  
  // draw the shape
  push();
  blendMode(ADD);
  
  translate(width/2, height/2);
  rotate( radians(angle) );
  stroke(map(sin(frameCount),-1,1,10,200),80,50,50)
         //120, 80, 10, 50);
  noFill();
  
  rectMode(CENTER);
  rect(x-10, 120, 30, w);
  //strokeWeight(4)
  //rect(w/2,10,30,30)
  
  pop();
}

function keyPressed() {
  if (key == "s" || key == "S") {
    noLoop();
    save("sketch.png");
  }
}
