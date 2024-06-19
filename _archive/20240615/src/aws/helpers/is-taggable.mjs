import isResource from './is-resource.mjs';
import isUntaggable from './is-untaggable.mjs';

const isTaggable = node => {
  return !isUntaggable(node) && isResource(node);
};

export default isTaggable;
