let balls = [];
let springs = [];

function setup() {
  createCanvas(1600, 500);

  let a = new Ball(-50, -150, 40);
  balls.push(a);
  let b = new Ball(-50, 150, 40);
  balls.push(b);
  let c = new Ball(50, 0, 30);
  balls.push(c);

  springs.push(new Spring(a, b, 180, 0.2));
  springs.push(new Spring(b, c, 150, 0.2));
  springs.push(new Spring(c, a, 150, 0.2));
  
  for(let i=0;i<16;i++){
    balls.push(new Ball(i*10,0,5))
  }
  
  for(let j=0;j<4;j++){
  for(let i=3;i<6;i++){
    springs.push(new Spring(balls[i+j*4],balls[i+1+j*4],15,0.2))
  }
  }
}

function draw() {
  background(220);

  translate(mouseX,mouseY)
  rotate(-0.6)
  scale(1)
  
  beginShape()
  vertex(balls[1].pos.x,balls[1].pos.y)
  vertex(balls[2].pos.x,balls[2].pos.y)
  vertex(balls[0].pos.x,balls[0].pos.y)
  endShape(CLOSE)
  
  for (let s of springs) {
    s.update();
    s.display();
  }

  
  for (let i=0;i<balls.length;i++) {
    let b=balls[i]
    b.drag();
   //b.bounce();
  //b.reappear()
    b.update();
    if(i!==3&&i!==7&&i!==11&&i!==15){
      b.display();
    }
    
  }
  
  balls[3].pos.x=balls[0].pos.x
  balls[3].pos.y=balls[0].pos.y
  balls[7].pos.x=balls[0].pos.x
  balls[7].pos.y=(balls[1].pos.y-balls[0].pos.y)/3+balls[0].pos.y
  balls[11].pos.x=balls[1].pos.x
  balls[11].pos.y=2*(balls[1].pos.y-balls[0].pos.y)/3+balls[0].pos.y
  balls[15].pos.x=balls[1].pos.x
  balls[15].pos.y=balls[1].pos.y
  
  for (let i=4;i<19;i++){
    balls[i].applyForce(createVector(-2,0))
  }
  
  strokeWeight(10)
  stroke(0)
  
  balls[2].pos.add(createVector(sin(frameCount*0.1)*5,0))
 
  // balls[1].pos.add(createVector(10+sin(frameCount*0.3)*6,0))
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
    
    stroke(0);
    fill(0);
    if (this==balls[2]){
      fill(110)
    }
    circle(0, 0, this.rad * 2);
    pop();
  }
}
