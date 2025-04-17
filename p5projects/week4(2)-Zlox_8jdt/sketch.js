let particles = [];
let rains=[]

let P1 = "#7c6d9b";
let P2 = "#565f8e";
let Y1 = "#fdd817";
let Y2 = "#896356";
let O = [145, 100];
let O1 = "#828282"; //"#bfbfbf"
let O2 = "#4d4d4d";
let counter = 0;

let Px = 230;
let Py = 160;

function setup() {
  createCanvas(900, 700);
  background(0);

  particles.push(new Particle(Px, Py, 50));
  particles.push(new Particle(2450, height + 2500, 50)); //2350,height+2500,50
  particles[0].mass = 20;
  particles[1].mass = 20;
}

function draw() {
  background(31, 41, 46);
  textSize(130);
  fill(185, 182, 175);
  if (particles[0].pos.y > height + 1050) {
    text("theEnd ;D", width / 2 - 400, height / 2);
  } else {
    fill(185, 182, 175);
    for (let i = 0; i < 10; i++) {
      rect(100, -10 + 80 * i, 580, 40);
    }
  }
  particles[0].stayAlone();

  // particles[1].target.x=Px
  // particles[1].target.y=Py
  


  if (random(1) > 0.96) {
    
    particles.push(new Particle(random(85, 695), random(-60, -90), 50));
  }
  
  
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];

    p.checkCollision(particles);
    p.update();
    //p.bounce();
    p.attract();
    p.display();
    p.checkBoundary();
    if (i == 1) {
      p.checkPurple();
      p.stayAlone();
    }

    if (p.isDone) {
      particles.splice(i, 1);
    }
  }
  
  rains.push(new Rain(random(-60,-50),random(height)))
  rains.push(new Rain(random(width+10,width+60),random(height)))
  rains.push(new Rain(random(width),random(-60,-20)))
  rains.push(new Rain(random(width),random(height+20,height+60)))
  for (let i = 0; i < rains.length; i++){
    let r=rains[i]
    r.goDown()
    r.display()
    r.update()
    
    if(dist(r.pos.x,r.pos.y,width/2,height/2)<150){
      rains.splice(i,1)
    }
    if(dist(r.pos.x,r.pos.y,width/2,height/2)<200){
      rains.splice(i,1)
    }
    if(dist(r.pos.x,r.pos.y,width/2,height/2)<180){
      rains.splice(i,1)
    }
    if(dist(r.pos.x,r.pos.y,width/2,height/2)<200){
      rains.splice(i,1)
    }
  }
}

