let rockets;
let lifespan = 400;
let count = 0;
let target;
let mutationRate = 0.01;
let obstacle;
let ow = 200;
let oh = 25;

function setup() {
  createCanvas(400, 400);
  background(0);
  target = createVector(width / 2, 50);
  obstacle = createVector(100, 150);
  rockets = new Population();
  
}

function draw() {
  background(0);
  ellipse(target.x, target.y, 15, 15);
  rect(obstacle.x, obstacle.y, ow, oh)
  rockets.display();
  count++;

  if (count > lifespan) {
    rockets.displayFitness();
    rockets.nextGen();
    count = 0;
  }
}
