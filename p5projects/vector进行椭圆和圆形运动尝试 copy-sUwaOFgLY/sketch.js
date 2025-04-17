let mover;

function setup() {
  createCanvas(1280, 720);
  mover = new Mover(1100,50);
  background(0);
}

function draw() {
   //background(0);
  mover.update();
  mover.show();
}

class Mover {
  constructor(x, y) {
    this.pos = createVector(x, y);
    // this.vel = createVector(1, -1);
    this.vel = createVector(0,1);
    this.vel.setMag(7);
  }
  update() {  
    let mouse = createVector(650, 200);
    this.acc = p5.Vector.sub(mouse, this.pos);
    //this.acc.mult(0.0004);//circle v=mv^2/R 是个圆？？？
    this.acc.mult(0.0003)//ellipse in the same position重复椭圆
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