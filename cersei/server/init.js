exports.dbSettings = {
	host: '127.0.0.1',
	port: 28015,
	dbName: 'reansilo',
	adminUsername: 'admin',
	adminPassword: 'reansilo',
};

exports.environments = {
	development: {
		serverHost: 'localhost',
		serverPort: 8888,
		clients: ['http://localhost:8085'],
	},
	production: {
		serverHost: 'localhost',
		serverPort: 8888,
		clients: ['https://reansilo-demo.firebaseapp.com'],
	},
};
