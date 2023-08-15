



class Population {
    constructor(p, m, num) {
        this.population = [];
        this.matingPool = [];
        this.generations = 0; // counter
        this.finished = false; // flag

        this.target = p; // Target phrase
        this.mutationRate = m; // Mutation rate
        this.perfectScore = 1; //perfection

        this.best = ""; // just to print the best phrase on screen

        for (let i = 0; i < num; i++) {
            this.population[i] = new DNA(this.target.length);
            // array of arrays [, , , , ] -> [[A,B,C,D], [A,x,C,r], [w,?,s,A], ....]
        }
    }

    calcFitness() {
        for (let i = 0; i < this.population.length; i++) {
          this.population[i].calcFitness(this.target); //just call the DNA method
        }
    }

    acceptReject(maxFitness) {
      let i = 0
      while(i < 1000) {
        let ix = floor(random(this.population.length)) //pick an element

        let proba = random(0,maxFitness) //run your chances
        if (proba < this.population[ix].fitness) { //is proba less that your possibilities?
          //if you have a fitness of 10%, few times are gonna be picked
          return ix
        } 
        i++
      }
    }
    generateNextGeneration() {
        //compute individuals over its chances of reproduction
        //reproduction probability proportional to FITNESS
        //THIS IS THE PART THAT I CHANGED to RejectionSampling
        //max fitness probability

        let maxFitness = 0;
        for (let i = 0; i < this.population.length; i++) {if (this.population[i].fitness > maxFitness) {maxFitness = this.population[i].fitness;}}

        //create a new array where the number of individuals is proportional to its fitness 
      //DONT FOTGET THIS  
      this.matingPool = []; // restart the pool
        
      let newPopu = []; 
      //crossover
      for (let i = 0; i < this.population.length ; i++) {
        let randomIndexA = this.acceptReject(maxFitness)
        let randomIndexB = this.acceptReject(maxFitness)
        let child = this.population[randomIndexA].crossover(this.population[randomIndexB]);
        newPopu.push(child); //aux Array
        console.log(newPopu)
      }
      
      this.population = newPopu;

      //mutation
      for (let i = 0; i < this.population.length ; i++) {
        this.population[i].mutate(this.mutationRate);
      }

      this.generations += 1;
  }


    // compute metrics
    eval() {
        let bestOne = 0.0;
        let bestOneIndex = 0;

        // get fittest member
        for (let i = 0; i < this.population.length; i++) { if (this.population[i].fitness > bestOne) {bestOne  = this.population[i].fitness; bestOneIndex = i;}}
    
        // best phrase
        this.best = this.population[bestOneIndex].getPhrase();
        // has the stop criteria been reached?
        if (bestOne == 0.01 + this.perfectScore) {
            this.finished = true;
        }
    }

    // No important methods ------------------------------------------
    getFinished() {return this.finished;}

    getBest() {return this.best;}

    getGenerations() {return this.generations;}

    getAverageFitness() {
        let score = 0;
        for (let i = 0; i < this.population.length; i++) {score += this.population[i].fitness}
        return score/this.population.length;
    }

    getAllPhrases() {
        let phrases = [];
        for (let i = 0; i < this.population.length; i++) {
            phrases.push(this.population[i].getPhrase());
        }
        return phrases;
    }

}
