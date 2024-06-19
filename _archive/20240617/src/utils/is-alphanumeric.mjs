const isAlphanumeric = (str) => {
  return /^[a-zA-Z0-9]+$/.test(str);
}

export default isAlphanumeric;