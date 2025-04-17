function DupdatPos(x,y,yoff,chang,kuan,yScale){
  Deyelashes[3][0].pos.x = (chang / 2) * cos(-PI / 2);
  Deyelashes[3][0].pos.y = yScale*((kuan / 2) * sin(-PI / 2) - kuan / 2 + 14);
  Deyelashes[3][4].pos.x = x * cos(-PI / 2);
  Deyelashes[3][4].pos.y = yScale*(y * sin(-PI / 2) + yoff);
  
  Deyelashes[0][0].pos.x = x * cos(-PI / 2 - (3 * PI) / 8)
  Deyelashes[0][0].pos.y = yScale*(y * sin(-PI / 2 - (3 * PI) / 8) + yoff)
  //Deyelashes[0][0].rad=30
  Deyelashes[0][4].pos.x = (chang / 2) * cos(-PI / 2 - (3 * PI) / 8)
  Deyelashes[0][4].pos.y =yScale*((kuan / 2) * sin(-PI / 2 - (3 * PI) / 8) - kuan / 2 + 14)
  
  Deyelashes[1][0].pos.x = x * cos(-PI / 2 - PI / 4.2)
  Deyelashes[1][0].pos.y = yScale*(y * sin(-PI / 2 - PI / 4.2) + yoff)
  Deyelashes[1][4].pos.x = (chang / 2) * cos(-PI / 2 - PI / 4.2)
  Deyelashes[1][4].pos.y = yScale*((kuan / 2) * sin(-PI / 2 - PI / 4.2) - kuan / 2 + 14)
  
  Deyelashes[2][0].pos.x = x * cos(-PI / 2 - PI / 8.5)
  Deyelashes[2][0].pos.y = yScale*(y * sin(-PI / 2 - PI / 8.5) + yoff)
  Deyelashes[2][4].pos.x = (chang / 2) * cos(-PI / 2 - PI / 8.5)
  Deyelashes[2][4].pos.y = yScale*((kuan / 2) * sin(-PI / 2 - PI / 8.5) - kuan / 2 + 14)
  
  Deyelashes[4][0].pos.x = x * cos(-PI / 2 + PI / 8.5)
  Deyelashes[4][0].pos.y = yScale*(y * sin(-PI / 2 + PI / 8.5) + yoff)
  Deyelashes[4][4].pos.x = (chang / 2) * cos(-PI / 2 + PI / 8.5)
  Deyelashes[4][4].pos.y = yScale*((kuan / 2) * sin(-PI / 2 + PI / 8.5) - kuan / 2 + 14)
  
  Deyelashes[5][0].pos.x = x * cos(-PI / 2 + PI / 4.2)
  Deyelashes[5][0].pos.y = yScale*(y * sin(-PI / 2 + PI / 4.2) + yoff)
  Deyelashes[5][4].pos.x = (chang / 2) * cos(-PI / 2 + PI / 4.2)
  Deyelashes[5][4].pos.y = yScale*((kuan / 2) * sin(-PI / 2 + PI / 4.2) - kuan / 2 + 14)
  
  Deyelashes[6][0].pos.x = x * cos(-PI / 2 + (3 * PI) / 8)
  Deyelashes[6][0].pos.y = yScale*(y * sin(-PI / 2 + (3 * PI) / 8) + yoff)
  Deyelashes[6][4].pos.x = (chang / 2) * cos(-PI / 2 + (3 * PI) / 8)
  Deyelashes[6][4].pos.y = yScale*((kuan / 2) * sin(-PI / 2 + (3 * PI) / 8) - kuan / 2 + 14)
  
}

function updatPos(x,y,yoff,chang,kuan){
  eyelashes[3][0].pos.x = (chang / 2) * cos(-PI / 2);
  eyelashes[3][0].pos.y = yScale*((kuan / 2) * sin(-PI / 2) - kuan / 2 + 14);
  eyelashes[3][4].pos.x = x * cos(-PI / 2);
  eyelashes[3][4].pos.y = yScale*(y * sin(-PI / 2) + yoff);
  
  eyelashes[0][0].pos.x = x * cos(-PI / 2 - (3 * PI) / 8)
  eyelashes[0][0].pos.y = yScale*(y * sin(-PI / 2 - (3 * PI) / 8) + yoff)
  eyelashes[0][4].pos.x = (chang / 2) * cos(-PI / 2 - (3 * PI) / 8)
  eyelashes[0][4].pos.y =yScale*((kuan / 2) * sin(-PI / 2 - (3 * PI) / 8) - kuan / 2 + 14)
  
  eyelashes[1][0].pos.x = x * cos(-PI / 2 - PI / 4.2)
  eyelashes[1][0].pos.y = yScale*(y * sin(-PI / 2 - PI / 4.2) + yoff)
  eyelashes[1][4].pos.x = (chang / 2) * cos(-PI / 2 - PI / 4.2)
  eyelashes[1][4].pos.y = yScale*((kuan / 2) * sin(-PI / 2 - PI / 4.2) - kuan / 2 + 14)
  
  eyelashes[2][0].pos.x = x * cos(-PI / 2 - PI / 8.5)
  eyelashes[2][0].pos.y = yScale*(y * sin(-PI / 2 - PI / 8.5) + yoff)
  eyelashes[2][4].pos.x = (chang / 2) * cos(-PI / 2 - PI / 8.5)
  eyelashes[2][4].pos.y = yScale*((kuan / 2) * sin(-PI / 2 - PI / 8.5) - kuan / 2 + 14)
  
  eyelashes[4][0].pos.x = x * cos(-PI / 2 + PI / 8.5)
  eyelashes[4][0].pos.y = yScale*(y * sin(-PI / 2 + PI / 8.5) + yoff)
  eyelashes[4][4].pos.x = (chang / 2) * cos(-PI / 2 + PI / 8.5)
  eyelashes[4][4].pos.y = yScale*((kuan / 2) * sin(-PI / 2 + PI / 8.5) - kuan / 2 + 14)
  
  eyelashes[5][0].pos.x = x * cos(-PI / 2 + PI / 4.2)
  eyelashes[5][0].pos.y = yScale*(y * sin(-PI / 2 + PI / 4.2) + yoff)
  eyelashes[5][4].pos.x = (chang / 2) * cos(-PI / 2 + PI / 4.2)
  eyelashes[5][4].pos.y = yScale*((kuan / 2) * sin(-PI / 2 + PI / 4.2) - kuan / 2 + 14)
  
  eyelashes[6][0].pos.x = x * cos(-PI / 2 + (3 * PI) / 8)
  eyelashes[6][0].pos.y = yScale*(y * sin(-PI / 2 + (3 * PI) / 8) + yoff)
  eyelashes[6][4].pos.x = (chang / 2) * cos(-PI / 2 + (3 * PI) / 8)
  eyelashes[6][4].pos.y = yScale*((kuan / 2) * sin(-PI / 2 + (3 * PI) / 8) - kuan / 2 + 14)
  
}

