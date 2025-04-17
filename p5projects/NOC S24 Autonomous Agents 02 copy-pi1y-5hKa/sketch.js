let v;

function setup() {
  createCanvas(600, 500);

  v = new Vehicle(width / 2, height / 2, 15);
}

function draw() {
  background(50);

  let pos = createVector(mouseX, mouseY);
  v.seek(pos);

  v.update();
  v.display();
}

///// CLASS /////

class Vehicle {
  constructor(x = 0, y = 0, size = 1) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.size = size;
    this.mass = 1;
    //
    this.angle = 0;
    //
    this.maxSpeed = 5;
    this.maxSteerForce = 0.01;
  }
  seek(targetPos) {
    let desiredVec = p5.Vector.sub(targetPos, this.pos);
    desiredVec.normalize();
    desiredVec.mult(this.maxSpeed);

    let steerForce = p5.Vector.sub(desiredVec, this.vel);
    steerForce.normalize();
    steerForce.mult(this.maxSteerForce);

    this.applyForce(steerForce);
  }
  applyForce(f) {
    if (this.mass > 0) {
      let force = p5.Vector.div(f, this.mass);
      this.acc.add(force);
    }
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    //
    this.angle = this.vel.heading();
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);

    stroke(255);
    fill(255, 150);
    triangle(0, 0, -this.size, -this.size * 0.4, -this.size, this.size * 0.4);
    pop();
  }
}
