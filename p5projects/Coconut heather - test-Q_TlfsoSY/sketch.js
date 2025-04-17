let character;
let blocks = [];
let checkGreen = true;
function setup() {
  createCanvas(500, 500);
  character = new Character();
  blocks[0] = new Block(250, 350, 100, 10);
  blocks[1] = new Block(350, 250, 100, 10);
  blocks[2] = new Block(240, 150, 100, 10);
}

function draw() {
  if (checkGreen == false) {
    background(91, 125, 88);
    for (let i = 0; i < blocks.length; i = i + 2) {
      let b = blocks[i];
      fill(112, 42, 40);
      b.show();
      character.collisions1(blocks);
    }
  } else if (checkGreen == true) {
    background(112, 42, 40);
    for (let i = 1; i < blocks.length; i = i + 2) {
      let b = blocks[i];
      fill(91, 125, 88);
      b.show();
      character.collisions2(blocks);
    }
  }

  character.show();
  character.upDown();
  character.move();
  //character.collisions1(blocks);

  noStroke();
  line(0, height - 100, width, height - 60);
}

function keyPressed() {
  for (let i = 0; i < blocks.length; i++) {
    let b = blocks[i];
    if (key == " ") {
      //character.jump();
    }
  }
  if (key == " ") {
    checkGreen = !checkGreen;
  }
}

class Block {
  constructor(bx, by, bw, bh) {
    this.bx = bx;
    this.by = by;
    this.bw = bw;
    this.bh = bh;
  }

  show() {
    rect(this.bx, this.by, this.bw, this.bh);
  }
}

class Character {
  constructor() {
    this.r = 60;
    this.x = width * 0.2;
    this.y = height * 0.8 - this.r;
    this.vy = 0;
    this.gravity = 1.6;
    this.minHeight = height - 100 - this.r;
  }
  jump() {
    if (this.y > this.minHeight - 100) {
      this.vy = -20;
    }
  }
  upDown() {
    this.y += this.vy;
    this.vy += this.gravity;
    this.y = constrain(this.y, 0, this.minHeight);
  }
  move() {
    if (this.x + this.r < 0) {
      this.x = width;
    } else if (this.x > width) {
      this.x = 0 - this.r;
    }
    if (keyIsPressed) {
      if (keyCode === LEFT_ARROW) {
        this.x = this.x - 5; //move left
      } else if (keyCode === RIGHT_ARROW) {
        this.x = this.x + 5; //move right
      }
      if (key == " " && this.y > this.minHeight - 100) {
        this.vy = -20;
      }
    }
  }
  collisions1(objects) {
    let count = 0;
    for (let i = 0; i < objects.length; i = i + 2) {
      let b = objects[i];
      if (
        this.x > b.bx - this.r &&
        this.x < b.bx + b.bw &&
        this.y <= b.by - this.r
      ) {
        // on block
        // great!
        this.minHeight = b.by - this.r;
        count++;
      }
    }
    if (count == 0) {
      this.minHeight = height - 100 - this.r;
    }
  }
  collisions2(objects) {
    let count = 0;
    for (let i = 1; i < objects.length; i = i + 2) {
      let b = objects[i];
      if (
        this.x > b.bx - this.r &&
        this.x < b.bx + b.bw &&
        this.y <= b.by - this.r
      ) {
        // on block
        // great!
        this.minHeight = b.by - this.r;
        count++;
      }
    }
    if (count == 0) {
      this.minHeight = height - 100 - this.r;
    }
  }
  show() {
    rect(this.x, this.y, this.r, this.r);
  }
}
