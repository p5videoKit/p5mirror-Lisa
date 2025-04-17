
let left = [];
let link1 = [];

let right=[]
let link2=[]

let link12=[]
let mid=[]

let Z

function setup() {
  createCanvas(700,700);
  

  for (let i = 0; i < 15; i++) {
    left.push(new Ball(350, i*700/14, 10));
    stroke(0);
  }

  for (let i = 0; i < left.length - 1; i++) {
    link1.push(new Spring(left[i], left[i + 1], 25, 0.92));
  }
  
   for (let i = 0; i < 15; i++) {
    right.push(new Ball(350, i*700/14, 10));
    stroke(0);
  }

  for (let i = 0; i < right.length - 1; i++) {
    link2.push(new Spring(right[i], right[i + 1], 25, 0.95));
  }
  
  for (let i = 1; i < right.length - 1; i++) {
    link12.push(new Spring(left[i], right[i], 25, 0.95));
  }
  updateLRPos()
  
//   for (let i=0;i<right.length;i++){
//     mid.push()
//   }
  
}

function preload(){
  Z=loadImage("Z.png")
}

function draw() {
  background(90)
  drawPlant()
  imageMode(CENTER)

  drawleft(-40,20);
  drawright(100,20);
  updateIPos()
  connect()
//   for(let i=1;i<right.length-1;i++){
//     console.log("dist("+left[i].pos.x+","+left[i].pos.y+","+right[i].pos.x+","+right[i].pos.y+")")
   
//     if(i==13){
//       console.log("done")
//     }
//   }
  

}

function updateIPos(){
for (let i=1;i<right.length-1;i++){
  drawImage(left[i].pos,right[i].pos)
}
  
}

function drawImage(p1,p2){
  let middle = p5.Vector.add(p1, p2).mult(0.5);
  let distance = p1.dist(p2);
  let angle = atan2(p2.y - p1.y, p2.x - p1.x);
  fill(255)
  push();
  translate(middle.x, middle.y); 
  rotate(angle); 
  image(Z,0, 9, distance+5, distance+5)
  pop(); 
}

function drawleft(xoff,yoff) {
   left[0].pos.x = width/2+xoff;
  left[0].pos.y = yoff+40;
  
  left[14].pos.x = width/2+xoff+40;
  left[14].pos.y = height-yoff;
  
  link1[0].k=0.6
  
  for (let l of link1) {
    l.update();
    //l.display();
  }

  noFill();
  stroke(0);
  strokeWeight(10);
 
  for (let t of left) {
    t.drag();
    t.stayInCanvas();
    t.update();
    t.display();

    let G = createVector(-0.6,0.1);
    t.applyForce(G);

  }
  
}

function drawright(xoff,yoff) {
  right[0].pos.x = width/2+xoff;
  right[0].pos.y = yoff;
  
  right[14].pos.x = width/2+xoff-40;
  right[14].pos.y = height-yoff;
  
  link2[0].k=0.2
  
  for (let l of link2) {
    l.update();
    //l.display()
  }

  noFill();
  stroke(0);
  strokeWeight(1);
  //beginShape();
  //curveVertex(100,100);
  for (let t of right) {
    t.drag();
    t.stayInCanvas();
    t.update();
    t.display();

    let G = createVector(-0.6, 0.1);
    t.applyForce(G);
  }

  endShape();  
}

function mousePressed() {
  for (let i = 0; i < right.length; i++) {
    let b = right[i];
    if (b.pressed()) {
      break;
    }
  }
  for (let i = 0; i < left.length; i++) {
    let b = left[i];
    if (b.pressed()) {
      break;
    }
  }
  
}

function mousedrag() {
  for (let i = 0; i < right.length; i++) {
    let b = right[i];
    b.drag();
    //b.stayInCanvas()
  }
  for (let i = 0; i < left.length; i++) {
    let b = left[i];
    b.drag();
    //b.stayInCanvas()
  }
}

function mouseReleased() {
  for (let i = 0; i < right.length; i++) {
    let b = right[i];
    b.isDragging = false;
    //b.stayInCanvas()
  }
  for (let i = 0; i < left.length; i++) {
    let b = left[i];
    b.isDragging = false;
    //b.stayInCanvas()
  }
}

