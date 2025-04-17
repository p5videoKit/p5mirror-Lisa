let angle = 0;
let w = 24;
let ma;
let maxD;
let frames = 60;

// store: height -> color set
let heightToColors = {};

function setup() {
  createCanvas(400, 400, WEBGL);
  ma = atan(cos(QUARTER_PI));
  maxD = dist(0, 0, 200, 200);
  noStroke();
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  background(0, 0, 20); // dark background
  ortho(-400, 400, 400, -400, 0, 1000);
  rotateX(ma);
  rotateY(-QUARTER_PI);

  for (let z = 0; z < height; z += w) {
    for (let x = 0; x < width; x += w) {
      push();

      let d = dist(x, z, width / 2, height / 2);
      let offset = map(d, 0, maxD, -PI, PI);
      let a = angle + offset;
      let h = floor(map(sin(a), -1, 1, 100, 300));

      translate(x - width / 2, 0, z - height / 2);

      // If this height hasn't been mapped to a color set yet, generate one
      if (!heightToColors[h]) {
        let hue = map(h, 100, 300, 0, 360); // smooth hue based on height
        heightToColors[h] = [
          color(hue, 80, 90),  // X-aligned faces (left/right)
          color((hue + 60) % 360, 80, 90), // Y-aligned faces (top/bottom)
          color((hue + 120) % 360, 80, 90) // Z-aligned faces (front/back)
        ];
      }

      let faceColors = heightToColors[h];
      drawColoredBox(w, h, faceColors);

      pop();
    }
  }

  angle -= TWO_PI / frames;
}
function drawColoredBox(w, h, faceColors) {
  let hw = w / 2;
  let hh = h / 2;
  let hd = w / 2;

  let vertices = [
    createVector(-hw, -hh,  hd), // 0
    createVector( hw, -hh,  hd), // 1
    createVector( hw,  hh,  hd), // 2
    createVector(-hw,  hh,  hd), // 3
    createVector(-hw, -hh, -hd), // 4
    createVector( hw, -hh, -hd), // 5
    createVector( hw,  hh, -hd), // 6
    createVector(-hw,  hh, -hd)  // 7
  ];

  let faces = [
    [0, 1, 2, 3], // Front (Z)
    [5, 4, 7, 6], // Back (Z)
    [4, 0, 3, 7], // Left (X)
    [1, 5, 6, 2], // Right (X)
    [4, 5, 1, 0], // Top (Y)
    [3, 2, 6, 7]  // Bottom (Y)
  ];

  for (let i = 0; i < 6; i++) {
    let axisColor;
    if (i < 2) axisColor = faceColors[2]; // Z-axis (front/back)
    else if (i < 4) axisColor = faceColors[0]; // X-axis (left/right)
    else axisColor = faceColors[1]; // Y-axis (top/bottom)

    fill(axisColor);
    beginShape();
    for (let j = 0; j < 4; j++) {
      let v = vertices[faces[i][j]];
      vertex(v.x, v.y, v.z);
    }
    endShape(CLOSE);
  }
}
