let balls = [];
let springs = [];

let C_GRAVITY = 1;
let DISTANCE_BTW_BALLS = 30;

class Creature1 {
  constructor(x = 0, y = 0, angle = 0) {
    this.balls = [];
    this.springs = [];
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.isTrigger = false;
    this.Sweight=6
    //
    this.r = 255;
    this.g = 255;
    this.b = 255;
    this.t=0

    let a = new Ball(this.x - 50, this.y - 150, 40);
    this.balls.push(a);
    let b = new Ball(this.x - 50, this.y + 150, 40);
    this.balls.push(b);
    let c = new Ball(this.x + 50, this.y, 30);
    this.balls.push(c);

    this.springs.push(new Spring(a, b, 180, 0.2));
    this.springs.push(new Spring(b, c, 150, 0.2));//0.2
    this.springs.push(new Spring(c, a, 150, 0.2));

    for (let i = 0; i < 20; i++) {
      this.balls.push(new Ball(i * 10, 0, 5));
    }

    for (let j = 0; j < 4; j++) {
      for (let i = 3; i < 7; i++) {
        this.springs.push(
          new Spring(this.balls[i + j * 5], this.balls[i + 1 + j * 5], 20, 0.6)
        );
      }
    }
  }
  drawStructure() {
    //noFill()
    beginShape();
    vertex(this.balls[1].pos.x, this.balls[1].pos.y);
    vertex(this.balls[2].pos.x, this.balls[2].pos.y);
    vertex(this.balls[0].pos.x, this.balls[0].pos.y);
    endShape(CLOSE);

    for (let s of this.springs) {
      s.update();
      s.display();
    }

    for (let i = 0; i < this.balls.length; i++) {
      let b = this.balls[i];
      b.drag();
      //b.bounce();
      //b.reappear()
      b.update();
      if (i !== 3 && i !== 8 && i !== 13 && i !== 18) {
        b.display();
      }
    }

    this.balls[3].pos.x = this.balls[0].pos.x;
    this.balls[3].pos.y = this.balls[0].pos.y;
    this.balls[8].pos.x = this.balls[0].pos.x;
    this.balls[8].pos.y =
      (this.balls[1].pos.y - this.balls[0].pos.y) / 3 + this.balls[0].pos.y;
    this.balls[13].pos.x = this.balls[1].pos.x;
    this.balls[13].pos.y =
      (2 * (this.balls[1].pos.y - this.balls[0].pos.y)) / 3 +
      this.balls[0].pos.y;
    this.balls[18].pos.x = this.balls[1].pos.x;
    this.balls[18].pos.y = this.balls[1].pos.y;

    for (let i = 3; i < 23; i++) {
      this.balls[i].applyForce(createVector(-2, 0));
    }

    this.balls[2].pos.add(createVector(mSin(frameCount * 0.12) * 5, 0));
    //this.balls[2].pos.add(createVector(mSin(frameCount * 0.1) * 5, 0));
  }

  update() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    scale(1);
    fill(this.r, this.g, this.b,this.t);
    stroke(this.r, this.g, this.b);
    strokeWeight(this.Sweight);
    this.drawStructure();
    pop();
  }
}
/////////////////////////////////////////////////

class Spring {
  constructor(a, b, restLength, stiffness) {
    this.bobA = a;
    this.bobB = b;
    this.len = restLength;
    this.k = stiffness; // spring constant
    this.isTrigger = false;
  }
  update() {
    let vector = p5.Vector.sub(this.bobB.pos, this.bobA.pos);
    let distance = vector.mag();
    let stretch = distance - this.len;
    let strength = -1 * stretch * this.k; // hooke's law

    // force to bobB
    let force = vector.copy();
    force.normalize();
    force.mult(strength);
    this.bobB.applyForce(force);

    // force to bobB
    let force1 = vector.copy();
    force1.normalize();
    force1.mult(strength * -1);
    this.bobA.applyForce(force1);

    //text(strength.toFixed(2), this.bobB.pos.x + 50, this.bobB.pos.y);
  }
  display() {
    //stroke(0);
    if (this.isTrigger) {
      //stroke(255);
    }
    line(this.bobA.pos.x, this.bobA.pos.y, this.bobB.pos.x, this.bobB.pos.y);
    //circle(this.bobB.pos.x, this.bobB.pos.y, 8);
  }
}

class Ball {
  constructor(x, y, rad) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.rad = rad;
    this.mass = rad * 0.5; // MASS!
    //
    this.damping = 0.95; // -5%
    this.isTrigger = false;
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // let's apply damping here
    this.vel.mult(this.damping);
  }
  applyForce(f) {
    if (this.mass > 0) {
      let force = p5.Vector.div(f, this.mass);
      this.acc.add(force);
    }
  }
  attractedTo(others) {
    for (let i = 0; i < others.length; i++) {
      let other = others[i];
      if (this != other) {
        let distance = this.pos.dist(other.pos);
        let magnitude =
          (C_GRAVITY * this.mass * other.mass) / (distance * distance);
        let force = p5.Vector.sub(other.pos, this.pos);
        force.normalize();
        force.mult(magnitude);
        this.applyForce(force);
      }
    }
  }
  repelledFrom(others) {
    // this method is duplicated from attractedTo()
    // then, the force vector is flipped.
    for (let i = 0; i < others.length; i++) {
      let other = others[i];
      if (this != other) {
        let distance = this.pos.dist(other.pos);

        if (distance < this.rad + DISTANCE_BTW_BALLS) {
          let magnitude =
            (C_GRAVITY * this.mass * other.mass) / (distance * distance);
          let force = p5.Vector.sub(other.pos, this.pos);
          force.normalize();
          force.mult(-1); // ***
          force.mult(magnitude);
          this.applyForce(force);
        }
      }
    }
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
  bounce() {
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
    } else if (this.pos.y > height) {
      this.pos.y = height;
      this.vel.y = -this.vel.y;
    }
  }
  drag() {
    if (mouseIsPressed) {
      let distance = dist(this.pos.x, this.pos.y, mouseX, mouseY);
      if (distance < this.rad) {
        // in
        this.pos.x = mouseX;
        this.pos.y = mouseY;
      }
    }
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    //stroke(0);
    //fill(0);
    if (this.isTrigger) {
      //stroke(255);
      //fill(255);
    }
    circle(0, 0, this.rad * 2);
    pop();
  }
}
