const express = require('express');
const cors = require('cors');
const path = require('path');

const apiRoutes = require('./routes/apiRoutes');
const viewRoutes = require('./routes/viewRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views'))); 

app.use('/api', apiRoutes);
app.use('/', viewRoutes);

app.get('/ping', (req, res) => {
    res.json({ message: 'Green Software Analyzer API is running!' });
});

app.listen(PORT, () => {
    console.log(`🌍 Green Software Analyzer running on http://localhost:${PORT}`);
});