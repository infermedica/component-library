/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import vueDocs from 'vue-docgen-api';
import pathsComponentsLoop from './helpers/paths-components-loop.mjs';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const pathComponentsRoot = path.resolve(dirname, '../', 'src/components');
const pathComponentsApiFile = path.resolve(dirname, '../components-api-lock.json');

const getComponentsApi = async () => {
  const promises = [];
  pathsComponentsLoop((componentPath) => {
    promises.push(vueDocs.parse(`${pathComponentsRoot}/${componentPath}`));
  });
  const componentsApi = await Promise.all(promises);
  return componentsApi;
};
function saveComponentsApiFile(componentsApi) {
  if (!fs.existsSync(pathComponentsApiFile)) {
    fs.appendFileSync(pathComponentsApiFile, '');
  }
  const content = JSON.parse(fs.readFileSync(pathComponentsApiFile, 'utf8') || '{}');
  content['components-api'] = componentsApi;
  fs.writeFileSync(pathComponentsApiFile, JSON.stringify(content, null, 2));
}
async function createComponentsApiFile() {
  saveComponentsApiFile(await getComponentsApi());
  console.log('📄 docs updated successfully');
}

export default getComponentsApi;

if (process.argv[1] === filename) {
  createComponentsApiFile();
}
