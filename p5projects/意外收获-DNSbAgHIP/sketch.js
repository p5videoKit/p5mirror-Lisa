let wave = [];
function setup() {
  createCanvas(800, 700);
  wave[0] = new Wave();
  background(0)
}

function draw() {
  background(0,0,0,5)
  //background(0,0,0,20);
  //for (let i=0;i<wave.length;i++){
  let w = wave[0];
  //console.log(wave)
  //for (let x=0;x<width;x++){
  //rotate(PI)
  w.display();
  w.shape();
  //}
  //}
}

// function wave(){

// }

class Wave {
  constructor() {
    
    this.y = 0;
    this.start = 0;
    this.inc = 0.25;
    this.xoff = 0;
    this.Color=["#0b83fb","#0b83fb","#488fd5","#667590","#74a5b8","#659d91","#ceb28b","#f2b057","#fb790d","#ffffff"]
    //this.yinc=yinc
  }

  display() {
    stroke(255);
  }

  shape() {
    push()
    translate(0,sin(frameCount*0.08)*40)
    //rotate(PI*0.3)
    this.xoff = this.start;
   for (let i=0;i<10;i++){
     //stroke("#0b83fb")
     noStroke()
     
    for (let x = i; x < width ; x=x+10) {
       this.y =
      map(noise(this.xoff * 0.7*(i*0.2+1)+i), 0, 1, -140, 90) +
      map(sin(this.xoff * 0.4), -1, 1, 0, 130);
      
    
    //rectMode(CENTER)
      push()
      translate(0,sin(frameCount*0.08+i*0.5)*80)
    //line(x,height,x,this.y)
      rectMode(CENTER)
      fill("#0b83fb")
      rect(x, this.y,1,map(noise(this.xoff+0.5), 0, 1, 170, 150)+random(-20,5));
     //  fill("#667590")
     //  rect(x,this.y+150,1,map(noise(this.xoff),0,1,20,40))
     //  fill("#659d91")
     //  rect(x,this.y+300,1,map(noise(this.xoff+0.5),0,1,20,40))
     //  fill("#f2b057")
     // rect(x,this.y+350,1,map(noise(this.xoff),0,1,20,40))
     //  fill("#fffff")
     // rect(x,this.y+380,1,map(noise(this.xoff),0,1,20,40))
      pop()
    this.xoff += this.inc;
      
  }}
    this.start += 0.03;

}
}