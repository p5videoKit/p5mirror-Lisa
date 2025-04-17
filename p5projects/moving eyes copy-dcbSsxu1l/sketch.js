let faces =[]
// colour of background and canvas
let backgroundColour = 220

function setup() {
  createCanvas(400, 400);
  
  for(var i = 0; i < 3 ; i++){
    for(var y = 0; y < 3 ; y++){
      faces.push(new Face(i*100 + 90, y* 100+ 90))
    }
  }
  
}

function draw() {
  background(backgroundColour);
    
  faces.forEach(face => {
    face.draw()
  })
  
}

function Face(x,y){
  this.x = x;
  this.y = y;
  this.blinkPause = random(200,300)
  this.rightEye = new Eye(this.x + 20, y ,this.blinkPause)
  this.leftEye = new Eye(this.x- 20, y,this.blinkPause)
  this.draw = function(){
    this.rightEye.draw()
    this.rightEye.blink()
    this.leftEye.draw()
    this.leftEye.blink()
    
  }
}


function Eye(x,y,binkPause){
  this.x = x;
  this.y = y;
  this.d = 30 // diameter of circle
  this.topLidY = this.y
  this.dy = 1
  this.distance = 0,
  this.angle = 0
  this.blinkPause = 0 // duration till next bink
  this.topLidYOrigin = this.y // original position before animation
  this.bottomLidY = this.y - this.d
  this.blink = function() {
    
    // decrement blink pause duration
    if(this.blinkPause > 0){
      this.blinkPause -= 1
      // return function to exit function early
      return
    }
    
      
    if(this.topLidY >= this.topLidYOrigin + this.d /2 ){
      this.blinkPause = binkPause
      this.dy = -this.dy
    }else if(this.topLidY < this.topLidYOrigin){
      this.dy = -this.dy
    }
    
    // animate eyelids
    this.topLidY += this.dy
    this.bottomLidY -= this.dy;
  },
  this.draw = function(){
    // eye ball
    noStroke()
    fill("white")
    circle(this.x,this.y, this.d)
    
    // pupil
    push();
    fill("black")
    // distance from mouse to eyeball center
    this.distance = constrain(int(dist(this.x,this.y,mouseX,mouseY)), 0, height)
    // map distance value from mouse position over eyeball radius
    this.eyePos = map(this.d /3 , 0,500,0,this.distance )
    this.angle = atan2(mouseY - this.y, mouseX - this.x);
    translate(this.x, this.y);
    rotate(this.angle);
    // circle( distance from eye center, offset from angle, circe diameter)
    circle(this.eyePos, 0, this.d / 3);
    pop();
  
    // eye lids
    fill(backgroundColour)
    // stroke("red") // for debugging
    rect(this.x - this.d/2, this.topLidY,  this.d, this.d)
    rect(this.x - this.d/2, this.bottomLidY,  this.d, this.d)
   
    // eyeliner
    noFill()
    strokeWeight(3)
    stroke("black")
    circle(this.x,this.y, this.d)
  }
}