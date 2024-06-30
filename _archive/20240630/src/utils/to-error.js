const _ = require('cleaner-node');

const toError = (err) => {

  if (_.isObject(err)) {
    return err;
  }

  if (_.isValidArray(err)) {
    return {
      message: err.length >= 1 ? err[0] : 'Unknown error.',
      code   : err.length >= 1 ? err[1] : -1,
      data   : err.length >= 2 ? err[2] : null
    };
  }

  throw new Error('Error must be an array or object.');

};

module.exports = toError;
