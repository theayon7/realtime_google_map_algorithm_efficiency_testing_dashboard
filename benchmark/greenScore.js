function calculateGreenScore(metrics) {
    let score = 5.0; // Start with maximum score


    if (metrics.executionTimeMs > 1000) score -= 1.5;
    else if (metrics.executionTimeMs > 100) score -= 1.0;
    else if (metrics.executionTimeMs > 10) score -= 0.5;


    if (metrics.memoryUsedMB > 50) score -= 1.5;
    else if (metrics.memoryUsedMB > 10) score -= 0.5;

  
    if (metrics.energyJoules > 5) score -= 1.0;
    else if (metrics.energyJoules > 1) score -= 0.5;

   
    score = Math.max(1, Math.min(5, Math.round(score)));

    const ratings = {
        5: '★★★★★ Excellent',
        4: '★★★★ Good',
        3: '★★★ Average',
        2: '★★ Poor',
        1: '★ Very Poor'
    };

    return {
        numericScore: score,
        rating: ratings[score]
    };
}

module.exports = { calculateGreenScore }; 