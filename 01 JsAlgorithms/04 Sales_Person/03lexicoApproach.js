//Visual form of the travel sales person - USES DRAW as main loop

let stops = [];
let minDist = 0;
let bestOrder = [];
let paths = [];
let nextOrder;


function setup() {
  createCanvas(400, 400);
  frameRate(1);
  let r = []; //aux variable
  for (let i = 0; i < 5; i++) {
    //create cities
    stops[i] = createVector(random(0.1*width, width*0.9), random(0.1*width, width*0.9)); 
    r[i] = i; //aux variable
  }

  //all possible lexicographic paths 
  paths = allPermutation(r)
  
  console.log('paths =',paths);
  console.log('stops =',stops);

  //I0
  nextOrder = paths.shift(); // first combination
  minDist = calcDistance(stops, nextOrder);
  bestOrder = nextOrder.slice();
  
}

function draw() {

  
  if (nextOrder != undefined) {
    //draw cities
    background(0);
    fill(255);
    for (let i = 0; i < stops.length; i++) {
      ellipse(stops[i].x, stops[i].y,10);
      let nu = '';
      textSize(12);
      noStroke();
      text(nu + i, stops[i].x+5, stops[i].y+5);
    }


    //Conect dots - the order comes from paths
    stroke(255, 180);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let i = 0; i < nextOrder.length; i++) {
      let ix = nextOrder[i]
      vertex(stops[ix].x, stops[ix].y);
    }
    endShape();


    //draw best path
    //Conect dots
    stroke(255, 0,255,150);
    strokeWeight(2);
    noFill();
    beginShape();
    let bp = '';
    for (let i = 0; i < bestOrder.length; i++) {
      let ix = bestOrder[i]
      vertex(stops[ix].x, stops[ix].y);
      bp += ix;
    }
    
    endShape();
    noStroke();
    fill(255, 0,255);
    text('best path = ' + bp, 0.7*width, 20);

    //shuffle points - lexicographic order
    //let i = Math.floor(Math.random()*stops.length);
    //let j = Math.floor(Math.random()*stops.length);
    
    //orderShuffle(stops,i,j)


    //calculate distance
    let a = calcDistance(stops, nextOrder)

    //update to a better version
    if (a < minDist) {
      minDist = a;
      bestOrder = nextOrder.slice(); 
      console.log(a);
    }

    textSize(32);
    let s = '';
    for (let i = 0; i < nextOrder.length; i++) {
      s += nextOrder[i];
    }
    text(s, 0.1*width, height - 0.1*height);
  }

  nextOrder = paths.shift();

}







function orderShuffle(a,i,j) {
  //look at prototype, here we do the same thing
  //but using the draw() loop

  let aux = a[i];
  a[i] = a[j];
  a[j] = aux;

}


function calcDistance(a, order) {
  let aux = 0;

  for (let i = 0; i < order.length - 1; i++) {
    i0 = order[i];
    i1 = order[i + 1];
    let d = dist(a[i0].x, a[i0].y, a[i1].x, a[i1].y);
    aux += d;
  }

  return aux;
}




function allPermutation(P) {
  let permu = [];
  permu.push(P.slice());
  let limitador = 0;
  while (limitador < 10000) {
    //STEP 1
    let largestI = -1; //if there is no such x, P is the last permutation
    for (let i = 0; i < P.length-1; i++) {
      if (P[i] < P[i+1]){
        largestI = i;
      }
    }
    if (largestI == -1) {
      break;
    }


    //step 2: Find the largest y such that P[x] < P[y] (the most far away J)
    let largestJ = 0;
    for (let j = 0; j < P.length; j++) {
      if (P[largestI] < P[j]) {
        largestJ = j;
      }
    }
    //step 3: swap
    orderShuffle(P,largestI,largestJ);

    //step 4: Reverse P[x+1 : n]
    let aux = P.splice(largestI+1); //take the tail
    aux = aux.reverse();
    P = P.concat(aux); 

    //add to permu
    permu.push(P.slice());

    limitador+=1;
  }

  return permu;
}