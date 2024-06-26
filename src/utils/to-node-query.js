const isValidNodeQuery = require('./is-valid-node-query');

// Node Query is required.
const toNodeQuery = value => {
  if (!isValidNodeQuery(value)) {
    return null;
  }

  const parts = value.split('.');
  
  return {
    tType: parts[0],
    pType: parts.length >= 1 ? parts[1]: '*',
    pName: parts.length >= 2 ? parts[2]: '*',
  }
};

module.exports = toNodeQuery;



