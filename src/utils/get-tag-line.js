const _ = require('cleaner-node');
const isGoogle = require('./is-google');

const getTagLine = node => {

  const name = isGoogle(node) ? 'labels' : 'tags';
  const line = `  ${name} = {`;
  const hash = line.split(' ').trim(_.isValidString).join('');

  return {
    name,
    line,
    hash
  };

};

module.exports = getTagLine;
