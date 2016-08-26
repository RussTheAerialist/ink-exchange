require('dotenv').config();
var db = require('../lib/db');
var hasher = require('../lib/hasher');
var log = require('bunyan').createLogger({name: 'create_database'});
var passToPromise = require('../lib/utils').passToPromise;

function users() {
  return new Promise((resolve, reject) => {
    log.info('create users');
    db.users_create_schema(passToPromise(resolve, reject));
  });
}

function inks() {
  return new Promise((resolve, reject) => {
    log.info('create inks');
    db.inks_create_schema(passToPromise(resolve, reject));
  });
}

function requests() {
  return new Promise((resolve, reject) => {
    log.info('create inks');
    db.requests_create_schema(passToPromise(resolve, reject));
  });
}

function finish() {
  db.end();
}

users()
  .then(inks)
  .then(requests)
  .then(finish).catch((err) => {
    log.error(err);
    db.end();
  });
