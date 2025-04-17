// Daniel Shiffman
// https://thecodingtrain.com/challenges/86-cube-wave-by-bees-and-bombs
// https://youtu.be/H81Tdrmz2LA
// https://beesandbombs.tumblr.com/post/149654056864/cube-wave

//I adjust this code to make it not that regular, and change the color of it based on the boxs' height

let angle = 0;
let w = 20;
let ma;
let maxD;

let frames = 90;

let heightColors={}//to adjust the colors of each box according to their height

function setup() {
  createCanvas(500, 500, WEBGL);
  ma = atan(cos(QUARTER_PI));
  maxD = dist(0, 0, 200, 200);
  colorMode(HSB, 360, 100, 100); //hue0-360
  noStroke()
}

// function keyPressed() {
//   if (key == " ") {
//     const options = {
//       units: "frames",
//       delay: 0
//     }
//     saveGif("beesandbombs.gif", frames, options);
//   }
// }//I do not need to save image now haha~

function draw() {
  background(20);
  ortho(-400, 400, 400, -400, 0, 1000);//zoom in/out
  //rotateX(-ma);
  rotateX(ma)//adjust the angle/perspective we view the object
  rotateY(-QUARTER_PI);

  for (let z = 0; z < height; z += w) {
    for (let x = 0; x < width; x += w) {
      push();
      
      // let d = dist(x, z, width / 2, height / 2);
      
      
      
      let shiftedX=x+150;
      let shiftedZ=z-50;
      
      let d=dist(shiftedX,shiftedZ,width/2,height/2);
      let offset = map(d, 0, maxD*1.2, -PI, PI);
      // let a = angle + offset;
      let a=angle+offset+sin(x*0.01)*0.5+cos(z*0.015)*0.4;
      let noiseFactor = noise(x * 0.01, z * 0.01) * 80;//make the wave irregular a little bit
      
      let h = floor(map(sin(a), -1, 1, 100, 200)+noiseFactor*1.2);
      translate(x - width / 2, 0, z - height / 2);
      //normalMaterial();
      //box(w, h, w);
      //rect(x - width / 2 + w / 2, 0, w - 2, h);
      //change the way we color them
      
      if (!heightColors[h]){//due to floor,if this has not been mapped to a color set yet, we get it one
        let hue = map(h, 100, 400, 0, 360);
        heightColors[h]=[
          color(hue,70,90),
          color((hue + 60) % 360, 50, 190),
          color((hue + 150) % 360, 60, 90)
        ];
      }
      
      let faceColors=heightColors[h];
      drawColoredBox(w,h,faceColors);//width=depth
   
      pop();
    }
  }

  angle -= TWO_PI / frames;
}

function drawColoredBox(w,h,faceColors){
  let hw=w/2;
  let hh=h/2;
  let hd=w/2;
  
  let corners=[
    createVector(-hw, -hh,  hd), // 0
    createVector( hw, -hh,  hd), // 1
    createVector( hw,  hh,  hd), // 2
    createVector(-hw,  hh,  hd), // 3
    createVector(-hw, -hh, -hd), // 4
    createVector( hw, -hh, -hd), // 5
    createVector( hw,  hh, -hd), // 6
    createVector(-hw,  hh, -hd)  // 7
  ];
   
  let faces = [
    [0, 1, 2, 3], // Front (Z)
    [5, 4, 7, 6], // Back (Z)
    [4, 0, 3, 7], // Left (X)
    [1, 5, 6, 2], // Right (X)
    [4, 5, 1, 0], // Top (Y)
    [3, 2, 6, 7]  // Bottom (Y)
  ];
  
  for (let i = 0; i < 6; i++) {
    let axisColor;
    if (i < 2) {axisColor = faceColors[2];} // Z-axis 
    else if (i < 4) {axisColor = faceColors[0];} // X-axis 
    else {axisColor = faceColors[1];} // Y-axis 

    fill(axisColor);
    beginShape();
    for (let j = 0; j < 4; j++) {
      let v = corners[faces[i][j]];
      vertex(v.x, v.y, v.z);
    }
    endShape(CLOSE);//to have slightly different colors for each axisface x,y,z//manually draw the surface myself
  }
}