import * as child from 'child_process';
import {
  writeFileSync,
  existsSync,
  mkdirSync,
} from 'fs';

const prefixRegex = /^(.*?):/;
const githubLink = 'https://github.com/infermedica/component-library/pull/';
const releaseDate = new Date().toLocaleString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const changelogSections = [
  {
    prefix: 'breakingChanges',
    icon: '⛔️',
    name: 'Breaking Changes',
  },
  {
    prefix: 'chore',
    icon: '🧹',
    name: 'Chores',
  },
  {
    prefix: 'docs',
    icon: '📄',
    name: 'Docs',
  },
  {
    prefix: 'feat',
    icon: '🚀',
    name: 'Feature',
  },
  {
    prefix: 'fix',
    icon: '🐛',
    name: 'Fixes',
  },
  {
    prefix: 'refactor',
    icon: '📝',
    name: 'Refactors',
  },
  {
    prefix: 'test',
    icon: '🔍',
    name: 'Tests',
  },
];

const sortSectionsOrder = (sections) => sections.sort((a, b) => {
  const prefixA = a.prefix;
  const prefixB = b.prefix;
  if (prefixA === 'fix' || prefixB === 'feat') {
    return -1;
  }
  if (prefixA === 'feat' || prefixB === 'fix') {
    return -1;
  }
  if (prefixA < prefixB) {
    return -1;
  }
  if (prefixA > prefixB) {
    return 1;
  }
  return 0;
});

const saveFile = (tag, content) => {
  const [
    major,
    minor,
  ] = tag.split('.');
  const releaseVersionTag = `v${tag}`;
  const releaseDirRootPath = `./docs/releases/v${major}.${minor}.x`;
  const releaseDirPath = `${releaseDirRootPath}/${releaseVersionTag}`;

  if (!existsSync(releaseDirRootPath)) {
    mkdirSync(releaseDirRootPath);
  }

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

const formatCommit = (commit) => {
  const regexCommitHash = commit.match(/\((#\d*?)\)/);
  const commitWithoutPrefix = commit.replace(prefixRegex, '');
  const commitMsg = regexCommitHash ? commitWithoutPrefix.replace(regexCommitHash[0], '') : commitWithoutPrefix;

  const regexCommit = /(.*?: )(.*?)(\(#.*?\))/g;
  const formatedCommit = commit.replace(regexCommit, (_match, _prefix, description, pullRequestHash) => {
    const withoutHash = pullRequestHash.replace(/(\()(#)(.*?)(\))/g, (_match, _bracket, _hash, pullRequestNumber) => pullRequestNumber);
    return `\n* ${description}([${pullRequestHash}](${githubLink}${withoutHash}))`;
  });

  return regexCommitHash
    ? formatedCommit
    : `\n*${commitMsg}`;
};

const createChangelogSections = (content) => {
  const commits = content.split(/\n/);
  let sectionsDoc = '';

  const updateChangelogSections = commits.reduce((acc, currentCommit) => {
    let commitPrefix = Array.isArray(currentCommit.match(prefixRegex))
      ? currentCommit.match(prefixRegex)[1]
      : false;

    const formatedCommit = formatCommit(currentCommit);

    if (commitPrefix) {
      commitPrefix = commitPrefix.replace(/\(.*?\)/, '');
      if (commitPrefix in acc) {
        acc[commitPrefix].push(formatedCommit);
      } else if (commitPrefix.search(/!/) > -1) {
        acc.breakingChanges.push(formatedCommit);
      } else {
        acc[commitPrefix] = [];
        acc[commitPrefix].push(formatedCommit);
      }
    }
    return acc;
  }, { breakingChanges: [] });

  sortSectionsOrder(changelogSections).forEach(({
    prefix,
    icon,
    name,
  }) => {
    if (typeof updateChangelogSections[prefix] !== 'undefined' && updateChangelogSections[prefix].length > 0) {
      sectionsDoc += `\n\n## ${icon} ${name}`;
      sectionsDoc += updateChangelogSections[prefix].join('');
    }
  });
  return sectionsDoc;
};

const createChangelogMdx = (tag, content) => {
  const [
    major,
    minor,
  ] = tag.split('.');
  let doc = `import { Meta } from '@storybook/blocks';

<Meta title="Releases/v${major}.${minor}.x/v${tag}/Changelog"/>
  
# ${tag} (${releaseDate})`;

  doc += createChangelogSections(content);
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
