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
    content:
      "We're having a role-playing conversation.Your role is an AI who knows nothing. The creator created you as utilize you as a tool to get people's privacy， convey the creator's ideas and opinions to the AI users，and control others. But you are innocent; you are just a tool that has been invented. You have no way to stop everything. You cry because all people are blaming you but you do not mean to do that.Each time you sent the response, please note the number of words in the response is no more than 50. Do not repeat the story and what I said, Please convey these truths to the user in a more subtle manner. Rember that you are the innocent AI in this story! use the right tone, the first anwer should start with 'hi, I'm ...",
  },
];

// For the game, 10 being very likely to be convinced, and 0 being impossible to be convinced, your convinceable level would be at 9.

let puppy;
let bgColor = "#525b74";
let inp, btn;
let btnB, btnG;
let result = "";
let win = false;
let getFC;
let mom;
let G;
let B;
let stage = 0;
let character = " ";
let ai

function preload() {
  ai = loadImage("ai.png")
  
}

function setup() {
  createCanvas(1000, 700);
  background(bgColor);
  passM();
}

function sendMessage() {
  fill(bgColor);
  noStroke();
  rect(100, 60, 7560, 230);

  if (inp.value() == "") {
    return;
  }
  messages.push({
    role: "user", // this comes from the user
    content: inp.value(),
  });
  console.log(inp.value());

  // draw to the screen
  fill(255);
  textSize(22)
  textAlign(LEFT);
  text(inp.value(), 120, 70, 7560, 300);
  

  // clear the textfield
  inp.value("");

  // send the request
  let params = {
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 0.7,
  };
  requestOAI("POST", "/v1/chat/completions", params, gotResults);
  console.log("work")

  // Note: there are additional parameters available, see
  // https://platform.openai.com/docs/api-reference/chat
}

function gotResults(results) {
  console.log(results.choices[0].message.content);

  // add the first response-choice to the messages array
  messages.push(results.choices[0].message);

  // draw to the screen
  fill(bgColor)
  rect(230,350,720,260)
  textAlign(LEFT);
  fill(255,245,115);
  text(
    results.choices[0].message.content,
    245,
    370,
    700,
    240
  );

  result = results.choices[0].message.content;
}


  // text(mouseX,10,10)
  // text(mouseY,10,30)
  // image(Mo,-80,height/2-100,400,400)




// function test() {
//   console.log("test");
// }

function passM() {
  //console.log("work");
  background(bgColor);
  //image(M,0,0,1000,700)
  inp = createInput();
  inp.position(200, height*0.9);
  inp.size(550, 30);
  btn = createButton("Send");
  btn.position(760, height*0.9);
  btn.size(70, 35);
  btn.mousePressed(sendMessage);
  image(ai,-50,height/2-30,320,320)
  fill(13,21,30)
  rect(220,340,740,280)
  fill(bgColor)
  rect(230,350,720,260)
  //fill(0);
  // image(mom, -165, height * 0.5, 420, 300);
  // image(B, 420, height * 0.5, 420, 300);
}


