let square = { x: 150, y: 150, size: 100 };
let transition = 0;
let stars=[]

function setup() {
  createCanvas(800, 400);
  
  for (let i = 0; i < 50; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      speed: random(1, 5)
    });
  }
}

function draw() {
  background(220);

  let mouseIsInside =
    mouseX > square.x &&
    mouseX < square.x + square.size &&
    mouseY > square.y &&
    mouseY < square.y + square.size;
  
  constrain(transition,0,1)

  if (mouseIsInside) {
    transition += (1 - transition) * 0.02;
  } else {
    transition -= transition * 0.02;
  }

  drawBackground(transition);
  if (mouseIsInside){
  drawStars()
  }
  
  stroke(0);
  rect(square.x, square.y, square.size, square.size);
  
}

function drawBackground(transition) {
  noFill();
  for (let i = 0; i <= height; i++) {
    let yPos = map(i, 0, height, 0, 1);
    let gradientColor = lerpColor(color(0,0,0), color(170,139,198), yPos);

    let transitionColor = color(
      red(gradientColor),
      green(gradientColor),
      blue(gradientColor),
      transition * 255
    );
    //stroke(gradientColor,transition * 255);//failed maybe because of the format??? try??RGB??
    stroke(transitionColor);
    line(0, i, width, i);
  }
}

function drawStars(){
  for (let s of stars) {
    fill(255); // White stars
    noStroke();
    ellipse(s.x, s.y, 2, 2);
    s.x+=s.speed;
    if(s.x>width){
      s.x=0
    }
  }
}