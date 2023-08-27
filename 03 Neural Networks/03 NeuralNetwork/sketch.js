function setup() {
  createCanvas(400, 400);
  let a = [3,2];
  let net = new Neural_Network(2, 2, 1);
  let ans = [2.71];
  for (let k = 0; k < 12; k++) {
    net.train(a,ans);
  }

}

function draw() {
  background(0);
}
