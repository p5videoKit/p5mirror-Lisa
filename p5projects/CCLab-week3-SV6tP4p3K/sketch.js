/*
GIF CAPTURE TEMPLATE

Instructions:
_ Click on the button at the left-top corner to save/render your sketch as a GIF.
_ After clicking, frames will be recorded for 15 seconds.
_ Wait until the whole process is finished. 
    _ 1. First the button will reflect the capturing of 450 frames.
    _ 2. Next, you can then observe the rendering in the Console.
_ After the rendering is done, it will automatically produce a GIF animation. The .gif file will be downloaded into your "Downloads" folder.

Please don't change the configuration, such as the canvas size and the duration in html. Otherwise your GIF's filesize could be too large.
*/
let S1;
let S2;
let x3, x4, x5, xSped, ySped;
let r, g, b;

function preload() {
  S1 = loadImage("S1.png");
  S2 = loadImage("S2.png");
  C = loadImage("Cloud.png");
  M = loadImage("moon.png");
}

function setup() {
  createCanvas(540, 540);
  noStroke();
  x3 = 0;
  x4 = 539;
  x5 = 0;
  x6 = 50;
  y6 = 210;
  xSped = random(-5, 5);
  ySped = random(-5, 5);
}

function draw() {
  let freq = frameCount * 0.05;
  let amp = 150;
  let sinValue = sin(freq) * amp;
  let cosValue = cos(freq) * amp;

  let color1 = map(cos(freq / 3), -1, 1, 0, 225);
  let color2 = map(cos(freq / 3), -1, 1, 0, 140);
  fill(color2, color1, 255);
  rect(0, 0, 540);

  let color3 = map(cos(freq / 3), -1, 1, 0, 207);
  fill(231, color3, 0);
  let x = 270 + sin(freq / 3 + PI / 1.2) * 195;
  let y = 230 + cos(freq / 3 + PI / 1.2) * 195;
  circle(x, y, 60);

  let X = 270 + sin(freq / 3 + PI / 1.2 + PI) * 220;
  let Y = 230 + cos(freq / 3 + PI / 1.2 + PI) * 220;
  fill(226, 209, 59);
  image(M, X, Y, 80, 80);
  let X1 = 270 + sin(freq / 3 + PI / 1.5 + PI) * 220;
  let Y1 = 230 + cos(freq / 3 + PI / 1.5 + PI) * 220;
  fill(255, 255, 255);
  circle(X1 - 10, Y1 + 10, 2);
  circle(X1 + 12, Y1 + 15, 2);
  circle(X1 - 3, Y1 - 14, 3);
  circle(X1 + 22, Y1, 2);
  circle(X1, Y1 - 3, 4);
  circle(X1 - 30, Y1 - 3, 2);
  circle(X1 - 40, Y1 - 20, 3);
  circle(X1 - 20, Y1 - 3, 4);
  circle(X1 + 34, Y1 - 13, 2);
  circle(X1 - 30, Y1 - 12, 4);
  circle(X1 + 9, Y1 - 3, 3);
  circle(X1 - 58, Y1 - 33, 3);
  circle(X1 - 26, Y1 - 3, 2);
  circle(X1 - 16, Y1 + 43, 2);
  circle(X1 - 40, Y1 - 3, 4);

  fill(165, 184, 101);
  rect(0, 230, 540, 330);

  let x1 = 350 + sin(freq * 0.5) * 60;
  let y1 = 350 + cos(freq * 0.5) * 60;
  image(S1, x1, y1, 130, 130); //sheep1

  let x2 = 350 + sin(freq * 0.5 + 10) * 60;
  let y2 = 350 + cos(freq * 0.5 + 10) * 60;
  image(S2, x2, y2, 130, 130); //sheep2

  x3 = x3 + 1;
  if (x3 < 0) {
    x3 = width;
  } else if (x3 > width) {
    x3 = 0;
  }
  image(C, x3, 240, 180, 170);
  image(C, -x3 * 1.2, 100, 300, 260);
  image(C, x3 * 0.6, 120, 120, 120);

  x4 = x4 + 3;
  if (x4 < 0) {
    x4 = 540;
  } else if (x4 > 540) {
    x4 = 0;
  }
  image(C, x4, 100, 200, 200);
  image(C, x4 + 100, 400, 230, 220);
  image(C, x4 * 1.5, 0, 80, 70);

  x5 = x5 - 3.6;
  if (x5 < 0) {
    x5 = 540;
  } else if (x5 > 540) {
    x5 = 0;
  }
  image(C, x5, 230, 380, 350);
  image(C, x5 * 1.4, 310, 150, 100);

  x6 = x6 + xSped;
  y6 = y6 + ySped;
  if (x6 < 30 || x6 > 230) {
    xSped = xSped * -1;
  }
  if (y6 < 180 || y6 > 430) {
    ySped = ySped * -1;
  }
  image(S2, x6, y6, 110, 110);
}
