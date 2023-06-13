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

const createMdxSection = (content) => {
  const commits = content.split(/\n/);
  const sections = { breakingChanges: [] };
  let sectionsDoc = '';

  const updateSections = commits.reduce((acc, currentCommit) => {
    let prefixCurrentCommit = currentCommit.match(/^(.*?):/) && currentCommit.match(/^(.*?):/)[1];

    if (prefixCurrentCommit) prefixCurrentCommit = prefixCurrentCommit.replace(/\(.*?\)/, '');

    if (prefixCurrentCommit in sections) {
      sections[prefixCurrentCommit].push(currentCommit);
      // TODO remove this condition after finish work at this script
    } else if (prefixCurrentCommit === null) {
      delete sections[prefixCurrentCommit];
    } else if (prefixCurrentCommit.search(/!/) > -1) {
      sections.breakingChanges.push(currentCommit);
    } else {
      sections[prefixCurrentCommit] = [];
      sections[prefixCurrentCommit].push(currentCommit);
    }
    return sections;
  });

  Object.keys(updateSections).reduce((acc, section) => {
    const mdxSection = Object.keys(mdxSections).filter((key) => section.includes(key) && key);
    sectionsDoc += `\n\n## ${mdxSections[mdxSection].icon} ${mdxSections[mdxSection].name}`;

    const commitMessages = updateSections[section].map((commit) => {
      const regexCommit = commit.match(/\((#.*?)\)/);
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
  let doc = `import { Meta } from '@storybook/blocks';

<Meta title="Releases/v0.6.x/v${tag}/Changelog"/>
  
# ${tag} (${releaseDate})`;

  doc += createMdxSection(content);
  saveFile(tag, [ doc ]);
  return doc;
};

const createReleaseMdx = (tag) => {
  child.exec('git log --pretty=format:"%s" --no-merges $(git describe --tags --abbrev=0 @^)..@', (error, stdout, stderr) => {
    if (error) {
      console.error(`GIT LOG Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`GIT LOG stdError: ${stderr.message}`);
      return;
    }

    createMdxDoc(tag, stdout);
  });
};

export default createReleaseMdx;
createReleaseMdx('0.6.7');
