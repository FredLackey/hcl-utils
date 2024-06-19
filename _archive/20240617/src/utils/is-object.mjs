const isObject = (value) => {
  return (typeof value === 'object') && (value instanceof Object) && (value !== null);
}

export default isObject;