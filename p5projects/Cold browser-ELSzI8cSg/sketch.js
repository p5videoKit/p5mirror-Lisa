let particle;

function setup() {
  createCanvas(500, 500);
  particle = new Particle(180, 60);
}

function draw() {
  background(220);
  noFill();
  
  particle.display();

}


class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    
  }

  update() {
    this.R = map(dist(this.x, this.y, width / 2, height / 2), 0, 370, 90, 255);
    this.G = map(dist(this.x, this.y, mouseY,mouseX), 0, 370, 250, 10);
    this.B = map(dist(this.x, this.y, width / 2, height / 2), 0, 370, 200, 20);
  }

  display() {
    this.update();
    push();
    translate(width / 2, height / 2);
    for (let i = 0; i < 256; i++) {
      let r = map(sin(this.x * cos((i * PI/2) / 128 + frameCount * 0.2) + (mouseX - 250) / 3), -1, 1, 0, 255);
      let g = map(sin(frameCount * 0.02), -1, 1, 10, 255);
      let b = map(dist(mouseX, mouseY, width / 2, height / 2), 0, 375, 10, 155);
      fill(r, g, b);
      noStroke();
      ellipse(
        this.x * cos((i * PI/2) / 128 + frameCount * 0.2) + (mouseX - 250) / 3,
        this.y * sin((i * PI/2) / 128 + frameCount * 0.1) + 60 * cos(i)*cos(i)  + (mouseY - 250) / 3,
        map(cos(frameCount * 0.1), -1, 1, 4, 6),
        map(sin(frameCount * 0.1), -1, 1, 6, 16)
      );
    }
    pop();
  }
}
