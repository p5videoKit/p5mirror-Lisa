let capture;

function setupGif(fps) {
  let options = {
    format: 'gif',            // 'gif' or 'png' (for still frames)
    framerate: fps,           // how fast the exported file will play back
    workersPath: '',
  };
  // there exists a 'quality' option as well (0-99?)
  
  capture = new CCapture(options);
}

function beginGif() {
  if (frameCount == 1) {      // start recording on the given frame
    capture.start();          // comment this line for a fast preview
  }
}

function endGif(frame) {
  capture.capture(canvas);    // this captures what's on the screen

  if (frameCount == frame) {  // stop the recording after ... frames
    capture.stop();
    capture.save();
    noLoop();
  }
}
