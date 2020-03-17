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
	imagen: {
		type: String,
		default: 'avatar-static.jpg'
	},
	registro: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('Usuarios', usuariosSchema);