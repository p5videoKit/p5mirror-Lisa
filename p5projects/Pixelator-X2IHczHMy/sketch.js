// Written by Andrew Sink, August 2020
// Inspired by the 'Brightness Mirror' by Dan Shiffman: http://learningprocessing.com/examples/chp16/example-16-08-BrightnessMirror
// 

let img; // creates image variable

let size = 7 // element size

let startx = 0 // starting x coordinate
let starty = 0 // starting y coordinate

function preload() {
  img = loadImage('virgie.jpg'); // preloads Virginia picture!
}

function setup() {
  createCanvas(windowWidth, windowHeight); // creates canvas

  img.loadPixels(); // loads image
  img.resize(windowWidth, 0); // resizes image to window size
  //img.updatePixels(); // updates image

}


function draw() {
  clear();
  background(0);

  let size = floor(map(mouseX, 0, width, 7, 40)); // maps mouseX value to element size

  for (var starty = 0; starty < img.height; starty++) { // creates pixel index
    for (var startx = 0; startx < img.width; startx++) {
      var index = (startx + starty * img.width) * 4;
      var r = img.pixels[index + 0];
      var g = img.pixels[index + 1];
      var b = img.pixels[index + 2];

      var bright = ((0.3 * r) + (0.59 * g) + (0.11 * b)) // sets pixel value to adjusted grayscale

      // noStroke(); // disables element stroke


      // if (bright < 63.75) {
      //   fill(0);
      // } else if (bright >= 63.75 && bright < 127.5) {
      //   fill(85);
      // } else if (bright >= 127.5 && bright <= 191.25) {
      //   fill(170);
      // } else if (bright >= 191.25 && bright <= 255) {
      //   fill(255);
      // }


      fill(bright) // fills element with adjusted grayscale

      rect(startx, starty, size, size)
      
      // triangle(startx, starty, startx + (size / 2), starty + size, startx + size, starty) // upside down triangle
      // triangle(startx, starty, startx, starty + size, startx + size, starty)

      startx = startx + size -1 // set new startx value
    }
    starty = starty + size -1 // set new starty value
  }
}