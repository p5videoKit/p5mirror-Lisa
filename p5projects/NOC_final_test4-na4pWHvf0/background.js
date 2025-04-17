let sinArray = [];
let cosArray = [];
let sinCosResolution = 360 * 2; // 720

function drawNoiseMountain(){
  stroke(255);
  noFill();
  beginShape();
  let xoff = start;
  for (let x = 0; x < width; x++) {
    stroke(0);
    // let y = random(height);
    let y = (noise(xoff) * width) / 3;
    vertex(x, y);

    xoff -= inc;
  }
  endShape();

  start += forward; //inc * 30;
}

let wave1;
let countxoff=0;

function drawWave(){
  // if (countxoff <= width) {
  //   countxoff += 30;
  // } else if (countxoff > width) {
  //   countxoff = 0;
  // }

  wave1.update();
  wave1.display(countxoff);

  wave2.update();
  wave2.display(countxoff - width);
}

class Wave {
  constructor() {
    this.start = 0;
    this.inc = 0.05;
  }
  update() {
    this.start -= 0.03;
    if (this.start < -width) {
      this.start = 0;
    }
  }

  display(translateX) {
    push();
    translate(translateX, mSin(frameCount * 0.08) * 30 - 160);
    let xoff = this.start;

    for (let i = 0; i < 10; i++) {
      noStroke();

      for (let x = i; x < width + 130; x += 10) {
        let y =
          map(noise(xoff * 0.7 * (i * 0.2 + 1) + i), 0, 1, -140, 90) +
          map(sin(xoff * 0.4), -1, 1, 0, 90);

        push();
        translate(0, mSin(frameCount * 0.08 + i * 0.5) * 80);
        rectMode(CENTER);
        fill("#a7c83f");
        rect(
          x,
          y + map(dist(x, 0, width / 2 - 100, 0), 210, 0, -10, 70),
          1,
          map(noise(xoff + 0.5), 0, 1, 170, 150) + random(-20, 5) + 350
        );
        pop();

        xoff += this.inc;
      }
    }
    pop();
  }
}

function setupFastSinCos() {
  for (let i = 0; i < sinCosResolution; i++) {
    let deg = map(i, 0, sinCosResolution, 0, 360);
    let rad = radians(deg);
    sinArray.push(sin(rad));
    cosArray.push(cos(rad));
  }
}

function mSin(rad) {
  let angle = rad % TWO_PI;
  if (angle < 0) angle += TWO_PI;
  let index = floor(map(angle, 0, TWO_PI, 0, sinCosResolution));
  return sinArray[index];
}

function mCos(rad) {
  let angle = rad % TWO_PI;
  if (angle < 0) angle += TWO_PI;
  let index = floor(map(angle, 0, TWO_PI, 0, sinCosResolution));
  return cosArray[index];
}

