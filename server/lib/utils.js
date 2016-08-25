var log = require('bunyan').createLogger({name: 'ink'});

function passToPromise (resolve, reject) {
  return (err, value) => {
    log.info(err, value);
    if (err) { reject(err); }
    resolve(value);
  };
}

module.exports = {
  passToPromise
};
