import React from 'react';
import {
  Link,
  Icon,
} from '@storybook/design-system';

export const MetaActions = ({ stories }) => {
  const reportAnIssueURL = 'https://github.com/infermedica/component-library/issues/new/choose';
  const branch = 'develop';
  const [
    type,
    name,
  ] = stories.default.title.split('/')
    .map((string, index) => {
      switch (index) {
        case 0: return string.toLowerCase();
          break;
        case 1: return `Ui${string}`;
          break;
        default: return string;
      }
    });
  const sourceURL = `https://github.com/infermedica/component-library/blob/${branch}/src/components/${type}/${name}/${name}.vue`;

  return <div className="flex gap-2">
    <Link href={reportAnIssueURL} target="_blank"><Icon
      icon="support"/>Report an issue</Link>
    <Link
      href={sourceURL}
      target="_blank"><Icon icon="markup"/>Source</Link>
  </div>;
};
