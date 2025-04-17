let stageHistory = [];

let character;
let blocks = [];
let checkColor = true;
let imgCoin;
let cy;

let stage = 0;
let setSize = 40;

var mainFont;
var subFont;
let changeSize1 = 80;
let changeSize2 = 80; //for mainMenu + set

let winSize=40

function setup() {
  createCanvas(900, 680);

  character = new Character();
}
function preload() {
  imgCoin = loadImage("coin.png");
  imgSet = loadImage("settings.png");
  mainFont = loadFont("Silkscreen-Regular.ttf");
  subFont = loadFont("Geo-Regular.ttf");
}

function draw() {
  if (stage == 0) {
    mainMenu();
  }
  if (stage == 1) {
    tutor();
  }
  if (stage == 2) {
    level1();
  }
  if (stage == 3) {
    level2();
  }
  if (stage == 4) {
    level3();
  }
  if (stage == 5) {
    setting();
  }
  if (stage==6){
    win()
  }
  stageHistory.push(stage);

  textSize(20);
  text(mouseX, 40, 40);
  text(mouseY, 80, 40);

  noStroke();
  ////////////////settings/////////////////
  if (dist(mouseX, mouseY, 850, 49) < 20) {
    setSize = 50;
  } else {
    setSize = 40;
  }
  image(imgSet, 830, 28, setSize, setSize);
  if (mouseIsPressed) {
    if (dist(mouseX, mouseY, 850, 49) < 20) {
      stage = 5; //settings stage
    }
  }
}

