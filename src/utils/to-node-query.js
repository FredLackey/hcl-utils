const _ = require('cleaner-node');
const isValidNodeQuery = require('./is-valid-node-query');
  
// Node Query is required.
const toNodeQuery = value => {
  if (!isValidNodeQuery(value)) {
    return null;
  }

  const [tType, pType, pName] = value.split('.');

  return {
    tType: _.isValidString(tType) ? tType : '*',
    pType: _.isValidString(pType) ? pType : '*',
    pName: _.isValidString(pName) ? pName : '*',
  };
};

module.exports = toNodeQuery;



