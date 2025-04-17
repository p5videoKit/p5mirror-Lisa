// Let's drag the objects by hands!!!
// press "1" to train the pose to move the object
// press "2" to train the pose while not moving object
// press "3" to train the pose when you want to restart
// not working very well yet 🥲
// still working on the overlapping issue

let handpose;
let video;
let predictions = [];
let thumb = [0, 0];
let indexFinger = [0, 0];
let palmBase = [0, 0];
let nn;
let label = "";

let imgBg, imgShape1, imgShape2;
let shapes = [];

function modelReady() {
  console.log("Model ready!");
}

function gotResults(results) {
  predictions = results;
  //console.log(results);
}

function draw() {
  //background(255,34,56)
  console.log(predictions)

  push();
  translate(width, 0);
  scale(-1, 1);
  // imageMode(CORNERS);
  image(video, 0, 0, width, height);

  image(mask, 0, 0, width, height);

  // check if we have a prediction
  if (predictions && predictions.length > 0) {
    // check if we have a thumb
    if (
      predictions[0].annotations.thumb &&
      predictions[0].annotations.thumb.length > 0
    ) {
      // yes, store it in a variable
      thumb =
        predictions[0].annotations.thumb[
          predictions[0].annotations.thumb.length - 1
        ];
    }

    // check if we have an index finger
    if (
      predictions[0].annotations.indexFinger &&
      predictions[0].annotations.indexFinger.length > 0
    ) {
      // yes, store it in a variable
      indexFinger =
        predictions[0].annotations.indexFinger[
          predictions[0].annotations.indexFinger.length - 1
        ];
      //ellipse(indexFinger[0], indexFinger[1], 10, 10);
    }

    // check if we have the palm base
    if (
      predictions[0].annotations.palmBase &&
      predictions[0].annotations.palmBase.length > 0
    ) {
      palmBase = predictions[0].annotations.palmBase[0];
      //ellipse(palmBase[0], palmBase[1], 10, 10);
    }
  }

  
  
  
  noStroke();
  ellipse(thumb[0], thumb[1], 13, 13);
  push();

  //blendMode(ADD);
  for (let i = 0; i < shapes.length; i++) {
    let s = shapes[i];
    s.move();
    s.checkMouse(thumb[0], thumb[1]);
    s.display();
    s.displayCenter();
    s.flow();
    s.pressed(thumb[0], thumb[1]);
  }
  pop();
  Dragged(thumb[0], thumb[1]);
  Released(thumb[0], thumb[1]);
  Pressed(thumb[0], thumb[1]);
  Refresh();

  pop();

  textSize(26);
  fill(255);
  //textAlign(CENTER);
  text(label, 50, height - 50);

  //   push();

  //   //blendMode(ADD);
  //   for (let i = 0; i < shapes.length; i++) {
  //     let s = shapes[i];
  //     s.move();
  //     s.checkMouse();
  //     s.display();
  //     s.displayCenter();
  //     s.flow();
  //     s.pressed(thumb[[0],thumb[1]])
  //   }
  //   pop();
}

function keyPressed() {
  // create four inputs for the neural network
  // from the relative coordinates between thumb and palm base
  // and index finger and palm base
  let inputs = [
    thumb[0] - palmBase[0],
    thumb[1] - palmBase[1],
    indexFinger[0] - palmBase[0],
    indexFinger[1] - palmBase[1],
  ];

  if (key == "1") {
    nn.addData(inputs, ["holding..."]);
    console.log("holding...");
  } else if (key == "2") {
    nn.addData(inputs, ["random"]);
    console.log("random");
  } else if (key == "3") {
    nn.addData(inputs, ["refresh"]);
    console.log("refresh");
  } else if (key == "t") {
    nn.normalizeData();
    let options = {
      epochs: 100,
      batchSize: 12,
    };
    nn.train(options, doneTraining);
  } else if (key == "c") {
    nn.classify(inputs, doneClassifying);
  }
}

function doneTraining() {
  console.log("Done training!");
  // we could immediately start classifying here if we wanted
}

function doneClassifying(error, results) {
  console.log(results[0].label);
  label = results[0].label;

  // automatically classify again
  let inputs = [
    thumb[0] - palmBase[0],
    thumb[1] - palmBase[1],
    indexFinger[0] - palmBase[0],
    indexFinger[1] - palmBase[1],
  ];
  nn.classify(inputs, doneClassifying);
}

