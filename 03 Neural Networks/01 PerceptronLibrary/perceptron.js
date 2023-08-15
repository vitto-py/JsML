function sign(y) {
  if(y>=0) {return +1} else {return -1} 
}


class Perceptron() {
  this.weights = [];
  this.alpha = 0.001;

  for (let i = 0; i  < 3 ; i ++) {
    this.weights[i] = random();
    //x,y and bias
  }
  foward(inputs) {
    //guess operation
    let sum = 0;
    for (let i  = 0; i < inputs.length; i++) {
      sum += this.weights[i]*inputs[i];
    }
    return this.activation(sum);
  }

  activation(y) {
    if(y>=0) {return +1} else {return -1} 
  }

  train(inputs, target) {
    //calculate the output
    let guess = this.foward(inputs);
    
    //calculate the error
    let error = target - guess;
    
    //correct the wights based on the error (if error=0 no correction)
    for (let i = 0; i < inputs.length; i++) {
      this.wieghts[i] += error*this.weight[i]*this.alpha;    
    }   

  }
}
