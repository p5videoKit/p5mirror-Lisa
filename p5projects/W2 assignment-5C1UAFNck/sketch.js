let inc = 0.02;
let inc2 = 0.06
let inc3=0.1
let start =0
let start2 = 0;
let start3=0;

function setup() {
  createCanvas(800, 600);
  background(0,0,0,50)
}

function draw() {
  background(0,0,0,5)
  

 
  noFill();
  //beginShape();
  let yoff = start;
  let xoff=start2
  let off=start3
  for (let x = 0; x < width; x=x+20) {
    
    
    let n = map(noise(yoff), 0, 1, -150, 150);
    //let r=random(-10,10)
    let s = map(sin(frameCount*0.05), -1, 1, 70, 190);
    let y = s +n-50
    yoff += inc;
    xoff+=inc2
    xoff=+inc3
    
    push()
    translate(0,sin(frameCount*0.02)*30)
    
    strokeWeight(16)
    stroke(11,131,251);
    line(x+5,-50,x+5,y)
    
    strokeWeight(11)
    stroke(72,143,213)
    let y2=y+map(noise(yoff+2), 0, 1, -20, 80)+map(sin(frameCount*0.1+1), 0, 1, 20, 50)+random(-1,1)
    line(x+10,y,x+10,y2)
    // line(x,y,x, y+map(noise(yoff), 0, 1, -20, 20)+random(-1,1)*5)
 

    let y3=y2+map(noise(xoff+0.2), 0, 1, -10, 50)+map(cos(frameCount*0.05), 0, 1, 30, 70)
    //line(x,y2,x,y3)
    
    strokeWeight(10)
    stroke(116,165,184)
    let y4=y3+map(noise(yoff+10), 0, 1, 0, 10)+map(cos(frameCount*0.05), 0, 1, 0, 15)
    line(x+10,y3,x+5,y4)
    
    strokeWeight(12)
    stroke(102,117,144)
    line(x,y2,x,y3)
    
    strokeWeight(8)
    stroke(101,157,145)
    let y5=y4+map(noise(xoff), 0, 1, -10, 40)+map(cos(frameCount*0.25), 0, 1, 2, 25)
    line(x+2,y4,x,y5)
    
    
    strokeWeight(10)
    stroke(207,178,139,150)
    let y6=y5-70+map(noise(off), 0, 1, -10, 0)+map(cos(frameCount*0.25), 0, 1, 0, -55)
    if(x>10&&x<50||x>150&&x<180||x>500&&x<600||x<730&&x>690){
      line(x+1,y5-20,x+1,y6-20)
    }
    
    strokeWeight(10)
    stroke(242,176,87)
    let y7=y5+50+1.2*map(noise(xoff), 0, 1, 10, 20)+map(cos(frameCount*0.4), 0, 1, 5, 8)-10-random(-5,0)
    line(x+10,y5+25,x+10,y7)
    
    strokeWeight(15)
    stroke(251,121,13)
    let y8=y7-map(noise(xoff*1.5), 0, 1, 10, 30)+random(-5,0)
    line(x+10,y8,x+10,y7)
    
    strokeWeight(20)
    stroke(255,255,255)
    let y9=y8+map(noise(off), 0, 1, 40, 20)+map(cos(frameCount*0.2), 0, 1, -5, 18)+10+random(-20,10)
    line(x,y7,x,y9)

    
  
    //console.log(y)
    
    pop()
  }
  
  
  start += inc;
  start2+=inc2
  start3+=inc3

}