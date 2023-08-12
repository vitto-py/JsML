let rockets;
let lifespan = 400;
let count=0;
let target;

function setup() {
  createCanvas(400,400);
  background(0);
  target = createVector(width/2, 50)
  rockets = new Population();

}

function draw() {
  background(0)
  ellipse(target.x, target.y, 15, 15)
  rockets.display()
  count++;
}


