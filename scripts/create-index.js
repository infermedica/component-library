const path = require('path');
const fs = require('fs');
const glob = require('glob');

const pathIndexJs = path.resolve(__dirname, '..', 'index.js');
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
  const contentIndexJs = `// Auto-generated file by create-index.js. Do not edit manually\n${
      imports.join('\n')
    }\n\n`
    + `export {\n${
      exports.join(',\n')
    },\n};\n`;
  return {
    contentIndexJs,
  };
}
function createIndexJs() {
  const filesContent = generateContent();
  saveIndexJs(filesContent.contentIndexJs);
  console.log('🚀 index.js created successfully');
}
function saveIndexJs(contentIndex) {
  fs.writeFileSync(pathIndexJs, contentIndex);
}
module.exports = {
  createIndexJs,
};
if (require.main === module) {
  createIndexJs();
}