function keyPressed() {
  for (let i = 0; i < blocks.length; i++) {
    let b = blocks[i];
    if (key == " ") {
      character.jump();
    }
  }
  if (key == " ") {
    checkColor = !checkColor;
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
    this.minHeight = height - 70 - this.r;
    this.goleft = false;
    this.goright = false;
    this.left = -200;
    this.right = width + 200;
    this.winning = false;
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
      this.minHeight = height - 70 - this.r;
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
      this.minHeight = height - 70 - this.r;
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
//////////////////////////main menu//////////////////////
function mainMenu() {
  fill(255);

  textAlign(CENTER);

  if (mouseX < width / 2 && mouseY < height / 2) {
    background(63, 62, 106); //set1-1
    fill(227, 151, 112); //set1-2
  } else if (mouseX >= width / 2 && mouseY <= height / 2) {
    background(227, 151, 112); //set1-2
    fill(63, 62, 106); //set1-1
  } else if (mouseX <= width / 2 && mouseY >= height / 2) {
    background(91, 125, 88); //set2-1
    fill(112, 42, 40); //set2-2
  } else if (mouseX > width / 2 && mouseY > height / 2) {
    background(112, 42, 40); //set2-2
    fill(91, 125, 88); //set2-1
  }
  textSize(100);
  textFont(mainFont);
  text("BALANCE", width / 2, 200); //title
  //rect(380,275,140,70)
  //rect(380,380,140,70)
  if (mouseX > 380 && mouseX < 520 && mouseY > 275 && mouseY < 345) {
    changeSize1 = 96;
  } else {
    changeSize1 = 80;
  }
  textSize(changeSize1);
  textFont(subFont);
  text("PLAY", width / 2, 340);
  if (mouseX > 380 && mouseX < 520 && mouseY > 380 && mouseY < 450) {
    changeSize2 = 96;
  } else {
    changeSize2 = 80;
  }
  textSize(changeSize2);
  text("TUTOR", width / 2, 440);

  textSize(20);

  if (mouseIsPressed) {
    if (mouseX > 380 && mouseX < 520 && mouseY > 275 && mouseY < 345) {
      stage = 2;
    } else if (mouseX > 380 && mouseX < 520 && mouseY > 380 && mouseY < 450) {
      stage = 1;
    } else {
      stage = 0;
    }
  }
  character.show();
  character.move();
  character.upDown();
  character.jump();
}
///////////////////////level1/////////////////////////////
function level1() {
  blocks[0] = new Block(width / 2 - 50 - 65, 530, 100, 10);
  blocks[1] = new Block(width / 2 - 50 + 65, 440, 100, 10);
  blocks[2] = new Block(width / 2 - 50 - 65, 350, 100, 10);
  blocks[3] = new Block(width / 2 - 50 + 65, 260, 100, 10);
  blocks[4] = new Block(width / 2 - 50 - 65, 170, 100, 10);
  blocks[5] = new Block(width / 2 - 50 + 65, 80, 100, 10);

  if (checkColor == false) {
    background(63, 62, 160);
    for (let i = 0; i < blocks.length; i = i + 2) {
      let b = blocks[i];
      fill(227, 151, 112);
      b.show();
      character.collisions1(blocks);
      character.collisions3(blocks);
      character.collisions4(blocks);
    }
  } else if (checkColor == true) {
    background(227, 151, 112);
    for (let i = 1; i < blocks.length; i = i + 2) {
      let b = blocks[i];
      fill(63, 62, 160);
      b.show();
      character.collisions2(blocks);
      character.collisions3(blocks);
      character.collisions4(blocks);
    }
  }
  character.show();
  character.upDown();
  character.move();
  cy = 34 + map(sin(frameCount * 0.042), -1, 1, -5, 8);
  image(imgCoin, 498, cy, 30, 30);

  if (
    character.x < 498 &&
    character.x + character.r > 498 + 30 &&
    character.y < cy &&
    character.y + character.r > cy + 30
  ) {
    stage = 3;
  }
}

/////////////////////////level2////////////////////////////
function level2() {
  blocks[0] = new Block(480, 560, 100, 10);
  blocks[1] = new Block(360, 450, 100, 10);
  blocks[2] = new Block(30, 120, 100, 10);
  blocks[3] = new Block(820, 400, 100, 10);
  blocks[4] = new Block(20, 20, 10, 100);
  blocks[5] = new Block(150, 220, 100, 10);
  blocks[6] = new Block(250, 350, 100, 10);

  if (checkColor == false) {
    background(91, 125, 88);
    for (let i = 0; i < blocks.length; i = i + 2) {
      let b = blocks[i];
      fill(112, 42, 40);
      b.show();
      character.collisions1(blocks);
      character.collisions3(blocks);
      character.collisions4(blocks);
    }
  } else if (checkColor == true) {
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

  cy = 350 + map(sin(frameCount * 0.042), -1, 1, -5, 8);
  image(imgCoin, 838, cy, 30, 30);

  if (
    character.x < 838 &&
    character.x + character.r > 838 + 30 &&
    character.y < cy &&
    character.y + character.r > cy + 30
  ) {
    stage = 4;
  }
}

////////////////////////level3////////////////////////////
function level3() {
  blocks[0] = new Block(825, 550, 100, 10);
  blocks[1] = new Block(-15, 460, 100, 10);
  blocks[2] = new Block(825, 370, 100, 10);
  blocks[3] = new Block(-15, 280, 100, 10);
  blocks[4]=new Block(825,190,100,10)
  blocks[5]=new Block(605,140,140,10)
  blocks[6]=new Block(390,166,120,10)
  blocks[7]=new Block(390,250,120,10)//final block
  blocks[8]=new Block(375,176,10,50)
  blocks[9]=new Block(-100,176,10,10)
  blocks[10]=new Block(515,176,10,50)
  
  

  if (checkColor == false) {
    background(243,143,0);
    for (let i = 0; i < blocks.length; i = i + 2) {
      let b = blocks[i];
      fill(118,100,0);
      b.show();
      character.collisions1(blocks);
      character.collisions3(blocks);
      character.collisions4(blocks);
    }
  } else if (checkColor == true) {
    background(118,100,0);
    for (let i = 1; i < blocks.length; i = i + 2) {
      let b = blocks[i];
      fill(243,143,0);
      b.show();
      character.collisions2(blocks);
      character.collisions3(blocks);
      character.collisions4(blocks);
    }
  }

  character.show();
  character.upDown();
  character.move();
  
  cy = 204 + map(sin(frameCount * 0.042), -1, 1, -5, 8);
  image(imgCoin, 433, cy, 30, 30);
  
  if (
    character.x < 433 &&
    character.x + character.r > 433 + 30 &&
    character.y < cy &&
    character.y + character.r > cy + 30
  ) {
    stage = 6 ;
  }
}
/////////////////////tutor//////////////////////
function tutor() {
  blocks[0] = new Block(width/2, 530, 100, 10);
  blocks[1] = new Block(width / 2 +120, 440, 100, 10);
  blocks[2] = new Block(width / 2 +240, 350, 100, 10);
  blocks[3] = new Block(width / 2 +360 , 260, 100, 10);
 blocks[4] = new Block(-20, 170, 100, 10);
  // blocks[5] = new Block(width / 2 - 50 + 65, 80, 100, 10);

  if (checkColor == false) {
    background(245,231,198);
    for (let i = 0; i < blocks.length; i = i + 2) {
      let b = blocks[i];
      fill(158,136,109);
      b.show();
      character.collisions1(blocks);
      character.collisions3(blocks);
      character.collisions4(blocks);
    }
  } else if (checkColor == true) {
    background(158,136,109);
    for (let i = 1; i < blocks.length; i = i + 2) {
      let b = blocks[i];
      fill(245,231,198);
      b.show();
      character.collisions2(blocks);
      character.collisions3(blocks);
      character.collisions4(blocks);
    }
  }
  character.show();
  character.upDown();
  character.move();
  cy = 111 + map(sin(frameCount * 0.042), -1, 1, -5, 8);
  image(imgCoin, 26, cy, 30, 30);
  
  textAlign(CENTER)
  textFont(subFont)
  text("jump right!!!",496,457)
  text("haha~,get you~",618,370)
  text("jump right again!",830,153)
  text("No kidding!",830,173)

  if (
    character.x < 26 &&
    character.x + character.r > 26 + 30 &&
    character.y < cy &&
    character.y + character.r > cy + 30
  ) {
    stage = 6;
  }
}

/////////////////////////setting stage5//////////////////////////
function setting() {
  background(112, 42, 40);
  textAlign(CENTER);
  fill(91, 125, 88);

  textFont(mainFont);
  textSize(100);
  text("SETTINGS", width / 2, 290);

  if (mouseX > 502 && mouseX < 860 && mouseY > 544 && mouseY < 587) {
    changeSize1 = 90;
    if (mouseIsPressed) {
      stage = 0;
    }
  } else {
    changeSize1 = 80;
  }
  textFont(subFont);
  textSize(changeSize1);
  text("Main Manue", 680, 585);

  if (mouseX > 83 && mouseX < 220 && mouseY > 535 && mouseY < 585) {
    changeSize2 = 90;
    if (mouseIsPressed) {
      stageHistory.pop();
      let formerStage = stageHistory.pop(); // get former value
      stage = formerStage; // set stage to former value
    }
  } else {
    changeSize2 = 80;
  }
  textSize(changeSize2);
  text("back", 150, 585);
}
//////////////////success////////////////////
function win(){
  //stage 6
  background(63,62,106);
  textAlign(CENTER);
  fill(227,151,112)
  
  textFont(mainFont)
  textSize(70)
  text("Congratulations!",width/2,200)
  textSize(winSize)
text("main menu",187,590)
  
  
  textSize(50)
  textFont(subFont)
  text("You are really",width/2,300)
  text("skilled at ",width/2,370)
  text("keeping a balance!",width/2,440)
  
  if (mouseX>62&&mouseX<311&&mouseY>567&&mouseY<590){
    winSize=50
    if(mouseIsPressed){
      stage=0
    }
  }else{
    winSize=40
  }
  character.show();
  character.move();
  character.upDown();
  character.jump();
}
