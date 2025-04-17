// based on ml5.s Handpose Webcam example

let handpose;
let video;
let predictions = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  handpose = ml5.handpose(video, modelReady);
  handpose.on("hand", gotResults);
}

function modelReady() {
  console.log("Model ready!");
}

function gotResults(results) {
  predictions = results;
  console.log(results);
}

function draw() {
  push();
  translate(width, 0);
  scale(-1, 1);
  imageMode(CORNERS);
  image(video, 0, 0, width, height);
  

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  pop()
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    let prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      let keypoint = prediction.landmarks[j];
      fill(0, 255, 0);
      noStroke();
      ellipse(keypoint[0], keypoint[1], 10, 10);
    }
  }
}
