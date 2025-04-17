// Note: this sketch consists of additional JavaScript
// files. Make sure to duplicate it, rather than copying
// and pasting code :)

let openai_api_proxy = "https://sordid-hexagonal-bunny.glitch.me/";

function setup() {
  createCanvas(400, 400);

  let params = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: "What food do you like best",
      },
    ],
    temperature: 0.7,
    n:2
  };

  requestOAI("POST", "/v1/chat/completions", params, gotResults);
}

function gotResults(results) {
  console.log(results);
  //text(results,width/2,height/2)
}

function draw(results) {
  background(220);
  //text(results,width/2,height/2)
}
