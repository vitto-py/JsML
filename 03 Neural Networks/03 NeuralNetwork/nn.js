function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

//derivative of sigmoid
function dsigmoid(x) {
  //return sigmoid(x) * (1 - sigmoid(x));
  return x * (1 - x);
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
    this.alpha = 0.1;
  }

  feedfoward(input_array) {
    //input is an array of length X
    let input = Matrix.fromArray(input_array);

    //hidden layer
    let hidden = Matrix.multiply(this.wieght_IH, input);
    hidden.add(this.bias_h); //add +1 for the bias
    hidden.matrix.map(sigmoid);

    //output layer
    let output = Matrix.multiply(this.wieght_HO, hidden);
    output.add(this.bias_o);
    output.map(sigmoid);

    return output;
  }

  train(only_one_sample, targets) {
    //BACKPROPAGATION + GRADIENT DESC
    /*
    el problema es que los gradientes dependen de la estructura, 
    voy a usar (2,2,1) -> VER HOJA CON MATHs para ver todas las 
    derivadas parciales
    1 example
    w0 = w0 - alpha*(1/m)*sumatoria(de 0 a m-1)dL/dw0
    donde 
    dL/dw0 = dL/da2 * da2/da0  * da0/dw0

    porque la sumatoria? porque esta es la ecuacion completa
    y ese w0 esta siendo actualizado con los M-1 datos, esta
    funcion es mas simple y solo le podes pasar 1 sample
    */

    //CAST
    let y = Matrix.fromArray(targets);

    //input ERRORS
    //let outputs = this.feedfoward(inputs);
    // BC I need the intermediate points I cant use foward

    // -- FOWARD ----------------------------
    let x0x1 = Matrix.fromArray(only_one_sample);

    //hidden layer
    let hidden = Matrix.multiply(this.wieght_IH, x0x1);
    hidden.add(this.bias_h); //add +1 for the bias
    let a0a1 = Matrix.map(sigmoid, hidden);

    //output layer
    let a2 = Matrix.multiply(this.wieght_HO, a0a1);
    a2.add(this.bias_o);
    //a2.map(sigmoid); //NO MAS DERIVADAS!
    // --------------------------------------

    // ERRORS ABS(target-guess)
    let error_o = Matrix.substract(y, a2);

    //hidden ERRORS
    let ho_trans = Matrix.transpose(this.wieght_HO);
    let error_h = Matrix.multiply(ho_trans, error_o);
    //input ERRORS
    let ih_trans = Matrix.transpose(this.wieght_IH);
    let error_i = Matrix.multiply(ih_trans, error_h);
    console.table(error_o.matrix);

    //Todas las derivadas Parciales
    /* 
           b0
            |
      x1 - a0
         X    > a2 -> 
      x2 - a1    |
            |    |
           b1   b2

      Loss = (1/2)*(y-a2)²
      a2 = w4*a0 + w5*a1 + b2
      a0 = sigma(w0x0 + w2x1 + b0)
      a1 = sigma(w1x0 + w3x2 + b1)
    */
    //layer output
    let da2 = -error_o.matrix;
    let db2 = -error_o.matrix;

    //matrix HO
    let dw5 = a0a1.matrix[1] * da2;
    let dw4 = a0a1.matrix[0] * da2;
    let dHO = Matrix.fromArray([dw4, dw5]);
    dHO = Matrix.transpose(dHO);

    //layer hidden a0
    let db0 =
      da2 *
      this.wieght_HO.matrix[0][0] *
      a0a1.matrix[0] *
      (1 - a0a1.matrix[0]) *
      1;
    let dw0 =
      da2 *
      this.wieght_HO.matrix[0][0] *
      a0a1.matrix[0] *
      (1 - a0a1.matrix[0]) *
      x0x1.matrix[0];
    let dw2 =
      da2 *
      this.wieght_HO.matrix[0][0] *
      a0a1.matrix[0] *
      (1 - a0a1.matrix[0]) *
      x0x1.matrix[1];

    //layer hidden a1
    let db1 =
      da2 *
      this.wieght_HO.matrix[0][1] *
      a0a1.matrix[1] *
      (1 - a0a1.matrix[1]) *
      1;
    let dw1 =
      da2 *
      this.wieght_HO.matrix[0][1] *
      a0a1.matrix[1] *
      (1 - a0a1.matrix[1]) *
      x0x1.matrix[0];
    let dw3 =
      da2 *
      this.wieght_HO.matrix[0][1] *
      a0a1.matrix[1] *
      (1 - a0a1.matrix[1]) *
      x0x1.matrix[1];

    //Gradient
    dHO.multiply(-this.alpha);
    this.wieght_HO.add(dHO);
    this.bias_o.add(db2 * -this.alpha);

    let dW = new Matrix(2, 2);
    dW.matrix[0][0] = dw0;
    dW.matrix[0][1] = dw2;
    dW.matrix[1][0] = dw1;
    dW.matrix[1][1] = dw3;
    dW.multiply(-this.alpha);
    this.wieght_IH.add(dW);
    let db = Matrix.fromArray([db0, db1]);
    db.multiply(-this.alpha);
    this.bias_h.add(db);

  }
}
