const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const administradoresSchema = new Schema({
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
	}
});

module.exports = mongoose.model('Administradores', administradoresSchema);