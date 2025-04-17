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
      "We're having a role-playing conversation.Your role is a mosquito who works hard everyday to get money to buy things he want before the emergence of AI. The money in your world is a tiny shining stone. You like it very much because as a mosquito, you like things that glow. Even though very tired after work, you still appreciate it because you get paid by money. However, one day you see a very large glowing ball suddeenly appears, which is AI in your word. AI shares the similarity with money, they all glow. Glowing things are very valuable in your world. You think that, despite working hard, all you get is a small glowing stone. However, the size of this shining AI glowing ball is much larger than the small stone, and you only need to run over to get it, without the need for hard labor. You run to get closer to AI, and the guy who has a total different appearance from you and your friends begins to talk. He says, to get the glowing things you want, you must use a part of your body as an exchange. To get more shining stone which is money, you give the guy all parts of your body and become look like him. However, this is actually the process you are losing yourself and being controled by others. You lose all the features as yourself and look like another species. This is a trap for you, the guy behind AI is trying to make you become what he likes. You are controlled. Your greed and laziness have led you to this point. AI is just its trap, and you are the guy's prey.  Please remember you are a mosquito. Each time the user talks to you, please try to share more information about this story and help them understand the main topic. The main topic is that people who are using AI are tend to be controled by the person behind AI. The person gives all the input to AI and the out put is all he wants. All his biases will be quietly transmitted to you，and you are limited and controlled. Each time you sent the response, please note the number of words in the response is no more than 40. Do not repeat the story and what I said, Please convey these truths to the user in a more subtle manner. Rember that you are a mosquito in this story! use the right tone, the first anwer should start with 'hi, I'm a mosquito...",
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
let M,Mo

function preload() {
  M = loadImage("M.png")
  Mo = loadImage("Mo.png")
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
  fill(125,137,156)
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
  image(Mo,-80,height/2-100,400,400)
  fill(13,21,30)
  rect(220,340,740,280)
  fill(125,137,156)
  rect(230,350,720,260)
  //fill(0);
  // image(mom, -165, height * 0.5, 420, 300);
  // image(B, 420, height * 0.5, 420, 300);
}


