let video;
let poseNet;
let poses = [];

let targetXs = [];
let targetYs = [];
let dingSound;

function preload() {
  dingSound = loadSound("ding.mp3");
}

function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", gotResults);

  // pick initital target coordinates
  for (let i = 0; i < 2; i++) {
    targetXs[i] = random(20, width - 20);
    targetYs[i] = random(20, height - 20);
  }
}

function modelReady() {
  console.log("Model ready");
}

function gotResults(results) {
  poses = results;
}

function draw() {
  // this uses transformations to flip the video
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);

  // draw the targets
  for (let i = 0; i < 2; i++) {
    ellipse(targetXs[i], targetYs[i], 10, 10);
  }

  if (poses && poses.length > 0) {
    let leftX = poses[0].pose.leftWrist.x;
    let leftY = poses[0].pose.leftWrist.y;
    let rightX = poses[0].pose.rightWrist.x;
    let rightY = poses[0].pose.rightWrist.y;

    // draw the detected points
    ellipse(leftX, leftY, 10, 10);
    ellipse(rightX, rightY, 10, 10);

    // calculate the distance from the detected points to the targets
    let distance = 0;
    for (let i = 0; i < 2; i++) {
      let leftDistance = dist(leftX, leftY, targetXs[i], targetYs[i]);
      let rightDistance = dist(rightX, rightY, targetXs[i], targetYs[i]);
      // we take the "better" distance between left and right wrist
      if (leftDistance < rightDistance) {
        distance = distance + leftDistance;
      } else {
        distance = distance + rightDistance;
      }
    }

    // if the distance is below a threshold, play a sound and pick
    // new coordinates
    if (distance < 50) {
      dingSound.play();
      for (let i = 0; i < 2; i++) {
        targetXs[i] = random(20, width - 20);
        targetYs[i] = random(20, height - 20);
      }
    }
  }

  pop();
}
