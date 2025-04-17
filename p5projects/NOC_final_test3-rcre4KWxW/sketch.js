//大的水母一样的东西静止的时候展示比较好，大+禁止+无相对

let RESOLUTION = 40;
let angles = [];
let rows, cols;
let metro

let vehicles = [];
let creatures=[]

let inc = 0.01;
let start = 0;
let Num=4

let flocks = [];

function preload(){
  metro=loadImage("metro.png")
}
function setup() {
  createCanvas(1200, 400);
  rows = ceil(width / RESOLUTION);
  cols = ceil(height / RESOLUTION);

  for (let i = 0; i < Num; i++) {
    vehicles.push(new Vehicle(random(width), height/2+random(-1,1)*100));
    creatures.push(new Creature())
  }
  flocks.push(new Flock());
}

function draw() {
  background(0);

  
 stroke(255);
  noFill();
  beginShape();
  let xoff = start;
  for (let x = 0; x < width; x++) {
    stroke(255);
    // let y = random(height);
    let y = noise(xoff) * height;
    vertex(x, y);
    
    xoff -= inc;
  }
  endShape();
  
  start += inc*30;

  // flow field
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {

      let index = r + c * rows; // *** x + y * width

      let x = r * RESOLUTION;
      let y = c * RESOLUTION;

      let xfreq = (x + frameCount) * 0.005;
      let yfreq = (y + frameCount) * 0.01;
      let amp = TWO_PI; // range of angle
      let val = noise(xfreq,yfreq) * amp;

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
  
 wave()

  // vehicles
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
  
  for (let c of creatures){
    c.update()
  }
  
  for (let f of flocks) {
    f.run();
  }
  
  for (let i=0;i<Num;i++){
    // creatures.push(new Creature(300, 250))
    creatures[i].x=flocks[0].boids[i].pos.x
    creatures[i].y=flocks[0].boids[i].pos.y
    creatures[i].angle=flocks[0].boids[i].angle
  }
  
  push()
  image(metro,0,0,width,height)
  pop()
}

let Start = 0;
let INC = 0.25;
let XOFF = 0;

function wave() {
  push();
  translate(0, sin(frameCount * 0.08) * 40 - 60);
  XOFF = Start;
  for (let i = 0; i < 10; i++) {
    noStroke();

    for (let x = i; x < width + 130; x = x + 10) {
      this.y =
        map(noise(XOFF * 0.7 * (i * 0.2 + 1) + i), 0, 1, -100, 30) +
        map(sin(XOFF * 0.4), -1, 1, 0, 30);
      push();
      translate(20, sin(frameCount * 0.08 + i * 0.5) * 40-60);
      rectMode(CENTER);
      fill("#a7c83f");
      rect(
        x,
        this.y + map(dist(x, 0, width / 2 - 100, 0), 210, 0, -10, 70),
        1,
        map(noise(XOFF + 0.5), 0, 1, 170, 150) + random(-20, 5) + 350
      );

      pop();
      XOFF += INC;
    }
  }
  Start += 0.03;
  pop(0);
}
