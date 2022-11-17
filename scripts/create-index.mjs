import { writeFileSync } from 'fs';
import {
  dirname,
  resolve,
} from 'path';
import { fileURLToPath } from 'url';
import pathsComponentsLoop from './helpers/paths-components-loop.mjs';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const pathIndexTs = resolve(dirName, '..', 'index.ts');

const addLines = (pathComponent, exportsLines) => {
  const componentName = pathComponent.replace(/.*\/(Ui.+)\.vue/, '$1');
  const exportLine = `export { default as ${componentName} } from './src/components/${pathComponent}';`;
  exportsLines.push(exportLine);
};
function generateContent() {
  const exportsLines = [];
  pathsComponentsLoop((pathComponent) => addLines(pathComponent, exportsLines), false);
  const contentIndexTs = `// Auto-generated file by create-index.js. Do not edit manually\n${
    exportsLines.join('\n')
  }\n\n`;
  return contentIndexTs;
}
function saveIndexTs(contentIndex) {
  writeFileSync(pathIndexTs, contentIndex);
}
function createIndexTs() {
  saveIndexTs(generateContent());
  console.log('🚀 index.ts created successfully');
}

export default createIndexTs;

if (process.argv[1] === fileName) {
  createIndexTs();
}
