
console.log('ml5 version:', ml5.version)

/*  the the "SpeechCommands18w" which can recognize "the ten digits from "zero" to 
"nine", "up", "down", "left", "right", "go", "stop", "yes", "no", as well as the 
additional categories of "unknown word" and "background noise"." */

let soundClassifier;
let resultP;

function preload() {
  let options = { probabilityThreshold: 0.90 };
  soundClassifier = ml5.soundClassifier('SpeechCommands18w', options);
  console.log("model loaded")
}

function setup() {
  createCanvas(400, 100);
  background(0);
  resultP = createP('waiting...');
  resultP.style('font-size','32pt');
  soundClassifier.classify(gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.log('something went wrong');
    console.error(error);
  }
  resultP.html(`${results[0].label} : ${results[0].confidence}`);
}