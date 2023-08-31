let mobileNet;
let puffin;

function modelReady() {
  console.log("The model is ready");
  mobileNet.predict(puffin, gotResult);
}
function gotResult(error, result) {
  //ERROR first callback
  if (error) {
    console.log(error);
  } else {
    textSize(32);
    fill(0, 255, 50);
    console.log(result)
    createP(result[0].label);
    createP(result[0].confidence);

  }
}
function imageReady() {
  image(puffin, 0, 0, width, height);
}

function setup() {
  createCanvas(200, 200);
  puffin = createImg("/data/puffin.jpg", imageReady);
  //tiniest model possible
  puffin.hide();
  background(0);
  mobileNet = ml5.imageClassifier("MobileNet", modelReady);
}

function draw() {
  //background(0);
}
