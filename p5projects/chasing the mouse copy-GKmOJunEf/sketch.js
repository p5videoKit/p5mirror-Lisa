let col = "#000000";
let x1 = 0;
let y1 = 0;

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(220);
  palette();

  //select color
  let x = mouseX;
  let y = mouseY;
  if (mouseIsPressed) {
    if (
      x > 0 &&
      x < width / 20 &&
      y > (height / 20) * 2 &&
      y < (height / 20) * 3
    ) {
      col = "#f7d2ef";
    } else if (
      x > 0 &&
      x < width / 20 &&
      y > (height / 20) * 3 &&
      y < (height / 20) * 4
    ) {
      col = "#d0e879";
    } else if (
      x > 0 &&
      x < width / 20 &&
      y > (height / 20) * 4 &&
      y < (height / 20) * 5
    ) {
      col = "#a5e0f0";
    } else if (
      x > 0 &&
      x < width / 20 &&
      y > (height / 20) * 5 &&
      y < (height / 20) * 6
    ) {
      col = "#ecd28f";
    } else if (
      x > 0 &&
      x < width / 20 &&
      y > (height / 20) * 6 &&
      y < (height / 20) * 7
    ) {
      col = "	#fdf25d";
    }
  }
  the_mouse();
  monster();
}

function monster() {
  fill(col);
  //its body
  stroke(0);
  let dx1 = mouseX - x1;
  let dy1 = mouseY - y1;
  x1 += dx1 * 0.05;
  y1 += dy1 * 0.05;
  if (x1 < width / 20 + 30 && y1 < (height / 20) * 7 + 45) {
    x1 = width / 20 + 30;
  }
  arc(x1, y1, 60, 90, radians(180), radians(360));
  stroke(0);

  //its tentacle
  arc(x1 - 22.5, y1 - 1, 15, 30, radians(0), radians(180));
  arc(x1 - 7.5, y1 - 1, 15, 30, radians(0), radians(180));
  arc(x1 + 7.5, y1 - 1, 15, 30, radians(0), radians(180));
  arc(x1 + 22.5, y1 - 1, 15, 30, radians(0), radians(180));

  //its eyes
  fill(255);
  noStroke();
  ellipse(x1 - 12, y1 - 23, 18, 22);
  ellipse(x1 + 12, y1 - 23, 18, 22);
  //the movement of the eyes
  fill(0);
  let x2 = x1 - 12;
  let y2 = y1 - 23;
  let dx2 = mouseX - x2;
  let dy2 = mouseY - y2;
  if (
    ((x2 - x1 + 12) * (x2 - x1 + 12)) / 80 +
      ((y2 - y1 + 23) * (y2 - y1 + 23)) / 100 <
    1
  ) {
    x2 += dx2 * 0.03;
    y2 += dy2 * 0.03;
  }
  ellipse(x2, y2, 5, 5);

  let x3 = x1 + 12;
  let y3 = y1 - 23;
  let dx3 = mouseX - x2;
  let dy3 = mouseY - y2;
  if (
    ((x3 - x1 - 12) * (x3 - x1 - 12)) / 80 +
      ((y3 - y1 + 23) * (y3 - y1 + 23)) / 140 <
    1
  ) {
    x3 += dx3 * 0.03;
    y3 += dy3 * 0.03;
  }
  ellipse(x3, y3, 5, 5);
}

function palette() {
  //create color palette
  fill(0);
  text("click to select color", 6, 15, 60, 60);
  fill("#f7d2ef");
  rect(0, (height / 20) * 2, width / 20, height / 20);
  fill("#d0e879");
  rect(0, (height / 20) * 3, width / 20, height / 20);
  fill("#a5e0f0");
  rect(0, (height / 20) * 4, width / 20, height / 20);
  fill("#ecd28f");
  rect(0, (height / 20) * 5, width / 20, height / 20);
  fill("#fdf25d");
  rect(0, (height / 20) * 6, width / 20, height / 20);
}

function the_mouse() {
  let x = mouseX;
  let y = mouseY;
  fill(0);
  triangle(x, y, x - 10, y + 20, x + 10, y + 20);
  rect(x - 2, y + 20, 4, 10);
}
