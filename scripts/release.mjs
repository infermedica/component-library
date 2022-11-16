/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import path from 'path';
import prompts from 'prompts';
import { fileURLToPath } from 'url';
import checkComponentApi from './check-components-api.mjs';
import getArgs from './helpers/get-args.mjs';
import getVersion from './helpers/get-version.mjs';
import updateComponentsApi from './update-components-api.mjs';
import createReleaseNotes from './create-release-notes.mjs';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const args = getArgs();
const pathReleasesRoot = path.resolve(dirname, '../', 'docs/releases');
(async () => {
  const choices = [
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
  const newVersion = getVersion(choices[choiceIndex]).new;
  const [
    major,
    minor,
  ] = newVersion.split('.');
  const pathNewRelease = `v${major}.${minor}.x/v${newVersion}`;
  const pathReleaseRoot = `${pathReleasesRoot}/${pathNewRelease}`;
  fs.mkdirSync(pathReleaseRoot, { recursive: true });
  updateComponentsApi();
  await checkComponentApi('main', `docs/releases/${pathNewRelease}/components-api-lock.json`, null, true);
  createReleaseNotes(pathNewRelease);
})();
