var restify = require('restify');
var auth = require('../auth');
var Model = require('./model');

function getInksForUser (req, res, next) {
  var model = Model(req.db);
  model.getForUsername(req.params.username)
    .then((inks) => {
      res.send({code: 200, data: inks});
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
      res.send({code: 200, data: inks});
    }).catch((err) => {
      req.log.error(err);
      next.ifError(err);
  });
}

function createInk(req, res, next) {
  var owner_id = req.user.id;
  var model = Model(req.db);

  var data = JSON.parse(req.body);
  data.owner_id = owner_id;

  model.create(data).then(() => {
    res.send({code: 200, message: 'created'});
  }).catch((err) => {
    req.log.error(err);
    next.ifError(err);
  });
}

module.exports = (server) => {
  // Register Routes for inks
  server.get('/user/:username/inks', getInksForUser);
  server.get('/inks', getAllInks);
  server.put('/inks', auth.authenticate, createInk);
};
