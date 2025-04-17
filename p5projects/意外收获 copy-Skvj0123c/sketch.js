let wave = [];
function setup() {
  createCanvas(600, 600);
  wave[0] = new Wave();
  background(0)
}

function draw() {
  background(0,16)
  
  
  let w = wave[0];
  rotate(0.4)
  w.display();
  w.shape();
 
}


class Wave {
  constructor() {
    
    this.y = 0;
    this.start = 0;
    this.inc = 0.25;
    this.xoff = 0;
    
    //this.yinc=yinc
  }

  display() {
    stroke(255);
  }

  shape() {
    push()
    translate(0,sin(frameCount*0.08)*40-100)
    //rotate(PI*0.3)
    this.xoff = this.start;
   for (let i=0;i<10;i++){
     //stroke("#0b83fb")
     noStroke()
     
    for (let x = i; x < width+130 ; x=x+10) {
       this.y =
      map(noise(this.xoff * 0.7*(i*0.2+1)+i), 0, 1, -140, 90) +
      map(sin(this.xoff * 0.4), -1, 1, 0, 130);
     
      push()
      translate(0,sin(frameCount*0.08+i*0.5)*80)
      rectMode(CENTER)
      fill("#a7c83f")
      rect(x, this.y+map(dist(x,0,width/2-100,0),210,0,-10,70),1,map(noise(this.xoff+0.5), 0, 1, 170, 150)+random(-20,5)+350);
      pop()
    this.xoff += this.inc; 
  }}
    this.start += 0.03;

}
}