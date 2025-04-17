let v;

function setup() {
  createCanvas(800, 600);

  v = new Vehicle(width / 2, height / 2, 15);
}

function draw() {
  background(50);

  let target = createVector(mouseX, mouseY);
  v.detect(target);

  v.update();
  v.reappear();
  v.display();
}

///// CLASS /////

class Vehicle {
  constructor(x = 0, y = 0, size = 1) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(3);
    this.acc = createVector(0, 0);
    this.size = size;
    this.mass = 1;
    //
    this.angle = 0;
    //
    this.maxSpeed = 5;
    this.maxSteerForce = 0.1;
    // for detection
    this.detectVector = createVector();
    this.directionVector = createVector();
    this.predictDistance = 30;
    this.detectRadius = 50;
    this.wanderAngle = random(TWO_PI);
  }
  detect(targetPos) {
    this.detectVector = p5.Vector.mult(
      this.vel.copy().normalize(),
      this.predictDistance
    );
    let centerPos = p5.Vector.add(this.pos, this.detectVector);

    circle(mouseX,mouseY,30)
    let distance = centerPos.dist(targetPos);
    if (distance < this.detectRadius+30) {
      this.directionVector = p5.Vector.sub(targetPos, centerPos);
      this.directionVector.setMag(this.detectRadius);
      this.directionVector.mult(-1); // flip the vector to avoid

      let directionPos = p5.Vector.add(centerPos, this.directionVector);
      this.seek(directionPos);
    }
  }
  seek(targetPos) {
    let desiredVec = p5.Vector.sub(targetPos, this.pos);

    let distance = desiredVec.mag();
    desiredVec.normalize();
    desiredVec.mult(this.maxSpeed);

    let steerForce = p5.Vector.sub(desiredVec, this.vel);
    steerForce.limit(this.maxSteerForce);

    this.applyForce(steerForce);
  }
  reappear() {
    if (this.pos.x < 0) {
      this.pos.x = width;
    } else if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
    } else if (this.pos.y > height) {
      this.pos.y = 0;
    }
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

    push(); // push for rotation
    rotate(this.angle);
    // draw the vehicle
    stroke(255);
    fill(255, 150);
    triangle(0, 0, -this.size, -this.size * 0.4, -this.size, this.size * 0.4);
    pop(); // pop for rotation

    // draw detecting graphics
    noFill();
    stroke(255, 0, 0);
    line(0, 0, this.detectVector.x, this.detectVector.y);

    translate(this.detectVector.x, this.detectVector.y);
    ellipse(0, 0, this.detectRadius * 2, this.detectRadius * 2);

    stroke(0, 255, 0);
    line(0, 0, this.directionVector.x, this.directionVector.y);

    pop();
  }
}
