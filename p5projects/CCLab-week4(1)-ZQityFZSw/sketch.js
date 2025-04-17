
function setup() {
  createCanvas(600, 600);
  background(50, 20, 120)
  angleMode(DEGREES)
  for (let i = 0; i < 230; i++) {
    let angle = i * 60.199; 
    let color1=map(cos(i),-1,1,68,0)
    let color2=map(cos(i),-1,1,42,0)
    push();
    //fill(139,147,128)
    stroke(color1,color1,0)
    translate(width / 2, height / 2);
    rotate(angle);
    rect(50, 0, 20, 70);
    pop();}
  for (let i = 0; i < 230; i++) {
    let angle = i * 60.199;
    let color1=map(cos(i),-1,1,68,0)
    let color2=map(cos(i),-1,1,42,0)
    push();
    //fill(238,0,0)
    stroke(color2,color1,0)
    translate(width / 2, height / 2);
    rotate(angle);
    rect(100, 0, 30, 120);
    pop();}
  for (let i = 0; i < 230; i++) {
    let angle = i * 40.1; // 72 + 0.2 // small variation 0.2 is added
    let color1=map(cos(i),-1,1,68,0)
    let color2=map(cos(i),-1,1,42,0)
    push();
    //fill(238,0,0)
    stroke(color2,color1,0)
    translate(width / 2, height / 2);
    rotate(angle);
    rect(165, 40, 30, 100);
    pop();}
  
  
  // YOUR CODE HERE
  // .. variables that accumulate values
  // .. loops
  // .. transformations
  // .. conditionals
  // .. randomness
  
  
  
  
  // AFTER YOUR CODE HAS RUN:
  // saveCanvas('yourname', 'png');   // saves the canvas as a png image
}