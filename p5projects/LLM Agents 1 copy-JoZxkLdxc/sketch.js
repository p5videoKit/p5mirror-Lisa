// Machine Learning for Artists and Designers
// NYUSH F23 - gohai

// Note: this sketch consists of additional JavaScript
// files. Make sure to duplicate it, rather than copying
// and pasting code :)

let openai_api_proxy = "https://sordid-hexagonal-bunny.glitch.me/";

let agents = [
  {
    x: 400,
    y: 400,
    messages: []
  }
];


function setup() {
  createCanvas(800, 800);

  // prepare agents
  for (let i=0; i < agents.length; i++) {
    let agent = agents[i];
    // add the initial prompt
    agent.messages.push({
      role: "system",
      content: "You are a virtual being in a simulated world. At every input, you can respond with one of the following replies: Rest / Go North / Go East / Go South / Go West. Don't respond in any other way. The simulation begins. You wake up, it's bright outside."
    });
    sendMessages(agent.messages);
  }
}

function draw() {
  background(255);

  // draw agents
  for (let i=0; i < agents.length; i++) {
    let agent = agents[i];
    textSize(40);
    text("🧍‍♀️", agent.x, agent.y);
  }
}

function keyPressed() {
  if (key == 's') {
    doStep();
  }
}


function doStep() {

  // elicit a new action for each agent
  for (let i=0; i < agents.length; i++) {
    let agent = agents[i];

    // see where the mouse cursor is in relation
    let dir;
    if (abs(mouseX-agent.x) > abs(mouseY-agent.y)) {
      if (mouseX > agent.x) {
        dir = 'East';
      } else {
        dir = 'West';
      }
    } else {
      if (mouseY > agent.y) {
        dir = 'South';
      } else {
        dir = 'North';
      }
    }

    // see how far the mouse cursor is away
    let d = dist(mouseX, mouseY, agent.x, agent.y);

    // put togehter the text
    let content;
    content = 'You see a giant floating triangle in the sky to the ' + dir + ' of you.';
    //if (d < 50) {
    //  content = 'You are now very close to the giant floating triangle.';
    //}
    //if (mouseIsPressed) {
    //  content += ' The giant floating triangle scares you and you want to run away.';
    //}
    

    agent.messages.push({
      content: content,
      role: 'user',
     });
    sendMessages(agent.messages);
  }
}

function sendMessages(messages) {
  console.log('Sending: ' + messages[messages.length-1].content);
  let params = {
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 0.7,
  };
  requestOAI("POST", "/v1/chat/completions", params, gotResults);
}

function gotResults(results, params) {
  let resultMessage = results.choices[0].message;
  console.log('Received: ' + resultMessage.content);

  // find which agent this message belonged to
  for (let i=0; i < agents.length; i++) {
    let agent = agents[i];
    if (agent.messages === params.messages) {
      agent.messages.push(resultMessage);
      if (resultMessage.content == 'Go North') {
        agent.y -= 50;
      } else if (resultMessage.content == 'Go South') {
        agent.y += 50;
      } else if (resultMessage.content == 'Go East') {
        agent.x += 50;
      } else if (resultMessage.content == 'Go West') {
        agent.x -= 50;        
      } else if (resultMessage.content == 'Rest') {
      } else {
        console.warn('Unrecognized action: ' + resultMessage.content);
      }
      return;
    }
  }

  console.warn('Did not find agent for message');
}
