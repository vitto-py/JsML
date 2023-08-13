//Visual form of the travel sales person - USES DRAW as main loop

let cities = [];
let bestDist = 0;
let bestOrder = [];
let fitnessNorm = [];
let fitness = [];
let population = []; //array of array (several orders)

function setup() {
  createCanvas(400, 400);
  //frameRate(10);
  //create cities
  for (let i = 0; i < 10; i++) {
    cities[i] = createVector(
      random(0.1 * width, width * 0.9),
      random(0.1 * width, width * 0.9)
    );
  }

  //order = [0,1,2,3...]
  let order = [];
  for (let i = 0; i < cities.length; i++) {
    order[i] = i;
  }

  //40 combination of orders
  for (let i = 0; i < 100; i++) {
    population[i] = shuffle(order.slice());
  }
}

function draw() {
  background(0);

  arrayFitness();
  fitnessNormalization();
  nextGeneration();

  //draw cities
  fill(255);
  noStroke();
  for (let i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y, 10);
  }

  //draw best path
  //Conect dots
  stroke(255, 0, 255);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let i = 0; i < cities.length; i++) {
    vertex(cities[bestOrder[i]].x, cities[bestOrder[i]].y);
  }
  endShape();

  //noLoop();
}

function swap() {
  //shuffle points
  let i = Math.floor(Math.random() * cities.length);
  let j = Math.floor(Math.random() * cities.length);
  orderShuffle(cities, i, j);
}

function orderShuffle(a, i, j) {
  let aux = a[i];
  a[i] = a[j];
  a[j] = aux;
}
