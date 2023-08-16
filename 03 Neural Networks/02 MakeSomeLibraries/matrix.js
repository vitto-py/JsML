// let m = new Matrix(rows, cols)

class Matrix {
  constructor(nrows, ncols) {
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
  //matrix multiplication
  static multiply(m1, m2) {
    if (m1 instanceof Matrix && m2 instanceof Matrix) {
      //cols = rows 2x5*5x2 = 2x2
      if (m1.cols == m2.rows) {
        let result = new Matrix(m1.rows, m2.cols);
        for (let i = 0; i < result.rows; i++) {
          for (let j = 0; j < result.cols; j++) {
            //2x2
            //but I need to loop until 5 m1.cols = m2.rows
            let sum = 0;
            for (let aux = 0; aux < m1.cols; aux++) {
              //go to 5
              sum += m1.matrix[i][aux] * m2.matrix[aux][j];
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
    }
  }
  //scalar multiplication
  multiply(e) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.matrix[i][j] *= e;
      }
    }
  }

  //apply func to each element on the matrix
  map(func) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.matrix[i][j] = func(this.matrix[i][j]);
      }
    }
  }

  //add add
  add(e) {
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
  }

  //initialize random
  randomize() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.matrix[i][j] = Math.floor(Math.random() * 10);
      }
    }
  }

  transpose() {
    let m = new Matrix(this.cols, this.rows);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        m.matrix[j][i] = this.matrix[i][j];
      }
    }
    return m;
  }
}
