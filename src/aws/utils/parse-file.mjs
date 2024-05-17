import * as _ from 'cleaner-node';
import isTaggable from '../helpers/is-taggable.mjs';
import isMissingTags from '../helpers/is-missing-tags.mjs';
import hasUidTag from '../helpers/has-uid-tag.mjs';
import isMissingUidTag from '../helpers/is-missing-uid-tag.mjs';
import isHclFile from '../helpers/is-hcl-file.mjs';
import deQuote from '../helpers/de-quote.mjs';
import getNodeName from '../helpers/get-node-name.mjs';
import { UID_TAG_NAME } from '../data/defaults.mjs';

const parseFile = async (filePath, tagName = UID_TAG_NAME) => {

  if (!isHclFile(filePath)) {
    throw new Error('Invalid HCL file');
  }

  const done  = [];
  const lines = await _.readLines(filePath);
  const nodes = [];
  const stack = [];
  let   pos   = 0;

  let node = null;

  lines.forEach(rawLine => {

    pos += 1;
    done.push(rawLine);

    const line = rawLine.trim();

    if (node) {
      node.lines.push(rawLine);
      if (node.inTags) {
        node.tags.push(rawLine);
      }
      if (node.inTagsAll) {
        node.tagsAll.push(rawLine);
      }
    }

    if (line.endsWith('{') && !_.isAlpha(line.charAt(0))) {
      throw new Error('Invalid object node');
    }
    if (line.endsWith('{') && line.startsWith('tags_all')) {
      if (!node) {
        console.log('no node at line:', pos);
        throw new Error('Invalid tags_all');
      }
      node.inTagsAll = true;
      node.tagsAll.push(rawLine);
      return;
    }
    if (line.endsWith('{') && line.startsWith('tags')) {
      if (!node) {
        console.log('no node at line:', pos);
        throw new Error('Invalid tags');
      }
      node.inTags = true;
      node.tags.push(rawLine);
      return;
    }
 
    if (line.endsWith('{')) {

      const parts = _.removeSuffix(line, '{').split(' ').filter(x => (_.isValidString(x) && x.trim() !== '=')).map(x => deQuote(x));
      const name  = getNodeName(stack, parts);

      node = {
        
        index: nodes.length,
        parts,

        name,
        nameHash: _.hashString(name).toUpperCase(),

        lines   : [rawLine],
        lineHash: null,

        tags  : [],
        inTags: false,

        tagsAll  : [],
        inTagsAll: false
        
      }
      nodes.push(node);
      stack.push(node);

      return;
    }

    if (line === '}') {

      if (!node) {
        throw new Error('Invalid closing bracket');
      }      

      if (node.inTags) {
        node.inTags = false;
        return;
      }
      if (node.inTagsAll) {
        node.inTagsAll = false;
        return;
      }

      stack.pop();
      
      node = stack.length === 0
        ? null
        : stack[stack.length - 1];

      return;
    }

  });

  nodes.forEach(node => {

    Reflect.deleteProperty(node, 'inTags');
    Reflect.deleteProperty(node, 'inTagsAll');
  
    node.lineHash = _.hashLines(node.lines);
  })

  const data = {
    path: filePath,
    nodes,
    lines,
    taggable     : nodes.filter(x => isTaggable(x)),
    missingTags  : nodes.filter(x => isMissingTags(x)),
    hasUidTag    : nodes.filter(x => hasUidTag(x, tagName)),
    missingUidTag: nodes.filter(x => isMissingUidTag(x, tagName)),
    outputs      : nodes.filter(x => x.parts[0] === 'output'),
  }

  return data;

}

export default parseFile;