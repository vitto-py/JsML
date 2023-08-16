let sampleSize = 2000;
let samplex = new Array(sampleSize).fill(0).map((x) => Math.random());
let sampley = new Array(sampleSize).fill(0).map((x) => Math.random());
let inputs = [];
let correct = [];
let neuron;

// The function to describe a line
function f(x) {
  let y = 0.3 * x + 0.4;
  return y;
}

/* function linear(x, y) {
  if (x >= y) {
    return +1;
  } else {
    return -1;
  }
} */
function setup() {
  //create training training sample
  createCanvas(400, 400);
  samplex = samplex.map((x) => map(x, 0, 1, 0, width));
  sampley = sampley.map((x) => map(x, 0, 1, 0, height));

  //training sample
  for (let i = 0; i < sampleSize; i++) {
    inputs[i] = [samplex[i], sampley[i], 1];
    if (f(samplex[i]) >= sampley[i]) {
      correct[i] = +1;
    } else {
      correct[i] = -1;
    }
  }
  //frameRate(1); //very slowly

  neuron = new Perceptron();
}

let index = 0;

function draw() {
  background(0);

  //plot right line
  stroke(255);
  line(0, f(0), width, f(width));
  //train slowly
  neuron.train(inputs[index], correct[index]);
  index = (index + 1) % sampleSize;
  console.log(index);

  //draw current line
  // Formula is weights[0]*x + weights[1]*y + weights[2] = 0
  let w = neuron.getWeights();
  let a = -w[0] / w[1];
  let b = -w[2] / w[1];
  let x1 = 0;
  let x2 = width;
  let y1 = +a * x1 + b;
  let y2 = +a * x2 + b;
  stroke(255, 100, 0);
  strokeWeight(3);
  line(x1, y1, x2, y2);

  //how its performing?
  noStroke();
  for (let i = 0; i < index; i++) {
    let guess = neuron.feedforward(inputs[i]);
    stroke(255);
    strokeWeight(1);
    fill(255);
    if (guess > 0) noFill();
    /* stroke(255, 0, 0);
    if (guess == correct[i]) {
      stroke(0, 255, 0);
    } */
    //just draw the point below the current line
    ellipse(inputs[i][0], inputs[i][1], 8, 8);
  }
}

function mousePressed() {
  console.log("train");
  //train 10 times

  /* for (let i = 0; i < sampleSize; i++) {
    neuron.train(inputs[i], correct[i]); 
  } */

  console.log(neuron.getWeights());
}
