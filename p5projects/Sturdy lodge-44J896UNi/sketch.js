let character;
let block=[]
function setup() {
  createCanvas(500, 500);
  character=new Character();
}

function draw() {
  background(220);
  
  character.show()
  character.move()
  strokeWeight(4)
  line(0,height-100,width,height-100)
  
  if (random(1)<0.005){
    block.push(new Block())
  }
  for (let b of block){
    b.move()
    b.show()
  }

}

function keyPressed(){
  if (key==' ') {
    character.jump()
  }
}

class Character {
  constructor(){
    this.r=60
    this.x=width*0.3
    this.y=height*0.8-this.r
    this.vy=0
    this.gravity=2
  }
  
  jump() {
    if (this.y>height-this.r-100-100){
    this.vy=-20}
  }
  
  move() {
    this.y += this.vy
    this.vy+= this.gravity;
    this.y=constrain(this.y,0,height-100-this.r)
  }
  
  show(){
    rect(this.x,this.y,this.r,this.r)
  }
  
}

class Block{
  constructor(){
    this.r=60
    this.x=width
    this.y=random([280,350])
  }
  
  move(){
    this.x-=10
  }
  show(){
    rect(this.x,this.y,this.r,30)
  }
  
}