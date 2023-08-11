



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

    generateNextGeneration() {
        //compute individuals over its chances of reproduction
        //reproduction probability proportional to FITNESS

        //max fitness probability
        let maxFitness = 0;
        for (let i = 0; i < this.population.length; i++) {if (this.population[i].fitness > maxFitness) {maxFitness = this.population[i].fitness;}}

        //create a new array where the number of individuals is proportional to its fitness 
        this.matingPool = []; // restart the pool
        for (let i = 0; i < this.population.length; i++) {
            let howManyTimes = Math.floor(map(this.population[i].fitness, 0, maxFitness, 0, 100));
            for (let j = 0; j < howManyTimes; j++) {this.matingPool.push(this.population[i]);}}
        
        
        //crossover
        for (let i = 0; i < this.population.length ; i++) {
            let randomIndexA = Math.floor(random(0,this.matingPool.length));
            let randomIndexB = Math.floor(random(0,this.matingPool.length));
            let child = this.matingPool[randomIndexA].crossover(this.matingPool[randomIndexB]);
            this.population[i] = child;
        }

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
        if (bestOne == this.perfectScore) {
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