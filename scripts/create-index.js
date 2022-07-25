/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');
const glob = require('glob');

const pathIndexTs = path.resolve(__dirname, '..', 'index.ts');
const pathComponentsRoot = path.resolve(__dirname, '..', 'src/components');
const pathsVueComponents = glob.sync('*/*/Ui*.vue', {
  cwd: pathComponentsRoot,
});
function generateContent() {
  const imports = [];
  const exports = [];
  for (const pathComponentVue of pathsVueComponents) {
    const componentName = pathComponentVue.replace(/.*\/(Ui.+)\.vue/, '$1');
    const importLine = `import ${componentName} from './src/components/${pathComponentVue}';`;
    imports.push(importLine);
    const exportLine = `  ${componentName}`;
    exports.push(exportLine);
  }
  const contentIndexTs = `// Auto-generated file by create-index.js. Do not edit manually\n${
    imports.join('\n')
  }\n\n`
    + `export {\n${
      exports.join(',\n')
    },\n};\n`;
  return {
    contentIndexTs,
  };
}
function saveIndexTs(contentIndex) {
  fs.writeFileSync(pathIndexTs, contentIndex);
}
function createIndexTs() {
  const filesContent = generateContent();
  saveIndexTs(filesContent.contentIndexTs);
  console.log('🚀 index.ts created successfully');
}
module.exports = {
  createIndexTs,
};
if (require.main === module) {
  createIndexTs();
}
