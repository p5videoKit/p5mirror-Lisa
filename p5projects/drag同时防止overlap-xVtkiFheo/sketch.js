//但我感觉这里有一个优先级，就是如果圆形和正方形，那么会首选圆形被鼠标移动
//同样的 在被拖动的过程中，物件的中心会自动跑到鼠标底下，无法做到鼠标一直按着物件的一个角移动

let buttons = [];

function setup() {
  createCanvas(500, 600);
  background(100);

  //create the buttons
  let rad = 30;
  for (let i = 0; i < 5; i++) {
    let x = 100;
    let y = 100 + i * 70;
    buttons.push(new CircleButton(x, y, rad));
  }
  
  // let size = 50;
  // for (let i = 0; i < 5; i++) {
  //   let x = 300;
  //   let y = 100 + i * 70;
  //   buttons.push(new RectButton(x, y, size, size));
  // }
}

function draw() {
  background(100);

  ///// BUTTONS /////
  for (let i = 0; i < buttons.length; i++) {
    let btn = buttons[i];
    btn.checkMouse();
    btn.display();
  }
}

function mousePressed() {
  // when mouse is pressed,
  // we check if one button is pressed or not.
  for (let i = 0; i < buttons.length; i++) {
    let b = buttons[i];
    if (b.pressed()) {
      // if one button is pressed,
      // we move out (break) from the for-loop.
      // becase we don't want to check with other buttons.
      break;
    }
  }
}

function mouseDragged() {
  // when mouse is dragged,
  // and one of the buttonss isDragging is "true,"
  // the position of the button will be update by the mouse position.
  for (let i = 0; i < buttons.length; i++) {
    let b = buttons[i];
    b.dragged();
  }
}

function mouseReleased() {
  // when mouse is released,
  // every button's isDragging becomes "false".
  for (let i = 0; i < buttons.length; i++) {
    let b = buttons[i];
    b.isDragging = false;
  }
}

class CircleButton {
  constructor(x, y, rad) {
    this.x = x;
    this.y = y;
    this.rad = rad;
    //
    this.r = 255;
    this.g = 255;
    this.b = 255;
    //
    this.isDragging = false;
  }
  checkMouse() {
    let distance = dist(this.x, this.y, mouseX, mouseY);
    if (distance < this.rad) {
      // in
      this.r = 255;
      this.g = 255;
      this.b = 0; // yellow
      if (mouseIsPressed) {
        this.r = 255;
        this.g = 0;
        this.b = 0; // red
      }
    } else {
      // out
      this.r = 255;
      this.g = 255;
      this.b = 255; // white
    }
  }
  pressed() {
    let distance = dist(this.x, this.y, mouseX, mouseY);
    if (distance < this.rad * 2) {
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
  display() {
    push();
    noStroke();
    fill(this.r, this.g, this.b);
    circle(this.x, this.y, this.rad * 2);
    pop();
  }
}

//

class RectButton {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    //
    this.r = 255;
    this.g = 255;
    this.b = 255;
    //
    this.isDragging = false;
  }
  checkMouse() {
    if (
      mouseX > this.x - this.w / 2 &&
      mouseX < this.x + this.w / 2 &&
      mouseY > this.y - this.h / 2 &&
      mouseY < this.y + this.h / 2
    ) {
      // in
      this.r = 255;
      this.g = 255;
      this.b = 0; // yellow
      if (mouseIsPressed) {
        this.r = 255;
        this.g = 0;
        this.b = 0; // red
      }
    } else {
      // out
      this.r = 255;
      this.g = 255;
      this.b = 255; // white
    }
  }
  pressed() {
    if (
      mouseX > this.x - this.w / 2 &&
      mouseX < this.x + this.w / 2 &&
      mouseY > this.y - this.h / 2 &&
      mouseY < this.y + this.h / 2
    ) {
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
  display() {
    push();
    noStroke();
    fill(this.r, this.g, this.b);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}
