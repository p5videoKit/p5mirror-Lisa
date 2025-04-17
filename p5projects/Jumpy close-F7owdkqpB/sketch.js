//p5.play
var stage=0

var p1X=400
var p1Y=375
var pWidth=30
var pHeight=70

var b1X=200
var b1Y=300
var bWidth=200
var bHeight=40

var jump=false
var direction=1
var v=2
var jumpHeight=10
var fallingSpeed=2 //equal to v
var minHeight=375

function setup() {
  createCanvas(800, 500);
  rectMode(CENTER)
  textAlign(CENTER)
}

function draw() {
  keyPressed()//loop for smooth
  if(stage==0){
    game();
  }
  letJump()
  gravity()
}

function game(){
  //appearance of the game
  background(150,230,240);
  //grass
  noStroke()
  fill(100,200,75)
  rect(width/2,450,width,100)
  
  //window frame
  noFill()
  stroke(0)
  strokeWeight(15)
  rect(width/2,height/2,width,height)
  
  //draw box
  stroke(0)
  strokeWeight(5)
  fill(255,120,0)
  rect(b1X,b1Y,bWidth,bHeight)
  
  //draw player
  stroke(0)
  fill(150,0,170)
  rect(p1X,p1Y,pWidth,pHeight);
}

function keyPressed(){
  if(keyIsPressed===true && keyCode===LEFT_ARROW){
    p1X=p1X-5//move left
  }else if(keyIsPressed===true && keyCode===RIGHT_ARROW){
    p1X=p1X+5//move right
  }
}

function letJump(){
  if(keyIsPressed===true && keyCode===' '){
    jump=true
  }else{
    jump=false
  }
}

function gravity(){
  p1Y=p1Y+diection*v
  
}

  
