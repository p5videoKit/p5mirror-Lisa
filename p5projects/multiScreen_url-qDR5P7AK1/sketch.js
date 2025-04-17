//learn how to get url parameters from https://editor.p5js.org/jht9629-nyu/sketches/I9vT_uniR
// github
//https://lisa-huangzijin.github.io/ims-2025-Lisa/week3/

let fly = [];
let flyColor = 'white';
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
let mouseIsInside;

const CAM_WIDTH = 640;
const CAM_HEIGHT = 480;
const RESOLUTION = 40;

function setup() {
  createCanvas(windowWidth, windowHeight);
  setupMoveNet();
  
  let urlParams = get_url_params();
  //console.log(urlParams);//{ c: 'blue' }
  if (urlParams && urlParams.c) {
    flyColor = urlParams.c;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (keyCode === ENTER) {
    let fs = fullscreen();
    fullscreen(!fs);
    //fullscreen(true);
  }
}

function draw() {
  background(0, 16);

  updateMoveNet();
  mouseIsInside = pose.rightEye.score > 0.5;
  console.log(fly.length);

  let x = map(pose.rightEye.x, 0, CAM_WIDTH, 0, windowWidth);
  let y = map(pose.rightEye.y, 0, CAM_HEIGHT, 0, windowHeight);

  if (mouseIsInside) {
    if (fly.length < 2) {
      fly.push(new Fly(x, y));
    }
  }

  let r = random(0, 100);
  if (r > 70) {
    drops.push(new Drop(random(-200, width + 400), "#fdd417"));
    drops.push(new Drop(random(-200, width + 400), "#ffffff"));
    drops.push(new Drop(random(-200, width + 400), "#639e3f"));
    drops.push(new Drop(random(-200, width + 400), "#6adfab"));
  }

  // while (drops.length > 30) {
  //   drops.splice(0, 1); // (index, howMany)
  // }
  //while?if?

  for (let i = 0; i < drops.length; i++) {
    let d = drops[i];
    if (d.lifespan > 0) {
      d.display();
      d.update();
      d.fallGround();
    }
  }

  wave();


  for (let i = 0; i < fly.length; i++) {
    let f = fly[i];
    //fill(255);
    if (f.lifespan > 0) {
      f.display();
      f.update();
      f.around();
    }else{
      fly.splice(i, 1);
    }
  } 
  
}

// function mousePressed() {
//   originY = mouseY;
//   fly.push(new Fly(mouseX, mouseY));
// }

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

function get_url_params() {
  let query = window.location.search;
  if (query.length < 1) return null;
  const urlParams = new URLSearchParams(query);
  const params = Object.fromEntries(urlParams);
  return params;
}
