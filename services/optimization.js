const algorithms = {
    Brute_Force: (data) => {
        const { nodes } = data;
        let count = 0;
        const limit = Math.min(nodes, 10); 
        const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));
        const iterations = factorial(limit);
        
        for (let i = 0; i < iterations; i++) {
            count++;
        }
        return count;
    },

    Dynamic_Programming: (data) => {
        const { nodes } = data;
        const memo = {};
        const fib = (n) => {
            if (n <= 1) return n;
            if (memo[n]) return memo[n];
            memo[n] = fib(n - 1) + fib(n - 2);
            return memo[n];
        };
        return fib(Math.min(nodes, 35)); 
    },

    Genetic_Algorithm: (data) => {
        const { populationSize, generations } = data;
        let bestFitness = 0;
        
        for (let g = 0; g < generations; g++) {
            for (let p = 0; p < populationSize; p++) {
                let fitness = Math.random();
                if (fitness > bestFitness) {
                    bestFitness = fitness;
                }
            }
        }
        return bestFitness;
    },

    Ant_Colony_Optimization: (data) => {
        const { ants, iterations } = data;
        let bestPath = Infinity;
        
        for (let i = 0; i < iterations; i++) {
            for (let a = 0; a < ants; a++) {
                let pathLength = Math.random() * 100;
                if (pathLength < bestPath) {
                    bestPath = pathLength;
                }
            }
        }
        return bestPath;
    }
};

module.exports = algorithms;