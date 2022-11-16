import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import pathsComponentsLoop from './helpers/paths-components-loop.mjs';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const pathIndexTs = path.resolve(dirname, '..', 'index.ts');

const addLines = (pathComponent, imports, exports) => {
  const componentName = pathComponent.replace(/.*\/(Ui.+)\.vue/, '$1');
  const importLine = `import ${componentName} from './src/components/${pathComponent}';`;
  imports.push(importLine);
  const exportLine = `  ${componentName}`;
  exports.push(exportLine);
};
function generateContent() {
  const importsLines = [];
  const exportsLines = [];
  pathsComponentsLoop((pathComponent) => addLines(pathComponent, importsLines, exportsLines), false);
  const contentIndexTs = `// Auto-generated file by create-index.js. Do not edit manually\n${
    importsLines.join('\n')
  }\n\n`
    + `export {\n${
      exportsLines.join(',\n')
    },\n};\n`;
  return contentIndexTs;
}
function saveIndexTs(contentIndex) {
  fs.writeFileSync(pathIndexTs, contentIndex);
}
function createIndexTs() {
  saveIndexTs(generateContent());
  console.log('🚀 index.ts created successfully');
}

export default createIndexTs;

if (process.argv[1] === filename) {
  createIndexTs();
}
