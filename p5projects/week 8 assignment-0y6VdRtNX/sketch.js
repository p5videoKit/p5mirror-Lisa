// Note: this sketch consists of additional JavaScript
// files. Make sure to duplicate it, rather than copying
// and pasting code :)

let local_sd_api = "https://gpu.gohai.xyz:3000/";
let openai_api_proxy = "https://sordid-hexagonal-bunny.glitch.me/";
let img;
let inp,btn;
let inp1,inp2,inp3
let suggestions=""
let cover
let btnstart;


function preload(){
  cover = loadImage("clothes.jpg");
}

function setup() {
  createCanvas(500, 500);
  startpage()
  

  requestLSD(
    "GET",
    "sdapi/v1/options"
    //gotOptions
  );

  //console.log("Starting prediction, this might take a bit");
}

function startpage(){
  
  image(cover, 0, 0,height, width)
  fill(0,0,0,80)
  rectMode(CENTER)
  noStroke()
  rect(width/2+24,168,395,60)
  
  fill(222,191,246)
  textAlign(CENTER)
  textFont("Caveat")
  textSize(80)
  text("Clothes Pairing",width/2,170)
  fill(255,0,0)
  
  btnstart = createButton("start");
  btnstart.position(220, 240);
  btnstart.size(80, 35);
  btnstart.mousePressed(myinps);
  
  
}

function sendMessage() {
  
  textSize(40)
  text("get ready to dress up;-D...",250,250)
  // if (inp.value() == "") {
  //   return;
  // }
  
  messages = [{
    role: "user",
    content: "Please provide me some suggestions about wonderful and appropriate outfit pairing based on what I have and where I need to go. I need the appropriate color scheme. I'm a" +inpgender.value()+"Now I have a"+ inp1.value() + "and I need the outfit for"+ inp2.value() + "my special request is" + inp3.value() + "please only list all the clothing items including the one I have. Remember to follow this format:'color cloth, color cloth, color outerwear, accessory, accessory, color hair, simple related background'do not reply me with complete sentence"
  }];
  
  console.log(inpgender.value())
  console.log(inp1.value());
  console.log(inp2.value())
  console.log(inp3.value())
  //text(inp.value(),50,50)
  inp1.value("");
  inp2.value("")
  inp3.value("")
  inpgender.value("")// clear the textfield

  //////// send the request
  let params = {
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 0.7,
  };
  requestOAI("POST", "/v1/chat/completions", params, gotResults);
  
}

function gotResults(results) {
  console.log(results.choices[0].message.content);

  // add the first response-choice to the messages array
  messages.push(results.choices[0].message);
  result = results.choices[0].message.content;
  
  
  //////////////////////////SD//////////////////////
   let modelInput = {
    prompt:"best quality, masterpiece, a"+ inpgender.value()+"wearing"+ inp2.value() + result +", showing full body, self-painting,ootd"+inp3.value(),
    // Set other parameters as needed for the LSD model
  };

  requestLSD(
    "POST",
    "sdapi/v1/txt2img",
    modelInput,
    donePredicting
  );
  //console.log("test")
}

function gotOptions(results) {
  // console.log(results);
  //console.log("Using model " + results.sd_model_checkpoint);
  // use WebUI to change settings
}

function donePredicting(results) {
  //console.log(results);
  if (results && results.images.length > 0) {
    img = loadImage('data:image/png;base64,' + results.images[0]);
  }
}

function draw() {
  //background(220);

  if (img) {
    imageMode(CENTER);
    image(img, width / 2,height/2, width, height );
    fill(119,76,78)
  textSize(20)
  text("male/female",136,40)
  text("you have...",134,70)
  text("occasion",125,100)
  text("special request",145,130)
  }
  
  
}


function myinps(){
  btnstart.position(1000, 10);
  
  background(251,243,241)
  
  fill(119,76,78)
  textSize(20)
  text("male/female",136,40)
  text("you have...",134,70)
  text("occasion",125,100)
  text("special request",145,130)
  
  inpgender = createInput();
  inpgender.position(5, 20);
  inpgender.size(80,20)
  
  inp1 = createInput();
  inp1.position(5, 50);
  inp1.size(80,20)
  
  inp2 = createInput();
  inp2.position(5, 80);
  inp2.size(80,20)
  
  inp3 = createInput();
  inp3.position(5, 110);
  inp3.size(80,22)
  
  btn = createButton("pairing");
  btn.position(10, 145);
  btn.size(70, 30);
  btn.mousePressed(sendMessage);
}
