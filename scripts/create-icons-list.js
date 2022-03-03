/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');
const glob = require('glob');

const pathIconComponent = path.resolve(__dirname, '..', 'src/components/atoms/UiIcon');
const pathAssets = path.resolve(__dirname, '..', 'src/assets');
const pathIconsJS = path.resolve(__dirname, '..', pathIconComponent, 'icons.js');
const pathIconsRoot = path.resolve(__dirname, '..', pathAssets, 'icons');
const pathsIcons = glob.sync('*.svg', {
  cwd: pathIconsRoot,
});

function generateContent() {
  const icons = [];
  for (const pathIcon of pathsIcons) {
    const iconName = `'${pathIcon.replace(/\.svg/gm, '')}'`;
    icons.push(iconName);
  }
  const contentIconsJs = `// Auto-generated file by create-index.js. Do not edit manually\nexport default [\n  ${icons.join(',\n  ')},\n];\n`;

  return {
    contentIconsJs,
  };
}

function saveIconsJs(contentIcons) {
  fs.writeFileSync(pathIconsJS, contentIcons);
}

function createIconsJS() {
  const filesContent = generateContent();
  saveIconsJs(filesContent.contentIconsJs);
  console.log('🚀 icons.js created successfully');
}

module.exports = {
  createIconsJS,
};

if (require.main === module) {
  createIconsJS();
}
