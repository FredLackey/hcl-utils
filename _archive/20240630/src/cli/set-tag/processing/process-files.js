const _     = require('cleaner-node');
const path  = require('path');

const toConsole = (opts, message) => {
  if (!opts.console) { return; }
  console.info(message);
};

const processFolder = (opts) => {

  let limitReached = false;
  opts._counts = [];

  opts._files.forEach(file => {
    
    if (opts.limit > 0 && opts.count >= opts.limit) {
      if (!limitReached) { 
        toConsole(opts, `File limit reached ${opts.limit}.  Stopping...`);
        limitReached = true;
      }
      return;
    }

    const filePath = path.parse(file);
    if (!opts.allowBlank && (!filePath.ext || !_.isValidString(filePath.ext))) {
      return;
    }

    const existing = opts._counts.find(x => (x &&
      (
        (x.ext.trim() === filePath.ext.trim()) ||
        (!opts.caseSensitive && x.ext.trim().toLowerCase() === filePath.ext.trim().toLowerCase())
      )));

    if (existing) {
      existing.count += 1;
      return;
    }

    toConsole(opts, `> Found: ${filePath.ext}`);
    opts._counts.push({
      count : 1,
      ext   : filePath.ext
    });

  });
  
  return [];
};

module.exports = processFolder;
