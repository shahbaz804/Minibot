const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const app = express();

const PORT = process.env.PORT || 8000;

const server = require('./qr');
const code = require('./pair');

require('events').EventEmitter.defaultMaxListeners = 500;

// bodyParser must be registered BEFORE routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/qr', server);
app.use('/code', code);

app.get('/pair', (req, res) => {
    res.sendFile(path.join(__dirname, 'pair.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'main.html'));
});

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:` + PORT);
});

module.exports = app;
