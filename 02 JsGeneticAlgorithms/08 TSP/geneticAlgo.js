function calcFitness(cities, order, index) {
  //particular order = [3,2,6,1,...]
  let total = 0;
  for (let i = 0; i < order.length - 1; i++) {
    let d = dist(cities[order[i]].x, cities[order[i]].y, cities[order[i+1]].x, cities[order[i+1]].y);
    total += d;
  }
  fitness[index] = 1/total; //the smaller, the better
}

function fitnessNormalization(fitness) {
  let total = 0;
  let bestDist = Infinity;
  for (let ix = 0; ix < fitness.length; ix++) {
    total += fitness[ix];
    if (fitness[ix] < bestDist) {
      bestDist = fitness[ix];
      bestOrder = ix; //at this index
    }
  }

  for (let ix = 0; ix < fitness.length; ix++) {
    fitnessNorm[i] = fitness[ix]/total;
  }

}

