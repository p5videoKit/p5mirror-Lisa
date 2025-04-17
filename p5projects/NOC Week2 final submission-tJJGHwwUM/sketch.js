//click to generate small creatures

let fly = [];
let drops=[]
let originY;
let x = 40;
let y = 20;
let Start = 0;
let inc = 0.25;
let offx = 0;

let timer = 0;
let start = false;

let extraCanvas;
let mouseIsInside;


function setup() {
  createCanvas(800, 600);
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

// function keyPressed() {
//   if (keyCode === ENTER) {
//     let fs = fullscreen();
//     fullscreen(!fs); 
//     //fullscreen(true);
//   }
// }


function draw() {
  background(0,16);
  
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
}

function mousePressed() {
  originY = mouseY;
  fly.push(new Fly(mouseX, mouseY));
}

function wave() {
  push();
  translate(0, sin(frameCount * 0.08) * 40 - 90);
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
