let rockets = [];
let foods = [];
let poisons = [];

function setup() {
  createCanvas(400, 400);
  //foods
  for (let i = 0; i < 20; i++) {
    foods[i] = createVector(random(width), random(height));
  }
  /* //poison
  for (let i = 0; i < 10; i++) {
    poisons[i] = createVector(random(width), random(height));
  } */
  //vehicles
  for (let i = 0; i < 1; i++) {
    rockets[i] = new Rocket();
  }
}

function draw() {
  background(0);
  fill(0, 255, 0);
  for (let i = 0; i < foods.length; i++) {
    ellipse(foods[i].x, foods[i].y, 20, 20);
  }

  /* fill(255, 0, 0);

  for (let i = 0; i < foods.length; i++) {
    ellipse(poisons[i].x, poisons[i].y, 7, 7);
  } */
  for (let i = 0; i < rockets.length; i++) {
    rockets[i].eat(foods, 0.5);
    rockets[i].update();
    rockets[i].display();
  }

  noLoop();
}
