function preload() {
  S1 = loadImage("shape1.png");
  S2 = loadImage("shape2.png")
  B = loadImage("background.png")
  
}

function setup() {
  createCanvas(800, 600);
  shape1 = new LisaShape(180, 165, 36, 250,18,158,176);
  shape2 = new LisaShape(510, 90, 56, 45, 246,61,72);

  shape3 = new LisaShape(500, 130, 30, 260, 18,158,176);
  shape4 = new LisaShape(180, 355, 200, 56, 37,152,142);
  shape5 = new LisaShape(350, 190, 120, 120,246,61,72);
  shape6 = new LisaShape(350, 150, 120, 40, 4,91,167);
  shape7 = new LisaShape(431, 132, 140, 30, 247,174,136);
  shape8 = new LisaShape(360, 290, 95, 70, 136,187,198);
shape9 = new LisaShape(335,430, 95, 70,238,101,116);
  shape10 = new LisaShape(215, 154, 76,20, 238,101,116);
  shape11=new LisaShape(180,165, 134, 134, 0,0,0)
  shape12=new LisaShape(442,300, 250, 240, 0,0,0)
}
function draw() {
  background(220);
  image(B,0,0,800,600)

  shape1.checkMouse3( -1, 0);
  shape1.display(-1, 0,170);
  //shape1.displayBox();

  shape2.checkMouse2(-1);
  shape2.display(1, 1,180);
  //shape2.displayBox();

  shape3.checkMouse3( -1, 0);
  shape3.display(-1, 0,110);
  //shape3.displayBox();

  shape4.checkMouse1(0, 1, 1, 0);
  shape4.display(1, 0,90);
  //shape4.displayBox();

  shape5.checkMouse1(1, 0, 1, 1);
  shape5.display(1, 1,100);
  //shape5.displayBox();

  shape6.checkMouse3(1,0);
  shape6.display(1, 0,90);
  //shape6.displayBox();
  
  shape7.checkMouse3(1,0);
  shape7.display(1, 0,150);
  //shape7.displayBox();
  
  shape8.checkMouse2(-1);
  shape8.display(1, 0,110);
  //shape8.displayBox();
  
  shape9.checkMouse2(1);
  shape9.display(-1, 0,150);
  //shape8.displayBox();
  
  shape10.checkMouse2(-1);
  shape10.display(1, 1,200);
  //shape10.displayBox();
  
  
  shape11.checkMouse2(1);
  shape11.displayShape(S1);
  shape11.move(PI-0.1)
  //shape11.displayBox();
  
  shape12.checkMouse2(1);
  shape12.displayShape(S2);
  shape12.move(PI+0.1)
  //shape11.displayBox();

  if (mouseIsPressed) {
  } else {
    shape1.move(0);
    shape2.move(PI);
    shape3.move(PI * 1.2);
    shape4.move(0.5);
    shape5.move(1.2);
    shape6.move(1.3);
    shape7.move(PI*1.1)
    shape8.move(0.6)
    shape9.move(PI*0.87)
    shape10.move(2)
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
  checkMouse1(x, y, a, b) {
    //x=1,y=0 free
    //x=0,y=1 left and right
    //x=
    if (
      dist(
        (-b * this.h * sqrt(3) + this.w) / 2+this.X,
        this.h / 2 + (a * this.w) / (sqrt(3) * 2)+this.Y,
        mouseX,
        mouseY
      ) < (this.w/sqrt(3)) &&
      dist(
        (-b * this.h * sqrt(3) + this.w) / 2+this.X,
        this.h / 2 + (a * this.w) / (sqrt(3) * 2)+this.Y,
        mouseX,
        mouseY
      ) < this.h
    ) {
      // in
      this.r = this.initR - 30;
      this.g = this.initG - 30;
      this.b = this.initB - 30;

      if (mouseIsPressed) {
        this.X = mouseX+((this.w+x*sqrt(3)*this.h)/2-this.w)
        this.Y = x*(mouseY-(this.w/sqrt(3)+this.h)/2)+y*this.y;
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
  checkMouse3(a, b) {
    //up and down
    if (
      dist(
        (-b * this.h * sqrt(3) + this.w) / 2+this.X,
        this.h / 2 + (a * this.w) / (sqrt(3) * 2)+this.Y,
        mouseX,
        mouseY
      ) < (this.w) &&
      dist(
        (-b * this.h * sqrt(3) + this.w) / 2+this.X,
        this.h / 2 + (a * this.w) / (sqrt(3) * 2)+this.Y,
        mouseX,
        mouseY
      ) < this.h
    ) {
      // in
      this.r = this.initR - 30;
      this.g = this.initG - 30;
      this.b = this.initB - 30;

      if (mouseIsPressed) {
        this.X = this.x
        this.Y = mouseY-(this.w/sqrt(3)+this.h)/2
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
  display(x, y,t) {
    //x=1 y=0//x=1 y=1
    push();
    translate(this.X, this.Y);
    fill(this.r, this.g, this.b, t);
    noStroke();
    beginShape();
    vertex(0, 0);
    vertex(this.w, (x * this.w) / sqrt(3));
    vertex(-y * this.h * sqrt(3) + this.w, this.h + (x * this.w) / sqrt(3));
    vertex(0 - y * this.h * sqrt(3), this.h);
    endShape(CLOSE);
    pop();
  }
  displayShape(X){
    
    image(X,this.X,this.Y,this.w,this.h)
  }

  move(time) {
    this.Y += map(cos(frameCount * 0.02 + time), -1, 1, -0.15, 0.15);
  }
}
