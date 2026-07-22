const { addToHistory } = require('./reportController');
const { runBenchmark } = require('../benchmark/profiler');
const routeFinding = require('../services/routeFinding');
const searching = require('../services/searching');
const nearby = require('../services/nearby');
const gps = require('../services/gps');
const traffic = require('../services/traffic');
const optimization = require('../services/optimization');

const modules = {
    routeFinding,
    searching,
    nearby,
    gps,
    traffic,
    optimization
};

const generateMockData = (moduleName, size) => {
    let scale = size === 'Large' ? 10000 : size === 'Medium' ? 1000 : 100;
    
    if (moduleName === 'searching') {
        let arr = Array.from({ length: scale }, (_, i) => i);
        return { array: arr, target: scale - 1, dictionary: ['apple', 'app', 'application'], targetWord: 'app' };
    }
    if (moduleName === 'optimization') {
        return { nodes: scale / 10, populationSize: scale, generations: scale / 10, ants: scale / 10, iterations: scale / 10 };
    }
    
    let graph = {};
    for(let i = 0; i < scale / 10; i++) {
        graph[i] = { [i+1]: 1 };
    }
    
    return {
        graph, start: 0, end: (scale / 10) - 1,
        points: Array.from({ length: scale }, () => ({ x: Math.random(), y: Math.random() })),
        target: { x: 0.5, y: 0.5 },
        measurements: Array.from({ length: scale }, () => Math.random()),
        features: Array.from({ length: scale }, () => Math.random()),
        trees: scale / 10, feature: Math.random(),
        inputs: Array.from({ length: scale }, () => Math.random()), featureWeights: [], sequence: Array.from({ length: scale }, () => Math.random())
    };
};

const runTest = async (req, res) => {
    try {
        const { moduleName, algorithm, size } = req.body;
        
        if (!modules[moduleName] || !modules[moduleName][algorithm]) {
            return res.status(400).json({ error: 'Invalid module or algorithm' });
        }
        
        const algoFunction = modules[moduleName][algorithm];
        const inputData = generateMockData(moduleName, size);

        const result = await runBenchmark(algorithm, algoFunction, inputData);
        addToHistory(result);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { runTest };