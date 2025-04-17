function setup() {
  createCanvas(400, 400);

  let utterance = new SpeechSynthesisUtterance();
  utterance.text = "Hello World";
  //utterance.lang = "zh-cn";
  //utterance.pitch = 1;
  //utterance.rate = 1;
  //utterace.volume = 1;
  speechSynthesis.speak(utterance);
}

function draw() {
  background(220);
}