const copyContents    = require('./copy-contents');
const copyFile        = require('./copy-file');
const createPath      = require('./create-path');
const deleteFile      = require('./delete-file');
const getBlockDate    = require('./get-blockdate');
const getCommonPath   = require('./get-common-path');
const getDuration     = require('./get-duration');
const getFileSize     = require('./get-file-size');
const getMax          = require('./get-max');
const getMin          = require('./get-min');
const getPads         = require('./get-pads');
const getSubstring    = require('./get-substring');
const isAlpha         = require('./is-alpha');
const isAlphanumeric  = require('./is-alphanumeric');
const isBoolean       = require('./is-boolean');
const isDigits        = require('./is-digits');
const isDirectory     = require('./is-directory');
const isFile          = require('./is-file');
const isFolder        = require('./is-folder');
const isMatch         = require('./is-match');
const isNumber        = require('./is-number');
const isSet           = require('./is-set');
const isValidArray    = require('./is-valid-array');
const isValidPath     = require('./is-valid-path');
const isValidString   = require('./is-valid-string');
const makePath        = require('./make-path');
const moveFile        = require('./move-file');
const print           = require('./print');
const readLines       = require('./read-lines');
const toKebabCase     = require('./to-kebab-case');
const toTable         = require('./to-table');
const trimArray       = require('./trim-array').trim;
const unique          = require('./unique');

module.exports = {
  copyContents,
  copyFile,
  createPath,
  deleteFile,
  getBlockDate,
  getCommonPath,
  getDuration,
  getFileSize,
  getMax,
  getMin,
  getPads,
  getSubstring,
  isAlpha,
  isAlphanumeric,
  ...isBoolean,
  isDigits,
  isDirectory,
  isFile,
  isFolder,
  isMatch,
  isNumber,
  isSet,
  ...isValidArray,
  ...isValidPath,
  ...isValidString,
  makePath,
  moveFile,
  print,
  readLines,
  toKebabCase,
  toTable,
  trimArray,
  unique
};
