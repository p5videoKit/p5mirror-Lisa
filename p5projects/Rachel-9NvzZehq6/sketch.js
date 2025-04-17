function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  fill(255, 0, 0);
  stroke(255, 0, 0);
  
  arc(50, 55, 80, 80,PI, 0)
  arc(130,55,80,80,PI,0)
  beginShape()
  vertex(10,55)
  vertex(90,125)
  vertex(170,55)
  endShape(CLOSE) //从arc到这这一坨都是，因为不是一个整体所以一起动会很困难，如果要画整体我明天给你sketch，主要是我一直没弄懂p5里面弧线怎么画呜呜
  
}