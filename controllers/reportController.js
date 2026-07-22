const { Parser } = require('json2csv');
const PDFDocument = require('pdfkit');

// Memory te temporary history save rakhar jonno (Database er bodole)
let benchmarkHistory = [];

const addToHistory = (result) => {
    benchmarkHistory.push(result);
};

const exportCSV = (req, res) => {
    try {
        if (benchmarkHistory.length === 0) {
            return res.status(400).send('No benchmark history available to export.');
        }

        const fields = ['algorithm', 'metrics.executionTimeMs', 'metrics.memoryUsedMB', 'metrics.cpuUsageMs', 'metrics.energyJoules', 'greenScore.rating'];
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(benchmarkHistory);

        res.header('Content-Type', 'text/csv');
        res.attachment('benchmark-report.csv');
        return res.send(csv);
    } catch (err) {
        res.status(500).send('Error generating CSV');
    }
};

const exportPDF = (req, res) => {
    try {
        if (benchmarkHistory.length === 0) {
            return res.status(400).send('No benchmark history available to export.');
        }

        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=benchmark-report.pdf');
        
        doc.pipe(res);

        doc.fontSize(20).text('Green Software Efficiency Report', { align: 'center' });
        doc.moveDown();

        benchmarkHistory.forEach((item, index) => {
            doc.fontSize(14).text(`Test #${index + 1}: ${item.algorithm.replace(/_/g, ' ')}`);
            doc.fontSize(12).text(`- Time: ${item.metrics.executionTimeMs} ms`);
            doc.fontSize(12).text(`- Memory: ${item.metrics.memoryUsedMB} MB`);
            doc.fontSize(12).text(`- Energy: ${item.metrics.energyJoules} Joules`);
            doc.fontSize(12).text(`- Green Score: ${item.greenScore.rating}`);
            doc.moveDown();
        });

        doc.end();
    } catch (err) {
        res.status(500).send('Error generating PDF');
    }
};

module.exports = { exportCSV, exportPDF, addToHistory };