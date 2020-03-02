const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const objetosSchema = new Schema({
	cliente: {
		type: Schema.ObjectId,
		ref: 'Usuarios'
	},
	perfil: [{
		detalleperfil: {
			type: Schema.ObjectId,
			ref: 'Perfiles'
		}
	}] 
});

module.exports = mongoose.model('Objetos', objetosSchema);