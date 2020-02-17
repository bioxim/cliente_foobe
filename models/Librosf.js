const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const librosfSchema = new Schema({
	nombre: {
		type: String,
		trim: true
	},
	fecha: Date,
	pdf: String,
	contactos: Number,
	pais: String,
	producto: String
});
module.exports = mongoose.model('Librosf', librosfSchema);