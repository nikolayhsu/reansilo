// Handles requests in regard to authentication
const AuthModel = require('../models/auth.model');
const shortid = require('shortid');
const {	userLevels } = require('../constants');
const { handleError } = require('./helpers');

// Returns data of the current session
exports.getLoginStatus = (req, res) => {
	const result = {
		isLoggedIn: false,
		userId: '',
		username: '',
		nickname: '',
		userLevel: '',
	};

	if (req.session.userId !== undefined) {
		const { username, nickname, userLevel, userId } = req.session;

		res.json({
			isLoggedIn: true,
			userId,
			username,
			nickname,
			userLevel,
		});
	} else {
		res.json(result);
	}
};

// Login by username and password
exports.login = (req, res) => {
	const defaultResult = {
		isLoggedIn: false,
		userId: '',
		username: '',
		nickname: '',
	};

	const { username, password } = req.body;

	if (username && password) {
		AuthModel.getUserByUsername(username)
			.then((cursor) => {
				cursor.toArray((err, result) => {
					if (err) throw err;

					if (result.length > 0) {
						const user = result[0];

						if (user.password !== password) {
							res.json(defaultResult);
							return;
						}

						req.session.id = user.id;
						req.session.username = user.username;
						req.session.userLevel = user.userLevel;
						req.session.userId = user.userId;
						req.session.nickname = user.nickname;

						const output = Object.assign(defaultResult, {
							isLoggedIn: true,
							userId: user.userId,
							username: user.username,
							nickname: user.nickname,
							userLevel: user.userLevel,
						});

						res.json(output);
						return;
					}

					res.json(defaultResult);
				});
			}).catch(reason => console.log(reason));
	} else {
		res.json(defaultResult);
	}
};

exports.logout = (req, res) => {
	req.session.destroy();

	const defaultResult = {
		isLoggedIn: false,
		userId: '',
		username: '',
		nickname: '',
	};

	res.json(defaultResult);
};

// Register an account by username and password
exports.register = (req, res) => {
	const { username, nickname, password } = req.body;
	const formValues = req.body;

	const result = {
		data: {},
		errors: [],
		params: {},
		success: false,
	};

	const requiredFields = [
		'username',
		'nickname',
		'password',
	];

	requiredFields.forEach((key) => {
		if (formValues[key] === undefined || formValues[key].toString().length === 0) {
			result.errors.push(`${key} is missing.`);
		}
	});

	if (result.errors.length === 0) {
		AuthModel.getUserByUsername(username)
			.then((cursor) => {
				cursor.toArray((err, users) => {
					if (err) throw err;
					if (users.length > 0) {
						result.errors.push(`Email ${username} has been registered.`);
						res.json(result);
					} else {
						AuthModel.addUser({
							userId: shortid.generate(),
							username,
							password,
							nickname,
							userLevel: userLevels.GENERAL,
						})
						.then((response) => {
							if (response.inserted > 0 && response.errors === 0) {
								result.success = true;
								result.data.username = username;
								res.json(result);
							}
						})
						.catch((error) => {
							handleError(error);
						});
					}
				});
			})
			.catch((error) => {
				handleError(error);
			});
	} else {
		res.json(result);
	}
};

// exports.forgotPassword = (req, res) => {
// 	const result = {
// 		success: false,
// 		message: '',
// 	};

// 	if (req.body.username !== undefined) {
// 		const combo = {
// 			username: req.body.username,
// 		};

// 		db.db().collection('users').findOne(combo, (err, user) => {
// 			if (err) {
// 				console.log(err);
// 			} else if (user && user.user_id) {
// 				var cipher = crypto.createCipher('aes256', secret);
// 				var encryptedId = cipher.update(user.user_id, 'utf-8', 'hex') + cipher.final('hex');
// 				var token = '';

// 				// Generate a token of 9 digits
// 				for (var i = 0; i < 9; i++) {
// 					token += (parseInt(Math.random() * (secret.length)) % 10).toString();
// 				}

// 				db.db().collection('users').update(
// 					combo, {
// 						$set: {
// 							token: token,
// 							token_date: new Date(),
// 							locked: true
// 						}
// 					}, {
// 						upsert: false
// 					},
// 					function(err, response) {
// 						if (response.ok) {
// 							sendResetPasswordEmail(user.username, encryptedId, token, req.headers.host);

// 							result.success = true;
// 							result.status = 'ok';
// 							result.message = 'An email has been sent to ' + user.username + '. \
// 												Please check the inbox and use the link provided to reset the password.';
// 							res.json(result);
// 						} else {
// 							result.status = 'failed';
// 							result.message = 'Unexpected error. Please try again later.'
// 							res.json(result);
// 						}
// 					}
// 				);
// 			} else {
// 				result.status = 'not_found';
// 				result.message = 'We don\'t recognise this email address. Please try again.';
// 				res.json(result);
// 			}
// 		});
// 	} else {
// 		result.status = 'invalid';
// 		result.message = 'Something is wrong.';
// 		res.json(result);
// 	}
// };

// exports.resetPassword = (req, res) => {
// 	const result = {
// 		success: false,
// 		status: '',
// 		message: '',
// 	};

// 	if (req.body.user && req.body.token && req.body.password) {
// 		const decipher = crypto.createDecipher('aes256', SECRET);
// 		const decryptedId = decipher.update(req.body.user, 'hex', 'utf8') + decipher.final('utf8');

// 		const combo = {
// 			user_id: decryptedId,
// 			token: req.body.token,
// 		};

// 		db.db().collection('users').findOne(combo, (err, user) => {
// 			if (err) {
// 				console.log(err);
// 			} else if (user && user.user_id) {
// 				db.db().collection('users').update(
// 					combo, {
// 						$set: {
// 							token: '',
// 							token_date: '',
// 							locked: false,
// 							password: req.body.password,
// 						},
// 					}, {
// 						upsert: false,
// 					},
// 					(err, response) => {
// 						if (response.ok) {
// 							result.success = true;
// 							result.status = 'ok';
// 							res.json(result);
// 						} else {
// 							result.status = 'falied';
// 							result.message = 'Cannot reset your password now. Please try again later.';
// 							res.json(result);
// 						}
// 					},
// 				);
// 			} else {
// 				result.status = 'not_found';
// 				result.message = 'The token is invalid. Please try resetting your password again.';
// 				res.json(result);
// 			}
// 		});
// 	} else {
// 		result.status = 'invalid';
// 		result.message = 'Something is wrong.';
// 		res.json(result);
// 	}
// };
