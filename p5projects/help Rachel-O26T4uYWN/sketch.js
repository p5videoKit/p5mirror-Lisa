let aliens=[];
let bullets=[];


//player
var p1X=300;//p1 stands for player
var p1Y=460;
var pWidth=200;
var pHeight=120;
var pSpeed=6;

//rockets
var r1X=50;//r1 stands for rocket 1
var r1Y=200;
var r1Position=0;//keep track of where the rocket currently is
var r2X=300;//r2 stands for rocket 2
var r2Y=200;
var r2Position=0;
var r3X=550;//r3 stands for rocket 3
var r3Y=200;
var r3Position=0;
var rWidth=120;
var rHeight=200;
var rSpeed=5;
var fire=false;//am I firing the rocket?


//alliens

//row1
var a1X=50;
var a1Y=150;
var a2X=300;
var a2Y=150;
var a3X=550;
var a3Y=150;
var aWidth=200;
var aHeight=200;

//counters
var life=3;
var stage=2;
var s=25;
var m=25;
var mouseIsPressed=false
//assets
var pressToStart;
var playerBullet;
var alienBullet;
var player;
var alien;
var pew;
var boom;
var winSound;
var startSound;


function preload(){
  playerBullet=loadImage("assets/Bullet(1).png");
  alienBullet=loadImage("assets/Bullet(2).png");
  player=loadImage("assets/Player.png");
  alien=loadImage("assets/Alien.png");
  pew=loadSound("assets/F2(1).mp3");
  boom=loadSound("assets/boom.wav");
  pressToStart=loadFont("assets/BrunoAceSC-Regular.ttf")
}

function setup() {
  createCanvas(600, 500);
  
  //set modes
  rectMode(CENTER);
  textAlign(CENTER);
  imageMode(CENTER);
}///close setup

function draw(){
  if(stage==0){
    splash();
  }
  
  if(stage==1){
    game();
  }
  
  if(stage==2){
     win();
     }
}///close draw

function splash(){
  background(0);//black
  
  //appearance of the world
  stroke(0,255,0);//green
  noFill();
  strokeWeight(3);
  rect(width/2,height/2,width,height);
  noStroke();
  fill(0,255,0);//green
  rect(width/2,25,width,50);//banner
  
  //splash text
  push();
  textFont(pressToStart);
  textSize(20)
  text("Press to Start",300,335)
  noStroke();
  noFill();
  stroke(255);
  strokeWeight(4);
  line(180,300,180,370);
  line(420,300,420,370);
  line(180,370,215,390);
  line(420,300,385,280);
  line(215,390,390,390);
  line(385,280,210,280);
  strokeWeight(0.7);
  line(215,380,390,380);
  line(430,300,430,370);
  
  if(mouseX>=190 && mouseX<=410 && mouseY>=320 && mouseY<=345){
  textFont(pressToStart);
  textSize(23)
  text("Press to Start",300,335)
  }
  
  if(mouseIsPressed==true){
    stage=1;
  }
  pop();
}///close splash

function win(){
  background(0);//black
  
  //appearance of the world
  stroke(0,255,0);//green
  noFill();
  strokeWeight(3);
  rect(width/2,height/2,width,height);
  noStroke();
  fill(0,255,0);//green
  rect(width/2,25,width,50);//banner
  
  
  noFill();
  stroke(0,255,0);
  rect(300,200,100,60);
  rect(300,300,100,60)
  textFont(pressToStart);
  noStroke()
  fill(0,255,0);
  // textSize(s)
  // text("You win ?",300,200);
  // textSize(m)
  // text("You lose ?",300,300);
  if(mouseX>=250 && mouseX<=350 && mouseY>=170 && mouseY<=230){
    fill(0,255,0)
    rect(300,200,100,60);
    
    fill(255,255,255);
    s = 50;
     }
  else{
    s=25
    fill(0,255,0)
  }
  textSize(s)
  text("You win ?",300,200);

  if(mouseX>=250 && mouseX<=350 && mouseY>=270 && mouseY<=330){
    fill(0,255,0)
    rect(300,300,100,60);
    fill(255)
    m = 50
    
    
    
     }
  else{
    m=25
    fill(0,255,0)
  }
  
  textSize(m)
  text("You lose ?",300,300);
  
  
  
  //draw player
  noStroke();
}///close win

