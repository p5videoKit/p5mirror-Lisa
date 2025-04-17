let count = 0;
let trigger = false;
let canCountAgain=true

function drawCreatures1() {
  if (mouseIsInside) {
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
  triggerCreature.Sweight=10
  triggerCreature.update();
  
  pop();
}

let transitionPosX=-800
let transitionPosY=1170
let rotateAngle=-0.6

function drawTransitionCreature(){
  
  push()
  translate(transitionPosX,transitionPosY)
  scale(4.5)
  rotate(rotateAngle)
  transitionCreature.r=252
  transitionCreature.g=231
  transitionCreature.b=19
  transitionCreature.t=150
  transitionCreature.Sweight=10
  transitionCreature.update()
  pop()
  
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

function drawConfidence(){
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
  translate(width/2,height/3.5)
  scale(0.8)
  for (let i=0;i<9;i++){
    ballsC[i].applyForce(createVector(1/(abs(4-i)**3+0.5)+(noise(frameCount*0.1+i)-0.5)*6,-abs(4-i)*0.6-1+(noise(frameCount*0.01+i)-0.5)*2))
  }
  
  ballsC[0].pos=createVector(-50,0)
  ballsC[8].pos=createVector(50+mSin(frameCount*0.1)*4,mCos(frameCount*0.1)*4)
  
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
  
  
  noFill()
  drawCfeet()
  pop()
}

let cfeetx1,cfeety1,cfeetx2,cfeety2

function drawCfeet(){

  ellipse(-18+cfeetx1,100+cfeety1,10,10)
  ellipse(18+cfeetx2,100+cfeety2,10,10)
}

let eyeOff=0
function drawArc(pointA, pointB, angle) {
  let midpoint = p5.Vector.add(pointA, pointB).div(2);
  let halfChord = p5.Vector.dist(pointA, pointB) / 2;
  let radius = halfChord / mSin(angle / 2);

  
  let distanceToCenter = sqrt(radius*radius - halfChord*halfChord);

  let angleRotate = atan2(pointB.y - pointA.y, pointB.x - pointA.x) + PI*0.5;

  let center = createVector(midpoint.x + cos(angleRotate) * distanceToCenter,
                             midpoint.y + mSin(angleRotate) * distanceToCenter);
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
  
  line(center.x-(radius*2-18)/5+eyeOff,center.y+10-(radius*2-20)/10,center.x-(radius*2-18)/5+eyeOff,center.y+10+(radius*2-20)/10)
  line(center.x+(radius*2-18)/5+eyeOff,center.y+10-(radius*2-20)/10,center.x+(radius*2-18)/5+eyeOff,center.y+10+(radius*2-20)/10)
  if (stage==1){
    if(eyeOff<15){
      eyeOff+=0.2
    }
  }else if (stage==2){
    if(eyeOff>0){
      eyeOff-=0.5
    }
  }
  
}
let walkX=0
let walkY=0
let stage=0
function confidenceBehave(){
  
  if (stage === 0) { 
    if (walkY < 300) {
      walkY += 4; 
    } else {
      stage++;
    }
  } else if (stage === 1) { 
    if (walkX < 380) {
      walkX += 4; 
    } else {
      stage++; 
    }
  } else if (stage === 2) { 
    if (walkY > 200) {
      walkY -= 4; 
    } else {
    }
  }
  
  if(stage==2&&walkY<200){   
  }else{
    for (let i = 0; i < 8; i++) {
    ballsR[i][2].pos.add(0,mSin(frameCount*0.06)*1)
  }
  }
  
if(walkX>375&&walkY<205){
  cfeetx1=0
 cfeety1=-30
 cfeetx2=0
 cfeety2=-30
}else{
 cfeetx1=mSin(frameCount*0.1)*4
 cfeety1=mSin(frameCount*0.1)*4
 cfeetx2=-mSin(frameCount*0.1-PI)*4
 cfeety2=mSin(frameCount*0.1-PI)*4
}
}

let floatX=0
let floatY=0
let stage2=0
function resilienceBehave(){
  if (stage2 === 0) { 
    if (floatY < 300) {
      floatY += 4 
    } else {
      stage2++;
    }
  } else if (stage2 === 1) { 
    if (floatX > -380) {
      floatX -= 4; 
      floatY+=mSin(frameCount*0.05-PI)
    } else {
      stage2++; 
    }
  } else if (stage2 === 2) { 
    if (floatY > 200) {
      floatY -= 4; 
    } else {
      stage2++; 
    }
  }
  
  
}

let ballsR = [];
let springsR = [];

function setupResilience(){
  for (let i = 0; i < 11; i++) {
    ballsR[i] = [];
    for (let j = 0; j < 7; j++) {
      ballsR[i].push(new Ball(0, 0, abs(j - 3) * 4 + 2));
    }
  }

  for (let i = 0; i < 11; i++) {
    springsR[i] = [];
    for (let j = 0; j < 6; j++) {
      springsR[i].push(new Spring(ballsR[i][j], ballsR[i][j + 1], 10, 0.1));
    }
  }
}

function drawResilience() {
  push(0);
  translate(width/2, height/3.5);
  scale(0.6);

  noStroke();

  fill(255,150);//190
  ellipse(0, ballsR[9][0].pos.y, 30, 20);

  fill(255)
  for (let i = 0; i < 8; i++) {
    ellipse(ballsR[i][0].pos.x, ballsR[i][0].pos.y, 12, 12);
    ballsR[i][0].pos.add(createVector(0,(noise(frameCount*0.01)-0.5)*10+mSin(frameCount*0.05)*6))
  }

  stroke(255);

  for (let i = 0; i < springsR.length; i++) {
    for (let s of springsR[i]) {
      s.update();
      //s.display();
    }
  }

  for (let i = 0; i < ballsR.length; i++) {
    for (let j = 0; j < ballsR[0].length; j++) {
      let b = ballsR[i][j];
      b.drag();
      //b.bounce();
      b.update();
      //b.display();
      if (i == 0) {
        b.applyForce(createVector(0.03, -0.1));
      }
      if (i == 1) {
        b.applyForce(createVector(0, 0.2));
      }
      if (i == 2) {
        b.applyForce(createVector(0, -0.1));
      }
      if (i == 3) {
        b.applyForce(createVector(0, 0.5));
      }
      if (i == 4) {
        b.applyForce(createVector(-0.03, -0.1));
      }
      if (i == 5) {
        b.applyForce(createVector(0.2, 0.8));
      }
      if (i == 6) {
        b.applyForce(createVector(0, 0.5));
      }
      if (i == 7) {
        b.applyForce(createVector(-0.2, 0.8));
      }
      if (i == 8) {
        b.applyForce(createVector(0.05, 0.1));
      }
      if (i == 9) {
        b.applyForce(createVector(0, -0.4));
      }
      if (i == 10) {
        b.applyForce(createVector(-0.05, 0.05));
      }
    }
  }

  for (let i = 0; i < 8; i++) {}

  ballsR[0][0].pos = createVector(110 + -257.5, 130 + -180);
  ballsR[0][6].pos = createVector(160 + -257.5, 170 + -180);
  ballsR[1][0].pos = createVector(160 + -257.5, 170 + -180);
  ballsR[1][6].pos = createVector(220 + -257.5, 180 + -180);
  ballsR[2][0].pos = createVector(220 + -257.5, 180 + -180);
  ballsR[2][6].pos = createVector(270 + -257.5, 185 + -180);
  ballsR[3][0].pos = createVector(270 + -257.5, 185 + -180);
  ballsR[3][6].pos = createVector(350 + -257.5, 160 + -180);
  ballsR[4][0].pos = createVector(350 + -257.5, 160 + -180);
  ballsR[4][6].pos = createVector(405 + -257.5, 140 + -180);
  ballsR[5][0].pos = createVector(405 + -257.5, 140 + -180);
  ballsR[5][6].pos = createVector(405 - 295 / 3 + -257.5, 250 + -180);
  ballsR[6][0].pos = createVector(405 - 295 / 3 + -257.5, 250 + -180);
  ballsR[6][6].pos = createVector(405 - (2 * 295) / 3 + -257.5, 250 + -180);
  ballsR[7][0].pos = createVector(405 - (2 * 295) / 3 + -257.5, 250 + -180);
  ballsR[7][6].pos = createVector(405 - 295 + -257.5, 130 + -180);

  ballsR[8][0].pos = createVector(ballsR[0][1].pos.x, ballsR[0][1].pos.y);
  ballsR[8][6].pos = createVector(
    ballsR[0][1].pos.x + 295 / 4 + 10,
    ballsR[0][1].pos.y - 25
  );

  ballsR[9][0].pos = createVector(
    ballsR[0][1].pos.x + 295 / 4 + 10,
    ballsR[0][1].pos.y - 25
  );
  ballsR[9][6].pos = createVector(
    ballsR[0][1].pos.x + (3 * 295) / 4 - 30,
    ballsR[0][1].pos.y - 25
  );

  ballsR[10][0].pos = createVector(
    ballsR[0][1].pos.x + (3 * 295) / 4 - 30,
    ballsR[0][1].pos.y - 25
  );
  ballsR[10][6].pos = createVector(ballsR[4][4].pos.x, ballsR[4][4].pos.y);

  noFill();
  strokeWeight(8);
  for (let i = 0; i < ballsR.length - 3; i++) {
    beginShape();
    curveVertex(ballsR[i][0].pos.x, ballsR[i][0].pos.y);
    for (let j = 0; j < ballsR[0].length; j++) {
      curveVertex(ballsR[i][j].pos.x, ballsR[i][j].pos.y);
    }
    //curveVertex(ballsR[i][6].pos.x,ballsR[i][6].pos.y)
    endShape();
  }

  line(
    ballsR[0][1].pos.x + 295 / 4 + 38,
    ballsR[0][1].pos.y - 25,
    ballsR[0][1].pos.x + 295 / 4 + 38,
    ballsR[0][1].pos.y - 15
  );
  line(
    ballsR[0][1].pos.x + 295 / 2 + 12,
    ballsR[0][1].pos.y - 25,
    ballsR[0][1].pos.x + 295 / 2 + 12,
    ballsR[0][1].pos.y - 15
  );

  strokeWeight(12);
  for (let i = 8; i < ballsR.length; i++) {
    beginShape();
    curveVertex(ballsR[i][0].pos.x, ballsR[i][0].pos.y);
    for (let j = 0; j < ballsR[0].length; j++) {
      curveVertex(ballsR[i][j].pos.x, ballsR[i][j].pos.y);
    }
    curveVertex(ballsR[i][6].pos.x, ballsR[i][6].pos.y);
    endShape();
  }
  pop();
}