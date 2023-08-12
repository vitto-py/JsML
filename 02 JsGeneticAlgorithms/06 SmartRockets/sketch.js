let rockets;

function setup() {
  createCanvas(400,400);
  background(0);
  rockets = new Population();
}

function draw() {
  background(0,25)
  rockets.display()

}

function Population() {
  this.popSize = 20
  this.popux = []

  for (let i = 0; i < this.popSize; i++) {
    this.popux[i] = new Rocket();
  }

  this.display = function() {
    for (let i = 0; i < this.popSize; i++) {
      this.popux[i].applyForce()
      this.popux[i].update()
      this.popux[i].show()

    }
  }
}

function Rocket() {
  this.pos = createVector(width/2,height);
  this.vel = p5.Vector.random2D();;
  this.acc = createVector();

  this.applyForce = function(force) {
    this.acc.add(force)
  }

  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.show = function() {
    push(); 
    noStroke();
    fill(255,100)
    translate(this.pos.x, this.pos.y)
    rotate(this.vel.heading()) //gives you the direction of the vector (angle)
    rectMode(CENTER)
    rect(0,0,20,5)
    pop();
  }
}