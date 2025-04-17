//click to generate small creatures

let fly = [];
let drops=[]
let Start = 0;
let INC = 0.25;
let XOFF = 0;

// let timer = 0;
// let start = false;


function setup() {
  createCanvas(1800, 600);
}

function draw() {
  background(0);
  
  let r=random(0,100)
  if(r>70){
  drops.push(new Drop(random(-200,width+400),"#fdd417"))
  drops.push(new Drop(random(-200,width+400),"#ffffff"))
  drops.push(new Drop(random(-200,width+400),"#639e3f"))
  drops.push(new Drop(random(-200,width+400),"#6adfab"))
  }
 
  // while (drops.length > 30) {
  //   drops.splice(0, 1); // (index, howMany)
  // }
  //while?if?
    
    
  for (let i=0;i<drops.length;i++)  {
    let d=drops[i];
    if (d.lifespan>0){
      d.display()
      d.update()
      d.fallGround()
    }
  }

  wave();

  for (let i = 0; i < fly.length; i++) {
    let f = fly[i];
    fill(255);
    if (f.lifespan > 0) {
      f.display();
      f.update();
      f.around();
    }
  } 
  fill(255)
}

function mousePressed() {
  originY = mouseY;
  fly.push(new Fly(mouseX, mouseY));
}

function wave() {
  push();
  translate(0, sin(frameCount * 0.08) * 40 - 90);
  XOFF = Start;
  for (let i = 0; i < 10; i++) {
    noStroke();

    for (let x = i; x < width + 130; x = x + 10) {
      this.y =
        map(noise(XOFF * 0.7 * (i * 0.2 + 1) + i), 0, 1, -140, 90) +
        map(sin(XOFF * 0.4), -1, 1, 0, 90);
      push();
      translate(0, sin(frameCount * 0.08 + i * 0.5) * 80);
      rectMode(CENTER);
      fill("#a7c83f");
      rect(
        x,
        this.y + map(dist(x, 0, width / 2 - 100, 0), 210, 0, -10, 70),
        1,
        map(noise(XOFF + 0.5), 0, 1, 170, 150) + random(-20, 5) + 350
      );

      pop();
      XOFF += INC;
    }
  }
  Start += 0.03;
  pop(0);
}
