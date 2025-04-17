let mover, mover1, mover2;
let lerpFactor = 0;
let bells 

function setup() {
  createCanvas(600, 600);
  mover = new Mover(width/2-120,height/2-180,1);
  mover1 = new Mover(width/2-120,height/2+40,1);
  
  let s2=2
  mover2 = new Mover(width/2-120*s2,height/2-40,s2);
  background(0);
  
 
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
   
  let bellPos = p5.Vector.lerp(mover1.pos, mover2.pos, lerpFactor);
    fill(255, 204, 0); 
    ellipse(bellPos.x, bellPos.y, 15, 15); 
  
  line(mover.pos.x, mover.pos.y , bellPos.x,bellPos.y);
 
  // line(mover.pos.x, mover.pos.y , mover1.pos.x, mover1.pos.y);
  // line(mover.pos.x, mover.pos.y , mover2.pos.x, mover2.pos.y );
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
    //this.acc.mult(0.0004);//是个圆？？？
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