//handles the macro interactions of rockets
function Population() {
  this.popSize = 20
  this.popux = []

  for (let i = 0; i < this.popSize; i++) {
    this.popux[i] = new Rocket();
  }

  this.display = function() {
    for (let i = 0; i < this.popSize; i++) {
      this.popux[i].applyForce()
      this.popux[i].update()
      this.popux[i].show()

    }
  }
}
