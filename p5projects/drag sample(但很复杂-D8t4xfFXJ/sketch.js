let drag;

function setup() {
  createCanvas(500,500);
  drag = new Draggable();
  draggable=new Draggable()
}

function draw() {
  background(200);
  drag.update();
  drag.over();
  drag.show();
  draggable.translate(70,100,15,200)
  
}

function mousePressed() {
  drag.pressed();
}

function mouseReleased() {
  drag.released();
}

class Draggable {
  constructor() {

    this.dragging = false; 
    this.rollover = false;


    this.x = 100;
    this.y = 100;
    
    this.w = 75;
    this.h = 50;
  }

  over() {
    // Is mouse over object
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }

  }

  update() {

    // Adjust location if being dragged
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }

  }

  show() {

    stroke(0);
    // Different fill based on state
    if (this.dragging) {
      fill(50);
    } else if (this.rollover) {
      fill(100);
    } else {
      fill(175, 200);
    }
    rect(this.x, this.y, this.w, this.h);
  }

  pressed() {
    // Did I click on the rectangle?
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.dragging = true;
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
    }
  }

  released() {
    // Quit dragging
    this.dragging = false;
  }
  rect1(x,y){
    push()
    fill(255,130)
    noStroke()
    beginShape()
    vertex(0,x)
    vertex(x*3^0.5,0)
    vertex(x*3^0.5,y)
    vertex(0,y+x)
    endShape(CLOSE)
    pop()
  }
  translate(X,Y,width,length){
    push()
    translate(X,Y)
    this.rect1(width,length)
    pop()
  }
}