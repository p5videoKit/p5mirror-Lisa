let x;
let y;
function setup() {
  createCanvas(400, 400);
  x=0;
  y=0;
}

function draw() {
  background(20,20,100);
//   push();
//   rectMode(CENTER);
//   translate(width/2,height/2);
//   rotate(PI/4+x);
//   x+=PI/80;
//   rect(0,0,100);
//   pop();
  
 
//   noFill();
//   push();
//   rectMode(CENTER);
//   translate(width/4,height/4);
//   rotate(PI/2+y);
//   y=y-PI/50;
//   rect(0,0,150);
//   pop();
  
  for(let a=0;a<width; a+=50){
  
  for(let b=0; b<height; b+=50){
    let d=dist(mouseX,mouseY,a,b);
    let f=map(d,0,sqrt(width**2+height**2),0.1,3); 
    fill(a,20,20) ;

  push();
  rectMode(CENTER);
  translate(a,b);
  rotate(x);
  
  rect(0,0,60*f,6*f);
  pop();

    }

  x+=PI/1400;

  }
  
  

}