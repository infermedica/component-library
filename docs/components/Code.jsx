/* eslint-disable no-param-reassign */
import React from 'react';
import { Source } from '@storybook/addon-docs';

const getCodeBlocks = (raw) => {
  const regex = /(\/\/<Code[\s\S]*?<\/Code>)/mg;
  return raw.match(regex);
};
const getCodeBlocksAsObject = (codeBlocks) => codeBlocks.reduce((blocks, item) => {
  const regexp = /<Code id="(.*)">([\s\S]*)\/\/<\/Code>/m;
  const match = item.match(regexp);
  blocks[match[1]] = match[2];
  return blocks;
}, {});

export const Code = ({
  code = '', id, additionalData = '', language = 'css',
}) => {
  if (id) {
    const codeBlocks = getCodeBlocks(code);
    const codeBlocksAsObject = getCodeBlocksAsObject(codeBlocks);
    code = `${additionalData} ${codeBlocksAsObject[id]}`.trim();
  }
  // Throw Error "Uncaught (in promise) Error: No primary story defined for docs entry. Did you forget to use `<Meta>`?"
  return <p>{'<Source/> in <Code /> component Throw some Error.'}</p>;
};
