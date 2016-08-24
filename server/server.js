require('dotenv').config();
var restify = require('restify');
var auth = require('./lib/auth');
var log = require('bunyan').createLogger({name: 'ie'});
var massive = require('massive');
var db = massive.connectSync({connectionString: process.env.CONNECTION});

var profile = require('./lib/profile');

var server = restify.createServer({
  name: 'inkexchange',
  log: log
});

server.use((req, res, next) => {
  req.db = db;
  return next();
});
server.use(restify.requestLogger());
server.use(restify.authorizationParser());
server.use(restify.bodyParser());
server.use(restify.dateParser());
server.use(restify.queryParser());
auth.attach(server, db, log); // Configure authentication

server.post('/login', auth.authenticate, (req, res) => {
  res.send(req.user);
});

profile(server, log);
server.listen(8000);
log.info('Starting server on port 8080');

