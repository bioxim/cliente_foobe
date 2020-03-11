const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newslettersSchema = new Schema({
	email: {
		type: String,
		lowercase: true,
		trim: true
	},
    alta: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Newsletters', newslettersSchema);