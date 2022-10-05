/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const glob = require('glob');

const pathComponentsRoot = path.resolve(__dirname, '../../', 'src/components');
const pathsVueComponents = glob.sync('*/*/Ui*.vue', {
  cwd: pathComponentsRoot,
});
const pathsVueInternalComponents = glob.sync('*/*/_internal/{Ui*.vue,*/Ui*.vue}', {
  cwd: pathComponentsRoot,
});
const componentLoop = (callbacks, withInternals = true) => {
  const pathsComponents = withInternals ? [...pathsVueComponents, ...pathsVueInternalComponents] : pathsVueComponents;
  pathsComponents.forEach(((pathComponent) => {
    if (Array.isArray(callbacks)) {
      callbacks.forEach((callback) => {
        callback(pathComponent);
      });
      return;
    }
    callbacks(pathComponent);
  }));
};

module.exports = componentLoop;

if (require.main === module) {
  componentLoop();
}
