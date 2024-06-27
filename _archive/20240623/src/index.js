const _ = require('cleaner-node');

const loadHcl = require('./utils/load-hcl');
const findFiles = require('./utils/find-files');
const findNodes = require('./utils/find-nodes');

const initResult = async (filePath) => {

  const result = {
    path : filePath,
    doc  : await loadHcl(filePath),
  };

  return result;
}

const handleArgs = async (argv) => {

  const files = findFiles(argv.path).filter(_.isValidString).map(initResult);

  for (let i = 0; i < files.length; i += 1) {

    const file   = files[i];
    const newDoc = _.copyObject(file.doc);

    const data = {
      docOrNodeOrNodes : file.doc,
      query            : argv.query,
      key              : argv.key,
      value            : argv.value,
      quote            : argv.quote,
    };

    switch (argv.action) {
      case 'clear':
        clearTag(data);
      case 'set':
      case 'find':
      default:
        break;
    }

  };
  

};


const clearTag = params => {
  if (!_.isValidObject(params)) {
    throw new Error('Params required');
  }
  return handleArgs({
    action: 'clear',
    ...params
  });
}
const findTag = params => {
  if (!_.isValidObject(params)) {
    throw new Error('Params required');
  }
  return handleArgs({
    action: 'find',
    ...params
  });
}
const setTag = params => {
  if (!_.isValidObject(params)) {
    throw new Error('Params required');
  }
  return handleArgs({
    action: 'set',
    ...params
  });
};

module.exports = {
  handleArgs,

  clearTag,
  findTag,
  setTag
};