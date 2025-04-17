let img;
let imgElem;

function setup() {
  createCanvas(720, 400);
  img = loadImage('assets/moonwalk.jpg');
}

function draw() {
  background(255);
  image(img, 0, 0);
}

function mousePressed() {
  // turn the image variable into a "data url"
  // (i.e. a string that contains the content of the
  //  image data with letters and numbers)
  let dataUrl = img.canvas.toDataURL();

  // create a new <img> object and add it to the body
  imgElem = createImg(dataUrl);
  
  // you can style the <img> object like so
  imgElem.style('height', '50px');
  
  // Position the new image at the mouse position
  imgElem.position(mouseX, mouseY);

  // Make the image draggable
  imgElem.attribute('draggable', true);

  // Add drag event listeners
  imgElem.mousePressed(startDrag);
  imgElem.mouseReleased(stopDrag);
}

// Variables to store dragging state
let dragging = false;
let offsetX, offsetY;

function startDrag() {
  dragging = true;
  offsetX = mouseX - imgElem.position().x;
  offsetY = mouseY - imgElem.position().y;
}

function stopDrag() {
  dragging = false;
}

function mouseDragged() {
  if (dragging) {
    imgElem.position(mouseX - offsetX, mouseY - offsetY);
  }
}
