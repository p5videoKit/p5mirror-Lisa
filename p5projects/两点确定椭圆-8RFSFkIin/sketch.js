let C

function setup() {
  C=createCanvas(400, 400);
  C.loadPixels(0.1)
}

function draw() {
  background(220);

  let pointA = createVector(100, 300); // First point
  let pointB = createVector(300, 100); // Second point

  drawEllipseBetweenPoints(pointB, pointA);
  
}

function drawEllipseBetweenPoints(p1, p2) {
  
  let midPoint = p5.Vector.add(p1, p2).mult(0.5);
  let distance = p1.dist(p2);
  let angle = atan2(p2.y - p1.y, p2.x - p1.x);
  //ellipseMode(CENTER);
  push();
  translate(midPoint.x, midPoint.y); 
  rotate(angle); 
  ellipse(0, 0, distance, 60)
  pop(); 
}
