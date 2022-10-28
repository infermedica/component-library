/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const prompts = require('prompts');
const fs = require('fs');
const getArgs = require('./helpers/get-args');

const pathReleasesRoot = path.resolve(__dirname, '../', 'docs/releases');
const args = getArgs();
(async () => {
  const response = await prompts([ {
    type: 'text',
    name: 'versionNumber',
    message: 'Enter the version number (x.x.x)',
  } ]);
  const { versionNumber } = response;
  if (!versionNumber) {
    process.exit(1);
  }
  const version = `v${versionNumber}`;
  const getDiffs = () => {
    const pathDiffFile = `../${args.pathDiffFile || 'components-api-diffs.json'}`;
    const jsonPath = path.resolve(__dirname, pathDiffFile);
    const branch = args.branch || 'main';
    if (!fs.existsSync(jsonPath)) {
      fs.appendFileSync(jsonPath, '');
    }
    const diffs = JSON.parse(fs.readFileSync(jsonPath, 'utf8') || `{"${branch}-branch"}`)[`${branch}-branch`];
    return diffs;
  };
  const generateContent = () => {
    let content = `import { Meta } from "@storybook/addon-docs";
import { PageOutline } from '../../../components/PageOutline';
import { Table } from '../../../components/Table';\n
<Meta title="Releases/v${versionNumber.slice(0, -1)}x/${version}/Migration Guide"/>\n
# Migration Guide\n
<PageOutline selectors="h2, h3"/>\n
## Changes in the API of components`;
    const diffs = getDiffs();
    Object.keys(diffs).forEach((componentName) => {
      content += `\n### ${componentName}\n`;
      Object.keys(diffs[componentName]).forEach((apiEl) => {
        if (apiEl === 'component') {
          content += `Component is ${diffs[componentName][apiEl][0].type}\n`;
        } else {
          content += `\n#### ${apiEl}\n`;
          const rows = [];
          diffs[componentName][apiEl].forEach(({
            name, type, description,
          }) => {
            rows.push(`['${name}','${type}', '${description || ''}']`);
          });
          content += `<Table
  headers={['Name', 'Status', 'Changes']}
  rows={[
    ${rows}
  ]}
/>\n`;
        }
      });
    });
    console.log(JSON.stringify(diffs));
    return content;
  };
  const saveMigrationGuideFile = (content) => {
    const pathVersionRoot = `${pathReleasesRoot}/${version.slice(0, -1)}x/${version}`;
    const pathMigrationGuideFile = `${pathVersionRoot}/migration-guide.stories.mdx`;
    if (!fs.existsSync(pathMigrationGuideFile)) {
      fs.mkdirSync(pathVersionRoot, { recursive: true });
      fs.appendFileSync(pathMigrationGuideFile, '');
    }
    fs.writeFileSync(pathMigrationGuideFile, content);
  };
  saveMigrationGuideFile(generateContent());
})();

process.on('exit', (code) => {
  if (code === 0) {
    console.log('🚀 Migration guide created successfully.');
  }
});
