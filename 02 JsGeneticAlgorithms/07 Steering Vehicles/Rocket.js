function Rocket() {
  this.pos = createVector(random(width), random(height));
  this.vel = p5.Vector.random2D(); //default 0,0
  this.acc = createVector(0, 0);
  this.health = 1;
  this.r = 4; //trangle side
  this.dna = [];

  //attraction factor
  this.dna[0] = random(-3, 3); //food
  this.dna[1] = random(-3, 3); //poison

  this.behaviour = function () {};

  //computes the attraction force to the food, calls applyForce
  this.seek = function (target) {
    // distance bwn the two points
    let desired = p5.Vector.sub(target, this.pos);
    // correct direction
    let steer = p5.Vector.sub(this.vel, desired);
    steer.limit(3);

    return this.applyForce(steer);
  };

  this.eat = function (list, nutrition) {
    let d = Infinity;
    let closest = null; //the closest element is a vector

    //loops through the list, finds the closest, eliminates
    //the food if dn < 5 px
    for (let k = list.length - 1; k >= 0; k--) {
      let dn = abs(dist(list[k].x, list[k].y, this.pos.x, this.pos.y));
      if (dn < d) {
        closest = list[k];
        d = dn;
      }
      if (dn < 5) {
        list.splice(k, 1);
      }
    }
    //if found, call seek
    if (closest) {
      //no food left
      this.health += nutrition;
      return this.seek(closest);
    }
    return createVector(0, 0);
  };

  this.applyForce = function (force) {
    this.acc.sub(force);
    this.acc.limit(3);
  };

  this.update = function () {
    this.vel.add(this.acc);
    this.vel.limit(3);
    this.pos.add(this.vel);
    this.acc.mult(0);
  };

  this.display = function () {
    // Draw a triangle rotated in the direction of velocity
    let angle = this.vel.heading() + PI / 2;
    push();
    translate(this.pos.x, this.pos.y);
    rotate(angle);
    fill(255);
    stroke(255);
    strokeWeight(1);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  };
}
