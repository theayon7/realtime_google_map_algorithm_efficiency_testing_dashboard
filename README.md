# 🍃 Green Software Efficiency Analyzer 

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg)](https://realtime-google-map-algorithm-efficiency.onrender.com/dashboard)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-lightgrey.svg)](https://expressjs.com/)

A full-stack web application designed to evaluate, benchmark, and compare various algorithms used in modern mapping systems (like Google Maps). It measures performance not just by execution speed, but by **environmental sustainability**—calculating energy consumption, memory footprint, CPU usage, and outputting a normalized "Green Score".

**🚀 Live Dashboard:** [View Live Project](https://realtime-google-map-algorithm-efficiency.onrender.com/dashboard)

---

## ✨ Features
*   **Real-time Benchmarking:** Test algorithms on the fly with Small, Medium, or Large simulated datasets.
*   **Green Score Calculation:** Dynamically assigns a rating (1 to 5) based on memory usage, execution time, and energy consumption (Joules).
*   **Data Visualization:** Interactive Bar and Radar charts using Chart.js to compare metrics visually.
*   **Comprehensive Reporting:** Export benchmark history directly to **PDF** or **CSV** formats.
*   **Modern UI:** Responsive Glassmorphism design with Dark/Light visual aesthetics.

## 🧰 Technology Stack
*   **Frontend:** HTML5, CSS3, Vanilla JavaScript, Chart.js, Font Awesome.
*   **Backend:** Node.js, Express.js.
*   **Modules:** Native `perf_hooks` and `process` modules for accurate hardware-level metric tracking.
*   **Data Export:** `pdfkit` (PDF generation), `json2csv` (CSV generation).

## 🧩 Analyzed Modules & Algorithms
1.  **Route Finding:** Dijkstra, A*, Bellman-Ford, Floyd-Warshall, Bidirectional Dijkstra.
2.  **Place Search:** Linear Search, Binary Search, Trie Search, Hash Table Lookup.
3.  **Nearby Places:** KD-Tree, R-Tree (Simplified), Quadtree.
4.  **GPS Tracking:** Kalman Filter, Particle Filter, Hidden Markov Model.
5.  **Traffic Prediction:** Linear Regression, Random Forest, XGBoost, LSTM (Simulated metrics).
6.  **Route Optimization:** Brute Force, Dynamic Programming, Genetic Algorithm, Ant Colony Optimization.

## ⚙️ Local Installation & Setup

If you want to run this project locally on your machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/theayon7/realtime_google_map_algorithm_efficiency_testing_dashboard.git](https://github.com/theayon7/realtime_google_map_algorithm_efficiency_testing_dashboard.git)
   cd realtime_google_map_algorithm_efficiency_testing_dashboard
