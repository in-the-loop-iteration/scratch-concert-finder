const express = require('express');
const app = express();
const path = require('path');
const config = require('./config');

const { database } = config;
const mongoose = require('mongoose');
const cors = require('cors');
const { port } = config;

const apiRouter = require('./routes/index');
const userRouter = require('./routes/user');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/build', express.static(path.resolve(__dirname, '../build')));
app.use('/api', apiRouter);
app.use('/user', userRouter);

app.get('/*', (req, res) => {
	return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

// handle unknown routes
app.use('*', (req, res) => {
	return res.status(404).send("This is not the page you're looking for..");
});

// Global error handler
app.use((err, req, res, next) => {
	const defaultErr = {
		log: 'Express error handler caught unknown middleware error',
		status: 500,
		message: { err: 'An error occurred' },
	};
	const errorObj = Object.assign({}, defaultErr, err);
	console.log(errorObj.log);
	return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => console.log(`Listening on port ${port}`));

/* module.exports = {
	app,
}; */

mongoose
	.connect(database, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		dbName: 'inTheLoop',
	})
	.then(() => console.log('Connected to Mongo DB.'))
	.catch((err) => console.log('err in connecting to DB: ', err));
