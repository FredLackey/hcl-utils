import isBaseResource from './is-base-resource.mjs';
import isUntaggable from './is-untaggable.mjs';

const isTaggable = node => {
  // TODO: Add more complete rules
  return !isUntaggable(node) && isBaseResource(node);
};

export default isTaggable;
