/* eslint-disable import/no-extraneous-dependencies */
import {
  readFileSync,
  writeFileSync,
} from 'fs';
import {
  dirname,
  resolve,
} from 'path';
import { fileURLToPath } from 'url';
import getArgs from './helpers/get-args.mjs';
import getReleaseInfo from './helpers/get-release-info.mjs';
import updateComponentsApi from './update-components-api.mjs';
import createReleaseNotes from './create-release-notes.mjs';
import createReleaseMdx from './create-release-mdx.mjs';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const packageJsonPath = resolve(dirName, '../', 'package.json');
const updatePackageJson = (value) => {
  const packageJsonContent = JSON.parse(readFileSync(packageJsonPath));
  packageJsonContent.version = value;
  writeFileSync(packageJsonPath, JSON.stringify(packageJsonContent, null, 2));

  console.log('🚀 Version updated successfully.');
};
const release = async (type, withDocs) => {
  const {
    newVersion, releaseType,
  } = await getReleaseInfo(type, true);
  if (newVersion) {
    await updateComponentsApi();
    updatePackageJson(newVersion);
    createReleaseMdx(newVersion);
  }
  if (withDocs) await createReleaseNotes(releaseType);
};

export default release;

if (process.argv[1] === fileName) {
  const {
    releaseType, withDocs,
  } = getArgs();
  release(releaseType, withDocs);
}
