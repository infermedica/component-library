/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import glob from 'glob';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const pathIconComponent = path.resolve(dirname, '..', 'src/components/atoms/UiIcon');
const pathAssets = path.resolve(dirname, '..', 'src/assets');
const pathIconsTS = path.resolve(dirname, '..', pathIconComponent, 'icons.ts');
const pathIconsRoot = path.resolve(dirname, '..', pathAssets, 'icons');
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

if (process.argv[1] === filename) {
  createIconsTs();
}