class LisaShape {
  constructor(x, y, w, h, signX, signY, H, M, offsetTime, r, g, b, a, img) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.signX = signX;
    this.signY = signY;

    this.H = H;
    this.M = M;
    this.offsetTime = offsetTime;

    this.initR = r;
    this.initG = g;
    this.initB = b;
    this.r = this.initR;
    this.g = this.initG;
    this.b = this.initB;
    this.a = a;
    this.speed = 0;

    this.img = img;

    this.isMouseOn = false;
    this.isDragging = false;
    this.flowing = false;
  }
  checkMouse(thumbx, thumby) {
    let distance = dist(this.x, this.y, thumbx, thumby);
    if (distance < 25 && mouseIsPressed) {
      // ***
    }
    if (distance < 25) {
      // in
      this.r = this.initR - 30;
      this.g = this.initG - 30;
      this.b = this.initB - 30;
      this.isMouseOn = true;
    } else {
      // out
      this.r = this.initR;
      this.g = this.initG;
      this.b = this.initB;
      this.isMouseOn = false;
    }
  }
  move() {
    this.y += map(
      cos(frameCount * 0.032 + this.offsetTime),
      -1,
      1,
      -0.15,
      0.15
    );
  }
  flow() {
    if (this.flowing) {
      this.x += this.speed * this.H;
      this.y += (this.M * this.speed) / sqrt(3);
    } else {
      if (this.speed > 0) {
        this.speed = this.speed * 0.86;
        this.x -= this.speed * this.H;
        this.y -= (this.M * this.speed) / sqrt(3);
      }
    }
    if (this.x < 0) {
      this.x = width;
    } else if (this.x > width) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.y = height;
    } else if (this.y > height) {
      this.y = 0;
    }
  }
  displayCenter() {
    if (this.isMouseOn) {
      push();

      translate(this.x, this.y);

      stroke(255, 100);
      noFill();

      let sinValue = sin(frameCount * 0.12) * 5;
      circle(0, 0, 50 + sinValue);
      circle(0, 0, 5);
      pop();
    }
  }
  display() {
    push();
    translate(this.x, this.y);

    if (this.img) {
      translate(
        (this.signY * this.h * sqrt(3)) / 2 - this.w / 2,
        -this.h / 2 - (this.signX * this.w) / (sqrt(3) * 2)
      );
      image(this.img, 0, 0, this.w, this.h);
    } else {
      translate(
        (this.signY * this.h * sqrt(3)) / 2 - this.w / 2,
        -this.h / 2 - (this.signX * this.w) / (sqrt(3) * 2)
      ); // ***

      fill(this.r, this.g, this.b, this.a);
      noStroke();
      beginShape();
      vertex(0, 0);
      vertex(this.w, (this.signX * this.w) / sqrt(3));
      vertex(
        -this.signY * this.h * sqrt(3) + this.w,
        this.h + (this.signX * this.w) / sqrt(3)
      );
      vertex(0 - this.signY * this.h * sqrt(3), this.h);
      endShape(CLOSE);
      //fill(0, 255, 0);
      //circle(0, 0, 5);
    }

    // display the origin in this scope.
    // you can comment these out.

    pop();
  }
  pressed(thumbx, thumby) {
    let distance = dist(this.x, this.y, thumbx, thumby);
    if (distance < 25) {
      this.isDragging = true;
      return true;
    } else {
      return false;
    }
  }
  dragged(thumbx, thumby) {
    if (this.isDragging) {
      this.x = thumbx;
      this.y = thumby;
    }
  }
}

function Pressed() {
  if (label == "holding...") {
    for (let i = 0; i < shapes.length; i++) {
      let s = shapes[i];
      if (s.pressed(Dragged(thumb[0], thumb[1]))) {
        break;
      }
    }
  }
}

function Dragged() {
  if (label == "holding...")
    for (let i = 0; i < shapes.length; i++) {
      let s = shapes[i];
      s.dragged(thumb[0], thumb[1]);
    }
}

function Released() {
  if (label == "random")
    for (let i = 0; i < shapes.length; i++) {
      let s = shapes[i];
      s.isDragging = false;
    }
}
