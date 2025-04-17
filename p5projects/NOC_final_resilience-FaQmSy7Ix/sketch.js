let ballsR = [];
let springsR = [];

function setup() {
  createCanvas(600, 500);
  for (let i = 0; i < 11; i++) {
    ballsR[i] = [];
    for (let j = 0; j < 7; j++) {
      ballsR[i].push(new Ball(i + j, 0, abs(j - 3) * 4 + 2));
    }
  }

  for (let i = 0; i < 11; i++) {
    springsR[i] = [];
    for (let j = 0; j < 6; j++) {
      springsR[i].push(new Spring(ballsR[i][j], ballsR[i][j + 1], 10, 0.1));
    }
  }
  //fullscreen()
}

function draw() {
  background(220);

  drawR();
}

function drawR() {
  push(0);
  translate(mouseX, mouseY);
  scale(0.7);

  noStroke();

  fill(255);//190
  ellipse(0, ballsR[9][0].pos.y, 30, 20);

  fill(0)
  for (let i = 0; i < 8; i++) {
    ellipse(ballsR[i][0].pos.x, ballsR[i][0].pos.y, 12, 12);
    ballsR[i][0].pos.add(createVector(0,(noise(frameCount*0.01)-0.5)*10+sin(frameCount*0.05)*4))
    ballsR[i][2].pos.add(createVector(noise(frameCount*0.01)*4,sin(frameCount*0.06)*3))
  }

  stroke(0);

  for (let i = 0; i < springsR.length; i++) {
    for (let s of springsR[i]) {
      s.update();
      //s.display();
    }
  }

  for (let i = 0; i < ballsR.length; i++) {
    for (let j = 0; j < ballsR[0].length; j++) {
      let b = ballsR[i][j];
      b.drag();
      //b.bounce();
      b.update();
      //b.display();
      if (i == 0) {
        b.applyForce(createVector(0.03, -0.1));
      }
      if (i == 1) {
        b.applyForce(createVector(0, 0.2));
      }
      if (i == 2) {
        b.applyForce(createVector(0, -0.1));
      }
      if (i == 3) {
        b.applyForce(createVector(0, 0.5));
      }
      if (i == 4) {
        b.applyForce(createVector(-0.03, -0.1));
      }
      if (i == 5) {
        b.applyForce(createVector(0.2, 0.8));
      }
      if (i == 6) {
        b.applyForce(createVector(0, 0.5));
      }
      if (i == 7) {
        b.applyForce(createVector(-0.2, 0.8));
      }
      if (i == 8) {
        b.applyForce(createVector(0.05, 0.1));
      }
      if (i == 9) {
        b.applyForce(createVector(0, -0.4));
      }
      if (i == 10) {
        b.applyForce(createVector(-0.05, 0.05));
      }
    }
  }

  for (let i = 0; i < 8; i++) {}

  ballsR[0][0].pos = createVector(110 + -257.5, 130 + -180);
  ballsR[0][6].pos = createVector(160 + -257.5, 170 + -180);
  ballsR[1][0].pos = createVector(160 + -257.5, 170 + -180);
  ballsR[1][6].pos = createVector(220 + -257.5, 180 + -180);
  ballsR[2][0].pos = createVector(220 + -257.5, 180 + -180);
  ballsR[2][6].pos = createVector(270 + -257.5, 185 + -180);
  ballsR[3][0].pos = createVector(270 + -257.5, 185 + -180);
  ballsR[3][6].pos = createVector(350 + -257.5, 160 + -180);
  ballsR[4][0].pos = createVector(350 + -257.5, 160 + -180);
  ballsR[4][6].pos = createVector(405 + -257.5, 140 + -180);
  ballsR[5][0].pos = createVector(405 + -257.5, 140 + -180);
  ballsR[5][6].pos = createVector(405 - 295 / 3 + -257.5, 250 + -180);
  ballsR[6][0].pos = createVector(405 - 295 / 3 + -257.5, 250 + -180);
  ballsR[6][6].pos = createVector(405 - (2 * 295) / 3 + -257.5, 250 + -180);
  ballsR[7][0].pos = createVector(405 - (2 * 295) / 3 + -257.5, 250 + -180);
  ballsR[7][6].pos = createVector(405 - 295 + -257.5, 130 + -180);

  ballsR[8][0].pos = createVector(ballsR[0][1].pos.x, ballsR[0][1].pos.y);
  ballsR[8][6].pos = createVector(
    ballsR[0][1].pos.x + 295 / 4 + 10,
    ballsR[0][1].pos.y - 25
  );

  ballsR[9][0].pos = createVector(
    ballsR[0][1].pos.x + 295 / 4 + 10,
    ballsR[0][1].pos.y - 25
  );
  ballsR[9][6].pos = createVector(
    ballsR[0][1].pos.x + (3 * 295) / 4 - 30,
    ballsR[0][1].pos.y - 25
  );

  ballsR[10][0].pos = createVector(
    ballsR[0][1].pos.x + (3 * 295) / 4 - 30,
    ballsR[0][1].pos.y - 25
  );
  ballsR[10][6].pos = createVector(ballsR[4][4].pos.x, ballsR[4][4].pos.y);

  noFill();
  strokeWeight(8);
  for (let i = 0; i < ballsR.length - 3; i++) {
    beginShape();
    curveVertex(ballsR[i][0].pos.x, ballsR[i][0].pos.y);
    for (let j = 0; j < ballsR[0].length; j++) {
      curveVertex(ballsR[i][j].pos.x, ballsR[i][j].pos.y);
    }
    //curveVertex(ballsR[i][6].pos.x,ballsR[i][6].pos.y)
    endShape();
  }

  line(
    ballsR[0][1].pos.x + 295 / 4 + 38,
    ballsR[0][1].pos.y - 25,
    ballsR[0][1].pos.x + 295 / 4 + 38,
    ballsR[0][1].pos.y - 15
  );
  line(
    ballsR[0][1].pos.x + 295 / 2 + 12,
    ballsR[0][1].pos.y - 25,
    ballsR[0][1].pos.x + 295 / 2 + 12,
    ballsR[0][1].pos.y - 15
  );

  strokeWeight(12);
  for (let i = 8; i < ballsR.length; i++) {
    beginShape();
    curveVertex(ballsR[i][0].pos.x, ballsR[i][0].pos.y);
    for (let j = 0; j < ballsR[0].length; j++) {
      curveVertex(ballsR[i][j].pos.x, ballsR[i][j].pos.y);
    }
    curveVertex(ballsR[i][6].pos.x, ballsR[i][6].pos.y);
    endShape();
  }
  pop();
}

///// CLASS /////

let C_GRAVITY = 1;
let DISTANCE_BTW_ballsR = 30;

class Spring {
  constructor(a, b, restLength, stiffness) {
    this.bobA = a;
    this.bobB = b;
    this.len = restLength;
    this.k = stiffness; // spring constant
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

        if (distance < this.rad + DISTANCE_BTW_ballsR) {
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
    stroke(0);
    fill(255, 150);
    circle(0, 0, this.rad * 2);
    pop();
  }
}
