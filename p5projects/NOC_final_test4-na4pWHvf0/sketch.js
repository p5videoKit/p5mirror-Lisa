//大的水母一样的东西静止的时候展示比较好，大+禁止+无相对

let RESOLUTION = 40;
let angles = [];
let rows, cols;
let metro, right, left;

let vehicles = [];
let creatures1 = [];
let triggerCreature;

let inc = 0.01;
let start = 0;
let forward = inc * 30;
let Num = 4;

let rightPos = 0;
let leftPos = 0;

let flocks = [];

function preload() {
  metro = loadImage("metro1.png");
  right = loadImage("rightDoor.png");
  left = loadImage("leftDoor.png");
  p = loadImage("p.png");
}

function setup() {
  createCanvas(1280, 720); //0.8
  
  setupFastSinCos();
  
  rows = ceil(width / RESOLUTION);
  cols = ceil(height / RESOLUTION);

  mover = new Mover(1100, 50);

  for (let i = 0; i < Num; i++) {
    vehicles.push(new Vehicle(random(width), height / 2 + random(-1, 1) * 100));
    creatures1.push(new Creature1());
  }
  triggerCreature = new Creature1();

  flocks.push(new Flock());
  
  wave1 = new Wave();
  wave2 = new Wave();
}

function draw() {
  background(255);
  
  if(mouseX>width/2){
    drawWave()
  }else{
    drawNoiseMountain()//noise mountain
  }
  

  //drawNoiseMountain()//noise mountain
  

  // flow field
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      let index = r + c * rows; // *** x + y * width

      let x = r * RESOLUTION;
      let y = c * RESOLUTION;

      let xfreq = (x + frameCount) * 0.005;
      let yfreq = (y + frameCount) * 0.01;
      let amp = TWO_PI; // range of angle
      let val = noise(xfreq, yfreq) * amp;

      angles[index] = val;

      //       push();
      //       translate(x, y);

      //       noFill();
      //       stroke(200);
      //       rect(0, 0, RESOLUTION, RESOLUTION);
      //       text(index, 5, 15);

      //       rotate(val);
      //       stroke(200);
      //       line(0, 0, RESOLUTION / 2, 0);

      //       pop();
    }
  }

  for (let i = 0; i < vehicles.length; i++) {
    let v = vehicles[i];

    let r = floor(v.pos.x / RESOLUTION);
    let c = floor(v.pos.y / RESOLUTION);
    let index = r + c * rows;

    v.flow(angles[index]);
    v.update();
    v.checkEdges();
    v.display();
  }

  for (let c of creatures1) {
    c.update();
  }

  for (let f of flocks) {
    f.run();
  }

  for (let i = 0; i < Num; i++) {
    creatures1[i].x = flocks[0].boids[i].pos.x;
    creatures1[i].y = flocks[0].boids[i].pos.y;
    creatures1[i].angle = flocks[0].boids[i].angle;
  }

  push();
  // image(left,-140/2+140/2*sin(frameCount*0.01),0,width,height)
  // image(right,140/2-140/2*sin(frameCount*0.01),0,width,height)
  image(left, leftPos, 0, width, height);
  image(right, rightPos, 0, width, height);
  image(metro, 0, 0, width, height);
  pop();

  drawButton();
  stroke(255);
  text(mouseX, 20, 20);
  text(mouseY, 20, 50);

  image(p, mouseX, mouseY, 100, 100);
  drawCreatures();
}

let openTime = 0;
let twinkleTime = 2500;
let yellowTime = 5000;
let grayTime = 10000;

// let beginCount=flase
// let count=0

function drawButton() {
  //fill("#30fc13")

  let currentTime = millis() - openTime;
  let color1 = "#2f2f2f";
  
  // if (countxoff <= width) {
  //   countxoff += 30;
  // } else if (countxoff > width) {
  //   countxoff = 0;
  // }

  if (currentTime < grayTime) {
    color1 = "#2f2f2f";
    if (countxoff <= width) {
    countxoff += 30;
  } else if (countxoff > width) {
    countxoff = 0;
  }
    if (currentTime > 8000 && forward > 0) {
      forward -= 0.005;
      constrain(forward, 0, inc * 30);
      // constrain(count,0,inc*30)
      // forward=count
      if (countxoff <= width) {
    countxoff += 30;
  } else if (countxoff > width) {
    countxoff = 0;
  }
    }
  } else if (currentTime < grayTime + twinkleTime) {
    rightPos += 0.95;
    leftPos -= 0.95;
    forward = 0;
    let t = sin(frameCount * 0.1);
    if (t > 0) {
      color1 = "#fed932";
    } else {
      color1 = "#2f2f2f";
    }
  } else if (currentTime < yellowTime + twinkleTime + grayTime) {
    color1 = "#fed932";
  } else if (currentTime < yellowTime + twinkleTime * 2 + grayTime) {
    rightPos -= 0.95;
    leftPos += 0.95;
    let t = sin(frameCount * 0.1);
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
    //currentTime=millis()-openTime
  }

  fill(color1);
  ellipse(480, 35, 20, 20);
  //fill("")
}
