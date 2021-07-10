const mongoose = require('mongoose');

// this schema is for spotify token

const tokenSchema = new mongoose.Schema({
	source: { type: String, required: true },
	tokenId: { type: String, required: true, unique: true },
	timestamp: { type: Date, required: true },
});

module.exports = mongoose.model('Token', tokenSchema);
