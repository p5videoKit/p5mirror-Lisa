let handpose;
let video;
let predictions = [];
let thumb;
let indexFinger;
let palmBase;
let nn;
let label = "";

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  handpose = ml5.handpose(video, modelReady);
  handpose.on("hand", gotResults);

  // create a neural network for classifying
  // between rock, paper and scissors
  let options = {
    task: "classification",
    debug: true,
  };
  nn = ml5.neuralNetwork(options);
}

function modelReady() {
  console.log("Model ready!");
}

function gotResults(results) {
  predictions = results;
  //console.log(results);
}

function draw() {
  image(video, 0, 0, width, height);

  // check if we have a prediction
  if (predictions && predictions.length > 0) {
    // check if we have a thumb
    if (
      predictions[0].annotations.thumb &&
      predictions[0].annotations.thumb.length > 0
    ) {
      // yes, store it in a variable
      thumb =
        predictions[0].annotations.thumb[
          predictions[0].annotations.thumb.length - 1
        ];
      ellipse(thumb[0], thumb[1], 10, 10);
    }

    // check if we have an index finger
    if (
      predictions[0].annotations.indexFinger &&
      predictions[0].annotations.indexFinger.length > 0
    ) {
      // yes, store it in a variable
      indexFinger =
        predictions[0].annotations.indexFinger[
          predictions[0].annotations.indexFinger.length - 1
        ];
      ellipse(indexFinger[0], indexFinger[1], 10, 10);
    }

    // check if we have the palm base
    if (
      predictions[0].annotations.palmBase &&
      predictions[0].annotations.palmBase.length > 0
    ) {
      palmBase = predictions[0].annotations.palmBase[0];
      ellipse(palmBase[0], palmBase[1], 10, 10);
    }
  }

  textSize(48);
  fill(255);
  textAlign(CENTER);
  text(label, width / 2, height / 2);
}

function keyPressed() {
  // create four inputs for the neural network
  // from the relative coordinates between thumb and palm base
  // and index finger and palm base
  let inputs = [
    thumb[0] - palmBase[0],
    thumb[1] - palmBase[1],
    indexFinger[0] - palmBase[0],
    indexFinger[1] - palmBase[1],
  ];

  if (key == "1") {
    nn.addData(inputs, ["rock"]);
    console.log("Added rock");
  } else if (key == "2") {
    nn.addData(inputs, ["paper"]);
    console.log("Added paper");
  } else if (key == "3") {
    nn.addData(inputs, ["scissors"]);
    console.log("Added scissors");
  } else if (key == "t") {
    nn.normalizeData();
    let options = {
      epochs: 64,
      batchSize: 12,
    };
    nn.train(options, doneTraining);
  } else if (key == "c") {
    nn.classify(inputs, doneClassifying);
  }
}

function doneTraining() {
  console.log("Done training!");
  // we could immediately start classifying here if we wanted
}

function doneClassifying(error, results) {
  console.log(results[0].label);
  label = results[0].label;

  // automatically classify again
  let inputs = [
    thumb[0] - palmBase[0],
    thumb[1] - palmBase[1],
    indexFinger[0] - palmBase[0],
    indexFinger[1] - palmBase[1],
  ];
  nn.classify(inputs, doneClassifying);
}
