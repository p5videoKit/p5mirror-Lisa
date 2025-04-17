let p;
let dots = [];

function setup() {
  createCanvas(500, 600);
  background(0);
  p = new Particle(width / 2, height / 2);
}

function draw() {
  background(0);

  let gravity = createVector(0, 1);
  p.applyForce(gravity);

  p.checkBoundaries();
  p.update();
  p.display();

  // dots
  let dotX = width;
  let dotY = p.pos.y / 2;
  dots.push(new Dot(dotX, dotY));

  for (let i = dots.length - 1; i >= 0; i--) {
    let d = dots[i];
    d.update();
    d.display();
    if (d.pos.x < 0) {
      dots.splice(i, 1);
    }
  }

  // vector
  p.displayVelocity();
}

function keyPressed() {
  let force = createVector();
  switch (keyCode) {
    case UP_ARROW:
      force = createVector(0, -1);
      break;
    case DOWN_ARROW:
      force = createVector(0, 1);
      break;
    case LEFT_ARROW:
      force = createVector(-1, 0);
      break;
    case RIGHT_ARROW:
      force = createVector(1, 0);
      break;
  }
  p.applyForce(force);
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 2.1);
    this.acc = createVector(0, 0);
    this.dia = 30;
  }
  applyForce(f) {
    this.acc.add(f);
  }
  update() {
    this.vel.add(this.acc); // vel = vel + acc;
    this.pos.add(this.vel); // pos = pos + vel;
    this.acc.mult(0); // acceleration has to be reset after being applied! ***
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(255);
    ellipse(0, 0, this.dia, this.dia);
    pop();
  }
  displayVelocity() {
    push();
    translate(width / 2, height / 2);
    fill(255, 0, 0);
    stroke(255, 0, 0);
    line(0, 0, this.vel.x, this.vel.y);
    ellipse(0, 0, 5, 5);
    pop();
  }
  checkBoundaries() {
    // x
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x = -this.vel.x;
    } else if (this.pos.x > width) {
      this.pos.x = width;
      this.vel.x = -this.vel.x;
    }
    // y
    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.vel.y = -this.vel.y;
    } else if (this.pos.y > height-60) {
      this.pos.y = height-60;
      this.vel.y *=-1;
    }
  }
}

class Dot {
  constructor(x, y) {
    this.pos = createVector(x, y);
  }

  update() {
    this.pos.x--;
  }

  display() {
    push();
    stroke(0, 255, 255);
    strokeWeight(3);
    point(this.pos.x, this.pos.y);
    pop();
  }
}
