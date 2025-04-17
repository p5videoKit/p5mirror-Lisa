// CCLab Mini Project - 9.R Particles Template

let fireworks = [];

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(50);

  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].display();
    if (fireworks[i].isDone()) {
      fireworks.splice(i, 1);
    }
  }
}

function mousePressed() {
  createRisingParticle(mouseX, height);
}

function createRisingParticle(x, y) {
  let Color = color(random(200, 255), random(200, 255), random(200, 255));
  let risingParticle = new RisingParticle(x, y, Color);
  fireworks.push(risingParticle);
}

class RisingParticle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = random(2, 6);
    this.particle = 255;
  }

  update() {
    this.y -= this.speed;
    this.particle -= 2;
    if (this.particle <= 0) {
      this.explode();
    }
  }

  display() {
    noStroke();
    fill(this.color, this.particle);
    circle(this.x, this.y, 8);
  }

  explode() {
    let explosionColor = this.color; 
    let firework = new Firework(this.x, this.y, explosionColor);
    fireworks.push(firework);
  }

  isDone() {
    return this.particle <= 0;
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    let angle = random(TWO_PI);
    let speed = random(2, 6); 
    this.vx = cos(angle) * speed;
    this.vy = sin(angle) * speed;
    this.particle = 255;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.particle -= 5;
  }

  display() {
    noStroke();
    fill(this.color, this.particle);
    circle(this.x, this.y, 8);
  }

  isDone() {
    return this.particle <= 0;
  }
}

class Firework {
  constructor(x, y, color) {
    this.particles = [];
    this.exploded = false;
    this.x = x;
    this.y = y;
    this.color = color;
    this.explodeTime = millis() + random(200, 500);
  }

  update() {
    if (!this.exploded && millis() > this.explodeTime) {
      this.explode();
      this.exploded = true;
    }

    for (let particle of this.particles) {
      particle.update();
    }
  }

  display() {
    if (!this.exploded) {
      noStroke();
      fill(this.color);
      circle(this.x, this.y, 8);
    } else {
      for (let particle of this.particles) {
        particle.display();
      }
    }
  }

  explode() {
    for (let i = 0; i < 100; i++) {
      let p = new Particle(this.x, this.y, this.color);
      this.particles.push(p);
    }
  }

  isDone() {
    return this.exploded && this.particles.every(p => p.isDone());
  }
}
