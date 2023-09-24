//COCOSSD for object detection
let video;
let detector;
let rr = [];

function preload() {
  video = createCapture(VIDEO);
  detector = ml5.objectDetector("cocossd");
}

function gotResult(error, result) {
  if (error) {
    console.error(error);
  } else {
    rr = result;
    //console.log(rr);
    for (let i = 0; i < rr.length; i++) {
      let object = rr[i];
      noFill();
      stroke(0, 255, 0);
      strokeWeight(2);
      rect(
        width * object.normalized.x,
        height * object.normalized.y,
        width * object.normalized.width,
        height * object.normalized.height
      );
      noStroke();
      fill(255);
      textSize(20);
      text(
        object.label,
        width * object.normalized.x + 10,
        height * object.normalized.y + 20
      );
    }
    detector.detect(video, gotResult);
  }
}

function setup() {
  createCanvas(400, 400);
  video.size(400, 400);
  video.hide();
  detector.detect(video, gotResult);
}

function draw() {
  //background(0);
  image(video, 0, 0);
}
