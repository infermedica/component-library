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

const changelogSections = {
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
  const [
    major,
    minor,
  ] = tag.split('.');
  const releaseVersionTag = `v${tag}`;
  const releaseDirPath = `./docs/releases/v${major}.${minor}.x/${releaseVersionTag}`;

  if (!existsSync(releaseDirPath)) {
    mkdirSync(releaseDirPath);
  }

  try {
    writeFileSync(`${releaseDirPath}/changelog.stories.mdx.mdx`, content[0]);
    console.log(`🚀 Release ${releaseVersionTag} file has been created!`);
  } catch (err) {
    console.error(`⛔️ Something goes wrong and the Release ${releaseVersionTag} file hasn't been created!`, err);
  }
};

const createChangelogSection = (content) => {
  const commits = content.split(/\n/);
  const sections = { breakingChanges: [] };
  const prefixRegex = /^(.*?):/;
  let sectionsDoc = '';

  const updateChangelogSections = commits.reduce((acc, currentCommit) => {
    let commitPrefix = currentCommit.match(prefixRegex) && currentCommit.match(prefixRegex)[1];
    if (commitPrefix) commitPrefix = commitPrefix.replace(/\(.*?\)/, '');

    if (commitPrefix in sections) {
      sections[commitPrefix].push(currentCommit);
    } else if (commitPrefix.search(/!/) > -1) {
      sections.breakingChanges.push(currentCommit);
    } else {
      sections[commitPrefix] = [];
      sections[commitPrefix].push(currentCommit);
    }
    return sections;
  }, sections);

  Object.keys(updateChangelogSections).reduce((acc, section) => {
    const changelogSection = Object.keys(changelogSections).filter((key) => section.includes(key) && key);
    sectionsDoc += `\n\n## ${changelogSections[changelogSection].icon} ${changelogSections[changelogSection].name}`;

    const commitMessages = updateChangelogSections[section].map((commit) => {
      const regexCommit = commit.match(/\((#.*?)\)/);
      const commitWithoutPrefix = commit.replace(prefixRegex, '');
      const commitMsg = regexCommit ? commitWithoutPrefix.replace(regexCommit[0], '') : commitWithoutPrefix;
      const pullRequestWithoutHash = regexCommit ? regexCommit[1].replace('#', '') : commit;

      return regexCommit
        ? `\n*${commitMsg}([${regexCommit[1]}](${githubLink}${pullRequestWithoutHash}))`
        : `\n*${commitMsg}`;
    });

    sectionsDoc += commitMessages.join('');

    return sectionsDoc;
  });
  return sectionsDoc;
};

const createChangelogMdx = (tag, content) => {
  let doc = `import { Meta } from '@storybook/blocks';

<Meta title="Releases/v0.6.x/v${tag}/Changelog"/>
  
# ${tag} (${releaseDate})`;

  doc += createChangelogSection(content);
  saveFile(tag, [ doc ]);
  return doc;
};

const createReleaseChangelog = (tag) => {
  child.exec('git log --pretty=format:"%s" --no-merges $(git describe --tags --abbrev=0 @^)..@', (error, stdout, stderr) => {
    if (error) {
      console.error(`GIT LOG Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`GIT LOG stdError: ${stderr.message}`);
      return;
    }

    createChangelogMdx(tag, stdout);
  });
};

export default createReleaseChangelog;
