
let fruits = [
  {name:"banana", score:5},
  {name:"mango", score:1},
  {name:"apple", score:2},
  {name:"kiwi", score:1},
  {name:"orange", score:7}
]

function setup() {
  //get Total
  let total = 0;
  for (let index= 0; index < fruits.length; index++) {
    total += fruits[index].score;
  }

  for (let index= 0; index < fruits.length; index++) {
    fruits[index].normScore = fruits[index].score/total;
    fruits[index].count = 0;
  }
  
  // console.log(fruits)
  for (let index= 0; index < 10000; index++) {
      let ix = pickOne(fruits);
      console.log(ix);
      fruits[ix].count++;
  }
  console.log(fruits)
}

function draw() {

}

function pickOne(list) {
  let arrow = random(1);
  let index = 0;
  while(arrow > 0) {
    arrow = arrow - list[index].normScore 
    index++;
  }  
  index--; //look at the index++, you evaluate buffer in the next cycle
  return index;
}
