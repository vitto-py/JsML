//https://en.wikipedia.org/wiki/Breadth-first_search
/*
Input: A graph G and a starting vertex root of G

Output: Goal state. The parent links trace the shortest path back to root

1  procedure BFS(G, root) is
 2      let Q be a queue
 3      label root as explored
 4      Q.enqueue(root) #enqueue means add to queue
 5      while Q is not empty do
 6          v := Q.dequeue() #dequeue means take out of queue
 7          if v is the goal then
 8              return v
 9          for all edges from v to w in G.adjacentEdges(v) do
10              if w is not labeled as explored then
11                  label w as explored
12                  w.parent := v
13                  Q.enqueue(w)
*/

function nodeBSF(graph, startNode, goal) {
    let q = [];
    startNode.searched = true;
    q.push(startNode);

    while (q.length > 0) {
        let v = q.shift(); // remove the 0th element  and shifts the values at consecutive indexes down, then returns the removed value
        if (v.value == goal) {
            return v;
        }

        v.edges.forEach(x => 
            {
                if (x.searched == false) {
                   x.searched = true;
                   x.parent = v;
                   q.push(x);
                }
            }
        ) 
    }
}

function pathBack(n) {
    aux = n;
    txt = "";
    while (aux.parent != null) {
        txt += aux.value + " ---> "
        aux = aux.parent;
    }
    txt += aux.value 
    return txt;
}