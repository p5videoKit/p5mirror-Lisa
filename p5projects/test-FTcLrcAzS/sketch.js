let timer=0
let y
function setup() {
  createCanvas(550, 550);
  background(0);
}

function draw() {
  
  timer++
  for (i = 0; i < 25; i=i+2) {
    if (timer < 26) {
      y = timer - 1;
      push();
      translate(55 + 110 * (y - floor(y / 5) * 5), 55 + floor(y / 5) * 110);
      stroke(103,206,220)
      noFill()
      pattern()
      circle(10,10,10)
      pop();
    }
  }
}

function pattern(){
  
  for(d=0;d<6;d++){
  push()
    rotate(d*PI/3)
    circle(10,10,10)
    //console.log("text")
   pop() 
  }
 
}