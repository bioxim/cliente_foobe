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
	}]
});

module.exports = mongoose.model('Libros', librosSchema);