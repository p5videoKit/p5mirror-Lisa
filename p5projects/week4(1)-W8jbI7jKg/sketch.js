let colorR="#7c6d9b"//dc3b13 dc2e08
let colorB="#565f8e"//fef3d2
let s=1

function setup() {
  createCanvas(400, 400);
  //angleMode(DEGREES);
  
}

function draw() {
  background(31,41,46);
  stroke(colorB)
  // circle(width/2,height/2,30)
  // line(width/2+100-s*100, height/2,width/2,height/2)
  umbrella(width/2, height/2,PI/8,1)
  if(s>0.3){
    s-=0.01
  }
  
  
}

function umbrella(x,y,a,S){
  let radius = 100;
  let centerX = 0;
  let centerY = 0;
  push()
  translate(x,y)
  scale(S,1)
  rotate(PI/8)
  stroke(0)
  drawU(centerX, centerY, radius); 
  drawlines(centerX, centerY, radius);
  
  pop()
}

function drawU(x, y, r) {
  
  let angle = 2*PI / 8;
  fill(colorR)
  noStroke()
  beginShape();
  for (let i = 0; i < 8; i++) {
    let xPos = x + cos(angle * i) * r;
    let yPos = y + sin(angle * i) * r;
    vertex(xPos, yPos);
  }
  endShape(CLOSE);
}

function drawlines(x, y,r) {
  let angle = TWO_PI / 8;
  for (let i = 0; i < 8; i += 1) { // connecting opposite vertices
    strokeWeight(3)
    stroke(colorB)
    let x1 = x + cos(angle * i) * r;
    let y1 = y + sin(angle * i) * r;
    line(x1, y1, 0, 0);
    fill(colorB)
    circle(x1,y1,6)
  }
}
