require('dotenv').config();
var restify = require('restify');
var auth = require('./lib/auth');
var log = require('bunyan').createLogger({name: 'ie'});
var db = require('./lib/db');
var profile = require('./lib/profile');
var ink = require('./lib/ink');

var SERVER_PORT = process.env.REST_PORT || 8000;

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
ink(server, log);

server.listen(SERVER_PORT);
log.info(`Starting server on port ${SERVER_PORT}`);

