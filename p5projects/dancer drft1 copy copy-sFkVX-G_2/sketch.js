
let dancer;

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  // ...except to adjust the dancer's name on the next line:
  dancer = new LisaDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only
  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class LisaDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    
  }
  update() {
    this.length=map(sin(frameCount * 0.2), -1, 1, 10, -50)
    this.lip=map(cos(frameCount*0.18),-1,1,-9,0)
    this.mouse=map(sin(frameCount*0.2),-1,1,3,22)
    
  }
  display() {
    
    let angle = sin(frameCount * 0.1) * 0.5;
    push();
    translate(this.x, this.y);
    rotate(angle)

    this.drawBody(0, 0, this.length,this.mouse);
    this.drawleftstick(0,0,this.length)
    this.drawrightstick(0,0,this.length)
    this.draweye(0,0,this.length)
    this.draweye(-22,15,this.length)
    this.draweye(22,15,this.length)
    this.drawblink(0,0,this.length,this.lip)
    this.drawblink(-22,15,this.length,this.lip)
    this.drawblink(22,15,this.length,this.lip)
    this.draweyeframe(22,15,this.length)
    this.draweyeframe(-22,15,this.length)
    this.draweyeframe(0,0,this.length)
    pop();
  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
  drawBody(x, y, length,mouse) {
    push();
    noStroke();
    fill(200);
    circle(x, y - 10 + length, 80);
    circle(x, y + 30, 80);
    rectMode(CENTER);
    rect(x, y + 10 + length *0.5, 80, 40-length);
    fill(198,60,21)
    ellipse(x,y+length+2,10,mouse)
    pop();
  }
  draweye(x,y,length){
    push()
    stroke(100)
    strokeWeight(2.5)
    fill(255)
    ellipse(x,y-10+length-15,20,18)
    fill(100)
    ellipse(x,y-10+length-15,4,7)
    pop()
  }
  draweyeframe(x,y,length){
    push()
    stroke(100)
    strokeWeight(2.5)
    noFill()
    ellipse(x,y-10+length-15,20,18)
    pop()
  }
  drawblink(x,y,length,lip){
    push()
    noStroke()
    fill(200)
    rectMode(CENTER)
    rect(x,y-10+length-15-9/2+lip,25,23/2)
    rect(x,y-10+length-15+9/2-lip,25,23/2)
    pop()
  }
  drawleftstick(x,y,length){
    push()
    translate(x-35,y-10+length/3)
    rotate(sin(frameCount*0.15))
    strokeWeight(5)
    stroke(random(0,255),random(0,255),random(0,255))
    line(x-20,y-10+length/3,x-55-35/3,y-10+length/3-16-16/3)
    noStroke()
    fill(200)
    circle(x-20-35/3,y-10+length/3-16/3,22)
    pop()
  }
  drawrightstick(x,y,length){
    push()
    translate(x+35,y-10+length/3)
    rotate(sin(frameCount*0.15))
    strokeWeight(5)
    stroke(random(0,255),random(0,255),random(0,255))
    line(x+20,y-10+length/3,x+55+35/3,y-10+length/3-16-16/3)
    noStroke()
    fill(200)
    circle(x+20+35/3,y-10+length/3-16/3,22)
    pop()
}
  
}
