

let seq = 0;
let transition = 0;
//let MAX_PARTICLES = 400;
let count = 0;
let magic = 0;
let pollens = [];
let colors= ["Lavender", "Lightblue","Lemonchiffon", "Lightpink","Lightseagreen", "Red"]

let g;

function setup() {
  createCanvas(620, 620);
  
  g = createGraphics(width, height);
  
  background(0);
  angleMode(DEGREES);
  
  let randomIndex=floor(random(colors.length));
  let colorName=colors[randomIndex];
  let x = width / 2;
  let y = height / 2;
  pollens[0] = new Pollen(x, y, 100, 300, 50, 8, "Lavender");
  //100= min distance from the center
  //300=max distance from the center
  //50=numbers of circles in each ring
  //8=size of the circles
  pollens[1] = new Pollen(x, y, 120, 220, 10, 8,colorName);
  pollens[2] = new Pollen(x, y, 40, 150, 1000, 90, "white");
  pollens[3] = new Pollen(x, y, 170, 280, 50, 5,"firebrick");
}

function draw() {
  background(0);
  
  translate(width/2, height/2);
  rotate(frameCount * -0.1);
  
  translate(-width/2, -height/2); // tip!
  push();
  g.background(0, 3.5);
  image(g, 0, 0);
  for (let j = 0; j < pollens.length; j++) {
    pollens[j].present();
  }
  pop();
  
  if (seq == 0) {
  } else if (seq == 1) {
    drawflower1();
  } else if (seq == 2) {
    drawflower1();
  } else if (seq == 3) {
    drawflower2();
  } else if (seq == 4) {
    drawflower2();
  } else if (seq == 5) {
    drawflower3();
  } else if (seq == 6) {
    drawflower3();
  } else if (seq == 7) {
    drawflower4();
  } else if (seq == 8) {
    drawflower4();
  } else if (seq == 9) {
    drawflower5();
  } else if (seq == 10) {
    drawflower5();
  } else if (seq == 11) {
    drawflower5();
  } else {
    drawEnding();
  }

  text("Sequence: " + seq, 10, 20);
  text("Click to move to next phase.", 10, 50);
}

// function mousePressed() {
//   proceedSequence();
// }

function proceedSequence() {
  seq++;
  if (seq == 11) {
    seq = 1;
  }
}

function drawIntro() {
  background(0);
}

function drawflower1() {
  transition += 0.2;
  transition = constrain(transition, 0, 100);
  let angle = map(transition, 0, 100, -360, 360);
  let size = map(transition, 0, 100, 10, 70);

  push();
  beginShape();
  translate(310, 310);
  rotate(frameCount * 0.5);
  for (let i = 1; i < 50; i++) {
    noFill();
    stroke(255);
    arc(0, 0, 10, 10, -360, angle);
    rotate(30);
    arc(0, 0, 30, 30, -360, angle);
    rotate(20);
    arc(0, 0, 50, 50, -360, angle);
    rotate(20);
    arc(0, 0, size, 30, -360, angle);
    rotate(7);
    arc(50, 0, size, 30, -360, angle);
    rotate(20);
    arc(10, 10, 120, 120, -36, angle); //fire flower
    endShape();
  }
  pop();
}

function drawflower2() {
  transition += 0.2;
  transition = constrain(transition, 0, 100);
  let angle = map(transition, 0, 100, -360, 360);
  let size = map(transition, 0, 100, 10, 70);
  let scl = map(transition, 0, 100, 0.1, 3.0);

  push();
  beginShape();
  translate(310, 310);
  scale(1.5);
  rotate(frameCount * 0.5);
  for (let i = 1; i < 30; i++) {
    noFill();
    stroke(255);
    arc(0, 0, 30, 10, -360, angle);
    rotate(45);
    arc(0, 0, 30, 30, -360, angle);
    rotate(180);
    arc(30, 0, 50, 70, -360, angle);
    rotate(45);
    arc(0, 0, 70, 30, -360, angle);
    rotate(120);
    arc(10, 0, 70, 30, -360, angle);
    endShape();
  }
  pop();
}

