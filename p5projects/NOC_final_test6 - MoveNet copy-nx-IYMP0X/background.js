let sinArray = [];
let cosArray = [];
let sinCosResolution = 360 * 2; // 720

let transition = 0;
let stars = [];

function starSetup() {
  for (let i = 0; i < 120; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      speed: random(1, 5),
    });
  }
}

let cX = -100;
let cY = -100;
let mountainColor = 0;

function drawNoiseMountain() {
  backgroundColor = 255;

  constrain(transition, 0, 1);
drawTinyFish()
  
  if (mouseIsInside) {
    if (mountainColor < 255) {
      mountainColor += 2.5;
    }
    transition += (1 - transition) * 0.02;//0.015
  } else {
    if (mountainColor > 0) {
      mountainColor -= 2.5;
    }
    transition -= transition * 0.02;
  }

  drawBackground(transition);
  if (mouseIsInside) {
    drawStars();
  }

  noFill();
  beginShape();
  let xoff = start;
  for (let x = 0; x < width; x++) {
    stroke(mountainColor);
    strokeWeight(1.5);
    // let y = random(height);
    let y = (noise(xoff) * width) / 3;
    vertex(x, y);
    xoff -= inc;
  }
  endShape();

  start += forward; //inc * 30;

  for (let f of flocks) {
    f.run();
  }

  for (let i = 0; i < ui.Num; i++) {
    let c = creatures1[i];
    c.x = flocks[0].boids[i].pos.x;
    c.y = flocks[0].boids[i].pos.y;
    c.angle = flocks[0].boids[i].angle;
    c.update(); // draw is also in this function.
  }

  push();
  image(left, leftPos, 0, width, height);
  image(right, rightPos, 0, width, height);
  image(metro, 0, 0, width, height);
  pop();

  //drawConfidence(cX,cY)

  drawCreatures1();
}

function drawBackground(transition) {
  noFill();
  for (let i = 0; i <= height; i++) {
    let yPos = map(i, 0, height, 0, 1);
    let gradientColor = lerpColor(color(0, 0, 0), color(170, 139, 198), yPos);

    let transitionColor = color(
      red(gradientColor),
      green(gradientColor),
      blue(gradientColor),
      transition * 255
    );
    //stroke(gradientColor,transition * 255);//failed maybe because of the format??? try??RGB??
    stroke(transitionColor);
    line(0, i, width, i);
  }
}

function drawStars() {
  for (let s of stars) {
    fill(255); // White stars
    noStroke();
    ellipse(s.x, s.y, 2, 2);
    // s.x+=s.speed;
    // if(s.x>width){
    //   s.x=0
    //}
  }
}

function drawTinyFish() {
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      let index = r + c * rows; // *** x + y * width

      let x = r * RESOLUTION;
      let y = c * RESOLUTION;

      let xfreq = (x + frameCount) * 0.005;
      let yfreq = (y + frameCount) * 0.01;
      let amp = TWO_PI; // range of angle
      let val = noise(xfreq, yfreq) * amp;

      angles[index] = val;
    }
  }

  for (let i = 0; i < ui.Num*6; i++) {
    let v = vehicles[i];

    let r = floor(v.pos.x / RESOLUTION);
    let c = floor(v.pos.y / RESOLUTION);
    let index = r + c * rows;

    v.flow(angles[index]);
    v.update();
    v.checkEdges();
    v.display();
  }
}

let wave1;
let countxoff = 0;

let flys1 = [];
let flys2 = [];
let drops = [];

