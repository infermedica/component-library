/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');
const pathsComponentsLoop = require('./helpers/paths-components-loop');

const pathIndexTs = path.resolve(__dirname, '..', 'index.ts');
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
module.exports = {
  createIndexTs,
};
if (require.main === module) {
  createIndexTs();
}
