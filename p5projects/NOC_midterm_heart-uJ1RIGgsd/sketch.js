let gui

let ui={
  length1:119,
  length2:151,
  length3:106,
  length4:47,
  stiffness:1
}

let flames = [];
let hearts = [];
let linkHeart = [];
let feathers=[]
let linkfeather=[]

let o

function setup() {
  createCanvas(700, 700);
  
  gui=new dat.GUI()
  
  gui.add(ui,"length1").min(2).max(200)
  gui.add(ui,"length2").min(2).max(200)
  gui.add(ui,"length3").min(2).max(200)
  gui.add(ui,"length4").min(2).max(200)
  gui.add(ui,"stiffness").min(0.1).max(1)

  for (let i = 0; i < 7; i++) {
    hearts.push(new Ball(i, i, 20)); 
  }
  
  updatePos()

  linkHeart.push(new Spring(hearts[0], hearts[1], 160, 0.9));//0

  linkHeart.push(new Spring(hearts[1], hearts[2], 93, 0.95));//1
  linkHeart.push(new Spring(hearts[2], hearts[3], 93, 0.95));//2

  linkHeart.push(new Spring(hearts[0], hearts[4], 160, 0.95));//3
  linkHeart.push(new Spring(hearts[4], hearts[5], 93, 0.95));//4
  linkHeart.push(new Spring(hearts[5], hearts[6], 93, 0.95));//5

  linkHeart.push(new Spring(hearts[1], hearts[3], 180, 0.95)); //4
  linkHeart.push(new Spring(hearts[4], hearts[6], 180, 0.95));//5
  
for (let i = 0; i < 16; i++) {
    feathers.push(new Ball(i, i, 20));
    stroke(0);
  }
  
  
  for(i=0;i<feathers.length;i=i+2){
    linkfeather.push(new Spring(feathers[i], feathers[i+1], map(dist(i,0,7,0),1,7,0,200), 0.8))
  }
  // linkfeather.push(new Spring(feathers[0], feathers[1], ui.length1, 0.8))
  // linkfeather.push(new Spring(feathers[2], feathers[3], ui.length2, 0.8))
  // linkfeather.push(new Spring(feathers[4], feathers[5], ui.length3, 0.8))
  // linkfeather.push(new Spring(feathers[6], feathers[7], ui.length4, 0.8))
  // linkfeather.push(new Spring(feathers[8], feathers[9], ui.length4, 0.8))
  // linkfeather.push(new Spring(feathers[10], feathers[11], ui.length3, 0.8))
  // linkfeather.push(new Spring(feathers[12], feathers[13], ui.length2, 0.8))
  // linkfeather.push(new Spring(feathers[14], feathers[15], ui.length1, 0.8))
  //map(dis(i,0,7,0),0,7,10,100)
 //console.log("work")

}

function preload(){
  o=loadImage("organ.png")
}

function draw() {
  background(90);
  imageMode(CENTER)
  image(o,width/2-25,160,410,200)
  stroke("#fae2f5")
  line(hearts[0].pos.x, hearts[0].pos.y,hearts[1].pos.x, hearts[1].pos.y)
  line(hearts[0].pos.x, hearts[0].pos.y,hearts[4].pos.x, hearts[4].pos.y)
  feathers[6].pos.x=hearts[0].pos.x/2+hearts[1].pos.x/2
  feathers[6].pos.y=hearts[0].pos.y/2+hearts[1].pos.y/2
  
  feathers[8].pos.x=hearts[0].pos.x/2+hearts[4].pos.x/2
  feathers[8].pos.y=hearts[0].pos.y/2+hearts[4].pos.y/2
  
  push()
  translate(3,0)
      stroke("#f826fc")

  linkfeather[3].display()
  linkfeather[4].display()
  pop()
  
  linkfeather[3].display()
  linkfeather[4].display()

  strokeWeight(1)
  // text(mouseX,100,20)
  // text(mouseY,100,60)
  push();
  translate(350, 350);
  drawFlame();
  pop();

  push();
  //translate(width/2,height/2)
  drawHeartStructure(); //cannot translate if i want drag()
  updateLPos()
}

