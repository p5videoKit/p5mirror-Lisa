class Wave {
  constructor() {
    this.start = 0;
    this.inc = 0.05;
  }
  update() {
    this.start -= 0.03;
    if (this.start < -width) {
      this.start = 0;
    }
  }

  display(translateX) {
    push();
    translate(translateX, sin(frameCount * 0.08) * 30 - 220);
    let xoff = this.start;

    for (let i = 0; i < 10; i++) {
      noStroke();

      for (let x = i; x < width + 130; x += 10) {
        let y =
          map(noise(xoff * 0.7 * (i * 0.2 + 1) + i), 0, 1, -140, 90) +
          map(sin(xoff * 0.4), -1, 1, 0, 90);

        push();
        translate(0, sin(frameCount * 0.08 + i * 0.5) * 80);
        rectMode(CENTER);
        fill("#a7c83f");
        rect(
          x,
          y + map(dist(x, 0, width / 2 - 100, 0), 210, 0, -10, 70),
          1,
          map(noise(xoff + 0.5), 0, 1, 170, 150) + random(-20, 5) + 350
        );
        pop();

        xoff += this.inc;
      }
    }
    pop();
  }
}

let wave1;
let countxoff = 0;

let square = { x: 150, y: 150, size: 100 };
let transition = 0;

function setup() {
  createCanvas(1280, 720);
  wave1 = new Wave();
  wave2 = new Wave();
}

function draw() {
  background(0, 20);
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

  stroke(0);
  rect(square.x, square.y, square.size, square.size);

  if (countxoff <= width) {
    countxoff += 8;
  } else if (countxoff > width) {
    countxoff = 0;
  }

  wave1.update();
  wave1.display(countxoff);

  wave2.update();
  wave2.display(countxoff - width);
}

function drawBackground(transition) {
  noFill();
  for (let i = 0; i <= height; i++) {
    let yPos = map(i, 0, height, 0, 1);
    let gradientColor = lerpColor(color(254,221,57), color(78,28,217), yPos);

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
