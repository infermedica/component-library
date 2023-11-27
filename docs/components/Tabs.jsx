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

  console.log(stories[1].default);

  return <React.Fragment>
    <ButtonToggle
      titles={[
        { title: 'UiRange' },
        { title: 'UiNumberStepper' },
      ]}
      selectedIndex={index}
      onSelectIndex={update}
      appearance={'tab'}
    />
    <div>
    { index === 0
      ? <Controls of={stories[0].Basic} />
      : <Controls of={stories[1].Basic} />
    }
    </div>
  </React.Fragment>;
};
