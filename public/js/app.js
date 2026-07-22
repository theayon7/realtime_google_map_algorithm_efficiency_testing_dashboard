const algorithmMap = {
    routeFinding: ['Dijkstra', 'A_Star', 'Bellman_Ford', 'Floyd_Warshall', 'Bidirectional_Dijkstra'],
    searching: ['Linear_Search', 'Binary_Search', 'Trie_Search', 'Hash_Table_Lookup'],
    nearby: ['KD_Tree', 'R_Tree_Simplified', 'Quadtree'],
    gps: ['Kalman_Filter', 'Particle_Filter', 'Hidden_Markov_Model_Simplified'],
    traffic: ['Linear_Regression', 'Random_Forest', 'XGBoost_Simulated', 'LSTM_Simulated'],
    optimization: ['Brute_Force', 'Dynamic_Programming', 'Genetic_Algorithm', 'Ant_Colony_Optimization']
};

const moduleSelect = document.getElementById('moduleSelect');
const algorithmSelect = document.getElementById('algorithmSelect');
const sizeSelect = document.getElementById('sizeSelect');
const benchmarkBtn = document.getElementById('benchmarkBtn');

let barChartInst = null;
let radarChartInst = null;
let chartData = {
    labels: [],
    energy: [],
    time: [],
    memory: []
};

function updateAlgorithmOptions() {
    const mod = moduleSelect.value;
    const algos = algorithmMap[mod];
    algorithmSelect.innerHTML = '';
    algos.forEach(alg => {
        const opt = document.createElement('option');
        opt.value = alg;
        opt.textContent = alg.replace(/_/g, ' ');
        algorithmSelect.appendChild(opt);
    });
}

moduleSelect.addEventListener('change', updateAlgorithmOptions);
updateAlgorithmOptions();

benchmarkBtn.addEventListener('click', async () => {
    const payload = {
        moduleName: moduleSelect.value,
        algorithm: algorithmSelect.value,
        size: sizeSelect.value
    };

    benchmarkBtn.disabled = true;
    benchmarkBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Running...';

    try {
        const response = await fetch('/api/benchmark', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        const data = await response.json();
        updateUI(data);
        updateCharts(data);
    } catch (error) {
        alert('Error running benchmark');
    }

    benchmarkBtn.disabled = false;
    benchmarkBtn.innerHTML = '<i class="fas fa-play"></i> Run Benchmark';
});

function updateUI(data) {
    document.getElementById('timeResult').textContent = `${data.metrics.executionTimeMs} ms`;
    document.getElementById('memoryResult').textContent = `${data.metrics.memoryUsedMB} MB`;
    document.getElementById('cpuResult').textContent = `${data.metrics.cpuUsageMs} ms`;
    document.getElementById('energyResult').textContent = `${data.metrics.energyJoules} J`;
    document.getElementById('scoreResult').textContent = `${data.greenScore.numericScore} / 5`;
    
    const recPanel = document.getElementById('recText');
    if (data.greenScore.numericScore >= 4) {
        recPanel.textContent = `${data.algorithm.replace(/_/g, ' ')} is highly recommended for green software! (${data.greenScore.rating})`;
        recPanel.style.color = '#4ade80';
    } else {
        recPanel.textContent = `Consider optimizing ${data.algorithm.replace(/_/g, ' ')} or switching to a greener alternative. (${data.greenScore.rating})`;
        recPanel.style.color = '#f87171';
    }
}
function updateCharts(data) {
    const algoName = data.algorithm.replace(/_/g, ' ');
    
    if (!chartData.labels.includes(algoName)) {
        chartData.labels.push(algoName);
        chartData.energy.push(parseFloat(data.metrics.energyJoules));
        chartData.time.push(parseFloat(data.metrics.executionTimeMs));
        chartData.memory.push(parseFloat(data.metrics.memoryUsedMB));
    } else {
        const idx = chartData.labels.indexOf(algoName);
        chartData.energy[idx] = parseFloat(data.metrics.energyJoules);
        chartData.time[idx] = parseFloat(data.metrics.executionTimeMs);
        chartData.memory[idx] = parseFloat(data.metrics.memoryUsedMB);
    }

    renderBarChart();
    renderRadarChart();
}

function renderBarChart() {
    const ctx = document.getElementById('barChart').getContext('2d');
    if (barChartInst) barChartInst.destroy();
    
    barChartInst = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartData.labels,
            datasets: [{
                label: 'Energy (Joules)',
                data: chartData.energy,
                backgroundColor: 'rgba(52, 211, 153, 0.6)',
                borderColor: 'rgba(52, 211, 153, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: '#fff' } } },
            scales: {
                y: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } },
                x: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } }
            }
        }
    });
}

function renderRadarChart() {
    const ctx = document.getElementById('radarChart').getContext('2d');
    if (radarChartInst) radarChartInst.destroy();

    radarChartInst = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: chartData.labels,
            datasets: [
                {
                    label: 'Execution Time (ms)',
                    data: chartData.time,
                    backgroundColor: 'rgba(96, 165, 250, 0.2)',
                    borderColor: 'rgba(96, 165, 250, 1)'
                },
                {
                    label: 'Memory (MB)',
                    data: chartData.memory,
                    backgroundColor: 'rgba(248, 113, 113, 0.2)',
                    borderColor: 'rgba(248, 113, 113, 1)'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: '#fff' } } },
            scales: {
                r: { 
                    angleLines: { color: 'rgba(255,255,255,0.1)' },
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    pointLabels: { color: '#fff' },
                    ticks: { display: false }
                }
            }
        }
    });
}

document.getElementById('exportCsvBtn').addEventListener('click', () => {
    window.open('/api/export/csv', '_blank');
});

document.getElementById('exportPdfBtn').addEventListener('click', () => {
    window.open('/api/export/pdf', '_blank');
});