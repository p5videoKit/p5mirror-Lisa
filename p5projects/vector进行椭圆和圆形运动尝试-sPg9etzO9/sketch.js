let mover;

function setup() {
  createCanvas(400, 400);
  mover = new Mover(200,100);
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
    this.vel = createVector(40,0);
    this.vel.setMag(2);
  }

  update() {  
    
    let mouse = createVector(200, 200);
    this.acc = p5.Vector.sub(mouse, this.pos);
    //this.acc.mult(0.0004);//circle v=mv^2/R 是个圆？？？
    this.acc.mult(0.03)//ellipse in the same position重复椭圆
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