let x, y, A, B, Fx, Fy, Tx, Ty;
let colors;
let c = [];
let d = [];
let cSpd = [];
let dSpd = [];
let totalNum = 14;

function setup() {
  createCanvas(600, 600);
  Fx = 0;
  Tx = -150;
  for (let I = 0; I < totalNum; I++) {
    c[I] = mouseX;
    d[I] = mouseY;

    cSpd[I] = random(-12, 12);
    dSpd[I] = random(-12, 12);
  }
}

function draw() {
  background(220);

  if (mouseIsPressed) {
    for (let I = 0; I < totalNum; I++) {
      c[I] += cSpd[I];
      d[I] += dSpd[I];
      fill(255);
      circle(c[I], d[I], random(10, 40));
    }
  } else {
    for (let I = 0; I < totalNum; I++) {
      c[I] = mouseX;
      d[I] = mouseY;
    }
  }

  fill(179, 218, 169);
  Tx = Tx + 5.3;
  Ty = 406;
  ellipse(Tx, Ty, 200, 160);
  let body = sin(frameCount * 0.15) * 75;
  drawcat(180, 430, 210 + body, 110);
  if (Tx > width + 80) {
    Tx = -150;
  }

  fill(86, 154, 67, 240);
  Fx = Fx + 8;
  Fy = 485;
  noStroke();
  ellipse(Fx, Fy, 80, 60);
  if (Fx > width + 30) {
    Fx = -30;
  }
}

function drawcat(x1, y1, a1, b1) {
  push();
  translate(x1, y1);
  fill(0);
  circle(0, 0, b1);
  circle(a1, 0, b1);
  rect(0, -b1 / 2, a1, b1);

  let C = (sin(frameCount * 0.4) * b1) / 7;
  let D = (cos(frameCount * 0.4) * b1) / 7;

  drawlegs(D, 0);
  drawlegs(a1 / 6 + C, 0);
  drawlegs(a1 - a1 / 8 + D, 0);
  drawlegs(a1 * 1.1 + C * 0.9, 0);
  draweyes(0, 0);
  drawbeard(0, 0);
  drawears(0, 0);
  noFill();
  pop();
}
function draweyes(x2, y2) {
  push();
  translate(x2, y2);
  noStroke();
  fill(249, 232, 128);
  ellipse(-8, -14, 31, 32);
  ellipse(40, -14, 31, 32);
  pop();

  let A = map(mouseX, 0, width, -13, 13);
  let B = map(mouseY, 0, height, -14, 14);
  push();
  translate(x2, y2);
  fill(0);
  ellipse(-8 + A, -14 + B, 10, 18);
  ellipse(40 + A, -14 + B, 10, 18);
  pop();
}
function drawbeard(x3, y3) {
  push();
  translate(x3, y3);

  stroke(255, 255, 255);
  strokeWeight(4);
  line(random(-36.5, -34), random(4.5, 7), -22, 4);
  line(random(-29, -30), 12, -21, 9);
  line(random(63, 66), random(5, 7), 52, 4);
  line(random(59, 61.5), random(11, 13), 51, 9);
  pop();

  push();
  translate(x3, y3);
  fill(255, 255, 255);
  noStroke();
  beginShape();
  vertex(16, 6);
  vertex(22, 0);
  vertex(10, 0);
  endShape(CLOSE);
  pop();
}
function drawears(x4, y4) {
  push();
  translate(x4, y4);
  fill(0);
  noStroke();
  beginShape();
  vertex(-10 + sin(frameCount * 0.4) * 3, -70);
  vertex(-30, -40);
  vertex(8, -40);
  endShape(CLOSE);

  beginShape();
  vertex(46 + cos(frameCount * 0.4) * 3, -70);
  vertex(68, -40);
  vertex(26, -40);
  endShape(CLOSE);
  pop();
}
function drawlegs(x5, y5) {
  push();
  translate(x5, y5);
  fill(0);
  ellipse(0, 52, 16, 38);
  pop();
}
