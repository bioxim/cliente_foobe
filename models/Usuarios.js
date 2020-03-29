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
	},
	tagline: {
		type: String,
		trim: true,
		default: 'Foobes Member'
	},
	imagen: String,
	registro: {
		type: Date,
		default: Date.now()
	},
	nacimiento: Date,
	actividad: String,
	linkedin: {
		type: String,
		trim: true
	},
	facebook: {
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
	empresa: {
		type: String,
		trim: true
	},
	direccion: {
		type: String,
		trim: true
	},
	pais: {
		type: String,
		trim: true
	},
	mensajes: [{
		mensaje: {
			type: String,
			trim: true
		}
	}],
	amigos: [{
			type: String,
			trim: true	
		}]
});

module.exports = mongoose.model('Usuarios', usuariosSchema);