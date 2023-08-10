

function Spot(i,j) {
    this.f = 1000;
    this.g = 1000;
    this.h = 0;
    this.i = i;
    this.j = j;
    this.checked = false;
    this.neighbors = []; // 
    this.wall = false; //
    this.parent = null; 
    this.ispath = false;
    this.hasbeentry = false;

    if (random() < 0.4) {
      this.wall = true;
    }
  
    this.myNeighbors = function(grid) {
      //FOR takes too much time - it collapeses

      //diagonals
      if (this.i+1 < cols && this.j+1 < rows) {
        this.neighbors.push(grid[this.i+1][this.j+1])
      }
      if (this.i-1 >= 0 && this.j-1 >= 0) {
        this.neighbors.push(grid[this.i-1][this.j-1])
      }
      //horizontal
      if (this.i+1 < cols ) {
        this.neighbors.push(grid[this.i+1][this.j])
      }
      if (this.i-1 >= 0) {
        this.neighbors.push(grid[this.i-1][this.j])
      }
      //vertical
      if (this.j-1 >= 0) {
        this.neighbors.push(grid[this.i][this.j-1])
      }
      if (this.j+1 < rows) {
        this.neighbors.push(grid[this.i][this.j+1])
      }
    }
  
    this.show = function() {
      noStroke();
      noFill();
      if (this.wall) {
        fill(100,32,200);
      }
      if (this.ispath) {
        fill(255,255,0,150);
      }
      if (!this.ispath && this.hasbeentry) {
        fill(255,0,0,150);
      }
      rect(this.i*resolution, this.j*resolution, resolution); 
    }
  
    this.highlight = function() {
      fill(0,255,50,100);
      rect(this.i*resolution, this.j*resolution, resolution); 
  
    }
  }
  