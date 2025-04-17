let moverA;
let moverB;
let i=0
let lerpFactor = 0;

function setup() {
  createCanvas(600, 600);
  moverA = new Mover(100, 200, 2);
  moverB = new Mover(300, 200, 4);
  background(0)
}

function draw() {
  background(0);

  push()
  translate(width/2,height/2)
  if (mouseIsPressed){
    i++
  }
  
  stroke(255)
  // x1=sin(i*0.05)*120
  // y1=cos(i*0.05)*40-160
  x1=0
  y1=0
  x2=sin(i*0.05)*20
  y2=cos(i*0.05)*20/3+70+160
  x3=sin(i*0.05)*120
  y3=cos(i*0.05)*120/3.2+160
  
  circle(x1,y1,10)
  circle(x2,y2,10)
  circle(x3,y3,10)
  line(x1,y1,x2,y2)
  line(x1,y1,x3,y3)
  
  mover1=createVector(x2,y2)
  mover2=createVector(x3,y3)

  if (mouseIsPressed) {
    lerpFactor += 0.02;
  } else {
    lerpFactor -= 0.05;
  }
  lerpFactor = constrain(lerpFactor, 0, 1);
   
  let bellPos = p5.Vector.lerp(mover1, mover2, lerpFactor);
    fill(255, 204, 0); 
    ellipse(bellPos.x, bellPos.y, 15, 15); 
  
  
  if (keyIsPressed) {
    let wind = createVector(10, 0);
    moverA.applyForce(wind);
    moverB.applyForce(wind);
  }
  
  let gravity = createVector(0, 5);
  let weightA = p5.Vector.mult(gravity, moverA.mass);
  let weightB = p5.Vector.mult(gravity, moverB.mass);
  moverA.applyForce(weightA);
  moverB.applyForce(weightB);
  
  moverA.update(100);
  
  moverA.show();

  moverB.update(200);
  
  moverB.show();

  pop()
}

class Mover {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.mass = m;
    this.r = sqrt(this.mass) * 10;
  }


  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }


  update(length) {

    // let mouse = createVector(mouseX, mouseY);
    // this.acc = p5.Vector.sub(mouse, this.pos);
    // this.acc.setMag(0.1);

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.vel.limit(20)
    this.acc.set(0, 0);
    this.pos.setMag(length)
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
    line(0,0,this.pos.x,this.pos.y)
  }
}