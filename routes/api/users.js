const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { spawn } = require('child_process');
const auth = require('../../middleware/auth');

//Pull in user model
const User = require('../../models/User');

// @route  Post api/users
// @desc   Register user
// @access Public
router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check(
			'password',
			'Please enter a password with 6 or more characters'
		).isLength({ min: 6 }),
	],

	async (req, res) => {
		const errors = validationResult(req);
		//Validation Errors
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		try {
			//See if user exists
			let user = await User.findOne({ email });

			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'User already exists' }] });
			}

			let alignment = [];

			user = new User({
				name,
				email,
				password,
				alignment,
			});

			//Create salt and hash
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
			//Save user
			await user.save();
			//Return jsonwebtoken
			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

// @route GET api/users
// @desc Get current users profile
// A profile will always exist for a user
// @access Private
router.get('/', auth, async (req, res) => {
	try {
		const user_profile = await User.findById(req.user.id).select('-password');
		if (!user_profile) {
			return res.status(400).json({ msg: 'There is no profile for this user' });
		}
		res.json(user_profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route  POST api/users/alignment
// @desc   Runs a sequence alignment
// @access Private
router.post(
	'/alignment',
	[
		auth,
		check('alignmentString', 'alignmentString is required').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { alignmentString } = req.body;
		const alignmentResult = await pyAlignment(alignmentString);

		try {
			let profile = await User.findById(req.user.id).select('-password');
			if (alignmentResult && alignmentResult.length) {
				alignmentResult.map((result) => {
					const singleAlignmentResult = {
						sequenceMatch: result.sequence,
						sequence: alignmentString,
						length: result.length,
						evalue: result.evalue,
						identities: result.identities,
						hspquery: result.hspquery,
						hspmatch: result.hspmatch,
						hspsbjct: result.hspsbjct,
						hspstart: result.hspstart,
						hspend: result.hspend,
					};
					profile.alignments.unshift(singleAlignmentResult);
				});
			} else {
				singleAlignmentResult = {
					sequence: alignmentString,
					sequenceMatch: 'No Match',
				};
				profile.alignments.unshift(singleAlignmentResult);
			}

			await profile.save();
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @helper  Spawns a sequence alignment child process
// @desc    Runs a sequence alignment
// @access  None
let pyAlignment = (alignmentString) => {
	return new Promise((resolve, reject) => {
		const process = spawn('python', [
			'./alignment/alignment.py',
			alignmentString,
		]);
		const out = [];
		process.stdout.on('data', (data) => {
			out.push(data.toString());
		});
		const err = [];
		process.stderr.on('data', (data) => {
			err.push(data.toString());
		});
		process.on('exit', (code, signal) => {
			if (code !== 0) {
				reject(new Error(err.join('\n')));
				return;
			}
			try {
				resolve(JSON.parse(out[0]));
			} catch (e) {
				reject(e);
			}
		});
	});
};

module.exports = router;
