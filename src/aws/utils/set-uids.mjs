import _ from 'cleaner-node';
import deQuote from '../helpers/de-quote.mjs';

const setUids = (data, uidTag) => {

  data.nodes.forEach(node => {

    if (_.isValidString(node[uidTag])) {
      return;
    }
    
    const tagLine = node.tags.find(x => x && x.trim().startsWith(`${uidTag} =`));
    if (!tagLine) {
      return;
    }

    const uid = deQuote(tagLine.split('=')[1].trim());
    if (_.isValidString(uid)) {
      node[uidTag] = uid;
    }

  });

};

export default setUids;