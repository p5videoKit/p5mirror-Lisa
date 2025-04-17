let img;
let maskedImg;
let segmentation;
let results;

let segmentImages = [];
let segmentHeight = 100;
let video;
let frame;

let captureBtn, addTextBtn;
let state = "camera"; 
let comicStripContainer;

function preload() {
  segmentation = ml5.imageSegmentation({ feature_extractor_size: 256 });
}

function setup() {
  createCanvas(800, 600);

  captureBtn = createButton("Capture Segment");
  captureBtn.position(10, 550);
  captureBtn.mousePressed(segmentCurrentFrame);

  addTextBtn = createButton("Add Speech/Thought Bubble");
  addTextBtn.position(150, 550);
  addTextBtn.mousePressed(addTextBubble);

  // Create a container for the comic strip elements
  comicStripContainer = createDiv();
  comicStripContainer.position(10, 700);
  comicStripContainer.style('display', 'flex');
  comicStripContainer.style('flex-wrap', 'wrap');
  comicStripContainer.style('gap', '10px');
  
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
}

function draw() {
  background(255);

  if (state == "camera") {
    image(video, 0, 0);
  } else if (state == "selection") {
    image(frame, 0, 0);
  }

  // Display all available segments on the canvas
  displayAvailableSegments();
}

// Function to run segmentation and capture the frame
function segmentCurrentFrame() {
  frame = video.get(); 
  image(frame, 0, 0);

  segmentation.detect(frame, gotResults);
}

// Handling segmentation results
function gotResults(r) {
  results = r;

  results.forEach((segment) => {
    let maskedImg = frame.get();
    maskedImg.mask(segment.mask);

    let bbox = getBoundingBox(segment.mask);
    let croppedImg = maskedImg.get(bbox.x, bbox.y, bbox.w, bbox.h);

    // Store the image segment for user selection
    segmentImages.push({
      img: croppedImg,
      x: 0,  // Position will be set later in displayAvailableSegments
      y: 0,
      w: segmentHeight / croppedImg.height * croppedImg.width,
      h: segmentHeight,
      label: segment.label,
      selected: false // Track if the segment is selected by the user
    });
  });

  state = "selection";
}

// Display all available segments on the canvas
function displayAvailableSegments() {
  let xOffset = 10;
  let yOffset = 10;

  segmentImages.forEach((segment) => {
    image(segment.img, xOffset, yOffset, segment.w, segment.h);
    segment.x = xOffset;
    segment.y = yOffset;

    // If the user selects this segment, add it to the comic strip
    if (segment.selected) {
      // Draw a border around the selected segment
      stroke(0, 255, 0); // Green border
      noFill();
      rect(xOffset, yOffset, segment.w, segment.h);
    } else {
      // No border for unselected segments
      noStroke();
    }

    xOffset += segment.w + 10;

    // Move to next row if necessary
    if (xOffset + segment.w > width) {
      xOffset = 10;
      yOffset += segment.h + 10;
    }
  });
}

// Function to handle mouse clicks for selecting a segment
function mousePressed() {
  segmentImages.forEach((segment) => {
    if (
      mouseX > segment.x &&
      mouseX < segment.x + segment.w &&
      mouseY > segment.y &&
      mouseY < segment.y + segment.h
    ) {
      // Toggle selection
      segment.selected = !segment.selected;

      if (segment.selected) {
        // Add selected segment to the comic strip
        addToComicStrip(segment);
      }
    }
  });
}

// Add the selected segment to the comic strip
function addToComicStrip(segment) {
  let imgElement = createImg(segment.img.canvas.toDataURL(), segment.label);
  imgElement.parent(comicStripContainer);
  imgElement.style('height', '100px'); // Consistent height for all images in the comic strip
  imgElement.style('width', 'auto');
}

// Create a thought/speech bubble div
function addTextBubble() {
  let text = prompt("Enter text for the bubble:");
  
  if (text) {
    let bubble = createDiv(text);
    bubble.parent(comicStripContainer);
    bubble.style('padding', '10px');
    bubble.style('border', '2px solid black');
    bubble.style('border-radius', '15px');
    bubble.style('background-color', '#fff');
    bubble.style('font-size', '16px');
    bubble.style('max-width', '200px');
    bubble.style('height', 'auto');
    bubble.style('white-space', 'normal');
    bubble.style('word-wrap', 'break-word');
  }
}

// Function to get bounding box of non-transparent pixels
function getBoundingBox(mask) {
  mask.loadPixels();

  let xMin = mask.width, xMax = 0, yMin = mask.height, yMax = 0;
  for (let y = 0; y < mask.height; y++) {
    for (let x = 0; x < mask.width; x++) {
      let index = (y * mask.width + x) * 4;
      let alphaValue = mask.pixels[index + 3];
      if (alphaValue > 0) {
        if (x < xMin) xMin = x;
        if (x > xMax) xMax = x;
        if (y < yMin) yMin = y;
        if (y > yMax) yMax = y;
      }
    }
  }

  return { x: xMin, y: yMin, w: xMax - xMin + 1, h: yMax - yMin + 1 };
}
