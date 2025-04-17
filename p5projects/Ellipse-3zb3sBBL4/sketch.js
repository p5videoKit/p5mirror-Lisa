let particle = [];

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(220);
  noFill();

  particle.push(new Particle(180, 60));
  for (let i = 0; i < particle.length; i++) {
    let p = particle[i];

    p.display();
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  display() {
    push();
    translate(width / 2, height / 2);
    this.drawCircle();

    pop();
  }
  drawCircle() {
    for (let i = 0; i < 256; i++) {
      noStroke();
      ellipse(
        this.x * cos((i * PI) / 128 + frameCount * 0.2) + (mouseX - 250) / 3,
        this.y * sin((i * PI) / 128 + frameCount * 0.1) +
          60 * cos(i) * cos(i) +
          (mouseY - 250) / 3,
        map(cos(frameCount * 0.1), -1, 1, 1, 6),
        map(sin(frameCount * 0.1), -1, 1, 1, 16)
      );
      let r = map(
          sin(this.x * cos((i * PI) / 128 + frameCount * 0.2)),
          -1,
          1,
          0,
          255
        ),
        g = map(
          sin(this.x * cos((i * PI) / 128 + frameCount * 0.2)),
          -1,
          1,
          0,
          255
        ),
        b = map(dist(mouseX, mouseY, width / 2, height / 2), 0, 375, 0, 255);
      fill(r, g, b);
    }
  }
  move() {}
}
