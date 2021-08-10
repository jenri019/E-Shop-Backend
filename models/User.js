const { Schema, model } = require('mongoose');

const UserSchema = Schema({
	name: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: { type: String, required: true, uniqued: true, trim: true },
	password: {
		type: String,
		required: true,
	},
	created: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = model('User', UserSchema);
