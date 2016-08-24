var log = require('bunyan').createLogger({name: 'profile'});
var hash = require('../hasher');

function _pass_onto_promise(resolve, reject) {
  return (err, value) => {
    if (err) { reject(err); }
    resolve(value);
  }
}

function model(db) {
  if (!(this instanceof model)) {
    return new model(db);
  }

  this.db = db;
}

model.prototype.all = function () {
  return new Promise((resolve, reject) => {
    this.db.users_all(_pass_onto_promise(resolve, reject));
  });
}

model.prototype.find = function (username) {
  return new Promise((resolve, reject) => {
    this.db.users.findOne({username: username}, _pass_onto_promise(resolve, reject))
  });
};

model.prototype.get = function (id) {
  return new Promise((resolve, reject) => {
    this.db.users.find(id, _pass_onto_promise(resolve, reject));
  });

};

// model.prototype.drop = function (id) {
//   log.info('drop called');
//   return new Promise((resolve, reject) => {
//     log.info('drop promise started');
//     this.db.users.destroy({id: id}, _pass_onto_promise(resolve, reject));
//   });
// };

model.prototype.create = function (data) {
  log.info(`creating user ${data.username}`);
  var password = data.password;
  delete data['password'];
  data.password_hash = hash.getHash(password);
  return new Promise((resolve, reject) => {
    this.db.users.save(data, _pass_onto_promise(resolve, reject));
  });
};

// model.prototype.update = function (id, data) {
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
//     this.db.users.save(updateRecord, _pass_onto_promise(resolve, reject));
//   });
// };

module.exports = model;