function drawHeartStructure() {
  strokeWeight(1);
  
  for (let l of linkHeart) {
    l.update();
    //l.display();
  }

  noFill();
  stroke(0);
  strokeWeight(10);
  
  for (let i = 0; i < hearts.length; i++) {
  let t = hearts[i];
  if (i !== 0) { 
    t.drag();
    t.movePoint()
  }
  t.stayInCanvas();
  t.update();
  t.display();
    
  // let G = createVector(0, 4);
  // t.applyForce(G);
}
  stroke("#fae2f5")
  beginShape();
  curveVertex(hearts[1].pos.x, hearts[1].pos.y);
  curveVertex(hearts[1].pos.x, hearts[1].pos.y);
  curveVertex(hearts[2].pos.x, hearts[2].pos.y);
  curveVertex(hearts[3].pos.x, hearts[3].pos.y);
  curveVertex(hearts[3].pos.x, hearts[3].pos.y);
  endShape();
  
  beginShape();
  curveVertex(hearts[4].pos.x, hearts[4].pos.y);
  curveVertex(hearts[4].pos.x, hearts[4].pos.y);
  curveVertex(hearts[5].pos.x, hearts[5].pos.y);
  curveVertex(hearts[6].pos.x, hearts[6].pos.y);
  curveVertex(hearts[6].pos.x, hearts[6].pos.y);
  endShape();

  hearts[0].pos.x = 350; /////
  hearts[0].pos.y = 290; /////

  //记住羽毛部分不要stayinCanvas//有gravity限制了
  drawWings()
}
function drawWings(){
  feathers[0].pos.x=hearts[3].pos.x
  feathers[0].pos.y=hearts[3].pos.y
  
  feathers[2].pos.x=hearts[2].pos.x
  feathers[2].pos.y=hearts[2].pos.y
  
  feathers[4].pos.x=hearts[1].pos.x
  feathers[4].pos.y=hearts[1].pos.y
  
//   feathers[6].pos.x=hearts[0].pos.x/2+hearts[1].pos.x/2
//   feathers[6].pos.y=hearts[0].pos.y/2+hearts[1].pos.y/2
  
//   feathers[8].pos.x=hearts[0].pos.x/2+hearts[4].pos.x/2
//   feathers[8].pos.y=hearts[0].pos.y/2+hearts[4].pos.y/2
  
  feathers[10].pos.x=hearts[4].pos.x
  feathers[10].pos.y=hearts[4].pos.y
  
  feathers[12].pos.x=hearts[5].pos.x
  feathers[12].pos.y=hearts[5].pos.y
  
  feathers[14].pos.x=hearts[6].pos.x
  feathers[14].pos.y=hearts[6].pos.y
  
   linkfeather[0].len=ui.length1
   linkfeather[1].len=ui.length2
   linkfeather[2].len=ui.length3
   linkfeather[3].len=ui.length4
   linkfeather[4].len=ui.length4
   linkfeather[5].len=ui.length3
   linkfeather[6].len=ui.length2
   linkfeather[07].len=ui.length1
  
  
 
  
  for (let i = 0; i < linkfeather.length; i++) {
  let t = linkfeather[i];
  if (i!== 3&&i!==4) { 
    push()
    translate(3,0)
    stroke("#f826fc")
    t.display()
    pop()
    stroke("#fae2f5")
    t.display();
  }
  t.damping=0.9
  t.update();
  
}
 //console.log(linkfeather[1].damping)
  noFill();
  stroke(0);
  strokeWeight(10);
  for (let t of feathers) {
    t.drag();
    t.stayInCanvas();
    t.update();
    t.display();

    let G = createVector(0, 100);
    t.applyForce(G)
  }

// for (let i=0;i<16;i+=2){
//   drawEllipse(feathers[i].pos,feathers[i+1].pos)
// }
  
// }
// function drawEllipse(p1,p2){
//   let mid = p5.Vector.add(p1, p2).mult(0.5);
//   let distance = p1.dist(p2);
//   let angle = atan2(p2.y - p1.y, p2.x - p1.x);
//   fill(255)
//   push();
//   translate(mid.x, mid.y); 
//   rotate(angle); 
//   ellipse(0, 0, distance, 30)
//   pop(); 
 }


function drawFlame() {
  let f = new Flame(0, 0, random(80, 100));
  flames.push(f);

  for (let i = flames.length - 1; i >= 0; i--) {
    let shrink = map(mouseX, 0, width, -0.1, 0.1); //还是要update
    let F = createVector(shrink, -0.08); //shrink update

    flames[i].applyForce(F);
    flames[i].die();
    flames[i].update();
    flames[i].display();

    if (flames[i].radius <= 0) {
      flames.splice(i, 1);
    }
  }
}

function mousePressed() {
  for (let i = 0; i < hearts.length; i++) {
    let b = hearts[i];
    if (b.pressed()) {
      break;
    }
  }
}

function mousedrag() {
  for (let i = 0; i < hearts.length; i++) {
    let b = hearts[i];
    b.drag();
    //b.stayInCanvas()
  }
}

function mouseReleased() {
  for (let i = 0; i < hearts.length; i++) {
    let b = hearts[i];
    b.isDragging = false;
    //b.stayInCanvas()
  }
}
