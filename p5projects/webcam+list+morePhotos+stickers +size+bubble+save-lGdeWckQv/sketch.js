let img;
let maskedImg;
let segmentation;
let results;

let segmentImages = []; 
let segmentHeight = 100;
let stickers = []; 
let draggingSticker = null;
let selectedSticker = null; // store the currently selected sticker for resizing and dialogue

let video;
let frame; // store the captured frame(can capture more than once;-D and they will be added)

let captureBtn, nextStepBtn, enlargeBtn, shrinkBtn, createBubbleBtn, saveBtn;
let state = "camera"; // 'camera', 'selection', 'display', 'sticker'
let showCamera = true;

let bubbles = []; 

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
  enlargeBtn.hide(); 

  shrinkBtn = createButton("shrink");
  shrinkBtn.position(280, 500);
  shrinkBtn.mousePressed(() => resizeSticker(0.9)); // Shrink selected sticker by 10%
  shrinkBtn.hide(); 

  createBubbleBtn = createButton("Create Bubble");
  createBubbleBtn.position(360, 500);
  createBubbleBtn.mousePressed(createBubble); 
  createBubbleBtn.hide(); 
  
  saveBtn = createButton("Save Image");
  saveBtn.position(500, 500);
  saveBtn.mousePressed(saveCanvasImage);
  saveBtn.hide();

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
    displayBubbles();
  }
}

function listSegmentedImages() {
  let margin = 10; 
  let xOffset = margin; 
  let yOffset = margin; 
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
  
  nextStepBtn.show();
}

function gotResults(r) {
  results = r;

  results.forEach((segment) => {
    let maskedImg = frame.get();
    maskedImg.mask(segment.mask); // Apply the mask to the captured frame

    // Crop the masked image to the bounding box
    let bbox = getBoundingBox(segment.mask);
    let croppedImg = maskedImg.get(bbox.x, bbox.y, bbox.w, bbox.h);

    segmentImages.push({
      img: croppedImg,
      label: segment.label,
      x: 0, 
      y: 0,
      dialogue: "" 
    });
  });

  state = "display";
}

//////////remove transparent pixels in the mask////////////
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
        x: segment.x, // use the x position from the former display phase
        y: segment.y, // use the y position from the former display phase
        w: segmentHeight / segment.img.height * segment.img.width, // Retain original size
        h: segmentHeight,
        dragging: false,
        dialogue: segment.dialogue 
      });
    });

    nextStepBtn.hide();
    enlargeBtn.show();
    shrinkBtn.show();
    createBubbleBtn.show();
    saveBtn.show()
  }
}

function displayStickers() {
  stickers.forEach((sticker) => {
    image(sticker.img, sticker.x, sticker.y, sticker.w, sticker.h);

    // drag the sticker耶耶耶
    if (sticker.dragging) {
      sticker.x = mouseX + sticker.dragOffsetX;
      sticker.y = mouseY + sticker.dragOffsetY;
    }
  });
}

function displayBubbles() {
  bubbles.forEach((bubble) => {
    drawDialogueBubble(bubble);

    if (bubble.dragging) {
      bubble.x = mouseX + bubble.dragOffsetX;
      bubble.y = mouseY + bubble.dragOffsetY;

      bubble.input.position(bubble.x + 10, bubble.y + 10);
    }
  });
}

function drawDialogueBubble(bubble) {
  let bubbleWidth = 150;
  let bubbleHeight = 50;

  fill(255);
  stroke(0);
  rect(bubble.x, bubble.y, bubbleWidth, bubbleHeight, 10);
}

function createBubble() {
  if (selectedSticker) {
    let bubble = {
      x: selectedSticker.x + selectedSticker.w + 10,
      y: selectedSticker.y - 20,
      dialogue: "", // start with empty 
      dragging: false, 
      input: createInput() // input field for dialogue
    };

    // put the input field inside the bubble
    bubble.input.position(bubble.x + 10, bubble.y + 10);
    bubble.input.size(130);
    bubble.input.input(() => updateBubble(bubble));

    bubbles.push(bubble);
  }
}

function updateBubble(bubble) {
  bubble.dialogue = bubble.input.value();
}

function mousePressed() {
  // for drag stickers
  stickers.forEach((sticker) => {
    if (mouseX > sticker.x && mouseX < sticker.x + sticker.w &&
        mouseY > sticker.y && mouseY < sticker.y + sticker.h) {
      sticker.dragging = true;
      sticker.dragOffsetX = sticker.x - mouseX;
      sticker.dragOffsetY = sticker.y - mouseY;

      selectedSticker = sticker;
    }
  });

  // for drag the bubbles
  bubbles.forEach((bubble) => {
    if (mouseX > bubble.x && mouseX < bubble.x + 150 &&
        mouseY > bubble.y && mouseY < bubble.y + 50) {
      bubble.dragging = true;
      bubble.dragOffsetX = bubble.x - mouseX;
      bubble.dragOffsetY = bubble.y - mouseY;
    }
  });
}

function mouseReleased() {
  stickers.forEach((sticker) => {
    sticker.dragging = false;
  });

  bubbles.forEach((bubble) => {
    bubble.dragging = false;
  });
}

// resize the currently selected sticker
function resizeSticker(scaleFactor) {
  if (selectedSticker) {
    selectedSticker.w *= scaleFactor;
    selectedSticker.h *= scaleFactor;
  }
}

function saveCanvasImage() {
  saveCanvas('myCanvas', 'png'); // save the canvas as 'myCanvas.png'
}

function resetCamera() {
  showCamera = true;
  frame = null;
  maskedImg = null;
  results = null;
  segmentImages = [];
  stickers = []; 
  bubbles = []; 
  state = "camera"; 

  nextStepBtn.hide();
  enlargeBtn.hide();
  shrinkBtn.hide();
  createBubbleBtn.hide();
}
