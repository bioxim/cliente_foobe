const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productosSchema = new Schema({
	codigo: {
		type: String,
		trim: true
	},
	nombre: {
		type: String,
		trim: true
	},
	descripcion: {
		type: String,
		trim: true
	}
});

module.exports = mongoose.model('Productos', productosSchema);