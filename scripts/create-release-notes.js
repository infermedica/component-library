/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const prompts = require('prompts');
const fs = require('fs');
const getArgs = require('./helpers/get-args');
const checkComponentApi = require('./check-components-api');
const prevVersion = require('../package.json').version;

const args = getArgs();
const pathReleasesRoot = path.resolve(__dirname, '../', 'docs/releases');
const updatePackageJson = (value) => {
  const filePath = path.resolve(__dirname, '../package.json');
  const content = JSON.parse(fs.readFileSync(filePath), 'utf8');
  content.version = value;
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
  console.log('🚀 package.json file updated successfully.');
};

(async () => {
  const choices = [
    'major',
    'minor',
    'patch',
  ];
  let choiceIndex = choices.findIndex((el) => el === args.releaseType);
  if (choiceIndex < 0) {
    choiceIndex = (await prompts([ {
      type: 'select',
      name: 'selected',
      message: 'What type of release do you want to create?',
      choices,
    } ])).selected;
  }
  const [
    major,
    minor,
    patch,
  ] = prevVersion.split('.').map(
    (value, index) => {
      if (index === choiceIndex) return parseInt(value, 10) + 1;
      if (index > choiceIndex) return 0;
      return value;
    },
  );
  const newVersion = `${major}.${minor}.${patch}`;
  const pathNewVersion = `/v${major}.x.x/v${major}.${minor}.x/v${newVersion}`;
  const pathVersionRoot = `${pathReleasesRoot}${pathNewVersion}`;
  const getFilePath = (name) => `${pathVersionRoot}/${name}.stories.mdx`;
  const isFileExist = (name) => fs.existsSync(getFilePath(name));
  const diffs = await checkComponentApi(`release/v${prevVersion}`, null, null, `${newVersion}`);
  const date = new Date();
  const content = {
    changelog: `import { Meta } from '@storybook/addon-docs';\n
<Meta title="Releases${pathNewVersion}/Changelog" />\n
# v${newVersion} (${date.toLocaleString('en', { month: 'long' })} ${date.getUTCDay()},${date.getUTCFullYear()})\n
## ⛔️ Breaking Changes\n
## 🚀 Features\n
## 🧹 Refactor\n
## 🐛 Fixes\n
## 🧹 Chores\n
## 📄 Docs\n`,
    'migration-guide': `import { Meta } from "@storybook/addon-docs";
import { PageOutline } from '../../../../components/PageOutline';
import { ComponentsApiSection } from '../../../../components/ComponentsApiSection';
import { release } from '../../../../../components-api-lock.json';\n
<Meta title="Releases${pathNewVersion}/Migration Guide"/>\n
# Migration Guide\n
<PageOutline selectors="h2, h3"/>\n
<ComponentsApiSection diffs={release["v${newVersion}"]}/>`,
  };
  const createFile = (name) => {
    fs.appendFileSync(getFilePath(name), '');
    fs.writeFileSync(getFilePath(name), content[name]);
  };
  if (!isFileExist('changelog')) {
    fs.mkdirSync(pathVersionRoot, { recursive: true });
    createFile('changelog');
    console.log('🚀 Changelog created successfully.');
  }
  if (Object.keys(diffs).length) {
    createFile('migration-guide');
    console.log('🚀 Migration guide created successfully.');
  }
  updatePackageJson(newVersion);
})();
