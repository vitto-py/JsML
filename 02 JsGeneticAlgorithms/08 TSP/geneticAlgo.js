function arrayFitness() {
  for (let k = 0; k < population.length; k++) {
    let fit = calcFitness(population[k], k);
    fitness[k] = 1 / fit;

    if (fitness[k] > bestDist) {
      bestDist = fitness[k];
      bestOrder = population[k].slice(); //best order
    }
  }
}

function calcFitness(order, index) {
  //particular order = [3,2,6,1,...]
  let total = 0;
  for (let i = 0; i < order.length - 1; i++) {
    let d = dist(
      cities[order[i]].x,
      cities[order[i]].y,
      cities[order[i + 1]].x,
      cities[order[i + 1]].y
    );
    total += d;
  }
  return total; //the smaller, the better
}

function fitnessNormalization() {
  let total = 0;
  for (let ix = 0; ix < fitness.length; ix++) {
    total += fitness[ix];
  }

  for (let ix = 0; ix < fitness.length; ix++) {
    fitnessNorm[ix] = fitness[ix] / total;
  }
}

function pickOne(listProb) {
  //listProb = fitnessNorm
  let arrow = random(1);
  let index = 0;
  while (arrow > 0) {
    arrow = arrow - listProb[index];
    index++;
  }
  index--; //look at the index++, you evaluate buffer in the next cycle
  return index; //indice de poblacion[index]
}


function nextGeneration() {
  let newPop = [];
  for (let j = 0; j < population.length; j++) {
    ixA = pickOne(fitnessNorm);
    newPop[j] = population[ixA].slice();
  }

  for (let j = 0; j < population.length; j++) {
    mutateOrder(newPop[j], 0.015);
  }

  population = newPop;

}

function mutateOrder(order, rate) {
  if (random() < rate) {
    let ixA = floor(random(order.length));
    let ixB = floor(random(order.length));
    orderShuffle(order,ixA, ixB)
  }
}