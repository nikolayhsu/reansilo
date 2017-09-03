const r = require('../dbAccess').getDatabase();

exports.getUserByUsername = username => (
	new Promise((resolve, reject) => {
		r.table('users')
			.filter(r.row('username').eq(username))
			.run((err, cursor) => {
				if (err) reject(err);
				else resolve(cursor);
			});
	}));

exports.addUser = user => (
	new Promise((resolve, reject) => (
		r.table('users')
		.insert(user, {
			returnChanges: true,
			conflict: 'error',
		})
		.run((err, result) => {
			if (err) reject(err);
			else resolve(result);
		}))));
