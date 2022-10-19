/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');
const vueDocs = require('vue-docgen-api');
const pathsComponentsLoop = require('./helpers/paths-components-loop');

const pathComponentsRoot = path.resolve(__dirname, '../', 'src/components');
const pathComponentsApiFile = path.resolve(__dirname, '../components-api-lock.json');

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

module.exports = getComponentsApi;

if (require.main === module) {
  createComponentsApiFile();
}
