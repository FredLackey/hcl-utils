const cleanDirs         = require('./clean-dirs');
const findSourceFiles   = require('./find-source-files');
const setDefaults       = require('./set-defaults');
const unknowns          = require('./unknowns');
const validate          = require('./validate');
const verifyFormats     = require('./verify-formats');

module.exports = {
  cleanDirs,
  findSourceFiles,
  setDefaults,
  unknowns,
  validate,
  verifyFormats
};
