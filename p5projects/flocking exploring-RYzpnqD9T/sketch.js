let flocks = [];

function setup() {
  createCanvas(700, 800);
  background(0);
  
  //flocks.push(new Flock(30));
  flocks.push(new Flock(100));
}

function draw() {
  background(0);
  
  for (let f of flocks) {
    f.run();
  }
}


///// CLASS /////

class Flock {
  constructor( number) {
    this.boids = [];
    this.generate(number);
    this.color = color(random(255), random(255), random(255));
  }
  generate(number) {
    for (let i = 0; i < number; i++) {
      let x = random(width);
      let y = random(height);
      this.boids.push(new Boid(x, y, random(10, 15)));
    }
  }
  run() {
    push();
    fill(this.color);
    noStroke();
    for (const b of this.boids) {
      b.flock(this.boids);
      b.reappear();
      b.update();
      b.display();
    }
    pop();
  }
}

class Boid {
  constructor(x = 0, y = 0, size = 1) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.size = size;
    this.mass = 1;
    //
    this.angle = 0;
    //
    this.maxSpeed = 3;
    this.maxSteerForce = 0.1;
    //
    this.sepaDistance = 100;
    this.neigDistance = 140;
  }
  flock(others) {
    let mousePos = createVector(mouseX, mouseY);

    let seekForce = this.seek(mousePos);
    let sepaForce = this.separate(others);
    let coheForce = this.cohesion(others);
    let alignForce = this.align(others);

    seekForce.mult(0.3); // 100%
    sepaForce.mult(0.3); // 100%
    coheForce.mult(0.5); // 50%
    alignForce.mult(0.8); // 100%

    //this.applyForce(seekForce);
    this.applyForce(sepaForce);
    this.applyForce(coheForce);
    this.applyForce(alignForce);
  }
  align(others) {
    let velocity = createVector(); // empty vector for sum

    let count = 0;
    for (let other of others) {
      let distance = this.pos.dist(other.pos);
      if (this != other && distance > 0 && distance < this.neigDistance) {
        velocity.add(other.vel); // sum!
        count++;
      }
    }
    if (count > 0) {
      velocity.div(count); // avg;
      velocity.setMag(this.maxSpeed); //desired velocity

      let steerForce = p5.Vector.sub(velocity, this.vel);
      steerForce.limit(this.maxSteerForce);

      return steerForce;
    }
    return velocity; // empty vector (0, 0)
  }

  separate(others) {
    let vector = createVector(); // sum for now

    let count = 0;
    for (let other of others) {
      let distance = this.pos.dist(other.pos);
      if (this != other && distance > 0 && distance < this.sepaDistance) {
        let diff = p5.Vector.sub(this.pos, other.pos);
        diff.normalize();
        diff.div(distance);
        vector.add(diff); // sum
        count++;
      }
    }
    // get the average!
    if (count > 0) {
      vector.div(count);
    }
    if (vector.mag() > 0) {
      // desired Vector
      vector.setMag(this.maxSpeed);
      // steer force
      vector.sub(this.vel);
      vector.limit(this.maxSteerForce);
    }
    return vector; // return the steering force
  }

  cohesion(others) {
    let position = createVector(); // sum for now

    let count = 0;
    for (let other of others) {
      let distance = this.pos.dist(other.pos);
      if (this != other && distance > 0 && distance < this.neigDistance) {
        position.add(other.pos);
        count++;
      }
    }
    if (count > 0) {
      position.div(count); // average now!
      let force = this.seek(position);
      return force;
    }
    return position;
  }

  seek(targetPos) {
    let desiredVec = p5.Vector.sub(targetPos, this.pos);
    desiredVec.normalize();
    desiredVec.mult(this.maxSpeed);

    let steerForce = p5.Vector.sub(desiredVec, this.vel);
    steerForce.limit(this.maxSteerForce);

    return steerForce;
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
  applyForce(f) {
    if (this.mass > 0) {
      let force = p5.Vector.div(f, this.mass);
      this.acc.add(force);
    }
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    //
    this.angle = this.vel.heading();
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    triangle(0, 0, -this.size, -this.size * 0.4, -this.size, this.size * 0.4);
    pop();
  }
}
