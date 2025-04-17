
const CAM_WIDTH = 640;
const CAM_HEIGHT = 480;
const RESOLUTION = 40;

let angles = [];
let rows, cols;
let metro, right, left;

let vehicles = [];
let creatures1 = [];
let triggerCreature;

let inc = 0.01;
let start = 0;
let forward = inc * 30;
let maxNum = 10;

let rightPos = 0;
let leftPos = 0;

let flocks = [];

let backgroundColor = 0;
let mouseIsInside;

function preload() {
  metro = loadImage("metro6.png");
  metro2 = loadImage("metro7.png");
  right = loadImage("rightDoor.png");
  left = loadImage("leftDoor.png");
}

let gui;

let ui = {
  Num: 6,
};

function setup() {
  createCanvas(1280, 720); //0.8
  
  setupMoveNet(); // ***
  
  gui = new dat.GUI();
  gui.add(ui, "Num", 1, maxNum).step(1).onChange(update);

  setupFastSinCos();
  starSetup();
  setupConfidence();
  setupResilience();

  rows = ceil(width / RESOLUTION);
  cols = ceil(height / RESOLUTION);

  mover = new Mover(1100, 50);
  for (let i = 0; i < maxNum * 6; i++) {
    vehicles.push(new Vehicle(random(width), height / 3.5 + random() * 50));
  }

  for (let i = 0; i < maxNum; i++) {
    creatures1.push(new Creature1());
  }
  triggerCreature = new Creature1();
  transitionCreature = new Creature1();

  flocks.push(new Flock());

  wave1 = new Wave();
  wave2 = new Wave();
}

function draw() {
  background(backgroundColor);
  
  updateMoveNet(); // ***
  // x = pose.nose.x;
  // y = pose.nose.y;
  
  let x=map(pose.nose.x,0,cam.width,0 ,width)
  let y=map(pose.nose.y,0,cam.height,0 ,height)
  
  //console.log(pose.nose.score)
  //console.log(cam.width)
  //console.log(CAM_WIDTH)
  //console.log(pose.nose)
  //console.log(detector)
  //mouseIsInside = mouseX > (3 * width) / 4;
  mouseIsInside=pose.nose.score<0.50
   
  //////////////draw back scenery///////////
  if (stopCount == 0 || stopCount == 1 || stopCount == 2) {
    drawNoiseMountain();
  } else if (stopCount == 3) {
    if (transitionPosX < width / 2 + 260) {
      drawNoiseMountain();
    } else {
      updateConfidence = false;
      showC = false;
      drawWave();
    }
  } else if (stopCount == 4 || stopCount == 5 || stopCount == 6) {
    drawWave();
  } else {
    if (transitionPosX > width / 2 - 260) {
      drawWave();
    } else {
      updateResilience = false;
      showR = false;
      drawNoiseMountain();
    }
  }

  drawButton();
  stroke(255);
  // text(mouseX, 20, 20);
  // text(mouseY, 20, 50);
  drawTransitionCreature();
  
  
  //ellipse(x, y, 100);
}

let openTime = 0;
let twinkleTime = 2500;
let yellowTime = 5000;
let lowerSpeed = 2000;
let grayTime = 8000;

let triggerCount = 0;
let stopCount = 0;
let wasDetected = false;
let timeCount = 0;

let updateConfidence = false;
let showC = false;

let updateResilience = false;
let showR = false;

let showTransition = false;

function drawButton() {
  let currentTime = millis() - openTime;
  let color1 = "#2f2f2f";

  // if (mouseIsInside) {
  //   if (!wasDetected) {
  //     triggerCount++;
  //     wasDetected = true;
  //   }
  // } else {
  //   wasDetected = false;
  // }

  //text(triggerCount, 20, 100);
  //text(stopCount, 20, 140);

  if (currentTime < grayTime) {
    color1 = "#2f2f2f";

    for (let s of stars) {
      if (currentTime < grayTime - lowerSpeed / 2) {
        s.x += s.speed;
        if (s.x > width) {
          s.x = 0;
        }
      }
    }
    if (countxoff <= width) {
      countxoff += 30;
    } else if (countxoff > width) {
      countxoff = 0;
    }
    if (currentTime > grayTime - lowerSpeed && forward > 0) {
      forward -= 0.005;
      constrain(forward, 0, inc * 30);
      if (countxoff <= width) {
        countxoff += 8;
      } else if (countxoff > width) {
        countxoff = 0;
      }
    }
  } else if (currentTime < grayTime + twinkleTime) {
    // rightPos += 0.95;
    // leftPos -= 0.95;
    rightPos += 1.4;
    leftPos -= 1.4;
    forward = 0;
    let t = mSin(frameCount * 0.1);
    if (t > 0) {
      color1 = "#fed932";
    } else {
      color1 = "#2f2f2f";
    }
  } else if (currentTime < yellowTime + twinkleTime + grayTime) {
    color1 = "#fed932";
  } else if (currentTime < yellowTime + twinkleTime * 2 + grayTime) {
    // rightPos -= 0.95;
    // leftPos += 0.95;
    rightPos -= 1.4;
    leftPos += 1.4;
    let t = mSin(frameCount * 0.1);
    if (t > 0) {
      color1 = "#fed932";
    } else {
      color1 = "#2f2f2f";
    }
  } else {
    leftPos = 0;
    rightPos = 0;
    forward = inc * 30;
    openTime = millis();
    currentTime = millis() - openTime;
    stopCount++;
  }

  if (stopCount == 1) {
    updateConfidence = true;
  }

  // if(stopCount==3){
  //   updateConfidence=false
  //   showC=false
  // }
  if (updateConfidence) {
    if (currentTime > grayTime + twinkleTime / 2) {
      showC = true;
    }
  }
  if (showC) {
    push();
    translate(walkX, walkY);
    drawConfidence();
    pop();
    confidenceBehave();
  } else {
    walkX = 0;
    walkY = 0;
    stage = 0;
    eyeOff = 0;
  }

  if (stopCount == 5) {
    updateResilience = true;
  }

  // if(stopCount==7){
  //   updateResilience=false
  //   showR=false
  // }
  if (updateResilience) {
    if (currentTime > grayTime + twinkleTime / 2) {
      showR = true;
    }
  }
  if (showR) {
    push();
    translate(floatX, floatY);
    drawResilience();
    pop();
    resilienceBehave();
  } else {
    floatX = 0;
    floatY = 0;
    stage2 = 0;
  }

  if (stopCount > 7) {
    stopCount = 0;
  }
  if (stopCount == 1 || stopCount == 7) {
    showTransition = true;
  }
  if (showTransition) {
    if (stopCount == 3) {
      if (transitionPosX < width + 800) {
        rotateAngle = -0.6;
        transitionPosX += 10;
        transitionPosY -= 5;
      }
    }
    if (stopCount == 7) {
      if (transitionPosX > -800) {
        rotateAngle = 2.4;
        transitionPosX -= 10;
        transitionPosY += 5;
      }
    }
  }

  fill(color1);
  noStroke();

  ellipse(480, 35, 20, 20);
}

function update() {
  for (let f of flocks) {
    f.generate();
  }
}
function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}