const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
	// Get token from header
	const token = req.header('x-auth-token');

	// Check if not token
	if (!token) {
		return res.status(401).json({ msg: 'NO TOKEN DID NOT PASS AUTH, IN AUTH' });
	}

	// Verify token
	try {
		jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
			if (error) {
				return res.status(401).json({ msg: 'INVALID TOKEN, IN AUTH' });
			} else {
				req.user = decoded.user;
				next();
			}
		});
	} catch (err) {
		console.error('Auth Middleware Issue');
		res.status(500).json({ msg: 'Server Error' });
	}
};
