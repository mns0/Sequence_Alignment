const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	alignments: [
		{
			sequence: {
				type: String,
			},
			sequenceMatch: {
				type: String,
			},
			length: {
				type: String,
			},
			evalue: {
				type: String,
			},
			identities: {
				type: String,
			},
			hspquery: {
				type: String,
			},
			hspmatch: {
				type: String,
			},
			hspsbjct: {
				type: String,
			},
			hspstart: {
				type: String,
			},
			hspend: {
				type: String,
			},

			date: {
				type: Date,
				default: Date.now,
			},
		},
	],
});

module.exports = User = mongoose.model('user', UserSchema);
