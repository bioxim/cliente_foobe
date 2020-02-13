const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tarjetasSchema = new Schema({
	nombre: {
		type: String,
		trim: true
	},
	empresa: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		lowercase: true,
		trim: true
	},
	telefono: {
		type: String,
		trim: true
	},
	url: {
		type: String,
		lowercase: true,
		trim: true
	},
	pais: {
		type: String,
		trim: true
	}
});

module.exports = mongoose.model('Tarjetas', tarjetasSchema);