let img;
let maskedImg;
let segmentation;
let results;

let stickers = [];
let draggingSticker = null;
let selectedSticker = null; // store the currently selected sticker for resizing and dialogue

let video;
let frame;

let captureBtn, enlargeBtn, shrinkBtn, createBubbleBtn, saveBtn;
let state = "camera"; // 'camera' or 'sticker'
let showCamera = true;

let bubbles = [];

function preload() {
  segmentation = ml5.imageSegmentation({ feature_extractor_size: 256 }); // Initialize segmentation model
}

function setup() {
  createCanvas(800, 1600);

  captureBtn = createButton("capture");
  captureBtn.position(0, 10);
  captureBtn.mousePressed(segmentCurrentFrame); // Capture frame

  enlargeBtn = createButton("+");
  enlargeBtn.position(100, 10);
  enlargeBtn.mousePressed(() => resizeSticker(1.1)); // Enlarge selected sticker by 10%
  enlargeBtn.hide();

  shrinkBtn = createButton("-");
  shrinkBtn.position(150, 10);
  shrinkBtn.mousePressed(() => resizeSticker(0.9)); // Shrink selected sticker by 10%
  shrinkBtn.hide();

  createBubbleBtn = createButton("Create Bubble");
  createBubbleBtn.position(200, 10);
  createBubbleBtn.mousePressed(createBubble);
  createBubbleBtn.hide();

  saveBtn = createButton("Save Image");
  saveBtn.position(340, 10);
  saveBtn.mousePressed(saveCanvasImage);
  saveBtn.hide();

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // Create a container for the segmented images
  let segmentsContainer = createDiv();
  segmentsContainer.id('segmentsContainer');
  segmentsContainer.position(0, 500);
  segmentsContainer.style('display', 'flex'); // Flexbox layout for images
  segmentsContainer.style('flex-wrap', 'wrap'); // Wrap images to new lines if needed
}

function draw() {
  background(255);

  if (state == "camera") {
    image(video, 0, 0);
  } else if (state == "sticker") {
    displayBubbles();
  }
}

function gotResults(r) {
  results = r;

  // Clear any previous segment images
  stickers = [];
  document.getElementById('segmentsContainer').innerHTML = ''; // Clear previous images

  results.forEach((segment, index) => {
    let maskedImg = frame.get();
    maskedImg.mask(segment.mask); 

    // Crop the masked image
    let bbox = getBoundingBox(segment.mask);
    let croppedImg = maskedImg.get(bbox.x, bbox.y, bbox.w, bbox.h);

    // Convert the p5.js image to a data URL
    let dataUrl = croppedImg.canvas.toDataURL();

    // Create an <img> element and add it to the segments container
    let imgElement = createImg(dataUrl);
    imgElement.style('height', '100px'); // Adjust size as needed
    imgElement.parent('segmentsContainer'); // Append to the container

    // Add to the stickers array for interaction later
    stickers.push({
      imgElement,
      x: 0,
      y: 0,
      w: croppedImg.width,
      h: croppedImg.height,
      dialogue: '',
      dragging: false
    });
  });

  state = "sticker";
  enlargeBtn.show();
  shrinkBtn.show();
  createBubbleBtn.show();
  saveBtn.show();
}

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

  let bboxWidth = xMax - xMin + 1;
  let bboxHeight = yMax - yMin + 1;

  return { x: xMin, y: yMin, w: bboxWidth, h: bboxHeight };
}

function segmentCurrentFrame() {
  showCamera = false;
  frame = video.get();
  image(frame, 0, 0);

  segmentation.detect(frame, gotResults);
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
  let bubbleWidth = 180;
  let bubbleHeight = 50;

  fill(255);
  stroke(0);
  rect(bubble.x, bubble.y, bubbleWidth, bubbleHeight, 10);
}

function createBubble() {
  if (selectedSticker) {
    let bubble = {
      x: selectedSticker.imgElement.position().x + selectedSticker.w + 10,
      y: selectedSticker.imgElement.position().y - 20,
      dialogue: '',
      dragging: false,
      input: createInput()
    };

    bubble.input.position(bubble.x + 10, bubble.y + 10);
    bubble.input.size(150);
    bubble.input.input(() => updateBubble(bubble));

    bubbles.push(bubble);
  }
}

function updateBubble(bubble) {
  bubble.dialogue = bubble.input.value();
}

function mousePressed() {
  // Check for dragging stickers
  stickers.forEach((sticker) => {
    let imgPos = sticker.imgElement.position();
    let imgWidth = sticker.imgElement.width;
    let imgHeight = sticker.imgElement.height;

    if (
      mouseX > imgPos.x &&
      mouseX < imgPos.x + imgWidth &&
      mouseY > imgPos.y &&
      mouseY < imgPos.y + imgHeight
    ) {
      sticker.dragging = true;
      sticker.dragOffsetX = imgPos.x - mouseX;
      sticker.dragOffsetY = imgPos.y - mouseY;

      selectedSticker = sticker;
    }
  });

  // Check for dragging bubbles
  bubbles.forEach((bubble) => {
    if (
      mouseX > bubble.x &&
      mouseX < bubble.x + 150 &&
      mouseY > bubble.y &&
      mouseY < bubble.y + 50
    ) {
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

function resizeSticker(scaleFactor) {
  if (selectedSticker) {
    let currentWidth = selectedSticker.imgElement.width;
    let currentHeight = selectedSticker.imgElement.height;
    selectedSticker.imgElement.size(currentWidth * scaleFactor, currentHeight * scaleFactor);
  }
}

function saveCanvasImage() {
  saveCanvas('myCanvas', 'png');
}
