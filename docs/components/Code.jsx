/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Source } from '@storybook/blocks';

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

const Code = ({
  code = '', id, additionalData = '', language = 'css',
}) => {
  if (id) {
    const codeBlocks = getCodeBlocks(code);
    const codeBlocksAsObject = getCodeBlocksAsObject(codeBlocks);
    code = `${additionalData} ${codeBlocksAsObject[id]}`.trim();
  }
  return (
    <Source
      language={language}
      code={code}
    />
  );
};

export default Code;
