let n = 4;

let lines; // array of individual lines
let input; // the entire text
let re;
let probabilities;
let generatedText = "";

let textMargin = 20;
let textX = textMargin;
let textY = textMargin;

function preload() {
  lines = loadStrings("text.txt");
  frameRate(5);
}

function setup() {
  createCanvas(400, 400);
  background(220);
  textSize(18);

  // this prepares a "regular expression"
  // used to split text into word-tokens
  let wordDelimiters = ' .,:;"“?!\n';
  re = new RegExp('(?=[' + wordDelimiters + '])|(?<=[' + wordDelimiters + '])', 'g');

  input = lines.join(" ");
  probabilities = analyze(input);
  //console.log(probabilities);
}

function draw() {
  let nextChars = generate(probabilities, generatedText);
  //console.log(nextChars);
  generatedText = generatedText + nextChars;

  // print new text to canvas
  if (textX + textWidth(nextChars) >= width - textMargin) {
    textY = textY + textAscent() + textDescent();
    textX = textMargin;
  }
  text(nextChars, textX, textY);
  textX = textX + textWidth(nextChars);
}

function analyze(str) {
  // turn string into an array of word-tokens
  let words = str.split(re);
  
  let counts = {};
  // count how often each n-gram occurs
  for (let i = 0; i < words.length - n + 1; i++) {
    let ngram = "";
    for (let j = i; j < i + n; j++) {
      ngram = ngram + words[j];
    }
    if (counts[ngram]) {
      counts[ngram]++; // seen before, add one
    } else {
      counts[ngram] = 1; // start with count 1
    }
  }
  // turn the count into probability (0-1)
  for (let ngram in counts) {
    counts[ngram] = counts[ngram] / (words.length - n + 1);
  }
  return counts;
}

function generate(probabilities, previousOutput) {
  let selected;
  let needle = '';

  if (previousOutput.length == 0) {
    // at the beginning of generation, start with any
    selected = probabilities;
  } else {
    // for all other times, we need to first select
    // all the n-grams that start with the last tokens
    // of the current text
    let previousOutputWords = previousOutput.split(re);
    
    selected = {};
    needle = previousOutputWords.slice(-1 * (n-1)).join('');
    //console.log('looking for', '"' + needle + '"')
    let sum = 0;
    for (let ngram in probabilities) {
      if (ngram.startsWith(needle)) {
        selected[ngram] = probabilities[ngram];
        sum = sum + probabilities[ngram];
      }
    }
    // normalize the probabilities
    for (let ngram in selected) {
      selected[ngram] = selected[ngram] / sum;
    }
    if (Object.keys(selected).length == 0) {
      console.error("This shouldn't happen");
    }
  }

  // pick a random number 0..1
  let rand = random();
  let sum = 0;
  for (let ngram in selected) {
    // check if we landed "inside" the probability
    // of the current character (higher probability
    // == more chance for a match)
    if (sum + selected[ngram] >= rand) {
      if (previousOutput.length == 0) {
        //console.log('picked', '"' + ngram + '"');
        return ngram; // return the entire ngram
      } else {
        //console.log('picked', '"' + ngram + '"');
        return ngram.substr(needle.length);
      }
    }
    sum = sum + selected[ngram];
  }
  console.error("This also shouldn't happen");
}
