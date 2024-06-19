import untaggable from '../data/untaggable.mjs';

const isUntaggable = node => {
  if (!node.name || !node.name.includes('(') || !node.name.includes(')')) {
    return false;
  }
  const pos = node.name.lastIndexOf('(');
  let name = node.name.substring(pos + 1);
  name = name.substring(0, name.indexOf(')'));
  const parts = name.split('.');
  return untaggable.PROVIDER_TYPES.includes(parts[0]);
}

export default isUntaggable;