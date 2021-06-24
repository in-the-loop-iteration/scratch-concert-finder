const express = require('express');
const app = express();
const path = require('path');


require('dotenv').config();

app.use('/build', express.static(path.resolve(__dirname, '../build')));

app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

app.listen(3000);