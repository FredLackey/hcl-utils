const isResourceMatch = (line, query) => {

  const trimmedLine = line.trim();

  if (trimmedLine.startsWith('resource ')) {
    
    const [, type, name] = trimmedLine.match(/resource\s+"([^"]+)"\s+"([^"]+)"/) || [];
    if (type && name) {
      return query === "*" || query === type || query === `${type}.${name}`;
    }
  }

  return false;
};

module.exports = isResourceMatch;