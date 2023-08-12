function Rocket() {
  this.pos = createVector(width / 2, height);
  this.vel = createVector(); //default 0,0
  this.acc = createVector();
  this.fitness = 0;
  this.normFitness = 0;
  this.hitTarget = false;
  this.hitObstacle = false;
  this.hitWall = false;

  this.dna = new DNA();

  this.applyForce = function (force) {
    this.acc.add(force);
  };

  this.update = function () {
    //each frame will apply a new force stored in dna.genes
    
    if (!this.hitTarget && !this.hitObstacle && !this.hitWall) {
      this.acc.add(this.dna.genes[count]);
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }
  };

  this.show = function () {
    push();
    noStroke();
    fill(255, 100);
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading()); //gives you the direction of the vector (angle)
    rectMode(CENTER);
    rect(0, 0, 20, 5);
    pop();
  };

  this.fitCalc = function () {
    let d = dist(this.pos.x, this.pos.y, target.x, target.y);
    this.fitness = round(map(d, 0, width, width, 0, true), 2);
    //the closer the better
    
    //has hit the target?
    if (this.fitness > 390 ) {
      this.hitTarget = true;
      this.fitness *= 10;
    }
    
    //has hit the wall?
    if (this.pos.x > 400 || this.pos.x < 0 || this.pos.y > 400 ||this.pos.y < 0) {
      this.hitWall = true;
      this.fitness /= 10;
    }

    //has hit the obstable?
    if (this.pos.x > obstacle.x && this.pos.x < (obstacle.x + ow) 
      && this.pos.y > obstacle.y && this.pos.y < (obstacle.y + oh)) {
      this.hitObstacle = true;
      this.fitness /= 40;
      //console.log("hitted")
    }
  };

  this.reproduce = function (partner) {
    let child = new Rocket();
    let p = floor(random(lifespan)); //split point
    //let childDNA = new DNA();
    for (let j = 0; j < lifespan; j++) {
      if (j < p) {
        child.dna.genes[j] = this.dna.genes[j];
      } else {
        child.dna.genes[j] = partner.dna.genes[j];
      }
    }
    child.dna.mutation();
    return child;
  };
}
