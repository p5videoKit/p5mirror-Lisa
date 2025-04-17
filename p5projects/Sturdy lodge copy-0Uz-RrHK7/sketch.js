
let game=[]
function setup() {
  createCanvas(500, 500);
  //game=new Game();
  game[0]= new Game(250,350,100,30)
  game[1]= new Game(350,250,100,30)
  
}

function draw() {
  background(220);
  
  
  strokeWeight(4)
  line(0,height-100,width,height-100)
  for (let i = 0; i < game.length; i++) {
    let g = game[i];
  g.show()
  g.upDown()
  g.move()
  g.collisions()
    


}}

function keyPressed(){
  for (let i = 0; i < game.length; i++){
    let g = game[i];
  if (key==' ') {
    g.jump()
  }}
}



class Game {
  constructor(bx,by,bw,bh){
    this.r=60
    this.x=width*0.3
    this.y=height*0.8-this.r
    this.bx=bx
    this.by=by
    this.bw=bw
    this.bh=bh
    this.vy=0
    this.gravity=2
    this.minHeight=height-100-this.r
    //this.isJumping=false
  }
  
  jump() {
    if (this.y>this.minHeight-100){
    this.vy=-20
      
    this.isJumping=true}else{
      this.isJumping=false
    } 
  }
  upDown(){
    this.y += this.vy
    this.vy+= this.gravity;
    this.y=constrain(this.y,0,this.minHeight)
  }
  
  move(){
    if(keyIsPressed===true && keyCode===LEFT_ARROW){
    this.x=this.x-5//move left
  }else if(keyIsPressed===true && keyCode===RIGHT_ARROW){
    this.x=this.x+5//move right
  }
  }
  collisions(){ 
    if(this.x>this.bx-this.r&&this.x<this.bx+this.bw&&this.y<=this.by-this.r){
      this.minHeight=this.by-this.r
      }else{
        this.minHeight=height-100-this.r
      }
  }
  show(){
    rect(this.x,this.y,this.r,this.r)
    rect(this.bx,this.by,this.bw,this.bh)
  }
  
}
