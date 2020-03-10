const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true
	},
	password: {
		type: String,
		trim: true
	},
	nombre: {
		type: String,
		trim: true,
		default: 'This is my name'
	}
});

module.exports = mongoose.model('Usuarios', usuariosSchema);