// Note: this sketch consists of additional JavaScript
// files. Make sure to duplicate it, rather than copying
// and pasting code :)

let openai_api_proxy = "https://sordid-hexagonal-bunny.glitch.me/";

function setup() {
  createCanvas(400, 400);
  background(0);
  fill(255);

  // whenever the button is clicked, call sendMessage
  select("#submit").mouseClicked(sendMessage);
}

function sendMessage() {
  // get the text from the text field
  let content = select("#content").value();
  
  // don't send empty messages to the API
  if (content == "") {
    return;
  }
  
  // here, we don't need a history of the conversation
  // so we can start a new messages array for every input
  messages = [{
    role: "user",
    content:'I would like you to generate a cute face expression with pixel based on the following keywords. In your response, only tell me in this format：“{"background": "a hex color value","circles": [{"color": "a hex color value","size": a certain number, "x": a certain number,"y": a certain number},{"color": "a hex color value","size": a certain number,"x": a certain number,"y": a certain number}],"arcs":[{"color":"a hex color value","radius1":a certain number,"radius2":a certain number,"start":a certain number based on PI,"stop":a certain number about PI,"x":a certain number,"y":a certain number}]}”.You should create more than one circle to make eyes face nose, head, mouse, and accessry like tears or cheek.For each eye, use at least two circles with different colors and right positions. Make sure it is valid JSON and the cute face and head is fully shown on the canvas 400*400. You can use arc or circle as mouse as you want.Here are the keywords:' + select("#content").value(),
  }];
  
  // clear the textfield
  select("#content").value("");
  
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
  console.log(results.choices[0].message.content)
  try {
    let response = JSON.parse(results.choices[0].message.content);

    // Check if the response includes a background color
    if (response.background) {
      background(response.background);
    } else {
      background(220); // Default background color
    }

    // Check if the response includes circles
    if (response.circles && Array.isArray(response.circles)) {
      for (let circle of response.circles) {
        if (circle.color && circle.size && circle.x && circle.y) {
          fill(circle.color);
          ellipse(circle.x, circle.y, circle.size, circle.size);
        }
      }
    }
    if (response.arcs && Array.isArray(response.arcs)) {
      for (let arcData of response.arcs) {
        if (arcData.color && arcData.radius1 && arcData.radius2 && arcData.start && arcData.stop && arcData.x && arcData.y) {
          nofill()
          stroke(arcData.color);
          strokeWeight(4)
          arc(arcData.x, arcData.y, arcData.radius1, arcData.radius2, arcData.start, arcData.stop);
        }
      }
    }
  } catch (e) {
    console.log('Got something back that isn\'t valid JSON');
    console.log(results.choices[0].message.content);
    sendMessage();
  }
}

function draw() {
  
}
