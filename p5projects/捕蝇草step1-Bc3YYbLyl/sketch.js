let yScale=-0.8
function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(220);
  fill(0)
  circle(width/2,height/2,2)
  
  
  yScale=map(sin(frameCount*0.1),-1,1,-0.6,1)
  
  push()
  translate(width/2,height/2)
  stroke(0)
  fill(255)
  
  let kuan=130
  let chang=230
  
  //ellipse(0,200,chang,kuan)
  
  arc(0, kuan/2-14, chang, kuan, -PI*0.2, PI+PI*0.2,OPEN);
  
  push()
  scale(1,yScale)
  fill(120)
  arc(0, -kuan/2+14, chang, kuan, PI-PI*0.2,PI*0.2,OPEN)
  
  //ellipse()
  pop()
  
  pop()
}