// Note: this sketch consists of additional JavaScript
// files. Make sure to duplicate it, rather than copying
// and pasting code :)

let local_sd_api = "https://gpu.gohai.xyz:3000/";
let img;

function setup() {
  createCanvas(400, 400);

  requestLSD("GET", "sdapi/v1/options", gotOptions);
}

function gotOptions(results) {
  console.log("Current model " + results.sd_model_checkpoint);

  // for inpainting, we want to use this model
  if (
    results.sd_model_checkpoint != "sd-v1-5-inpainting.ckpt [c6bbc15e32]"
  ) {
    selectModel("sd-v1-5-inpainting.ckpt [c6bbc15e32]");
  } else {
    modelReady();
  }
}

function selectModel(sd_model_checkpoint) {
  let options = {
    sd_model_checkpoint: sd_model_checkpoint,
  };

  console.log("Changing to " + sd_model_checkpoint);
  requestLSD("POST", "sdapi/v1/options", options, modelReady);
}

function modelReady() {
  // 0.5 is the "weight" to apply to the LORA
  // "barbiecore" is the activation word

  let modelInput = {
    prompt: " <lora:peanutsstyle:1.0> <lora:add_detail:1>, go to the school, walking, smile, sunshine, cute",
    
    // for more parameters, see the WebUI and results.parameters
  };

  requestLSD(
    "POST",
    "sdapi/v1/txt2img",
    modelInput,
    donePredicting
  );

  console.log("Starting prediction, this might take a bit");
}

function donePredicting(results) {
  console.log(results);
  if (results && results.images.length > 0) {
    img = loadImage('data:image/png;base64,' + results.images[0]);
  }
}

function draw() {
  background(220);

  if (img) {
    imageMode(CENTER);
    image(img, mouseX, mouseY, img.width / 2, img.height / 2);
  }
}
