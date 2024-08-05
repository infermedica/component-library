/* eslint-disable import/no-extraneous-dependencies */
import util from 'util';
import child from 'child_process';
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
import createReleaseChangelog from './create-release-changelog.mjs';
import createIconsList from './create-icons-list.mjs';

const exec = util.promisify(child.exec);
const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const packageJsonPath = resolve(dirName, '../', 'package.json');
const updatePackageJson = (value) => {
  const packageJsonContent = JSON.parse(readFileSync(packageJsonPath));
  packageJsonContent.version = value;
  writeFileSync(packageJsonPath, JSON.stringify(packageJsonContent, null, 2));
  console.log('🚀 Version updated successfully.');
};

const createReleaseCommit = async (version) => {
  try {
    const { stdout } = await exec(`git add -A && git commit -m "v${ version }"`);
  } catch (e) {
    console.error(e);
  }
}

const release = async (type, withDocs) => {
  const {
    newVersion, releaseType,
  } = await getReleaseInfo(type, true);
  if (newVersion) {
    await createIconsList();
    await updateComponentsApi();
    await updatePackageJson(newVersion);
    await createReleaseChangelog(newVersion);
    await createReleaseCommit(newVersion);
  }
  if (withDocs) await createReleaseNotes(releaseType);
  process.exit();
};

export default release;

if (process.argv[1] === fileName) {
  const {
    releaseType, withDocs,
  } = getArgs();
  release(releaseType, withDocs);
}
