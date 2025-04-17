function setup() {
  createCanvas(600, 600);
  background(0);
  angleMode(DEGREES);

  for (let i = 0; i < 120; i = i + 2) {
    let angle = i * 80.199;
    push();
    stroke(143,172,131);
    noFill();
    translate(300, 300);
    rotate(angle*7.6);
    rect(10, 20, 170, 90);
    stroke(152,190,167);
    ellipse(146,137,32,120);
    pop();

    push();
    noFill();
    translate(300, 300);
    rotate(angle*8.87);
    stroke(104,182,88);
    ellipse(20,76, 109, 150);
    pop();

    push();
    strokeWeight(0.6);
    noFill();
    stroke(180,206,236,170);
    translate(300, 300);
    rotate(angle*99.3);
    strokeWeight(2)
    rect(22,13,44,175);
    pop();

    for (let i = 0; i < 360; i = i + 45) {
      let angle2 = i;
      push();
      noFill();
      stroke(176,183,113,80);
      strokeWeight(4)
      translate(300, 300);
      rotate(angle2);
      rect(6,10,97);
      pop();
    }
  }

  //translate(300,300)
  //rotate(angle)

  // YOUR CODE HERE
  // .. variables that accumulate values
  // .. loops
  // .. transformations
  // .. conditionals
  // .. randomness

  // AFTER YOUR CODE HAS RUN:
  saveCanvas('Lisa', 'png');   // saves the canvas as a png image
}
