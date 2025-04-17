let img;
let maskedImg;
let segmentation;
let results;

let segmentImages = []; // store all the segmented images
let clickedSegments = []; // store segments that have been clicked

let video;
let frame; // Store the captured frame here

let captureBtn;
let state = "camera"; // GH: or 'selection', 'display', 'drawing'
let showCamera = true;
let hideImage = false; // whether to hide the original image

function preload() {
  segmentation = ml5.imageSegmentation({ feature_extractor_size: 256 }); // Initialize segmentation model
}

function setup() {
  createCanvas(800, 600);

  resetBtn = createButton("reset");
  resetBtn.position(0, 550);
  resetBtn.mousePressed(resetCamera);

  captureBtn = createButton("capture");
  captureBtn.position(0, 500);
  captureBtn.mousePressed(segmentCurrentFrame); // Set up the captureBtn to capture the frame when pressed

  // Set up video capture
  video = createCapture(VIDEO);
  video.size(640, 480); // Set the video size to match the canvas
  video.hide(); // Hide the default video display as we'll use image() to show it
}

function draw() {
  background(255);

  if (state == "camera") {
    image(video, 0, 0);
  } else if (state == "selection") {
    image(frame, 0, 0);
  } else if (state == "display") {
    displaySegmentedImagesInMultipleLines();
  }
}

function gotResults(r) {
  results = r;
  segmentImages = []; // Clear previous segment images

  // Create and store masked images for all segments
  results.forEach((segment) => {
    let maskedImg = frame.get();
    maskedImg.mask(segment.mask); // Apply the mask to the captured frame

    // Crop the masked image to the bounding box
    let bbox = getBoundingBox(segment.mask);
    let croppedImg = maskedImg.get(bbox.x, bbox.y, bbox.w, bbox.h);

    segmentImages.push({ img: croppedImg, label: segment.label });
  });

  // Switch state to display the segmented images
  state = "display";
}

// Function to get the bounding box of non-transparent pixels in the mask
function getBoundingBox(mask) {
  mask.loadPixels();

  let xMin = mask.width, xMax = 0, yMin = mask.height, yMax = 0;
  for (let y = 0; y < mask.height; y++) {
    for (let x = 0; x < mask.width; x++) {
      let index = (y * mask.width + x) * 4;
      let alphaValue = mask.pixels[index + 3];
      if (alphaValue > 0) { // Non-transparent pixel found
        if (x < xMin) xMin = x;
        if (x > xMax) xMax = x;
        if (y < yMin) yMin = y;
        if (y > yMax) yMax = y;
      }
    }
  }

  // Calculate the width and height of the bounding box
  let bboxWidth = xMax - xMin + 1;
  let bboxHeight = yMax - yMin + 1;

  return { x: xMin, y: yMin, w: bboxWidth, h: bboxHeight };
}

function segmentCurrentFrame() {
  showCamera = false;
  // Capture the current frame from the video
  frame = video.get(); // Save the captured frame
  image(frame, 0, 0);

  // Send the captured frame to the segmentation model
  segmentation.detect(frame, gotResults);
}

function displaySegmentedImagesInMultipleLines() {
  let margin = 10; // Space between segments
  let segmentHeight = 100; // Fixed height for all images
  let xOffset = margin; // Start x position for each row
  let yOffset = margin; // Start y position for the first row
  let canvasWidth = width;

  segmentImages.forEach((segment, index) => {
    // Calculate the width while maintaining the aspect ratio
    let aspectRatio = segment.img.width / segment.img.height;
    let segmentWidth = segmentHeight * aspectRatio;

    // Check if the next image exceeds the canvas width, if so, move to the next row
    if (xOffset + segmentWidth + margin > canvasWidth) {
      xOffset = margin; // Reset x position to the start of the new row
      yOffset += segmentHeight + 30; // Move to the next row (30 pixels for label space)
    }

    // Draw the image
    image(segment.img, xOffset, yOffset, segmentWidth, segmentHeight);

    // Draw the label under the segment
    fill(0);
    textAlign(CENTER);
    text(segment.label, xOffset + segmentWidth / 2, yOffset + segmentHeight + 15);

    // Update the xOffset for the next image
    xOffset += segmentWidth + margin;
  });
}

function resetCamera() {
  showCamera = true;
  frame = null;
  maskedImg = null;
  results = null;
  segmentImages = [];
  clickedSegments = [];
  state = "camera"; // Reset to camera state
}
