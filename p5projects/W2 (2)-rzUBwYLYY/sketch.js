let inc = 0.5;
let start = 0;

function setup() {
  createCanvas(800, 800);
  background(0)
}

function draw() {
  background(0);

strokeWeight(4)  
  stroke(255);
  noFill();
  
  
  let xoff = start;
  for (let x = 0; x < width; x=x+20) {
    stroke(255);
    let n = map(noise(xoff*0.7), 0, 1, -140, 90);
    let s = map(sin(xoff*0.4), -1, 1, 0, 130);
    let y = s+n 
    
    
    
    push()
    translate(0,sin(frameCount*0.04)*40)
    point(x, y+100);
    pop()
    
    push()
    translate(0,sin(frameCount*0.04+0.3)*40)
    point(x-10,s+200)
    pop()
    
    point(x-100,n+500)
    point(x-50,y+n*0.5+600)

    xoff += inc;
  }
  

  start += 0.05;

  //noLoop();
}