const userModel = require('../model/user');
const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const sendToken = require('../JwtAll/jwtToCockie');

// Register user
const registerUser = catchAsyncError(async (req, res, next) => {
	try {
		const { name, email, password } = req.body;

		let user = await userModel.findOne({ email });
		if (user) {
			return res.status(400).json({ success: false, message: 'User already exists' });
		}

		user = await userModel.create({
			name,
			email,
			password,
		});

		sendToken(user, 201, res);
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});

//.........................LOGIN N .........................
const loginUser = catchAsyncError(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new ErrorHandler('Please enter the email & password', 400));
	}

	const user = await userModel.findOne({ email }).select('+password');

	if (!user) {
		return next(new ErrorHandler('User is not find with this email & password', 401));
	}
	const isPasswordMatched = await user.comparePassword(password);

	if (!isPasswordMatched) {
		return next(new ErrorHandler('User is not find with this email & password', 401));
	}
	sendToken(user, 201, res);
});

//  Log out user
const logoutUser = catchAsyncError(async (req, res, next) => {
	res.cookie('token', null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});
	res.status(200).json({
		success: true,
		message: 'Log out success',
	});
});

// get All user
const getAllUser = catchAsyncError(async (req, res, next) => {
	const getUsers = await userModel.find();
	if (!getUsers) {
		return next(new ErrorHandler('User Not Found', 400));
	}

	res.status(200).json(getUsers);
});
// get Single user
const getSingleUser = catchAsyncError(async (req, res, next) => {
	const getUsers = await userModel.findById(req.params.id);
	if (!getUsers) {
		return next(new ErrorHandler('Single User Not Found', 404));
	}

	res.status(200).json({
		success: true,
		getUsers,
	});
});

// delete user by id
const deleteUser = catchAsyncError(async (req, res, next) => {
	const getUser = await userModel.findById(req.params.id);
	if (!getUser) {
		return next(new ErrorHandler('data not found for delete', 404));
	}

	await getUser.remove();

	res.status(201).json({ mesage: 'User deleted successfully' });
});

module.exports = {
	getAllUser,
	getSingleUser,
	registerUser,
	loginUser,
	logoutUser,
	deleteUser,
};
