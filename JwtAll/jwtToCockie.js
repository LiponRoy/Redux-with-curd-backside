// Create and send token into cockie and save
const sendToken = async (user, statusCode, res) => {
	//create jwt
	const token = await user.getJwtToken();

	// opton for coockie
	const options = {
		expires: new Date(
			Date.now() + process.env.COOCKIE_EXPRIES_TIME * 24 * 60 * 60 * 1000,
			// Date.now() + 50000
		),
		// maxAge: 3600,
		httpOnly: true,
	};

	res.status(statusCode).cookie('token', token, options).json({
		success: true,
		user,
		token,
	});
};

module.exports = sendToken;
