const mongoose2 = require('mongoose');
const Schema = mongoose2.Schema;

const usuariosSchema = new Schema({
	nombre: {
		type: String,
		trim: true
	},
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
	imagen: String,
	taglineProfile: {
		type: String,
		trim: true
	},
	telefono: {
		type: String,
		trim: true
	},
	empresa: {
		type: String,
		trim: true
	},
	nacimiento:  {
		type: Date,
		default: Date.now
	},
	profile: String,
	direccion: {
		type: String,
		trim: true
	},
	ciudad: {
		type: String,
		trim: true
	},
	estado: {
		type: String,
		trim: true
	},
	pais: {
		type: String,
		trim: true
	},
	facebook: {
		type: String,
		trim: true
	},
	linkedin: {
		type: String,
		trim: true
	},
	twitter: {
		type: String,
		trim: true
	},
	instagram: {
		type: String,
		trim: true
	},
	youtube: {
		type: String,
		trim: true
	}
});

module.exports = mongoose2.model('Usuarios', usuariosSchema);