let mobileNet;
let video;
let label;
let prob;

function modelReady() {
  console.log("The model is ready");
  mobileNet.predict(gotResult);
}
function gotResult(error, result) {
  //ERROR first callback
  if (error) {
    console.log(error);
  } else {
    //console.log(result);
    label = result[0].label;
    prob = result[0].confidence;
    //createP(result[0].label);
    //createP(result[0].confidence);
    //Infinity Loop
    mobileNet.predict(gotResult);
  }
}
function imageReady() {
  image(puffin, 0, 0, width, height);
}

function setup() {
  createCanvas(400, 400);
  video = createCapture(VIDEO);
  //tiniest model possible
  video.hide();
  background(0);
  //pass the video as an argument = act continuously
  mobileNet = ml5.imageClassifier("MobileNet", video, modelReady);
}

function draw() {
  //background(0);
  image(video, 0, 0);
  fill(0);
  textSize(20);
  text(label, 10, height - 30);
  text(prob, 10, height - 10);
}
