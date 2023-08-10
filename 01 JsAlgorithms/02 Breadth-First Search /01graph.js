let graph;
let db;



function preload() {
  db = loadJSON('kevinbacon.json')
}

function setup() {
  noCanvas();
  //console.log();
  graph = new Graph;

  for (let i = 0; i < db.movies.length; i++) {
    let nodeMovie = new Node(db.movies[i].title);
    graph.addNode(nodeMovie);

    for (let j = 0; j< db.movies[i].cast.length; j++) {
      
      let actorNode = graph.getNode(db.movies[i].cast[j]);

      if (actorNode == undefined) {
        //does not exist
        actorNode = new Node(db.movies[i].cast[j])
        graph.addNode(actorNode);
      } 
      actorNode.addEdge(nodeMovie);
    }
  }
  console.log(graph);
}

/* function draw() {
  background(220);
} */


function Node(value) {
  this.value = value;
  this.edges = [];
  this.parent = null;
  this.searched = false;

  this.addEdge = function(neighbor) {
    this.edges.push(neighbor);
    neighbor.edges.push(this);
  } 
  //IMPOSIBLE, the graph JSON is in Graph, cannot reference it from here
  /* this.searchNode = function(key) {
    //graph[key]
  } */
}


function Graph() {
  this.nodes = [];
  this.graph = {};

  this.addNode = function(n) {  
    this.nodes.push(n);
    this.graph[n.value] = n; 
  }

  this.searchNode = function(key) {
    let r = this.graph[key] //undefined if not exists
    //if exists, return True, else False
    return !!r;
  } 

  this.getNode = function(key) {
    let n = this.graph[key] //undefined if not exists
    return n; //return the node
  }

  
}

