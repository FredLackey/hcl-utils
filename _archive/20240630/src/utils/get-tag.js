const _ = require('cleaner-node');

const getTag = (node, tag) => {
  
  const values = [].concat(node.tagLines).filter(_.isValidString).find(line => {

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
      line,
      key,
      value,
      quoted
    };

  });

  const value = values.find(x => (x?.key === tag));

  return value;

};

module.exports = getTag;
