// based on ml5.s Handpose Webcam example

let video;
let faceapi;
let detections = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  faceapi = ml5.faceApi(video, modelReady);
}

function modelReady() {
  console.log("Model ready!");
  faceapi.detect(gotResults);
}

function gotResults(err, result) {
  detections = result;
  console.log(result);
  faceapi.detect(gotResults);
}

function draw() {
  image(video, 0, 0, width, height);

  drawBox(detections);
  drawLandmarks(detections);
}

function drawBox(detections) {
  for (let i = 0; i < detections.length; i++) {
    let alignedRect = detections[i].alignedRect;
    let x = alignedRect._box._x;
    let y = alignedRect._box._y;
    let boxWidth = alignedRect._box._width;
    let boxHeight = alignedRect._box._height;

    noFill();
    stroke(161, 95, 251);
    strokeWeight(2);
    rect(x, y, boxWidth, boxHeight);
  }
}

function drawLandmarks(detections) {
  noFill();
  stroke(161, 95, 251);
  strokeWeight(2);

  for (let i = 0; i < detections.length; i++) {
    drawPart(detections[i].parts.mouth, true);
    drawPart(detections[i].parts.nose, false);
    drawPart(detections[i].parts.leftEye, true);
    drawPart(detections[i].parts.rightEye, false);
    drawPart(detections[i].parts.rightEyeBrow, true);
    drawPart(detections[i].parts.leftEyeBrow, false);
  }
}

function drawPart(feature, closed) {
  beginShape();
  for (let i = 0; i < feature.length; i++) {
    let x = feature[i]._x;
    let y = feature[i]._y;
    vertex(x, y);
  }

  if (closed == true) {
    endShape(CLOSE);
  } else {
    endShape();
  }
}
