const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const librosSchema = new Schema({
	feria: {
		type: Schema.ObjectId,
		ref: 'Ferias'
	},
	libro: [{
		tarjeta: {
			type: Schema.ObjectId,
			ref: 'Tarjetas'
		}
	}],
	librof: [{
		libropdf: {
			type: Schema.ObjectId,
			ref: 'Librosf'
		}
	}]
});

module.exports = mongoose.model('Libros', librosSchema);