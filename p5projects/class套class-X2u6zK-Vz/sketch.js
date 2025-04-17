let fireworks = [];
let gravity;

function setup() {
  createCanvas(600, 600);
  colorMode(RGB);
  gravity = createVector(0, 0.2);
  stroke(255);
  strokeWeight(4);
  background(0);
}

function draw() {
  colorMode(RGB, 255, 255, 255, 1);
  background(0, 0, 0, 0.1);
  
  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }
}

function mousePressed() {
  let firework = new Firework(mouseX);
  fireworks.push(firework);
}

// Firework class
class Firework {
  constructor(x) {
    this.firework = new Particle(x, height, true);
    this.exploded = false;
    this.particles = [];
  }
  
  done() {
    if (this.exploded && this.particles.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  update() {
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();
      
      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }
    
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();
      
      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  }
  
  explode() {
    for (let i = 0; i < 100; i++) {
      let p = new Particle(this.firework.pos.x, this.firework.pos.y, false);
      this.particles.push(p);
    }
  }
  
  show() {
    if (!this.exploded) {
      this.firework.show();
    }
    
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].show();
    }
  }
}

// Particle class
class Particle {
  constructor(x, y, firework) {
    this.pos = createVector(x, y);
    this.firework = firework;
    this.lifespan = 255;
    
    if (this.firework) {
      this.vel = createVector(0, random(-12, -8));
    } else {
      this.vel = p5.Vector.random2D();
      this.vel.mult(random(2, 10));
    }
    
    this.acc = createVector(0, 0);
    this.color = color(random(255), random(255), random(255));
  }
  
  done() {
    if (this.lifespan < 0) {
      return true;
    } else {
      return false;
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    if (!this.firework) {
      this.vel.mult(0.9);
      this.lifespan -= 4;
    }
    
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    colorMode(RGB);
    
    if (!this.firework) {
      strokeWeight(2);
      stroke(this.color, this.lifespan);
    } else {
      strokeWeight(4);
      stroke(this.color);
    }
    
    point(this.pos.x, this.pos.y);
  }
}
