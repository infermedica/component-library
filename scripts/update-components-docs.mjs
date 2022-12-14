/* eslint-disable import/no-extraneous-dependencies */
import {
  resolve,
  dirname,
} from 'path';
import {
  fileURLToPath,
  pathToFileURL,
} from 'url';
import process from 'process';
import { readFileSync } from 'fs';
import fileSave from 'file-save';
import sass from 'sass';
import pathsComponentsLoop from './helpers/paths-components-loop.mjs';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const pathComponentsRoot = resolve(dirName, '../src/components');
const getAsKebabCase = (string) => string.replace(
  /([A-Z])(?=\w)/g,
  (s1, s2, index) => (index > 0 ? `-${s2.toLowerCase()}` : s2.toLowerCase()),
);
const getStyle = ({ component }) => {
  const matches = component.match(/<style lang="scss">([\s\S]*)<\/style>/, '$1');
  if (!matches) return '';
  return matches[1];
};
const getCompiledStyle = (style) => sass.compileString(style, {
  importers: [ {
    findFileUrl(url) {
      const index = url.indexOf('styles');
      return new URL(pathToFileURL(`./src/${url.slice(index, url.length)}`));
    },
  } ],
}).css;
const getCssProperties = (style, componentName) => {
  const regex = new RegExp(`:\\n*[\\s]*var\\([\\s]*--${componentName}-[\\s\\S]*?\\);`, 'g');
  const matches = style.match(regex);
  if (!matches) return {};
  return [ ...matches ].map((cssProperty) => cssProperty
    .replace(/\n(\s{2,})/g, '')
    .match(/:[\s]*var\([\s]*--([\s\S]+?)(,[\s]*([\s\S]+?))?\);/))
    .reduce((object, cssVar) => ({
      ...object,
      [`--${cssVar[1]}`]: cssVar[3],
    }), {});
};
const updateMeta = ({
  stories,
  cssProperties = {},
}) => {
  const indexStartMeta = stories.indexOf('export default');
  const indexNextConst = stories.indexOf(stories.match(/const [A-Z]/)[0]);
  const indexNextExport = stories.indexOf('export', indexStartMeta + 1);
  const indexEndMeta = indexNextConst < indexNextExport ? indexNextConst : indexNextExport;
  const meta = stories.slice(indexStartMeta, indexEndMeta).trim();
  const hasCssProperties = Object.keys(cssProperties).length;
  const metaHasParameters = meta.includes('parameters:');
  const metaHasCssProperties = meta.includes('cssProperties:');
  const regCssProperties = /cssProperties:\s*{([\s\S]*)(?=},\n)/;
  let updatedMeta;
  if (!metaHasParameters && hasCssProperties) {
    updatedMeta = `${meta.slice(0, -2)} parameters: { cssProperties: ${JSON.stringify(cssProperties)}}};`;
  } else if (metaHasCssProperties && !hasCssProperties) {
    updatedMeta = meta.replace(regCssProperties, '');
  } else if (metaHasCssProperties && hasCssProperties) {
    updatedMeta = meta.replace(regCssProperties, `cssProperties: ${JSON.stringify(cssProperties)},`);
  } else {
    updatedMeta = meta.replace(/(,|)\s*},\s(};)/, `, cssProperties: ${JSON.stringify(cssProperties)}}};`);
  }
  return stories.replace(meta, updatedMeta);
};
const updateCssProps = ({
  component,
  stories,
  componentNameKebabCase: componentName,
}) => {
  const style = getStyle({ component });
  const compiled = getCompiledStyle(style);
  const cssProperties = getCssProperties(compiled, componentName);
  const storiesToSave = updateMeta({
    stories,
    cssProperties,
  });
  return storiesToSave;
};
function updateComponentsDocs() {
  pathsComponentsLoop((pathComponentVue) => {
    const pathComponentStories = pathComponentVue.replace(/\.vue$/, '.stories.js');
    const componentName = pathComponentVue.replace(/.*\/(Ui(.+))\.vue/, '$2');
    const componentNameKebabCase = getAsKebabCase(componentName);
    const component = readFileSync(resolve(pathComponentsRoot, pathComponentVue), 'utf8');
    const stories = readFileSync(resolve(pathComponentsRoot, pathComponentStories), 'utf8');
    const storiesToSave = updateCssProps({
      component,
      stories,
      componentNameKebabCase,
    });
    fileSave(resolve(pathComponentsRoot, pathComponentStories))
      .write(storiesToSave, 'utf8');
  }, false);
  console.log('📄 docs updated successfully');
}
export default updateComponentsDocs;
if (process.argv[1] === fileName) {
  updateComponentsDocs();
}
