let ballsC = [];
let springsC = [];
let back

function preload(){
  back=loadImage("metro6.png")
}

function setup() {
  createCanvas(1280, 720);
   for (let i=0;i<9;i++){
    ballsC.push(new Ball(i*10,0,20))
  }
  
  springsC.push(new Spring(ballsC[0],ballsC[8],100,0.8))
  for (let i=0;i<8;i++){
    springsC.push(new Spring(ballsC[i],ballsC[i+1],45,0.3))
  }
   springsC.push(new Spring(ballsC[1],ballsC[7],70,0.1))
   springsC.push(new Spring(ballsC[2],ballsC[6],40,0.2))
   springsC.push(new Spring(ballsC[3],ballsC[5],10,0.1))
}

function draw() {
  background(220);
  image(back,0,0,width,height)
  drawConfidence(mouseX,mouseY)

}

function drawConfidence(x,y){
  for (let s of springsC) {
    s.update();
    //s.display();
  }

  for (let b of ballsC) {
    b.drag();
    //b.bounce();
    b.update();
    //b.display();
  }
  
  push()
  translate(x,y)
  scale(0.8)
  for (let i=0;i<9;i++){
    ballsC[i].applyForce(createVector(1/(abs(4-i)**3+0.5)+(noise(frameCount*0.1+i)-0.5)*6,-abs(4-i)*0.6-1+(noise(frameCount*0.01+i)-0.5)*2))
  }
  
  ballsC[0].pos=createVector(-50,0)
  ballsC[8].pos=createVector(50+sin(frameCount*0.1)*4,cos(frameCount*0.1)*4)
  
  noFill(0)
  stroke(255)
  strokeWeight(6)
  beginShape()
  curveVertex(ballsC[4].pos.x,ballsC[4].pos.y)
  for(let i=4;i<9;i++){
    curveVertex(ballsC[i].pos.x,ballsC[i].pos.y)
  }
  curveVertex(ballsC[8].pos.x,ballsC[8].pos.y)
  endShape()
  
  beginShape()
  curveVertex(ballsC[0].pos.x,ballsC[0].pos.y)
  for(let i=0;i<5;i++){
    curveVertex(ballsC[i].pos.x,ballsC[i].pos.y)
  }
  curveVertex(ballsC[4].pos.x,ballsC[4].pos.y)
  endShape()
  
  drawArc(ballsC[0].pos, ballsC[8].pos, radians(140))
  
  //ballsC[0].pos.add(createVector(10*sin(frameCount*0.1),0))
  noFill()
  ellipse(-18+sin(frameCount*0.1)*4,100+sin(frameCount*0.1)*4,10,10)
  ellipse(18-sin(frameCount*0.1-PI)*4,100+sin(frameCount*0.1-PI)*4,10,10)
  pop()
}

function drawArc(pointA, pointB, angle) {
  let midpoint = p5.Vector.add(pointA, pointB).div(2);
  let halfChord = p5.Vector.dist(pointA, pointB) / 2;
  let radius = halfChord / sin(angle / 2);

  
  let distanceToCenter = sqrt(radius*radius - halfChord*halfChord);

  let angleRotate = atan2(pointB.y - pointA.y, pointB.x - pointA.x) + PI*0.5;

  let center = createVector(midpoint.x + cos(angleRotate) * distanceToCenter,
                             midpoint.y + sin(angleRotate) * distanceToCenter);
  let startAngle = atan2(pointA.y - center.y, pointA.x - center.x);
  let endAngle = atan2(pointB.y - center.y, pointB.x - center.x);

  noFill()
  stroke(255);
  strokeWeight(6);
  arc(center.x, center.y, radius * 2, radius * 2, endAngle, startAngle);
  
  fill(255,150)
  noStroke()
  ellipse(center.x,center.y+6,radius*2-18,radius*2-20)
  
  stroke(255)
  strokeWeight(5)
  line(center.x-(radius*2-18)/5,center.y+10-(radius*2-20)/10,center.x-(radius*2-18)/5,center.y+10+(radius*2-20)/10)
  line(center.x+(radius*2-18)/5,center.y+10-(radius*2-20)/10,center.x+(radius*2-18)/5,center.y+10+(radius*2-20)/10)
  
}


///// CLASS /////

let C_GRAVITY = 1;
let DISTANCE_BTW_ballsC = 30;

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
    this.damping = 0.8; // -5%
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

        if (distance < this.rad + DISTANCE_BTW_ballsC) {
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
    if(this==ballsC[4]){
      fill(110)
    }
    circle(0, 0, this.rad * 2);
    pop();
  }
}
