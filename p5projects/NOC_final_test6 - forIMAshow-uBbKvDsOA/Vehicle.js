class Vehicle {
  constructor(x,y) {
    this.pos = createVector(x,y);
    this.vel = createVector(0,-0.1);
    this.acc = createVector();
    this.angle = 0;
    this.maxDesired = random(5);
    this.maxSteer = random(0.05,0.08);
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.angle = this.vel.heading();
    this.vel.limit(1.5)
    this.pos.sub(createVector(-forward*15,0))
    
  }
  flow(angle) {
    let desired = p5.Vector.fromAngle(angle); 
    desired.setMag(this.maxDesired);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxSteer);
    this.applyForce(steer);
  }
  applyForce(force) {
    this.acc.add(force);
  }
  checkEdges() {
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
  display(){
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    
    noStroke();
    fill(0);
    triangle(0,0,-20,8,-20,-8);
    point(0,0)
    
    pop();
  }
}

class Flock {
  constructor() {
    this.boids = [];
    this.generate();
    this.color = color(0, 0, 0);
  }
  generate() {
    for (let i = 0; i < ui.Num; i++) {
      let x =(i+1)*width/(ui.Num+1)+random()*60;
      let y = height/4+random(-1,1)*60;
      this.boids.push(new Boid(x, y, random(10, 15)));
    }
  }
  // update(){
  //   this.generate()
  // }
  run() {
    push();
    fill(this.color);
    noStroke();
    for (const b of this.boids) {
      b.flock(this.boids);
      b.reappear();
      b.update();
     // b.display();
    }
    pop();
    // if (this.boids.length > 0) {
    //   let mousePos = createVector(mouseX, mouseY);
    //   let seekForce = this.boids[0].seek(mousePos);
    //   seekForce.mult(1); 
    //   this.boids[0].applyForce(seekForce);
    // }
  }
}

class Boid {
  constructor(x = 0, y = 0, size = 1) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    this.size = size;
    this.mass = random(0.1,1);
    //
    this.angle = 0;
    //
    this.maxSpeed = 3;
    this.maxSteerForce = 0.1;
    //
    this.sepaDistance = 220;
    this.neigDistance = 240;
    this.wanderAngle = random(TWO_PI);
  }
  flock(others) {
    let noiseVec = p5.Vector.fromAngle(noise(this.pos.x * 0.005, abs(this.pos.y-height) * 0.004) * TWO_PI).limit(this.maxSteerForce);
    
    this.applyForce(noiseVec);
    
    let mousePos = createVector(mouseX, mouseY);
    let centerPos=createVector(this.pos.x,height/4+50)

    let seekForce = this.seek(centerPos);
    let sepaForce = this.separate(others);
    let coheForce = this.cohesion(others);
    let alignForce = this.align(others);
    
    // let noiseAngle=noise(frameCount*0.1)*2
    // let noiseVector=p5.Vector.fromAngle(noiseAngle).setMag(this.maxSpeed * 0.5)
    
    // this.applyForce(noiseVector);
    // this.vel.limit(this.maxSpeed)
    
    seekForce.mult(0.2); // 100%
    sepaForce.mult(0.85); // 100%
    coheForce.mult(0); // 50%
    alignForce.mult(0.1); // 100%

    this.applyForce(seekForce);
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
    if (this.pos.x < -180) {
      this.pos.x = width+180;
    } else if (this.pos.x > width+180) {
      this.pos.x = -180;
    }
    if (this.pos.y < -180) {
      this.pos.y = height+180;
    } else if (this.pos.y > height+180) {
      this.pos.y = -180;
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
    this.vel.limit(3)
    //this.pos.sub(createVector(2,0))
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    triangle(0, 0, -this.size, -this.size * 0.4, -this.size, this.size * 0.4);
    pop();
  }
}

class Mover {
  constructor(x, y) {
    this.pos = createVector(x, y);
    // this.vel = createVector(1, -1);
    this.vel = createVector(0, 1);
    this.vel.setMag(7);
  }
  update() {
    let mouse = createVector(650, 200);
    this.acc = p5.Vector.sub(mouse, this.pos);
    //this.acc.mult(0.0004);//circle v=mv^2/R 是个圆？？？
    this.acc.mult(0.0003); //ellipse in the same position重复椭圆
    //this.acc.setMag(2);//ellipse but pos will change 位置会变，椭圆
    this.vel.add(this.acc);
    //this.vel.limit(5);
    this.pos.add(this.vel);
  }
  show() {
    stroke(255);
    strokeWeight(2);
    fill(255, 100);
    ellipse(this.pos.x, this.pos.y, 32);
  }
}
