require('dotenv').config();
var passwordHash = require('password-hash');
var passwordSaltLength = process.env.SALT_LENGTH || 8;
var passwordHashAlgo = process.env.HASH_ALGO || 'sha512';
var passwordIterations = process.env.HASH_ITERATIONS || 3;

var log = require('bunyan').createLogger({name: 'hash'});

module.exports = {
  getHash: (password) => {
    return passwordHash.generate(password, {
      algorithm: passwordHashAlgo,
      saltLength: passwordSaltLength,
      iterations: passwordIterations
    });
  },
  verifyPassword: (password, hash) => {
    log.info(passwordHash.verify(password, hash));
    return passwordHash.verify(password, hash);
  },
  generateApiKey: (username, timestamp) => {
    return "";
  }
};
