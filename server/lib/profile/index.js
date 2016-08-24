var restify = require('restify');
var auth = require('../auth');
var Model = require('./model');

function getProfile (req, res, next) {
  var includeOwnInformation = (req.user && req.user.username == req.params.username);
  var model = Model(req.db);
  model.find(req.params.username, (err, user) => {
    if (!user) {
      return next(new restify.errors.ResourceNotFoundError(`/users/${req.params.username} not found`));
    }
    delete user['password_hash']; // TODO: just remove it from the query based on the includeOwnInformation
    res.send({code: 200, data: user});
  });
}

function updateProfile (req, res, next) {
  res.send('update');
}

function createProfile (req, res, next) {
  res.send('create');
}

function deleteProfile (req, res, next) {
  if (req.user && req.user.username === req.params.username) {
    return next(new restify.errors.NotAuthorizedError('cannot delete yourself'));
  }

  var model = Model(req.db);

  model.find(req.params.username, (err, user) => {
    next.ifError(err);
    if (!user) {
      next(new restify.errors.ResourceNotFoundError(`${req.params.username} not found`));
    }
    model.drop(user.id, (err) => {
      next.ifError(err);
      res.send({code: 200});
    });
  });
}

module.exports = (server) => {

  // Register Routes for profile
  server.get('/user/:username', getProfile);

  server.post('/user/:username', auth.authenticate, auth.is_owner, updateProfile);
  server.del('/user/:username', auth.authenticate, auth.is_admin, deleteProfile);
  server.put('/user', auth.authenticate, auth.is_admin, createProfile);

};
