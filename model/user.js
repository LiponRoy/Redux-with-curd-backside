const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'please add your name'],
		},
		email: {
			type: String,
			required: [true, 'please add email'],
		},
		password: {
			type: String,
			required: [true, 'please add a password'],
		},
	},
	{
		timestamps: true,
	},
);
const phoneUser = mongoose.model('phoneUser', userSchema);
module.exports = phoneUser;
