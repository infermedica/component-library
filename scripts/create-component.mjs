/* eslint-disable import/no-extraneous-dependencies */
import {
  readdirSync,
  readFileSync,
} from 'fs';
import fileSave from 'file-save';
import glob from 'glob';
import prompts from 'prompts';
import {
  dirname,
  join,
  resolve,
} from 'path';
import upperCamelCase from 'uppercamelcase';
import { fileURLToPath } from 'url';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);

(async () => {
  const ATOMIC_TYPE = [
    'atoms',
    'molecules',
    'organisms',
  ];
  const response = await prompts([
    {
      type: 'select',
      name: 'component',
      message: 'What type of component do you want to create?',
      choices: ATOMIC_TYPE,
    },
    {
      type: 'text',
      name: 'name',
      message: 'Enter the name for the component',
    },
  ]);
  const component = ATOMIC_TYPE[response.component];
  const { name } = response;
  const fwFolder = './scripts/templates/component/';
  function createComponent(componentFolder, componentName) {
    const ComponentType = upperCamelCase(componentFolder);
    const ComponentName = upperCamelCase(componentName);
    const ComponentNameCamelCase = ComponentName.startsWith('Ui') ? ComponentName : `Ui${ComponentName}`;
    const PackagePath = resolve(dirName, `../src/components/${componentFolder}`, `${ComponentNameCamelCase}`);
    const ComponentNameKebabCase = `ui${ComponentName.replace(
      /([A-Z])(?=\w)/g,
      (s1, s2) => `-${s2.toLowerCase()}`,
    )}`;
    const req = glob.sync(`${PackagePath}/${ComponentNameCamelCase}.vue`);
    if (req.length) {
      console.warn(`🚨 ${ComponentNameCamelCase} component was already created.`);
      process.exit(-1);
    }
    readdirSync(fwFolder).forEach((file) => {
      const componentFileName = file.replace('component', ComponentNameCamelCase);
      let content = readFileSync(fwFolder + file, 'utf8');
      content = content.replace(/ComponentFolder/g, componentFolder);
      content = content.replace(/ComponentNameCamelCase/g, ComponentNameCamelCase);
      content = content.replace(/ComponentNameKebabCase/g, ComponentNameKebabCase);
      content = content.replace(/ComponentName/g, ComponentName);
      content = content.replace(/ComponentType/g, ComponentType);
      fileSave(join(PackagePath, componentFileName))
        .write(content, 'utf8');
    });
  }
  createComponent(component, name);
})();

process.on('exit', (code) => {
  if (code === 0) {
    console.log('🚀 New component created successfully.');
  }
});
