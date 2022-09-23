const phoneModel = require('../model/phoneBook');
const asyncHandler = require('express-async-handler');

const createPhonebook = asyncHandler(async (req, res) => {
	const { name, phoneNumber, location } = req.body;

	const isExits = await phoneModel.findOne({ name });
	if (isExits) {
		res.status(400);
		throw new Error('already exits ! Very Sad');
	}
	if (!name || !phoneNumber || !location) {
		res.status(400);
		throw new Error('please add all field');
	}
	const savePhoneNumber = await phoneModel.create({
		name,
		phoneNumber,
		location,
	});
	res.status(200).json({
		success: true,
		savePhoneNumber,
	});
});

const getAllPhonebook = asyncHandler(async (req, res) => {
	const phoneNo = await phoneModel.find();
	if (!phoneNo) {
		res.status(400);
		throw new Error('all data not found !');
	}

	res.status(200).json(phoneNo);
});
const getPhonebook = asyncHandler(async (req, res) => {
	const phoneNo = await phoneModel.findById(req.params.id);
	if (!phoneNo) {
		res.status(400);
		throw new Error('data not found Id is invalid');
	}

	res.status(200).json(phoneNo);
});

const updatePhonebook = asyncHandler(async (req, res) => {
	const getPhoneNo = await phoneModel.findById(req.params.id);
	if (!getPhoneNo) {
		res.status(400);
		throw new Error('data not found for update');
	}

	const updatePhoneNo = await phoneModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
	if (!updatePhoneNo) {
		res.status(400);
		throw new Error(' data not updated');
	}
	if (updatePhoneNo) {
		res.status(201).json({ message: 'data updated' });
	}
});
const deletePhonebook = asyncHandler(async (req, res) => {
	const getPhoneNo = await phoneModel.findById(req.params.id);
	if (!getPhoneNo) {
		res.status(400);
		throw new Error('data not found for delete');
	}

	await getPhoneNo.remove();

	res.status(201).json({ mesage: 'removed data' });
});

module.exports = {
	createPhonebook,
	getAllPhonebook,
	getPhonebook,
	updatePhonebook,
	deletePhonebook,
};
