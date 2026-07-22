const algorithms = {
    Dijkstra: (data) => {
        const { graph, start, end } = data;
        const distances = {};
        const visited = new Set();
        
        for (let node in graph) distances[node] = Infinity;
        distances[start] = 0;

        for (let i = 0; i < Object.keys(graph).length; i++) {
            let minDistance = Infinity;
            let currentNode = null;

            for (let node in distances) {
                if (!visited.has(node) && distances[node] < minDistance) {
                    minDistance = distances[node];
                    currentNode = node;
                }
            }

            if (currentNode === null || currentNode === end) break;
            visited.add(currentNode);

            for (let neighbor in graph[currentNode]) {
                let dist = distances[currentNode] + graph[currentNode][neighbor];
                if (dist < distances[neighbor]) {
                    distances[neighbor] = dist;
                }
            }
        }
        return distances[end];
    },

    A_Star: (data) => {
        const { graph, start, end, heuristics } = data;
        const openSet = new Set([start]);
        const cameFrom = {};
        const gScore = {};
        const fScore = {};

        for (let node in graph) {
            gScore[node] = Infinity;
            fScore[node] = Infinity;
        }
        gScore[start] = 0;
        fScore[start] = heuristics ? heuristics[start] : 0;

        while (openSet.size > 0) {
            let current = null;
            let lowestF = Infinity;
            for (let node of openSet) {
                if (fScore[node] < lowestF) {
                    lowestF = fScore[node];
                    current = node;
                }
            }

            if (current === end) return gScore[end];

            openSet.delete(current);

            for (let neighbor in graph[current]) {
                let tentative_gScore = gScore[current] + graph[current][neighbor];
                if (tentative_gScore < gScore[neighbor]) {
                    cameFrom[neighbor] = current;
                    gScore[neighbor] = tentative_gScore;
                    fScore[neighbor] = gScore[neighbor] + (heuristics ? heuristics[neighbor] : 0);
                    openSet.add(neighbor);
                }
            }
        }
        return Infinity;
    },

    Bellman_Ford: (data) => {
        const { graph, start, end } = data;
        const distances = {};
        const nodes = Object.keys(graph);
        
        for (let node of nodes) distances[node] = Infinity;
        distances[start] = 0;

        for (let i = 0; i < nodes.length - 1; i++) {
            for (let u of nodes) {
                for (let v in graph[u]) {
                    if (distances[u] + graph[u][v] < distances[v]) {
                        distances[v] = distances[u] + graph[u][v];
                    }
                }
            }
        }
        return distances[end];
    },

    Floyd_Warshall: (data) => {
        const { graph, start, end } = data;
        const nodes = Object.keys(graph);
        const dist = {};

        for (let u of nodes) {
            dist[u] = {};
            for (let v of nodes) {
                if (u === v) dist[u][v] = 0;
                else if (graph[u] && graph[u][v]) dist[u][v] = graph[u][v];
                else dist[u][v] = Infinity;
            }
        }

        for (let k of nodes) {
            for (let i of nodes) {
                for (let j of nodes) {
                    if (dist[i][k] + dist[k][j] < dist[i][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }
        return dist[start][end];
    },
    
    Bidirectional_Dijkstra: (data) => {
        const { graph, start, end } = data;
        let distF = {}; let distB = {};
        let visitedF = new Set(); let visitedB = new Set();
        
        for(let n in graph) { distF[n] = Infinity; distB[n] = Infinity; }
        distF[start] = 0; distB[end] = 0;
        
        for(let i=0; i<Object.keys(graph).length; i++){
             visitedF.add(start); visitedB.add(end);
        }
        return distF[end]; 
    }
};

module.exports = algorithms;