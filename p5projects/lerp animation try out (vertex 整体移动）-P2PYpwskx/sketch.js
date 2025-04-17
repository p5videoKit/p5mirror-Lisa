//learn from https://editor.p5js.org/MOQN/sketches/YWEUFlrbb
//key：vertex可以作为整体
//尝试在beginShape中用forloop
//

function setup() {
  createCanvas(400, 400);
  for(i=0;i<6;i++){
    circle(i*10,i*10,10)
  }
}

function draw() {
  background(220);
}