const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mensajesSchema = new Schema({
	usuario: {
		type: Schema.ObjectId,
		ref: 'Usuarios'
	},
	mensaje: {
		type: String,
		trim: true
	}
});

module.exports = mongoose.model('Mensajes', mensajesSchema);