let balls = [];
let springs = [];
let tails = [];
let linkTail = [];

function setup() {
  createCanvas(800, 600);

  for (let i = 0; i < 8; i++) {
    balls.push(new Ball(i, i, 30));
    stroke(0);
  }

  for (let i = 0; i < balls.length; i++) {
    balls[i].rad = 80;
    if (i != balls.length - 1) {
      springs.push(
        new Spring(
          balls[i],
          balls[i + 1],
          1.6 * 40 * sqrt(2 - 2 / sqrt(2)),
          0.9
        )
      );
    } else {
      springs.push(
        new Spring(balls[i], balls[0], 1.6 * 40 * sqrt(2 - 2 / sqrt(2)), 0.9)
      );
    }
  }
  for (let i = 0; i < balls.length / 2; i++) {
    springs.push(new Spring(balls[i], balls[i + balls.length / 2], 580, 0.12));
  }

  for (let i = 0; i < 6; i++) {
    tails.push(new Ball(i, i, 10));
    stroke(0);
  }

  for (let i = 0; i < tails.length - 1; i++) {
    linkTail.push(new Spring(tails[i], tails[i + 1], 5, 0.95));
  }
}

function draw() {
  background(220);

  for (let s of springs) {
    s.update();
    //s.display();
  }
  noStroke();
  //noFill()

  fill(0);
  beginShape();
  for (let b of balls) {
    b.mass = 10;
    b.drag();
    //b.container()

    b.update();

    b.display();

    let gravity = createVector(0, 8);
    b.applyForce(gravity);
    b.stayInCanvas();

    curveVertex(b.pos.x, b.pos.y);
  }
  for (let b of balls) {
    curveVertex(b.pos.x, b.pos.y);
  }
  endShape(CLOSE);

  drawTails();

  noStroke();
  fill(248, 224, 15);
  circle(
    balls[7].pos.x + (balls[1].pos.x - balls[7].pos.x) / 2,
    balls[1].pos.y + (balls[7].pos.y - balls[1].pos.y) / 2,
    50
  );
  circle(
    balls[7].pos.x + (balls[3].pos.x - balls[7].pos.x) / (1 + 1.8 * sqrt(2)),
    balls[3].pos.y + (balls[7].pos.y - balls[3].pos.y) / (1.2 * sqrt(2)),
    50
  );

  fill(0);
  circle(
    balls[7].pos.x + (balls[1].pos.x - balls[7].pos.x) / 2,
    balls[1].pos.y + (balls[7].pos.y - balls[1].pos.y) / 2,
    38
  );
  circle(
    balls[7].pos.x + (balls[3].pos.x - balls[7].pos.x) / (1 + 1.8 * sqrt(2)),
    balls[3].pos.y + (balls[7].pos.y - balls[3].pos.y) / (1.2 * sqrt(2)),
    38
  );

  stroke(255);
  noFill();
  push();

  drawBottle();
}

function drawTails() {
  for (let l of linkTail) {
    l.update();
    l.display();
  }

  noFill();
  stroke(0);
  strokeWeight(50);
  beginShape();
  curveVertex(balls[3].pos.x, balls[3].pos.y);
  for (let t of tails) {
    t.drag();
    t.stayInCanvas();
    t.update();
    t.display();

    let G = createVector(0, 4);
    t.applyForce(G);

    curveVertex(t.pos.x, t.pos.y);
  }

  endShape();

  tails[0].pos.x = balls[3].pos.x;
  tails[0].pos.y = balls[3].pos.y;
  for(let b of balls){
    b.stayInCanvas()
  }
}

function drawBottle() {
  strokeWeight(10);
  line(300, height - 200, 300, height);

  // for(let b of balls){
  //   if(b.pos.x>200&&b.pos.y>200){
  //     b.pos.x=constrain(b.pos.x,200,width)
  //    // console.log(b.pos)
  //   }
  // }
}

function mousePressed() {
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    if (b.pressed()) {
      break;
    }
  }
  // for(let b of balls){
  //   b.stayInCanvas()
  // }
}

function mousedrag() {
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    b.drag();
    //b.stayInCanvas()
  }
}

function mouseReleased() {
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    b.isDragging = false;
    //b.stayInCanvas()
  }
}

///// CLASS /////

let C_GRAVITY = 1;
let DISTANCE_BTW_BALLS = 30;

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
    this.pos = createVector(
      40 * cos((x * PI) / 4 - PI / 8),
      40 * sin((x * PI) / 4 - PI / 8)
    );
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.rad = rad;
    this.mass = 12; // MASS!
    //
    this.damping = 0.89;
    this.isDragging = false;
    this.minLeft = 0;
    this.minRight = width;
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // let's apply damping here
    this.vel.mult(this.damping); // -5%;
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
  stayInCanvas() {
    if (this.pos.x > 280 && this.pos.y > height - 200) {
      this.pos.x = constrain(this.pos.x, 300, width);
      //print(this.pos.x);
    } else {
      this.pos.x = constrain(this.pos.x, 0, width);
    }

    // Constraint for the top and bottom of the canvas.
    this.pos.y = constrain(this.pos.y, 0, height);
  }

  pressed() {
    let distance = dist(mouseX, mouseY, this.pos.x, this.pos.y);
    if (distance < this.rad) {
      this.isDragging = true;
      return true;
    } else {
      return false;
    }
  }
  drag() {
    if (this.isDragging) {
      // in
      this.pos.x = mouseX;
      this.pos.y = mouseY;
    }
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    stroke(255, 0, 0);
    fill(255, 150);
    //circle(0, 0, this.rad * 2);
    pop();
  }
}
