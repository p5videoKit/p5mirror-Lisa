function setup() {
  createCanvas(600, 700);

  background(255, 0, 50);

  // strokeWeight(4)
  //ellipse(40,20,40,20)
  stroke(50, 50, 205);
}

function draw() {
  fill(210, 170, 110);
  strokeWeight(0);
  ellipse(300, 350, 360, 400);
  strokeWeight(3);

  fill(70, 150, 130);
  circle(205, 335, 20);
  //strokeWeight(4)
  circle(325, 335, 24);
  fill(0);
  circle(205, 335, 2);
  circle(325, 335, 3);
  strokeWeight(0);
  fill(230, 50, 30);
  ellipse(190, 375, 40, 35);
  ellipse(333, 380, 60, 50);
  ellipse(243, 455, 60, 30);
  //bangs
  //  noFill();
  //strokeWeight(1);
  //ellipse(270, 300, 200, 300);
  noFill();
  strokeWeight(10);
  arc(270, 300, 200, 300, PI * 0.9, PI * 1.5);

  noFill();
  

  strokeWeight(10);
  arc(260, 400, 200, 260, PI * 0.5, PI * 1.2);
  beginShape();
  curveVertex(200, 400);
  curveVertex(210, 450);
  curveVertex(230, 466);
  curveVertex(300, 455);
  curveVertex(320, 439);
  curveVertex(400, 400);
  //noFill();
  curve(500, 0, 450, 400, 280, 150, 400, 900);

  strokeWeight(10);
  beginShape();
  curveVertex(270, 500);
  curveVertex(260, 530);
  curveVertex(350, 520);
  curveVertex(400, 480);
  curveVertex(430, 420);
  curveVertex(450, 300);
  endShape();

  beginShape();
  curveVertex(270, 300);
  curveVertex(270, 150);
  curveVertex(300, 125);
  //curveVertex(400,130);
  curveVertex(450, 170);
  curveVertex(463, 470);
  curveVertex(483, 570);
  curveVertex(490, 700);
  endShape();
  //eye lids
  //strokeWeight(6)
  beginShape();
  curveVertex(170, 390);
  curveVertex(180, 330);
  curveVertex(230, 330);
  //curveVertex(400,130);
  curveVertex(270, 390);
  endShape();
  //brow
  curve(250, 420, 280, 310, 380, 310, 400, 300);
  //strokeWidth(8)
  beginShape();
  curveVertex(270, 440);
  curveVertex(292, 334);
  curveVertex(360, 332);
  //curveVertex(400,130);
  curveVertex(400, 390);
  endShape();

  beginShape();
  curveVertex(260, 160);
  curveVertex(260, 150);
  curveVertex(200, 170);
  //curveVertex(400,130);
  curveVertex(150, 270);
  curveVertex(145, 470);
  curveVertex(115, 570);
  curveVertex(100, 700);
  endShape();

  line(250, 140, 260, 150);

  //noFill();
  //curve(700, 0,
  //    100, 400,
  //  300, 170,
  // 400, 400
  //  )  ;
  noFill();
  strokeWeight(10);
  beginShape();
  vertex(170, 300);
  vertex(225, 310);
  vertex(236, 325);
  vertex(212, 400);
  vertex(212, 400);
  endShape();

  beginShape();

  curveVertex(236, 325);
  curveVertex(212, 400);
  curveVertex(260, 410);
  curveVertex(270, 399);
  curveVertex(248, 400);
  //vertex(mouseX,mouseY);
  endShape();
  //lip
  beginShape();
  curveVertex(190, 455);
  curveVertex(210, 445);
  curveVertex(220, 440);
  curveVertex(240, 445);
  curveVertex(260, 440);
  curveVertex(302, 444);
  curveVertex(300, 400);
  endShape();

  ellipse(245, 500, 40, 35);
  strokeWeight(5);
  line(200, 345, 198, 352);
  line(193, 342, 187, 346);
  strokeWeight(7);
  line(340, 326, 345, 315);
  line(350, 326, 359, 318);
  //stroke(255)
  // HIGHLIGHTS (MAKE THESE WHITE)
  noStroke();
  fill(255);
  circle(209, 332, 3);
  circle(329, 332, 4);
  ellipse(190, 360, 10, 7);
  ellipse(350, 360, 15, 10);
  ellipse(242, 360, 10, 15);
  ellipse(234, 400, 10, 5);
  ellipse(255, 453, 15, 10);
  stroke(50, 50, 205);
  //line(193,342,187,346)
  //ATTEMPT AT A BOTTOM LIP

  //endShape();
  //beginShape();
  //curveVertex(300,350);
  //curveVertex(250,400);
  //curveVertex(350,400);
  //endShape(CLOSE);
}
