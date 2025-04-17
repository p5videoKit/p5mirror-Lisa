// Machine Learning for Artists and Designers
// NYUSH F23 - gohai

// Note: this sketch consists of additional JavaScript
// files. Make sure to duplicate it, rather than copying
// and pasting code :)

let openai_api_proxy = "https://sordid-hexagonal-bunny.glitch.me/";

// The main input is the messages parameter (i.e. the entire conversation
// up to this point). Typically, a conversation is formatted with a system
// message first, followed by alternating user and assistant messages.
// The system message helps set the behavior of the assistant. For example,
// you can modify the personality of the assistant or provide specific
// instructions about how it should behave throughout the conversation.

let messages = [
  {
    role: "system",
    content: "We are setting up a game with you. Your role is a mom who doesn't allow her child to have a dog. The user plays the role of the child who eagerly wants to have a dog and trying to persuade you. Each time you sent the response, please note the number of words in the response is no more than 160. For the game, 10 being very likely to be convinced, and 0 being impossible to be convinced, your convinceable level would be at 9. Do not reapeat the rules, simply respond to what the user says as the role of the parent. If you consent, please reply in 'Fine. You can have a dog.'",
  },
];

let img
let bgColor = "#FDEEF3";
let inp, btn;
let result = '';
let win = false;
let getFC;
let mom
let G
let B
let stage=0

function preload() {
  img = loadImage('puppy_vector.png');
  mom = loadImage('母亲形象.png')
  G = loadImage('女儿.png')
  B = loadImage('儿.png')
}

function setup() {
  createCanvas(600, 600);
  background(bgColor);
  fill(255);
  
  inp = createInput();
  inp.position(60, 550);
  inp.size(400, 25);
  btn = createButton('Send');
  btn.position(480, 550);
  btn.size(70, 30)
  btn.mousePressed(sendMessage);

  // whenever the button is clicked, call sendMessage
  // select("#submit").mouseClicked(sendMessage);
}

function sendMessage() {
  background(bgColor);
  // get the text from the text field
  // let content = select("#content").value();
  
  // don't send empty messages to the API
  if (inp.value() == "") {
    return;
  }
  
  // add the text to the array of messages
  messages.push({
    role: "user", // this comes from the user
    content: inp.value(),
  });
  console.log(inp.value());
  
  
  // draw to the screen
  fill(122, 59, 105);
  textAlign(RIGHT);
  text(inp.value(), width/2 + 20, height/8, width/2-60, height-20);
  // circle(50, 20, 100)
  // clear the textfield
  inp.value("");
  
  // send the request
  let params = {
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 0.7,
  };
  requestOAI("POST", "/v1/chat/completions", params, gotResults);

  // Note: there are additional parameters available, see
  // https://platform.openai.com/docs/api-reference/chat
}

function gotResults(results) {
  console.log(results.choices[0].message.content);

  // add the first response-choice to the messages array
  messages.push(results.choices[0].message);
  
  if (results.choices[0].message.content.includes('.')) {
    win = true
    getFC = frameCount;
  }
  // draw to the screen
  textAlign(LEFT);
  text(results.choices[0].message.content, 40, height/8, width/2-40, height-20);
  
  result = results.choices[0].message.content;
}

function draw() {
  if (win == true) {
    noStroke()
    fill(bgColor);
    rect(40, height *2 / 3, 700, 150)
    // image(img, 0, 0, 400, 400);
    // console.log("get")
    
    puppy()
    // win = false;
  }
  // scroll the content of the screen upwards
  // copy(0, 1, width, height-1, 0, 0, width, height-1);
  // // fill the last row black
  // line(0, height-1, width, height-1);
  fill(0)
  image(mom, -165,height*0.5,420,300)
  image(G,258,height*0.5,420,300)
}


function puppy() {
  let puppyX = 0;
  
  push();
  translate(50 + frameCount-getFC, height*2/3);
  image(img, 0, 0, 100, 100);
  
  pop();
}
