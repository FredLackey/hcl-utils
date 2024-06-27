const validateOpts = (opts) => {
  if (!isValidObject(opts)) {
    throw new Error('Opts required');
  }
  return opts;
}

module.exports = validateOpts;
