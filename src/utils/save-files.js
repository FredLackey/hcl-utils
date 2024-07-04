const _ = require('cleaner-node');

const saveFiles = async (data, files) => {

  const hasErrors = files.some(x => x.error);
  if (hasErrors) {
    data.error = 'Errors detected in files.';
    return false;
  }

  for (let i = 0; i < files.length; i += 1) {
    
    const file = files[i];
    
    if (!_.writeLines(file.path, file.lines.clean)) {
      file.error = 'Could not write file.';
      continue;
    }

    file.saved = data.session;

  }

  return !files.some(x => x.error);

};

module.exports = saveFiles;
