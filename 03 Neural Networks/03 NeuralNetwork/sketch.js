function setup() {
  createCanvas(400, 400);
  let a = [1, 2];
  let net = new Neural_Network(2, 3, 1);
  let o = net.feedfoward(a);
  console.log(o)
}

function draw() {
  background(0);
}
