//please try to click the mouse;-D
let moverA = [];
let moverB = [];
let blowerC = [];
let blowerD;
let c = 0;
let lerpFactor = 0;
let bellPos = [];
let weightC = [];

function setup() {
  createCanvas(400, 700);
  for (i = 0; i < 6; i++) {
    moverA[i] = new Mover(20, (i * PI) / 3, 0);
  }
  for (i = 0; i < 6; i++) {
    moverB[i] = new Mover(90, (i * PI) / 3, -10);
  }

  for (i = 0; i < 10; i++) {
    blowerC[i] = new blower(100, 200, 2 + map(abs(i - 4.5), 0, 4.5, 0, 5));
  }


  background(0);
}

function draw() {
  background(10,18,53);
  
  noStroke()
  fill(255)
  circle(width/2+5,90,120)
  fill(10,18,53)
  circle(width/2+40,90,60)
  
  stroke(234,191,176)
  drawSparkle(20,150)
  drawSparkle(120,70)
  drawSparkle(50,500)
  drawSparkle(350,600)
  drawSparkle(300,300)

  push();
  translate(width / 2, height / 2 - 220);

  for (i = 0; i < moverA.length; i++) {
    moverA[i].update((i * PI) / 3);
    moverA[i].show();
  }
  for (i = 0; i < moverB.length; i++) {
    moverB[i].update((i * PI) / 3);
    moverB[i].show();
  }

  if (mouseIsPressed) {
    lerpFactor += 0.02;
  } else {
    lerpFactor -= 0.05;
  }
  lerpFactor = constrain(lerpFactor, 0, 1);

  for (i = 0; i < 6; i++) {
    bellPos[i] = p5.Vector.lerp(moverA[i].pos, moverB[i].pos, lerpFactor);
    fill(255);
    ellipse(bellPos[i].x, bellPos[i].y, 15, 15);
    line(0, 0, bellPos[i].x, bellPos[i].y);
  }

  push();
  translate(0, 300);
  
  for (i = 0; i < 10; i++) {
    blowerC[i].update(100 + map(abs(i - 4.5), 0, 4.5, 0, 100));
    let gravity = createVector(0, 5);
    weightC[i] = p5.Vector.mult(gravity, blowerC[i].mass);
    blowerC[i].applyForce(weightC[i]);
    if (mouseIsPressed) {
      let wind = createVector(10, 0);
      blowerC[i].applyForce(wind);
    }
    push();
    translate(-cos((i * PI) / 5 + 0.1) * 90, -sin((i * PI) / 5 + 0.1) * 40);
    blowerC[i].show();
    ellipse(0, 0, 70, 40);
    pop();
  }
  pop();

  pop();
}

class Mover {
  constructor(timer, yoff, Y) {
    this.timer = timer;
    this.Y = Y;
    this.pos = createVector(sin(yoff) * timer, (cos(0) * timer) / 3 + Y + 160);
    this.r = 10;
  }

  update(yoff) {
    if (mouseIsPressed) {
      c++;
      this.pos.x = sin(c * 0.005 + yoff) * this.timer;
      this.pos.y = (cos(c * 0.005 + yoff) * this.timer) / 3 + this.Y + 160;
    }
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(255);
    //ellipse(this.pos.x, this.pos.y, this.r * 2);
    //line(0,0,this.pos.x,this.pos.y)
  }
}

class blower {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.mass = m;
    this.r = sqrt(this.mass) * 5;
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  update(length) {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.vel.limit(20);
    this.acc.set(0, 0);
    this.pos.setMag(length);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.r * 2);

    line(0, 0, this.pos.x, this.pos.y);
  }
}

function drawSparkle(x,y,s){
  push()
  translate(x,y)
  strokeWeight(3)
  line(-6,0,6,0)
  line(0,11,0,-11)
  pop()
}

