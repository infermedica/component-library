/* eslint-disable import/no-extraneous-dependencies */
import {
  appendFileSync,
  existsSync,
  readFileSync,
  writeFileSync,
} from 'fs';
import {
  dirname,
  resolve,
} from 'path';
import { fileURLToPath } from 'url';
import vueDocs from 'vue-docgen-api';
import pathsComponentsLoop from './helpers/paths-components-loop.mjs';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const pathComponentsRoot = resolve(dirName, '../', 'src/components');
const pathComponentsApiFile = resolve(dirName, '../components-api-lock.json');

const getComponentsApi = async () => {
  const promises = [];
  pathsComponentsLoop((componentPath) => {
    promises.push(vueDocs.parse(`${pathComponentsRoot}/${componentPath}`));
  });
  const componentsApi = await Promise.all(promises);
  return componentsApi;
};
function saveComponentsApiFile(componentsApi) {
  if (!existsSync(pathComponentsApiFile)) {
    appendFileSync(pathComponentsApiFile, '');
  }
  const content = JSON.parse(readFileSync(pathComponentsApiFile, 'utf8') || '{}');
  content['components-api'] = componentsApi;
  writeFileSync(pathComponentsApiFile, JSON.stringify(content, null, 2));
}
async function updateComponentsApiFile() {
  saveComponentsApiFile(await getComponentsApi());
  console.log('📄 docs updated successfully');
}

export default updateComponentsApiFile;

if (process.argv[1] === fileName) {
  updateComponentsApiFile();
}
