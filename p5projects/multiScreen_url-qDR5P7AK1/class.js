class Fly {
  constructor(x, y) {
    this.pos=createVector(x,y)
    this.vel=createVector(random(-2,5),0)
    this.lifespan=random(50,80)
  }
  display() {
    
    
    push()
    //stroke("#cce3be")
    stroke(flyColor)
    translate(this.pos.x,this.pos.y)
    push()
    strokeWeight(4)
    rotate(map(sin(frameCount*0.8),-1,1,-PI/6-0.5,PI/6+0.5))
    line(0,0,15,0)
    pop()
    push()
    strokeWeight(2)
    rotate(map(sin(frameCount*0.8),-1,1,7*PI/6+0.5,5*PI/6-0.5))
    line(0,0,15,0)
    pop()
    pop()
  }

  update() {
    this.pos.add(this.vel);
    this.lifespan--;

  }

  around() {
    let accy = createVector(random(-0.05,-0.2),sin(frameCount*0.2)*0.7);
    this.vel.add(accy);
}
}


class Drop {
  constructor(x,Color) {
    this.pos=createVector(x,20)
    this.vel=createVector(0,0)
   this.lifespan=random(5,90)
    this.Color=Color
  }
  display() {
    //for(let i=0;i<7;i++){
    fill(this.Color)
    rect(this.pos.x,this.pos.y,3,30) 
    //console.log(i)
    //}
  }
  update() {
    this.pos.add(this.vel);
    this.lifespan--;
  }

  fallGround() {
    let accy = createVector(0,0.2);
    this.vel.add(accy);
}
}
