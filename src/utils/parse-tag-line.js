const _ = require('cleaner-node');

const parseTagLine = line => {
 
  const parts = line.split('=');
  if (parts.length < 2) {
    return null;
  }

  const key = _.unquote(parts[0].trim());

  parts.shift();

  const raw    = parts.join('=').trim();
  const value  = _.unquote(raw);
  const quoted = raw !== value;

  return {
    key,
    value,
    quoted
  };

};

module.exports = parseTagLine;