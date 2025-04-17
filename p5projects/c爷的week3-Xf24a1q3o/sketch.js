let mover, mover1, mover2;
let lerpFactor = 0;
let bells = []; // Array to store bell positions
let numBells = 5; // Number of bells you want to rotate

function setup() {
  createCanvas(600, 600);
  mover = new Mover(width / 2 - 120, height / 2 - 180, 1);
  mover1 = new Mover(width / 2 - 120, height / 2 + 40, 1);

  let s2 = 2;
  mover2 = new Mover(width / 2 - 120 * s2, height / 2 - 40, s2);
  background(0);

  // Initialize bells along an ellipse
  for (let i = 0; i < numBells; i++) {
    let angle = map(i, 0, numBells, 0, TWO_PI); // Distribute bells evenly along the circle
    let x = width / 2 + 120 * cos(angle); // Calculate x position
    let y = height / 2 + 60 * sin(angle); // Calculate y position
    bells.push(createVector(x, y));
  }
}

function draw() {
  background(0);

  mover.update(1);
  mover.show();

  mover1.update(1);
  mover1.show();

  mover2.update(1);
  mover2.show();

  stroke(255);
  strokeWeight(3);

  if (mouseIsPressed) {
    lerpFactor += 0.02;
  } else {
    lerpFactor -= 0.05;
  }
  lerpFactor = constrain(lerpFactor, 0, 1);

  // Update and draw bells
  for (let i = 0; i < bells.length; i++) {
    let bellPos = p5.Vector.lerp(mover1.pos, mover2.pos, lerpFactor);
    // Adjust the position of each bell to rotate around the ellipse path
    let angle = map(i, 0, bells.length, 0, TWO_PI) + frameCount * 0.02; // Rotate over time
    let x = bellPos.x + 120 * cos(angle); // Update x position based on angle
    let y = bellPos.y + 60 * sin(angle); // Update y position based on angle

    fill(255, 204, 0);
    ellipse(x, y, 15, 15);
    line(mover.pos.x, mover.pos.y, x, y);
  }
}
class Mover {
  constructor(x, y,s) {
    this.y=y
    this.pos = createVector(x, y);
    // this.vel = createVector(1, -1);
    this.vel = createVector(0,-1);
    this.vel.setMag(2*s);
    this.acc=0
  }

  update(s2) {  
    // this.vel.add(this.acc);
    //this.pos.add(this.vel);
    
    let mouse = createVector(width/2, this.y);
    this.acc = p5.Vector.sub(mouse, this.pos);
    this.acc.mult(0.003*s2)//重复椭圆
    //this.acc.setMag(2);//位置会变，椭圆
    
    //this.pos.add(this.vel);
    
    //this.vel.limit(10);
    if (mouseIsPressed){
    this.vel.add(this.acc); 
    this.pos.add(this.vel);
    }
  }
  
  show() {
    stroke(255);
    strokeWeight(1);
    fill(255, 50);
    ellipse(this.pos.x, this.pos.y, 10);
  }
}