let mover1, mover2;
let mover=[]
let lerpFactor = 0;
let bells 
let s=-1

function setup() {
  createCanvas(600, 600);
  for(i=0;i<36;i++){
    if(i-floor(i/6)==0){
      s++
      mover[s] = new Mover(-120,-180,1);
    }
  }
  
  mover1 = new Mover(-120,+40,1);
  
  let s2=2
  mover2 = new Mover(-120*s2,-40,s2);
  background(0);
  console.log(frameCount)
  
 
}

function draw() {
  background(0);
  push()
  translate(width/2,height/2)
  
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
  
  for(i=0;i<mover.length;i++){
  mover[i].update(1);
  mover[i].show();
    
  line(mover[i].pos.x, mover[i].pos.y , bellPos.x,bellPos.y);
  }
  
 
  // line(mover.pos.x, mover.pos.y , mover1.pos.x, mover1.pos.y);
  // line(mover.pos.x, mover.pos.y , mover2.pos.x, mover2.pos.y );
  pop()
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
    
    let mouse = createVector(0, this.y);
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