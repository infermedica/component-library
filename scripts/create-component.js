/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');
const fileSave = require('file-save');
const upperCamelCase = require('uppercamelcase');
const prompts = require('prompts');
const glob = require('glob');

(async () => {
  const ATOMIC_TYPE = ['atoms', 'molecules', 'organisms'];
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
  const fwFolder = './scripts/component-template/';
  function createComponent(componentFolder, componentName) {
    const ComponentType = upperCamelCase(componentFolder);
    const ComponentName = upperCamelCase(componentName);
    const ComponentNameCamelCase = ComponentName.startsWith('Ui') ? ComponentName : `Ui${ComponentName}`;
    const PackagePath = path.resolve(__dirname, `../src/components/${componentFolder}`, `${ComponentNameCamelCase}`);
    const ComponentNameKebabCase = `ui${ComponentName.replace(
      /([A-Z])(?=\w)/g,
      (s1, s2) => `-${s2.toLowerCase()}`,
    )}`;
    const req = glob.sync(`${PackagePath}/${ComponentNameCamelCase}.vue`);
    if (req.length) {
      console.warn(`🚨 ${ComponentNameCamelCase} component was already created.`);
      process.exit(-1);
    }
    fs.readdirSync(fwFolder).forEach((file) => {
      const fileName = file.replace('component', ComponentNameCamelCase);
      let content = fs.readFileSync(fwFolder + file, 'utf8');
      content = content.replace(/ComponentFolder/g, componentFolder);
      content = content.replace(/ComponentNameCamelCase/g, ComponentNameCamelCase);
      content = content.replace(/ComponentNameKebabCase/g, ComponentNameKebabCase);
      content = content.replace(/ComponentName/g, ComponentName);
      content = content.replace(/ComponentType/g, ComponentType);
      fileSave(path.join(PackagePath, fileName))
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
