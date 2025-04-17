function setup() {
  createCanvas(500, 600, WEBGL);
  background(100);
}

function draw() {
  background(100);
  rotateY(frameCount * 0.01);

  let worldSize = 300;
  let gridSize = 20;
  for (let z = -worldSize; z <= worldSize; z += gridSize) {
    for (let x = -worldSize; x <= worldSize; x += gridSize) {
      let freqX = x * 0.01 + frameCount * 0.01;
      let freqZ = z * 0.01 + frameCount * 0.03;
      let noiseValue = map(noise(freqX, freqZ), 0, 1, -20, 20);
      
      y = 130 + noiseValue;
      
      push();
      translate(x, y, z);
      noFill();
      stroke(255);
      box(6);
      pop();
    }
  }
}
