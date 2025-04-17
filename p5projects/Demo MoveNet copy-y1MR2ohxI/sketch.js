let x = 0;
let y = 0;

function setup() {
  createCanvas(640, 480);
  setupMoveNet(); // ***
}

function draw() {
  //clear();
  //background(255, 0, 0, 100);
  
  if (keyIsPressed) {
    if (key == " ") {
      clear();
    }
  }
  
  updateMoveNet(); // ***
  
  x = pose.rightElbow.x; // mouseX
  y = pose.rightElbow.y; // mouseY
  
  noStroke();
  fill(255);
  circle(x, y, 20);
  circle(y, x, 20);
}




/*
Use one of the keypoints names after "pose."
i.e. pose.rightEye.x
     pose.rightEye.y

Keypoints Names
Id	Part
0	nose
1	leftEye
2	rightEye
3	leftEar
4	rightEar
5	leftShoulder
6	rightShoulder
7	leftElbow
8	rightElbow
9	leftWrist
10	rightWrist
11	leftHip
12	rightHip
13	leftKnee
14	rightKnee
15	leftAnkle
16	rightAnkle
*/