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
      const content = readFileSync(fwFolder + file, 'utf8')
        .replace(/ComponentFolder/g, componentFolder)
        .replace(/ComponentNameCamelCase/g, ComponentNameCamelCase)
        .replace(/ComponentNameKebabCase/g, ComponentNameKebabCase)
        .replace(/ComponentName/g, ComponentName)
        .replace(/ComponentType/g, ComponentType);
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
