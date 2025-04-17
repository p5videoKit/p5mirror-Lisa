let count = 0;
let trigger = false;
let canCountAgain=true
function drawCreatures1() {
  if (mouseX > (3 * width) / 4) {
    trigger = true;
  }
  if (trigger) {
    drawTriggerCreature1();
  }
  if (mover.pos.y < -190) {
    trigger = false;
  }
}

function drawTriggerCreature1() {
  push();
  noFill();
  stroke(255);
  mover.update();
  //mover.show();

  translate(mover.pos.x, mover.pos.y);
  rotate(mover.vel.heading());
  // console.log(mover.pos.x,mover.pos.y)

  let a;
 
    if (mover.pos.x < 1000 && mover.pos.y > 550 && count < PI) {
      count += 0.1;
    }
    if (count > PI) {
      count = PI;
    }
  
  a = cos(count - PI);
  scale(1, a);
  scale(map(dist(0, mover.pos.y, 0, height), 0, 1000, 1.8, 0.01));
  
 // if (rotation angle is close to 270 degree)
  //triggerCreature = null;
  triggerCreature.r=252
  triggerCreature.g=231
  triggerCreature.b=19
  triggerCreature.t=60
  triggerCreature.update();
  
  pop();
}

let ballsC = [];
let springsC = [];

function setupConfidence(){
   for (let i=0;i<9;i++){
    ballsC.push(new Ball(i*10,0,20))
  }
  
  springsC.push(new Spring(ballsC[0],ballsC[8],100,0.8))
  for (let i=0;i<8;i++){
    springsC.push(new Spring(ballsC[i],ballsC[i+1],45,0.3))
  }
   springsC.push(new Spring(ballsC[1],ballsC[7],70,0.1))
   springsC.push(new Spring(ballsC[2],ballsC[6],40,0.2))
   springsC.push(new Spring(ballsC[3],ballsC[5],10,0.1))
}

function drawConfidence(x,y){
  for (let s of springsC) {
    s.update();
    //s.display();
  }

  for (let b of ballsC) {
    b.drag();
    //b.bounce();
    b.update();
    //b.display();
  }
  
  push()
  translate(x,y)
  scale(0.8)
  for (let i=0;i<9;i++){
    ballsC[i].applyForce(createVector(1/(abs(4-i)**3+0.5)+(noise(frameCount*0.1+i)-0.5)*6,-abs(4-i)*0.6-1+(noise(frameCount*0.01+i)-0.5)*2))
  }
  
  ballsC[0].pos=createVector(-50,0)
  ballsC[8].pos=createVector(50+sin(frameCount*0.1)*4,cos(frameCount*0.1)*4)
  
  noFill(0)
  stroke(246,229,132)
  strokeWeight(6)
  beginShape()
  curveVertex(ballsC[4].pos.x,ballsC[4].pos.y)
  for(let i=4;i<9;i++){
    curveVertex(ballsC[i].pos.x,ballsC[i].pos.y)
  }
  curveVertex(ballsC[8].pos.x,ballsC[8].pos.y)
  endShape()
  
  beginShape()
  curveVertex(ballsC[0].pos.x,ballsC[0].pos.y)
  for(let i=0;i<5;i++){
    curveVertex(ballsC[i].pos.x,ballsC[i].pos.y)
  }
  curveVertex(ballsC[4].pos.x,ballsC[4].pos.y)
  endShape()
  
  drawArc(ballsC[0].pos, ballsC[8].pos, radians(140))
  
  //ballsC[0].pos.add(createVector(10*sin(frameCount*0.1),0))
  noFill()
  ellipse(-18+sin(frameCount*0.1)*4,100+sin(frameCount*0.1)*4,10,10)
  ellipse(18-sin(frameCount*0.1-PI)*4,100+sin(frameCount*0.1-PI)*4,10,10)
  pop()
}

function drawArc(pointA, pointB, angle) {
  let midpoint = p5.Vector.add(pointA, pointB).div(2);
  let halfChord = p5.Vector.dist(pointA, pointB) / 2;
  let radius = halfChord / sin(angle / 2);

  
  let distanceToCenter = sqrt(radius*radius - halfChord*halfChord);

  let angleRotate = atan2(pointB.y - pointA.y, pointB.x - pointA.x) + PI*0.5;

  let center = createVector(midpoint.x + cos(angleRotate) * distanceToCenter,
                             midpoint.y + sin(angleRotate) * distanceToCenter);
  let startAngle = atan2(pointA.y - center.y, pointA.x - center.x);
  let endAngle = atan2(pointB.y - center.y, pointB.x - center.x);

  noFill()
  //stroke(255);
  strokeWeight(6);
  arc(center.x, center.y, radius * 2, radius * 2, endAngle, startAngle);
  
  fill(255,100)
  noStroke()
  ellipse(center.x,center.y+6,radius*2-18,radius*2-20)
  
  stroke(246,229,132)
  strokeWeight(6)
  line(center.x-(radius*2-18)/5,center.y+10-(radius*2-20)/10,center.x-(radius*2-18)/5,center.y+10+(radius*2-20)/10)
  line(center.x+(radius*2-18)/5,center.y+10-(radius*2-20)/10,center.x+(radius*2-18)/5,center.y+10+(radius*2-20)/10)
  
}
