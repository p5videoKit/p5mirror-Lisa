// Note: this sketch consists of additional JavaScript
// files. Make sure to duplicate it, rather than copying
// and pasting code :)

let local_sd_api = "https://gpu.gohai.xyz:3000/";

let drawingLayer; // this holds our input image
let sdLayer; // this holds our output image

let angle = 0;

function setup() {
  createCanvas(400, 400);
  drawingLayer = createGraphics(width, height);
  
  requestLSD("GET", "sdapi/v1/options", gotOptions);
  
  // this sketch doesn't call loop automatically
  // but manually after each time we get a result
  // back from SD
  noLoop();
  redraw();
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
  
  // do our drawing in one layer
  drawingLayer.background(255);
  drawingLayer.push();
  drawingLayer.translate(width/2, height/2);
  drawingLayer.rotate(radians(angle));
  drawingLayer.noStroke();
  drawingLayer.fill("green");
  drawingLayer.rect(-100, -20, 200, 40);
  drawingLayer.pop();
  angle = angle + 5;
  
  image(drawingLayer, 0, 0);
  
  // send a new request to SD
  img2img(
    "Photograph of green moss",
    donePredicting,
    drawingLayer,
    drawingLayer
  );
  
  // while we wait, display the last image received
  if (sdLayer) {
    image(sdLayer, 0, 0, width, height);
  }
}

function donePredicting(results) {
  //console.log(results);
  if (results && results.images.length > 0) {
    sdLayer = loadImage("data:image/png;base64," + results.images[0], imageLoaded);
    console.log("Received inpainted image");
  }
}

function imageLoaded() {
  // we can display the received image, call draw()
  // again for the next frame
  redraw();
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
    "negative_prompt": "text",
    init_images: [srcImg],
    inpaint_full_res: false,
    //width: srcWidth,
    //height: srcHeight,
    //"seed": 1,
    //"subseed": 1,
    //"subseed_strength": 0,
    "inpainting_mask_invert": 1,
  };

  if (mask) {
    mask.loadPixels();
    modelInput.mask = mask.canvas.toDataURL();
  }

  requestLSD("POST", "sdapi/v1/img2img", modelInput, callback);
  console.log("Generating new image");
}
