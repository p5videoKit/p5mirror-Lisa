function updateLRPos() {
  right[1].pos = createVector(419.7, 130.7);
  right[2].pos = createVector(9, 409.6, 173.1);
  right[3].pos = createVector(400.9, 215.6);
  right[4].pos = createVector(393.8, 258.2);
  right[5].pos = createVector(388.2, 300.8);
  right[6].pos = createVector(5, 384.2, 343.4);
  right[7].pos = createVector(381.7, 386.0);
  right[8].pos = createVector(380.9, 428.5);
  right[9].pos = createVector(381.7, 470.9);
  right[10].pos = createVector(384.2, 513.1);
  right[11].pos = createVector(388.2, 555.2);
  right[12].pos = createVector(393.9, 597.0);
  right[13].pos = createVector(401.1, 638.6);

  left[1].pos = createVector(301.5, 114.6);
  left[2].pos = createVector(296.0, 158.9);
  left[3].pos = createVector(292.1, 203.1);
  left[4].pos = createVector(289.7, 247.3);
  left[5].pos = createVector(288.7, 291.5);
  left[6].pos = createVector(289.4, 335.5);
  left[7].pos = createVector(291.5, 379.3);
  left[8].pos = createVector(295.3, 423.0);
  left[9].pos = createVector(300.5, 466.5);
  left[10].pos = createVector(307.4, 509.8);
  left[11].pos = createVector(315.7, 552.8);
  left[12].pos = createVector(325.6, 595.5);
  left[13].pos = createVector(337.0, 637.9);
}

function connect() {
  link12[0].len = dist(301.5, 114.6, 419.7, 130.7);
  link12[1].len = dist(296.0, 158.9, 409.6, 173.1);
  link12[2].len = dist(292.1, 203.1, 400.9, 215.6);
  link12[3].len = dist(289.7, 247.3, 393.8, 258.2);
  link12[4].len = dist(288.7, 291.5, 388.2, 300.8);
  link12[5].len = dist(289.4, 335.5, 384.2, 343.4);
  link12[6].len = dist(291.5, 379.3, 381.7, 386.0);
  link12[7].len = dist(295.3, 423.0, 380.9, 428.5);
  link12[8].len = dist(300.5, 466.5, 381.7, 470.9);
  link12[9].len = dist(307.4, 509.8, 384.2, 513.1);
  link12[10].len = dist(315.7, 552.8, 388.2, 555.2);
  link12[11].len = dist(325.6, 595.5, 393.9, 597.0);
  link12[12].len = dist(337.0, 637.9, 401.1, 638.6);

  for (let l of link12) {
    l.update();
    //l.display()
  }
}

function drawPlant() {
  strokeWeight(5);
  stroke("#187000");
  noFill()
  beginShape();
  curveVertex(
      (right[0].pos.x + left[0].pos.x) / 2,
      (right[0].pos.y + left[0].pos.y) / 2
    );
  for (let i = 0; i < right.length; i++) {
    curveVertex(
      (right[i].pos.x + left[i].pos.x) / 2,
      (right[i].pos.y + left[i].pos.y) / 2
    );
  }
  curveVertex(
      (right[14].pos.x + left[14].pos.x) / 2,
      (right[14].pos.y + left[14].pos.y) / 2
    );
  endShape();
  //console.log("work")
  //circle(200,200,20)
  
  noFill();
beginShape();
curveVertex(-84, -91);
curveVertex(-84, -91);
curveVertex(-68, -19);
curveVertex(-21, -17);
curveVertex(-32, -91);
curveVertex(-32, -91);
endShape();
  
  
strokeWeight(20)
  
 push()
  stroke("#e6a3ee")
  translate(2,2)
  for (let i=1;i<right.length-3;i++){
  let p=map(dist(i,0,5,0),4,1,1.6,2)
  //p=1.6
  line(right[i].pos.x/2+left[i].pos.x/2+(right[i].pos.x-left[i].pos.x)*0.25,right[i].pos.y/2+left[i].pos.y/2,left[i].pos.x+(right[i].pos.x-left[i].pos.x)*p,left[i].pos.y+(right[i].pos.y-left[i].pos.y)*p)
  
  line(right[i].pos.x/2+left[i].pos.x/2-(right[i].pos.x-left[i].pos.x)*0.25,right[i].pos.y/2+left[i].pos.y/2,left[i].pos.x-(right[i].pos.x-left[i].pos.x)*p*0.5,left[i].pos.y-(right[i].pos.y-left[i].pos.y)*p*0.5)
}
  pop()
for (let i=1;i<right.length-3;i++){
  let p=map(dist(i,0,5,0),4,1,1.6,2)
  //p=1.6
  line(right[i].pos.x/2+left[i].pos.x/2+(right[i].pos.x-left[i].pos.x)*0.25,right[i].pos.y/2+left[i].pos.y/2,left[i].pos.x+(right[i].pos.x-left[i].pos.x)*p,left[i].pos.y+(right[i].pos.y-left[i].pos.y)*p)
  
  line(right[i].pos.x/2+left[i].pos.x/2-(right[i].pos.x-left[i].pos.x)*0.25,right[i].pos.y/2+left[i].pos.y/2,left[i].pos.x-(right[i].pos.x-left[i].pos.x)*p*0.5,left[i].pos.y-(right[i].pos.y-left[i].pos.y)*p*0.5)
}

}

function drawEllipse(p1,p2){
  let middle = p5.Vector.add(p1, p2).mult(0.5);
  let distance = p1.dist(p2);
  let angle = atan2(p2.y - p1.y, p2.x - p1.x);
  fill(255)
  push();
  translate(middle.x, middle.y); 
  rotate(angle); 
  ellipse(0, 9, distance, 30)
  pop(); 
}
