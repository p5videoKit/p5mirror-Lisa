let RESOLUTION = 60;
let angles = [];
let rows, cols;

let vehicles = [];

  let inc = 0.01;
let start = 0;

function setup() {
  createCanvas(1000, 800);
  rows = ceil(width / RESOLUTION);
  cols = ceil(height / RESOLUTION);

  for (let i = 0; i < 50; i++) {
    vehicles.push(new Vehicle(random(width), height/2));
  }
}

function draw() {
  background(255);

  
 stroke(255);
  noFill();
  beginShape();
  let xoff = start;
  for (let x = 0; x < width; x++) {
    stroke(0);
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
      let yfreq = (y + frameCount) * 0.1;
      let amp = TWO_PI; // range of angle
      let val = noise(xfreq,yfreq) * amp;

      angles[index] = val;

      push();
      translate(x, y);

      // noFill();
      // stroke(200);
      // rect(0, 0, RESOLUTION, RESOLUTION);
      // text(index, 5, 15);

      rotate(val);
      stroke(200);
      //line(0, 0, RESOLUTION / 2, 0);

      pop();
    }
  }

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
  
  push()
  fill(0)
  rect(0,0,200,height)
  rect(width-200,0,200,height)
  rect(0,0,width,200)
  rect(0,height,width,-300)
  pop()
}