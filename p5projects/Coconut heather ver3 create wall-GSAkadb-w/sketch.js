let character;
let blocks = [];
let checkGreen = true;
let imgCoin;
let cy;

let sceneScale = 1.0;
let scenePosX1 = 0;
let scenePosY1 = 0;

function setup() {
  createCanvas(800, 700);

  character = new Character();

  blocks[0] = new Block(480, 550, 100, 10);
  blocks[1] = new Block(360, 450, 100, 10);
  blocks[2] = new Block(30, 120, 100, 10);
  blocks[3] = new Block(720, 400, 100, 10);
  blocks[4] = new Block(20, 20, 10, 100);
  blocks[5] = new Block(150, 220, 100, 10);
  blocks[6] = new Block(250, 350, 100, 10);
}
function preload() {
  imgCoin = loadImage("coin.png");
}

function draw() {
  if (checkGreen == false) {
    background(91, 125, 88);
    for (let i = 0; i < blocks.length; i = i + 2) {
      let b = blocks[i];
      fill(112, 42, 40);
      b.show();
      character.collisions1(blocks);
      character.collisions3(blocks);
      character.collisions4(blocks);
    }
  } else if (checkGreen == true) {
    background(112, 42, 40);
    for (let i = 1; i < blocks.length; i = i + 2) {
      let b = blocks[i];
      fill(91, 125, 88);
      b.show();
      character.collisions2(blocks);
      character.collisions3(blocks);
      character.collisions4(blocks);
    }
  }

  character.show();
  character.upDown();
  character.move();
  character.win()

  text(mouseX, 20, 20);
  text(mouseY, 50, 20);
  drawCoin();

  noStroke();
  line(0, height - 100, width, height - 60);
  
  //////////////win condition///////////
  if(character.winning){
    push();
  //place the focus to the middle
  let lerpPct = 0.01;
  scenePosX1 = lerp(scenePosX1, 747, lerpPct);
  scenePosY1 = lerp(scenePosY1, 340, lerpPct);
  translate(scenePosX1,scenePosY1);
  
  //scale
  scale(sceneScale);
  sceneScale += 0.01;
  sceneScale = constrain(sceneScale, 1.0, 3.0);
  pop()  
  }
  
}

function drawCoin() {
  cy = 350 + map(sin(frameCount * 0.042), -1, 1, -5, 8);
  image(imgCoin, 738, cy, 30, 30);
}

function keyPressed() {
  for (let i = 0; i < blocks.length; i++) {
    let b = blocks[i];
    if (key == " ") {
      character.jump();
    }
  }
  if (key == " ") {
    checkGreen = !checkGreen;
  }
  if (keyCode === LEFT_ARROW) {
    character.goleft = true;
  } else if (keyCode === RIGHT_ARROW) {
    character.goright = true;
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW) {
    character.goleft = false;
  } else if (keyCode === RIGHT_ARROW) {
    character.goright = false;
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
    this.x = 100;
    this.y = 300;
    this.vy = 0;
    this.gravity = 1.6;
    this.minHeight = height - 60 - this.r;
    this.goleft = false;
    this.goright = false;
    this.left = -200;
    this.right = width + 200;
    this.winning=false
  }
  jump() {
    if (this.y > this.minHeight - 60) {
      this.vy = -20;
    }
  }
  upDown() {
    this.y += this.vy;
    this.vy += this.gravity; //mimic gravity
    this.y = constrain(this.y, 0, this.minHeight);
  }
  move() {
    if (this.x + this.r < 0) {
      this.x = width;
    } else if (this.x > width) {
      this.x = 0 - this.r;
    }
    if (this.goleft === true) {
      this.x = this.x - 5; //move left
    } else if (this.goright === true) {
      this.x = this.x + 5; //move right
    }
    this.x = constrain(this.x, this.left, this.right);
  }
win(){
  if(this.x==747&&this.y==340){
    this.winning=true
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
        this.minHeight = b.by - this.r;
        count++;
      }
    }
    if (count == 0) {
      this.minHeight = height - 100 - this.r;
    }
  }
  collisions3(objects) {
    let count = 0;
    for (let i = 0; i < objects.length; i++) {
      let b = objects[i];
      if (
        this.x + this.r <= b.bx &&
        this.y >= b.by &&
        this.y + this.r <= b.by + b.bh
      ) {
        this.right = b.bx - this.r;
        count++;
      }
    }
    if (count == 0) {
      this.right = width + 200;
    }
  }
  collisions4(objects) {
    let count = 0;
    for (let i = 0; i < objects.length; i++) {
      let b = objects[i];
      if (
        this.x >= b.bx + b.bw &&
        this.y >= b.by &&
        this.y + this.r <= b.by + b.bh
      ) {
        this.left = b.bx + b.bw;
        count++;
      }
    }
    if (count == 0) {
      this.left = -200;
    }
  }
  show() {
    rect(this.x, this.y, this.r, this.r);
  }
}
