function managerEntries(entry = []) {
  return [
    ...entry,
    require.resolve('./register.js'),
  ];
}

module.exports = { managerEntries };
