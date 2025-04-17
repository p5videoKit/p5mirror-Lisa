let x = 0;

function setup() {
  createCanvas(100, 100);
  noLoop();
}

function draw() {
  background(204);
  line(x, 0, x, height);
}

function mousePressed() {
  x += 1;
  redraw();
}