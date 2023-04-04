/* eslint-disable import/prefer-default-export */
import type { VueWrapper } from '@vue/test-utils';
import type { StoryToMount } from './mountStories';
import { getBindingTest } from './getBindingTest';

type SlotTestCase<TArgs extends object> = {
  story: ReturnType<StoryToMount<TArgs>>;
  slot: string;
  content: (story: VueWrapper) => VueWrapper;
  expectedBinding: (args: TArgs) => Required<TArgs[keyof TArgs]>,
}

export const getSlotTests = <TArgs extends object>(
  testCases: SlotTestCase<TArgs>[],
) => {
  testCases.forEach(({
    slot,
    story,
    content,
    expectedBinding,
  }) => {
    describe(`${slot} slot`, () => {
      test(`render a content via ${slot} slot`, async () => {
        const { wrapper } = story;
        expect(await content(wrapper).exists()).toBe(true);
      });
      test(`pass attributes to the ${slot} slot element`, async () => {
        const {
          args, wrapper,
        } = story;
        getBindingTest(content(wrapper), expectedBinding(args));
      });
    });
  });
};
