class Perceptron {
  constructor() {
    this.weights = [];
    this.alpha = 0.001;

    for (let i = 0; i < 3; i++) {
      this.weights[i] = random(-100, 100);
      //x,y and bias
    }
  }

  train(inputs, target) {
    //calculate the output
    let guess = this.feedforward(inputs);
    //calculate the error
    let error = target - guess;
    //console.log(this.weights);

    //correct the wights based on the error (if error=0 no correction)
    for (let i = 0; i < inputs.length; i++) {
      this.weights[i] += error * inputs[i] * this.alpha;
    }
  }

  feedforward(inputs) {
    //guess operation
    let sum = 0;
    for (let i = 0; i < inputs.length; i++) {
      sum += this.weights[i] * inputs[i];
    }
    //console.log(this.activate(sum));
    return this.activate(sum);
  }

  activate(y) {
    if (y >= 0) {
      return +1;
    } else {
      return -1;
    }
  }

  getWeights() {
    return this.weights;
  }
}
