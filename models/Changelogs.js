const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const changelogSchema = new Schema({
	fecha: Date,
	changelog: {
		type: String,
		trim: true
	}
});

module.exports = mongoose.model('Changelogs', changelogSchema);