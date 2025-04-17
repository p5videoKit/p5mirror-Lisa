let sizex
let sizey
let colorh1
let colorh2
let colors1
let colors2
function setup() {
  createCanvas(600, 600);
  background(220)
  colorMode(HSB,100)
  noFill()
  
  for(let i=2/3;i<3;i+=1/5){
    for(let j=2/3;j<3;j+=1/5){
      sizex=200*i
      sizey=200*j
      //ellipse(width/2,height/2,sizex,sizey)
      ellipse(width/2,height/2,sizey,sizex)
      colorh1=map(sizex,200,600,0,100)
      colors1=map(sizey,200,600,100,0)
      stroke(colorh1,colors1,80)
    }
  }




  // YOUR CODE HERE
  // .. variables that accumulate values
  // .. loops
  // .. transformations
  // .. conditionals
  // .. randomness
  
  
  
  
  // AFTER YOUR CODE HAS RUN:
  // saveCanvas('yourname', 'png');   // saves the canvas as a png image
}
