var restify = require('restify');
var auth = require('../auth');

function getProfile (req, res, next) {
  var includeOwnInformation = (req.user && req.user == req.params.username);
  // req.log.info(req.db);
  var user = req.db.users.findOne({username: req.params.username});
  if (!user) {
    return next(new restify.errors.ResourceNotFoundError(`${req.params.username} not found`));
  }
  delete user['password_hash']; // TODO: just remove it from the query based on the includeOwnInformation
  res.send(user);
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

  res.send('delete');
}

module.exports = (server) => {

  // Register Routes for profile
  server.get('/user/:username', getProfile);

  server.post('/user/:username', auth.authenticate, auth.is_owner, updateProfile);
  server.del('/user/:username', auth.authenticate, auth.is_admin, deleteProfile);
  server.put('/user', auth.authenticate, auth.is_admin, createProfile);

};
