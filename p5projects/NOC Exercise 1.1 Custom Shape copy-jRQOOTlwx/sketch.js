function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  stroke(0, 0, 0);
  fill(255, 255, 255);
  //rotate(radians(frameCount))
  scale(0.5)
  beginShape();
  vertex(218,225); 
vertex(279,242); 
vertex(314,257); 
vertex(313,288); 
vertex(345,297); 
vertex(337,323); 
vertex(307,304); 
vertex(284,281); 
vertex(226,242); 
vertex(221,219); 

  // add vertices here!
  endShape(CLOSE);
}

function mousePressed() {
  console.log("vertex(" + mouseX + "," + mouseY + ");");
}

function keyPressed() {
  if (key == "s" || key == "S") {
    save("sketch.png");
  }
}
