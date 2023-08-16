// let m = new Matrix(rows, cols)

function Matrix(nrows, ncols) {
  this.rows = nrows;
  this.cols = ncols;
  this.matrix = [];

  for (let i = 0; i < this.rows; i++) {
    this.matrix[i] = [];
    for (let j = 0; j < this.cols; j++) {
      this.matrix[i][j] = 0;
    }
  }
}

//scalar multiplication
Matrix.prototype.multiply = function (e) {
  if (e instanceof Matrix) {
    //cols = rows 2x5*5x2 = 2x2
    if (this.cols == e.rows) {
      let result = new Matrix(this.rows, e.cols);
      for (let i = 0; i < result.rows; i++) {
        for (let j = 0; j < result.cols; j++) {
          //2x2
          //but I need to loop until 5 this.cols = e.rows
          let sum = 0;
          for (let aux = 0; aux < this.cols; aux++) {
            //go to 5
            sum += this.matrix[i][aux] * e.matrix[aux][j];
          }
          //console.log(sum);
          result.matrix[i][j] = sum;
        }
      }
      return result;
    } else {
      console.log("ERROR, cols != rows");
      return undefined;
    }
  } else {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.matrix[i][j] *= e;
      }
    }
  }
};

//add add
Matrix.prototype.add = function (e) {
  if (e instanceof Matrix) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.matrix[i][j] += e.matrix[i][j];
      }
    }
  } else {
    //single number
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.matrix[i][j] += e;
      }
    }
  }
};

//initialize random
Matrix.prototype.randomize = function () {
  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      this.matrix[i][j] = Math.floor(Math.random() * 10);
    }
  }
};
