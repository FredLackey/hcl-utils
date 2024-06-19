const QUOTES = ['"', "'"];

const dequote = value => {
  let result = value.trim();
  QUOTES.forEach(quote => {
    if (result.startsWith(quote) && result.endsWith(quote)) {
      result = result.slice(1, -1).trim();
    }
  });
  return (value.trim() === result) ? value : result;
}

export default dequote;