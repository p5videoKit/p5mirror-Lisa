function drawMap() {
  // fill(104,187,154)
  // noStroke()
  // beginShape()
  // curveVertex(80,74)
  // curveVertex(80,74)
  // curveVertex(26,253)
  // curveVertex(83,492)
  // curveVertex(253,564)
  // curveVertex(357,659)
  // curveVertex(601,630)
  // curveVertex(825,685)
  // curveVertex(963,553)
  // curveVertex(930,301)
  // curveVertex(964,104)
  // curveVertex(823,49)
  // curveVertex(715,18)
  // curveVertex(469,52)
  // curveVertex(244,25)
  // // curveVertex(64,65)
  // // curveVertex(64,65)
  // endShape(CLOSE)

  fill(104,187,154)
  noStroke()
  rect(200 - 15, 200 - 15, 300 + 30, 150 + 30);
  rect(200-15,475-15,500+30,80+30)
  ellipse(90,100,120,120)
  rect(600,120,130,245)
  rect(815,120,100,520)
  strokeWeight(1);
  stroke(4);
  // text(mouseX, 20, 20);
  // text(mouseY, 50, 20);
  
  fill(239,2,13)
  noStroke()
  circle(205,326,20)
  circle(225,343,10)
  circle(704,183,15)
  circle(707,213,10)
  circle(719,210,10)
  circle(837,426,30)
  circle(827,466,17)
  
  fill(185,230,252)
  ellipse(400,269,120,90)
  
  drawTree(100,100)
  drawTree(473,326)
   drawTree(447,339)
   drawTree(288,281)
   drawTree(203,513)
  drawTree(444,538)
  drawTree(460,543)
  drawTree(470,513)
  drawTree(542,528)
  drawTree(634,325)
  
  
}
function drawTree(x,y){
  push()
  translate(x,y)
  stroke(60,109,90)
  strokeWeight(4)
  line(0,-15,0,20)
  line(0,-15,10,0)
  line(0,-15,-10,0)
  line(0,-6,-10,9)
  line(0,-6,10,9)
  pop()
}

function drawStep(x, y, angle) {
  fill(0);
  push();
  translate(x, y);
  rotate(90);
  rotate(angle);
  ellipse(-12, -4, 5, 5);
  ellipse(12, -4, 5, 5);
  ellipse(-5, -9, 5, 5);
  ellipse(4, -9, 5, 5);
  ellipse(0, 2, 15, 13);
  pop();
}

let stepPositions = [];
let stepAngles = [];
let intervalTime = 250;
let lastStepTime = 0;

function leaveSteps() {
  if (millis() - lastStepTime > intervalTime) {
    stepPositions.push(createVector(v2.pos.x, v2.pos.y));
    stepAngles.push(v2.vel.heading());
    if (stepPositions.length == 4) {
      stepPositions.splice(0, 1);
      stepAngles.splice(0, 1);
    }
    lastStepTime = millis();
  }

  for (let i = 0; i < stepPositions.length; i++) {
    drawStep(stepPositions[i].x, stepPositions[i].y, stepAngles[i]);
  }
}

let stopCounter=0
let speedTimer=0
let canStopAgain=true

function behavior(){
  let stop=v.pos.dist(v2.pos)
  
  if(stop<v.brakeRad&&canStopAgain){
    if (stopCounter<600){
      stopCounter++
      v2.vel=createVector(0,0)
      image(hhh,v.pos.x,v.pos.y-90,80,80)
    }else{
      canStopAgain=false
      speedTimer=1200
      v2.maxSpeed=6.5
    }
  }else{
    v2.wander()
    image(aaa,v.pos.x,v.pos.y-90,80,80)
    if(!canStopAgain&&stopCounter>0){
      stopCounter--
      if(stopCounter==0) {
        canStopAgain=true;
      }
      if(speedTimer>0){
        speedTimer--
        if(speedTimer==0){
          v2.maxSpeed=3.5
        }
      }
    }
  }
  //console.log(v2.maxSpeed)
}
