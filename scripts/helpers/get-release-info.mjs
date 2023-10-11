/* eslint-disable import/no-extraneous-dependencies */
import { readFileSync } from 'fs';
import {
  dirname,
  resolve,
} from 'path';
import prompts from 'prompts';
import { fileURLToPath } from 'url';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const packageJsonPath = resolve(dirName, '../../', 'package.json');
const { version: currentVersion } = JSON.parse(readFileSync(packageJsonPath));

const setReleaseType = async () => {
  const choices = [
    'major',
    'minor',
    'patch',
  ];
  const { selected } = (await prompts([ {
    type: 'select',
    name: 'selected',
    message: 'What type of release do you want to create?',
    choices,
  } ]));
  return choices[selected];
};
const getReleaseInfo = async (releaseType) => {
  const releaseTypes = [
    'major',
    'minor',
    'patch',
  ];
  const selected = releaseType || await setReleaseType();
  const typeIndex = releaseTypes.indexOf(selected);
  const newVersion = typeIndex > -1 ? currentVersion.split('.').map(
    (value, index) => {
      if (index === typeIndex) return parseInt(value, 10) + 1;
      if (index > typeIndex) return 0;
      return value;
    },
  ).join('.') : '';

  return {
    currentVersion,
    newVersion,
    releaseType: selected,
  };
};

export default getReleaseInfo;
