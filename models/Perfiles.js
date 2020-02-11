const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const perfilesSchema = new Schema({
	nombre: {
		type: String,
		trim: true
	},
	apellido: {
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
	nacimiento: Date,
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
	}
});

module.exports = mongoose.model('Perfiles', perfilesSchema);