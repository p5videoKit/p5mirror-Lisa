let capture;
let img;

function setup() {
  createCanvas(640, 480);

  // Create a video capture object and set the source to the webcam
  capture = createCapture(VIDEO);
  capture.size(640, 480); // Set the capture size to match the canvas size

  // Hide the video feed (optional)
  capture.hide();
}

function draw() {
  background(220);

  // Display the captured image on the canvas
  
  if (img) {
    image(img, 0, 0, width, height);
  }
  image(capture, 0, 0, width/10, height/10);
}

function mousePressed() {
  // Capture the current frame as an image
  img = capture.get();

  // Display the captured image in a separate area on the canvas
  //image(img, 0, 0, 100, 75); // Adjust the position and size as needed
}
