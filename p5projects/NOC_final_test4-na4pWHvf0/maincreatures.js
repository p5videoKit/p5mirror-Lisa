let count = 0;
let canFlip = true;
let trigger = false;
function drawCreatures() {
  if (mouseX > (3 * width) / 4) {
    trigger = true;
  }
  if (trigger) {
    drawTriggerCreature();
  }
  if (mover.pos.y < -190) {
    trigger = false;
  }
}

function drawTriggerCreature() {
  push();
  noFill();
  stroke(255);
  mover.update();
  mover.show();

  translate(mover.pos.x, mover.pos.y);
  rotate(mover.vel.heading());
  // console.log(mover.pos.x,mover.pos.y)

  let a;
  if (canFlip == true) {
    if (mover.pos.x < 1000 && mover.pos.y > 550 && count < PI) {
      count += 0.1;
    }
    if (count > PI) {
      count = PI;
      canFlip = false;
    }
  }
  a = cos(count - PI);
  scale(1, a);
  scale(map(dist(0, mover.pos.y, 0, height), 0, 1000, 1.8, 0.01));
  
 // if (rotation angle is close to 270 degree)
  //triggerCreature = null;
  triggerCreature.update();
  
  pop();
}
