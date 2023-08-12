//DNA = [] sequence of forces, apply 1 at each frame
function DNA() {
  
  this.genes = []; // all foces to lifespan during its life
  for (let i = 0; i < lifespan; i++) {
    this.genes[i] = p5.Vector.random2D();
    this.genes[i].setMag(0.1); //go slower
  }
}