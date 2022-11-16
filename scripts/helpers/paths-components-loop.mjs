/* eslint-disable import/no-extraneous-dependencies */
import glob from 'glob';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const pathComponentsRoot = path.resolve(dirname, '../../', 'src/components');
const pathsVueComponents = glob.sync('*/*/Ui*.vue', { cwd: pathComponentsRoot });
const pathsVueInternalComponents = glob.sync('*/*/_internal/{Ui*.vue,*/Ui*.vue}', { cwd: pathComponentsRoot });

const pathsComponentsLoop = (callbacks, withInternals = true) => {
  const pathsComponents = withInternals ? [
    ...pathsVueComponents,
    ...pathsVueInternalComponents,
  ] : pathsVueComponents;
  pathsComponents.forEach((pathComponent) => {
    if (Array.isArray(callbacks)) {
      callbacks.forEach((callback) => {
        callback(pathComponent);
      });
    }
    callbacks(pathComponent);
  });
};

export default pathsComponentsLoop;
