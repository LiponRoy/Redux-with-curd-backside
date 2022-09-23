const mongoose = require('mongoose');
const phoneBookSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'please add Your Name'],
		},

		phoneNumber: {
			type: Number,
			required: [true, 'please add phone Number'],
		},
		location: {
			type: String,
			required: [true, 'please add a location'],
		},
	},
	{
		timestamps: true,
	},
);

const phoneBook = mongoose.model('phoneBook', phoneBookSchema);
module.exports = phoneBook;
