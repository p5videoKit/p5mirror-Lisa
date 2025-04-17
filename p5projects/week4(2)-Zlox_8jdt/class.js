class Particle {
  constructor(x, y, rad) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.rad = rad;
    this.mass = random(20, 35) * 0.5;
    this.color = color(255);
    this.target = createVector(x, height);
    this.isDone = false;
    this.stayTogether = false;
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.vel.limit(5);
  }
  applyForce(f) {
    if (this.mass > 0) {
      let force = p5.Vector.div(f, this.mass);
      this.acc.add(force);
    }
  }
  checkCollision(other) {
    for (let i = 0; i < particles.length; i++) {
      let other = particles[i];
      if (this != other) {
        let distance = this.pos.dist(other.pos);
        if (distance < this.rad + other.rad) {
          let force;

          if (particles[1].stayTogether == false) {
            force = p5.Vector.sub(other.pos, this.pos);
            force.normalize();
            force.mult(-1);
            force.mult(other.vel.mag());
            force.mult(0.2);
            this.applyForce(force);
          }

          force = p5.Vector.sub(this.pos, other.pos);
          force.normalize();
          force.mult(-1);
          force.mult(this.vel.mag());
          force.mult(0.2);
          other.applyForce(force);
        } else {
        }
      }
    }
  }
  attract() {
    let attract = p5.Vector.sub(this.target, this.pos);
    attract.setMag(0.3);
    if (this != particles[0]) {
      this.applyForce(attract);
    }
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    rotate(this.vel.heading());
    //fill(this.color);
    this.umbrella(0, 0, PI / 8, 1);
    pop();
  }
  checkBoundary() {
    if (this != particles[1]) {
      if (this != particles[0]) {
        if (this.pos.y > height + this.rad + 5) {
          this.isDone = true;
        }
        if (this.pos.x - this.rad - 1 < 40) {
          this.vel.x *= -1;
        }
        if (this.pos.x - this.rad + 1 > 695) {
          this.vel.x *= -1;
        }
      }
    }
  }
  checkPurple() {
    if (
      dist(
        particles[1].pos.x,
        particles[1].pos.y,
        particles[0].pos.x,
        particles[0].pos.y
      ) <
      2 * this.rad - 2
    ) {
      particles[1].stayTogether = true;

      if (particles[1].stayTogether) {
        particles[1].vel.x = 0;
        particles[1].vel.y = 0;
        // particles[1].acc.x = 0;
        // particles[1].acc.y = 0;
      }
    }
  }
  stayAlone() {
    if (particles[1].stayTogether == false) {
      particles[0].pos.x = Px;
      particles[0].pos.y = Py;
      particles[1].target.x = Px;
      particles[1].target.y = Py;
    } else {
      this.moveTogether();
    }
  }
  moveTogether() {
    if (counter < 700) {
      counter++;
      //console.log(counter)
      particles[0].pos.x = Px;
      particles[0].pos.y = Py;
      particles[1].target.x = Px;
      particles[1].target.y = Py;
    } else {
      let xoff = createVector(0, 2);
      if (particles[1].pos.x > particles[0].pos.x) {
        particles[1].pos.add(xoff);
        particles[0].pos.x = particles[1].pos.x - 90;
        particles[0].pos.y = particles[1].pos.y;
      } else {
        particles[1].pos.add(xoff);
        particles[0].pos.x = particles[1].pos.x + 95;
        particles[0].pos.y = particles[1].pos.y - 5;
      }

      //console.log("work2")
    }
  }
  fillColor(chooseColor) {
    fill(chooseColor);
  }
  umbrella(x, y, a, S) {
    let radius = this.rad;
    let centerX = 0;
    let centerY = 0;
    push();
    translate(x, y);
    scale(S, 1);
    //rotate(PI/8)
    stroke(0);
    this.drawU(centerX, centerY, radius);
    this.drawlines(centerX, centerY, radius);

    pop();
  }

  drawU(x, y, r) {
    let angle = (2 * PI) / 8;
    if (this == particles[0]) {
      fill(P1);
    } else if (this == particles[1]) {
      fill(Y1);
    } else {
      fill(O1);
    }
    noStroke();
    beginShape();
    for (let i = 0; i < 8; i++) {
      let xPos = x + cos(PI / 8 + angle * i) * r;
      let yPos = y + sin(PI / 8 + angle * i) * r;
      vertex(xPos, yPos);
    }
    endShape(CLOSE);
  }

  drawlines(x, y, r) {
    let angle = TWO_PI / 8;
    for (let i = 0; i < 8; i += 1) {
      // connecting opposite vertices
      strokeWeight(3);
      if (this == particles[0]) {
        if (particles[1].stayTogether == false) {
          stroke(P2);
          fill(P2);
        } else {
          stroke(Y1);
          fill(Y1);
        }
      } else if (this == particles[1]) {
        stroke(Y2);
        fill(Y2);
      } else {
        stroke(O2);
        fill(O2);
      }
      let x1 = x + cos(PI / 8 + angle * i) * r;
      let y1 = y + sin(PI / 8 + angle * i) * r;
      line(x1, y1, 0, 0);
      //fill(colorB)
      circle(x1, y1, 6);
    }
  }
}
class Rain {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.rad = 1;
    this.target = createVector(width / 2, height / 2);
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    stroke(255);
    strokeWeight(1);
    rotate(this.vel.heading());
    //line(0, 0, 0,20);
    line(0, 0, random(10, 60), 0);
    //console.log("work")
    pop();
  }
  goDown() {
    let force = p5.Vector.sub(this.target, this.pos);
    force.normalize();
    force.mult(0.5);
    this.acc.add(force);
  }
}
