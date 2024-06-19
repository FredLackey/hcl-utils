import isValidString from "../utils/is-valid-string.mjs";
import isAlphanumeric from "../utils/is-alphanumeric.mjs";

const isOneLiner = line => {
  if (!isValidString(line)) {
    return false;
  }
  const clean = line.split('').filter(x => x !== ' ').join('');
  return isValidString(clean) && isAlphanumeric(clean.split('')[0]) && clean.endsWith('{}');
}

export default isOneLiner;