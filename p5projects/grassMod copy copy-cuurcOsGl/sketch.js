
let grassy;

function setup() {
  createCanvas(windowWidth,
    windowHeight);
  
  grass = new yard();
}

function draw() {
  background(0, 255);
  
  noSmooth()
  grass.update();
}

function yard() {
  
  this.grass = [];

  this.roff = [];

  this.rwave = [];

  this.size = [];

  this.seg = [];

  this.index = 0;

  this.population = 150;

  for (let x = 0; x < width; x += width / this.population) {

    this.index += 1;

    this.grass.push(x);

    this.roff.push((this.index * 0.065) + 0.015);

    this.rwave.push(0);

    this.size.push(random(35, 55));

    this.seg.push(0.85);
  }

  this.update = function() {
  
    for (let i = 0; i < this.index; i++) { 
      let len = this.size[i];

      push();

      translate(this.grass[i], height * 0.65);

      this.blade(len, i);

      pop();
    }
  }

  this.blade = function(len, ind) {

    if (ind / 2 === int(ind / 2)) {

      this.roff[ind] += 0.0025;

      stroke(0, 255 - (len * 1.5), len * 1.5, 255);

      rot = map(noise(this.roff[ind]), 0, 1,
        -QUARTER_PI * 0.75, QUARTER_PI * 0.75);
    }

    if (ind / 2 != int(ind / 2)) {

      this.roff[ind] += 0.0025;

      stroke(255 - (len * 2.5), len * 2.5, 10, 255);
      rot = map(-sin(this.roff[ind]), -1, 1,
        -QUARTER_PI * 0.25, QUARTER_PI * 0.25);
    }

    strokeWeight(len * 2 * random(0.07, 0.11));

    rotate(rot);
    line(0, 0, 0, -len);
    translate(0, -len);

    if (len > 20) {
      this.blade(len * this.seg[ind], ind);
    }
  }

}