const express = require('express');
const router = express.Router();
const { runTest } = require('../controllers/benchmarkController');
const { exportCSV, exportPDF } = require('../controllers/reportController');

router.post('/benchmark', runTest);
router.get('/export/csv', exportCSV);
router.get('/export/pdf', exportPDF);

module.exports = router;