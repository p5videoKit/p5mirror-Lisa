// Moon's Note:

// go find "///// LISA, UPDATE THE OFFSET VALUE /////"
// and update the two numbers.
// mostly you will need to put negative values.
// I made an example for index 0 and 1.

// then try to resolve the checkMouse()'s paremeters in the same way.

// good luck and let me know!


let imgBg, imgShape1, imgShape2;
let shapes = [];

function preload() {
  imgBg = loadImage("background.png");
  imgShape1 = loadImage("shape1.png");
  imgShape2 = loadImage("shape2.png");
}

function setup() {
  createCanvas(800, 600);

  // (x, y, w, h, signX, signY, offsetX, offsetY, offsetTime, r, g, b, a, img)
  shapes[0] = new LisaShape(
    180,
    165,
    36,
    250, // x, y, w, h
    -1,
    0, // signX, signY
    -18,
    -110,
    0, // offsetX, offsetY, offsetTime
    18,
    158,
    176,
    170 // r, g, b, a
  );
  shapes[1] = new LisaShape(
    510,
    90,
    56,
    45, // x, y, w, h
    1,
    1, // signX, signY
    12,
    -35, ///// LISA, UPDATE THE OFFSET VALUE /////
    PI, // offsetX, offsetY, offsetTime
    246,
    61,
    72,
    180 //r, g, b, a
  );
  shapes[2] = new LisaShape(
    500,
    130,
    30,
    260, // x, y, w, h
    -1,
    0, // signX, signY
    0,
    0, ///// LISA, UPDATE THE OFFSET VALUE /////
    PI * 1.2, // offsetX, offsetY, offsetTime
    18,
    158,
    176,
    110 //r, g, b, a
  );
  shapes[3] = new LisaShape(
    180,
    355,
    200,
    56, // x, y, w, h
    1,
    0, // signX, signY
    0,
    0, ///// LISA, UPDATE THE OFFSET VALUE /////
    0, // offsetX, offsetY, offsetTime
    37,
    152,
    142,
    90 //r, g, b, a
  );
  shapes[4] = new LisaShape(
    350,
    190,
    120,
    120, // x, y, w, h
    1,
    1, // signX, signY
    0,
    0, ///// LISA, UPDATE THE OFFSET VALUE /////
    0.5, // offsetX, offsetY, offsetTime
    246,
    61,
    72,
    100 //r, g, b, a
  );
  shapes[5] = new LisaShape(
    350,
    150,
    120,
    40, // x, y, w, h
    1,
    0, // signX, signY
    0,
    0, ///// LISA, UPDATE THE OFFSET VALUE /////
    1.2, // offsetX, offsetY, offsetTime
    4,
    91,
    167,
    90 //r, g, b, a
  );
  shapes[6] = new LisaShape(
    431,
    132,
    140,
    30, // x, y, w, h
    1,
    0, // signX, signY
    0,
    0, ///// LISA, UPDATE THE OFFSET VALUE /////
    1.3, // offsetX, offsetY, offsetTime
    247,
    174,
    136,
    150 //r, g, b, a
  );
  shapes[7] = new LisaShape(
    360,
    290,
    95,
    70, // x, y, w, h
    1,
    0, // signX, signY
    0,
    0, ///// LISA, UPDATE THE OFFSET VALUE /////
    PI * 1.1, // offsetX, offsetY, offsetTime
    136,
    187,
    198,
    110 //r, g, b, a
  );
  shapes[8] = new LisaShape(
    335,
    430,
    95,
    70, // x, y, w, h
    -1,
    0, // signX, signY
    0,
    0, ///// LISA, UPDATE THE OFFSET VALUE /////
    0.6, // offsetX, offsetY, offsetTime
    238,
    101,
    116,
    150 //r, g, b, a
  );
  shapes[9] = new LisaShape(
    215,
    154,
    76,
    20, // x, y, w, h
    1,
    1, // signX, signY
    0,
    0, ///// LISA, UPDATE THE OFFSET VALUE /////
    PI * 0.87, // offsetX, offsetY, offsetTime
    238,
    101,
    116,
    200 //r, g, b, a
  );
  shapes[10] = new LisaShape(
    180,
    165,
    134,
    134, // x, y, w, h
    0,
    0, // signX, signY
    0,
    0, ///// LISA, UPDATE THE OFFSET VALUE /////
    PI - 0.1, // offsetX, offsetY, offsetTime
    0,
    0,
    0,
    0, //r, g, b, a
    imgShape1
  );
  shapes[11] = new LisaShape(
    442,
    300,
    250,
    240, // x, y, w, h
    0,
    0, // signX, signY
    0,
    0, ///// LISA, UPDATE THE OFFSET VALUE /////
    PI + 0.1, // offsetX, offsetY, offsetTime
    0,
    0,
    0,
    0, //r, g, b, a
    imgShape2
  );
}

function draw() {
  background(220);
  image(imgBg, 0, 0, 800, 600);

  for (let i = 0; i < shapes.length; i++) {
    let s = shapes[i];
    s.move();
    s.checkMouse();
    s.display();
    s.displayCenter();
  }

  // these parameters can also go the constructor's parameters.
  // let's resolve this when we amend the overlapping dragging issue.

  // shapes[0].checkMouse();
  // shapes[1].checkMouse(-1);
  // shapes[2].checkMouse3(-1, 0);
  // shapes[3].checkMouse1(0, 1, 1, 0);
  // shapes[4].checkMouse1(1, 0, 1, 1);
  // shapes[5].checkMouse3(1, 0);
  // shapes[6].checkMouse3(1, 0);
  // shapes[7].checkMouse2(-1);
  // shapes[8].checkMouse2(1);
  // shapes[9].checkMouse2(-1);
  // shapes[10].checkMouse2(1);
  // shapes[11].checkMouse2(1);

  text(mouseX, 20, 40);
  text(mouseY, 45, 40);
}

class LisaShape {
  constructor(
    x,
    y,
    w,
    h,
    signX,
    signY,
    offsetX,
    offsetY,
    offsetTime,
    r,
    g,
    b,
    a,
    img
  ) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.signX = signX;
    this.signY = signY;

    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.offsetTime = offsetTime;

    this.initR = r;
    this.initG = g;
    this.initB = b;
    this.r = this.initR;
    this.g = this.initG;
    this.b = this.initB;
    this.a = a;

    this.img = img;

    this.isMouseOn = false;
  }
  checkMouse() {
    let distance = dist(this.x, this.y, mouseX, mouseY);
    if (distance < 25 && mouseIsPressed) {
      this.x = mouseX;
      this.y = mouseY;
    }
    if (distance < 100) {
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
    this.y += map(cos(frameCount * 0.02 + this.offsetTime), -1, 1, -0.15, 0.15);
  }
  displayCenter() {
    //if (this.isMouseOn) {
    push();
    translate(this.x, this.y);
    stroke(255, 100);
    noFill();

    let sinValue = sin(frameCount * 0.12) * 5;
    circle(0, 0, 50 + sinValue);
    circle(0, 0, 5);
    pop();
    //}
  }
  display() {
    push();
    translate(this.x, this.y);

    if (this.img) {
      // if this.img is defined, draw the image.
      image(this.img, 0, 0, this.w, this.h);
    } else {
      // if not, draw the shape.
      translate(this.offsetX, this.offsetY); // ***

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
    }

    // display the origin in this scope.
    // you can comment these out.
    fill(0, 255, 0);
    circle(0, 0, 5);

    pop();
  }
}
