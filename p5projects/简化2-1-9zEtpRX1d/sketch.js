let img;
let maskedImg;
let segmentation;
let results;

let segments = []; // Store all the segmented parts
let clickedSegments = []; // Store segments that have been clicked
let video;
let frame; // Store the captured frame here

let captureBtn;
let state = "camera";
let showCamera = true;

let maxSelections = 4; // Limit to 4 images
let selectedCount = 0; // Keep track of how many images have been selected

function preload() {
  segmentation = ml5.imageSegmentation({ feature_extractor_size: 256 }); // Initialize segmentation model
}

function setup() {
  createCanvas(640, 480);

  resetBtn = createButton("reset");
  resetBtn.position(0, 550);
  resetBtn.mousePressed(resetCamera);

  captureBtn = createButton("capture");
  captureBtn.position(0, 500);
  captureBtn.mousePressed(segmentCurrentFrame); // Capture frame when pressed

  // Set up video capture
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide(); // Hide the video display as we will use the captured frame
}

function draw() {
  if (state == "camera") {
    image(video, 0, 0);
  } else if (state == "selection") {
    image(frame, 0, 0);
    displayHoveredSegment(); // Show hovered segment with a tint
  } else if (state == "displayGrid") {
    background(255);
    displaySelectedSegments(); // Display selected images in a grid layout
  }
}

// Display the selected image segments in a 2x2 grid
function displaySelectedSegments() {
  let gridSize = 2;
  let gridWidth = width / gridSize;
  let gridHeight = height / gridSize;
  let margin = 10;

  clickedSegments.forEach((segment, index) => {
    let col = index % gridSize; // Determine column (0 or 1)
    let row = Math.floor(index / gridSize); // Determine row (0 or 1)

    let x = col * gridWidth + margin;
    let y = row * gridHeight + margin;

    // Display each selected segment in a grid slot
    image(segment.img, x, y, gridWidth - 2 * margin, gridHeight - 2 * margin);
  });
}

// Handle segmentation and add images to be selected
function gotResults(r) {
  results = r;
  state = "selection";
}

// Capture the current frame from the video and run segmentation
function segmentCurrentFrame() {
  showCamera = false;
  frame = video.get(); // Save the captured frame
  image(frame, 0, 0);
  segmentation.detect(frame, gotResults);
}

// Handle mouse press for selecting segments
function mousePressed() {
  if (state == "selection" && selectedCount < maxSelections) {
    let clickedSegment = getSegmentAtMouse(results, mouseX, mouseY);
    if (clickedSegment) {
      maskedImg = frame.get(); // Apply the mask on the captured frame
      maskedImg.mask(clickedSegment.mask);

      clickedSegments.push({
        img: maskedImg,
      });

      selectedCount++;

      // If we've selected 4 segments, switch to grid display
      if (selectedCount === maxSelections) {
        state = "displayGrid";
      }
    }
  }
}

// Check if the mouse is over a segment
function getSegmentAtMouse(segments, x, y) {
  for (let i = 0; i < segments.length; i++) {
    let mask = segments[i].mask;
    mask.loadPixels();

    let index = (y * mask.width + x) * 4;
    if (mask.pixels[index + 3] > 128) { // Check alpha channel
      return segments[i];
    }
  }
  return null;
}

// Show hovered segment with a green tint
function displayHoveredSegment() {
  for (let i = 0; i < results.length; i++) {
    let pixel = results[i].mask.get(mouseX, mouseY);
    if (alpha(pixel) == 255) {
      let maskedImg = frame.get();
      maskedImg.mask(results[i].mask);
      tint(0, 255, 0, 100); // Green tint on hover
      image(maskedImg, 0, 0);
      noTint();
    }
  }
}

function resetCamera() {
  showCamera = true;
  frame = null;
  maskedImg = null;
  results = null;
  clickedSegments = [];
  selectedCount = 0;
  state = "camera";
}
