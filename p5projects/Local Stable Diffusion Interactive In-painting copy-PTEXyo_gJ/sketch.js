// Note: this sketch consists of additional JavaScript
// files. Make sure to duplicate it, rather than copying
// and pasting code :)

let local_sd_api = "https://gpu.gohai.xyz:3000/";

let drawingLayer; // this holds our input image
let maskLayer; // this holds our mask image
let sdLayer; // this holds our output image

let currentLayer;
let currentColor;
let currentSize;

function setup() {
  createCanvas(400, 400);
  drawingLayer = createGraphics(width, height);
  drawingLayer.background(255);

  // set our "current" layer to the drawing initially
  currentLayer = drawingLayer;
  currentColor = color(0);
  currentSize = 20;

  requestLSD("GET", "sdapi/v1/options", gotOptions);
}

function gotOptions(results) {
  console.log("Current model " + results.sd_model_checkpoint);

  // for inpainting, we want to use this model
  if (
    results.sd_model_checkpoint != "sd-v1-5-inpainting.ckpt [c6bbc15e32]"
  ) {
    selectModel("sd-v1-5-inpainting.ckpt [c6bbc15e32]");
  }
}

function selectModel(sd_model_checkpoint) {
  let options = {
    sd_model_checkpoint: sd_model_checkpoint,
  };

  console.log("Changing to " + sd_model_checkpoint);
  requestLSD("POST", "sdapi/v1/options", options);
}

function draw() {
  // set the background to white
  background(255);

  // add the "current" layer (either the drawing or the mask)
  if (mouseIsPressed) {
    // clear the stable diffusion image
    if (sdLayer) {
      sdLayer = null;
    }
    if (currentLayer == drawingLayer) {
      currentLayer.stroke(currentColor);      
    } else {
      if (red(currentColor) == 255 && green(currentColor) == 255 && blue(currentColor) == 255) {
        currentLayer.stroke(0, 0, 0);
      } else {
        currentLayer.stroke(255, 0, 0);
      }
    }
    currentLayer.strokeWeight(currentSize);
    currentLayer.line(pmouseX, pmouseY, mouseX, mouseY);
  }
  image(drawingLayer, 0, 0);
  if (maskLayer) {
    tint(255, 0, 0, 128);
    image(maskLayer, 0, 0);    
    tint(255, 255);
  }

  fill(0);
  if (currentLayer == drawingLayer) {
    text("Drawing", 10, 10);
  } else {
    text("Mask", 10, 10);
  }

  // add the stable diffusion image
  if (sdLayer) {
    image(sdLayer, 0, 0, width, height);
  }
  
  noFill();
  ellipse(mouseX, mouseY, currentSize, currentSize);
}

function keyPressed() {
  if (keyCode == ENTER) {
    img2img(
      "An astronaut riding a rainbow unicorn",
      donePredicting,
      false,//drawingLayer,
      maskLayer
    );
  } else if (key == ' ') {
    if (currentLayer == drawingLayer) {
      // create the mask layer first time we switch to it
      if (!maskLayer) {
        maskLayer = createGraphics(width, height);
        maskLayer.background(255);
        console.log("Created a mask layer");
      }
      currentLayer = maskLayer;
    } else {
      currentLayer = drawingLayer;
    }
  } else if (key == 'r' || key == 'R') {
    currentColor = color(255, 0, 0);
  } else if (key == 'g' || key == 'G') {
    currentColor = color(0, 255, 0);
  } else if (key == 'B') {
    currentColor = color(0, 0, 255);
  } else if (key == 'w' || key == 'W') {
    currentColor = color(255);
  } else if (key == 'b') {
    currentColor = color(0);
  } else if (key == '[') {
    if (currentSize > 1) {
      currentSize--;
    }
  } else if (key == ']') {
    currentSize++;
  } else if (key == 'i' || key == 'I') {
    maskLayer.loadPixels();
    for (let i=0; i < maskLayer.pixels.length; i += 4) {
      maskLayer.pixels[i+0] = 255-maskLayer.pixels[i+0];
      maskLayer.pixels[i+1] = 255-maskLayer.pixels[i+1];
      maskLayer.pixels[i+2] = 255-maskLayer.pixels[i+2];
    }
    maskLayer.updatePixels();
  }
}

function donePredicting(results) {
  //console.log(results);
  if (results && results.images.length > 0) {
    sdLayer = loadImage("data:image/png;base64," + results.images[0]);
    console.log("Received inpainted image");
  }
}

// prompt ... string
// callback ... name of function to be called when prediction is done
// src ... (optional) p5.Image or p5.Graphics for source (default: current canvas content)
// mask ... (optional) p5.Image or p5.Graphics for mask (black = keep, white = replace)

function img2img(prompt, callback, src, mask) {
  let srcImg;
  let srcWidth;
  let srcHeight;

  if (src) {
    src.loadPixels();
    srcImg = src.canvas.toDataURL();
    srcWidth = src.canvas.width;
    srcHeight = src.canvas.height;
  } else {
    loadPixels();
    srcImg = drawingContext.canvas.toDataURL();
    srcWidth = drawingContext.canvas.width;
    srcHeight = drawingContext.canvas.height;
  }

  let modelInput = {
    prompt: prompt,
    //"negative_prompt": "",
    init_images: [srcImg],
    inpaint_full_res: false,
    //width: srcWidth,
    //height: srcHeight,
    //"seed": 1,
    //"subseed": 1,
    //"subseed_strength": 0,
  };

  if (mask) {
    mask.loadPixels();
    modelInput.mask = mask.canvas.toDataURL();
  }

  requestLSD("POST", "sdapi/v1/img2img", modelInput, callback);
  console.log("Generating new image");
}
