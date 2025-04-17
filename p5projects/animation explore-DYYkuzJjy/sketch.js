// Note: this sketch consists of additional JavaScript
// files. Make sure to duplicate it, rather than copying
// and pasting code :)

let local_sd_api = "https://gpu.gohai.xyz:3000/";

let drawingLayer; // this holds our input image
let sdLayer; // this holds our output image

let angle = 0;
let x=20
let img

function preload(){
  img=loadImage("girl.png")
}

function setup() {
  createCanvas(500, 500);
  drawingLayer = createGraphics(width, height);
  
  requestLSD("GET", "sdapi/v1/options", gotOptions);
  
  // this sketch doesn't call loop automatically
  // but manually after each time we get a result
  // back from SD
  noLoop();
  redraw();
  
  // make the GIF play back with 1 fps
  setupGif(5);
}

function gotOptions(results) {
  console.log("Current model " + results.sd_model_checkpoint);

  // for inpainting, we want to use this model
  if (
    results.sd_model_checkpoint != "ssd-v1-5-inpainting.ckpt [c6bbc15e32]"
  ) {
    selectModel("sd-v1-5-inpainting.ckpt [c6bbc15e32]");
  }
}
// function gotOptions(results) {
//   console.log("Current model " + results.sd_model_checkpoint);

//   // for inpainting, we want to use this model
//   if (
//     results.sd_model_checkpoint != "v1-5-pruned-emaonly.ckpt [cc6cb27103]"
//   ) {
//     selectModel("v1-5-pruned-emaonly.ckpt [cc6cb27103]");
//   } else {
//     modelReady();
//   }
// }

function selectModel(sd_model_checkpoint) {
  let options = {
    sd_model_checkpoint: sd_model_checkpoint,
  };

  console.log("Changing to " + sd_model_checkpoint);
  requestLSD("POST", "sdapi/v1/options", options);
}

function draw() {
  // this starts the recording of what gets drawn to the screen
  beginGif();

  // set the background to white
  background(255);
  
  // do our drawing in one layer
  drawingLayer.background(255,255,255);
  //drawingLayer.push();
  //drawingLayer.translate(width/2, height/2);
  //drawingLayer.rotate(radians(angle));
  //drawingLayer.noStroke();
  //drawingLayer.fill("red");
  
  drawingLayer.fill(80)
  drawingLayer.rect(0, 0, width, height);
  drawingLayer.fill(20)
  drawingLayer.ellipse(x,250,20,50)
  //drawingLayer.image(img,-50+x,100,300,280)
  //drawingLayer.pop();
 // angle = angle + 5;
  
  image(drawingLayer, 0, 0);
  
  // send a new request to SD
  if(mouseIsPressed){
  img2img(
    "A cartoon of  (only one) cute big flying bee,<lora:CalvinandHobbes:1>",
    donePredicting,
    drawingLayer,
    drawingLayer
  );
    
}
  console.log(x)
  // else{
  //   img2img(
  //   "a cute tree in pixel art with varied colors experiencing one of these seasons: spring, winter, summer, autumn, ",
  //   donePredicting,
  //   sdLayer,
  //   sdLayer
  // ) 
  // }
  
  // while we wait, display the last image received
  if (sdLayer) {
    image(sdLayer, 0, 0, width, height);
  }
  
  // end the GIF after e.g. 15 frames
  endGif(30);
}

function mousePressed() {
  x += 20;
  redraw();
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
    "negative_prompt": "mutiple, many bees, chaotic",
    init_images: [srcImg],
    inpaint_full_res: false,
    //width: srcWidth,
    //height: srcHeight,
    "seed": 420,
    //"subseed": 10000,
    //"subseed_strength": 10000,
    "inpainting_mask_invert": 1,
    // "Denoising_strength":0.6,
     "sampling_steps":111
  };

  if (mask) {
    mask.loadPixels();
    modelInput.mask = mask.canvas.toDataURL();
  }

  requestLSD("POST", "sdapi/v1/img2img", modelInput, callback);
  console.log("Generating new image");
}
