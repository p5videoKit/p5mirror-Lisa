//但这里怎么按照原轨迹绕的圈？？？coding train是换着位置绕
balls = [];
posSun = 0;

function setup() {
  createCanvas(600, 600);
  posSun = createVector(300, 300);
}

function draw() {
  background(0, 10);
  push();
  noStroke();
  circle(width / 2, height / 2, 50);
  pop();
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    let force = p5.Vector.sub(posSun, b.p);//吸引力/向心力的方向//那为什么是个椭圆-因为加速度
    let intensity = 0.0003;
    b.acc = force.mult(intensity);//？force还没学
    b.hp -= 0.2;
    b.update();
    if (b.hp < 0) {
      balls.splice(i, 1);
    }
  }
}

class Ball {
  constructor(x, y, na, nb) {
    this.p = createVector(x, y);
    this.vel = createVector(na, nb);//懂了，xy一样，最先向右下移动
    this.acc = createVector(0, 0);//椭圆？
    this.hp = 255; //lifespan
  }
  update() {
    this.vel.add(this.acc);
    this.p.add(this.vel);
    push();
    noStroke();
    fill(240, 237, 207, this.hp);
    circle(this.p.x, this.p.y, 20);
    pop();
  }
}

function mousePressed() {
  let angle = random();
  let va = cos(angle);
  let vb = -2*cos(angle);//只是初速度的方向
  let intensity = random(1.5, 4);
  balls.push(new Ball(mouseX, mouseY, va , vb ));
}
