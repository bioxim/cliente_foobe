const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentationsSchema = new Schema({
	titulo: {
		type: String,
		trim: true
	},
	imagen: String,
	texto: {
		type: String,
		trim: true
	}
});

module.exports = mongoose.model('Documentations', documentationsSchema);