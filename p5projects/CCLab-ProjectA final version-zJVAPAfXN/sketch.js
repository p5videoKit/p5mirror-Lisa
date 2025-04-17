let imgBg, imgShape1, imgShape2;
let shapes = [];



function preload() {
  imgBg = loadImage("background.png");
  imgShape1 = loadImage("shape1.png");
  imgShape2 = loadImage("shape2.png");
  imgButton = loadImage("button.png");
  //fly=createImg("fly1.gif","")
}

function setup() {
  createCanvas(800, 600);
  
  
  

  // (x, y, w, h, signX, signY, offsetX, offsetY, offsetTime, r, g, b, a, img)
  shapes[0] = new LisaShape(
    198 + 32,
    165 + (250 - 36 / sqrt(3)) / 2,
    36,
    250, // x, y, w, h
    -1,
    0, // signX, signY
    1,
    -1,
    0, // offsetX, offsetY, offsetTime
    18,
    158,
    176,
    170 // r, g, b, a
  );
  shapes[1] = new LisaShape(
    542 - (sqrt(3) * 45) / 2 + 56 / 2,
    90 + (45 + 56 / sqrt(3)) / 2,
    56,
    45, // x, y, w, h
    1,
    1, // signX, signY
    -1,
    -1,
    PI, // offsetX, offsetY, offsetTime
    246,
    61,
    72,
    180 //r, g, b, a
  );
  shapes[2] = new LisaShape(
    532 + 30 / 2,
    130 + (260 - 30 / sqrt(3)) / 2,
    30,
    260, // x, y, w, h
    -1,
    0, // signX, signY
    -1,
    1,
    PI * 1.2, // offsetX, offsetY, offsetTime
    18,
    158,
    176,
    110 //r, g, b, a
  );
  shapes[3] = new LisaShape(
    212 + 200 / 2,
    355 + (56 + 200 / sqrt(3)) / 2,
    200,
    56, // x, y, w, h
    1,
    0, // signX, signY
    -1,
    1,
    2, // offsetX, offsetY, offsetTime
    37,
    152,
    142,
    90 //r, g, b, a
  );
  shapes[4] = new LisaShape(
    382 - (sqrt(3) * 120) / 2 + 120 / 2,
    190 + (120 + 120 / sqrt(3)) / 2,
    120,
    120, // x, y, w, h
    1,
    1, // signX, signY
    1,
    1,
    0.8, // offsetX, offsetY, offsetTime
    246,
    61,
    72,
    100 //r, g, b, a
  );
  shapes[5] = new LisaShape(
    382 + 120 / 2,
    152 + (40 + 120 / sqrt(3)) / 2,
    120,
    40, // x, y, w, h
    1,
    0, // signX, signY
    -1,
    -1,
    1.3, // offsetX, offsetY, offsetTime
    4,
    91,
    167,
    90 //r, g, b, a
  );
  shapes[6] = new LisaShape(
    463 + 140 / 2,
    132 + (30 + 140 / sqrt(3)) / 2,
    140,
    30, // x, y, w, h
    1,
    0, // signX, signY
    0,
    -1,
    PI * 0.65, // offsetX, offsetY, offsetTime
    247,
    174,
    136,
    150 //r, g, b, a
  );
  shapes[7] = new LisaShape(
    382 + 95 / 2,
    290 + (70 + 95 / sqrt(3)) / 2,
    95,
    70, // x, y, w, h
    1,
    0, // signX, signY
    -1,
    0,
    0.6, // offsetX, offsetY, offsetTime
    136,
    187,
    198,
    110 //r, g, b, a
  );
  shapes[8] = new LisaShape(
    367 + 95 / 2,
    430 + (70 - 95 / sqrt(3)) / 2,
    95,
    70, // x, y, w, h
    -1,
    0, // signX, signY
    -1,
    -1,
    PI * 0.87, // offsetX, offsetY, offsetTime
    238,
    101,
    116,
    150 //r, g, b, a
  );
  shapes[9] = new LisaShape(
    247 - (sqrt(3) * 20) / 2 + 76 / 2,
    154 + (20 + 76 / sqrt(3)) / 2,
    76,
    20, // x, y, w, h
    1,
    1, // signX, signY
    1,
    1,
    2, // offsetX, offsetY, offsetTime
    238,
    101,
    116,
    200 //r, g, b, a
  );
  shapes[10] = new LisaShape(
    256,
    225,
    91.26,
    106.38, // x, y, w, h
    0,
    0, // signX, signY
    -1,
    1,
    PI - 0.1, // offsetX, offsetY, offsetTime
    0,
    0,
    0,
    0, //r, g, b, a
    imgShape1
  );
  shapes[11] = new LisaShape(
    558,
    382,
    165.12,
    195.84, // x, y, w, h
    0,
    0, // signX, signY
    1,
    -1,
    PI + 2.3, // offsetX, offsetY, offsetTime
    0,
    0,
    0,
    0, //r, g, b, a
    imgShape2
  );
}

