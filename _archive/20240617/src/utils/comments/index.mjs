import multiLine from "./multi-line.mjs";
import singleLine from "./single-line.mjs";
import isValidArray from "../is-valid-array.mjs";

export const hasComments = (lineOrLines) => {
  return singleLine.hasComments(lineOrLines) || multiLine.hasComments(lineOrLines);
};
export const removeComments = (lineOrLines) => {

  if (!isValidArray(lineOrLines)) {
    return singleLine.removeComments(lineOrLines);
  }

  let newLines = lines;
      newLines = singleLine.removeComments(newLines);
      newLines = multiLine.removeComments(newLines);
  return newLines;
};

export default {
  multiLine,
  singleLine,

  hasComments,
  removeComments,
};