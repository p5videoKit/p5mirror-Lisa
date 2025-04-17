let angle = 0;
let w = 30;
let ma;
let maxD;
let frames = 90;

let heightColors = {};

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  //createCanvas(600, 600, WEBGL);
  frameRate(60);
  ma = atan(cos(QUARTER_PI));
  maxD = dist(0, 0, width, height);
  noStroke();
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  background(0, 0, 15);
  let viewSize = 550;
  ortho(-viewSize, viewSize, viewSize, -viewSize, -1000, 1000);
  rotateX(ma);
  rotateY(-QUARTER_PI);

  let cols = width / w;
  let rows = height / w;

  for (let z = 0; z < rows * w; z += w) {
    for (let x = 0; x < cols * w; x += w) {
      push();

      let shiftedX = x + 100;
      let shiftedZ = z - 150;

      let d = dist(shiftedX, shiftedZ, width / 2, height / 2);
      let offset = map(d, 0, maxD * 1.2, -PI, PI);

      let a = angle + offset + sin(x * 0.01) * 0.5 + cos(z * 0.015) * 0.4;

      let noiseFactor = noise(x * 0.01, z * 0.01) * 80;

      let h = floor(map(sin(a), -1, 1, 100, 300) + noiseFactor);

      translate(x - width / 2, 0, z - height / 2);

      // Same color logic
      if (!heightColors[h]) {
        let hue = map(h, 100, 300 + 80, 160, 360); // use green → blue tones
        heightColors[h] = [
          color(hue, 70, 90),               // X faces
          color((hue + 60) % 360, 50, 190),  // Y faces
          color((hue + 120) % 360, 60, 90)  // Z faces
        ];
      }

      let faceColors = heightColors[h];
      drawColoredBox(w, h, w, faceColors);
      pop();
    }
  }

  angle -= TWO_PI / frames;
}
function drawColoredBox(w, h, d, faceColors) {
  let hw = w / 2;
  let hh = h / 2;
  let hd = d / 2;

  let vertices = [
    createVector(-hw, -hh,  hd),
    createVector( hw, -hh,  hd),
    createVector( hw,  hh,  hd),
    createVector(-hw,  hh,  hd),
    createVector(-hw, -hh, -hd),
    createVector( hw, -hh, -hd),
    createVector( hw,  hh, -hd),
    createVector(-hw,  hh, -hd)
  ];

  let faces = [
    [0, 1, 2, 3], // Z+
    [5, 4, 7, 6], // Z-
    [4, 0, 3, 7], // X-
    [1, 5, 6, 2], // X+
    [4, 5, 1, 0], // Y-
    [3, 2, 6, 7]  // Y+
  ];

  for (let i = 0; i < 6; i++) {
    let axisColor;
    if (i < 2) axisColor = faceColors[2];
    else if (i < 4) axisColor = faceColors[0];
    else axisColor = faceColors[1];

    fill(axisColor);
    beginShape();
    for (let j = 0; j < 4; j++) {
      let v = vertices[faces[i][j]];
      vertex(v.x, v.y, v.z);
    }
    endShape(CLOSE);
  }
}
