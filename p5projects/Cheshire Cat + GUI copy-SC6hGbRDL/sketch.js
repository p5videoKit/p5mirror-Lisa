let gui;

let catParams = {
  catx: 300,
  caty: 600,
  catxSpd: 2,
  catySpd: -2,
};


let rabbitParams = {
  rabbitx: 300,
  rabbity: 200,
  rabbitxSpd: -2,
  rabbitySpd: 2,
};

function preload(){
  img1 = loadImage("Cheshire Cat.png");
  img2 = loadImage("Rabbit.png");
  img3 = loadImage("Garden.png");
}

function setup() {
  createCanvas(700, 750);
  //background(0);
  //background(img3, 100);

  gui = new dat.GUI();

  gui.add(catParams, "catx").min(0).max(width).listen();
  gui.add(catParams, "caty").min(0).max(height).listen();
  gui.add(catParams, "catxSpd").min(-5).max(5).listen();
  gui.add(catParams, "catySpd").min(-5).max(5).listen();

  gui.add(rabbitParams, "rabbitx").min(0).max(width).listen();
  gui.add(rabbitParams, "rabbity").min(0).max(height).listen();
  gui.add(rabbitParams, "rabbitxSpd").min(-5).max(5).listen();
  gui.add(rabbitParams, "rabbitySpd").min(-5).max(5).listen();
  
  c = new Cat(catParams);
  r = new Rabbit(rabbitParams);
}


function draw() {
  //background(0, 10);
background(img3, 30);
//   imageMode(CENTER)
// image(img3,width/2,height/2,width,height)
  gui.catx += catParams.catxSpd;
  gui.caty += catParams.catySpd;
  gui.rabbitx += rabbitParams.rabbitxSpd;
  gui.rabbity += rabbitParams.rabbitySpd;

  drawCat(catParams.catx, catParams.caty);
  drawRabbit(rabbitParams.rabbitx, rabbitParams.rabbity);
  
  c.move();
  c.reappear();
  
  r.move();
  r.reappear();
 
}

function drawCat(x, y) {
  push();
  blendMode(ADD);
  noStroke();
  fill(1, 6, 3, 250);
  drawBlob(x, y, 170);
  pop();

  push();
  translate(x, y);
  scale(0.2);
  imageMode(CENTER);
  image(img1, 0, 0);
  pop();
}

function drawRabbit(x, y) {
push();
  blendMode(ADD);
  noStroke();
  fill(5, 3, 1, 250);
  drawBlob(x, y, 190);
  pop();
  
  push();
  translate(x, y);
  scale(1);
  imageMode(CENTER);
  image(img2, 0, 0);
  pop();
}

function drawBlob(x, y, dia) {
  push();
  translate(x, y);

  let newX, newY, freq, scl;

  push();
  freq = frameCount * 0.05;
  scl = map(sin(freq * 0.9), -1, 1, 0.95, 1.05);
  scale(scl);
  newX = cos(freq) * dia * 0.05;
  newY = sin(freq) * dia * 0.05;
  circle(newX, newY, dia);
  circle(newX, newY, dia * 0.9);
  circle(newX, newY, dia * 0.75);
  pop();

  push();
  freq = frameCount * 0.06;
  scl = map(sin(freq * 0.8), -1, 1, 0.95, 1.05);
  scale(scl);
  newX = cos(freq) * dia * 0.05;
  newY = sin(freq) * dia * 0.05;
  circle(newX, newY, dia);
  circle(newX, newY, dia * 0.9);
  circle(newX, newY, dia * 0.75);
  pop();

  push();
  freq = frameCount * 0.07;
  scl = map(sin(freq * 0.95), -1, 1, 0.95, 1.05);
  scale(scl);
  newX = cos(freq) * dia * 0.05;
  newY = sin(freq) * dia * 0.05;
  circle(newX, newY, dia);
  circle(newX, newY, dia * 0.9);
  circle(newX, newY, dia * 0.75);
  pop();

  pop();
}
  
  
// push();
//   translate(catx, caty);
//   scale(0.2);
//   imageMode(CENTER);
 
//   if (dist(mouseX, mouseY, catx, caty) > 50) {
//     image(img1, 0, 0);
//   }
//   pop();
  
//   push();
//   translate(rabbitx, rabbity);
//   scale(1);
//   imageMode(CENTER);

//   if (dist(mouseX, mouseY, rabbitx, rabbity) > 50) {
//     image(img2, 0, 0);
//   }
//   pop();
//  }


class Cat{
  constructor(parameters) {
    this.catParams = parameters;
    this.catxSpd = 2;
    this.catySpd = 2;
  }
  move() {
    this.catParams.catx += this.catParams.catxSpd;
    this.catParams.caty += this.catParams.catySpd;
  }
  reappear() {
    if (this.catParams.catx < 0) {
      this.catParams.catx = width;
    } else if (this.catParams.catx > width) {
      this.catParams.catx = 0;
    }
    if (this.catParams.caty < 0) {
      this.catParams.caty = height;
    } else if (this.catParams.caty > height) {
      this.catParams.caty = 0;
    }
  }
  
   // updateByGui() {
   //    this.catxSpd = catParams.catxSpd;
   //    this.catySpd = catParams.catySpd;
   //  }
}

class Rabbit {
  constructor(parameters) {
    this.rabbitParams = parameters;
    this.rabbitxSpd = 2;
    this.rabbitySpd = 2;
  }
  move() {
    this.rabbitParams.rabbitx += this.rabbitParams.rabbitxSpd;
    this.rabbitParams.rabbity += this.rabbitParams.rabbitySpd;
  }
  reappear() {
    if (this.rabbitParams.rabbitx < 0) {
      this.rabbitParams.rabbitx = width;
    } else if (this.rabbitParams.rabbitx > width) {
      this.rabbitParams.rabbitx = 0;
    }
    if (this.rabbitParams.rabbity < 0) {
      this.rabbitParams.rabbity = height;
    } else if (this.rabbitParams.rabbity > height) {
      this.rabbitParams.rabbity = 0;
    }
  }
  
  // updateByGui() {
  //     this.rabbitxSpd = rabbitParams.rabbitxSpd;
  //     this.rabbitySpd = rabbitParams.rabbitySpd;
  //   }
  

}