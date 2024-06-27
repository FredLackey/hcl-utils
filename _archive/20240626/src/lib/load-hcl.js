const _ = require('cleaner-node');
const loadHclFile = require('../utils/load-hcl-file');

const loadHcl = filePath => {
  if (!_.isValidString(filePath)) {
    throw new Error('File path required');
  }
  if (!_.isFile(filePath)) {
    throw new Error('File path does not exist');
  }
  try {
    return loadHclFile(filePath);
  } catch (ex) {
    throw new Error(`Error loading HCL file: ${ex.message}`);
  }
}

module.exports = loadHcl;