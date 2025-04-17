// Getting started with transformers.js in p5.js
// Gottfried Haider
// based on https://editor.p5js.org/jonathan.ai/sketches/O8mvwJtfp

let model; // this variable will contain the model loaded in preload()
let result; // gotResults() will store the most recent result there

// asynchronously load transformers.js and instantiate model
async function preload() {
  let transformers = await import(
    "https://cdn.jsdelivr.net/npm/@xenova/transformers@2"
  );
  console.log("transformers.js version " + transformers.env.version);

  // the task (e.g. "sentiment-analysis") and specific model to use for it
  // (optional) go into the next line
  model = await transformers.pipeline("sentiment-analysis");
  // see https://github.com/xenova/transformers.js?tab=readme-ov-file#supported-tasksmodels for a list of possibilities
  console.log("Model loaded");
  modelReady();
}

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

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  textAlign(CENTER);
  if (result) {
    text(
      "Sentiment is " +
        result[0].label +
        " with confidence " +
        nf(result[0].score * 100, 0, 2) + "%",
      width / 2,
      height / 2
    );
  } else {
    text("Loading...", width / 2, height / 2);
  }
}

function modelReady() {
  predict("I hate it when it rains", gotResults);
}

function gotResults(data) {
  console.log("Model returned", data);
  result = data;
}
