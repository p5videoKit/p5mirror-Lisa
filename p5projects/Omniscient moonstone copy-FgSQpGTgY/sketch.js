let m=40
function setup() {
  createCanvas(900, 680);
}

function preload(){
  subFont = loadFont("Geo-Regular.ttf");
  mainFont = loadFont("Silkscreen-Regular.ttf");
}

function draw() {
  background(63,62,106);
  textAlign(CENTER);
  fill(227,151,112)
  
  textFont(mainFont)
  textSize(70)
  text("Congratulations!",width/2,200)
  textSize(m)
text("main menu",187,590)
  
  
  textSize(50)
  textFont(subFont)
  text("You are really",width/2,300)
  text("skilled at ",width/2,370)
  text("keeping a balance!",width/2,440)
  
  if (mouseX>62&&mouseX<311&&mouseY>567&&mouseY<590){
    m=50
    if(mouseIsPressed){
      stage=0
    }
  }else{
    m=40
  }
  
  
  
  
  
  
  
  textSize(20)
  text(mouseX, 40, 40);
  text(mouseY, 80, 40);
}