function draw() {
  background(255);
  image(imgBg, 0, 0, 800, 600);
  drawbutton(650, 520, 110, 54);
  //drawimage(30,20,42,42)
  //drawimage(13,55,20,20)
  
  
  

  push();
  //blendMode(ADD);
  for (let i = 0; i < shapes.length; i++) {
    let s = shapes[i];
    s.move();
    s.checkMouse();
    s.display();
    s.displayCenter();
    s.flow();
  }
  pop();
  textSize(15)
  //text(mouseX, 20, 40);
  //text(mouseY, 45, 40);
  text("drag the objects to create your own pattern!",100,37)
  text("press ENTER to free them!",100,60)
  fill(26,81,131)
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
  checkMouse() {
    let distance = dist(this.x, this.y, mouseX, mouseY);
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
    this.y += map(cos(frameCount * 0.032 + this.offsetTime), -1, 1, -0.15, 0.15);
  }
  flow() {
    
    if (this.flowing) {
      this.x += this.speed*this.H;
      this.y += this.M*this.speed/sqrt(3)
    } else {
      if (this.speed > 0) {
        this.speed =this.speed*0.86;
        this.x -= this.speed*this.H;
        this.y-=this.M*this.speed/sqrt(3)
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
  pressed() {
    let distance = dist(this.x, this.y, mouseX, mouseY);
    if (distance < 25) {
      this.isDragging = true;
      return true;
    } else {
      return false;
    }
  }
  dragged() {
    if (this.isDragging) {
      this.x = mouseX;
      this.y = mouseY;
    }
  }
}

function mousePressed() {
  for (let i = 0; i < shapes.length; i++) {
    let s = shapes[i];
    if (s.pressed()) {
      break;
    }
  }
}

function mouseDragged() {
  for (let i = 0; i < shapes.length; i++) {
    let s = shapes[i];
    s.dragged();
  }
}

function mouseReleased() {
  for (let i = 0; i < shapes.length; i++) {
    let s = shapes[i];
    s.isDragging = false;
  }
}

function drawimage(x,y,w,h){
  
  gif = createImg('fly1.gif',"");
  gif.position(x, y);
  gif.size(w, h);
  
}

function drawbutton(x, y, w, h) {
  noStroke();
  image(imgButton, x, y, w, h);
  if (mouseIsPressed) {
    if (
      mouseX > x + 9 &&
      mouseX < x + w - 9 &&
      mouseY > y + 9 &&
      mouseY < y + h - 9
    ) {
      shapes.splice(0, 12);

      for (let i = 0; i < shapes.length; i++) {
        let s = shapes[i];
        s.move();
        s.checkMouse();
        s.display();
        s.displayCenter();
      }
      shapes[0] = new LisaShape(
    198 + 32,
    165 + (250 - 36 / sqrt(3)) / 2,
    36,
    250, // x, y, w, h
    -1,
    0, // signX, signY
    1,
    -1,
    0, // offsetX, offsetY, offsetTime
    18,
    158,
    176,
    170 // r, g, b, a
  );
  shapes[1] = new LisaShape(
    542 - (sqrt(3) * 45) / 2 + 56 / 2,
    90 + (45 + 56 / sqrt(3)) / 2,
    56,
    45, // x, y, w, h
    1,
    1, // signX, signY
    -1,
    -1,
    PI, // offsetX, offsetY, offsetTime
    246,
    61,
    72,
    180 //r, g, b, a
  );
  shapes[2] = new LisaShape(
    532 + 30 / 2,
    130 + (260 - 30 / sqrt(3)) / 2,
    30,
    260, // x, y, w, h
    -1,
    0, // signX, signY
    -1,
    1,
    PI * 1.2, // offsetX, offsetY, offsetTime
    18,
    158,
    176,
    110 //r, g, b, a
  );
  shapes[3] = new LisaShape(
    212 + 200 / 2,
    355 + (56 + 200 / sqrt(3)) / 2,
    200,
    56, // x, y, w, h
    1,
    0, // signX, signY
    -1,
    1,
    2, // offsetX, offsetY, offsetTime
    37,
    152,
    142,
    90 //r, g, b, a
  );
  shapes[4] = new LisaShape(
    382 - (sqrt(3) * 120) / 2 + 120 / 2,
    190 + (120 + 120 / sqrt(3)) / 2,
    120,
    120, // x, y, w, h
    1,
    1, // signX, signY
    1,
    1,
    0.8, // offsetX, offsetY, offsetTime
    246,
    61,
    72,
    100 //r, g, b, a
  );
  shapes[5] = new LisaShape(
    382 + 120 / 2,
    152 + (40 + 120 / sqrt(3)) / 2,
    120,
    40, // x, y, w, h
    1,
    0, // signX, signY
    -1,
    -1,
    1.3, // offsetX, offsetY, offsetTime
    4,
    91,
    167,
    90 //r, g, b, a
  );
  shapes[6] = new LisaShape(
    463 + 140 / 2,
    132 + (30 + 140 / sqrt(3)) / 2,
    140,
    30, // x, y, w, h
    1,
    0, // signX, signY
    0,
    -1,
    PI * 0.65, // offsetX, offsetY, offsetTime
    247,
    174,
    136,
    150 //r, g, b, a
  );
  shapes[7] = new LisaShape(
    382 + 95 / 2,
    290 + (70 + 95 / sqrt(3)) / 2,
    95,
    70, // x, y, w, h
    1,
    0, // signX, signY
    -1,
    0,
    0.6, // offsetX, offsetY, offsetTime
    136,
    187,
    198,
    110 //r, g, b, a
  );
  shapes[8] = new LisaShape(
    367 + 95 / 2,
    430 + (70 - 95 / sqrt(3)) / 2,
    95,
    70, // x, y, w, h
    -1,
    0, // signX, signY
    -1,
    -1,
    PI * 0.87, // offsetX, offsetY, offsetTime
    238,
    101,
    116,
    150 //r, g, b, a
  );
  shapes[9] = new LisaShape(
    247 - (sqrt(3) * 20) / 2 + 76 / 2,
    154 + (20 + 76 / sqrt(3)) / 2,
    76,
    20, // x, y, w, h
    1,
    1, // signX, signY
    1,
    1,
    2, // offsetX, offsetY, offsetTime
    238,
    101,
    116,
    200 //r, g, b, a
  );
  shapes[10] = new LisaShape(
    256,
    225,
    91.26,
    106.38, // x, y, w, h
    0,
    0, // signX, signY
    -1,
    1,
    PI - 0.1, // offsetX, offsetY, offsetTime
    0,
    0,
    0,
    0, //r, g, b, a
    imgShape1
  );
  shapes[11] = new LisaShape(
    558,
    382,
    165.12,
    195.84, // x, y, w, h
    0,
    0, // signX, signY
    1,
    -1,
    PI + 2.3, // offsetX, offsetY, offsetTime
    0,
    0,
    0,
    0, //r, g, b, a
    imgShape2
  );
    }
  }
}
function keyPressed() {
  if (keyCode === ENTER) {
    for (let i = 0; i < shapes.length; i++) {
      let s = shapes[i];
      s.flowing = true;
      s.speed = random(18,24);
    }
  }
}

function keyReleased() {
  if (keyCode === ENTER) {
    for (let i = 0; i < shapes.length; i++) {
      let s = shapes[i];
      s.flowing = false;
    }
  }
}
