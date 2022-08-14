const mongoose = require('mongoose');
const PhoneSchema = new mongoose.Schema(
	{
		text: {
			type: String,
			required: [true, 'please add a text'],
		},
	},
	{
		timestamps: true,
	},
);
const phoneNumber = mongoose.model('phoneNumber', PhoneSchema);
module.exports = phoneNumber;
