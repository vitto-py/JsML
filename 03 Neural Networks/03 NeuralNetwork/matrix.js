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
  print() {
    console.table(this.matrix);
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
  static map(func, matrix) {
    let m = new Matrix(matrix.rows,matrix.cols)
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.cols; j++) {
        m.matrix[i][j] = func(matrix.matrix[i][j]);
      }
    }
    return m
  }
  map(func) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.matrix[i][j] = func(this.matrix[i][j]);
      }
    }
  }

  static substract(a, b) {
    let result = new Matrix(a.rows, a.cols);
    for (let r = 0; r < a.rows; r++) {
      for (let c = 0; c < a.cols; c++) {
        result.matrix[r][c] = a.matrix[r][c] - b.matrix[r][c];
      }
    }
    return result;
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
        this.matrix[i][j] = Math.random() * 2 - 1;
      }
    }
  }

  static transpose(mat) {
    let m = new Matrix(mat.cols, mat.rows);
    for (let i = 0; i < mat.rows; i++) {
      for (let j = 0; j < mat.cols; j++) {
        m.matrix[j][i] = mat.matrix[i][j];
      }
    }
    return m;
  }

  static fromArray(a) {
    let m = new Matrix(a.length, 1); //column vector
    for (let i = 0; i < a.length; i++) {
      m.matrix[i][0] = a[i];
    }
    //console.table(m.matrix)
    return m;
  }
}
