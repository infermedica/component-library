import {
  readFileSync,
  readdirSync,
  appendFileSync,
  mkdirSync,
} from 'fs';
import {
  dirname,
  resolve,
} from 'path';
import { fileURLToPath } from 'url';
import updateComponentsApi from './update-components-api.mjs';
import getArgs from './helpers/get-args.mjs';
import getVersion from './helpers/get-release-info.mjs';
import compareComponentsApi from './check-components-api.mjs';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const releaseRootPath = resolve(dirName, '../', 'docs/releases');

const getReleaseFilePath = (releasePath, name) => `${releaseRootPath}/${releasePath}/${name}.stories.mdx`;
const createReleaseNotes = async (type, branchName = 'main') => {
  const { newVersion } = await getVersion(type);
  const [
    major,
    minor,
  ] = newVersion.split('.');
  const pathNewRelease = `v${major}.${minor}.x/v${newVersion}`;
  const pathReleaseRoot = `${releaseRootPath}/${pathNewRelease}`;
  mkdirSync(pathReleaseRoot, { recursive: true });
  updateComponentsApi();
  await compareComponentsApi(branchName, `docs/releases/${pathNewRelease}/components-api-lock.json`, true);
  const date = new Date().toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  });
  const releaseTitle = `${newVersion} (${date})`;
  const fwFolder = './scripts/templates/release-notes/';
  readdirSync(fwFolder).forEach((releaseFileName) => {
    let content = readFileSync(fwFolder + releaseFileName, 'utf8');
    content = content.replace(/ReleaseTitle/, releaseTitle);
    content = content.replace(/ReleasePath/, pathNewRelease);
    appendFileSync(getReleaseFilePath(pathNewRelease, releaseFileName), content);
    console.log(`🚀 ${releaseFileName.replace('.stories.mdx', '')} file created successfully.`);
  });
};

export default createReleaseNotes;

if (process.argv[1] === fileName) {
  const {
    branch, releaseType,
  } = getArgs();
  createReleaseNotes(releaseType, branch);
}
