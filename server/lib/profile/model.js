var log = require('bunyan').createLogger({name: 'profile'});

function model(db) {
  if (!(this instanceof model)) {
    return new model(db);
  }

  this.db = db;
}

model.prototype.find = function (username, cb) {
  this.db.users.findOne({username: username}, cb);
};

model.prototype.get = function (id, cb) {
  this.db.users.find(id, cb);
};

model.prototype.drop = function (id, cb) {
  this.db.users.destroy({id: id}, cb);
};

model.prototype.create = function (data, cb) {

};

model.prototype.update = function (data, cb) {

};

module.exports = model;
