function Rocket(position, DNA) {
  if (position == null) {
    this.pos = createVector(random(width), random(height));
  } else {
    this.pos = position;
  }
  if (DNA == null) {
    this.dna = [];

    //attraction factor
    this.dna[0] = random(0, 1); //food
    this.dna[1] = random(-1, 0); //poison

    //perception range
    this.dna[2] = random(10, 100); //food
    this.dna[3] = random(10, 100); //poison

    //reproduction range
    this.dna[4] = random(100, 150); //range
  } else {
    this.dna = DNA;
  }
  this.vel = p5.Vector.random2D(); //default 0,0
  this.acc = createVector(0, 0);
  this.health = 1;
  this.r = 4; //trangle side

  this.isDeath = function () {
    return this.health < 0;
  };

  //controls, eat(), seek() applyForce()
  this.behaviour = function (food_list, poison_list) {
    let foodVector = this.eat(food_list, 1, this.dna[2]);
    let poisonVector = this.eat(poison_list, -0.2, this.dna[3]);

    //do I feel atracted? or repelled?
    foodVector.mult(this.dna[0]);
    poisonVector.mult(this.dna[1]);

    //applyForce
    this.applyForce(foodVector);
    this.applyForce(poisonVector);
  };

  //computes the attraction force to the food, returns Force
  this.seek = function (target) {
    // distance bwn the two points
    let desired = p5.Vector.sub(target, this.pos);
    desired.limit(3);
    // correct direction
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(3);

    return steer;
  };

  //finds the closes element, calls seek
  this.eat = function (list, nutrition, perception) {
    let d = Infinity;
    let closest = null; //the closest element is a vector

    //loops through the list, finds the closest, eliminates
    //the food if dn < 5 px
    for (let k = list.length - 1; k >= 0; k--) {
      let dn = this.pos.dist(list[k]);
      //if it is inside the range he can perceive
      if (dn < d && dn < perception) {
        closest = list[k];
        d = dn;
      }
      if (dn < rr) {
        //If Im close i eat it, even if it is poison
        this.health += nutrition;
        list.splice(k, 1);
      }
    }
    //if found, call seek
    if (closest) {
      //returns a vector (look seek)
      return this.seek(closest);
    }
    //no food left
    return createVector(0, 0);
  };

  this.applyForce = function (force) {
    this.acc.add(force);
    this.acc.limit(5);
  };

  this.update = function () {
    this.health -= 0.005;
    this.vel.add(this.acc);
    this.vel.limit(5);
    this.pos.add(this.vel);
    this.acc.mult(0);
  };

  this.display = function () {
    //color
    let col = lerpColor(color(255, 0, 0), color(0, 255, 0), this.health);
    // Draw a triangle rotated in the direction of velocity
    let angle = this.vel.heading() + PI / 2;

    push();
    translate(this.pos.x, this.pos.y);
    rotate(angle);
    noFill();
    stroke(255);
    ellipse(0, 0, this.dna[4]);
    stroke(0, 255, 0);
    line(0, 0, 0, -this.dna[0] * 25);
    ellipse(0, 0, 2 * this.dna[2]);
    stroke(255, 0, 0);
    line(0, 0, 0, -this.dna[1] * 25);
    ellipse(0, 0, 2 * this.dna[3]);

    fill(col, 150);
    stroke(col);
    strokeWeight(1);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  };

  this.boundaries = function () {
    const d = 9; //distance from the edge
    let trust = 4;
    let desired = null;
    //X
    if (this.pos.x < d) {
      desired = createVector(trust, this.vel.y);
    } else if (this.pos.x > width - d) {
      desired = createVector(-trust, this.vel.y);
    }
    //Y
    if (this.pos.y < d) {
      desired = createVector(this.vel.x, trust);
    } else if (this.pos.y > height - d) {
      desired = createVector(this.vel.x, -trust);
    }

    if (desired !== null) {
      //console.log(desired);
      desired.normalize();
      desired.mult(trust);
      const steer = p5.Vector.sub(desired, this.vel);
      steer.limit(3);
      this.applyForce(steer);
    }
  };
  //findClosestPartner and applies attraction force
  this.findClosestPartner = function (list, index) {
    let d = Infinity;
    let closest = null; //the closest Rocket
    //loops through the list, finds the closest
    for (let k = list.length - 1; k >= 0; k--) {
      let dn = this.pos.dist(list[k].pos);
      if ((dn < d) && (dn < this.dna[4]) && (k != index)) {
        d = dn;
        closest = list[k];
      }
    }
    return closest;
  };

  //reproduce 2 individuals
  this.mate = function (partner) {
    //console.log(partner.pos);
    let d = dist(partner.pos.x, partner.pos.y, this.pos.x, this.pos.y);
    //console.log(d);
    if (d < 3) {
      let DNA = [];
      let p = floor(random(this.dna.length)); //

      //DNA construnction
      for (let i = 0; i < this.dna.length; i++) {
        if (i < p) {
          DNA[i] = this.dna[i]; //mom
        } else {
          DNA[i] = partner.dna[i]; //dad
        }
      }
      //console.log(DNA)
      /* //DNA mutation
      for (let i = 0; i < dna.length; i++) {
        if (random() < 0.01) {
          //1%
          dna[i] += random(-0.1 * dna[i], 0.1 * dna[i]);
        }
      } */

      return new Rocket(createVector(width/2, height/2), DNA);
    }
    return null;
  };

  this.nextGen = function (rocket_list, index) {
    //console.log(rocket_list);
    let closest = this.findClosestPartner(rocket_list, index);
    if (closest != null) {
      return this.mate(closest);
    }
    return null;
  };
}
