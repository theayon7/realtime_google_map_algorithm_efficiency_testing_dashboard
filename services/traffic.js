const algorithms = {
    Linear_Regression: (data) => {
        const { features } = data;
        let sum = 0;
        for (let f of features) sum += f * 1.5;
        return sum / features.length;
    },

    Random_Forest: (data) => {
        const { trees, feature } = data;
        let votes = 0;
        for (let t = 0; t < trees; t++) {
            votes += (feature * Math.random() > 0.5) ? 1 : 0;
        }
        return (votes / trees) > 0.5 ? 'High Traffic' : 'Low Traffic';
    },

    XGBoost_Simulated: (data) => {
        const { featureWeights, inputs } = data;
        let score = 0;
        for (let i = 0; i < inputs.length; i++) {
            score += inputs[i] * (featureWeights[i] || 1);
        }
        return score * 0.85; 
    },

    LSTM_Simulated: (data) => {
        const { sequence } = data;
        let memory = 0;
        for (let s of sequence) {
            memory = (memory * 0.5) + (s * 0.5);
        }
        return memory;
    }
};

module.exports = algorithms;