const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mensajesSchema = new Schema({
	escritor: {
		type: Schema.ObjectId,
		ref: 'Usuarios'
	},
	lector: {
		type: Schema.ObjectId,
		ref: 'Usuarios'
	},
	titulo: {
		type: String,
		trim: true
	}
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