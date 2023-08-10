let geneticBach;
let targetPhrase = 'Genetic Algorithm';
let mutationRate = 0.015;
let populationSize = 100;
function setup() {
    createCanvas(400,400);
    frameRate(10);
    //HTML elements

    bestPhrase = createP("Best phrase:");
    bestPhrase.position(10,10);
    bestPhrase.class("best"); //CSS class

    allPhrases = createP("All phrases:");
    allPhrases.position(600, 10);
    allPhrases.class("all");

    stats = createP("Stats");
    stats.position(10,200);
    stats.class("stats");

    //----------------------------------------------------------------
    
    geneticBach = new Population(targetPhrase, 
                      mutationRate,
                      populationSize);
    geneticBach.calcFitness();
    
}

function draw() {
    background(0);
    geneticBach.generateNextGeneration();
    geneticBach.calcFitness();
    geneticBach.eval();
    //console.log(geneticBach.getBest());
    //console.log(geneticBach.getAverageFitness().toFixed(2));

    let best50 = displayAllPhrases(geneticBach.getAllPhrases())
    fill(255);
    displayInfo(best50, geneticBach)
    if (geneticBach.getFinished()) {
        console.log('Numero de Gen = ',geneticBach.generations);
        noLoop();}
}

function displayAllPhrases(phrases) {
    let everything = "";
    //how many phases to display
    let displayLimit = min(phrases.length, 50);
    //compile them into a huge text
    for (let i = 0; i < displayLimit; i++) {
      everything += phrases[i] + "<br>";
    }
    return everything;
}

function displayInfo(best50, population) {
    // Display current status of population
    
    //best phrase
    let answer = population.getBest();
    bestPhrase.html("Best phrase:<br>" + answer);
    
    //statistics
    let statstext = "total generations:     " + population.getGenerations() + "<br>";
    statstext += "average fitness:       " + nf(population.getAverageFitness()*100,2,2) + "<br>";
    statstext += "total population:      " + populationSize + "<br>";
    statstext += "mutation rate:         " + mutationRate * 100 + "%";
  
    stats.html(statstext);
  
    allPhrases.html("All phrases:<br>" + best50);
  }