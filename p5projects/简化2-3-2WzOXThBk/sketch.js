let img;
let maskedImg;
let segmentation;
let results;

let segments = []; // Store all the segmented parts
let clickedSegments = []; // Store segments that have been clicked
let bubbles = []; // Store the bubbles associated with the images
let video;
let frame; // Store the captured frame here

let captureBtn, resetBtn, createBubbleBtn, submitTextBtn;
let inputBox;
let state = "camera";
let showCamera = true;

let maxSelections = 4; // Limit to 4 images
let selectedCount = 0; // Keep track of how many images have been selected

function preload() {
  segmentation = ml5.imageSegmentation({ feature_extractor_size: 256 }); // Initialize segmentation model
}

function setup() {
  createCanvas(640, 480);

  captureBtn = createButton("capture");
  captureBtn.position(10, 500);
  captureBtn.mousePressed(segmentCurrentFrame); // Capture frame when pressed

  resetBtn = createButton("reset");
  resetBtn.position(100, 500);
  resetBtn.mousePressed(resetCamera);
  resetBtn.hide(); // Hide initially since we're in camera mode

  createBubbleBtn = createButton("Create Bubble");
  createBubbleBtn.position(200, 500);
  createBubbleBtn.mousePressed(showInputBox);
  createBubbleBtn.hide(); // Hide initially and show when all images are selected

  // Input box and submit button for bubble text entry
  inputBox = createInput('');
  inputBox.position(10, 550);
  inputBox.size(200, 30);
  inputBox.hide(); // Hide input initially

  submitTextBtn = createButton("Submit");
  submitTextBtn.position(220, 550);
  submitTextBtn.mousePressed(submitBubbleText);
  submitTextBtn.hide(); // Hide submit button initially

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
    drawComicGrid(); // Draw the grid for comic strip
    displaySelectedSegments(); // Display selected images in the grid layout
    displayBubbles(); // Display bubbles associated with images
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

    // Update the segment's position for bubble positioning
    segment.x = x;
    segment.y = y;
    segment.w = gridWidth - 2 * margin;
    segment.h = gridHeight - 2 * margin;
  });
}

// Display bubbles associated with selected images
function displayBubbles() {
  bubbles.forEach((bubble) => {
    let segment = clickedSegments[bubble.index]; // Get the associated image segment
    if (segment) {
      let bubbleX = segment.x + segment.w + 10; // Position bubble next to image
      let bubbleY = segment.y + 10;

      fill(255);
      stroke(0);
      strokeWeight(1);
      rect(bubbleX, bubbleY, 120, 60, 10); // Draw bubble rectangle

      fill(0);
      noStroke();
      textSize(14);
      text(bubble.text, bubbleX + 10, bubbleY + 20, 100, 50); // Text inside the bubble
    }
  });
}

// Show the input box when "Create Bubble" button is clicked
function showInputBox() {
  inputBox.show();
  submitTextBtn.show();
}

// Handle submission of text and creation of bubble
function submitBubbleText() {
  let text = inputBox.value(); // Get text from the input box

  if (text && selectedCount > 0) {
    let index = floor(random(0, selectedCount)); // Randomly associate with one of the selected images
    bubbles.push({
      text: text,
      index: index, // Associate bubble with a specific image
    });

    inputBox.value(''); // Clear the input box after submission
    inputBox.hide(); // Hide input box after submission
    submitTextBtn.hide(); // Hide submit button after submission
  }
}

// Draw grid lines for the comic strip
function drawComicGrid() {
  stroke(0); // Black stroke for grid lines
  strokeWeight(2);

  // Vertical lines
  line(width / 2, 0, width / 2, height);
  
  // Horizontal lines
  line(0, height / 2, width, height / 2);
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

      // Log selection progress
      console.log(`${selectedCount}/${maxSelections} selected`);

      // If we've selected 4 segments, switch to grid display
      if (selectedCount === maxSelections) {
        captureBtn.hide(); // Hide capture button when all images are selected
        state = "displayGrid";
        resetBtn.show(); // Show reset button to allow resetting
        createBubbleBtn.show(); // Show the bubble creation button
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
  bubbles = []; // Clear all bubbles on reset
  selectedCount = 0;
  state = "camera";

  captureBtn.show(); // Show capture button again
  resetBtn.hide(); // Hide reset button in camera mode
  createBubbleBtn.hide(); // Hide bubble button on reset
  inputBox.hide(); // Hide input box on reset
  submitTextBtn.hide(); // Hide submit button on reset
}
