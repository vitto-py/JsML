let grid = [];
let resolution = 10;
let cols;
let rows;
let w;
let f;
let r;

function setup() {
  createCanvas(400, 400);

  cols = width / resolution;
  rows = height / resolution;
  //grid[i][j]
  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i,j)
    }
  }

  //set the start and end positions
  grid[0][0].wall = false;
  grid[cols-1][rows-1].wall = false;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].myNeighbors(grid);
    }
  }
  

  w = aStar(grid[0][0] , grid[cols-1][rows-1])
  console.log(rows,cols, grid);
  f = w[0];
  r = w[1];
  if (f == -1) {console.log("no solution found")};
}

function draw() {
  background(178, 255, 255);
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
  if (f != -1){
    r.forEach(x => {
        x.hasbeentry = true;
    });

    while (f.parent != null) {
      f.ispath = true;
      f = f.parent;
    }
  }
  grid[0][0].highlight();
  grid[cols-1][rows-1].highlight();

}

