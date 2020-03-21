const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const monedaSchema = new Schema({
	name: String,
	code: String,
	symbol: String
});

module.exports = mongoose.model('Monedas', monedaSchema);