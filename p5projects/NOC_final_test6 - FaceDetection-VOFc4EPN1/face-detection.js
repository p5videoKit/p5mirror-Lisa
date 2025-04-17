













// This example code is based on Kyle McDonald's CV examples
// and adjusted for beginner level students.

// https://kylemcdonald.github.io/cv-examples/

// based on https://github.com/mtschirs/js-objectdetect
// the jsfeat detector is much faster but only does one object at a time:
// https://inspirit.github.io/jsfeat/sample_haar_face.html
// also see:
// https://github.com/mtschirs/js-objectdetect/blob/master/js/objectdetect.frontalcatface.js
// https://ahprojects.com/projects/cv-dazzle/

var w = 640,
  h = 480;
var detector;
var classifier = objectdetect.frontalface;
var img;
var detectedFaces; // name changed

let capture;
let imgScale = 4;
let faces = [];


function setupFaceDetection() {
  //createCanvas(w, h);
  var scaleFactor = 1.2;
  detector = new objectdetect.detector(w / imgScale, h / imgScale, scaleFactor, classifier);
  capture = createCapture(VIDEO);
  capture.size(w / imgScale, h / imgScale);
  capture.hide();
  // img = loadImage('eniac.jpg', function(img) {
  //   faces = detector.detect(img.canvas);
  // })
}

function updateFaceDetection() {
  let img = capture.get(0, 0, capture.width, capture.height);
  if (img.width > 1) {
    detectedFaces = detector.detect(img.canvas);
  }
  if (detectedFaces) {
    faces = [];
    detectedFaces.forEach(function(face) {
      var count = face[4];
      if (count > 4) { // try different thresholds
        // rect(face[0], face[1], face[2], face[3]);
        faces.push(new Face(face[0] * imgScale, face[1] * imgScale, face[2] * imgScale, face[3] * imgScale));
      }
    })
  }
}


function displayFaceDetection() {
  push();
  scale(imgScale);

  image(capture, 0, 0);
  stroke(255);
  noFill();
  if (detectedFaces) {
    detectedFaces.forEach(function(face) {
      var count = face[4];
      if (count > 4) { // try different thresholds
        rect(face[0], face[1], face[2], face[3]);
      }
    })
  }
  pop();
}

class Face {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.centerX = x + w / 2;
    this.centerY = y + h / 2
  }
}