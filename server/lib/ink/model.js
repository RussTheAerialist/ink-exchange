var log = require('bunyan').createLogger({name: 'ink'});
var hash = require('../hasher');
var passToPromise = require('../utils').passToPromise;

function getAllWith(func) {
  return new Promise((resolve, reject) => {
    func(passToPromise(resolve, reject));
  });
}

function Model (db) {
  if (!(this instanceof Model)) {
    return new Model(db);
  }

  this.db = db;
}

Model.prototype.getForUsername = function (username) {
  return new Promise((resolve, reject) => {
    this.db.users.findOne({username}, (err, user) => {
      if (err) {
        return reject(err);
      }

      this.db.inks_for_user(0 + user.id, passToPromise(resolve, reject));
    });
  });
};

Model.prototype.getAll = function (options) {
  var withExtendedProperties = options.extended || false;
  if (withExtendedProperties) {
    return getAllWith(this.db.inks_all_extended);
  } else {
    return getAllWith(this.db.inks_all);
  }
};

Model.prototype.create = function (data) {
  return new Promise((resolve, reject) => {
    this.db.inks.save(data, passToPromise(resolve, reject));
  });
};

module.exports = Model;
