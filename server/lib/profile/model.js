var log = require('bunyan').createLogger({name: 'profile'});
var hash = require('../hasher');

function _passToPromise (resolve, reject) {
  return (err, value) => {
    if (err) { reject(err); }
    resolve(value);
  };
}

function Model (db) {
  if (!(this instanceof Model)) {
    return new Model(db);
  }

  this.db = db;
}

Model.prototype.all = function () {
  return new Promise((resolve, reject) => {
    this.db.users_all(_passToPromise(resolve, reject));
  });
};

Model.prototype.find = function (username) {
  return new Promise((resolve, reject) => {
    this.db.users.findOne({username: username}, _passToPromise(resolve, reject));
  });
};

Model.prototype.get = function (id) {
  return new Promise((resolve, reject) => {
    this.db.users.find(id, _passToPromise(resolve, reject));
  });
};

// Model.prototype.drop = function (id) {
//   log.info('drop called');
//   return new Promise((resolve, reject) => {
//     log.info('drop promise started');
//     this.db.users.destroy({id: id}, _passToPromise(resolve, reject));
//   });
// };

Model.prototype.create = function (data) {
  log.info(`creating user ${data.username}`);
  var password = data.password;
  delete data['password'];
  data.password_hash = hash.getHash(password);
  return new Promise((resolve, reject) => {
    this.db.users.save(data, _passToPromise(resolve, reject));
  });
};

// Model.prototype.update = function (id, data) {
//   var updateRecord = {
//     id: id
//   };
//   if (data.username) {
//     updateRecord.username = data.username
//   }
//   if (data.password) {
//     // updateRecord.password_hash = ""; // TODO: generate password hash
//   }
//   return new Promise((resolve, reject) => {
//     this.db.users.save(updateRecord, _passToPromise(resolve, reject));
//   });
// };

module.exports = Model;
