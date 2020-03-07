const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const perfilesSchema = new Schema({
	nombre: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		trim: true
	}
});

module.exports = mongoose.model('Perfiles', perfilesSchema);