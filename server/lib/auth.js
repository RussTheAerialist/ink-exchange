var restify = require('restify');
var passport = require('passport');
var LocalApiStrategy = require('passport-localapikey').Strategy;
var PasswordStrategy = require('passport-http').BasicStrategy;
var hash = require('./hasher');

var api_keys_cache = {};

function attach(server, db, log) {
  server.use(passport.initialize());
  passport.use('password', new PasswordStrategy(
    (username, password, done) => {
      log.info('password ' + db);
      db.users.findOne({username: username}, (err, user) => {
        if (err) {
          log.error(err);
          return done(new restify.errors.NotAuthorizedError());
        }

        if (!hash.verifyPassword(password, user.password_hash)) {
          return done(new restify.errors.NotAuthorizedError());
        }

        return done(null, {
          id: user.id,
          username: user.username
        });
      });
    },
    (params, done) => {
      log.info('validate thing');
      // TODO: Validate the nonce
      done(null, true);
    }
  ));

  return passport;
}

var authenticate = passport.authenticate('password', {session: false});

function is_owner(req, res, next) {
  req.log.info('is_owner');
  if (req.user && req.user.username !== req.params.username) {
    req.log.error('username and user did not match');
    return next(new restify.errors.NotAuthorizedError());
  }

  return next();
}

function is_admin(req, res, next) {
  // TODO: Query the database so we never store anything locally
  return next();
}

module.exports = {
  attach: attach,
  authenticate: authenticate,
  is_owner: is_owner,
  is_admin, is_admin
};

