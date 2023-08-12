//handles the macro interactions of rockets
function Population() {
  this.popSize = 100;
  this.popux = [];

  for (let i = 0; i < this.popSize; i++) {
    this.popux[i] = new Rocket();
  };

  this.displayFitness = function() {
    let maxFitness = 0;
    for (let k = 0; k < this.popSize; k++) {
      if (this.popux[k].fitness > maxFitness){
        maxFitness = this.popux[k].fitness
      }
    }
    console.log(maxFitness);
  }

  this.display = function() {
    for (let i = 0; i < this.popSize; i++) {
      this.popux[i].applyForce()
      this.popux[i].update()
      this.popux[i].show()
      this.popux[i].fitCalc();
    }
  }



  this.nextGen = function() {
    let total = 0;
    for (let index = 0; index < this.popSize; index++) {
      total += this.popux[index].fitness;
    }
    // normalize
    for (let index = 0; index < this.popSize; index++) {
      this.popux[index].normFitness = this.popux[index].fitness / total;
      //all prob add to 1
    }

    // pickBased on
    let newPop = [];
    for (let index = 0; index < this.popSize; index++) {
      let ixA = this.pickOne();
      let ixB = this.pickOne();
      //rocketA, rocketB = baby rocket
      newPop[index] = this.popux[ixA].reproduce(this.popux[ixB]);
    }
    this.popux = newPop;
  }

  this.pickOne = function() {
    //from that (add to 1) 
    let arrow = random(1);
    let index = 0;
    while(arrow > 0) {
      arrow = arrow - this.popux[index].normFitness 
      index++;
    }  
    index--; //look at the index++, you evaluate buffer in the next cycle
    return index;
  }
}
