let rockets = [];
let foods = [];
let poisons = [];

function setup() {
  createCanvas(400, 400);
  //foods
  for (let i = 0; i < 10; i++) {
    foods[i] = createVector(random(width), random(height));
  }
  //poison
  for (let i = 0; i < 20; i++) {
    poisons[i] = createVector(random(width), random(height));
  }
  //vehicles
  for (let i = 0; i < 3; i++) {
    rockets[i] = new Rocket();
  }
}

function draw() {
  background(0);

  if (random() < 0.05) {
    foods.push(createVector(random(width), random(height)));
  }

  if (random() < 0.005) {
    rockets.push(new Rocket());
  }

  if (random() < 0.01) {
    poisons.push(createVector(random(width), random(height)));
  }

  //food
  fill(0, 255, 0);
  for (let i = 0; i < foods.length; i++) {
    ellipse(foods[i].x, foods[i].y, 20, 20);
  }

  //poison
  fill(255, 0, 0);
  for (let i = 0; i < poisons.length; i++) {
    ellipse(poisons[i].x, poisons[i].y, 20, 20);
  }

  for (let i = rockets.length - 1; i >= 0; i--) {
    //console.log(i);
    rockets[i].behaviour(foods, poisons);
    rockets[i].update();
    rockets[i].display();
    rockets[i].health -= 0.01;
  }
  for (let i = rockets.length - 1; i >= 0; i--) {
    if (rockets[i].isDeath()) {
      rockets.splice(i, 1);
    }
  }
  //noLoop();
}
