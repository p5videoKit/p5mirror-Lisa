let img;
let segmentation;
let results;
let segmentImages = []; // Array to store the segmented images

function preload() {
  img = loadImage("cats.jpg");
  segmentation = ml5.imageSegmentation({ feature_extractor_size: 256 });
}

function setup() {
  createCanvas(640, 480);
  segmentation.detect(img, gotResults);
}

function draw() {
  background(255);

  if (segmentImages.length > 0) {
    let columns = 3; // Number of segments per row
    let margin = 10; // Space between segments
    let segmentWidth = (width - margin * (columns + 1)) / columns;
    let segmentHeight = segmentWidth; // Keeping the aspect ratio

    segmentImages.forEach((segment, index) => {
      let row = Math.floor(index / columns);
      let col = index % columns;

      // Calculate position to keep the original aspect ratio
      let xPos = margin + col * (segmentWidth + margin);
      let yPos = margin + row * (segmentHeight + margin + 20); // Extra space for label

      // Calculate the aspect ratio
      let aspectRatio = segment.img.width / segment.img.height;

      // Adjust the segment height to maintain the aspect ratio
      if (aspectRatio > 1) {
        segmentHeight = segmentWidth / aspectRatio;
      } else {
        segmentWidth = segmentHeight * aspectRatio;
      }

      // Draw the segment image
      image(segment.img, xPos, yPos, segmentWidth, segmentHeight);

      // Draw the label under the segment
      fill(0);
      textAlign(CENTER);
      text(segment.label, xPos + segmentWidth / 2, yPos + segmentHeight + 15);
    });
  } else {
    // Show the original image while the segmentation is being processed
    image(img, 0, 0, width, height);
    fill(0);
    textAlign(CENTER);
    text("Loading...", width / 2, height / 2);
  }
}

function gotResults(r) {
  results = r;
  segmentImages = []; // Clear any previous segment images

  results.forEach((segment, index) => {
    let maskedImg = img.get();
    maskedImg.mask(segment.mask); // Apply the mask to the image
    segmentImages.push({ img: maskedImg, label: segment.label });
  });
}
