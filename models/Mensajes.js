const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mensajesSchema = new Schema({
	escritor: String,
	lector: String,
	titulo: {
		type: String,
		trim: true
	},
	mensaje: {
		type: String,
		trim: true
	},
	fecha: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('Mensajes', mensajesSchema);