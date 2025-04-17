let particle;
let isPressed = false;
let targetX, targetY;

function setup() {
  createCanvas(600, 600);
  particle = new Particle(180, 60);
}

function draw() {
  //background(220);
  noFill();

  if (isPressed) {
    targetX = mouseX;
    targetY = mouseY;
  } else {
    targetX = 100;
    targetY = 100;
  }

  particle.update(targetX, targetY);
  particle.display();
}

function mousePressed() {
  isPressed = true;
}

function mouseReleased() {
  isPressed = false;
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
  }

  update(targetX, targetY) {
    let dx = targetX - this.x;
    let dy = targetY - this.y;

    this.x += dx / 10;
    this.y += dy / 5;

    this.R = map(dist(this.x, this.y, width / 2, height / 2), 0, 370, 90, 255);
    this.G = map(dist(this.x, this.y, mouseY, mouseX), 0, 370, 250, 10);
    this.B = map(dist(this.x, this.y, width / 2, height / 2), 0, 370, 200, 20);
  }

  display() {
    push();
    translate(width / 2, height / 2);
    for (let i = 0; i < 256; i++) {
      let r = map(
        sin(
          this.x * cos((i * PI) / 2 / 128 + frameCount * 0.2) +
            (mouseX - 250) / 3
        ),
        -1,
        1,
        0,
        255
      );
      let g = map(sin(frameCount * 0.02), -1, 1, 10, 255);
      let b = map(dist(mouseX, mouseY, width / 2, height / 2), 0, 375, 10, 155);
      fill(r, g, b);
      noStroke();
      ellipse(
        this.x * cos((i * PI) / 2 / 128 + frameCount * 0.2) +
          (mouseX - 250) / 3,
        this.y * sin((i * PI) / 2 / 128 + frameCount * 0.1) +
          60 * cos(i) * cos(i) +
          (mouseY - 250) / 3,
        map(cos(frameCount * 0.1), -1, 1, 5, 7),
        map(sin(frameCount * 0.1), -1, 1, 6, 16)
      );
    }
    pop();
  }
}
