const userModel = require('../model/user');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const phoneUser = require('../model/user');
const jwt = require('jsonwebtoken');

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	// if not found data
	if (!name || !email || !password) {
		res.status(400);
		throw new Error('please add all field');
	}
	// if user already have
	const userExists = await userModel.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error('already exists user');
	}
	// when found new user
	//hash password
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(password, salt);
	// create user
	const userData = await phoneUser.create({
		name,
		email,
		password: hashPassword,
	});
	if (userData) {
		res.status(201).json({
			_id: userData.id,
			name: userData.name,
			email: userData.email,
			token: generateToken(userData.id),
			// password: userData.password,
		});
	} else {
		res.status(400);
		throw new Error('Invalid  user data');
	}
});
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// if not found data
	if (!email || !password) {
		res.status(400);
		throw new Error('please add all field');
	}
	// if user already have
	const user = await userModel.findOne({ email });
	if (user && (await bcrypt.compare(password, user.password))) {
		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('user not found');
	}
});

const getAllUser = asyncHandler(async (req, res) => {
	const getUsers = await userModel.find();
	if (!getUsers) {
		res.status(400);
		throw new Error('user not found');
	}

	res.status(200).json(getUsers);
});

///............ bb nn nn h ff ...........
const getMe = (req, res) => {
	res.json({ message: 'I am here wow....yeaaaaaa.....' });
};

// create JWT token
const generateToken = id => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
};

module.exports = {
	getAllUser,
	registerUser,
	loginUser,
	getMe,
};
