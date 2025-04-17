let g; // off-canvas, in the memory

function setup() {
  createCanvas(400, 400);
  
  g = createGraphics(width, height);
}

function draw() {
  background(220);
  g.background(220,100)
  
  // transformation, styles, display functions
  let x = random(width);
  let y = random(height);
  g.fill(255, 255, 0);
  g.circle(x, y, 30);
  
  g.noFill();
  g.beginShape();
  g.vertex(random(width), random(height));
  g.vertex(random(width), random(height));
  g.vertex(random(width), random(height));
  g.vertex(random(width), random(height));
  g.endShape();
  
  circle(frameCount-10, height/2, 200);
  image(g, 0, 0);
  
  circle(frameCount, height/2, 200);
  //image(g, 0, 0);
}