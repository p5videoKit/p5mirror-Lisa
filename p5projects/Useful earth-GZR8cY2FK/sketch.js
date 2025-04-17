let ui={
  height1:150,
  height2:150
}

function setup() {
  createCanvas(400, 400);
  gui=new dat.GUI()
  gui.add(ui,"height1").min(0).max(150)
  gui.add(ui,"height2").min(-100).max(150)
}

function draw() {
  background(220);
  translate(width/2,height/2)
  stroke(255)
  ellipseMode(CENTER)
  fill(0)
  ellipse(0,0,200,ui.height1)
  strokeWeight(4)
  text("CENTER",0,0,100,100)
  //point(0,0)
  
  ellipseMode(CORNER)
  fill(100)
  ellipse(0,0,200,ui.height2)
  text("CORNER",100,50,100,100)
  stroke(255,0,0)
  point(0,0)
}