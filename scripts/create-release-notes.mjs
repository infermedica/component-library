import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const pathReleasesRoot = path.resolve(dirname, '../', 'docs/releases');
const getFilePath = (releasePath, fileName) => `${pathReleasesRoot}/${releasePath}/${fileName}.stories.mdx`;
function createReleaseNotes(releasePath) {
  const date = new Date().toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  });
  const newVersion = releasePath.split('/')[1];
  const releaseTitle = `${newVersion} (${date})`;
  const fwFolder = './scripts/templates/release-notes/';
  fs.readdirSync(fwFolder).forEach((fileName) => {
    let content = fs.readFileSync(fwFolder + fileName, 'utf8');
    content = content.replace(/ReleaseTitle/, releaseTitle);
    content = content.replace(/ReleasePath/, releasePath);
    fs.appendFileSync(getFilePath(releasePath, fileName), content);
    console.log(`🚀 ${fileName.replace('.stories.mdx', '')} file created successfully.`);
  });
}

export default createReleaseNotes;
