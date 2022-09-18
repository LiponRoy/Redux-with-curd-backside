const userModel = require('../model/user');
const jwt = require('jsonwebtoken');
const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/ErrorHandler');

exports.jwtAuth = catchAsyncError(async (req, res, next) => {
	const { token } = req.cookies;

	if (!token) {
		return next(new ErrorHandler('Login to access this route', 401));
	}

	const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
	req.user = await userModel.findById(decoded.id);
	next();
});

// exports.authRole = (...roles) => {
// 	return (req, res, next) => {
// 		if (!roles.includes(req.user.role)) {
// 			res.status(403);
// 			throw new Error(`role:${req.user.role} is not allowed to access this
// 			router`);
// 		}
// 		next();
// 	};
// };
