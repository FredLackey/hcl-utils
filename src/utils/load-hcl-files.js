const _ = require('cleaner-node');
const loadHclFile = require('./load-hcl-file');

const validate = (folderPath) => {
  if (!_.isValidString(folderPath)) {
    throw new Error('Folder path is required.');
  }
  return null;
};
const loadHclFiles = async (folderPath) => {

  const err = validate(folderPath);
  if (err) { return new Error(err); }

  const docs = _.getFiles(folderPath)
    .filter(x => (x && x.endsWith('.tf')))
    .map(file => loadHclFile(file))
    .filter(x => (x && x.path));

  return docs;
};

module.exports = loadHclFiles;