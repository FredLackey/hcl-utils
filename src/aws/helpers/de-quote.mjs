import * as _ from 'cleaner-node';

const deQuote = value => {
  if (_.isValidString(value) && value.startsWith('"') && value.endsWith('"') && value.length >= 3) {
    let result = value.substring(1);
    result = result.substring(0, result.length - 1);
    return result;
  }

  return value;
}

export default deQuote;