function drawWave() {
  backgroundColor = 0;
  let r = random(0, 100);
  if (r > 70) {
    drops.push(new Drop(random(-200, width + 400), "#fdd417"));
    drops.push(new Drop(random(-200, width + 400), "#ffffff"));
    drops.push(new Drop(random(-200, width + 400), "#639e3f"));
    drops.push(new Drop(random(-200, width + 400), "#6adfab"));
    if (r > 90) {
      flys1.push(new Fly(random(width), height / 4 + random(150)));
    }
  }

  if (mouseIsInside) {
    flys2.push(new Fly(random() * 10 + map(pose.nose.x,0,cam.width,0 ,width), map(pose.nose.y,0,cam.height,0 ,height) + random() * 20));
  }

  for (let i = 0; i < drops.length; i++) {
    let d = drops[i];
    if (d.lifespan > 0) {
      d.display();
      d.update();
      d.fallGround();
      d.pos.add(createVector(forward * 20, 0));
    }
  }

  wave1.update();
  wave1.display(countxoff);

  wave2.update();
  wave2.display(countxoff - width);

  for (let i = 0; i < flys1.length; i++) {
    let f = flys1[i];
    fill(255);
    if (f.lifespan > 0) {
      f.display();
      f.update();
      f.around();
      f.pos.add(createVector(forward * 30, 0));
    }
  }

  for (let i = 0; i < flys2.length; i++) {
    let f = flys2[i];
    fill(255);
    f.lifespan = random(1, 2);
    if (f.lifespan > 0) {
      f.update();
      f.display();
      f.around();
      f.pos.add(createVector(forward * 10, 0));
    }
  }
  push();
  image(left, leftPos, 0, width, height);
  image(right, rightPos, 0, width, height);
  image(metro2, 0, 0, width, height);
  pop();
}

class Wave {
  constructor() {
    this.start = 0;
    this.inc = 0.05;
  }
  update() {
    this.start -= 0.03;
    if (this.start < -width) {
      this.start = 0;
    }
  }

  display(translateX) {
    push();
    translate(translateX, mSin(frameCount * 0.08) * 30 - 160);
    let xoff = this.start;

    for (let i = 0; i < 10; i++) {
      noStroke();

      for (let x = i; x < width + 130; x += 10) {
        let y =
          map(noise(xoff * 0.7 * (i * 0.2 + 1) + i), 0, 1, -140, 90) +
          map(sin(xoff * 0.4), -1, 1, 0, 90);

        push();
        translate(0, mSin(frameCount * 0.08 + i * 0.5) * 80);
        rectMode(CENTER);
        fill("#a7c83f");
        rect(
          x,
          y + map(dist(x, 0, width / 2 - 100, 0), 210, 0, -10, 70),
          1,
          map(noise(xoff + 0.5), 0, 1, 170, 150) + random(-20, 5) + 350
        );
        pop();

        xoff += this.inc;
      }
    }
    pop();
  }
}

class Fly {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-2, 5), 0);
    this.lifespan = random(50, 80);
  }
  display() {
    push();
    stroke(255);
    translate(this.pos.x, this.pos.y);
    push();
    strokeWeight(4);
    rotate(map(mSin(frameCount * 0.95), -1, 1, -PI / 6 - 0.5, PI / 6 + 0.5));
    line(0, 0, 15, 0);
    pop();
    push();
    strokeWeight(2);
    rotate(
      map(mSin(frameCount * 0.95), -1, 1, (7 * PI) / 6 + 0.5, (5 * PI) / 6 - 0.5)
    );
    line(0, 0, 15, 0);
    pop();
    pop();
  }
  update() {
    this.pos.add(this.vel);
    this.lifespan--;
  }
  around() {
    let accy = createVector(random(-0.05, -0.2), mSin(frameCount * 0.2) * 0.7);
    this.vel.add(accy);
  }
}

class Drop {
  constructor(x, Color) {
    this.pos = createVector(x, 20);
    this.vel = createVector(0, 0);
    this.lifespan = random(5, 90);
    this.Color = Color;
  }
  display() {
    stroke(this.Color);
    fill(this.Color);
    // noStroke()
    // strokeWeight(1)
    rect(this.pos.x, this.pos.y, 1.5, 10);
  }
  update() {
    this.pos.add(this.vel);
    this.lifespan--;
  }

  fallGround() {
    let accy = createVector(0, 0.2);
    this.vel.add(accy);
  }
}

function setupFastSinCos() {
  for (let i = 0; i < sinCosResolution; i++) {
    let deg = map(i, 0, sinCosResolution, 0, 360);
    let rad = radians(deg);
    sinArray.push(sin(rad));
    cosArray.push(cos(rad));
  }
}

function mSin(rad) {
  let angle = rad % TWO_PI;
  if (angle < 0) angle += TWO_PI;
  let index = floor(map(angle, 0, TWO_PI, 0, sinCosResolution));
  return sinArray[index];
}

function mCos(rad) {
  let angle = rad % TWO_PI;
  if (angle < 0) angle += TWO_PI;
  let index = floor(map(angle, 0, TWO_PI, 0, sinCosResolution));
  return cosArray[index];
}
