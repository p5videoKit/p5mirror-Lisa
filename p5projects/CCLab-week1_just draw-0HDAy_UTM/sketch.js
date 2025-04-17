function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(229, 213, 183);

  fill(122, 194, 143);
  ellipse(20, 540, 300, 300);
  fill(122, 194, 143, 86);
  ellipse(20, 540, 380, 370);
  fill(122, 194, 143, 60);
  ellipse(20, 540, 490, 460);
  fill(122, 194, 143, 36);
  ellipse(20, 540, 650, 570);
  fill(53, 189, 92);
  ellipse(20, 540, 200, 200);

  fill(247, 132, 6);
  ellipse(500, 400, 300, 300);
  fill(247, 132, 6, 86);
  ellipse(500, 400, 380, 370);
  fill(247, 132, 6, 60);
  ellipse(500, 400, 480, 460);
  fill(247, 132, 6, 36);
  ellipse(500, 400, 630, 570);
  fill(247, 132, 6, 15);
  ellipse(500, 400, 760, 740);
  fill(247, 101, 6);
  ellipse(500, 400, 230, 230);

  noStroke();
  fill(50);
  beginShape();
  vertex(122, 0);
  vertex(122, 100);
  vertex(257, 136);
  vertex(257, 0);
  endShape(CLOSE);
  rect(400, 315, 200, 200);

  fill(0, 100, 183); //blue
  beginShape();
  vertex(122, 100);
  vertex(212, 100);
  vertex(257, 136);
  vertex(167, 136);
  endShape(CLOSE);

  fill(0, 0, 0); //daoli black
  beginShape();
  vertex(15, 0);
  vertex(15, 70);
  vertex(135, 70);
  vertex(135, 0);
  endShape(CLOSE);

  fill(232, 182, 0); //yellow daoli
  ellipse(75, 70, 120, 40);

  fill(183, 47, 42); //red circle
  ellipse(75, 120, 80, 80);

  fill(122, 194, 143);
  ellipse(20, 540, 300, 300);
  fill(122, 194, 143, 86);
  ellipse(20, 540, 380, 370);
  fill(122, 194, 143, 60);
  ellipse(20, 540, 490, 460);
  fill(122, 194, 143, 36);
  ellipse(20, 540, 650, 570);
  fill(53, 189, 92);
  ellipse(20, 540, 200, 200);

  fill(0, 0, 0);
  ellipse(75, 120, 80, 80 / 3);

  fill(0, 0, 0);
  beginShape();
  vertex(35, 500);
  vertex(35, 120);
  vertex(115, 120);
  vertex(115, 500);
  endShape(CLOSE);

  fill(50);
  beginShape();
  vertex(200, 500);
  vertex(200, 200);
  vertex(320, 200);
  vertex(320, 500);
  endShape(CLOSE);

  noStroke();
  fill(0, 0, 0);
  beginShape();
  vertex(315, 0);
  vertex(315, 120);
  vertex(485, 164);
  vertex(485, 0);
  endShape(CLOSE);
  fill(232, 182, 0); //yellow daoli
  beginShape();
  vertex(315, 120);
  vertex(370, 164);
  vertex(485, 164);
  vertex(430, 120);
  endShape(CLOSE);

  fill(232, 182, 0);
  beginShape();
  vertex(280, 428);
  vertex(160, 250);
  vertex(220, 380);
  endShape(CLOSE);
  fill(0, 100, 183);
  beginShape();
  vertex(20, 380);
  vertex(160, 250);
  vertex(220, 380);
  endShape(CLOSE);
  fill(0, 0, 0);
  beginShape();
  vertex(20, 380);
  vertex(220, 380);
  vertex(280, 428);
  vertex(280, 500);
  vertex(20, 500);
  endShape(CLOSE);

  fill(183, 47, 42); //red
  beginShape();
  vertex(290, 250);
  vertex(310, 150);
  vertex(390, 150);
  vertex(400, 250);
  endShape(CLOSE);
  fill(0, 100, 183); //blue
  beginShape();
  vertex(390, 150);
  vertex(418, 175);
  vertex(450, 290);
  vertex(400, 250);
  endShape(CLOSE);
  fill(0, 0, 0); //black
  noStroke();
  beginShape();
  vertex(290, 250);
  vertex(400, 250);
  vertex(400, 500);
  vertex(290, 500);
  endShape(CLOSE);
  beginShape();
  vertex(400, 250);
  vertex(450, 290);
  vertex(450, 500);
  vertex(400, 500);
  endShape(CLOSE);

  fill(250, 250, 250);
  rect(310, 270, 20, 20);
  rect(310, 310, 20, 20);
  rect(310, 350, 20, 20);

  rect(35, 405, 40, 40);
  rect(95, 405, 40, 40);

  fill(197, 195, 172);
  rect(320, 70, 10, 10);
  rect(335, 70, 10, 10);
  rect(350, 70, 10, 10);
  rect(365, 70, 10, 10);
  rect(380, 70, 10, 10);

  rect(195, 80, 12, 12);
  rect(180, 80, 12, 12);
  rect(195, 65, 12, 12);
  rect(195, 50, 12, 12);

  ellipse(53, 140, 15, 15);
  ellipse(53, 165, 15, 15);
}
