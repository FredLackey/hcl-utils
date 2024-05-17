import * as _ from 'cleaner-node';

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

const getNodeName = (stack, node) => {

  const parent     = getParent(stack, node);
  const parentName = parent?.name || '';

  let   parts     = [...node.parts];
  const name      = parts.shift();
  const qualifier = parts.join('.');

  const itemName = qualifier ? `${name}(${qualifier})` : name;
  
  return [parentName, itemName].filter(x => _.isValidString(x)).join('.');
}

export default getNodeName;