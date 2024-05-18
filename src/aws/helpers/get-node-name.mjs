import _ from 'cleaner-node';

const getParent = (stack, node) => {
  if (stack.length === 0) {
    return null;
  }
  if (stack.length === 1) {
    if (stack[0] === node) {
      return null;
    }
    return stack[0];
  }
  const lastItem = stack[stack.length - 1];
  return (lastItem === node)
    ? stack[stack.length - 2]
    : lastItem;
}

const getNodeName = (stack, nodeOrNameParts) => {

  const isNode = _.isObject(nodeOrNameParts);

  const parent = isNode 
    ? getParent(stack, nodeOrNameParts) 
    : (stack.length > 0)
      ? stack[stack.length - 1]
      : null;

  const parentName = parent?.name || '';

  let parts = isNode ? nodeOrNameParts.parts : nodeOrNameParts;

  let name = parts.shift();

  const qualifier = parts.join('.');
  
  const itemName = qualifier ? `${name}(${qualifier})` : name;
  
  return [parentName, itemName].filter(x => _.isValidString(x)).join('.');





}

export default getNodeName;