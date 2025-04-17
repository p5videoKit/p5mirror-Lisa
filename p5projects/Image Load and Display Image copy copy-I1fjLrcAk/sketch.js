let img1;
let dragging = false;
let offsetX, offsetY;

function setup() {
  createCanvas(720, 400);

  let img = loadImage('assets/moonwalk.jpg', () => {
    let dataUrl = img.canvas.toDataURL();
    img1 = createImg(dataUrl,"");

    img1.style('height', '100px');
    img1.position(100, 100);

    img1.mousePressed(startDrag);
    img1.mouseReleased(stopDrag);
  });
}

function draw() {
  background(255);
}

function startDrag() {
  dragging = true;
  offsetX = mouseX - img1.position().x;
  offsetY = mouseY - img1.position().y;
}

function stopDrag() {
  dragging = false;
}

function mouseDragged() {
  if (dragging) {
    img1.position(mouseX - offsetX, mouseY - offsetY);
  }
}
