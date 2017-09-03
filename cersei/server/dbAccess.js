// const r = require('rethinkdb');
const Rethinkdb = require('rethinkdbdash');
const shortid = require('shortid');
const { userLevels } = require('./constants');
const { host, port, dbName, adminUsername, adminPassword } = require('./init').dbSettings;

const r = new Rethinkdb({
	host,
	port,
	db: dbName,
	cursor: true,
});

const test = new Rethinkdb({
	host,
	port,
	db: 'test',
});

const initDB = () => (new Promise((resolve) => {
	r.dbList().contains(dbName)
		.do(databaseExists => (r.branch(
			databaseExists, {
				dbs_created: 0,
			},
			r.dbCreate(dbName),
		))).run((err, result) => {
			if (err) throw err;

			if (result.dbs_created) console.log(`[INFO] Created database ${dbName}.`);
			else console.log(`[INFO] Connected to database ${dbName}.`);

			resolve();
		});
}));


const initUsers = () => {
	r.tableCreate('users').run((err, result) => {
		if (err) throw err;
		console.log('[INFO] Created table users');

		if (result.tables_created) {
			// Create index
			r.table('users').indexCreate('userId').run((error, indexResult) => {
				if (error) throw error;

				if (indexResult.created) {
					// Insert super user
					r.table('users').insert({
						userId: shortid.generate(),
						username: adminUsername,
						password: adminPassword,
						userLevel: userLevels.SUPER,
					}).run((e) => {
						if (e) throw e;
						else console.log('[INFO] Created super user');
					});
				}
			});
		}
	});
};

const initSession = () => {
	test.tableCreate('session').run((err, result) => {
		if (err) throw err;

		if (result.table_created) {
			console.log('[INFO] Created table session');
		}
	});
};

exports.getDatabase = () => (r);

exports.init = () => {
	initDB()
	.then(() => {
		r.tableList()
			.contains('users')
			.run((err, exists) => {
				if (err) throw err;
				if (!exists) initUsers();
				else console.log('[INFO] table users is ready.');
			});
	});

	test.tableList()
		.contains('session')
		.run((err, exists) => {
			if (err) throw err;
			if (!exists) initSession();
			else console.log('[INFO] table session is ready.');
		});
};
