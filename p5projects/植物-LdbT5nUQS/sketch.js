let tmaxLen;
let tminLen;
let smaxLen;
let sminLen;
let colKeep;
let layerA = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  loc = createVector(width * 0.5, height * 0.5);
  vel = createVector(random(-15, 15), random(-15, 15));
  tmaxLen = height * 0.13;
  tminLen = tmaxLen * 0.1;
  smaxLen = height * 0.05;
  sminLen = tmaxLen * 0.1;
}

function draw() {
  push();
  translate(width * 0.5, height * 0.95);
  for (let nn = 0; nn < 2; nn++) {
    treeMaker(tmaxLen);
    for (let gn = 0; gn < 75; gn++) {
      push();
      translate(random(-width * 0.1, width * 0.1), 0);
      grassMaker(smaxLen, random(-PI * 0.1, PI * 0.1));
      pop();
    }
  }
  pop();
  noLoop();
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    saveCanvas("ed_cavett_fancyTree", "png");
  }
}

function grassMaker(len, theta) {
  push();
  translate(0, 0);
  rotate(theta);
  let sw = map(len, sminLen, smaxLen, 1, 5);
  strokeWeight(sw);
  stroke(0, random(50, 100), 0, 255);
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > sminLen) {
    grassMaker(len * 0.7, theta * 1.1);
  }
  pop();
}

/// Fitted-Segment, One-Branch Recursion
/// Shaded w/ Lines
/// Gradient Filled
function treeMaker(len) {
  push();
  translate(0, 0);
  let theta = random(-PI * 0.2, PI * 0.2);

  /// first segment is vertical
  if (len < tmaxLen) {
    rotate(theta);
  } else {
    rotate(random(-PI * 0.1, PI * 0.1));
  }

  let sw = map(len, tminLen, tmaxLen, 3, 12);
  strokeWeight(2);

  for (let y = 0; y < len * 1.05; y++) {
    let x = map(y, 0, len, sw, sw * 0.8);
    let col = map(x, 12, 3, 255, 75);
    colKeep = col;
    push();
    translate(random(-x * 0.12, x * 0.12), -y);

    /// highlight
    stroke(col, 255);
    if (random() < 0.05) {
      stroke(0, random(25, 100), 0, 255);
    }
    line(-x, 0, -x * 0.1, 0);
    /// mid-tone
    stroke(col * 0.75, 255);
    if (random() < 0.1) {
      stroke(0, random(25, 100), 0, 255);
    }
    line(-x * 0.1, 0, x * 0.32, 0);
    /// shadow
    stroke(col * 0.5, 255);
    if (random() < 0.2) {
      stroke(0, random(25, 100), 0, 255);
    }
    line(x * 0.32, 0, x, 0);

    if (random() < 0.005) {
      push();
      translate(0, 0);
      let theta = random(-PI * 0.14, PI * 0.14);
      rotate(theta);
      let swB = sw;
      strokeWeight(2);

      for (let yB = 0; yB < len * 1.05; yB++) {
        let xB = map(yB, 0, len, swB, swB * 0.8);
        let col = map(xB, 12, 3, 255, 75);
        colKeep = col;
        push();
        translate(random(-xB * 0.12, xB * 0.12), -yB);

        /// highlight
        stroke(col, 255);
        if (random() < 0.05) {
          stroke(0, random(25, 100), 0, 255);
        }
        line(-xB, 0, -xB * 0.1, 0);
        /// mid-tone
        stroke(col * 0.75, 255);
        if (random() < 0.1) {
          stroke(0, random(25, 100), 0, 255);
        }
        line(-xB * 0.1, 0, xB * 0.32, 0);
        /// shadow
        stroke(col * 0.5, 255);
        if (random() < 0.2) {
          stroke(0, random(25, 100), 0, 255);
        }
        line(xB * 0.32, 0, xB, 0);

        pop();
      }

      translate(0, -len);
      if (len > tminLen) {
        treeMaker(len * 0.8);
      }
      pop();
    }

    pop();
    if (random() < 0.005 && len < tmaxLen * 0.8) {
      for (let sn = 0; sn < 4; sn++) {
        push();
        translate(0, 0);
        rotate(random(TAU));
        stickMaker(smaxLen);
        pop();
      }
    }
  }

  translate(0, -len);
  if (len > tminLen) {
    treeMaker(len * 0.8);
  }
  if (random() < 0.02 && len < tmaxLen * 0.4) {
    for (let sn = 0; sn < 4; sn++) {
      push();
      translate(0, 0);
      rotate(random(TAU));
      stickMaker(smaxLen);
      pop();
    }
  }
  pop();
}

function stickMaker(len) {
  push();
  rotate(random(TAU));
  leafMaker(len);
  pop();
  push();
  translate(0, 0);
  let theta = random(-PI * 0.3, PI * 0.3);
  rotate(theta);
  let sw = map(len, sminLen, smaxLen, 1, 4);
  strokeWeight(sw);
  stroke(100, 255);
  line(0, 0, 0, -len);
  stroke(25, 255);
  line(sw * 0.75, sw * 0.75, sw * 0.75, sw * 0.75 - len);
  translate(0, -len);
  if (len > sminLen) {
    stickMaker(len * 0.7);
  }
  pop();
}

function leafMaker(len) {
  let leafDense = floor(random(1, 4));
  for (let n = 0; n < leafDense; n++) {
    let z = createVector(random(0.5, 1), random(0.25, 0.5));
    let pos = createVector(random(-1, 1), random(-1, 1));
    let m = random(len);
    pos.mult(m);
    let col = map(pos.y, -m, m, 255, 25);
    z.mult(sminLen * 1.5);

    push();
    translate(pos.x, pos.y);
    beginShape();
    vertex(0, 0);
    bezierVertex(z.x, z.y, z.x, -z.y, -z.x, -z.y);
    fill(255 - colKeep, col, colKeep, 225);
    stroke(0, col * 1.1, colKeep, 255);
    strokeWeight(1);
    endShape();

    beginShape();
    vertex(0, 0);
    bezierVertex(z.x, z.y, -z.x, z.y, -z.x, -z.y);
    fill(255 - colKeep, col * 0.7, colKeep * 0.7, 225);
    stroke(0, col * 1.1, colKeep, 255);
    strokeWeight(1);
    endShape();
    strokeWeight(1);
    line(-z.x, -z.y, z.x * 0.25, z.y * 0.25);
    pop();
  }
}