let img;
let detector;
let rr;

function preload() {
  img = loadImage("./data/dog_cat.jpg");
  detector = ml5.objectDetector("cocossd");
}

function gotResult(error, result) {
  if (error) {
    console.error(error);
  } else {
    rr = result;
    console.log(rr);
    for (let i = 0; i < rr.length; i++) {
      let object = result[i];
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
  }
}

function setup() {
  createCanvas(400, 400);
  image(img, 0, 0, width, height);
  detector.detect(img, gotResult);
}

function draw() {
  //background(0);
}
