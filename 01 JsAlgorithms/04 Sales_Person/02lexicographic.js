/*
Lexicographic Order
  1. Find the largest x such that P[x] < P[x+1]
  (if there is no such x, P is the last permutation)
  
  2. Find the largest y such that P[x] < P[y]

  3. Swap P[x] and P[y]

  4. Reverse P[x+1 : n]

  https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering

*/


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

let vals = [1,2,3];
function setup() {
  createCanvas(400,400);
  let r = allPermutation(vals);
  console.log(r);
}

function draw() {
  background(0);

}







function orderShuffle(a,i,j) {
  //look at prototype, here we do the same thing
  //but using the draw() loop

  let aux = a[i];
  a[i] = a[j];
  a[j] = aux;

}

