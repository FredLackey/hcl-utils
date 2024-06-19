import isObject from "./is-object.mjs";

const isValidObject = (value) => {
  return isObject(value) && Object.keys(value).length > 0;
};

export default isValidObject;