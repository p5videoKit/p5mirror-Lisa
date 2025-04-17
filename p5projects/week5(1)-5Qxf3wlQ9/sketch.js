let head
let img1
let img2
let IMG
let colorY="#f9d470"
let colorB="#fff2d0"
let color1="#673e34"
let color2="#ac866c"
let color3="#7e6656"

function setup() {
  createCanvas(780, 700);
}

function preload(){
  head = loadImage('head.png');
  img1 = loadImage('1.png');
  img2 = loadImage('2.png');
}

function draw() {
  background(116,115,173);
strokeWeight(4)
 addBox()
  line(width-60,200+30*cos(frameCount*0.04+PI*(0.89)*3)-5,width,200+30*cos(frameCount*0.04+PI*(0.89)*3)-5)
  circle(width-60,200+30*cos(frameCount*0.04+PI*(0.89)*3)-5,40)
  //line()
}

function addBox(){
  let a=80
  //line(0,height/2+80,width,height/2+80)
  
  stroke(0)
  fill(color1)
  beginShape()
  vertex(50+a,250-a+100)
  vertex(50,250+100)
  vertex(550,250+100)
  vertex(550+a,250-a+100)
  endShape(CLOSE)//盖子
  
  fill(255)
  stroke(255)
  strokeWeight(12)
  line(90,height/2+80,90-70,height/2+80)
  stroke(0)
  line(90,height/2+80,90,height/2-45)
  line(590,height/2+80,590,height/2-45)
  
  stroke(0)
  strokeWeight(4)
  fill(color1)
  beginShape()
  vertex(50,510-70)
  vertex(50+a,510-a-70)
  vertex(50+a,510-a+100)
  vertex(50,510+100)
  endShape(CLOSE)//左边
  line(90+6,height/2+80,150,height/2+80)
  
  fill(color1)
  beginShape()
  vertex(50+a,510-a+100)
  vertex(50,510+100)
  vertex(550,510+100)
  vertex(550+a,510-a+100)
  endShape(CLOSE)//下边
  
  for (let i=0;i<9;i++){
    if(i==8){
      IMG=head
      COLOR=color1
    }else if (i-floor(i/2)*2==0){
      IMG=img1
      COLOR=color1
    }else{
    IMG=img2
    COLOR=color2  
  }  
     wheels(140+i*50,i*0.1,IMG,COLOR)
    
  }
  
  fill(color1)
  beginShape()
  vertex(550,510-70)
  vertex(550+a,510-a-70)
  vertex(550+a,510-a+100)
  vertex(550,510+100)
  endShape(CLOSE)//右边
  
  noStroke()
  fill(color1)
  beginShape()
  vertex(50+a/2,250-a/2+100)
  vertex(50,250+100)
  vertex(550,250+100)
  vertex(550+a/2,250-a/2+100)
  endShape(CLOSE)//盖子
  noStroke()
  
  stroke(0)
  noFill()
  beginShape()
  vertex(50+a,250-a+100)
  vertex(50,250+100)
  vertex(550,250+100)
  vertex(550+a,250-a+100)
  endShape(CLOSE)//盖子
  
  for (let i=0;i<9;i++){
    fill(0)
    circle(140+i*50,i*0.1+height/2-45,10)
  }
  
  strokeWeight(12)
  stroke(255)
  
  handle1=createVector(550+80/2,height/2+80)
  let length=60
  line(handle1.x+8,handle1.y,handle1.x+length,handle1.y)
  line(handle1.x+length+2.3*sinx,handle1.y+2.3*cosy,handle1.x+length,handle1.y)
  
  line(handle1.x+length+2.3*sinx,handle1.y+2.3*cosy,handle1.x+2*length+2.3*sinx,handle1.y+2.3*cosy)
  circle(handle1.x+2*length+2.3*sinx,handle1.y+2.3*cosy,20)
}

function wheels(xPos,start,img,Color){
  sinx=15*sin(frameCount*0.04+PI*start*3)
  cosy=30*cos(frameCount*0.04+PI*start*3)
  push()
  translate(xPos,height/2+80)
  line(0,-60+cosy,0,-60+cosy-150)
  image(img,-74,-320+cosy,145,145)
  
  push()
  translate(sinx,cosy)
  fill(Color)
  // noStroke()
  ellipse(0,0,60,120)
  stroke(color3)
  ellipse(0,0,30,60)
  pop()
  fill(255)
  circle(0,0,4)
  line(0,0,50,0)
  pop()
}

