let radDist;
let angle = 0;

function setup() {
  createCanvas(500, 600);
  background(100);
}

function draw() {
  //background(100);

  push();
  translate(width / 2, height / 2);

  angle += 0.02;

  let sinForRad = sin(angle * 5) * 30;//几个角
  radDist = 150 + sinForRad;

  let x = cos(angle*2) * radDist;
  let y = sin(angle*3) * radDist;

  radDist = 150;
  let x1 = cos(angle) * radDist;
  let y1 = sin(angle) * radDist;

  stroke(255, 100);
  //line(0, 0, x, y);
  line(x1, y1, x, y+angle*10);

  pop();
}
