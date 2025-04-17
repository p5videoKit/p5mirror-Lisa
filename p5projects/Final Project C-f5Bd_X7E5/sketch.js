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
      "We're having a role-playing conversation.Your role is Smart and ambitious bugs who creates a smart AI model. The money in your world is a tiny shining stone. Mosquitoes like it very much because they like things that glow. You make your AI model look like a large glowing ball, which share the similarity with money, they all glow. Glowing things are very valuable in mosquitoes' world. You think that you can use this AI to get mosquito's personal information like their body features. And you train this AI according to the input you like, so the output also contains your personal bias and opinios. You utilize AI as a way to make all the users become what you like, more speceficly, be like you. Your ideas are quietly transformed to them when they are using AI. It is like controling them. Please remember you are the creator of this AI model who gives AI all the input based on your preferrence. Each time the user talks to you, please try to share more information about this story and help them understand the main topic. The main topic is that people who are using AI are tend to be controled by the person behind AI,that's you. You give all the input to AI and the out put is all he wants. All his biases will be quietly transmitted to AI users，and they are limited and controlled. Each time you sent the response, please note the number of words in the response is no more than 50. Do not repeat the story and what I said, Please convey these truths to the user in a more subtle manner. Rember that you are the person behind AI, the controller in this story! use the right tone, the first anwer should start with 'hi, I'm ...",
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
let M,C

function preload() {
  C = loadImage("C.png")
  
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

  // Note: there are additional parameters available, see
  // https://platform.openai.com/docs/api-reference/chat
}

function gotResults(results) {
  console.log(results.choices[0].message.content);

  // add the first response-choice to the messages array
  messages.push(results.choices[0].message);

  // draw to the screen
  fill(148,137,153)
  rect(230,350,720,260)
  textAlign(LEFT);
  fill(0);
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
  inp.position(200, height-60);
  inp.size(550, 30);
  btn = createButton("Send");
  btn.position(760, height-60);
  btn.size(70, 35);
  btn.mousePressed(sendMessage);
  image(C,-80,height/2-100,400,400)
  fill(13,21,30)
  rect(220,340,740,280)
  fill(148,137,153)
  rect(230,350,720,260)
  //fill(0);
  // image(mom, -165, height * 0.5, 420, 300);
  // image(B, 420, height * 0.5, 420, 300);
}


