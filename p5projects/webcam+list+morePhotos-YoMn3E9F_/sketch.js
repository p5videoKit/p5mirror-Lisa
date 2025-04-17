let img;
let maskedImg;
let segmentation;
let results;

let segmentImages = []; 
let clickedSegments = []; 

let video;
let frame; // Store the captured frame here

let captureBtn;
let state = "camera"; // GH: or 'selection', 'display', 'drawing'
let showCamera = true;

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
  video.size(800, 600); 
  video.hide(); 
}

function draw() {
  background(255);

  if (state == "camera") {
    image(video, 0, 0);
  } else if (state == "selection") {
    image(frame, 0, 0);
  } else if (state == "display") {
    listSegmentedImages();
  }
}

function gotResults(r) {
  results = r;

  results.forEach((segment) => {
    let maskedImg = frame.get();
    maskedImg.mask(segment.mask); // Apply the mask to the captured frame

    let bbox = getBoundingBox(segment.mask);
    let croppedImg = maskedImg.get(bbox.x, bbox.y, bbox.w, bbox.h);

    segmentImages.push({ img: croppedImg, label: segment.label });
  });

  state = "display";
}

// remove non-transparent pixels in the mask
function getBoundingBox(mask) {
  mask.loadPixels();

  let xMin = mask.width, xMax = 0, yMin = mask.height, yMax = 0;
  for (let y = 0; y < mask.height; y++) {
    for (let x = 0; x < mask.width; x++) {
      let index = (y * mask.width + x) * 4;
      let alphaValue = mask.pixels[index + 3];
      if (alphaValue > 0) { // if we can find non-transparent pixel
        if (x < xMin) xMin = x;
        if (x > xMax) xMax = x;
        if (y < yMin) yMin = y;
        if (y > yMax) yMax = y;
      }
    }
  }

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

function listSegmentedImages() {
  let margin = 10; // Space between segments
  let segmentHeight = 100; // Fixed height for all images
  let xOffset = margin; // Start x position for each row
  let yOffset = margin; // Start y position for the first row
  let canvasWidth = width;

  segmentImages.forEach((segment, index) => {
    let Oratio = segment.img.width / segment.img.height;
    let segmentWidth = segmentHeight * Oratio;

    if (xOffset + segmentWidth + margin > canvasWidth) {
      xOffset = margin; 
      yOffset += segmentHeight + 30; 
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
  segmentImages = []; // Reset the images list when reset is clicked
  //clickedSegments = [];
  state = "camera"; // Reset to camera state
}

