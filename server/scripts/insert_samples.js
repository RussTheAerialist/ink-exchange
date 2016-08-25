require('dotenv').config();
var db = require('../lib/db');
var hasher = require('../lib/hasher');
var log = require('bunyan').createLogger({name: 'create_database'});
var passToPromise = require('../lib/utils').passToPromise;

function add_test_admin() {
  return new Promise((resolve, reject) => {
    log.info('inserting rhay admin');
    db.users.insert({
      id: 1,
      username: 'rhay',
      password_hash: hasher.getHash('test')
    }, (err, res) => {
      // Ignore Errors, it probably means we've already inserted it
      resolve(res);
    });
  });
}

function insert_sample_ink(name, image_url) {
  return () => {
    return new Promise((resolve, reject) => {
      db.inks.insert({
        name,
        image_url,
        owner_id: 1
      }, passToPromise(resolve, reject));
    });
  };
}

function finish() {
  db.end();
}

add_test_admin()
  .then(insert_sample_ink('Black Swan in Australian Rose', 'http://placehold.it/350x350'))
  .then(insert_sample_ink('El Lawrence', 'http://placehold.it/350x350'))
  .then(finish).catch((err) => {
    log.error(err);
    db.end();
  });
