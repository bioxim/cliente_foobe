const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contenidosSchema = new Schema({
	tagline: String
});

module.exports = mongoose.model('Contenidos', contenidosSchema);