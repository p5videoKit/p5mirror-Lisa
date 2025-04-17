// let handpose;
// let video;
// let predictions = [];
// let thumb=[0,0];
// let indexFinger;
// let palmBase;
// let nn;
// let label = "";

// let imgBg, imgShape1, imgShape2;
// let shapes = [];

function preload() {
  
  imgShape1 = loadImage("shape1.png");
  imgShape2 = loadImage("shape2.png");
  
}


function setup() {
  createCanvas(640, 480);
  
  
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  mask = createGraphics(width, height);
  mask.fill(0,60,50,10); // Set the transparency here (100 means semi-transparent white)
  mask.rect(0, 0, width, height);

  handpose = ml5.handpose(video, modelReady);
  handpose.on("hand", gotResults);

  // create a neural network for classifying
  // between rock, paper and scissors
  let options = {
    task: "classification",
    debug: true,
  };
  nn = ml5.neuralNetwork(options);
  
  shapes[0] = new LisaShape(
    98 + 32,
    155 + (250 - 36 / sqrt(3)) / 2,
    36,
    250, // x, y, w, h
    -1,
    0, // signX, signY
    1,
    -1,
    0, // offsetX, offsetY, offsetTime
    18,
    158,
    176,
    170 // r, g, b, a
  );
  shapes[1] = new LisaShape(
    442 - (sqrt(3) * 45) / 2 + 56 / 2,
    80 + (45 + 56 / sqrt(3)) / 2,
    56,
    45, // x, y, w, h
    1,
    1, // signX, signY
    -1,
    -1,
    PI, // offsetX, offsetY, offsetTime
    246,
    61,
    72,
    180 //r, g, b, a
  );
  shapes[2] = new LisaShape(
    432 + 30 / 2,
    120 + (260 - 30 / sqrt(3)) / 2,
    30,
    260, // x, y, w, h
    -1,
    0, // signX, signY
    -1,
    1,
    PI * 1.2, // offsetX, offsetY, offsetTime
    18,
    158,
    176,
    110 //r, g, b, a
  );
  shapes[3] = new LisaShape(
    112 + 200 / 2,
    345 + (56 + 200 / sqrt(3)) / 2,
    200,
    56, // x, y, w, h
    1,
    0, // signX, signY
    -1,
    1,
    2, // offsetX, offsetY, offsetTime
    37,
    152,
    142,
    90 //r, g, b, a
  );
  shapes[4] = new LisaShape(
    282 - (sqrt(3) * 120) / 2 + 120 / 2,
    180 + (120 + 120 / sqrt(3)) / 2,
    120,
    120, // x, y, w, h
    1,
    1, // signX, signY
    1,
    1,
    0.8, // offsetX, offsetY, offsetTime
    246,
    61,
    72,
    100 //r, g, b, a
  );
  shapes[5] = new LisaShape(
    282 + 120 / 2,
    142 + (40 + 120 / sqrt(3)) / 2,
    120,
    40, // x, y, w, h
    1,
    0, // signX, signY
    -1,
    -1,
    1.3, // offsetX, offsetY, offsetTime
    4,
    91,
    167,
    90 //r, g, b, a
  );
  shapes[6] = new LisaShape(
    363 + 140 / 2,
    122 + (30 + 140 / sqrt(3)) / 2,
    140,
    30, // x, y, w, h
    1,
    0, // signX, signY
    0,
    -1,
    PI * 0.65, // offsetX, offsetY, offsetTime
    247,
    174,
    136,
    150 //r, g, b, a
  );
  shapes[7] = new LisaShape(
    282 + 95 / 2,
    280 + (70 + 95 / sqrt(3)) / 2,
    95,
    70, // x, y, w, h
    1,
    0, // signX, signY
    -1,
    0,
    0.6, // offsetX, offsetY, offsetTime
    136,
    187,
    198,
    110 //r, g, b, a
  );
  shapes[8] = new LisaShape(
    267 + 95 / 2,
    420 + (70 - 95 / sqrt(3)) / 2,
    95,
    70, // x, y, w, h
    -1,
    0, // signX, signY
    -1,
    -1,
    PI * 0.87, // offsetX, offsetY, offsetTime
    238,
    101,
    116,
    150 //r, g, b, a
  );
  shapes[9] = new LisaShape(
    147 - (sqrt(3) * 20) / 2 + 76 / 2,
    144 + (20 + 76 / sqrt(3)) / 2,
    76,
    20, // x, y, w, h
    1,
    1, // signX, signY
    1,
    1,
    2, // offsetX, offsetY, offsetTime
    238,
    101,
    116,
    200 //r, g, b, a
  );
  shapes[10] = new LisaShape(
    156,
    215,
    91.26,
    106.38, // x, y, w, h
    0,
    0, // signX, signY
    -1,
    1,
    PI - 0.1, // offsetX, offsetY, offsetTime
    0,
    0,
    0,
    0, //r, g, b, a
    imgShape1
  );
  shapes[11] = new LisaShape(
    458,
    372,
    165.12,
    195.84, // x, y, w, h
    0,
    0, // signX, signY
    1,
    -1,
    PI + 2.3, // offsetX, offsetY, offsetTime
    0,
    0,
    0,
    0, //r, g, b, a
    imgShape2
  );
}
