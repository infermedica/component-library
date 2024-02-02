/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import { glob } from 'glob';
import {
  dirname,
  resolve,
} from 'path';
import { fileURLToPath } from 'url';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const pathIconComponent = resolve(dirName, '..', 'src/components/atoms/UiIcon');
const pathAssets = resolve(dirName, '..', 'src/assets');
const pathIconsTS = resolve(dirName, '..', pathIconComponent, 'icons.ts');
const pathIconsRoot = resolve(dirName, '..', pathAssets, 'icons');
const pathsIcons = glob.sync('*.svg', { cwd: pathIconsRoot });

function generateContent() {
  const icons = pathsIcons.map((pathIcon) => `'${pathIcon.replace(/\.svg/gm, '')}'`);
  return `// Auto-generated file by create-index.js. Do not edit manually\nexport default [\n  ${icons.join(',\n  ')},\n] as const;\n`;
}
function saveIconsTs(contentIcons) {
  fs.writeFileSync(pathIconsTS, contentIcons);
}
function createIconsTs() {
  saveIconsTs(generateContent());
  console.log('🚀 icons.js created successfully');
}

export default createIconsTs;

if (process.argv[1] === fileName) {
  createIconsTs();
}
