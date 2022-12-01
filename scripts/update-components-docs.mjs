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
  if (!matches) return [];
  return [ ...matches ].map((cssProp) => cssProp
    .replace(/\n(\s{2,})/g, '')
    .match(/:[\s]*var\([\s]*--([\s\S]+?)(,[\s]*([\s\S]+?))?\);/))
    .reduce((object, cssVar) => ({
      ...object,
      [cssVar[1]]: {
        value: cssVar[3],
        control: 'text',
        description: '',
      },
    }), {});
};
const updateMeta = ({
  stories,
  cssProps = {},
}) => {
  const indexStartMeta = stories.indexOf('export default');
  const indexNextConst = stories.indexOf(stories.match(/const [A-Z]/)[0]);
  const indexNextExport = stories.indexOf('export', indexStartMeta + 1);
  const indexEndMeta = indexNextConst < indexNextExport ? indexNextConst : indexNextExport;
  const meta = stories.slice(indexStartMeta, indexEndMeta).trim();
  const hasCssProps = Object.keys(cssProps).length;
  const metaHasParameters = meta.includes('parameters:');
  const metaHasCssProps = meta.includes('cssprops:');
  const regCssProps = /cssprops:\s*{([\s\S]*)(?<=\n {6}},\n {4}},)/;
  let updatedMeta;
  if (!metaHasParameters && hasCssProps) {
    updatedMeta = `${meta.slice(0, -2)} parameters: { cssprops: ${JSON.stringify(cssProps)}}};`;
  } else if (metaHasCssProps && !hasCssProps) {
    updatedMeta = meta.replace(regCssProps, '');
  } else if (metaHasCssProps && hasCssProps) {
    updatedMeta = meta.replace(regCssProps, `cssprops: ${JSON.stringify(cssProps)},`);
  } else {
    updatedMeta = meta.replace(/(,|)\s*},\s(};)/, `, cssprops: ${JSON.stringify(cssProps)}}};`);
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
  const cssProps = getCssProperties(compiled, componentName);
  const storiesToSave = updateMeta({
    stories,
    cssProps,
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
