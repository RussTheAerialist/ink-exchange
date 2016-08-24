var restify = require('restify');
var auth = require('../auth');
var Model = require('./model');

function getAllProfiles (req, res, next) {
  var model = Model(req.db);
  model.all().then((userList) => {
    res.send({code: 200, data: userList});
  }).catch((err) => {
    next(err);
  });
}

function getProfile (req, res, next) {
  var includeOwnInformation = (req.user && req.user.username == req.params.username);
  var model = Model(req.db);
  model.find(req.params.username).then((user) => {
    if (!user) {
      return next(new restify.errors.ResourceNotFoundError(`/users/${req.params.username} not found`));
    }
    delete user['password_hash']; // TODO: just remove it from the query based on the includeOwnInformation
    res.send({code: 200, data: user});
  }).catch((err) => {
    next(err);
  });
}

function updateProfile (req, res, next) {
  var model =  new Model(req.db);
  model.update(req.user.id, JSON.parse(req.body)).then((value) => {
    res.send({code: 200, data: value});
  }).catch((err) => {
    next(err);
  })
}

function createProfile (req, res, next) {
  var model = new Model(req.db);
  model.create(JSON.parse(req.body)).then((user) => {
    res.send({code: 200, data: user});
  }).catch((err) => {
    next(err);
  });
}

function deleteProfile (req, res, next) {
  if (req.user && req.user.username === req.params.username) {
    return next(new restify.errors.NotAuthorizedError('cannot delete yourself'));
  }

  var model = Model(req.db);

  model.find(req.params.username).then((user) => {
    req.log.info('find done');
    if (!user) {
      next(new restify.errors.ResourceNotFoundError(`${req.params.username} not found`));
    }
    req.log.info('user', user);
    return model.drop(user.id);
  }).then((value) => {
      req.log.info('drop done', err);
      res.send({code: 200});
  }).catch((err) => {
    res.log.err('DROP ERROR', err);
    next.ifError(err);
  })
}

module.exports = (server) => {

  // Register Routes for profile
  server.get('/user/:username', getProfile);
  server.get('/users', getAllProfiles);

  // server.post('/user/:username', auth.authenticate, auth.is_owner, updateProfile);
  // server.del('/user/:username', auth.authenticate, auth.is_admin, deleteProfile);
  server.put('/user', auth.authenticate, auth.is_admin, createProfile);

};
