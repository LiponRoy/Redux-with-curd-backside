const phoneModel = require('../model/dataModel');
const asyncHandler = require('express-async-handler');

const getData = asyncHandler(async (req, res) => {
	const phoneNo = await phoneModel.find();
	res.status(200).json(phoneNo);
});

const createData = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error('please add a text field');
	}
	const phoneNo = await phoneModel.create({
		text: req.body.text,
	});
	res.status(200).json(phoneNo);
});

module.exports = {
	getData,
	createData,
};
