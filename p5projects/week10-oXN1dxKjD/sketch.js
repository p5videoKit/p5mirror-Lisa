let v;
let girl;

let gui
let settings={
  debugMode:false
}


function setup() {
  createCanvas(1000, 700);
  //createCanvas(windowWidth, windowHeight)

  v = new Vehicle(20, 20, 15).setMaxSpeed(4);
  v2 = new Vehicle(450, 150, 15).setMaxSpeed(3.5);
  
  gui=new dat.GUI()
  gui.add(settings, 'debugMode').name('debugMode').onChange(update);

}

function update() {
        v.debugMode = settings.debugMode;  
    }

function preload() {
  girl = loadImage("girl.png");
  cat = loadImage("cat.png");
  aaa=loadImage("aaa.png");
  hhh=loadImage("hhh.png");
}
// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
function draw() {
  background(201, 232, 217);
  drawMap();

  leaveSteps();

  let mousePos = createVector(mouseX, mouseY);
  v.seekRad = 500;
  v.seek(v2.pos);
  v.update();
  v.setBarriers();
  v.reappear();
  v.display2(girl, 60);
  
  if (settings.debugMode) {
        v.deBug(); 
    }

  v2.update();
  v2.setBarriers();
  v2.reappear();
  v2.display2(cat, 50);
  v2.drag();
  

  // if(stop<v.brakeRad){
  //   v2.vel=createVector(0,0)
  // }else{
  //   v2.wander()
  // }

  behavior();
  let millisecond = millis().toFixed(0);
  //text('Milliseconds \nrunning: \n' + millisecond, 5, 40);
  //reference page with"millis()""
}

///// CLASS /////

class Vehicle {
  constructor(x = 0, y = 0, size = 1) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.size = size;
    this.mass = 1;
    
    this.angle = 0;
    
    this.maxSpeed = 3.5;
    this.maxSteerForce = 0.1;
    
    this.barrierRadius = 5;
    this.detectRadius = 35;

    this.seekRad = 400;
    this.brakeRad = 80;

    this.detectVector = createVector();
    this.directionVector = createVector();
    this.predictDistance = 30;
    this.wanderAngle = random(TWO_PI);
  }
  setMaxSpeed(max) {
    this.maxSpeed = max;
    return this;
  }
  wander() {
    this.detectVector = p5.Vector.mult(
      this.vel.copy().normalize(),
      this.predictDistance
    );
    let centerPos = p5.Vector.add(this.pos, this.detectVector);

    this.wanderAngle += random(-0.2, 0.2);

    this.directionVector = p5.Vector.fromAngle(this.wanderAngle);
    this.directionVector.setMag(this.detectRadius);

    let directionPos = p5.Vector.add(centerPos, this.directionVector);
    this.seek(directionPos);
  }
  seek(targetPos) {
    let desiredVec = p5.Vector.sub(targetPos, this.pos);

    let distance = desiredVec.mag();
    if (distance < this.seekRad) {
      desiredVec.normalize();
      // to arrive
      if (distance > this.brakeRad) {
        desiredVec.mult(this.maxSpeed);
      } else {
        let maxSpd = map(distance, this.brakeRad, 46, this.maxSpeed, 0);
        desiredVec.mult(maxSpd);
      }

      let steerForce = p5.Vector.sub(desiredVec, this.vel);
      steerForce.limit(this.maxSteerForce);

      this.applyForce(steerForce);
    }
  }
  setBarriers() {
    for (let i = 0; i < 15; i++) {
      this.repelled(createVector(200 + i * 20, 200));
      this.repelled(createVector(200, 200 + i * 10));
      this.repelled(createVector(200 + i * 20, 350));
      this.repelled(createVector(500, 200 + i * 10));
      this.repelled(createVector(610+110/15*i,134));
      this.repelled(createVector(610+110/15*i,134+220));
      this.repelled(createVector(610,134+220/15*i));
      this.repelled(createVector(610+110,134+220/15*i));
    }
    for (let i = 0; i < 30; i++) {
      this.repelled(createVector(200 + (510 * i) / 30, 480));
      this.repelled(createVector(200, 480 + (80 / 30) * i));
      this.repelled(createVector(700, 480 + (80 / 30) * i));
      this.repelled(createVector(200 + (510 * i) / 30, 480 + 80));
      
      this.repelled(createVector(830+70/30*i,137));
      this.repelled(createVector(830+70,137+490/30*i));
      this.repelled(createVector(830+70/30*i,137+490));
      this.repelled(createVector(830,137+490/30*i));
      //ellipse(90+50*cos(i*PI/15),100+50*sin(i*PI/15),this.barrierRadius,this.barrierRadius)
      this.repelled(createVector(90+50*cos(i*PI/15),100+50*sin(i*PI/15)));
    }
  }
  repelled(position) {
    let distance = this.pos.dist(position);
    if (distance < this.detectRadius + this.barrierRadius) {
      let force = p5.Vector.sub(position, this.pos);
      force.normalize().mult(-0.3);
      this.applyForce(force);
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
  deBug() {
    strokeWeight(1);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);

    noFill();
    stroke(0, 0, 255);
    circle(0, 0, this.seekRad * 2);

    stroke(255, 0, 0);
    circle(0, 0, this.brakeRad * 2);

    stroke(0, 255, 0);
    circle(0, 0, this.detectRadius * 2); //green
    pop();
  }
  display2(img, size) {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    imageMode(CENTER);
    image(img, 0, 0, size, size);
    pop();
  }

  display() {
    strokeWeight(1);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    stroke(255);
    fill(255);
    circle(0, 0, 40);
    fill(0);
    triangle(0, 0, -this.size, -this.size * 0.4, -this.size, this.size * 0.4);
    pop();
  }
  drag() {
    if (mouseIsPressed) {
      let distance = dist(this.pos.x, this.pos.y, mouseX, mouseY);
      if (distance < 35) {
        // in
        this.pos.x = mouseX;
        this.pos.y = mouseY;
      }
    }
  }
}
