const _ = require('cleaner-node')

const isTaggable = require('./is-taggable')
const isGoogle = require('./is-google')

const validate = p => {
  if (!_.isObject(p.doc)) {
    return 'Invalid doc'
  }
  if (!_.isValidString(p.query)) {
    return 'Invalid query'
  }
  if (!_.isValidString(p.key)) {
    return 'Invalid key'
  }
  if (isGoogle(p.doc) && _.isValidString(p.value)) {
    return 'Google does not allow tag values'
  }
  if (!isGoogle(p.doc) && !_.isValidString(p.value)) {
    return 'Invalid value'
  }
  return null;
}
const setTag = (doc, query, key, value) => {

  const err = validate({ doc, query, key, value })
  if (err) { 
    throw new Error(err)
  }

  const nodes = _.findNodes(doc, query);
  if (nodes.length === 0) {
    return;
  }

  const unTaggable = nodes.filter(x => !isTaggable(x));
  if (unTaggable.length > 0 && nodes.length === unTaggable.length) {
    throw new Error('Selected nodes are not taggable')
  }
  if (unTaggable.length > 0 && nodes.length === 1) {
    throw new Error('The selected node is not taggable')
  }
  if (unTaggable.length > 0) {
    throw new Error('Some selected nodes are not taggable')
  }

}