import isValidArray from "../is-valid-array.mjs";
import isValidString from "../is-valid-string.mjs";

const QUOTES = [
  '"',
  "'",
];
const DELIMETERS = [
  '#',
  '//',
];

export const getCommentPosition = (line, delim, quote) => {

  const pos   = line.indexOf(delim);
  const last  = line.lastIndexOf(quote);
  const first = line.indexOf(quote);

  if (pos < 0) {
    return -1;
  }

  // No quotes
  if (first < 0 && last < 0) {
    return pos;
  }

  // Single quote instance cannot wrap delimeter
  if (first === last) { 
    return pos;
  }

  // Last quote is before the delimeter
  if (last < pos) {
    return pos;
  }

  return -1;

}

export const getCommentPositions = line => {

  const results = [];

  DELIMETERS.forEach(delim => {
    QUOTES.forEach(quote => {
      const pos = getCommentPosition(line, delim, quote);
      if (pos >= 0) {
        results.push({
          delim,
          quote,
          pos,
          value: line.substring(pos),
        });
      }
    });
  })

  return results;

}

export const hasComments = lineOrLines => {
  const lines = [].concat(lineOrLines);
  for (let i = 0; i < lines.length; i++) {
    const positions = getCommentPositions(lines[i]);
    if (positions.length > 0) {
      return true;
    }
  }
  return false;
}

export const removeComments = lineOrLines => {
  const lines = [].concat(lineOrLines);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const positions = getCommentPositions(line);
    if (positions.length === 0) {
      continue;
    }
    positions.sort((a, b) => a.pos - b.pos);
    lines[i].substring(0, positions[0].pos);
  }
  return isValidArray(lineOrLines, true) ? lines : lines[0];
} 

export default {
  getCommentPosition,
  getCommentPositions,
  hasComments,
  removeComments
};