const _ = require("cleaner-node");
const hashLine = require("./hash-line");
const calculateHashes = require("./calculate-hashes");
const findNodes = require("./find-nodes");

const DEFAULT_INDENT = "";

const validate = (p) => {
  if (!_.isObject(p.doc)) {
    return "Invalid doc";
  }
  if (!_.isValidString(p.query)) {
    return "Invalid query";
  }
  if (!_.isValidString(p.key) || !_.isValidString(_.unquote(p.key))) {
    return "Invalid key";
  }
  return null;
};
const clearTag = ({ docOrNodeOrNodes, query, key }) => {
  const err = validate({ doc, query, key });
  if (err) {
    throw new Error(err);
  }

  const nodes = findNodes(docOrNodeOrNodes, query);
  if (nodes.length === 0) {
    return;
  }

  nodes.forEach((node) => {
    node.tagLines = node.tagLines.filter(
      (x) => x && hashLine(x).startsWith(`"${key}"=`)
    );
    calculateHashes(node);
  });
};

module.exports = clearTag;
