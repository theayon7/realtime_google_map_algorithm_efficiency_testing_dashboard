const algorithms = {
    Kalman_Filter: (data) => {
        const { measurements } = data;
        let estimate = measurements[0];
        let error_est = 1;
        let error_mea = 1;
        let results = [];

        for (let m of measurements) {
            let kalman_gain = error_est / (error_est + error_mea);
            estimate = estimate + kalman_gain * (m - estimate);
            error_est = (1 - kalman_gain) * error_est;
            results.push(estimate);
        }
        return results;
    },

    Particle_Filter: (data) => {
        const { particles, observation } = data;
        let bestParticle = particles[0];
        let minDiff = Math.abs(particles[0] - observation);

        for (let p of particles) {
            let diff = Math.abs(p - observation);
            if (diff < minDiff) {
                minDiff = diff;
                bestParticle = p;
            }
        }
        return bestParticle;
    },

    Hidden_Markov_Model_Simplified: (data) => {
        const { states, transitions } = data;
        let currentState = states[0];
        let path = [currentState];

        for (let i = 0; i < states.length - 1; i++) {
            let nextState = transitions[currentState] ? transitions[currentState][0] : states[i+1];
            currentState = nextState;
            path.push(currentState);
        }
        return path;
    }
};

module.exports = algorithms;