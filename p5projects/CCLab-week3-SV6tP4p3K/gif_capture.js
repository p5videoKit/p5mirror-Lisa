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

function beginGif(frame) {
  if (frameCount == frame) {      // start recording on the given frame
  // console.log("[+] Begin Capture");
  capture.start();          // comment this line for a fast preview
  }
}

function endGif(frame, cb) {
  capture.capture(canvas);    // this captures what's on the screen
    // console.log("[+] Capture Frame");

  if (frameCount == frame) {  // stop the recording after ... frames  
    // console.log("[+] Stop Capture");
    capture.stop();
    capture.save();
    
    noLoop();
    
  }
}
