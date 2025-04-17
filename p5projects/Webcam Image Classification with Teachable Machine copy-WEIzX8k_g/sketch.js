// put the shareable link from Teachable Machine here
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/L2FvxOyqC/';

let classifier;
let video;
let flippedVideo;
let label = '';  // to store the classification

// load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(640, 480);
  // create the video
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  // Teachable Machine recorded the camera as if looking into a mirror
  // (right and left swapped); because of this, we flip the camera image as well
  flippedVideo = ml5.flipImage(video);
  // start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // draw the video
  image(flippedVideo, 0, 0);

  // draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}

// get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
}

// this function is executed whenever classification finishes
// it's thus a "callback function"
function gotResult(error, results) {
  // the results are in an array ordered by confidence
  // console.log(results[0]);
  label = results[0].label;
  // classifiy again!
  classifyVideo();
}
