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
      db.users.findOne({username: username}, (err, user) => {
        if (err) {
          log.error(err);
          return done(new restify.errors.NotAuthorizedError());
        }

        if (!hash.verifyPassword(password, user.password_hash)) {
          return done(new restify.errors.NotAuthorizedError());
        }

        var apikey = hash.generateApiKey(username, 0);
        return done(null, {
          id: user.id,
          username: user.username,
          apikey: apikey
        });
      });
    },
    (params, done) => {
      log.info('validate thing');
      // TODO: Validate the nonce
      done(null, true);
    }
  ));

  passport.use(new LocalApiStrategy((apikey, done) => {
    log.info('apikey');
    // TODO: Validate API Key from cache
    return done(null, 'userObject');
  }));

  return passport;
}

var login = passport.authenticate('password', {session: false});
var authenticate = passport.authenticate('localapikey', {session: false});

module.exports = {
  attach: attach,
  authenticate: authenticate,
  login: login
};

