// make an empty array
let bugs = [];
let numBugs = 40;

function setup() {
  createCanvas(400, 400);
  

}

function draw() {
  background(220, 30);
  
  // loop through all the bugs backwards
  // looping backwards lets us see older particles on top
  for(let i = bugs.length -1; i>= 0; i--){
   	bugs[i].move();
    bugs[i].show();
    bugs[i].shrink();
    
    if(bugs[i].radius <= 0 ){
      //remove the dead ones
      bugs.splice(i, 1);
    }
    
  }
  
  // make more fire!!!
    let x = 200;
    let y = 300;
    let radius = random(10,20);
    let b = new Bug(x, y, radius);
    bugs.push(b);
}

class Bug{
  constructor(tempX, tempY, tempR) {
    this.x = tempX;
    this.y = tempY;
    this.radius = tempR;
    
    // pick a random color
    this.color = color(255);
    let r = random(3);
    if(r < 1){
      this.color = color(255,100,20,50); // orange
    } else if(r >= 1 && r < 2 ){
      this.color = color(255, 200, 10, 50); // yellow
    } else if(r >= 2 ){
      this.color = color(255, 80, 5, 50); // reddish
    }
    
  }

  show() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.radius);
  }

  move() {
    this.x += random(-5, 5);
    this.y -= random(1, 2);
  }
  
  shrink(){    
   // shrink size over time
   this.radius-=0.4;
  }
  
  

}