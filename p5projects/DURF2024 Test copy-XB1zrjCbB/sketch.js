// Getting started with transformers.js in p5.js
// Gottfried Haider
// based on https://editor.p5js.org/jonathan.ai/sketches/O8mvwJtfp

let model; // this variable will contain the model loaded in preload()
let result; // gotResults() will store the most recent result there
let img;

// asynchronously load transformers.js and instantiate model
async function preload() {
  img = await loadImage("cats-400.png");

  //version 3, haven't released
  let transformers = await import(
    "https://cdn.jsdelivr.net/npm/@gohai/transformers@3.0.0-alpha.0"
  );
  
  //version 2
//   let transformers = await import(
//     "https://cdn.jsdelivr.net/npm/@xenova/transformers@2"
//   );
  
//   console.log("transformers.js version " + transformers.env.version);

  // the task (e.g. "sentiment-analysis") and specific model to use for it
  // (optional) go into the next line
  
  model = await transformers.pipeline(
    "image-segmentation",
    "Xenova/detr-resnet-50-panoptic",
    {
      device: "webgpu",
      dtype: "fp16", // or 'fp32'
    }
  );
  model.processor.feature_extractor.size = { shortest_edge: 256 };
  console.log("Model loaded");
  modelReady();
}

/*
async function predict() {
  // everything but the last argument to predict() is a parameter for the model
  let modelArgs = [];
  for (let i = 0; i < arguments.length - 1; i++) {
    modelArgs.push(arguments[i]);
  }

  let out = await model(...modelArgs);
  // but the last argument is the callback function to call
  if (typeof arguments[arguments.length - 1] == "function") {
    arguments[arguments.length - 1](out);
  }
}
*/

async function predict() {
  // everything but the last argument to predict() is a parameter for the model
  let modelArgs = [];
  for (let i = 0; i < arguments.length - 1; i++) {
    modelArgs.push(arguments[i]);
  }

  // convert any p5 image in the input to its data url
  let transformInput = (obj) => {
    for (let prop in obj) {
      if (obj[prop] instanceof p5.Image) {
        obj[prop].loadPixels();
        obj[prop] = obj[prop].canvas.toDataURL();
      }
    }
  };
  transformInput(modelArgs);

  let startTime = millis();
  let out = await model(...modelArgs);
  console.log("Completed in " + nf((millis() - startTime) / 1000, 2));

  // the last argument is the callback function to call
  if (typeof arguments[arguments.length - 1] == "function") {
    arguments[arguments.length - 1](out);
  }
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  textAlign(CENTER);

  if (img) image(img, 0, 0, width, height);
  if (result) {
    /*
    text("Segmentation results", width / 2, height - 20);
    result.forEach((segment) => {
      noFill();
      stroke(255, 0, 0);
      strokeWeight(2);
      beginShape();
      segment.points.forEach((point) => {
        vertex(point[0], point[1]);
      });
      endShape(CLOSE);
    });
    */
  } else {
    text("Loading...", width / 2, height / 2);
  }
}

function modelReady() {
  predict(img, gotResults);
}

function gotResults(data) {
  console.log("Model returned", data);
  result = data;

  for (const l of result) {
    l.mask.save(`${l.label}.png`);
  }
}
