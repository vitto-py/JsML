function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

//let nn = neural_network(nlayer_input,nhidden_layers, noutput_layers )
class Neural_Network {
  constructor(numI, numH, numO) {
    this.input_nodes = numI;
    this.hidden_nodes = numH;
    this.output_nodes = numO;
    //weight matricies - compact form (+1 is for the bias)
    this.wieght_IH = new Matrix(this.hidden_nodes, this.input_nodes);
    this.wieght_HO = new Matrix(this.output_nodes, this.hidden_nodes);
    //initialize
    this.wieght_IH.randomize();
    this.wieght_HO.randomize();
    //bias
    this.bias_h = new Matrix(this.hidden_nodes, 1);
    this.bias_o = new Matrix(this.output_nodes, 1);
    //initialize
    this.bias_h.randomize();
    this.bias_o.randomize();
  }

 

  feedfoward(input_array) {
    //input is an array of length X
    let input = Matrix.fromArray(input_array);

    //hidden layer
    let hidden = Matrix.multiply(this.wieght_IH, input);
    hidden.add(this.bias_h); //add +1 for the bias
    hidden.map(sigmoid);

    //output layer
    let output = Matrix.multiply(this.wieght_HO, hidden);
    output.add(this.bias_o);
    output.map(sigmoid);

    return output;
  }

  train(inputs, targets) {
    let m_target = Matrix.fromArray(targets);
    let outputs = this.feedfoward(inputs)

    let error = Matrix.substract(m_target, outputs)

  }
  
}
