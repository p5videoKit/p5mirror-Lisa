let angle = 0;
let y;
let x = 0;
let x2 = 0;
let x3 = 0;
let x4 = 0;
let x5 = 0;
let timer = 0;
let sColor = "#fee19d"; //254,225,257 
let bColor = "#67cedc"; //103,206,220
function setup() {
  createCanvas(550, 550);
  background(23, 35, 54);
}

function draw() {
  timer++;
  
  //////////background pattern/////////
  //for (i = 0; i < 6; i=i+1) {
    if (timer < 26) {
      y = timer-1 ;
      push();
       translate(55 + 110 * (y - floor(y / 5) * 5), 55 + floor(y / 5) * 110);
      
      rectMode(CENTER)
      stroke(103,206,220,50)
      noFill()
      rect(0,0,50,75)
      pop();
    }
  //}
  
  fill(sColor)
  noStroke();
  //blendMode(ADD)

  if (timer < 15) {
    x++;
    
  }
  if (timer < 85) {
    x2++;
  }
  if (timer > 60 && timer < 85) {
    x3++;
    circle(142 - x3, 104 + x3, 4 + x3 * 0.2);
    circle(151 - x3 * 0.43, 116 + x3 * 0.5, 4 + x3 * 0.15);
    circle(168 - x3 * 0.85, 127 + x3 * 1.15, 4 + x3 * 0.2);
    circle(185 - x3 * 0.32, 136 + x3 * 0.56, 4 + x3 * 0.15);
    circle(202 - x3 * 0.54, 142 + x3 * 1.5, 4 + x3 * 0.2);
    circle(219 - x3 * 0.1, 146 + x3 * 0.72, 4 + x3 * 0.15);

    circle(415 + x3 * 0.45, 138 + x3 * 1.1, 4 + x3 * 0.2);
    circle(398 + x3 * 0.13 * 0.9, 146 + x3 * 0.76 * 0.9, 4 + x3 * 0.15);
    circle(380, 150 + x3, 4 + x3 * 0.2);
  }
  if (timer > 70 && timer < 110) {
    x4++;
    wings2(0, -0.02, PI / 2.7);
    wings2(38, -0.0162, PI / 2.7);
    wings2(80, -0.012, PI / 2.7);

    wings2(0, 0.014, (3.12 * PI) / 2, x4, 0);
    wings2(38, 0.011, (3.12 * PI) / 2, x4, 0);
    wings2(80, 0.005, (3.12 * PI) / 2, x4, 0);
  }
  if (timer > 90 && timer < 150) {
    x5++;
  }

  //////////head//////////
  push();
  fill(sColor)
  translate(320, 130);
  rotate(x * 0.1);
  circle(-30, 0, 6 + x * 0.4);
  pop();

  ////////body//////////
  push();
  fill(sColor)
  translate(295, 130);
  scale(2.5);
  circle(8 * sin(0.1 * x2 + PI / 2 - 1), x2 * 0.6, 4 - x2 * 0.04);
  pop();

  /////////wings////////
  fill(sColor)
  wings1(-380 / sqrt(2), 380 / sqrt(2), -x2 * 0.006);
  wings1(190, 190 * sqrt(3), x2 * 0.004);

   //circle(262,228,346)

  /////////tail////////

  fill(sColor)
  tail(126, 245, -30, 0.0322, (2.9 * PI) / 2, 0.05);
  tail(270, 310, 90, 0.028, (5.45 * PI) / 3, 0.02);
  for (i = 0; i < 3; i++) {
    fill(254, 225, 157, 255 - i * 70);

    tail(300 - i * 12, 290 + i * 20, 140 - i * 6, 0.065, (3.7 * PI) / 2, 0.012);
  }
}


function wings1(X, Y, R) {
  push();
  translate(305, -60);
  rotate(R);
  scale(0.55);
  circle(X, Y, 20 - x2 * 0.16);
  pop();
}

function wings2(X, R, D) {
  push();
  translate(262, 228);
  rotate(x4 * R * 1.5);
  circle((-173 + X) * sin(D), (-173 + X) * cos(D), 10);
  pop();
}

function tail(X, Y, adjust, R, D, control) {
  push();
  translate(X, Y);
  rotate(x5 * R);
  circle((-173 + adjust) * sin(D), (-173 + adjust) * cos(D), 10 * x5 * control);
  pop();
}
