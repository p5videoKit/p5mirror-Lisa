//press enter to enter full screen
//resize the windows as you want to Shiver Kitten

//things happens sometimes😅 If your cat is crushed into a cookie, you can lift it with your mouse to help it recover❤️

//adapted from my Nature of Code weekly assigment, using spring force
//example code https://editor.p5js.org/Lisa-HuangZijin/sketches/eamanZED7

let balls = [];
let springs = [];
let tails = [];
let linkTail = [];
let wings=[]
let linkWing=[]
let wings2=[]
let linkWing2=[]

function setup() {
  createCanvas(windowWidth, windowHeight)
  
  //pixelDensity(0.1);
  
  for (let i = 0; i < 8; i++) {
    balls.push(new Ball(i, i, 30));
    stroke(0);
  }

  for (let i = 0; i < balls.length; i++) {
    balls[i].rad = 80;
    if (i != balls.length - 1) {
      springs.push(
        new Spring(
          balls[i],
          balls[i + 1],
          1.6 * 40 * sqrt(2 - 2 / sqrt(2)),
          0.9
        )
      );
    } else {
      springs.push(
        new Spring(balls[i], balls[0], 1.6 * 40 * sqrt(2 - 2 / sqrt(2)), 0.9)
      );
    }
  }
  for (let i = 0; i < balls.length / 2; i++) {
    springs.push(new Spring(balls[i], balls[i + balls.length / 2], 580, 0.12));
  }

  for (let i = 0; i < 6; i++) {
    tails.push(new Ball(i, i, 10));
    stroke(0);
  }

  for (let i = 0; i < tails.length - 1; i++) {
    linkTail.push(new Spring(tails[i], tails[i + 1], 5, 0.95));
  }
  ////////////left///////////
  for(let i=0;i<8;i++){
    wings.push(new Ball(i,i,10))
    wings[i].pos.x=0+50*i
    wings[i].pos.y=0
  }
  for (let i = 0; i < wings.length - 1; i++) {
    linkWing.push(new Spring(wings[i], wings[i + 1], 5, 0.95));
  }
  ///////////right////////////
  for(let i=0;i<8;i++){
    wings2.push(new Ball(i,i,10))
    wings2[i].pos.x=100+50*i
    wings2[i].pos.y=100
  }
  for (let i = 0; i < wings2.length - 1; i++) {
    linkWing2.push(new Spring(wings2[i], wings2[i + 1], 4, 0.98));
  }
 
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (keyCode === ENTER) {
    let fs = fullscreen();
    fullscreen(!fs); 
    //fullscreen(true);
  }
}

function draw() {
  background(110,126,192);
  
 //noSmooth()

  
  //////////////////////the wings//////////////////////////
  drawLeftWings()
  drawRightWings()
  

////////////////////the body////////////////////
  for (let s of springs) {
    s.update();
    //s.display();
  }
  noStroke();
  //noFill()

  fill(0);
  beginShape();
  for (let b of balls) {
    b.mass = 10;
    b.minHeight = windowHeight;
    b.drag();
    b.update();
    b.display();

    let gravity = createVector(0, 8);
    b.applyForce(gravity);
    b.stayInCanvas();
    b.minHeight = windowHeight

    curveVertex(b.pos.x, b.pos.y);
  }
  for (let b of balls) {
    curveVertex(b.pos.x, b.pos.y);
  }
  endShape(CLOSE);

  drawTails();

  noStroke();
  fill(248, 224, 15);
  circle(
    balls[7].pos.x + (balls[1].pos.x - balls[7].pos.x) / 2,
    balls[1].pos.y + (balls[7].pos.y - balls[1].pos.y) / 2,
    50
  );
  circle(
    balls[7].pos.x + (balls[3].pos.x - balls[7].pos.x) / (1 + 1.8 * sqrt(2)),
    balls[3].pos.y + (balls[7].pos.y - balls[3].pos.y) / (1.2 * sqrt(2)),
    50
  );

  fill(0);
  circle(
    balls[7].pos.x + (balls[1].pos.x - balls[7].pos.x) / 2,
    balls[1].pos.y + (balls[7].pos.y - balls[1].pos.y) / 2,
    38
  );
  circle(
    balls[7].pos.x + (balls[3].pos.x - balls[7].pos.x) / (1 + 1.8 * sqrt(2)),
    balls[3].pos.y + (balls[7].pos.y - balls[3].pos.y) / (1.2 * sqrt(2)),
    38
  );

  stroke(255);
  noFill();
  push();

 
}

function drawEllipse(p1,p2){
  let mid = p5.Vector.add(p1, p2).mult(0.5);
  let distance = p1.dist(p2);
  let angle = atan2(p2.y - p1.y, p2.x - p1.x);
  fill(255)
  push();
  translate(mid.x, mid.y); 
  rotate(angle); 
  ellipse(0, 0, distance, 30)
  pop(); 
}

