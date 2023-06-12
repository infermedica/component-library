import * as child from 'child_process';
import {
  writeFileSync,
  existsSync,
  mkdirSync,
} from 'fs';

const githubLink = 'https://github.com/infermedica/component-library/pull/';
const releaseDate = new Date().toLocaleString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const mdxSections = {
  feat: {
    icon: '🚀',
    name: 'Feature',
  },
  fix: {
    icon: '🐛',
    name: 'Fixes',
  },
  docs: {
    icon: '📄',
    name: 'Docs',
  },
  chore: {
    icon: '🧹',
    name: 'Chores',
  },
  refactor: {
    icon: '📝',
    name: 'Refactors',
  },
  breakingChanges: {
    icon: '⛔️',
    name: 'Breaking Changes',
  },
  test: {
    icon: '🔍',
    name: 'Tests',
  },
};

const saveFile = (tag, content) => {
  const releaseTag = tag.split('.');
  const major = releaseTag[0];
  const minor = releaseTag[1];
  const patch = releaseTag[2];
  const releaseDir = `v${major}.${minor}.${patch}`;

  if (!existsSync(`./docs/releases/v${major}.${minor}.x/${releaseDir}`)) {
    mkdirSync(`./docs/releases/v${major}.${minor}.x/${releaseDir}`);
  }

  try {
    writeFileSync(`./docs/releases/v${major}.${minor}.x/${releaseDir}/changelog.stories.mdx.mdx`, content[0]);
    console.log(`🚀 Release v${major}.${minor}.${patch} file has been created!`);
  } catch (err) {
    console.log(`⛔️ Something goes wrong and the Release v${major}.${minor}.${patch} file hasn't been created!`, err);
  }
};

const createMdxSection = (content) => {
  const commits = content.split(/\n/);
  const sections = {};
  let sectionsDoc = '';

  commits.map((commit) => {
    const prefix = commit.match(/^(.*?):/) && commit.match(/^(.*?):/)[1];

    if (prefix in sections) {
      sections[prefix].push(commit);
    } else if (prefix === null) {
      delete sections[prefix];
    } else {
      sections[prefix] = [];
      sections[prefix].push(commit);
    }
    return null;
  });

  Object.keys(sections).map((section) => {
    // TODO add exception for prefix like this: test(chromatic)
    sectionsDoc += `\n\n## ${mdxSections[section].icon} ${mdxSections[section].name}`;

    const commitMessages = sections[section].map((commit) => {
      const regexCommit = commit.match(/\((.*?)\)/);
      const commitMsg = regexCommit ? commit.replace(regexCommit[0], '') : commit;
      const pullRequestWithoutHash = regexCommit ? regexCommit[1].replace('#', '') : commit;

      return regexCommit
        ? `\n* ${commitMsg} ([${regexCommit[1]}](${githubLink}${pullRequestWithoutHash}))`
        : `\n* ${commitMsg}`;
    });
    sectionsDoc += commitMessages;

    return sectionsDoc;
  });
  return sectionsDoc;
};

const createMdxDoc = (tag, content) => {
  const releaseTag = tag.split('.');
  const releaseMinor = releaseTag[1];
  const releasePatch = releaseTag[2];

  let doc = `import { Meta } from '@storybook/blocks';

<Meta title="Releases/v0.6.x/v0.${releaseMinor}.${releasePatch}/Changelog"/>
  
# 0.${releaseMinor}.${releasePatch} (${releaseDate})`;

  doc += createMdxSection(content);
  saveFile('0.6.7', [ doc ]);
  return doc;
};

child.exec('git tag', (error, stdout, stderr) => {
  if (error) {
    console.log(`GIT TAG Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`GIT TAG stdError: ${stderr.message}`);
    return;
  }
  stdout.split(/\n/).filter((el) => el !== '').pop();
});

child.exec('git log --pretty=format:"%s" --no-merges -n 5', (error, stdout, stderr) => {
  // TODO uncomment code below and remove line abovewhen script will working with any errors
  // child.exec('git log --pretty=format:"%s" --no-merges $(git describe --tags --abbrev=0 @^)..@', (error, stdout, stderr) => {
  if (error) {
    console.log(`GIT LOG Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`GIT LOG stdError: ${stderr.message}`);
    return;
  }

  createMdxDoc('0.6.7', stdout);
});
