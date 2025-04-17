let inc = 0.05;
let start = 0;

function setup() {
  createCanvas(600, 600);
  background(0)
}

function draw() {
  background(51);

  stroke(255);
  noFill();
  
  
  let xoff = start;
   beginShape()
  for (let x = 0; x < width; x++) {
    stroke(255);
    let n = map(noise(xoff*0.7), 0, 1, -140, 90);
    let s = map(sin(xoff*0.4), -1, 1, 0, 130);
    let y = s+n 
    
    vertex(x,y)
    xoff += inc;
    endShape()
  }
  

  start += 0.05;

  //noLoop();
}

class Walker{
  constructor(){
    this.x=x
    this.y=y
  }
  display(){
    
  }
  update(){
    
  }
}