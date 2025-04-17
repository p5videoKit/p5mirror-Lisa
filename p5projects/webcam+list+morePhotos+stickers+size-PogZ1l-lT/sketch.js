let img;
let maskedImg;
let segmentation;
let results;

let segmentImages = []; 
let segmentHeight = 100;
let stickers = []; 
let draggingSticker = null;
let selectedSticker = null; // Store the currently selected sticker for resizing

let video;
let frame; // Store the captured frame here

let captureBtn, nextStepBtn, enlargeBtn, shrinkBtn;
let state = "camera"; // 'camera', 'selection', 'display', 'sticker'
let showCamera = true;

function preload() {
  segmentation = ml5.imageSegmentation({ feature_extractor_size: 256 }); // Initialize segmentation model
}

function setup() {
  createCanvas(800, 1600); 

  resetBtn = createButton("reset");
  resetBtn.position(0, 550);
  resetBtn.mousePressed(resetCamera);

  captureBtn = createButton("capture");
  captureBtn.position(0, 500);
  captureBtn.mousePressed(segmentCurrentFrame); // Capture frame

  nextStepBtn = createButton("next step");
  nextStepBtn.position(100, 500);
  nextStepBtn.mousePressed(goToStickerMode); 
  nextStepBtn.hide(); 

  enlargeBtn = createButton("enlarge");
  enlargeBtn.position(200, 500);
  enlargeBtn.mousePressed(() => resizeSticker(1.1)); // Enlarge selected sticker by 10%
  enlargeBtn.hide(); // Hide until sticker mode

  shrinkBtn = createButton("shrink");
  shrinkBtn.position(300, 500);
  shrinkBtn.mousePressed(() => resizeSticker(0.9)); // Shrink selected sticker by 10%
  shrinkBtn.hide(); 

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
  } else if (state == "display") {
    listSegmentedImages();
  } else if (state == "sticker") {
    displayStickers();
  }
}

function listSegmentedImages() {
  let margin = 10; 
  let xOffset = margin; // Start y position for the first row
  let canvasWidth = width;

  segmentImages.forEach((segment, index) => {
    let Oratio = segment.img.width / segment.img.height;
    let segmentWidth = segmentHeight * Oratio;

    if (xOffset + segmentWidth + margin > canvasWidth) {
      xOffset = margin;
      yOffset += segmentHeight + 30;
    }

    segment.x = xOffset;
    segment.y = yOffset;//一会儿sticker有用

    image(segment.img, segment.x, segment.y, segmentWidth, segmentHeight);

    fill(0);
    textAlign(CENTER);
    text(segment.label, segment.x + segmentWidth / 2, segment.y + segmentHeight + 15);//the label

    xOffset += segmentWidth + margin;
  });

 /////// Show the "Next Step" button after the images are listed
  nextStepBtn.show();
}

function gotResults(r) {
  results = r;

  // Create and store masked images for all segments
  results.forEach((segment) => {
    let maskedImg = frame.get();
    maskedImg.mask(segment.mask); // Apply the mask to the captured frame

    let bbox = getBoundingBox(segment.mask);
    let croppedImg = maskedImg.get(bbox.x, bbox.y, bbox.w, bbox.h);

    segmentImages.push({
      img: croppedImg,
      label: segment.label,
      x: 0, 
      y: 0
    });
  });

  state = "display";
}

// remove transparent pixels in the mask
function getBoundingBox(mask) {
  mask.loadPixels();

  let xMin = mask.width, xMax = 0, yMin = mask.height, yMax = 0;
  for (let y = 0; y < mask.height; y++) {
    for (let x = 0; x < mask.width; x++) {
      let index = (y * mask.width + x) * 4;
      let alphaValue = mask.pixels[index + 3];
      if (alphaValue > 0) { // non-transparent pixel 
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

function goToStickerMode() {
  if (segmentImages.length > 0) {
    state = "sticker";

    // Convert each segmented image into a draggable sticker using the original positions
    segmentImages.forEach((segment) => {
      stickers.push({
        img: segment.img,
        x: segment.x, // Use the x position from the display phase
        y: segment.y, // Use the y position from the display phase
        w: segmentHeight / segment.img.height * segment.img.width, // Retain original size
        h: segmentHeight,
        dragging: false,
      });
    });

    // Hide the "Next Step" button and show the resize buttons
    nextStepBtn.hide();
    enlargeBtn.show();
    shrinkBtn.show();
  }
}

function displayStickers() {
  stickers.forEach((sticker) => {
    // Draw the sticker
    image(sticker.img, sticker.x, sticker.y, sticker.w, sticker.h);

    // If the sticker is being dragged, update its position
    if (sticker.dragging) {
      sticker.x = mouseX + sticker.dragOffsetX;
      sticker.y = mouseY + sticker.dragOffsetY;
    }
  });
}

function mousePressed() {
  stickers.forEach((sticker) => {
    // Check if the mouse is over the sticker
    if (mouseX > sticker.x && mouseX < sticker.x + sticker.w &&
        mouseY > sticker.y && mouseY < sticker.y + sticker.h) {
      sticker.dragging = true;
      sticker.dragOffsetX = sticker.x - mouseX;
      sticker.dragOffsetY = sticker.y - mouseY;

      // for resizing
      selectedSticker = sticker;
    }
  });
}

function mouseReleased() {
  stickers.forEach((sticker) => {
    sticker.dragging = false;
  });
}

function resizeSticker(scaleFactor) {
  if (selectedSticker) {
    selectedSticker.w *= scaleFactor;
    selectedSticker.h *= scaleFactor;
  }
}

function resetCamera() {
  showCamera = true;
  frame = null;
  maskedImg = null;
  results = null;
  segmentImages = [];
  stickers = []; // Clear stickers on reset
  state = "camera"; // Reset to camera state

  // Hide the "Next Step" and resize buttons
  nextStepBtn.hide();
  enlargeBtn.hide();
  shrinkBtn.hide();
}
