// Modules
const express = require('express');
const cookie = require('cookie-parser');
const session = require('express-session');
const RDBStore = require('express-session-rethinkdb')(session);
const Rethinkdb = require('rethinkdbdash');
const bodyParser = require('body-parser');
const ejs = require('ejs');

// Customised Modules
const db = require('./server/dbAccess');
const auth = require('./server/modules/auth');
const { secret } = require('./server/constants');
const { environments } = require('./server/init');

// App Settings
const DIR = __dirname;
const ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const HOSTNAME = environments[ENV].serverHost;
const PORT = environments[ENV].serverPort;
const CLIENT_DOMAIN = environments[ENV].clients.join();

db.init();

const r = new Rethinkdb();
const app = express();
const rdbStore = new RDBStore({
	connection: r,
	table: 'session',
	sessionTimeout: 86400000,
	flushInterval: 60000,
	debug: process.env.NODE_ENV !== 'production',
});

app.use(cookie());
app.use(session({
	key: 'sid',
	secret,
	cookie: { maxAge: 860000, secure: false },
	store: rdbStore,
	resave: false,
	saveUninitialized: false,
}));

process.on('uncaughtException', (err) => {
	console.log('============ An Error Occurred =============');
	console.log(err, err.stack);
	console.log('============ Continue after error =============');
});

app.set('views', `${DIR}/server/views`);
app.engine('html', ejs.renderFile);

app.use(bodyParser.json());


app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', CLIENT_DOMAIN);
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.cookie('Cookie of Cercei', req.sessionID, req.session.cookie);

	if (req.method === 'OPTIONS') {
		res.end();
	} else {
		next();
	}
});

// Request Handling
app.get('/logout', auth.logout);
app.get('/getLoginStatus', auth.getLoginStatus);

app.post('/login', auth.login);
app.post('/register', auth.register);

app.get('/', (req, res) => {
	res.render('index.html', { mode: ENV });
});

app.get('*', (req, res) => {
	res.status(404)
		.render('404.html');
});

app.listen(PORT, HOSTNAME);

console.log(`Node.JS Server Started (express!) running on port:${PORT}`);
