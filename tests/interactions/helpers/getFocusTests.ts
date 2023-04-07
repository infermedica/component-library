/* eslint-disable import/prefer-default-export */
import type { StepFunction } from '@storybook/types';
import type { VueRenderer } from '@storybook/vue3';
import { getStyleTests } from './getStyleTests';

export const getFocusTests = async <TArgs extends object>(
  step: StepFunction<VueRenderer, TArgs>,
  elements: Element[],
) => {
  await step('Correct focus state', () => {
    getStyleTests(
      elements,
      'boxShadow',
      Array.from(
        { length: elements.length },
        () => ({ boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 2px, rgb(47, 145, 234) 0px 0px 0px 4px' }),
      ),
    );
  });
};
