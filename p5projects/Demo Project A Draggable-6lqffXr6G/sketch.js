let shape1;

function setup() {
  createCanvas(400, 400);
  shape1 = new LisaShape(10, 20, 100, 200);
}

function draw() {
  background(220);

  shape1.checkMouse();
  shape1.display();
  shape1.displayBox();
}

class LisaShape {
  constructor(x, y, w, h, r, g, b) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    //
    this.boxColor = "white";
    //
    this.initR = r;
    this.initG = g;
    this.initB = b;
    this.r = this.initR;
    this.g = this.initG;
    this.b = this.initB;
  }
  checkMouse() {
    if (
      mouseX > this.x &&
      mouseX < this.x + this.w &&
      (mouseY > this.y) & (mouseY < this.y + this.h)
    ) {
      // in
      this.r = this.initR + 30;
      this.g = this.initG + 30;
      this.b = this.initB + 30;
      this.boxColor = "red";
      if (mouseIsPressed) {
        this.x = mouseX - this.w / 2;
        this.y = mouseY - this.h / 2;
      }
    } else {
      // out
      this.r = this.initR - 30;
      this.g = this.initG - 30;
      this.b = this.initB - 30;
      this.boxColor = "white";
    }
  }
  displayBox() {
    push();
    stroke(this.boxColor);
    noFill();
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
  display() {
    push();
    translate(this.x, this.y);
    fill(this.r, this.g, this.b);
    beginShape();
    vertex(0, 0);
    vertex(100, 10);
    vertex(100, 180);
    vertex(0, 170);
    endShape(CLOSE);
    pop();
  }
}
