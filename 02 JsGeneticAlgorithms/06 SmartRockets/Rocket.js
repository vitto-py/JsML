function Rocket() {
  this.pos = createVector(width/2,height);
  this.vel = createVector(); //default 0,0
  this.acc = createVector();
  this.fitness = 0;
  this.normFitness = 0;

  this.dna = new DNA();

  this.applyForce = function(force) {
    this.acc.add(force)
  }

  this.update = function() {
    //each frame will apply a new force stored in dna.genes
    this.acc.add(this.dna.genes[count]) 

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

  this.fitCalc = function() {
    let d = dist(this.pos.x, this.pos.y, target.x, target.y);
    this.fitness = round(1/d,5) //the closer the better
  }

  this.reproduce = function (partner) {
    let p = floor(random(lifespan)) //split point 
    let child = new DNA();
    for (let j = 0; j < lifespan; j++) {
      if (j < p) {child.genes[j] = this.dna.genes[j]} 
      else {child.genes[j] = partner.dna.genes[j]}      
    }
    return child;
  };
}