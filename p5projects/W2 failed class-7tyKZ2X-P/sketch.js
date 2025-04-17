let wave = [];


function setup() {
  createCanvas(800, 600);
  background(0, 0, 0, 50);
  
    wave[0]=new Wave(5,16,0.02)
   wave[1]=new Wave(10,16,0.022)
  
}

function draw() {
  background(0, 0, 0, 10);
  
   for (let i = 0; i <wave.length; i++) {
    let w = wave[i];
    w.update();
     for(let x=0;x<width;x=x+20){
    w.display(x);
  }}
}

class Wave {
  constructor(xoff, sw,inc) {
    this.xoff = xoff;
    this.yoff=[0,2]
    this.y = [];
    this.increase = [];
    this.Color = ["#0b83fb","#488fd5","#667590","#659d91","#d0b28b","#f2b057","#fb790d","#ffffff"];
    this.strokeW = sw;
    this.framescalar = [0.05,0.1,0.05];
    this.Foff = [0,1];
    this.randomscalar = [1,0];
    this.ymin=[-150,-20]
    this.ymax=[150,80]
    this.mmin=[70,20]
    this.mmax=[190,50]
    

    this.inc = inc;
    this.start = 0;
  }
  update() {
    
  
      let yoff = this.start;
      for (let i = 0; i < 2; i++) {
        
        this.increase[i] =
          map(noise(yoff + this.yoff[i]), 0, 1, this.ymin[i], this.ymax[i]) +
          map(
            sin(frameCount * this.framescalar[i]),
            -1,
            1,
            this.mmin[i],
            this.mmax[i]
          ) +
          random(-1, 1) * this.randomscalar[i];
        yoff += this.inc;
        //console.log(yoff + this.yoff[i])
        if (i==0){
          this.y[i]=this.increase[i]
        }
        if (i > 0) {
          this.y[i] = this.increase[i] + this.y[i - 1];
          
        }
        

        
      }
    this.start += this.inc;
    }
  
  display(x) {
    
      
      for (let i = 0; i < 2; i++) {
        strokeWeight(this.strokeW)
        stroke(this.Color[i]);
        if (i==0){
          line(x+this.xoff,0,x+this.xoff,this.y[i])
          //console.log(this.y[0])
        }
        if (i > 0) {
         
          strokeWeight(this.strokeW)
          stroke(this.Color[i]);
          line(x + this.xoff, this.y[i - 1], x + this.xoff, this.y[i]);
        }}
      }
    
  
}
