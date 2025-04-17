function setup() {
  createCanvas(600, 600);
  background(0);
  angleMode(DEGREES);

  for (let i = 0; i < 160; i = i + 1.2) {
    let angle = i * 60.199;
    push();
    stroke(145, 176, 221, 180);
    noFill();
    translate(300, 300);
    rotate(angle);
    rect(20, 0, 170, 160);
    stroke(16, 75, 230);
    ellipse(250, 0, 50, 50);
    pop();

    push();
    noFill();
    translate(300, 300);
    rotate(angle * 0.44);
    stroke(255, 229, 158, 190);
    ellipse(100, 0, 200, 90);
    pop();

    push();
    strokeWeight(0.6);
    noFill();
    stroke(254, 180, 47);
    translate(300, 300);
    rotate(angle);
    circle(50, 50, 120);
    pop();

    for (let i = 0; i < 360; i = i + 45) {
      let angle2 = i;
      push();
      noFill();
      stroke(255, 128, 68,150);
      translate(300, 300);
      rotate(angle2);
      circle(260, 50, 30);
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
  //saveCanvas('yourname', 'png');   // saves the canvas as a png image
}
