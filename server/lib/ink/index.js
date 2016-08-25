var restify = require('restify');
var auth = require('../auth');
var Model = require('./model');

function getInksForUser (req, res, next) {
  var model = Model(req.db);
  model.getForUsername(req.params.username)
    .then((inks) => {
      res.json(200, {code: 200, data: inks});
    }).catch((err) => {
    req.log.error(err);
    next.ifError(err);
  });
}

function getAllInks (req, res, next) {
  req.log.info('getAllInks');
  var model = Model(req.db);
  model.getAll({extended: true})
    .then((inks) => {
      req.log.info(inks);
      res.json(200, {code: 200, data: inks});
    }).catch((err) => {
      req.log.error(err);
      next.ifError(err);
  });
}

function createInk (req, res, next) {
  var owner_id = req.user.id;
  var model = Model(req.db);

  var data = JSON.parse(req.body);
  data.owner_id = owner_id;

  model.create(data).then(() => {
    res.json(200, {code: 200, message: 'created'});
  }).catch((err) => {
    req.log.error(err);
    next.ifError(err);
  });
}

function deleteInk (req, res, next) {
  var owner_id = req.user.id;
  var ink_id = req.params.id;
  var model = Model(req.db);

  model.delete({owner_id, id: ink_id}).then(() => {
    res.json(200, {code: 200, message: 'deleted'});
  }).catch((err) => {
    req.log.error(err);
    next.ifError(err);
  });
}

module.exports = (server) => {
  // Register Routes for inks
  server.get('/user/:username/inks', getInksForUser);
  server.del('/user/:username/inks/:id', auth.authenticate, auth.isOwner, deleteInk);
  server.get('/inks', getAllInks);
  server.put('/inks', auth.authenticate, createInk);
};
