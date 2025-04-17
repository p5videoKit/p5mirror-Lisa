let drops = [];
let originY;
let x = 40;
let y = 20;
let Start = 0;
let inc = 0.25;
let offx = 0;

let timer = 0;
let start = false;

let extraCanvas;
function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(0, 16);

  wave();

  for (let i = 0; i < drops.length; i++) {
    let d = drops[i];
    fill(255);
    if (d.lifespan > 0) {
      d.display();
      d.update();
      d.fallGround();
      start = false;
    } else {
      start = true;
      timer++;
      if (timer - floor(timer / 5) * 5 == 0 && timer < 25 && start == true) {
        noFill();
        stroke(255);
        ellipse(d.pos.x, d.pos.y, x, y);

        x = x + 20;
        y = y + 5;
        //console.log(x,y)
      }
      if (timer >= 25) {
        x = 40;
        y = 20;
        timer = 0;
        start = false;
      }
    }
  }
}

function mousePressed() {
  originY = mouseY;
  drops.push(new Drop(mouseX, mouseY));
}

class Drop {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(-3, -1.5);
    this.radius = map(dist(0, originY, 0, 0), 0, 600, 2, 50);
    this.lifespan = map(dist(0, originY, 0, 0), 0, 600, 50, 140);
    this.timer = 0;
  }

  display() {
    noStroke();
    circle(this.pos.x, this.pos.y, this.radius);
  }

  update() {
    this.pos.add(this.vel);
    this.lifespan--;
  }

  fallGround() {
    let accy = createVector(0, 0.1);
    this.vel.add(accy);
  }
}

function wave() {
  push();
  translate(0, sin(frameCount * 0.08) * 40 - 100);
  xoff = Start;
  for (let i = 0; i < 10; i++) {
    noStroke();

    for (let x = i; x < width + 130; x = x + 10) {
      this.y =
        map(noise(xoff * 0.7 * (i * 0.2 + 1) + i), 0, 1, -140, 90) +
        map(sin(xoff * 0.4), -1, 1, 0, 130);

      push();
      translate(0, sin(frameCount * 0.08 + i * 0.5) * 80);
      rectMode(CENTER);
      fill("#a7c83f");
      rect(
        x,
        this.y + map(dist(x, 0, width / 2 - 100, 0), 210, 0, -10, 70),
        1,
        map(noise(xoff + 0.5), 0, 1, 170, 150) + random(-20, 5) + 350
      );

      pop();
      xoff += inc;
    }
  }
  Start += 0.03;
  pop(0);
}

// class Ripple {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//     this.lifespan = 60;
//     this.w = 40;
//     this.h = 20;
//     this.timer = 0;
//     Start=false
//     //this.ripples=Ddone
//   }
//   display() {
//     noFill();
//     stroke(255);
//     if (Start) {
//     this.timer++;
//     if (this.timer - floor(this.timer / 5) * 5 == 0 && this.timer < 30) {
//       ellipse(this.x, this.y, this.w, this.w);
//       this.w = this.w + 20;
//       this.w = this.w + 5;
//     } if (this.timer>30){ //only when timer is larger than 30, start becomes false
//       Start=false
//       this.timer=0
//       this.w=40
//       this.h=20
//     }
//   }
//   }
// }
