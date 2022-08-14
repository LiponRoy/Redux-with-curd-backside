const phoneModel = require('../model/dataModel');
const asyncHandler = require('express-async-handler');

const getData = asyncHandler(async (req, res) => {
	const phoneNo = await phoneModel.find();
	res.status(200).json(phoneNo);
});

module.exports = {
	getData,
};
