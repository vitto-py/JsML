let rockets;
let lifespan = 200;

function setup() {
  createCanvas(400,400);
  background(0);
  rockets = new Population();
}

function draw() {
  background(0,25)
  rockets.display()

}


