

function newChar() {
	let c = floor(random(65,123));
	if (c == 91) {c = 32;} //white space
	if (c == 92) {c = 46;} //dot
	return String.fromCharCode(c);
}

class DNA {
	constructor(len) {
		this.genes = [];
		this.fitness = 0;
		for (let i = 0; i < len; i++) {this.genes.push(newChar());}
	}



	getPhrase() {
		return this.genes.join('');
	}

	calcFitness(target) {
		let score = 0;
		for (let i = 0; i < target.length; i++) {
			if (target[i] == this.genes[i]) {
				score += 1;
			}
		}
		//this.fitness = score/target.length; //linear likehood
		this.fitness = pow(score/target.length,3); //exponential likelihood
		//la forma exponencial le da mas peso a aquellos que tienen mas caracteres correctos
	}

	crossover(father) {
		let child = new DNA(this.genes.length);
		let midpoint = floor(random(this.genes.length));
		for (let i = 0; i < this.genes.length; i++) {
			if (i < midpoint) {child.genes[i] = this.genes[i]; }
			else {child.genes[i] = father.genes[i];}
		}
		return child;
	}

	mutate(mutationRate) {
		for (let i = 0; i < this.genes.length; i++) {
			if (random() < mutationRate) {this.genes[i] = newChar()}
		}
	}
}