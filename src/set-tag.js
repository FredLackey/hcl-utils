const loadFiles = requijre('./load-files');
const findNodes = require('./find-nodes');

const setTag = async (path, nodeQuery, tagQuery, key, value) => {

  const data  = await loadFiles(path);

  data.files.filter(x => x?.nodes).forEach(file => {

    findNodes(file.nodes, nodeQuery, tagQuery).forEach(node => {

    });
  });

};