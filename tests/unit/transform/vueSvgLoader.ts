module.exports = {
  process(content: string) {
    return `module.exports = { template: '${content.replace(/\n/g, '')}' }`;
  },
};
