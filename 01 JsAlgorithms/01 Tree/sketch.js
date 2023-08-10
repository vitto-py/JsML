let root;
function setup() {
  createCanvas(400, 400);
  root = new Tree();
  root.addValue(5)
  root.addValue(3)
  root.addValue(4)
  root.addValue(10)



  console.log(root)
}

function draw() {
  background(220);
}

//

/*
The prototype function, as you are extending the constructor function prototype, 
it will be available to all the object instances created with the new keyword, 
and the context within that function (the this keyword) will refer to the actual
object instance where you call it.*/

Tree.prototype.addValue = function(val) { //extends Tree, adds a new method
  let n = new Node(val);
  if (this.root == null) {
    this.root = n;
  } else {
    this.root.addNode(n);
  }
}

Node.prototype.addNode = function(node) {
  //also receives the node from where it was called for THIS.
  if (node.value < this.value) {
    // 2 options, (if empty) add it to the left , (else) create a new node recursively
    if(this.left == null) { this.left = node } else { this.left.addNode(node) }
  } else if (node.value > this.value) {
    // 2 options, (if empty) add it to the left , (else) create a new node recursively
    if(this.right == null) { this.right = node } else { this.right.addNode(node) }
  }
}


//SEARCH
Tree.prototype.search = function(trg) {
  let found = this.root.search(trg); //remember the root has appendded a NODE
  //now you need a NODE method called search
  //return found
  if (found == null) {
    console.log('NOT FOUND: ',found);
  } else {
    console.log('FOUND: ',found.value);
  }
}

//NODE SEARCH method
Node.prototype.search = function(trg) {
  
  if (this.value == trg) {
    return this
  } else if (trg < this.value && this.left != null) { //go left
    //console.log('go left');
    return this.left.search(trg); //remember it has a node
  } else if (trg > this.value && this.right != null) { //go right
    //console.log('go right');
    return this.right.search(trg); //remember it has a node
  }
}


//the parts
function Tree() {
  this.root = null;
}

function Node(val) {
  this.value = val;
  this.left = null;
  this.right = null;
  
}