function game() {
  //call looping functions;
  keyPressed();
  keyTyped();

  background(0);//black
  
  //appearance of the world
  stroke(0,255,0);//green
  noFill();
  strokeWeight(3);
  rect(width/2,height/2,width,height);
  noStroke();
  fill(0,255,0);//green
  rect(width/2,25,width,50);//banner
  
  //draw player
  noStroke();
  fill(0,0,255);//blue
  image(player,p1X,p1Y,pWidth,pHeight);
  
   //run rocket function
  rockets();
  
  //draw allien
  noStroke();
  fill(255);
  image(alien,a1X,a1Y,aWidth,aHeight);
  image(alien,a2X,a2Y,aWidth,aHeight);
  image(alien,a3X,a3Y,aWidth,aHeight);
   //run rocket function
  //rockets();
  
  //collision between rocket and alien;
  if(r1X>=p1X-pWidth/2+60 && r1X<=p1X+pWidth/2-60 && r1Y>=p1Y-pHeight/2+70 && r1Y<=p1Y+pHeight/2){
     //collision between rocket and player
    //add points
    //p1X=-1000;// send player off screen
    r1Position = 2;//send rocket back to alien
    boom.play();
    life-=1;
     }//close hit player
  
  if(r2X>=p1X-pWidth/2+60 && r2X<=p1X+pWidth/2-60 && r2Y>=p1Y-pHeight/2+70 && r2Y<=p1Y+pHeight/2){
     //collision between rocket and player
    //add points
    //p1X=-1000;// send player off screen
    r2Position = 2;//send rocket back to alien
    boom.play();
    life-=1;
     }//close hit player
  
   if(r3X>=p1X-pWidth/2+60 && r3X<=p1X+pWidth/2-60 && r3Y>=p1Y-pHeight/2+70 && r3Y<=p1Y+pHeight/2){
     //collision between rocket and player
    //add points
    //p1X=-1000;
    r3Position = 2;//send rocket back to alien
    boom.play();
    life-=1;
     }//close hit player
  
  if(life<=0){
    p1X=-1000;
    stage=2
  }
  
  //status bar
  fill(255);
  textSize(20);
  text('Life:',50,35);
  text(life,100,35)
  
  
}///close game

function rockets(){
//rocket position
  //0=with player 1 ready to be fired
  //1=in motion after firing
  //2=collision with object, return to 1
  
//draw rockets
  //fill(26,175,255);//light blue
  image(playerBullet,r1X-10,r1Y-30,rWidth,rHeight);
  image(playerBullet,r2X-10,r2Y-30,rWidth,rHeight);
  image(playerBullet,r3X-10,r3Y-30,rWidth,rHeight);
//keep track and fire rocket
  if(fire==true && r1Position==0){
     r1Position = 1;
  }//close fire  
  else{
   r1Position != 1;
  }
  
  //fire rockets code
  if(r1Position ==1){
     r1X=r1X;//stop following p1
     r1Y=r1Y+rSpeed;// move vertically
    
  //if exceeds the window or misses
    if(r1Y>=500){
       r1Position = 2//reload
       }//close exceed so send back
     }//close fire
 
  
  else{
  // when you are not firing the rocket should be with p1
    r1X=a1X;
    r1Y=a1Y;
  }// close else not fire
  
//reload on #2 command
  if(r1Position==2){
    r1X=a1X;
    r1Y = a1Y;
    r1Position=0;//reset so you can fire again
     }//return home on 2
  
  if(fire==true && r2Position==0){
     r2Position = 1;
  }//close fire  
  else{
   r2Position != 1;
  }
  
  //fire rockets code
  if(r2Position ==1){
     r2X=r2X;//stop following p1
     r2Y=r2Y+rSpeed;// move vertically
    
  //if exceeds the window or misses
    if(r2Y>=500){
       r2Position = 2//reload
       }//close exceed so send back
     }//close fire
 
  
  else{
  // when you are not firing the rocket should be with p1
    r2X=a2X;
    r2Y=a2Y;
  }// close else not fire
  
//reload on #2 command
  if(r2Position==2){
    r2X=a1X;
    r2Y = a2Y;
    r2Position=0;//reset so you can fire again
     }//return home on 2
  
  if(fire==true && r3Position==0){
     r3Position = 1;
  }//close fire  
  else{
   r3Position != 1;
  }
  
  //fire rockets code
  if(r3Position ==1){
     r3X=r3X;//stop following p1
     r3Y=r3Y+rSpeed;// move vertically
    
  //if exceeds the window or misses
    if(r3Y>=500){
       r3Position = 2//reload
       }//close exceed so send back
     }//close fire
 
  
  else{
  // when you are not firing the rocket should be with p1
    r3X=a3X;
    r3Y=a3Y;
  }// close else not fire
  
//reload on #2 command
  if(r3Position==2){
    r3X=a3X;
    r3Y = a3Y;
    r3Position=0;//reset so you can fire again
     }//return home on 2
}///close rockets


function keyPressed(){
  if(keyCode == LEFT_ARROW && keyIsPressed && p1X>45){
     p1X-=pSpeed;
     }//close LEFT_ARROW
  
   if(keyCode == RIGHT_ARROW && keyIsPressed &&p1X<585){
     p1X+=pSpeed;
     }//close RIGHT_ARROW
  
  //if(keyCode==UP_ARROW && keyIsPressed && p1Y>100){
    //p1Y-=pSpeed;
  //}
  
  //if(keyCode==DOWN_ARROW && keyIsPressed && p1Y<460){
    //p1Y+=pSpeed;
  //}
}///close keyPressed

function keyTyped() {
  if (key == 'f' && keyIsPressed){
     fire = true;//fire rocket on key press
    pew.play();
     }//close s
  else{
    fire = false;
  }//close else not f
  
}///close keytyped



//class Alien {
  //constructor(x,y){
   // this.x=x;
    //this.y=y;
 // }
//}





