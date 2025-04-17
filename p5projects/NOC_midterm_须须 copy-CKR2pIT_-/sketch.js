let tails = [];
let linkTail = [];

let eyelashes = []; //每组长度为5
let linkEyes = [];

let Deyelashes = []; //每组长度为5
let DlinkEyes = [];

let yScale = 1
let Pink="#d43f00"
let lPink="#f9a611"
// let outGreen="#228a0c"
let outGreen="#397e64"
let back="#68ba96"
let lashC="#00371c"//"#0f4627"

function setup() {
  createCanvas(600, 600);

  eyelashes = [[], [], [], [], [], [], []];
  Deyelashes = [[], [], [], [], [], [], []];

  //pixelDensity(0.01);//pixel art
  for (let i = 0; i < 7; i++) {
    for (let a = 0; a < 5; a++) {
      eyelashes[i].push(new Ball(a * 5, 0, 5));
    }
  }

  for (let i = 0; i < eyelashes.length; i++) {
    linkEyes[i] = [];
    for (let a = 0; a < eyelashes[i].length - 1; a++) {
      linkEyes[i].push(new Spring(eyelashes[i][a], eyelashes[i][a + 1], 2, 1));
    }
  }
  Dpartsetup()
}

function draw() {
  background("#ecbb1a");
  yScale=map(sin(frameCount*0.02),-1,1,-0.4,0.98)
  //yScale=map(noise(frameCount*0.02),0,1,-0.8,-0.3)//捕食动作

  fill(0);
  line(0, height / 2, width,height/2);//center

  push();
  translate(width / 2, height / 2);
  stroke(0);
  strokeWeight(4);
  let x = 175;
  let y = 135;
  let yoff = -55;

  fill(back);

  let kuan = 130;
  let chang = 230;
  
  //ellipse(0,200,chang,kuan)
  stroke(outGreen);

  arc(0, kuan / 2 - 13, chang, kuan, -PI * 0.2, PI + PI * 0.2, OPEN);
  noStroke();
  fill(lPink);
  arc(0, 34, 170, 115, -PI * 0.14, PI + PI * 0.14, OPEN); //下淡粉
  fill(Pink);
  arc(0, 23.5, 140, 78, -PI * 0.12, PI + PI * 0.12, OPEN); //下粉
  for (let i = -PI * 0.18 - 0.2; i < PI + PI * 0.18 + 0.2; i = i + 0.02) {
    strokeWeight(4);
    stroke(outGreen);
    if (i <= PI / 2) {
      line(
        (chang / 2) * cos(i),
        (kuan / 2) * sin(i) + kuan / 2 - 13,
        (chang / 2) * cos(i) - 25 * noise(i * 15),
        (kuan / 2) * sin(i) + kuan / 2 - 13
      );
    } else {
      line(
        (chang / 2) * cos(i) + 29 * noise(i * 15),
        (kuan / 2) * sin(i) + kuan / 2 - 13,
        (chang / 2) * cos(i),
        (kuan / 2) * sin(i) + kuan / 2 - 13
      );
    }
  }
  // for (let i=-PI * 0.18;i<PI + PI * 0.18;i=i+0.02){
  //   strokeWeight(2)
  //   stroke(230,163,238)
  //   line(68*cos(i)-28*noise(i*20)+6,30+50*sin(i),30*noise(i*20)+68*cos(i)-6,30+50*sin(i))
  // }
  noFill()
  stroke(255)
  arc(0, kuan / 2 - 13, chang, kuan, -PI * 0.2, PI + PI * 0.2, OPEN)

  noStroke();
  fill(255);
  arc(0, 10, 60, 60, -PI * 0.1, PI + PI * 0.1, OPEN); //下珍珠
  fill("#e8dd8d")
  arc(0, 7, 42, 35, -PI * 0.1, PI + PI * 0.1, OPEN);
  fill(150,3,0)
  //noStroke()
  arc(0, 7, 30, 25, -PI * 0.16, PI + PI * 0.16, OPEN);//下红
  for(let i=-PI*0.1;i<PI +PI * 0.1;i=i+0.08){
 stroke(150,3,0)
      strokeWeight(1)
      line(30*cos(i),10+30*sin(i),(30-15*noise(i*20))*cos(i),10+(30-15*noise(i*20))*sin(i))
    }

  push();

  ////////////////上面////////////////
  scale(1, yScale);

  if (yScale < 0) {
    fill(0, 122, 40);
  } else {
    fill(back);
    // stroke(255)
    // line(-65,0,65,0)
  }
  arc(0, -kuan / 2 + 14, chang, kuan, PI - PI * 0.2, PI * 0.2, OPEN); //上叶子

  if (yScale > 0) {
    //console.log("work")

    noStroke();
    //ellipse(0, -kuan / 2+40 ,100,40)
    fill(lPink);
    arc(0, -21, 150, 100, PI - PI * 0.1, PI * 0.1, OPEN); //上粉
    fill(Pink);
    arc(0, -10, 120, 72, PI - PI * 0.06, PI * 0.06, OPEN); //上粉
    for (let i = PI-PI*0.06-0.65; i < 2*PI + PI * 0.06 + 0.65; i = i + 0.02) {
    strokeWeight(4);
    stroke(outGreen);
    if (i <=3* PI / 2) {
      line(
        (chang / 2) * cos(i),
        (kuan / 2) * sin(i) -kuan / 2 + 14,
        (chang / 2) * cos(i) + 25 * noise(i * 15),
        (kuan / 2) * sin(i) -kuan / 2 + 14
      );
    } else {
      line(
        (chang / 2) * cos(i) - 29 * noise(i * 15),
        (kuan / 2) * sin(i) -kuan / 2 + 14,
        (chang / 2) * cos(i),
        (kuan / 2) * sin(i) -kuan / 2 + 14
      );
    }
  }

    fill(255);
    noStroke()
    arc(0, 10, 60, 60, PI + PI * 0.1, 2 * PI - PI * 0.1, OPEN); //珍珠上部分
    fill("#e8dd8d")
  arc(0, 7, 42, 35, PI+PI * 0.1, 2*PI - PI * 0.1, OPEN);
    fill(150,3,0)
    arc(0, 5, 30, 25,  PI-PI*0.16 ,2*PI+0.16 , OPEN);//上红
    for(let i=PI+PI*0.1;i<2 * PI - PI * 0.1;i=i+0.08){
   stroke(150,3,0)
      strokeWeight(1)
      line(30*cos(i),10+30*sin(i),(30-15*noise(i*20))*cos(i),10+(30-15*noise(i*20))*sin(i))
    }
    
  }
  noFill()
  stroke(255)
  strokeWeight(4)
  arc(0, -kuan / 2 + 14, chang, kuan, PI - PI * 0.2, PI * 0.2, OPEN)//上白外轮廓
  pop();

  // if(yScale>0.2){
  //   fill(255)
  //   arc(0,10,60,60,PI+PI*0.09,2*PI-PI*0.09,OPEN)//珍珠上部分
  // }

  strokeWeight(5);
  stroke(0);
  draweyelashes(x, y, yoff, chang, kuan,1);

  pop();
}

