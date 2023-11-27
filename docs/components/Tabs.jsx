import React, { useState } from 'react';
import { ButtonToggle } from '@storybook/design-system';
import { Controls } from '@storybook/blocks';

export const Tabs = ({ stories }) => {
  const [
    index,
    setIndex,
  ] = useState(0);
  const update = (index) => {
    setIndex(index);
  };

  return <React.Fragment>
    <ButtonToggle
      titles={stories.map((story) => ({ title: story.default.component.__name }))}
      selectedIndex={index}
      onSelectIndex={update}
      appearance={'tab'}
    />
    <Controls of={stories[index].Basic} />
  </React.Fragment>;
};
