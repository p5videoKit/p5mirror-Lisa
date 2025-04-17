
  // flow field
//   for (let c = 0; c < cols; c++) {
//     for (let r = 0; r < rows; r++) {
//       let index = r + c * rows; // *** x + y * width

//       let x = r * RESOLUTION;
//       let y = c * RESOLUTION;

//       let xfreq = (x + frameCount) * 0.005;
//       let yfreq = (y + frameCount) * 0.01;
//       let amp = TWO_PI; // range of angle
//       let val = noise(xfreq, yfreq) * amp;

//       angles[index] = val;

//     }
//   }

//   for (let i = 0; i < vehicles.length; i++) {
//     let v = vehicles[i];

//     let r = floor(v.pos.x / RESOLUTION);
//     let c = floor(v.pos.y / RESOLUTION);
//     let index = r + c * rows;

//     v.flow(angles[index]);
//     v.update();
//     v.checkEdges();
//     v.display();
//   }