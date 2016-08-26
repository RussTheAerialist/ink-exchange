require('dotenv').config();
var db = require('../lib/db');
var hasher = require('../lib/hasher');
var log = require('bunyan').createLogger({name: 'create_database'});
var passToPromise = require('../lib/utils').passToPromise;

function users() {
  return new Promise((resolve, reject) => {
    log.info('drop users');
    db.users_drop_table(passToPromise(resolve, reject));
  });
}

function inks() {
  return new Promise((resolve, reject) => {
    log.info('drop inks');
    db.inks_drop_table(passToPromise(resolve, reject));
  });
}

function requests() {
  return new Promise((resolve, reject) => {
    log.info('drop inks');
    db.requests_drop_table(passToPromise(resolve, reject));
  });
}

function finish() {
  db.end();
}

requests()
  .then(inks())
  .then(users)
  .then(finish).catch((err) => {
    log.error(err);
    db.end();
  });
