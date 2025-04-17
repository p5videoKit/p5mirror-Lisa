let curColor = 'green';
let nn;
let training = true;
let classifyX;
let classifyY;
let bgColor = 'white';

function setup() {
  createCanvas(400, 400);

  let options = {  // object literal
    task: 'classification',
    debug: true
  };
  
  nn = ml5.neuralNetwork(options);
}

function draw() {
  background(bgColor);
  
  let points = nn.neuralNetworkData.data.raw;

  for (let i=0; i < points.length; i++) {
    noStroke();
    fill(points[i].ys[0]);
    ellipse(points[i].xs[0], points[i].xs[1], 8, 8);
  }
  
  if (training == false) {
    let inputs = [
      mouseX,
      mouseY
    ];
    nn.classify(inputs, doneClassifying);
    classifyX = mouseX;
    classifyY = mouseY;
  }
}

function mousePressed() {
  if (training) {
    // loop to synthesize a couple of
    // samples around the mouse position
    for (let i=0; i < 8; i++) {
      let inputs = [
        mouseX + random(-8, 8),
        mouseY + random(-8, 8)
      ];
      let outputs = [
        curColor
      ];
      nn.addData(inputs, outputs);
    }
  } else {
    let inputs = [
      mouseX,
      mouseY
    ];
    nn.classify(inputs, doneClassifying);
    classifyX = mouseX;
    classifyY = mouseY;
  }
}

function keyPressed() {
  if (key == 'g' || key == 'G') {
    curColor = 'green';
  } else if (key == 'r' || key == 'R') {
    curColor = 'red';
  } else if (key == 'b' || key == 'B') {
    curColor = 'blue';
  } else if (key == 's' || key == 'S') {
    nn.saveData();
  } else if (key == 'l' || key == 'L') {
    nn.loadData('data.json');
  } else if (keyCode == ENTER) {
    console.log('Starting...');
    
    nn.normalizeData();
    
    let options = {
      epochs: 64,
      batchSize: 12,
    };
    
    nn.train(options, doneTraining);
  }
}

function doneTraining() {
  console.log('Done!');
  training = false;
}

function doneClassifying(error, results) {
  //console.log(results);
  bgColor = results[0].label;
  fill(results[0].label);
  ellipse(classifyX, classifyY, 16, 16);
}