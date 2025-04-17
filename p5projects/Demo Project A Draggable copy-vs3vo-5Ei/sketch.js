let shape1;

function setup() {
  createCanvas(800, 600);
  shape1 = new LisaShape(180, 175, 36, 240, 140, 140, 140);
  shape2 = new LisaShape(510, 100, 56, 45, 40, 40, 40);

  shape3 = new LisaShape(500, 140, 30, 260, 70, 70, 70);
  shape4 = new LisaShape(180, 355, 200, 56, 70, 70, 70);
  shape5 = new LisaShape(350, 190, 100, 120, 170, 170, 70);
  shape6 = new LisaShape(350, 150, 100, 40, 30, 30, 30);
}
function draw() {
  background(220);

  shape1.checkMouse1(0, 1);
  shape1.display(-1, 0);
  shape1.displayBox();

  shape2.checkMouse2(1);
  shape2.display(1, 1);
  shape2.displayBox();

  shape3.checkMouse1(0, 1);
  shape3.display(-1, 0);
  shape3.displayBox();

  shape4.checkMouse1(0, 1);
  shape4.display(1, 0);
  shape4.displayBox();

  shape5.checkMouse1(1, 0);
  shape5.display(1, 1);
  shape5.displayBox();

  shape6.checkMouse2(1);
  shape6.display(1, 0);
  shape6.displayBox();

  if (mouseIsPressed) {
  } else {
    shape1.move(0);
    shape2.move(PI);
    shape3.move(PI * 1.2);
    shape4.move(0.5);
    shape5.move(1.2);
    shape6.move(1.3);
  }

  text(mouseX, 20, 40);
  text(mouseY, 45, 40);
}

class LisaShape {
  constructor(x, y, w, h, r, g, b) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.X = this.x;
    this.Y = this.y;

    //this.boxColor = "white";

    this.initR = r;
    this.initG = g;
    this.initB = b;
    this.r = this.initR;
    this.g = this.initG;
    this.b = this.initB;
  }
  checkMouse1(x, y) {
    //x=1,y=0 free
    //x=0,y=1 up and down
    if (
      mouseX > this.X &&
      mouseX < this.X + this.w &&
      (mouseY > this.Y) & (mouseY < this.Y + this.h)
    ) {
      // in
      this.r = this.initR - 30;
      this.g = this.initG - 30;
      this.b = this.initB - 30;

      if (mouseIsPressed) {
        this.X = x * (mouseX - this.w / 2) + y * this.x;
        this.Y = mouseY - this.h / 2;
      }
    } else {
      // out
      this.r = this.initR;
      this.g = this.initG;
      this.b = this.initB;
    }
  }

  checkMouse2(x) {
    if (
      mouseX > this.X &&
      mouseX < this.X + this.w &&
      (mouseY > this.Y) & (mouseY < this.Y + this.h)
    ) {
      // in
      this.r = this.initR - 30;
      this.g = this.initG - 30;
      this.b = this.initB - 30;

      if (mouseIsPressed) {
        this.X = mouseX - this.w / 2;
        //x=1 left up
        //x=-1 right up
        this.Y = this.y + (x * (mouseX - this.w / 2 - this.x)) / sqrt(3);
      }
    } else {
      // out
      this.r = this.initR;
      this.g = this.initG;
      this.b = this.initB;
    }
  }
  displayBox() {
    push();
    stroke(255);
    noFill();
    rect(this.X, this.Y, this.w, this.h);
    pop();
  }
  display(x, y) {
    push();
    translate(this.X, this.Y);
    fill(this.r, this.g, this.b, 60);
    noStroke();
    beginShape();
    vertex(0, 0);
    vertex(this.w, (x * this.w) / sqrt(3));
    vertex(-y * this.h * sqrt(3) + this.w, this.h + (x * this.w) / sqrt(3));
    vertex(0 - y * this.h * sqrt(3), this.h);
    endShape(CLOSE);
    pop();
  }

  move(time) {
    this.Y += map(cos(frameCount * 0.02 + time), -1, 1, -0.15, 0.15);
  }
}
