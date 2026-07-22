const CPU_POWER_WATTS = 45;

function calculateEnergy(executionTimeMs) {
  
    const executionTimeSeconds = executionTimeMs / 1000;
 
    const energyJoules = CPU_POWER_WATTS * executionTimeSeconds;
    
    return energyJoules;
}

module.exports = { calculateEnergy };