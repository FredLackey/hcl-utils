import isValidArray from "../is-valid-array.mjs";
import isValidString from "../is-valid-string.mjs";

const BEGIN = '/*';
const END   = '*/';

export const getCommentPositions = (lines) => {

  if (!isValidArray(lines)) {
    return [];
  }

  const comments = [];
  let   comment  = null;

  for (let i = 0; i < lines.length; i++) {

    const line = lines[i].trim();
    
    if (!comment && line.startsWith(BEGIN)) {
      comment = {
        start: i,
        end  : -1,
        lines: [ lines[i] ],
      };
      comments.push(comment);
      continue;
    }

    if (comment) {
      comment.lines.push(lines[i]);
    }

    if (comment && line.endsWith(END)) {
      comment.end = i;
      comment     = null;
      continue;
    }
  }

  const unclosed = comments.find(x => x.end < 0);
  if (unclosed) {
    unclosed.end = lines.length - 1;
  }

  return comments;
}
export const hasComments = (lines) => {
  const positions = getCommentPositions(lines);
  return positions.length > 0;
}
export const removeComments = (lines) => {

  const positions = getCommentPositions(lines);
  const newLines  = [];

  for (let i = 0; i < lines.length; i++) {
    if (positions.some(x => x.start >= i && x.end <= i)) {
      continue;
    }
    newLines.push(lines[i]);
  }

  return newLines;

};

export default {
  getCommentPositions,
  hasComments,
  removeComments,
}