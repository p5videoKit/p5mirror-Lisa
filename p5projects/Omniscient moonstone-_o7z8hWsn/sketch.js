function setup() {
  createCanvas(900, 680);
}

function preload(){
  subFont = loadFont("Geo-Regular.ttf");
  mainFont = loadFont("Silkscreen-Regular.ttf");
}

function draw() {
  background(112,42,40);
  textAlign(CENTER);
  fill(91,125,88)
  
  textFont(mainFont)
  textSize(90)
  text("SETTINGS",width/2,230)
  
  if(mouseX>315&&mouseX<585&&mouseY>318&&mouseY<352){
    if(mouseIsPressed){
      stage=0
    }
  }
  textFont(subFont)
  textSize(60)
  text("Main Manue",width/2,350)
  
  text("back",width/2,440)
  
  
  
  textSize(20)
  text(mouseX, 40, 40);
  text(mouseY, 80, 40);
}