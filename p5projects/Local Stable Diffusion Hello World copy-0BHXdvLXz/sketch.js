// Note: this sketch consists of additional JavaScript
// files. Make sure to duplicate it, rather than copying
// and pasting code :)

let local_sd_api = "https://gpu.gohai.xyz:3000/";
let img;

function setup() {
  createCanvas(400, 400);

  //listModels();

  // first, ask the API which model is currently selected
  // (continue reading in gotOptions)
  requestLSD("GET", "sdapi/v1/options", gotOptions);
}

function gotOptions(results) {
  console.log("Current model " + results.sd_model_checkpoint);

  // if the model is what we want it to be, we call the modelReady() function
  // otherwise we first call the selectModel() function
  if (
    results.sd_model_checkpoint != "sd_xl_refiner_1.0.safetensors [7440042bbd]"
  ) {
    selectModel("sd_xl_refiner_1.0.safetensors [7440042bbd]");
  } else {
    modelReady();
  }
}

// this function loads a specified model (checkpoint)
// you could use it to set other options also
// use listModels() to get a list of all available model checkpoints
function selectModel(sd_model_checkpoint) {
  let options = {
    sd_model_checkpoint: sd_model_checkpoint,
  };

  console.log("Changing to " + sd_model_checkpoint);
  requestLSD("POST", "sdapi/v1/options", options, modelReady);
}

// when this function gets executed we should have the
// correct model loaded, so we're ready to do some prediction!
function modelReady() {
  let modelInput = {
    prompt: "An astronaut riding a rainbow unicorn",
    // for more parameters, see the WebUI and results.parameters
  };

  requestLSD("POST", "sdapi/v1/txt2img", modelInput, donePredicting);

  console.log("Starting prediction, this might take a bit");
}

function donePredicting(results) {
  console.log(results);
  if (results && results.images.length > 0) {
    img = loadImage("data:image/png;base64," + results.images[0]);
  }
}

function draw() {
  background(220);

  if (img) {
    imageMode(CENTER);
    image(img, mouseX, mouseY, img.width / 2, img.height / 2);
  }
}

function listModels() {
  requestLSD("GET", "sdapi/v1/sd-models", gotModels);
}

function gotModels(results) {
  let model_checkpoints = [];
  for (let i = 0; i < results.length; i++) {
    model_checkpoints.push(results[i].title);
  }
  console.log("Available models: ", model_checkpoints);
}
