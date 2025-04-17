// example code from Daniel Shiffman
// Code for: https://youtu.be/E1B4UoSQMFw
// and https://www.youtube.com/watch?v=fcdNSZ9IzJM
// mofidy from week9(2),trying to put all elements in the class so that them might move

let angle;
let axiom = "FX";
let lSystem;
let img

let rules = [];
rules[0] = {
  a: "F",
  //b:"FF-[-F+F+F]+[+F-F-F-F+F]"
  b: "F-F[-F-F]+[-F]",
};
rules[1] = {
  a: "X",
  b: "F-[+FF]+[-FF]",
};

let gui;

let ui={
  LposX:200,
  LposY:170,
  length:200,
  angle:25,
  frequency:0.002,
  wholeAngle:40,
  generation:5
}

class LSystem {
  constructor(axiom, rules) {
    this.axiom = axiom;
    this.sentence = axiom;
    this.rules = rules;
    this.len=ui.length
    this.generation=4
  }

  generate() {
    this.len *= 0.5;
    let nextSentence = "";
    for (let i = 0; i < this.sentence.length; i++) {
      let current = this.sentence.charAt(i);
      let found = false;
      for (let j = 0; j < this.rules.length; j++) {
        if (current == this.rules[j].a) {
          found = true;
          nextSentence += this.rules[j].b;
          break;
        }
      }
      if (!found) {
        nextSentence += current;
      }
    }
    this.sentence = nextSentence;
    createP(this.sentence);
  }
  
  update() {
    this.sentence = this.axiom;
    this.len = ui.length;
    this.coefficient = ui.coefficient; 
    this.generation=ui.generation
    for (let i = 0; i < this.generation; i++) {
      this.generate();
    }
  }

  draw() {
    resetMatrix();
    translate(ui.LposX, ui.LposY);
    stroke(255, 100);
    angle = radians(ui.angle);

    for (let i = 0; i < this.sentence.length; i++) {
      let current = this.sentence.charAt(i);
      if (i == 0) {
        rotate(radians(ui.wholeAngle));
      }
      let shake = (noise(frameCount * ui.frequency + i) - 0.5)*0.2//+0.01*map(sin(frameCount*0.01),-1,1,-0.5,1) ;
       //let shake=0

      if (current == "F") {
        line(0, 0, 0, this.len);
        translate(0, this.len);
        //ellipse(0, 0, this.len/10 , this.len/10 );
        rotate(shake);
      } else if (current == "+") {
        rotate(angle + shake);
      } else if (current == "-") {
        rotate(-angle - shake);
      } else if (current == "[") {
        push();
      } else if (current == "]") {
        pop();
      }
    }
  }
}

function preload(){
  img=loadImage("dress1.png")
}

function setup() {
  createCanvas(700, 700);
  gui = new dat.GUI();
  gui.add(ui, "LposX",150,250).step(2)
  gui.add(ui, "LposY",80,200).step(10)
  gui.add(ui, "length",100,400).onChange(update);
 
  gui.add(ui, "angle", 0,40);
  gui.add(ui,"wholeAngle",-10,60)
  gui.add(ui,"generation",2,6).onChange(update).step(1)
  gui.add(ui, "frequency", 0.001,0.01)
  
  lSystem = new LSystem(axiom, rules);
  lSystem.update()
}

function draw() {
  background(50); 
  strokeWeight(2)
  push()
  lSystem.draw(); 
  pop()
  image(img,120,-20,153.8*1.9,173.0*1.9)
  
}

function update(){
  lSystem.update()
}
