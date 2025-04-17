let particles = [];

function setup() {
  createCanvas(600, 500);

  particles.push(new Particle(width / 2, height / 2, 15));
}

function draw() {
  background(220);

  for (let p of particles) {
    if (keyIsPressed) {
      let hitForce = createVector(1, 0);
      p.applyForce(hitForce);
    }
    
    let gravity = createVector(0, 1);
    p.applyForce(gravity);
    
    p.move();
    p.bounce();
    p.display();
    text(p.vel,10,20)
    //console.log(p.vel)
  }
}

class Particle {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 2);
    this.acc = createVector();
    this.rad = r;
  }
  move() {
    this.vel.add( this.acc );
    this.pos.add( this.vel );
    this.acc.mult(0); // reset!
  }
  applyForce(f) {
    let force = f.copy();
    this.acc.add(force);
  }
  bounce() {
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x *= -1;
    }
    else if (this.pos.x > width) {
      this.pos.x = width;
      this.vel.x *= -1;
    }
    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.vel.y *= -1;
    }
    else if (this.pos.y > height) {
      this.pos.y = height;
      this.vel.y *= -1;
    }
  }
  display() {
    push();
    circle(this.pos.x, this.pos.y, this.rad * 2);
    pop();
  }
}
