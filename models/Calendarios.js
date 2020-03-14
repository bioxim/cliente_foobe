const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const calendariosSchema = new Schema({
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
	direccion: {
		type: String,
		trim: true
	},
	lat: {
		type: String,
		trim: true
	},
	long: {
		type: String,
		trim: true
	},
	pais: {
		type: String,
		trim: true
	}
});
module.exports = mongoose.model('Calendarios', calendariosSchema);