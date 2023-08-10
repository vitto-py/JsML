/* 
A* ALGO
function reconstruct_path(cameFrom, current)
    total_path := {current}
    while current in cameFrom.Keys:
        current := cameFrom[current]
        total_path.prepend(current)
    return total_path

// A* finds a path from start to goal.
// h is the heuristic function. h(n) estimates the cost to reach goal from node n.
function A_Star(start, goal, h)
    // The set of discovered nodes that may need to be (re-)expanded.
    // Initially, only the start node is known.
    openSet := {start} //append first node

    // For node n, cameFrom[n] is the node immediately preceding it on the cheapest path from the start
    // to n currently known.
    cameFrom := an empty map //better to do IN the node itself this.parent

    // For node n, gScore[n] is the cost of the cheapest path from start to n currently known.
    gScore := map with default value of Infinity
    gScore[start] := 0 //better do IN the node itself this.g

    // For node n, fScore[n] := gScore[n] + h(n). fScore[n] represents our current best guess as to
    // how cheap a path could be from start to finish if it goes through n.
    fScore := map with default value of Infinity
    fScore[start] := h(start) 

    while openSet is not empty
        current := the node in openSet having the lowest fScore[] value
        if current = goal
            return reconstruct_path(cameFrom, current)

        openSet.Remove(current)
        for each neighbor of current
            // d(current,neighbor) is the weight of the edge from current to neighbor
            // tentative_gScore is the distance from start to the neighbor through current
            tentative_gScore := gScore[current] + d(current, neighbor)
            if tentative_gScore < gScore[neighbor]
                // This path to neighbor is better than any previous one. Record it!
                cameFrom[neighbor] := current
                gScore[neighbor] := tentative_gScore
                fScore[neighbor] := tentative_gScore + h(neighbor)
                if neighbor not in openSet
                    openSet.add(neighbor)

    // Open set is empty but goal was never reached
    return failure
 */

function heuristic(a, b) {
    // from node n to the goal (end)
    let d = dist(a.i, a.j, b.i, b.j);
    return abs(d);
}

function aStar(start, goal) {
    // f = g + h(current, goal)

    /*
    where n is the next node on the path, g(n) is the cost of the path from 
    the start node to n, and h(n) is a heuristic function that estimates the 
    cost of the cheapest path from n to the goal
    */

    let openSet = [];
    let closetSet = [];
    openSet.push(start);

    start.g = 0;
    //h(n) should be manhattan distance, for us +1
    start.h = heuristic(start, goal);
    start.f = start.g + start.h;

    while (openSet.length > 0) {

        //select the lowest f in openSet
        let ixfLowest = fLowest(openSet); //lowest fScore
        let current = openSet[ixfLowest]
    
        if (current == goal) {
            console.log('find')
            return [current, closetSet]
        }

        openSet.splice(ixfLowest,1);
        
        current.neighbors.forEach(neighbor => {
            /* 
            tentative_gScore is the distance from start to the neighbor 
            through current
            tentative_gScore := gScore[current] + d(current, neighbor)*/
            let tentative_gScore = current.g + 1 //only 1 is the distance to 
            
            if (tentative_gScore < neighbor.g) {
                closetSet.push(current);
                neighbor.parent = current;
                neighbor.g = tentative_gScore;
                neighbor.h = heuristic(neighbor, goal);
                neighbor.f = tentative_gScore + neighbor.h;

                if (!openSet.includes(neighbor) && !neighbor.wall) {
                    openSet.push(neighbor);
                }
            }
        });
        
    
    }

    return [-1,-1] //no solution


}

/* function reconstruct_path(cameFrom, current) {
    let total_path = [];
    total_path.push(current)
    while (cameFrom.includes(current)) {
        current = cameFrom[current]
        total_path.prepend(current)
    }
        
    return total_path
} */



function fLowest(openSet) {
    //current := the node in openSet having the lowest fScore[] value
    index = 0;
    
    for (let i = openSet.length - 1; i >= 0; i--) {
        if (openSet[i].f < openSet[index].f) {
            index = i;
        }
    }
    return index;
}