function drawLeftWings(){
  strokeWeight(6)
  let x=balls[6].pos.x-50
  let y=balls[6].pos.y-50
  arc(x, y, 160, 80, PI/2-0.2, PI+0.1, OPEN);
  //ellipse(x,y,160,80)
  //80cos+40sin
  
  circle(x+80*cos(PI-0.1),y+40*sin(PI-0.1),10)
  circle(x+80*cos(PI/1.35-0.1),y+40*sin(PI/1.35-0.1),10)
  circle(x+80*cos(PI/2+0.1),y+40*sin(PI/2+0.1),10)
  
  //line(x+80*cos(PI/2-0.2),y+40*sin(PI/2-0.2),wings[7].pos.x,wings[7].pos.y)
  
  let A1=createVector(x+80*cos(PI-0.1),y+40*sin(PI-0.1))
  let A2=createVector(x+80*cos(PI/1.35-0.1),y+40*sin(PI/1.35-0.1))
  let A3=createVector(x+80*cos(PI/2+0.1),y+40*sin(PI/2+0.1))
  
  drawEllipse(A1,wings[0].pos)
  drawEllipse(A2,wings[3].pos)
  drawEllipse(A3,wings[6].pos)

  push()
  
  wings[0].pos.x=balls[6].pos.x-250//300,100,350
  wings[0].pos.y=balls[6].pos.y//-50
  
  wings[7].pos.x=balls[6].pos.x
  wings[7].pos.y=balls[6].pos.y
  for(let w of wings){
   
    w.mass = 10;
    w.minHeight=windowHeight;
    w.update();
    w.display();

    let gravity = createVector(0, 4);
    w.applyForce(gravity);
    w.stayInCanvas();
  }
  pop()
  
  for (let l of linkWing) {
    strokeWeight(1)
    l.update();
    //l.display();
  }
}
function drawRightWings(){
  strokeWeight(6)
  let x=balls[7].pos.x+10
  let y=balls[7].pos.y-60
  noFill()
  arc(x, y, 160, 80, 0, PI/2, OPEN);
  
  circle(x+80*cos(PI/2-0.1),y+40*sin(PI/2-0.1),10)
  circle(x+80*cos(PI/3-0.1),y+40*sin(PI/3-0.1),10)
  circle(x+80*cos(0.1),y+40*sin(0.1),10)

  let A1=createVector(x+80*cos(PI/2-0.1),y+40*sin(PI/2-0.1))
  let A2=createVector(x+80*cos(PI/3-0.1),y+40*sin(PI/3-0.1))
  let A3=createVector(x+80*cos(0.1),y+40*sin(0.1))
  
  drawEllipse(A1,wings2[0].pos)
  drawEllipse(A2,wings2[4].pos)
  drawEllipse(A3,wings2[7].pos)

  
  wings2[0].pos.x=balls[7].pos.x //balls[7].pos.x //110,100,250
  wings2[0].pos.y=balls[7].pos.y      //290,350,350
  
  wings2[7].pos.x=balls[7].pos.x+150
  wings2[7].pos.y=balls[7].pos.y
  
  for(let w of wings2){
   
    w.minHeight=windowHeight;
    w.mass = 10;
    w.update();
    w.display();

    let gravity = createVector(0, 3);
    w.applyForce(gravity);
    w.stayInCanvas();
  }

  
  for (let l of linkWing2) {
    strokeWeight(1)
    l.update();
    //l.display();
  }
}


function drawTails() {
  for (let l of linkTail) {
    l.update();
    l.display();
  }

  noFill();
  stroke(0);
  strokeWeight(50);
  beginShape();
  curveVertex(balls[3].pos.x, balls[3].pos.y);
  for (let t of tails) {
    t.minHeight=windowHeight;
    t.drag();
    t.stayInCanvas();
    t.update();
    t.display();

    let G = createVector(0, 4);
    t.applyForce(G);

    curveVertex(t.pos.x, t.pos.y);
  }

  endShape();

  tails[0].pos.x = balls[3].pos.x;
  tails[0].pos.y = balls[3].pos.y;
  for (let b of balls) {
    b.stayInCanvas();
  }
}


function mousePressed() {
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    if (b.pressed()) {
      break;
    }
  }
  // for(let b of balls){
  //   b.stayInCanvas()
  // }
}

function mousedrag() {
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    b.drag();
    //b.stayInCanvas()
  }
}

function mouseReleased() {
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    b.isDragging = false;
    //b.stayInCanvas()
  }
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
    this.pos = createVector(
      40 * cos((x * PI) / 4 - PI / 8),
      40 * sin((x * PI) / 4 - PI / 8)
    );
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.rad = rad;
    this.mass = 12; // MASS!
    //
    this.damping = 0.89;
    this.isDragging = false;
    this.minHeight = windowHeight;
    //this.minRight = width;
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // let's apply damping here
    this.vel.mult(this.damping); // -5%;
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
  stayInCanvas() {
    //line(100, 300, 200, 300);
    // if(this.x>100&&this.x<300&&this.y<300){
    //   this.minHeight=280
    // }else{
    //   this.minHeight=height
    // }
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, -2 * this.rad, this.minHeight);
  }

  pressed() {
    let distance = dist(mouseX, mouseY, this.pos.x, this.pos.y);
    if (distance < this.rad) {
      this.isDragging = true;
      return true;
    } else {
      return false;
    }
  }
  drag() {
    if (this.isDragging) {
      // in
      this.pos.x = mouseX;
      this.pos.y = mouseY;
    }
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    stroke(255, 0, 0);
    fill(255, 150);
    //circle(0, 0, this.rad * 2);
    pop();
  }
}
