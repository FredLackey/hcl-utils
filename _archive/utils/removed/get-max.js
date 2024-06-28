const isNumber = require('./is-number');

const getMax = values => {
  let result = null;
  [].concat(values).filter(isNumber).forEach(x => {
    if (!isNumber(result) || result < x) {
      result = x;
    }
  });
  return result;
};

module.exports = getMax;
