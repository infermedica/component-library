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

const addLines = (pathComponent, componentLines, typeLines) => {
  const componentName = pathComponent.replace(/.*\/(Ui.+)\.vue/, '$1');
  const typeLine = `export * from './src/components/${pathComponent}';`;
  const componentLine = `export { default as ${componentName} } from './src/components/${pathComponent}';`;
  typeLines.push(typeLine);
  componentLines.push(componentLine);
};
function generateContent() {
  const componentLines = [];
  const componentTypeLines = [];
  pathsComponentsLoop((pathComponent) => addLines(pathComponent, componentLines, componentTypeLines), false);
  const contentIndexTs = `// Auto-generated file by create-index.js. Do not edit manually\n
// types
export * from './src/types';\n
// component types
${componentTypeLines.join('\n')}\n
// components
${componentLines.join('\n')}\n\n`;
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
