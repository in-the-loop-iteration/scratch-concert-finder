const express = require('express');
const app = express();
const path = require('path');
const config = require('./config');
const routes = require('./routes');

const { port } = config;

app.use(express.json());

app.get('/', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../index.html')));

app.use('/build', express.static(path.resolve(__dirname, '../build')));

app.use('/api', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = {
  app,
};
