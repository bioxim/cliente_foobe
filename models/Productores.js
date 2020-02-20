const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productoresSchema = new Schema({
	nombre: {
		type: String,
		trim: true
	},
	apellido: {
		type: String,
		trim: true
	},
	producto: {
		type: String,
		trim: true
	},
	telefono: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		lowercase: true,
		trim: true
	},
	zona: {
		type: String,
		trim: true
	},
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
	}
});

module.exports = mongoose.model('Productores', productoresSchema);