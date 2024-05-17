const isBaseResource = node => {

  let name = node.name || '';

  if (!name || !name.startsWith('resource(') || !name.includes(')')){ 
    return false; 
  }
  if (name.split('.').length !== 2) {
    return false;
  }

  name = name.substring('resource('.length);
  name = name.substring(0, name.indexOf(')'));

  const parts = name.split('.').filter(x => (_.isValidString(x)));

  return parts.length === 2;;
}

export default isBaseResource;