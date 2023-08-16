function setup() {
  createCanvas(400,400);
  let a = new Matrix(2,5);
  //let b = new Matrix(5,2);
  a.randomize();
  //b.randomize();
  console.table(a.matrix);
  /* console.table(b.matrix);
  console.table(a.multiply(b).matrix); */
  let b = a.transpose()
  console.table(b.matrix);

}

function draw() {
  background(0);
}
