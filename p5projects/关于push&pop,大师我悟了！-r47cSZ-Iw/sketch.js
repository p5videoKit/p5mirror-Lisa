//2=3

let timer = 0;
let y;
function setup() {
  createCanvas(550, 550);
  background(40);
}

function draw() {
  //background(220);
  timer++;
  //push(); //1  omg我又懂了，就是他也是在上一次的基础上translate
  //for (i = 0; i < 25; i = i + 1) {
    push() //3
    if (timer < 26) {
      y = timer - 1;
      //push(); //2
      translate(55 + 110 * (y - floor(y / 5) * 5), 55 + floor(y / 5) * 110);
      stroke(103, 206, 220);
      noFill();
      pattern();
      circle(10, 10, 10);
      //pop(); //2
    //}
    pop() //3
  }
  //pop(); //1
}

function pattern() {
  //push() //4
  for (d = 0; d < 6; d++) {
    push() //5
    rotate((d * PI) / 3);
    //fill(40 * d);
    circle(10, 10, 10);
    
   //text(d,20+3*d,20+3*d)
    //console.log(d)
    pop() //5
  }
  //pop() //4.   /////好的这里我懂了，因为会在上一次的基础上成倍的rotate，因为forloop会走完再进行loop之外的code
}
