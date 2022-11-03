const fs = require('fs');
const path = require('path');

const pathReleasesRoot = path.resolve(__dirname, '../../docs/releases');

const sortReleaseStories = () => {
  const getStoryOrder = () => fs.readdirSync(pathReleasesRoot)
    .reverse().reduce((majorList, major) => [
      ...majorList,
      major,
      fs.readdirSync(`${pathReleasesRoot}/${major}`)
        .reverse().reduce((minorList, minor) => [
          ...minorList,
          minor,
          fs.readdirSync(`${pathReleasesRoot}/${major}/${minor}`)
            .reverse().map((el) => el.replace('.stories.mdx', '')),
        ], []),
    ], []);

  const updatePreviewFile = () => {
    const filePath = path.resolve(__dirname, '../../.storybook/preview.js');
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const index = lines.findIndex((el) => el.includes('// auto-generated'));
    lines[index + 1] = `        ${JSON.stringify(getStoryOrder())},`;
    fs.writeFileSync(filePath, lines.join('\n'));
  };
  updatePreviewFile();
};

module.exports = sortReleaseStories;

if (require.main === module) {
  sortReleaseStories();
}
