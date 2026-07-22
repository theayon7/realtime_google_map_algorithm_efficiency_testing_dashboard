const { performance } = require('perf_hooks');
const { calculateEnergy } = require('./energy');
const { calculateGreenScore } = require('./greenScore');

async function runBenchmark(algorithmName, algoFunction, inputData) {
   
    const startMemory = process.memoryUsage().heapUsed;
    const startCpu = process.cpuUsage();
    const startTime = performance.now();

    const result = await algoFunction(inputData);

   
    const endTime = performance.now();
    const endMemory = process.memoryUsage().heapUsed;
    const endCpu = process.cpuUsage(startCpu); 

  
    const executionTimeMs = endTime - startTime;
    const memoryUsedMB = Math.max(0, (endMemory - startMemory) / 1024 / 1024);

    const cpuUsageMs = (endCpu.user + endCpu.system) / 1000;
    const energyJoules = calculateEnergy(executionTimeMs);

    const metrics = {
        executionTimeMs,
        memoryUsedMB,
        cpuUsageMs,
        energyJoules
    };

    const greenScore = calculateGreenScore(metrics);

    return {
        algorithm: algorithmName,
        metrics: {
            executionTimeMs: executionTimeMs.toFixed(4),
            memoryUsedMB: memoryUsedMB.toFixed(4),
            cpuUsageMs: cpuUsageMs.toFixed(4),
            energyJoules: energyJoules.toFixed(6)
        },
        greenScore: greenScore,
    };
}

module.exports = { runBenchmark };