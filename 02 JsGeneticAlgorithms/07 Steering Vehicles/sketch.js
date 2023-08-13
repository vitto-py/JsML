let rockets = [];
let foods = [];
let poisons = [];
let rr = 4;

function setup() {
  createCanvas(400, 400);
  //foods
  for (let i = 0; i < 10; i++) {
    foods[i] = createVector(random(10,width-10), random(10,height-10));
  }
  //poison
  for (let i = 0; i < 20; i++) {
    poisons[i] = createVector(random(10,width), random(10,height));
  }
  //vehicles
  for (let i = 0; i < 3; i++) {
    rockets[i] = new Rocket();
  }
}

function draw() {
  background(0);

  if (random() < 0.05) {
    foods.push(createVector(random(10,width-10), random(10,height-10)));
  }

  if (random() < 0.0005) {
    rockets.push(new Rocket());
  } 

  if (random() < 0.01) {
    poisons.push(createVector(random(10,width), random(10,height)));
  }

  //food
  fill(0, 255, 0);
  for (let i = 0; i < foods.length; i++) {
    ellipse(foods[i].x, foods[i].y, 2 * rr);
  }

  //poison
  fill(255, 0, 0);
  for (let i = 0; i < poisons.length; i++) {
    ellipse(poisons[i].x, poisons[i].y, 2 * rr);
  }

  for (let i = 0; i < rockets.length; i++) {
    //console.log(i);
    rockets[i].boundaries();
    rockets[i].behaviour(foods, poisons);
    rockets[i].update();
    rockets[i].display();
   
    let child = rockets[i].nextGen(rockets, i)
    //console.log(child);
    if (child && rockets.length < 6) {
      rockets.push(child)
    } 
      //rockets.push(rockets[i].mate(nearRocket));

  }

  for (let i = rockets.length - 1; i >= 0; i--) {
    if (rockets[i].isDeath()) {
      rockets.splice(i, 1);
    }
  }
  //noLoop();
}
