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

const updateData = asyncHandler(async (req, res) => {
	const getPhoneNo = await phoneModel.findById(req.params.id);
	if (!getPhoneNo) {
		res.status(400);
		throw new Error('data not found for update');
	}

	const updatePhoneNo = await phoneModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

	if (updatePhoneNo) {
		res.status(201).json({ message: 'data updated' });
	}
});
const deleteData = asyncHandler(async (req, res) => {
	const getPhoneNo = await phoneModel.findById(req.params.id);
	if (!getPhoneNo) {
		res.status(400);
		throw new Error('data not found for delete');
	}

	await getPhoneNo.remove();

	res.status(201).json({ mesage: 'removed data' });
});

module.exports = {
	getData,
	createData,
	updateData,
	deleteData,
};
