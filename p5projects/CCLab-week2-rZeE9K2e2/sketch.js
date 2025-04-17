// click to start!
// press 'c' to get a cute cat!
// press 'd' to get a cute dog!
// press 'd' to get a cute dog!
// press 's' to get away the color
// press 'w' to make the color more obvious
// press enter to clear the canvas!!!

let R;
let B;
let cat
let dog;
let hamster;

function preload() {
  cat = loadImage("cat.png");
  dog = loadImage("dog.png");
  hamster = loadImage("hamster.png");
}//customize the brush's shape

function setup() {
  createCanvas(600, 600);
  background(0, 0, 0);
  imageMode(CENTER);
  colorMode(HSB);
  B = 20;
}//create. the canvas

function draw() {
  R = random(0, 255);
  if (mouseIsPressed) {
    if (key == "c") {
      tint(R, B, 160);
      image(cat, mouseX, mouseY, mouseY * 1.3, mouseX * 1.3);

    } else if (key == "d") {
      tint(R, B, 200);
      image(dog, mouseX, mouseY, mouseY * 1.3, mouseX * 1.3);
    } else if (key == "h") {
      tint(R, B, 160);
      image(hamster, mouseX, mouseY, mouseY * 1.3, mouseX * 1.3);
    }
  }
  
  if (keyCode == ENTER) {
    background(0, 0, 0);
  }
  
  if (key == "w") {
    B = B + 20;
  }
  if (key == "s") {
    B = B - 20;
  }
}
