const getNewLines = data => {

  const lines = [];
  data.nodes.forEach(node => {
    if (lines.length > 0) {
      lines.push('');
    }
    lines.push(...node.lines);
  });

  return lines;

}

export default getNewLines;