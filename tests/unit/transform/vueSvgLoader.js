module.exports = {
  process(content) {
    return `module.exports = { template: '${content.replace(/\n/g, '')}' }`;
  },
};
