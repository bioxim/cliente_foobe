const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feriasSchema = new Schema({
	nombre: {
		type: String,
		trim: true
	},
	fechainicial: {
		type: Date
	},
	fechafin: {
		type: Date
	},
	imagen: {
		type: String
	},
	categoria: {
		type: String,
		trim: true
	},
	tipo: {
		type: String,
		trim: true
	}
});
module.exports = mongoose.model('Ferias', feriasSchema);