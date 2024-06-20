const getNames = nodes => {
  return [].concat(nodes).filter(x => x && x.name).map(x => x.name.parts.join('.'));
}

module.exports = getNames;