function drawflower3() {
  push();
  beginShape();
  translate(310, 310);
  scale(1.5);
  rotate(frameCount * 0.5);
  noFill();
  //stroke(100);
  //strokeWeight(5);
  //circle(0, 0, 50);
  for (let radDist = 10; radDist <= 55; radDist += 3) {
    for (let deg = 0; deg < 360; deg += 30) {
      let radialDistance = radDist;
      let x = cos(deg) * radDist;
      let y = sin(deg) * radDist;
      let dia = map(radDist, 30, 120, 2, 30);

      noStroke();
      fill(255);
      circle(x, y, dia);
      endShape();
    }
  }
  pop();

  push();
  beginShape();
  translate(310, 310);
  scale(1.5);
  rotate(-frameCount * 0.5);
  for (let i = 0; i < 30; i++) {
    rotate(12);
    noFill();
    stroke(255);
    strokeWeight(1);
    circle(15, 15, 10);
    endShape();
  }
  pop();
}
function drawflower4() {
  push();
  beginShape();
  translate(310, 310);
  rotate(frameCount * 0.5);
  noFill();
  strokeWeight(10);
  stroke(255);
  circle(0, 0, 50);
  for (let i = 0; i < 8; i++) {
    let freq = frameCount * 2;
    let sinVal = sin(freq);
    let dia = map(sinVal, -1, 1, 50, 100);
    noFill();
    strokeWeight(3);
    stroke(255);
    rotate(45);
    circle(40, 20, dia);
    endShape();
  }
  pop();

  push();
  beginShape();
  translate(310, 310);
  rotate(-frameCount * 0.5);
  for (let radDist = 4; radDist <= 70; radDist += 10) {
    for (let deg = 0; deg < 360; deg += 60) {
      let radialDistance = radDist;
      let x = cos(deg) * radDist;
      let y = sin(deg) * radDist;
      noStroke();
      fill(250);
      circle(x, y, 5);
      endShape();
    }
  }
  pop();
}
function drawflower5() {
  transition += 0.5;
  //transition = constrain(transition, 100, 200);
  let freq = frameCount * 1.5;
  let sinVal = sin(freq);
  let dia = map(sinVal, -1, 1, -10, 130);
  let dia1 = map(sinVal, -1, 1, 130, 10);

  push();
  beginShape();
  translate(310, 310);
  rotate(frameCount * 0.5);
  for (i = 0; i < 16; i++) {
    rotate(22);
    noFill();
    //stroke(10, 100, 150, 30);
    stroke(255);
    ellipse(0, 0, dia, dia1);
    endShape();
  }
  pop();

  push();
  beginShape();
  translate(310, 310);
  rotate(-frameCount * 0.5);
  for (i = 0; i < 25; i++) {
    rotate(42);
    noFill();
    //stroke(10, 180, 70);
    stroke(255);
    rect(45, 45, 10, 10);
    endShape();
  }
  pop();
}
function drawEnding() {
  // background(100);
  fill(255);
  ellipse(width / 2, height / 2, 100, 100);
}
function mousePressed() {
  for (let j = 0; j < pollens.length; j++) {
    pollens[j].activate();
  }
  count += 1;

  proceedSequence();
}

class Pollen {
  constructor(centerX, centerY, rLow, rBig, num, strokeWidth,clr) {
    this.rLow = rLow;
    this.rBig = rBig;
    this.r = [];
    this.rgoal = rLow;
    this.num = num;
    this.cX = centerX;
    this.cY = centerY;
    this.speed = [];
    this.active = [];
    this.locX = [];
    this.locY = [];
    this.strokeWidth = strokeWidth;
    //this.alpha = alpha;
    this.color=clr;
    for (let i = 0; i < num; i++) {
      this.active[i] = false;
      this.r[i] = this.rLow;
      this.locX[i] = this.cX + cos((360 * i) / this.num) * this.rLow;
      this.locY[i] = this.cY + sin((360 * i) / this.num) * this.rLow;
      magic += 0.05;
    }
  }

  move() {
    for (let i = 0; i < this.num; i++) {
      if (this.active[i]) {
        this.r[i] += (this.rgoal - this.r[i]) / this.speed[i];
        if (this.r[i] > this.rBig || this.r[i] < this.rLow) {
          this.r[i] = this.rgoal;
          this.active[i] = false;
        }
        this.locX[i] = this.cX + cos((360 * i) / this.num) * this.r[i];
        this.locY[i] = this.cY + sin((360 * i) / this.num) * this.r[i];
      }
    }
  }

  isActive() {
    for (let i = 0; i < this.num; i++) {
      if (this.active[i]) {
        return true;
      }
    }
    return false;
  }

  activate() {
    if (this.rgoal == this.rLow) {
      this.rgoal = this.rBig;
    } else {
      this.rgoal = this.rLow;
    }
    for (let i = 0; i < this.num; i++) {
      this.active[i] = true;
      this.speed[i] = random(20, 50); //how fast the circle explodes. the lower the number, the faster they explode
    }
  }

  present() {
    g.push();
    g.strokeWeight(this.strokeWidth);
    g.stroke(this.color);
    if (this.isActive()) {
      this.move();
    }
    for (let i = 0; i < this.num; i++) {
      g.point(this.locX[i], this.locY[i]);
    }
    g.pop();
  }
}