function draweyelashes(x, y, yoff, chang, kuan,direction) {
  noFill();
  stroke(lashC)

  // showPoints(x, y, yoff, chang, kuan,yScale*direction);
  // showPoints(x, y-20, yoff, chang, kuan,-1);

  for (let i = 0; i < linkEyes.length; i++) {
    for (let l of linkEyes[i]) {
      l.update();
      //l.display();
    }
  }

  updatPos(x, y, yoff, chang, kuan);
  DupdatPos(x,y-20,yoff,chang,kuan,-1)
  //console.log(eyelashes)

  for (let i = 0; i < eyelashes.length; i++) {
    beginShape();
    curveVertex(eyelashes[i][0].pos.x, eyelashes[i][0].pos.y);
    for (let t of eyelashes[i]) {
      //t.drag();
      //t.stayInCanvas();
      t.update();
      t.display();

      let G = createVector(0, 2);
      t.applyForce(G);

      curveVertex(t.pos.x, t.pos.y);
    }
    curveVertex(eyelashes[i][4].pos.x, eyelashes[i][4].pos.y);
    endShape();
  }

  for (let i = 0; i < 7; i++) {
    if (i < 3) {
      for (let e of eyelashes[i]) {
        let G = createVector(-0.3, 0);
        e.applyForce(G);
      }
    } else {
      for (let e of eyelashes[i]) {
        let G = createVector(0.3, 0);
        e.applyForce(G);
      }
    }
  }
   Dpartclass()
}

// function mousePressed() {
//   for (let i = 0; i < balls.length; i++) {
//     let b = balls[i];
//     if (b.pressed()) {
//       break;
//     }
//   }
// }

// function mousedrag() {
//   for (let i = 0; i < balls.length; i++) {
//     let b = balls[i];
//     b.drag();
//     //b.stayInCanvas()
//   }
// }

// function mouseReleased() {
//   for (let i = 0; i < balls.length; i++) {
//     let b = balls[i];
//     b.isDragging = false;
//     //b.stayInCanvas()
//   }
// }
