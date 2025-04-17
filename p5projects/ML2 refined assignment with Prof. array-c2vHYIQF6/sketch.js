let video;

let faceapi;
let detections = [];

let targetXs = [];
let targetYs = [];


let img0,img1,img2,img3,img4,img5;
let cakes = [];
let curCake = 0;

let img,imgh
let R;
let B;
let H;

function preload() {
  // img0 = loadImage("0.png");
  // cakes = [ img0, ];
  
  cakes.push(loadImage("0.png"));
  cakes.push(loadImage("1.png"));
  cakes.push(loadImage("2.png"));
  cakes.push(loadImage("3.png"));
  cakes.push(loadImage("4.png"));
  cakes.push(loadImage("5.png"));
  imgh=loadImage("hamster.png")
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  

  faceapi = ml5.faceApi(video, modelReady);
  
   for (let i = 0; i < 2; i++) {
    targetXs[i] = random(20, width - 20);
    targetYs[i] = random(20, height - 20);
  }
  background(0,0,0)
  
  
}

function modelReady() {
  console.log("Model ready!");
  faceapi.detect(gotResults);
}

function gotResults(err, result) {
  detections = result;
  console.log(detections);
  faceapi.detect(gotResults);
}

function draw() {
  push();
  translate(width, 0);
  scale(-1, 1);
  imageMode(CORNERS);
  image(video, 0, 0, width, height);


  imageMode(CENTER);

  let nose = landmarkCenter("nose");
  if(nose){
    R = random(100,255)
    B = random(100,255)
    H = random(100,255)
  tint(R, B, H);
      image(imgh, nose.x,nose.y, nose.y * 1.3, nose.x * 1.3)
  let mouth = landmarkCenter("mouth");
  if (mouth) {
    fill(255, 0, 0);
    noStroke();
    //ellipse(mouth.x, mouth.y, 20, 20);
  }
    
  for (let i = 0; i < 1; i++) {
       
    image(cakes[curCake],targetXs[i]+2*sin(frameCount*0.4), targetYs[i]+4*cos(frameCount*0.4), 120, 120);
  
  // if (detections && detections.length > 0) {
  //   let X = detections[0].pose.mouth.x;
  //   let Y = detections[0].pose.mouth.y;
      let distance = 0;
    for (let i = 0; i < 1; i++) {
      let Distance = dist(mouth.x, mouth.y, targetXs[i], targetYs[i]);
      distance = distance + Distance
      if (distance < 50) {
      //dingSound.play();
      for (let i = 0; i < 1; i++) {
        targetXs[i] = random(20, width-20);
        targetYs[i] = random(20, height-20);
        // let Img=[img0,img1,img2,img3,img4,img5]
        // img=random(Img)
        curCake = curCake + 1;
        if (curCake == 6) {
          curCake = 0;
        }
      }
        
    }
    }}
  // let Img=[img0,img1,img2,img3,img4,img5]
  //       img=random(Img)
  // R = random(50, 90)
  // tint(R, B, 160);
  //     image(imgh, nose.x,nose.y, nose.y * 1.3, nose.x * 1.3);}
  }
  pop();

}


function landmarkCenter(landmark) {
  if (detections.length < 1) {
    return false; // no detection
  }
  let detection = detections[0];

  if (!detection.parts[landmark]) {
    return false; // landmark not found
  }
  let part = detection.parts[landmark];

  // calculate the center point
  let center = {
    x: 0,
    y: 0,
  };
  for (let i = 0; i < part.length; i++) {
    center.x += part[i].x / part.length;
    center.y += part[i].y / part.length;
  }
  return center;
}
