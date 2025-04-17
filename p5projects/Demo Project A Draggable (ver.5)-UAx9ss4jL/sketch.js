function preload() {
  S1 = loadImage("shape1.png");
  S2 = loadImage("shape2.png");
  B = loadImage("background.png");
}

function setup() {
  createCanvas(800, 600);
  shape1 = new LisaShape(180, 165, 36, 250, 18, 158, 176);
  shape2 = new LisaShape(510, 90, 56, 45, 246, 61, 72);

  shape3 = new LisaShape(500, 130, 30, 260, 18, 158, 176);
  shape4 = new LisaShape(180, 355, 200, 56, 37, 152, 142);
  shape5 = new LisaShape(350, 190, 120, 120, 246, 61, 72);
  shape6 = new LisaShape(350, 150, 120, 40, 4, 91, 167);
  shape7 = new LisaShape(431, 132, 140, 30, 247, 174, 136);
  shape8 = new LisaShape(360, 290, 95, 70, 136, 187, 198);
  shape9 = new LisaShape(335, 430, 95, 70, 238, 101, 116);
  shape10 = new LisaShape(215, 154, 76, 20, 238, 101, 116);
  shape11 = new LisaShape(180, 165, 134, 134, 0, 0, 0);
  shape12 = new LisaShape(442, 300, 250, 240, 0, 0, 0);
}
function draw() {
  background(220);
  image(B, 0, 0, 800, 600);

  shape1.checkMouse();
  shape1.display(-1, 0, 170);
  shape1.displayCenter();

  
  shape2.checkMouse();
  shape2.display(1, 1, 180);
  shape2.displayCenter();
/*
  shape3.checkMouse3(-1, 0);
  shape3.display(-1, 0, 110);
  shape3.displayBox();

  shape4.checkMouse1(0, 1, 1, 0);
  shape4.display(1, 0, 90);
  shape4.displayBox();

  shape5.checkMouse1(1, 0, 1, 1);
  shape5.display(1, 1, 100);
  shape5.displayBox();

  shape6.checkMouse3(1, 0);
  shape6.display(1, 0, 90);
  shape6.displayBox();

  shape7.checkMouse3(1, 0);
  shape7.display(1, 0, 150);
  shape7.displayBox();

  shape8.checkMouse2(-1);
  shape8.display(1, 0, 110);
  shape8.displayBox();

  shape9.checkMouse2(1);
  shape9.display(-1, 0, 150);
  shape8.displayBox();

  shape10.checkMouse2(-1);
  shape10.display(1, 1, 200);
  shape10.displayBox();

  shape11.checkMouse2(1);
  shape11.displayShape(S1);
  shape11.move(PI - 0.1);
  shape11.displayBox();

  shape12.checkMouse2(1);
  shape12.displayShape(S2);
  shape12.move(PI + 0.1);
  shape11.displayBox();

  if (mouseIsPressed) {
  } else {
    shape1.move(0);
    shape2.move(PI);
    shape3.move(PI * 1.2);
    shape4.move(0.5);
    shape5.move(1.2);
    shape6.move(1.3);
    shape7.move(PI * 1.1);
    shape8.move(0.6);
    shape9.move(PI * 0.87);
    shape10.move(2);
  }
  */

  text(mouseX, 20, 40);
  text(mouseY, 45, 40);
}

class LisaShape {
  constructor(x, y, w, h, r, g, b) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    //this.boxColor = "white";

    this.initR = r;
    this.initG = g;
    this.initB = b;
    this.r = this.initR;
    this.g = this.initG;
    this.b = this.initB;

    this.isMouseOn = false;
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
  display(x, y, t) {
    //x=1 y=0//x=1 y=1
    push();
    translate(this.x, this.y);

    translate(-this.w/2,-this.h/2);
    
    fill(this.r, this.g, this.b, t);
    noStroke();
    beginShape();
    vertex(0, 0);
    vertex(this.w, (x * this.w) / sqrt(3));
    vertex(-y * this.h * sqrt(3) + this.w, this.h + (x * this.w) / sqrt(3));
    vertex(0 - y * this.h * sqrt(3), this.h);
    endShape(CLOSE);

    fill(0, 255, 0);
    circle(0, 0, 10);
    pop();
  }
  displayShape(X) {
    push();
    imageMode(CENTER);
    image(X, this.x, this.y, this.w, this.h);
    pop();
  }

  move(time) {
    this.y += map(cos(frameCount * 0.02 + time), -1, 1, -0.15, 0.15);
  }
}
