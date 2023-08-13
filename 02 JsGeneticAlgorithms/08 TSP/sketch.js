//Visual form of the travel sales person - USES DRAW as main loop

let stops = [];
let minDist = 0;
let bestOrder = [];
let fitnessNorm = [];
let fitness = [];


function setup() {
  createCanvas(400, 400);
  frameRate(1);

  for (let i = 0; i < 10; i++) {
    stops[i] = createVector(random(0.1*width, width*0.9), random(0.1*width, width*0.9));
  }

  minDist = calcDistance(stops);
  bestOrder = stops.slice();

}

function draw() {

  //draw nodes
  background(0);
  fill(255);
  for (let i = 0; i < stops.length; i++) {
    ellipse(stops[i].x, stops[i].y,10);
  }


  //Conect dots
  stroke(255, 180);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let i = 0; i < stops.length; i++) {
    vertex(stops[i].x, stops[i].y);
  }
  endShape();


  //draw best path
  //Conect dots
  stroke(255, 0,255);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let i = 0; i < stops.length; i++) {
    vertex(bestOrder[i].x, bestOrder[i].y);
  }
  endShape();

  //shuffle points
  let i = Math.floor(Math.random()*stops.length);
  let j = Math.floor(Math.random()*stops.length);
  orderShuffle(stops,i,j)

  




}




function orderShuffle(a,i,j) {
  let aux = a[i];
  a[i] = a[j];
  a[j] = aux;

}