function showPoints(x,y,yoff,chang,kuan,yScale){
  //ellipse(0, yoff, 2 * x, 2 * y);
 circle(x * cos(-PI / 2), yScale*(y * sin(-PI / 2) + yoff), 10); //顶点
  circle(x * cos(-PI / 2 + PI / 8.5), yScale*(y * sin(-PI / 2 + PI / 8.5) + yoff), 10);
  //4
  circle(x * cos(-PI / 2 + PI / 4.2), yScale*(y * sin(-PI / 2 + PI / 4.2) + yoff), 10);
  //5
  circle(
    x * cos(-PI / 2 + (3 * PI) / 8),
    yScale*(y * sin(-PI / 2 + (3 * PI) / 8) + yoff),
    10
  ); //6

  circle(x * cos(-PI / 2 - PI / 8.5), yScale*(y * sin(-PI / 2 - PI / 8.5) + yoff), 10);//2
  circle(x * cos(-PI / 2 - PI / 4.2), yScale*(y * sin(-PI / 2 - PI / 4.2) + yoff), 10);//1
  circle(
    x * cos(-PI / 2 - (3 * PI) / 8),
    yScale*(y * sin(-PI / 2 - (3 * PI) / 8) + yoff),
    10
  );//0
  circle(
    (chang / 2) * cos(-PI / 2),
    yScale*((kuan / 2) * sin(-PI / 2) - kuan / 2 + 14),
    10
  ); //顶点
  circle(
    (chang / 2) * cos(-PI / 2 + PI / 8.5),
    yScale*((kuan / 2) * sin(-PI / 2 + PI / 8.5) - kuan / 2 + 14),
    10
  );
  circle(
    (chang / 2) * cos(-PI / 2 + PI / 4.2),
    yScale*((kuan / 2) * sin(-PI / 2 + PI / 4.2) - kuan / 2 + 14),
    10
  );
  circle(
    (chang/2 ) * cos(-PI / 2 + (3 * PI) / 8),
    yScale*((kuan / 2) * sin(-PI / 2 + (3 * PI) / 8) - kuan / 2 + 14),
    10
  ); //

  circle(
    (chang / 2) * cos(-PI / 2 - PI / 8.5),
    yScale*((kuan / 2) * sin(-PI / 2 - PI / 8.5) - kuan / 2 + 14),
    10
  );
  circle(
    (chang / 2) * cos(-PI / 2 - PI / 4.2),
    yScale*((kuan / 2) * sin(-PI / 2 - PI / 4.2) - kuan / 2 + 14),
    10
  );
  circle(
    (chang / 2) * cos(-PI / 2 - (3 * PI) / 8),
    yScale*((kuan / 2) * sin(-PI / 2 - (3 * PI) / 8) - kuan / 2 + 14),
    10
  );
  
}

function Dpartsetup(){
  for (let i = 0; i < 7; i++) {
    for (let a = 0; a < 8; a++) {//5
      Deyelashes[i].push(new Ball(a * 5, 0, 5));
    }
  }

  for (let i = 0; i < Deyelashes.length; i++) {
    DlinkEyes[i] = [];
    for (let a = 0; a < Deyelashes[i].length - 1; a++) {
      DlinkEyes[i].push(new Spring(Deyelashes[i][a], Deyelashes[i][a + 1], 1, 1));
    }
  }
}

function Dpartclass(){
  for (let i = 0; i < DlinkEyes.length; i++) {
    for (let l of DlinkEyes[i]) {
      l.update();
      //l.display();
    }
  }
  for (let i = 0; i < Deyelashes.length; i++) {
    beginShape();
    curveVertex(Deyelashes[i][0].pos.x, Deyelashes[i][0].pos.y);
    for (let t of Deyelashes[i]) {
      //t.drag();
      //t.stayInCanvas();
      t.update();
      t.display();

      let G = createVector(0, -4);
      t.applyForce(G);

      curveVertex(t.pos.x, t.pos.y);
    }
    curveVertex(Deyelashes[i][4].pos.x, Deyelashes[i][4].pos.y);
    endShape();
  }

  // for (let i = 0; i < 7; i++) {
  //   if (i < 3) {
  //     for (let e of Deyelashes[i]) {
  //       let G = createVector(-0.3, 0);
  //       e.applyForce(G);
  //     }
  //   } else {
  //     for (let e of Deyelashes[i]) {
  //       let G = createVector(0.3, 0);
  //       e.applyForce(G);
  //     }
  //   }
  // }
}