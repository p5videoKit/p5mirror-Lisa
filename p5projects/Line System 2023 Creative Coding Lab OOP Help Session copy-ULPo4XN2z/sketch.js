let systems =[];
function setup() {
  createCanvas(600, 600);

 }

function mouseClicked(){
  let s = new System(mouseX,mouseY);
  systems.push(s);
  s.generate();
  console.log(systems.length);
}

function draw() {
  background(220);
  
  if(systems.length == 0){
    textSize(30);
    text("click", width/2,height/2);
  }



  for (let i = 0; i < systems.length; i++) {
    let s = systems[i];
    s.display();
  }
    
}

class Particle {
  constructor(speed,x,y) {
    //speed 0.01;
    this.posX = 0;
    this.posY = 0;
    this.posX2 = x;
    this.posY2 = y;
    this.speed = speed;
    this.offset = random() * 1;
  }
  update() {
   
    this.posX = noise(10+this.offset +frameCount * this.speed) * width ;
    this.posY =
      noise(this.offset + frameCount * this.speed) * height ;
    
    // this.posX = (sin(this.offset +frameCount * this.speed) +1)*width/2 ;
    // this.posY =
    //   (cos(this.offset + frameCount * this.speed) +1)*height/2;
  }

  display() {
    line(this.posX, this.posY, this.posX2, this.posY2);
  }
}

class System {
  constructor(posX, posY) {
    this.posX = posX;
    this.posY = posY;
    this.particleArray = [];
  }
  generate() {
    for (let i = 0; i < 10; i++) {
      let p = new Particle(0.01, this.posX,this.posY);
      this.particleArray.push(p);
    }
  }

  display() {
    for (let i = 0; i < this.particleArray.length; i++) {
      let p = this.particleArray[i];
      p.update();
      p.display();
    }
  }
}
