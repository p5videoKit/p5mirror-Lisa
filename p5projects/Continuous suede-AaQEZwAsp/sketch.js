var mainFont;
var subFont;
let changeSize1 = 80;
let changeSize2 = 80;
function setup() {
  createCanvas(900, 680);
}

function preload() {
  mainFont = loadFont("Silkscreen-Regular.ttf");
  subFont = loadFont("Geo-Regular.ttf");
}

function draw() {
  background(220);
  mainMenu();
}
function mainMenu() {
  fill(255);

  textAlign(CENTER);

  if (mouseX < width / 2 && mouseY < height / 2) {
    background(63, 62, 106); //set1-1
    fill(227, 151, 112); //set1-2
  } else if (mouseX > width / 2 && mouseY < height / 2) {
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
  text(mouseX, 20, 20);
  text(mouseY, 60, 20);
  if (mouseIsPressed) {
    if (mouseX > 380 && mouseX < 520 && mouseY > 275 && mouseY < 345) {
      stage = 1;
    } else if (mouseX > 380 && mouseX < 520 && mouseY > 380 && mouseY < 450) {
      stage = 2;
    } else {
      stage = 0;
    }
  }
}
