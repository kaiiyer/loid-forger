const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const iocsRoutes = require('./routes/iocs');

const app = express();

app.use(bodyParser.json());

// Set up routes
app.use('/auth', authRoutes);
app.use('/iocs', iocsRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});