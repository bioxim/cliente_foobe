const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientesSchema = new Schema({
	usuario: {
		type: Schema.ObjectId,
		ref: 'Usuarios'
	},
	cliente: [{
		perfil: {
			type: Schema.ObjectId,
			ref: 'Perfiles'
		}
	}]
});

module.exports = mongoose.model('Clientes', clientesSchema);