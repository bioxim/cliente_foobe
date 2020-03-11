const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsletterSchema = new Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true
	},
    alta: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Newsletters', newsletterSchema);