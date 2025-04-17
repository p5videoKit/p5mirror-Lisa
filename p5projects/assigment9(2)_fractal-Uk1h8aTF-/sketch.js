// example code from Daniel Shiffman
// Code for: https://youtu.be/E1B4UoSQMFw

let angle;
let axiom = "FX";
let sentence = axiom;
let len = 130;

let rules = [];
rules[0] = {
  a: "F",
  b: "F-F[-F-F]+[-F]"
};
rules[1] = {
  a: "X",
  b: "F-[+FF]+[-FF]" 
}

function generate() {
  len *= 0.5;
  let nextSentence = "";
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    let found = false;
    for (let j = 0; j < rules.length; j++) {
      if (current == rules[j].a) {
        found = true;
        nextSentence += rules[j].b;
        break;
      }
    }
    if (!found) {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
  createP(sentence);
  turtle();
}

function turtle() {
  background(51);
  resetMatrix();
  translate(width / 2, 0);
  stroke(255, 100);
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
//     if(i==0){
//     rotate(0.5)
// }
    if (current == "F") {
      line(0, 0, 0, len);
      translate(0, len);
    } else if (current == "+") {
      rotate(angle);
    } else if (current == "-") {
      rotate(-angle)
    } else if (current == "[") {
      push();
    } else if (current == "]") {
      pop();
    }
  }
}

function setup() {
  createCanvas(500, 700);
  angle = radians(25);
  background(51);
  createP(axiom);
  turtle();
  let button = createButton("generate");
  button.mousePressed(generate);
}
